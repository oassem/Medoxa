import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/users/usersSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const UsersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { id } = router.query;
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>
          {getPageTitle(
            t('pages.users.viewTitle', { defaultValue: 'View users' }),
          )}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('pages.users.viewTitle', { defaultValue: 'View users' })}
          main
        >
          <BaseButton
            color='info'
            label={t('actions.edit')}
            href={`/users/users-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('fields.firstName')}</p>
            <p>{users?.firstName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('fields.lastName')}</p>
            <p>{users?.lastName}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('fields.phoneNumber')}</p>
            <p>{users?.phoneNumber}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('fields.email')}</p>
            <p>{users?.email}</p>
          </div>

          <FormField label={t('fields.disabled')}>
            <SwitchField
              field={{ name: 'disabled', value: users?.disabled }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('fields.avatar')}</p>
            {users?.avatar?.length ? (
              <ImageField
                name={'avatar'}
                image={users?.avatar}
                className='w-20 h-20'
              />
            ) : (
              <p>{t('messages.noAvatar')}</p>
            )}
          </div>

          <div className={'mb-8'}>
            <p className={'block font-bold mb-2'}>{t('fields.appRole')}</p>
            <p>{users?.app_role?.name ?? t('messages.noData')}</p>
          </div>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.customPermissions')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.name')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.custom_permissions &&
                    Array.isArray(users.custom_permissions) &&
                    users.custom_permissions.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(
                            `/permissions/permissions-view/?id=${item.id}`,
                          )
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='name'
                        >
                          {item.name}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.custom_permissions?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.organizations')}
          </h2>
          <p>{users?.organizations?.name ?? t('messages.noData')}</p>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.appointmentsDoctor')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.appointmentDate')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.startTime')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.endTime')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.type')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.status')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.reminderSent')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.appointments_doctor &&
                    Array.isArray(users.appointments_doctor) &&
                    users.appointments_doctor.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(
                            `/appointments/appointments-view/?id=${item.id}`,
                          )
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='appointment_date'
                        >
                          {dataFormatter.dateTimeFormatter(
                            item.appointment_date,
                          )}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='start_time'
                        >
                          {dataFormatter.dateTimeFormatter(item.start_time)}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='end_time'
                        >
                          {dataFormatter.dateTimeFormatter(item.end_time)}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='type'
                        >
                          {item.type}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='status'
                        >
                          {item.status}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='reminder_sent'
                        >
                          {dataFormatter.booleanFormatter(item.reminder_sent)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.appointments_doctor?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.doctor_availabilities_doctor')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.weekday')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.morning_start_time')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.morning_end_time')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.evening_start_time')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.evening_end_time')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.slot_duration_minutes')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.is_active')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.doctor_availabilities_doctor &&
                    Array.isArray(users.doctor_availabilities_doctor) &&
                    users.doctor_availabilities_doctor.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(
                            `/doctor_availabilities/doctor_availabilities-view/?id=${item.id}`,
                          )
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='weekday'
                        >
                          {item.weekday}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='morning_start_time'
                        >
                          {dataFormatter.dateTimeFormatter(
                            item.morning_start_time,
                          )}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='morning_end_time'
                        >
                          {dataFormatter.dateTimeFormatter(
                            item.morning_end_time,
                          )}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='evening_start_time'
                        >
                          {dataFormatter.dateTimeFormatter(
                            item.evening_start_time,
                          )}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='evening_end_time'
                        >
                          {dataFormatter.dateTimeFormatter(
                            item.evening_end_time,
                          )}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='slot_duration_minutes'
                        >
                          {item.slot_duration_minutes}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='is_active'
                        >
                          {dataFormatter.booleanFormatter(item.is_active)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.doctor_availabilities_doctor?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.holidays_doctor')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.start_date')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.end_date')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.notes')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.holidays_doctor &&
                    Array.isArray(users.holidays_doctor) &&
                    users.holidays_doctor.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(`/holidays/holidays-view/?id=${item.id}`)
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='start_date'
                        >
                          {dataFormatter.dateTimeFormatter(item.start_date)}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='end_date'
                        >
                          {dataFormatter.dateTimeFormatter(item.end_date)}
                        </td>
                        <td data-label='notes'>{item.notes}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.holidays_doctor?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.imaging_orders_imaging_technician')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.total_amount')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.imaging_orders_imaging_technician &&
                    Array.isArray(users.imaging_orders_imaging_technician) &&
                    users.imaging_orders_imaging_technician.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(
                            `/imaging_orders/imaging_orders-view/?id=${item.id}`,
                          )
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='total_amount'
                        >
                          {item.total_amount}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='status'
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.imaging_orders_imaging_technician?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.lab_orders_lab_technician')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.total_amount')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.lab_orders_lab_technician &&
                    Array.isArray(users.lab_orders_lab_technician) &&
                    users.lab_orders_lab_technician.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(
                            `/lab_orders/lab_orders-view/?id=${item.id}`,
                          )
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='total_amount'
                        >
                          {item.total_amount}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='status'
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.lab_orders_lab_technician?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.patients_user')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.full_name_en')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.full_name_ar')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.date_of_birth')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.gender')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.nationality')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.identifier_type')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.identifier')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.address')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.emergency_contact_name')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.emergency_contact_phone')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.medical_history')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.allergies')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.current_medications')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.family_history')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.patients_user &&
                    Array.isArray(users.patients_user) &&
                    users.patients_user.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(`/patients/patients-view/?id=${item.id}`)
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='full_name_en'
                        >
                          {item.full_name_en}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='full_name_ar'
                        >
                          {item.full_name_ar}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='date_of_birth'
                        >
                          {dataFormatter.dateTimeFormatter(item.date_of_birth)}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='gender'
                        >
                          {item.gender}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='nationality'
                        >
                          {item.nationality}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='identifier_type'
                        >
                          {item.identifier_type}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='identifier'
                        >
                          {item.identifier}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='address'
                        >
                          {item.address}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='emergency_contact_name'
                        >
                          {item.emergency_contact_name}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='emergency_contact_phone'
                        >
                          {item.emergency_contact_phone}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='medical_history'
                        >
                          {item.medical_history}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='allergies'
                        >
                          {item.allergies}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='current_medications'
                        >
                          {item.current_medications}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='family_history'
                        >
                          {item.family_history}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.patients_user?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.pharmacy_orders_pharmacist')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.total_amount')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.pharmacy_orders_pharmacist &&
                    Array.isArray(users.pharmacy_orders_pharmacist) &&
                    users.pharmacy_orders_pharmacist.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(
                            `/pharmacy_orders/pharmacy_orders-view/?id=${item.id}`,
                          )
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='total_amount'
                        >
                          {item.total_amount}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='status'
                        >
                          {item.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.pharmacy_orders_pharmacist?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <div className='my-8' />

          <h2 className='text-2xl font-extrabold'>
            {t('fields.visits_doctor')}
          </h2>
          <CardBox
            className='mb-6 border border-gray-300 rounded overflow-hidden'
            hasTable
          >
            <div className='overflow-x-auto'>
              <table>
                <thead>
                  <tr>
                    <th className='text-left rtl:text-right'>
                      {t('fields.visit_datetime')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.symptoms')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.diagnosis')}
                    </th>
                    <th className='text-left rtl:text-right'>
                      {t('fields.notes')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.visits_doctor &&
                    Array.isArray(users.visits_doctor) &&
                    users.visits_doctor.map((item: any) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          router.push(`/visits/visits-view/?id=${item.id}`)
                        }
                      >
                        <td
                          className='text-left rtl:text-right'
                          data-label='visit_datetime'
                        >
                          {dataFormatter.dateTimeFormatter(item.visit_datetime)}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='symptoms'
                        >
                          {item.symptoms}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='diagnosis'
                        >
                          {item.diagnosis}
                        </td>
                        <td
                          className='text-left rtl:text-right'
                          data-label='notes'
                        >
                          {item.notes}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {!users?.visits_doctor?.length && (
              <div className={'text-center py-4'}>{t('messages.noData')}</div>
            )}
          </CardBox>

          <BaseDivider />

          <BaseButton
            color='info'
            label={t('actions.back')}
            onClick={() => router.push('/users/users-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

UsersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_USERS'}>{page}</LayoutAuthenticated>
  );
};

export default UsersView;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
