import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'aside.dashboard',
  },
  {
    href: '/users/users-list',
    label: 'aside.users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/appointment_rules/appointment_rules-list',
    label: 'aside.appointmentRules',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCalendarCheck' in icon
        ? icon['mdiCalendarCheck' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_APPOINTMENT_RULES',
  },
  {
    href: '/appointments/appointments-list',
    label: 'aside.appointments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCalendar' in icon
        ? icon['mdiCalendar' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_APPOINTMENTS',
  },
  {
    href: '/departments/departments-list',
    label: 'aside.departments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiOfficeBuilding' in icon
        ? icon['mdiOfficeBuilding' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_DEPARTMENTS',
  },
  {
    href: '/doctor_availabilities/doctor_availabilities-list',
    label: 'aside.doctorAvailabilities',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCalendarClock' in icon
        ? icon['mdiCalendarClock' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_DOCTOR_AVAILABILITIES',
  },
  {
    href: '/holidays/holidays-list',
    label: 'aside.holidays',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiCalendarRemove' in icon
        ? icon['mdiCalendarRemove' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_HOLIDAYS',
  },
  {
    href: '/imaging_investigations/imaging_investigations-list',
    label: 'aside.imagingInvestigations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiXRay' in icon
        ? icon['mdiXRay' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_IMAGING_INVESTIGATIONS',
  },
  {
    href: '/imaging_order_items/imaging_order_items-list',
    label: 'aside.imagingOrderItems',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiXRayOutline' in icon
        ? icon['mdiXRayOutline' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_IMAGING_ORDER_ITEMS',
  },
  {
    href: '/imaging_orders/imaging_orders-list',
    label: 'aside.imagingOrders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiXRay' in icon
        ? icon['mdiXRay' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_IMAGING_ORDERS',
  },
  {
    href: '/insurances/insurances-list',
    label: 'aside.insurances',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiShieldAccount' in icon
        ? icon['mdiShieldAccount' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_INSURANCES',
  },
  {
    href: '/invoice_items/invoice_items-list',
    label: 'aside.invoiceItems',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiFileDocumentOutline' in icon
        ? icon['mdiFileDocumentOutline' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_INVOICE_ITEMS',
  },
  {
    href: '/invoices/invoices-list',
    label: 'aside.invoices',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiReceipt' in icon
        ? icon['mdiReceipt' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_INVOICES',
  },
  {
    href: '/lab_order_items/lab_order_items-list',
    label: 'aside.labOrderItems',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiTestTubeOutline' in icon
        ? icon['mdiTestTubeOutline' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_LAB_ORDER_ITEMS',
  },
  {
    href: '/lab_orders/lab_orders-list',
    label: 'aside.labOrders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiTestTube' in icon
        ? icon['mdiTestTube' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_LAB_ORDERS',
  },
  {
    href: '/lab_tests/lab_tests-list',
    label: 'aside.labTests',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiFlaskOutline' in icon
        ? icon['mdiFlaskOutline' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_LAB_TESTS',
  },
  {
    href: '/medications/medications-list',
    label: 'aside.medications',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiPill' in icon
        ? icon['mdiPill' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_MEDICATIONS',
  },
  {
    href: '/patient_documents/patient_documents-list',
    label: 'aside.patientDocuments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiFileDocument' in icon
        ? icon['mdiFileDocument' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_PATIENT_DOCUMENTS',
  },
  {
    href: '/patients/patients-list',
    label: 'aside.patients',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiAccountHeart' in icon
        ? icon['mdiAccountHeart' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_PATIENTS',
  },
  {
    href: '/pharmacy_order_items/pharmacy_order_items-list',
    label: 'aside.pharmacyOrderItems',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiPillMultiple' in icon
        ? icon['mdiPillMultiple' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_PHARMACY_ORDER_ITEMS',
  },
  {
    href: '/pharmacy_orders/pharmacy_orders-list',
    label: 'aside.pharmacyOrders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiPharmacy' in icon
        ? icon['mdiPharmacy' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_PHARMACY_ORDERS',
  },
  {
    href: '/sick_leaves/sick_leaves-list',
    label: 'aside.sickLeaves',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiFileDocument' in icon
        ? icon['mdiFileDocument' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_SICK_LEAVES',
  },
  {
    href: '/visits/visits-list',
    label: 'aside.visits',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon:
      'mdiStethoscope' in icon
        ? icon['mdiStethoscope' as keyof typeof icon]
        : (icon.mdiTable ?? icon.mdiTable),
    permissions: 'READ_VISITS',
  },
  {
    href: '/roles/roles-list',
    label: 'aside.roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline ?? icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'aside.permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline ?? icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/organizations/organizations-list',
    label: 'aside.organizations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ORGANIZATIONS',
  },
  {
    href: '/chat-gpt',
    label: 'aside.chatGpt',
    icon: icon.mdiChat,
  },
  {
    href: '/profile',
    label: 'aside.profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/home',
    label: 'aside.home',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'aside.swaggerApi',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
