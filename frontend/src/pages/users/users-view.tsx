import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/users/usersSlice';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import FormField from '../../components/FormField';
import { getPageTitle } from '../../config';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import { useTranslation } from 'react-i18next';

const UsersView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { users } = useAppSelector((state) => state.users);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id } = router.query;
  const { t } = useTranslation('common');

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>
          {getPageTitle(
            t('pages.users.viewTitle', { defaultValue: 'View user' }),
          )}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('pages.users.viewTitle', { defaultValue: 'View user' })}
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

          <div className={'mb-6'}>
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

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>{t('fields.appRole')}</p>
            <p>{users?.app_role?.name ?? t('messages.noData')}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Department</p>
            <p>{users?.department?.name ?? t('messages.noData')}</p>
          </div>

          {currentUser?.app_role?.globalAccess && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>
                {t('fields.organizations')}
              </p>
              <p>{users?.organizations?.name ?? t('messages.noData')}</p>
            </div>
          )}

          <h2 className='block font-bold mb-2 mt-8'>
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

          <h2 className='block font-bold mb-2'>
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

          <h2 className='block font-bold mb-2'>
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

          <h2 className='block font-bold mb-2'>
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

          <h2 className='block font-bold mb-2'>
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

          <h2 className='block font-bold mb-2'>
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

          <h2 className='block font-bold mb-2'>
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

          <h2 className='block font-bold mb-2'>{t('fields.visits_doctor')}</h2>
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
