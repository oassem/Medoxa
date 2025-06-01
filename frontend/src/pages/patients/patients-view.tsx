import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/patients/patientsSlice';
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { baseURL, getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import FormField from '../../components/FormField';
import { mdiChartTimelineVariant } from '@mdi/js';
import { useTranslation } from 'react-i18next';

const PatientsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { patients } = useAppSelector((state) => state.patients);
  const { id } = router.query;
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle(t('patients.viewPatient'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('patients.viewPatient')}
          main
        >
          <BaseButton
            color='info'
            label={t('actions.edit')}
            href={`/patients/patients-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patients.full_name_en')}
            </p>
            <p>{patients?.full_name_en}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patients.full_name_ar')}
            </p>
            <p>{patients?.full_name_ar}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('patients.phone')}</p>
            <p>{patients?.phone ?? t('patients.noData')}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('patients.email')}</p>
            <p>{patients?.email ?? t('patients.noData')}</p>
          </div>

          <FormField label={t('patients.date_of_birth')}>
            {patients.date_of_birth ? (
              <DatePicker
                dateFormat='yyyy-MM-dd'
                selected={
                  patients.date_of_birth
                    ? new Date(patients.date_of_birth)
                    : null
                }
                disabled
              />
            ) : (
              <p>{t('patients.noDateOfBirth')}</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('patients.gender')}</p>
            <p>
              {patients?.gender
                ? t(`patients.${patients.gender.toLowerCase()}`)
                : t('patients.noData')}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patients.nationality')}
            </p>
            <p>{patients?.nationality}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patients.identifier_type')}
            </p>
            <p>
              {patients?.identifier_type
                ? t(
                    `patients.${patients.identifier_type
                      .replace(/\s+/g, '_')
                      .toLowerCase()}`,
                  )
                : t('patients.noData')}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('patients.identifier')}</p>
            <p>{patients?.identifier}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('patients.address')}</p>
            <p>{patients?.address}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patients.emergency_contact_name')}
            </p>
            <p>{patients?.emergency_contact_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patients.emergency_contact_phone')}
            </p>
            <p>{patients?.emergency_contact_phone}</p>
          </div>

          <FormField label={t('patients.medical_history')} hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patients?.medical_history}
            />
          </FormField>

          <FormField label={t('patients.allergies')} hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patients?.allergies}
            />
          </FormField>

          <FormField
            label={t('patients.current_medications')}
            hasTextareaHeight
          >
            <textarea
              className={'w-full'}
              disabled
              value={patients?.current_medications}
            />
          </FormField>

          <FormField label={t('patients.family_history')} hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patients?.family_history}
            />
          </FormField>

          {/* <>
            <p className={'block font-bold mb-2'}>Appointments Patient</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AppointmentDate</th>

                      <th>StartTime</th>

                      <th>EndTime</th>

                      <th>Type</th>

                      <th>Status</th>

                      <th>ReminderSent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.appointments_patient &&
                      Array.isArray(patients.appointments_patient) &&
                      patients.appointments_patient.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/appointments/appointments-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='appointment_date'>
                            {dataFormatter.dateTimeFormatter(
                              item.appointment_date,
                            )}
                          </td>

                          <td data-label='start_time'>
                            {dataFormatter.dateTimeFormatter(item.start_time)}
                          </td>

                          <td data-label='end_time'>
                            {dataFormatter.dateTimeFormatter(item.end_time)}
                          </td>

                          <td data-label='type'>{item.type}</td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='reminder_sent'>
                            {dataFormatter.booleanFormatter(item.reminder_sent)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.appointments_patient?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          <>
            <p className={'block font-bold mb-2'}>
              {t('patients.patientInsurance')}
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.provider_name')}
                      </th>

                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.policy_number')}
                      </th>

                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.coverage_start')}
                      </th>

                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.coverage_end')}
                      </th>

                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.plan_details')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.insurances_patient &&
                      Array.isArray(patients.insurances_patient) &&
                      patients.insurances_patient.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/insurances/insurances-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label='provider_name'
                          >
                            {item.provider_name}
                          </td>

                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label='policy_number'
                          >
                            {item.policy_number}
                          </td>

                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label='coverage_start'
                          >
                            {dataFormatter.dateTimeFormatter(
                              item.coverage_start,
                            )}
                          </td>

                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label='coverage_end'
                          >
                            {dataFormatter.dateTimeFormatter(item.coverage_end)}
                          </td>

                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label='plan_details'
                          >
                            {item.plan_details}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.insurances_patient?.length && (
                <div className={'text-center py-4'}>{t('patients.noData')}</div>
              )}
            </CardBox>
          </>

          {/* <>
            <p className={'block font-bold mb-2'}>Invoices Patient</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalAmount</th>

                      <th>VATAmount</th>

                      <th>IsPaid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.invoices_patient &&
                      Array.isArray(patients.invoices_patient) &&
                      patients.invoices_patient.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/invoices/invoices-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='total_amount'>{item.total_amount}</td>

                          <td data-label='vat_amount'>{item.vat_amount}</td>

                          <td data-label='is_paid'>
                            {dataFormatter.booleanFormatter(item.is_paid)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.invoices_patient?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          <>
            <p className={'block font-bold mb-2'}>
              {t('patients.patientDocuments')}
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.document_type')}
                      </th>
                      <th
                        className={dir === 'rtl' ? 'text-right' : 'text-left'}
                      >
                        {t('patients.document_url')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.patient_documents_patient &&
                      Array.isArray(patients.patient_documents_patient) &&
                      patients.patient_documents_patient.map((item: any) => (
                        <tr key={item.id}>
                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label={t('patients.document_type')}
                          >
                            {item.document_type}
                          </td>
                          <td
                            className={
                              dir === 'rtl' ? 'text-right' : 'text-left'
                            }
                            data-label={t('patients.document_url')}
                          >
                            {item.document_url ? (
                              <a
                                href={`${baseURL}/${item.document_url.replace(/\\/g, '/')}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-600 underline'
                                download={item.document_url.split('/').pop()}
                              >
                                {t('patients.downloadViewDocument')}
                              </a>
                            ) : (
                              t('patients.noFile')
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.patient_documents_patient?.length && (
                <div className={'text-center py-4'}>{t('patients.noData')}</div>
              )}
            </CardBox>
          </>

          {/* <>
            <p className={'block font-bold mb-2'}>Visits Patient</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VisitDateTime</th>

                      <th>Symptoms</th>

                      <th>Diagnosis</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.visits_patient &&
                      Array.isArray(patients.visits_patient) &&
                      patients.visits_patient.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/visits/visits-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='visit_datetime'>
                            {dataFormatter.dateTimeFormatter(
                              item.visit_datetime,
                            )}
                          </td>

                          <td data-label='symptoms'>{item.symptoms}</td>

                          <td data-label='diagnosis'>{item.diagnosis}</td>

                          <td data-label='notes'>{item.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.visits_patient?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}
          <BaseDivider />

          <BaseButton
            color='info'
            label={t('actions.back')}
            onClick={() => router.push('/patients/patients-table')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PatientsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PATIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PatientsView;
