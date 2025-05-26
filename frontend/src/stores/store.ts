import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';
import usersSlice from './users/usersSlice';
import appointment_rulesSlice from './appointment_rules/appointment_rulesSlice';
import appointmentsSlice from './appointments/appointmentsSlice';
import departmentsSlice from './departments/departmentsSlice';
import doctor_availabilitiesSlice from './doctor_availabilities/doctor_availabilitiesSlice';
import holidaysSlice from './holidays/holidaysSlice';
import imaging_investigationsSlice from './imaging_investigations/imaging_investigationsSlice';
import imaging_order_itemsSlice from './imaging_order_items/imaging_order_itemsSlice';
import imaging_ordersSlice from './imaging_orders/imaging_ordersSlice';
import insurancesSlice from './insurances/insurancesSlice';
import invoice_itemsSlice from './invoice_items/invoice_itemsSlice';
import invoicesSlice from './invoices/invoicesSlice';
import lab_order_itemsSlice from './lab_order_items/lab_order_itemsSlice';
import lab_ordersSlice from './lab_orders/lab_ordersSlice';
import lab_testsSlice from './lab_tests/lab_testsSlice';
import medicationsSlice from './medications/medicationsSlice';
import patient_documentsSlice from './patient_documents/patient_documentsSlice';
import patientsSlice from './patients/patientsSlice';
import pharmacy_order_itemsSlice from './pharmacy_order_items/pharmacy_order_itemsSlice';
import pharmacy_ordersSlice from './pharmacy_orders/pharmacy_ordersSlice';
import sick_leavesSlice from './sick_leaves/sick_leavesSlice';
import visitsSlice from './visits/visitsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import organizationsSlice from './organizations/organizationsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,
    users: usersSlice,
    appointment_rules: appointment_rulesSlice,
    appointments: appointmentsSlice,
    departments: departmentsSlice,
    doctor_availabilities: doctor_availabilitiesSlice,
    holidays: holidaysSlice,
    imaging_investigations: imaging_investigationsSlice,
    imaging_order_items: imaging_order_itemsSlice,
    imaging_orders: imaging_ordersSlice,
    insurances: insurancesSlice,
    invoice_items: invoice_itemsSlice,
    invoices: invoicesSlice,
    lab_order_items: lab_order_itemsSlice,
    lab_orders: lab_ordersSlice,
    lab_tests: lab_testsSlice,
    medications: medicationsSlice,
    patient_documents: patient_documentsSlice,
    patients: patientsSlice,
    pharmacy_order_items: pharmacy_order_itemsSlice,
    pharmacy_orders: pharmacy_ordersSlice,
    sick_leaves: sick_leavesSlice,
    visits: visitsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    organizations: organizationsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
