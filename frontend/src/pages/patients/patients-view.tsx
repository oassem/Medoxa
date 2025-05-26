import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/patients/patientsSlice';
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import FormField from '../../components/FormField';
import { mdiChartTimelineVariant } from '@mdi/js';

const PatientsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { patients } = useAppSelector((state) => state.patients);
  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View patient')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View patients')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/patients/patients-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Full Name (English)</p>
            <p>{patients?.full_name_en}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Full Name (Arabic)</p>
            <p>{patients?.full_name_ar}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone</p>
            <p>{patients?.phone ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Email</p>
            <p>{patients?.email ?? 'No data'}</p>
          </div>

          <FormField label='Date of Birth'>
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
              <p>No Date of Birth</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Gender</p>
            <p>{patients?.gender ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Nationality</p>
            <p>{patients?.nationality}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Identifier Type</p>
            <p>{patients?.identifier_type ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Identifier Number</p>
            <p>{patients?.identifier}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Address</p>
            <p>{patients?.address}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Emergency Contact Name</p>
            <p>{patients?.emergency_contact_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Emergency Contact Phone</p>
            <p>{patients?.emergency_contact_phone}</p>
          </div>

          <FormField label='Medical History' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patients?.medical_history}
            />
          </FormField>

          <FormField label='Allergies' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patients?.allergies}
            />
          </FormField>

          <FormField label='Current Medications' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={patients?.current_medications}
            />
          </FormField>

          <FormField label='Family History' hasTextareaHeight>
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
            <p className={'block font-bold mb-2'}>Patient Insurance</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Provider Name</th>

                      <th>Policy Number</th>

                      <th>Coverage Start</th>

                      <th>Coverage End</th>

                      <th>Plan Details</th>
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
                          <td data-label='provider_name'>
                            {item.provider_name}
                          </td>

                          <td data-label='policy_number'>
                            {item.policy_number}
                          </td>

                          <td data-label='coverage_start'>
                            {dataFormatter.dateTimeFormatter(
                              item.coverage_start,
                            )}
                          </td>

                          <td data-label='coverage_end'>
                            {dataFormatter.dateTimeFormatter(item.coverage_end)}
                          </td>

                          <td data-label='plan_details'>{item.plan_details}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.insurances_patient?.length && (
                <div className={'text-center py-4'}>No data</div>
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
            <p className={'block font-bold mb-2'}>Patient Documents</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Document Type</th>

                      <th>Document URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.patient_documents_patient &&
                      Array.isArray(patients.patient_documents_patient) &&
                      patients.patient_documents_patient.map((item: any) => (
                        <tr key={item.id}>
                          <td data-label='document_type'>
                            {item.document_type}
                          </td>

                          <td data-label='document_url'>
                            {item.document_url ? (
                              <a
                                href={`/${item.document_url.replace(/\\/g, '/')}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-600 underline'
                                download={item.document_url.split('/').pop()}
                              >
                                Download/View document
                              </a>
                            ) : (
                              'No file'
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!patients?.patient_documents_patient?.length && (
                <div className={'text-center py-4'}>No data</div>
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
            label='Back'
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
