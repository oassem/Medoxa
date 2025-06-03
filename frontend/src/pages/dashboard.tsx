import * as icon from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axiosInstance from '../utils/axiosInstance';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import BaseIcon from '../components/BaseIcon';
import Link from 'next/link';
import { getPageTitle } from '../config';
import { useTranslation } from 'react-i18next';
import { hasPermission } from '../helpers/userPermissions';
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';
import { useAppDispatch, useAppSelector } from '../stores/hooks';

const Dashboard = () => {
  const { t, i18n } = useTranslation('common');
  const dispatch = useAppDispatch();
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const corners = useAppSelector((state) => state.style.corners);
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);

  const loadingMessage = t('pages.dashboard.loading', {
    defaultValue: 'Loading...',
  });

  const [users, setUsers] = React.useState(loadingMessage);
  const [appointment_rules, setAppointment_rules] =
    React.useState(loadingMessage);
  const [appointments, setAppointments] = React.useState(loadingMessage);
  const [departments, setDepartments] = React.useState(loadingMessage);
  const [doctor_availabilities, setDoctor_availabilities] =
    React.useState(loadingMessage);
  const [holidays, setHolidays] = React.useState(loadingMessage);
  const [imaging_investigations, setImaging_investigations] =
    React.useState(loadingMessage);
  const [imaging_order_items, setImaging_order_items] =
    React.useState(loadingMessage);
  const [imaging_orders, setImaging_orders] = React.useState(loadingMessage);
  const [insurances, setInsurances] = React.useState(loadingMessage);
  const [invoice_items, setInvoice_items] = React.useState(loadingMessage);
  const [invoices, setInvoices] = React.useState(loadingMessage);
  const [lab_order_items, setLab_order_items] = React.useState(loadingMessage);
  const [lab_orders, setLab_orders] = React.useState(loadingMessage);
  const [lab_tests, setLab_tests] = React.useState(loadingMessage);
  const [medications, setMedications] = React.useState(loadingMessage);
  const [patient_documents, setPatient_documents] =
    React.useState(loadingMessage);
  const [patients, setPatients] = React.useState(loadingMessage);
  const [pharmacy_order_items, setPharmacy_order_items] =
    React.useState(loadingMessage);
  const [pharmacy_orders, setPharmacy_orders] = React.useState(loadingMessage);
  const [sick_leaves, setSick_leaves] = React.useState(loadingMessage);
  const [visits, setVisits] = React.useState(loadingMessage);
  const [roles, setRoles] = React.useState(loadingMessage);
  const [permissions, setPermissions] = React.useState(loadingMessage);
  const [organizations, setOrganizations] = React.useState(loadingMessage);

  const [widgetsRole, setWidgetsRole] = React.useState({
    role: { value: '', label: '' },
  });
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isFetchingQuery } = useAppSelector((state) => state.openAi);
  const { rolesWidgets, loading } = useAppSelector((state) => state.roles);
  const isRTL = i18n.language === 'ar';

  async function loadData() {
    const entities = [
      'users',
      'appointment_rules',
      'appointments',
      'departments',
      'doctor_availabilities',
      'holidays',
      'imaging_investigations',
      'imaging_order_items',
      'imaging_orders',
      'insurances',
      'invoice_items',
      'invoices',
      'lab_order_items',
      'lab_orders',
      'lab_tests',
      'medications',
      'patient_documents',
      'patients',
      'pharmacy_order_items',
      'pharmacy_orders',
      'sick_leaves',
      'visits',
      'roles',
      'permissions',
      'organizations',
    ];

    const fns = [
      setUsers,
      setAppointment_rules,
      setAppointments,
      setDepartments,
      setDoctor_availabilities,
      setHolidays,
      setImaging_investigations,
      setImaging_order_items,
      setImaging_orders,
      setInsurances,
      setInvoice_items,
      setInvoices,
      setLab_order_items,
      setLab_orders,
      setLab_tests,
      setMedications,
      setPatient_documents,
      setPatients,
      setPharmacy_order_items,
      setPharmacy_orders,
      setSick_leaves,
      setVisits,
      setRoles,
      setPermissions,
      setOrganizations,
    ];

    const requests = entities.map((entity, index) => {
      if (hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
        return axiosInstance.get(`/${entity.toLowerCase()}/count`);
      } else {
        fns[index](null);
        return Promise.resolve({ data: { count: null } });
      }
    });

    Promise.allSettled(requests).then((results) => {
      results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
          fns[i](result.value.data.count);
        } else {
          fns[i](result.reason.message);
        }
      });
    });
  }

  async function getWidgets(roleId) {
    await dispatch(fetchWidgets(roleId));
  }

  React.useEffect(() => {
    if (!currentUser) return;
    loadData().then();
    setWidgetsRole({
      role: {
        value: currentUser?.app_role?.id,
        label: currentUser?.app_role?.name,
      },
    });
  }, [currentUser]);

  React.useEffect(() => {
    if (!currentUser || !widgetsRole?.role?.value) return;
    getWidgets(widgetsRole?.role?.value || '').then();
  }, [widgetsRole?.role?.value]);

  return (
    <>
      <Head>
        <title>
          {getPageTitle(
            t('pages.dashboard.pageTitle', { defaultValue: 'Overview' }),
          )}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={icon.mdiChartTimelineVariant}
          title={t('pages.dashboard.overview', { defaultValue: 'Overview' })}
          main
        >
          {''}
        </SectionTitleLineWithButton>

        {hasPermission(currentUser, 'CREATE_ROLES') && (
          <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
          />
        )}
        {!!rolesWidgets.length &&
          hasPermission(currentUser, 'CREATE_ROLES') && (
            <p className='  text-gray-500 dark:text-gray-400 mb-4'>
              {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
            </p>
          )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
          {(isFetchingQuery || loading) && (
            <div
              className={` ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } dark:bg-dark-900 text-lg leading-tight   text-gray-500 flex items-center ${cardsStyle} dark:border-dark-700 p-6`}
            >
              <BaseIcon
                className={`${iconsColor} animate-spin ${isRTL ? 'ml-5' : 'mr-5'}`}
                w='w-16'
                h='h-16'
                size={48}
                path={icon.mdiLoading}
              />{' '}
              {t('pages.dashboard.loadingWidgets', {
                defaultValue: 'Loading widgets...',
              })}
            </div>
          )}

          {rolesWidgets &&
            rolesWidgets.map((widget) => (
              <SmartWidget
                key={widget.id}
                userId={currentUser?.id}
                widget={widget}
                roleId={widgetsRole?.role?.value || ''}
                admin={hasPermission(currentUser, 'CREATE_ROLES')}
              />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6  ' />}

        <div
          id='dashboard'
          className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'
        >
          {hasPermission(currentUser, 'READ_USERS') && (
            <Link href={'/users/users-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.users')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {users}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiAccountGroup || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_APPOINTMENT_RULES') && (
            <Link href={'/appointment_rules/appointment_rules-table'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.appointmentRules')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {appointment_rules}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiCalendarCheck' in icon
                          ? icon['mdiCalendarCheck' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_APPOINTMENTS') && (
            <Link href={'/appointments/appointments-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.appointments')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {appointments}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiCalendar' in icon
                          ? icon['mdiCalendar' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DEPARTMENTS') && (
            <Link href={'/departments/departments-table'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.departments')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {departments}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiOfficeBuilding' in icon
                          ? icon['mdiOfficeBuilding' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DOCTOR_AVAILABILITIES') && (
            <Link href={'/doctor_availabilities/doctor_availabilities-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.doctorAvailabilities')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {doctor_availabilities}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiCalendarClock' in icon
                          ? icon['mdiCalendarClock' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_HOLIDAYS') && (
            <Link href={'/holidays/holidays-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.holidays')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {holidays}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiCalendarRemove' in icon
                          ? icon['mdiCalendarRemove' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_IMAGING_INVESTIGATIONS') && (
            <Link href={'/imaging_investigations/imaging_investigations-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.imagingInvestigations')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {imaging_investigations}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiXRay' in icon
                          ? icon['mdiXRay' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_IMAGING_ORDER_ITEMS') && (
            <Link href={'/imaging_order_items/imaging_order_items-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.imagingOrderItems')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {imaging_order_items}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiXRayOutline' in icon
                          ? icon['mdiXRayOutline' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_IMAGING_ORDERS') && (
            <Link href={'/imaging_orders/imaging_orders-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.imagingOrders')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {imaging_orders}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiXRay' in icon
                          ? icon['mdiXRay' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_INSURANCES') && (
            <Link href={'/insurances/insurances-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.insurances')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {insurances}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiShieldAccount' in icon
                          ? icon['mdiShieldAccount' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_INVOICE_ITEMS') && (
            <Link href={'/invoice_items/invoice_items-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.invoiceItems')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {invoice_items}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiFileDocumentOutline' in icon
                          ? icon['mdiFileDocumentOutline' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_INVOICES') && (
            <Link href={'/invoices/invoices-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.invoices')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {invoices}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiReceipt' in icon
                          ? icon['mdiReceipt' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_LAB_ORDER_ITEMS') && (
            <Link href={'/lab_order_items/lab_order_items-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.labOrderItems')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {lab_order_items}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiTestTubeOutline' in icon
                          ? icon['mdiTestTubeOutline' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_LAB_ORDERS') && (
            <Link href={'/lab_orders/lab_orders-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.labOrders')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {lab_orders}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiTestTube' in icon
                          ? icon['mdiTestTube' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_LAB_TESTS') && (
            <Link href={'/lab_tests/lab_tests-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.labTests')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {lab_tests}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiFlaskOutline' in icon
                          ? icon['mdiFlaskOutline' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_MEDICATIONS') && (
            <Link href={'/medications/medications-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.medications')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {medications}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiPill' in icon
                          ? icon['mdiPill' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PATIENT_DOCUMENTS') && (
            <Link href={'/patient_documents/patient_documents-table'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.patientDocuments')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {patient_documents}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiFileDocument' in icon
                          ? icon['mdiFileDocument' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PATIENTS') && (
            <Link href={'/patients/patients-table'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.patients')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {patients}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiAccountHeart' in icon
                          ? icon['mdiAccountHeart' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PHARMACY_ORDER_ITEMS') && (
            <Link href={'/pharmacy_order_items/pharmacy_order_items-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.pharmacyOrderItems')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pharmacy_order_items}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiPillMultiple' in icon
                          ? icon['mdiPillMultiple' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PHARMACY_ORDERS') && (
            <Link href={'/pharmacy_orders/pharmacy_orders-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.pharmacyOrders')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {pharmacy_orders}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiPharmacy' in icon
                          ? icon['mdiPharmacy' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_SICK_LEAVES') && (
            <Link href={'/sick_leaves/sick_leaves-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.sickLeaves')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {sick_leaves}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiFileDocument' in icon
                          ? icon['mdiFileDocument' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_VISITS') && (
            <Link href={'/visits/visits-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.visits')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {visits}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        'mdiStethoscope' in icon
                          ? icon['mdiStethoscope' as keyof typeof icon]
                          : icon.mdiTable || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ROLES') && (
            <Link href={'/roles/roles-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.roles')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {roles}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        icon.mdiShieldAccountVariantOutline || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PERMISSIONS') && (
            <Link href={'/permissions/permissions-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.permissions')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {permissions}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiShieldAccountOutline || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <Link href={'/organizations/organizations-list'}>
              <div
                className={`${
                  corners !== 'rounded-full' ? corners : 'rounded-3xl'
                } dark:bg-dark-900 ${cardsStyle} dark:border-dark-700 p-6`}
              >
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight   text-gray-500 dark:text-gray-400'>
                      {t('pages.dashboard.organizations')}
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {organizations}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className={`${iconsColor}`}
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTable || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
