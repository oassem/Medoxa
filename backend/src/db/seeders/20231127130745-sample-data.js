const db = require('../models');
const Users = db.users;

const AppointmentRules = db.appointment_rules;

const Appointments = db.appointments;

const Departments = db.departments;

const DoctorAvailabilities = db.doctor_availabilities;

const Holidays = db.holidays;

const ImagingInvestigations = db.imaging_investigations;

const ImagingOrderItems = db.imaging_order_items;

const ImagingOrders = db.imaging_orders;

const Insurances = db.insurances;

const InvoiceItems = db.invoice_items;

const Invoices = db.invoices;

const LabOrderItems = db.lab_order_items;

const LabOrders = db.lab_orders;

const LabTests = db.lab_tests;

const Medications = db.medications;

const PatientDocuments = db.patient_documents;

const Patients = db.patients;

const PharmacyOrderItems = db.pharmacy_order_items;

const PharmacyOrders = db.pharmacy_orders;

const SickLeaves = db.sick_leaves;

const Visits = db.visits;

const Organizations = db.organizations;

const AppointmentRulesData = [
  {
    // type code here for "relation_one" field

    min_hours_before_booking: 7,

    max_days_advance_booking: 7,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    min_hours_before_booking: 3,

    max_days_advance_booking: 9,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    min_hours_before_booking: 7,

    max_days_advance_booking: 5,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    min_hours_before_booking: 3,

    max_days_advance_booking: 3,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    min_hours_before_booking: 9,

    max_days_advance_booking: 4,

    // type code here for "relation_one" field
  },
];

const AppointmentsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date(Date.now()),

    start_time: new Date(Date.now()),

    end_time: new Date(Date.now()),

    type: 'New',

    status: 'CheckedIn',

    reminder_sent: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date(Date.now()),

    start_time: new Date(Date.now()),

    end_time: new Date(Date.now()),

    type: 'New',

    status: 'Canceled',

    reminder_sent: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date(Date.now()),

    start_time: new Date(Date.now()),

    end_time: new Date(Date.now()),

    type: 'FollowUp',

    status: 'Rescheduled',

    reminder_sent: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date(Date.now()),

    start_time: new Date(Date.now()),

    end_time: new Date(Date.now()),

    type: 'New',

    status: 'CheckedIn',

    reminder_sent: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    appointment_date: new Date(Date.now()),

    start_time: new Date(Date.now()),

    end_time: new Date(Date.now()),

    type: 'New',

    status: 'Completed',

    reminder_sent: false,

    // type code here for "relation_one" field
  },
];

const DepartmentsData = [
  {
    // type code here for "relation_one" field

    name: 'Cardiology',

    description: 'Heart and vascular care department.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    name: 'Radiology',

    description: 'Imaging and diagnostic services.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    name: 'Pediatrics',

    description: 'Child healthcare and wellness.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    name: 'Orthopedics',

    description: 'Bone and joint care services.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    name: 'Dermatology',

    description: 'Skin care and treatment.',

    // type code here for "relation_one" field
  },
];

const DoctorAvailabilitiesData = [
  {
    // type code here for "relation_one" field

    weekday: 'Charles Lyell',

    morning_start_time: new Date(Date.now()),

    morning_end_time: new Date(Date.now()),

    evening_start_time: new Date(Date.now()),

    evening_end_time: new Date(Date.now()),

    slot_duration_minutes: 7,

    is_active: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    weekday: 'George Gaylord Simpson',

    morning_start_time: new Date(Date.now()),

    morning_end_time: new Date(Date.now()),

    evening_start_time: new Date(Date.now()),

    evening_end_time: new Date(Date.now()),

    slot_duration_minutes: 1,

    is_active: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    weekday: 'Lynn Margulis',

    morning_start_time: new Date(Date.now()),

    morning_end_time: new Date(Date.now()),

    evening_start_time: new Date(Date.now()),

    evening_end_time: new Date(Date.now()),

    slot_duration_minutes: 5,

    is_active: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    weekday: 'Gregor Mendel',

    morning_start_time: new Date(Date.now()),

    morning_end_time: new Date(Date.now()),

    evening_start_time: new Date(Date.now()),

    evening_end_time: new Date(Date.now()),

    slot_duration_minutes: 7,

    is_active: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    weekday: 'Galileo Galilei',

    morning_start_time: new Date(Date.now()),

    morning_end_time: new Date(Date.now()),

    evening_start_time: new Date(Date.now()),

    evening_end_time: new Date(Date.now()),

    slot_duration_minutes: 5,

    is_active: false,

    // type code here for "relation_one" field
  },
];

const HolidaysData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    notes: 'Edwin Hubble',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    notes: 'August Kekule',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    notes: 'Carl Linnaeus',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    notes: 'Albrecht von Haller',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    notes: 'B. F. Skinner',

    // type code here for "relation_one" field
  },
];

const ImagingInvestigationsData = [
  {
    name: 'Antoine Laurent Lavoisier',

    description: 'Albert Einstein',

    price: 19.63,

    // type code here for "relation_one" field
  },

  {
    name: 'Max von Laue',

    description: 'Robert Koch',

    price: 22.12,

    // type code here for "relation_one" field
  },

  {
    name: 'Christiaan Huygens',

    description: 'George Gaylord Simpson',

    price: 36.28,

    // type code here for "relation_one" field
  },

  {
    name: 'Alfred Kinsey',

    description: 'Jean Baptiste Lamarck',

    price: 73.55,

    // type code here for "relation_one" field
  },

  {
    name: 'Antoine Laurent Lavoisier',

    description: 'B. F. Skinner',

    price: 53.44,

    // type code here for "relation_one" field
  },
];

const ImagingOrderItemsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },
];

const ImagingOrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 17.16,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 78.06,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 79.91,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 73.89,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 39.49,

    status: 'Completed',

    // type code here for "relation_one" field
  },
];

const InsurancesData = [
  {
    // type code here for "relation_one" field

    provider_name: 'Enrico Fermi',

    policy_number: 'Archimedes',

    coverage_start: new Date(Date.now()),

    coverage_end: new Date(Date.now()),

    plan_details: 'Wilhelm Wundt',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    provider_name: 'Louis Pasteur',

    policy_number: 'Charles Darwin',

    coverage_start: new Date(Date.now()),

    coverage_end: new Date(Date.now()),

    plan_details: 'Edwin Hubble',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    provider_name: 'Max Born',

    policy_number: 'Gustav Kirchhoff',

    coverage_start: new Date(Date.now()),

    coverage_end: new Date(Date.now()),

    plan_details: 'Galileo Galilei',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    provider_name: 'Rudolf Virchow',

    policy_number: 'Jean Piaget',

    coverage_start: new Date(Date.now()),

    coverage_end: new Date(Date.now()),

    plan_details: 'Pierre Simon de Laplace',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    provider_name: 'Marcello Malpighi',

    policy_number: 'Francis Crick',

    coverage_start: new Date(Date.now()),

    coverage_end: new Date(Date.now()),

    plan_details: 'Rudolf Virchow',

    // type code here for "relation_one" field
  },
];

const InvoiceItemsData = [
  {
    // type code here for "relation_one" field

    description: 'Francis Crick',

    amount: 10.43,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    description: 'Emil Fischer',

    amount: 24.26,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    description: 'John von Neumann',

    amount: 29.62,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    description: 'Louis Victor de Broglie',

    amount: 77.07,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    description: 'Lynn Margulis',

    amount: 55.49,

    // type code here for "relation_one" field
  },
];

const InvoicesData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 64.09,

    vat_amount: 65.48,

    is_paid: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 45.63,

    vat_amount: 66.36,

    is_paid: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 95.47,

    vat_amount: 95.57,

    is_paid: false,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 50.71,

    vat_amount: 50.25,

    is_paid: true,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 29.03,

    vat_amount: 92.33,

    is_paid: true,

    // type code here for "relation_one" field
  },
];

const LabOrderItemsData = [
  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field
    // type code here for "relation_one" field
    // type code here for "relation_one" field
  },
];

const LabOrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 88.86,

    status: 'Pending',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 69.61,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 81.99,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 11.19,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 25.93,

    status: 'Pending',

    // type code here for "relation_one" field
  },
];

const LabTestsData = [
  {
    name: 'Alfred Binet',

    description: 'Paul Dirac',

    price: 83.38,

    // type code here for "relation_one" field
  },

  {
    name: 'Jean Baptiste Lamarck',

    description: 'Konrad Lorenz',

    price: 76.59,

    // type code here for "relation_one" field
  },

  {
    name: 'Max Born',

    description: 'Gertrude Belle Elion',

    price: 10.99,

    // type code here for "relation_one" field
  },

  {
    name: 'Robert Koch',

    description: 'Carl Linnaeus',

    price: 19.91,

    // type code here for "relation_one" field
  },

  {
    name: 'Louis Pasteur',

    description: 'Konrad Lorenz',

    price: 23.89,

    // type code here for "relation_one" field
  },
];

const MedicationsData = [
  {
    name: 'Leonard Euler',

    description: 'Ernst Haeckel',

    price: 40.77,

    // type code here for "relation_one" field
  },

  {
    name: 'Theodosius Dobzhansky',

    description: 'John von Neumann',

    price: 62.49,

    // type code here for "relation_one" field
  },

  {
    name: 'Alfred Binet',

    description: 'Linus Pauling',

    price: 86.78,

    // type code here for "relation_one" field
  },

  {
    name: 'Thomas Hunt Morgan',

    description: 'Frederick Sanger',

    price: 70.09,

    // type code here for "relation_one" field
  },

  {
    name: 'Charles Lyell',

    description: 'Nicolaus Copernicus',

    price: 18.15,

    // type code here for "relation_one" field
  },
];

const PatientDocumentsData = [
  {
    // type code here for "relation_one" field

    document_type: 'Antoine Laurent Lavoisier',

    document_url: 'B. F. Skinner',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    document_type: 'Emil Kraepelin',

    document_url: 'Gustav Kirchhoff',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    document_type: 'Albrecht von Haller',

    document_url: 'Isaac Newton',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    document_type: 'Frederick Sanger',

    document_url: 'Ernst Haeckel',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    document_type: 'Isaac Newton',

    document_url: 'Max Born',

    // type code here for "relation_one" field
  },
];

const PatientsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    full_name_en: 'Ali Al-Qahtani',

    full_name_ar: 'علي القحطاني',

    date_of_birth: new Date('1985-06-15'),

    gender: 'Female',

    nationality: 'Saudi',

    identifier_type: 'Passport',

    identifier: '1012345678',

    address: 'Riyadh, Saudi Arabia',

    emergency_contact_name: 'Sara Al-Qahtani',

    emergency_contact_phone: '0556789012',

    medical_history:
      '{chronic_illnesses: [Hypertension], past_surgeries: [Appendectomy], allergies: [Penicillin], immunizations: [Hepatitis B], current_medications: [Lisinopril], family_history: [Diabetes]}',

    allergies: '{allergies: [Penicillin]}',

    current_medications: '{current_medications: [Lisinopril]}',

    family_history: '{family_history: [Diabetes]}',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    full_name_en: 'Noura Al-Saif',

    full_name_ar: 'نورة السيف',

    date_of_birth: new Date('1990-11-22'),

    gender: 'Other',

    nationality: 'Saudi',

    identifier_type: 'National ID',

    identifier: '2012345678',

    address: 'Jeddah, Saudi Arabia',

    emergency_contact_name: 'Mohammed Al-Saif',

    emergency_contact_phone: '0557890123',

    medical_history:
      '{chronic_illnesses: [Asthma], past_surgeries: [], allergies: [Dust], immunizations: [Influenza], current_medications: [Salbutamol], family_history: [Asthma]}',

    allergies: '{allergies: [Dust]}',

    current_medications: '{current_medications: [Salbutamol]}',

    family_history: '{family_history: [Asthma]}',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    full_name_en: 'Fahad Al-Mutairi',

    full_name_ar: 'فهد المطيري',

    date_of_birth: new Date('1978-03-30'),

    gender: 'Male',

    nationality: 'Saudi',

    identifier_type: 'National ID',

    identifier: 'A12345678',

    address: 'Dammam, Saudi Arabia',

    emergency_contact_name: 'Aisha Al-Mutairi',

    emergency_contact_phone: '0558901234',

    medical_history:
      '{chronic_illnesses: [Diabetes], past_surgeries: [Knee Surgery], allergies: [Nuts], immunizations: [Tetanus], current_medications: [Metformin], family_history: [Hypertension]}',

    allergies: '{allergies: [Nuts]}',

    current_medications: '{current_medications: [Metformin]}',

    family_history: '{family_history: [Hypertension]}',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    full_name_en: 'Mona Al-Rashid',

    full_name_ar: 'منى الرشيد',

    date_of_birth: new Date('1982-08-10'),

    gender: 'Female',

    nationality: 'Saudi',

    identifier_type: 'National ID',

    identifier: '3012345678',

    address: 'Mecca, Saudi Arabia',

    emergency_contact_name: 'Hassan Al-Rashid',

    emergency_contact_phone: '0559012345',

    medical_history:
      '{chronic_illnesses: [Thyroid Disorder], past_surgeries: [], allergies: [Latex], immunizations: [MMR], current_medications: [Levothyroxine], family_history: [Thyroid Disorder]}',

    allergies: '{allergies: [Latex]}',

    current_medications: '{current_medications: [Levothyroxine]}',

    family_history: '{family_history: [Thyroid Disorder]}',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    full_name_en: 'Salem Al-Dosari',

    full_name_ar: 'سالم الدوسري',

    date_of_birth: new Date('1995-01-05'),

    gender: 'Female',

    nationality: 'Saudi',

    identifier_type: 'National ID',

    identifier: '4012345678',

    address: 'Al Khobar, Saudi Arabia',

    emergency_contact_name: 'Fatima Al-Dosari',

    emergency_contact_phone: '0550123456',

    medical_history:
      '{chronic_illnesses: [], past_surgeries: [], allergies: [Pollen], immunizations: [Polio], current_medications: [], family_history: []}',

    allergies: '{allergies: [Pollen]}',

    current_medications: '{current_medications: []}',

    family_history: '{family_history: []}',

    // type code here for "relation_one" field
  },
];

const PharmacyOrderItemsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 2,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 4,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 6,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 6,

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    quantity: 9,

    // type code here for "relation_one" field
  },
];

const PharmacyOrdersData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 31.04,

    status: 'Pending',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 52.62,

    status: 'Pending',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 50.44,

    status: 'Completed',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 55.13,

    status: 'Pending',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    total_amount: 18.67,

    status: 'Completed',

    // type code here for "relation_one" field
  },
];

const SickLeavesData = [
  {
    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    diagnosis: 'Emil Kraepelin',

    instructions: 'Theodosius Dobzhansky',

    document_url: 'Leonard Euler',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    diagnosis: 'Leonard Euler',

    instructions: 'Jean Piaget',

    document_url: 'Franz Boas',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    diagnosis: 'B. F. Skinner',

    instructions: 'Paul Ehrlich',

    document_url: 'Wilhelm Wundt',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    diagnosis: 'Murray Gell-Mann',

    instructions: 'Andreas Vesalius',

    document_url: 'Emil Fischer',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    start_date: new Date(Date.now()),

    end_date: new Date(Date.now()),

    diagnosis: 'Heike Kamerlingh Onnes',

    instructions: 'Paul Ehrlich',

    document_url: 'Charles Sherrington',

    // type code here for "relation_one" field
  },
];

const VisitsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    visit_datetime: new Date(Date.now()),

    symptoms: 'Max von Laue',

    diagnosis: 'Frederick Gowland Hopkins',

    notes: 'Willard Libby',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    visit_datetime: new Date(Date.now()),

    symptoms: 'Max Planck',

    diagnosis: 'Archimedes',

    notes: 'Emil Kraepelin',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    visit_datetime: new Date(Date.now()),

    symptoms: 'Theodosius Dobzhansky',

    diagnosis: 'Rudolf Virchow',

    notes: 'John Bardeen',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    visit_datetime: new Date(Date.now()),

    symptoms: 'Linus Pauling',

    diagnosis: 'Heike Kamerlingh Onnes',

    notes: 'Max Delbruck',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    visit_datetime: new Date(Date.now()),

    symptoms: 'John von Neumann',

    diagnosis: 'Christiaan Huygens',

    notes: 'Jonas Salk',

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'HealthCare Group A',
  },

  {
    name: 'Wellness Clinics',
  },

  {
    name: 'Medico Hospitals',
  },

  {
    name: 'CarePlus Health',
  },

  {
    name: 'Prime Health Network',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setOrganization) {
    await User4.setOrganization(relatedOrganization4);
  }
}

async function associateAppointmentRuleWithDepartment() {
  const relatedDepartment0 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const AppointmentRule0 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (AppointmentRule0?.setDepartment) {
    await AppointmentRule0.setDepartment(relatedDepartment0);
  }

  const relatedDepartment1 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const AppointmentRule1 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (AppointmentRule1?.setDepartment) {
    await AppointmentRule1.setDepartment(relatedDepartment1);
  }

  const relatedDepartment2 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const AppointmentRule2 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (AppointmentRule2?.setDepartment) {
    await AppointmentRule2.setDepartment(relatedDepartment2);
  }

  const relatedDepartment3 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const AppointmentRule3 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (AppointmentRule3?.setDepartment) {
    await AppointmentRule3.setDepartment(relatedDepartment3);
  }

  const relatedDepartment4 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const AppointmentRule4 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (AppointmentRule4?.setDepartment) {
    await AppointmentRule4.setDepartment(relatedDepartment4);
  }
}

async function associateAppointmentRuleWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const AppointmentRule0 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (AppointmentRule0?.setOrganization) {
    await AppointmentRule0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const AppointmentRule1 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (AppointmentRule1?.setOrganization) {
    await AppointmentRule1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const AppointmentRule2 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (AppointmentRule2?.setOrganization) {
    await AppointmentRule2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const AppointmentRule3 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (AppointmentRule3?.setOrganization) {
    await AppointmentRule3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const AppointmentRule4 = await AppointmentRules.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (AppointmentRule4?.setOrganization) {
    await AppointmentRule4.setOrganization(relatedOrganization4);
  }
}

async function associateAppointmentWithPatient() {
  const relatedPatient0 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setPatient) {
    await Appointment0.setPatient(relatedPatient0);
  }

  const relatedPatient1 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setPatient) {
    await Appointment1.setPatient(relatedPatient1);
  }

  const relatedPatient2 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setPatient) {
    await Appointment2.setPatient(relatedPatient2);
  }

  const relatedPatient3 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setPatient) {
    await Appointment3.setPatient(relatedPatient3);
  }

  const relatedPatient4 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setPatient) {
    await Appointment4.setPatient(relatedPatient4);
  }
}

async function associateAppointmentWithDoctor() {
  const relatedDoctor0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setDoctor) {
    await Appointment0.setDoctor(relatedDoctor0);
  }

  const relatedDoctor1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setDoctor) {
    await Appointment1.setDoctor(relatedDoctor1);
  }

  const relatedDoctor2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setDoctor) {
    await Appointment2.setDoctor(relatedDoctor2);
  }

  const relatedDoctor3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setDoctor) {
    await Appointment3.setDoctor(relatedDoctor3);
  }

  const relatedDoctor4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setDoctor) {
    await Appointment4.setDoctor(relatedDoctor4);
  }
}

async function associateAppointmentWithDepartment() {
  const relatedDepartment0 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setDepartment) {
    await Appointment0.setDepartment(relatedDepartment0);
  }

  const relatedDepartment1 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setDepartment) {
    await Appointment1.setDepartment(relatedDepartment1);
  }

  const relatedDepartment2 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setDepartment) {
    await Appointment2.setDepartment(relatedDepartment2);
  }

  const relatedDepartment3 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setDepartment) {
    await Appointment3.setDepartment(relatedDepartment3);
  }

  const relatedDepartment4 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setDepartment) {
    await Appointment4.setDepartment(relatedDepartment4);
  }
}

async function associateAppointmentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setOrganization) {
    await Appointment0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setOrganization) {
    await Appointment1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setOrganization) {
    await Appointment2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setOrganization) {
    await Appointment3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setOrganization) {
    await Appointment4.setOrganization(relatedOrganization4);
  }
}

async function associateAppointmentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment0 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Appointment0?.setOrganization) {
    await Appointment0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment1 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Appointment1?.setOrganization) {
    await Appointment1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment2 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Appointment2?.setOrganization) {
    await Appointment2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment3 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Appointment3?.setOrganization) {
    await Appointment3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Appointment4 = await Appointments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Appointment4?.setOrganization) {
    await Appointment4.setOrganization(relatedOrganization4);
  }
}

async function associateDepartmentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department0 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Department0?.setOrganization) {
    await Department0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department1 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Department1?.setOrganization) {
    await Department1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department2 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Department2?.setOrganization) {
    await Department2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department3 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Department3?.setOrganization) {
    await Department3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department4 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Department4?.setOrganization) {
    await Department4.setOrganization(relatedOrganization4);
  }
}

async function associateDepartmentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department0 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Department0?.setOrganization) {
    await Department0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department1 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Department1?.setOrganization) {
    await Department1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department2 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Department2?.setOrganization) {
    await Department2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department3 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Department3?.setOrganization) {
    await Department3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Department4 = await Departments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Department4?.setOrganization) {
    await Department4.setOrganization(relatedOrganization4);
  }
}

async function associateDoctorAvailabilityWithDoctor() {
  const relatedDoctor0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DoctorAvailability0 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DoctorAvailability0?.setDoctor) {
    await DoctorAvailability0.setDoctor(relatedDoctor0);
  }

  const relatedDoctor1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DoctorAvailability1 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DoctorAvailability1?.setDoctor) {
    await DoctorAvailability1.setDoctor(relatedDoctor1);
  }

  const relatedDoctor2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DoctorAvailability2 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DoctorAvailability2?.setDoctor) {
    await DoctorAvailability2.setDoctor(relatedDoctor2);
  }

  const relatedDoctor3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DoctorAvailability3 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DoctorAvailability3?.setDoctor) {
    await DoctorAvailability3.setDoctor(relatedDoctor3);
  }

  const relatedDoctor4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const DoctorAvailability4 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DoctorAvailability4?.setDoctor) {
    await DoctorAvailability4.setDoctor(relatedDoctor4);
  }
}

async function associateDoctorAvailabilityWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DoctorAvailability0 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (DoctorAvailability0?.setOrganization) {
    await DoctorAvailability0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DoctorAvailability1 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (DoctorAvailability1?.setOrganization) {
    await DoctorAvailability1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DoctorAvailability2 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (DoctorAvailability2?.setOrganization) {
    await DoctorAvailability2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DoctorAvailability3 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (DoctorAvailability3?.setOrganization) {
    await DoctorAvailability3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const DoctorAvailability4 = await DoctorAvailabilities.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (DoctorAvailability4?.setOrganization) {
    await DoctorAvailability4.setOrganization(relatedOrganization4);
  }
}

async function associateHolidayWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday0 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Holiday0?.setOrganization) {
    await Holiday0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday1 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Holiday1?.setOrganization) {
    await Holiday1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday2 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Holiday2?.setOrganization) {
    await Holiday2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday3 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Holiday3?.setOrganization) {
    await Holiday3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday4 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Holiday4?.setOrganization) {
    await Holiday4.setOrganization(relatedOrganization4);
  }
}

async function associateHolidayWithDoctor() {
  const relatedDoctor0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Holiday0 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Holiday0?.setDoctor) {
    await Holiday0.setDoctor(relatedDoctor0);
  }

  const relatedDoctor1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Holiday1 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Holiday1?.setDoctor) {
    await Holiday1.setDoctor(relatedDoctor1);
  }

  const relatedDoctor2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Holiday2 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Holiday2?.setDoctor) {
    await Holiday2.setDoctor(relatedDoctor2);
  }

  const relatedDoctor3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Holiday3 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Holiday3?.setDoctor) {
    await Holiday3.setDoctor(relatedDoctor3);
  }

  const relatedDoctor4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Holiday4 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Holiday4?.setDoctor) {
    await Holiday4.setDoctor(relatedDoctor4);
  }
}

async function associateHolidayWithDepartment() {
  const relatedDepartment0 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Holiday0 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Holiday0?.setDepartment) {
    await Holiday0.setDepartment(relatedDepartment0);
  }

  const relatedDepartment1 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Holiday1 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Holiday1?.setDepartment) {
    await Holiday1.setDepartment(relatedDepartment1);
  }

  const relatedDepartment2 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Holiday2 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Holiday2?.setDepartment) {
    await Holiday2.setDepartment(relatedDepartment2);
  }

  const relatedDepartment3 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Holiday3 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Holiday3?.setDepartment) {
    await Holiday3.setDepartment(relatedDepartment3);
  }

  const relatedDepartment4 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Holiday4 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Holiday4?.setDepartment) {
    await Holiday4.setDepartment(relatedDepartment4);
  }
}

async function associateHolidayWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday0 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Holiday0?.setOrganization) {
    await Holiday0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday1 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Holiday1?.setOrganization) {
    await Holiday1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday2 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Holiday2?.setOrganization) {
    await Holiday2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday3 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Holiday3?.setOrganization) {
    await Holiday3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Holiday4 = await Holidays.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Holiday4?.setOrganization) {
    await Holiday4.setOrganization(relatedOrganization4);
  }
}

async function associateImagingInvestigationWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingInvestigation0 = await ImagingInvestigations.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingInvestigation0?.setOrganization) {
    await ImagingInvestigation0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingInvestigation1 = await ImagingInvestigations.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingInvestigation1?.setOrganization) {
    await ImagingInvestigation1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingInvestigation2 = await ImagingInvestigations.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingInvestigation2?.setOrganization) {
    await ImagingInvestigation2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingInvestigation3 = await ImagingInvestigations.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingInvestigation3?.setOrganization) {
    await ImagingInvestigation3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingInvestigation4 = await ImagingInvestigations.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingInvestigation4?.setOrganization) {
    await ImagingInvestigation4.setOrganization(relatedOrganization4);
  }
}

async function associateImagingOrderItemWithImaging_order() {
  const relatedImaging_order0 = await ImagingOrders.findOne({
    offset: Math.floor(Math.random() * (await ImagingOrders.count())),
  });
  const ImagingOrderItem0 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingOrderItem0?.setImaging_order) {
    await ImagingOrderItem0.setImaging_order(relatedImaging_order0);
  }

  const relatedImaging_order1 = await ImagingOrders.findOne({
    offset: Math.floor(Math.random() * (await ImagingOrders.count())),
  });
  const ImagingOrderItem1 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingOrderItem1?.setImaging_order) {
    await ImagingOrderItem1.setImaging_order(relatedImaging_order1);
  }

  const relatedImaging_order2 = await ImagingOrders.findOne({
    offset: Math.floor(Math.random() * (await ImagingOrders.count())),
  });
  const ImagingOrderItem2 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingOrderItem2?.setImaging_order) {
    await ImagingOrderItem2.setImaging_order(relatedImaging_order2);
  }

  const relatedImaging_order3 = await ImagingOrders.findOne({
    offset: Math.floor(Math.random() * (await ImagingOrders.count())),
  });
  const ImagingOrderItem3 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingOrderItem3?.setImaging_order) {
    await ImagingOrderItem3.setImaging_order(relatedImaging_order3);
  }

  const relatedImaging_order4 = await ImagingOrders.findOne({
    offset: Math.floor(Math.random() * (await ImagingOrders.count())),
  });
  const ImagingOrderItem4 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingOrderItem4?.setImaging_order) {
    await ImagingOrderItem4.setImaging_order(relatedImaging_order4);
  }
}

async function associateImagingOrderItemWithImaging_investigation() {
  const relatedImaging_investigation0 = await ImagingInvestigations.findOne({
    offset: Math.floor(Math.random() * (await ImagingInvestigations.count())),
  });
  const ImagingOrderItem0 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingOrderItem0?.setImaging_investigation) {
    await ImagingOrderItem0.setImaging_investigation(
      relatedImaging_investigation0,
    );
  }

  const relatedImaging_investigation1 = await ImagingInvestigations.findOne({
    offset: Math.floor(Math.random() * (await ImagingInvestigations.count())),
  });
  const ImagingOrderItem1 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingOrderItem1?.setImaging_investigation) {
    await ImagingOrderItem1.setImaging_investigation(
      relatedImaging_investigation1,
    );
  }

  const relatedImaging_investigation2 = await ImagingInvestigations.findOne({
    offset: Math.floor(Math.random() * (await ImagingInvestigations.count())),
  });
  const ImagingOrderItem2 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingOrderItem2?.setImaging_investigation) {
    await ImagingOrderItem2.setImaging_investigation(
      relatedImaging_investigation2,
    );
  }

  const relatedImaging_investigation3 = await ImagingInvestigations.findOne({
    offset: Math.floor(Math.random() * (await ImagingInvestigations.count())),
  });
  const ImagingOrderItem3 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingOrderItem3?.setImaging_investigation) {
    await ImagingOrderItem3.setImaging_investigation(
      relatedImaging_investigation3,
    );
  }

  const relatedImaging_investigation4 = await ImagingInvestigations.findOne({
    offset: Math.floor(Math.random() * (await ImagingInvestigations.count())),
  });
  const ImagingOrderItem4 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingOrderItem4?.setImaging_investigation) {
    await ImagingOrderItem4.setImaging_investigation(
      relatedImaging_investigation4,
    );
  }
}

async function associateImagingOrderItemWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrderItem0 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingOrderItem0?.setOrganization) {
    await ImagingOrderItem0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrderItem1 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingOrderItem1?.setOrganization) {
    await ImagingOrderItem1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrderItem2 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingOrderItem2?.setOrganization) {
    await ImagingOrderItem2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrderItem3 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingOrderItem3?.setOrganization) {
    await ImagingOrderItem3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrderItem4 = await ImagingOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingOrderItem4?.setOrganization) {
    await ImagingOrderItem4.setOrganization(relatedOrganization4);
  }
}

async function associateImagingOrderWithVisit() {
  const relatedVisit0 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const ImagingOrder0 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingOrder0?.setVisit) {
    await ImagingOrder0.setVisit(relatedVisit0);
  }

  const relatedVisit1 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const ImagingOrder1 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingOrder1?.setVisit) {
    await ImagingOrder1.setVisit(relatedVisit1);
  }

  const relatedVisit2 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const ImagingOrder2 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingOrder2?.setVisit) {
    await ImagingOrder2.setVisit(relatedVisit2);
  }

  const relatedVisit3 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const ImagingOrder3 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingOrder3?.setVisit) {
    await ImagingOrder3.setVisit(relatedVisit3);
  }

  const relatedVisit4 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const ImagingOrder4 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingOrder4?.setVisit) {
    await ImagingOrder4.setVisit(relatedVisit4);
  }
}

async function associateImagingOrderWithImaging_technician() {
  const relatedImaging_technician0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ImagingOrder0 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingOrder0?.setImaging_technician) {
    await ImagingOrder0.setImaging_technician(relatedImaging_technician0);
  }

  const relatedImaging_technician1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ImagingOrder1 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingOrder1?.setImaging_technician) {
    await ImagingOrder1.setImaging_technician(relatedImaging_technician1);
  }

  const relatedImaging_technician2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ImagingOrder2 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingOrder2?.setImaging_technician) {
    await ImagingOrder2.setImaging_technician(relatedImaging_technician2);
  }

  const relatedImaging_technician3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ImagingOrder3 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingOrder3?.setImaging_technician) {
    await ImagingOrder3.setImaging_technician(relatedImaging_technician3);
  }

  const relatedImaging_technician4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const ImagingOrder4 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingOrder4?.setImaging_technician) {
    await ImagingOrder4.setImaging_technician(relatedImaging_technician4);
  }
}

async function associateImagingOrderWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrder0 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ImagingOrder0?.setOrganization) {
    await ImagingOrder0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrder1 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ImagingOrder1?.setOrganization) {
    await ImagingOrder1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrder2 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ImagingOrder2?.setOrganization) {
    await ImagingOrder2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrder3 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (ImagingOrder3?.setOrganization) {
    await ImagingOrder3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const ImagingOrder4 = await ImagingOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (ImagingOrder4?.setOrganization) {
    await ImagingOrder4.setOrganization(relatedOrganization4);
  }
}

async function associateInsuranceWithPatient() {
  const relatedPatient0 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Insurance0 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Insurance0?.setPatient) {
    await Insurance0.setPatient(relatedPatient0);
  }

  const relatedPatient1 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Insurance1 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Insurance1?.setPatient) {
    await Insurance1.setPatient(relatedPatient1);
  }

  const relatedPatient2 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Insurance2 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Insurance2?.setPatient) {
    await Insurance2.setPatient(relatedPatient2);
  }

  const relatedPatient3 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Insurance3 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Insurance3?.setPatient) {
    await Insurance3.setPatient(relatedPatient3);
  }

  const relatedPatient4 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Insurance4 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Insurance4?.setPatient) {
    await Insurance4.setPatient(relatedPatient4);
  }
}

async function associateInsuranceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Insurance0 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Insurance0?.setOrganization) {
    await Insurance0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Insurance1 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Insurance1?.setOrganization) {
    await Insurance1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Insurance2 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Insurance2?.setOrganization) {
    await Insurance2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Insurance3 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Insurance3?.setOrganization) {
    await Insurance3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Insurance4 = await Insurances.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Insurance4?.setOrganization) {
    await Insurance4.setOrganization(relatedOrganization4);
  }
}

async function associateInvoiceItemWithInvoice() {
  const relatedInvoice0 = await Invoices.findOne({
    offset: Math.floor(Math.random() * (await Invoices.count())),
  });
  const InvoiceItem0 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (InvoiceItem0?.setInvoice) {
    await InvoiceItem0.setInvoice(relatedInvoice0);
  }

  const relatedInvoice1 = await Invoices.findOne({
    offset: Math.floor(Math.random() * (await Invoices.count())),
  });
  const InvoiceItem1 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (InvoiceItem1?.setInvoice) {
    await InvoiceItem1.setInvoice(relatedInvoice1);
  }

  const relatedInvoice2 = await Invoices.findOne({
    offset: Math.floor(Math.random() * (await Invoices.count())),
  });
  const InvoiceItem2 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (InvoiceItem2?.setInvoice) {
    await InvoiceItem2.setInvoice(relatedInvoice2);
  }

  const relatedInvoice3 = await Invoices.findOne({
    offset: Math.floor(Math.random() * (await Invoices.count())),
  });
  const InvoiceItem3 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (InvoiceItem3?.setInvoice) {
    await InvoiceItem3.setInvoice(relatedInvoice3);
  }

  const relatedInvoice4 = await Invoices.findOne({
    offset: Math.floor(Math.random() * (await Invoices.count())),
  });
  const InvoiceItem4 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (InvoiceItem4?.setInvoice) {
    await InvoiceItem4.setInvoice(relatedInvoice4);
  }
}

async function associateInvoiceItemWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InvoiceItem0 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (InvoiceItem0?.setOrganization) {
    await InvoiceItem0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InvoiceItem1 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (InvoiceItem1?.setOrganization) {
    await InvoiceItem1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InvoiceItem2 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (InvoiceItem2?.setOrganization) {
    await InvoiceItem2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InvoiceItem3 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (InvoiceItem3?.setOrganization) {
    await InvoiceItem3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const InvoiceItem4 = await InvoiceItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (InvoiceItem4?.setOrganization) {
    await InvoiceItem4.setOrganization(relatedOrganization4);
  }
}

async function associateInvoiceWithPatient() {
  const relatedPatient0 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setPatient) {
    await Invoice0.setPatient(relatedPatient0);
  }

  const relatedPatient1 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setPatient) {
    await Invoice1.setPatient(relatedPatient1);
  }

  const relatedPatient2 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setPatient) {
    await Invoice2.setPatient(relatedPatient2);
  }

  const relatedPatient3 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setPatient) {
    await Invoice3.setPatient(relatedPatient3);
  }

  const relatedPatient4 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setPatient) {
    await Invoice4.setPatient(relatedPatient4);
  }
}

async function associateInvoiceWithVisit() {
  const relatedVisit0 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setVisit) {
    await Invoice0.setVisit(relatedVisit0);
  }

  const relatedVisit1 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setVisit) {
    await Invoice1.setVisit(relatedVisit1);
  }

  const relatedVisit2 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setVisit) {
    await Invoice2.setVisit(relatedVisit2);
  }

  const relatedVisit3 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setVisit) {
    await Invoice3.setVisit(relatedVisit3);
  }

  const relatedVisit4 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setVisit) {
    await Invoice4.setVisit(relatedVisit4);
  }
}

async function associateInvoiceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setOrganization) {
    await Invoice0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setOrganization) {
    await Invoice1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setOrganization) {
    await Invoice2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setOrganization) {
    await Invoice3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setOrganization) {
    await Invoice4.setOrganization(relatedOrganization4);
  }
}

async function associateInvoiceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice0 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Invoice0?.setOrganization) {
    await Invoice0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice1 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Invoice1?.setOrganization) {
    await Invoice1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice2 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Invoice2?.setOrganization) {
    await Invoice2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice3 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Invoice3?.setOrganization) {
    await Invoice3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Invoice4 = await Invoices.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Invoice4?.setOrganization) {
    await Invoice4.setOrganization(relatedOrganization4);
  }
}

async function associateLabOrderItemWithLab_order() {
  const relatedLab_order0 = await LabOrders.findOne({
    offset: Math.floor(Math.random() * (await LabOrders.count())),
  });
  const LabOrderItem0 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabOrderItem0?.setLab_order) {
    await LabOrderItem0.setLab_order(relatedLab_order0);
  }

  const relatedLab_order1 = await LabOrders.findOne({
    offset: Math.floor(Math.random() * (await LabOrders.count())),
  });
  const LabOrderItem1 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabOrderItem1?.setLab_order) {
    await LabOrderItem1.setLab_order(relatedLab_order1);
  }

  const relatedLab_order2 = await LabOrders.findOne({
    offset: Math.floor(Math.random() * (await LabOrders.count())),
  });
  const LabOrderItem2 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabOrderItem2?.setLab_order) {
    await LabOrderItem2.setLab_order(relatedLab_order2);
  }

  const relatedLab_order3 = await LabOrders.findOne({
    offset: Math.floor(Math.random() * (await LabOrders.count())),
  });
  const LabOrderItem3 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabOrderItem3?.setLab_order) {
    await LabOrderItem3.setLab_order(relatedLab_order3);
  }

  const relatedLab_order4 = await LabOrders.findOne({
    offset: Math.floor(Math.random() * (await LabOrders.count())),
  });
  const LabOrderItem4 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabOrderItem4?.setLab_order) {
    await LabOrderItem4.setLab_order(relatedLab_order4);
  }
}

async function associateLabOrderItemWithLab_test() {
  const relatedLab_test0 = await LabTests.findOne({
    offset: Math.floor(Math.random() * (await LabTests.count())),
  });
  const LabOrderItem0 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabOrderItem0?.setLab_test) {
    await LabOrderItem0.setLab_test(relatedLab_test0);
  }

  const relatedLab_test1 = await LabTests.findOne({
    offset: Math.floor(Math.random() * (await LabTests.count())),
  });
  const LabOrderItem1 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabOrderItem1?.setLab_test) {
    await LabOrderItem1.setLab_test(relatedLab_test1);
  }

  const relatedLab_test2 = await LabTests.findOne({
    offset: Math.floor(Math.random() * (await LabTests.count())),
  });
  const LabOrderItem2 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabOrderItem2?.setLab_test) {
    await LabOrderItem2.setLab_test(relatedLab_test2);
  }

  const relatedLab_test3 = await LabTests.findOne({
    offset: Math.floor(Math.random() * (await LabTests.count())),
  });
  const LabOrderItem3 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabOrderItem3?.setLab_test) {
    await LabOrderItem3.setLab_test(relatedLab_test3);
  }

  const relatedLab_test4 = await LabTests.findOne({
    offset: Math.floor(Math.random() * (await LabTests.count())),
  });
  const LabOrderItem4 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabOrderItem4?.setLab_test) {
    await LabOrderItem4.setLab_test(relatedLab_test4);
  }
}

async function associateLabOrderItemWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrderItem0 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabOrderItem0?.setOrganization) {
    await LabOrderItem0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrderItem1 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabOrderItem1?.setOrganization) {
    await LabOrderItem1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrderItem2 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabOrderItem2?.setOrganization) {
    await LabOrderItem2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrderItem3 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabOrderItem3?.setOrganization) {
    await LabOrderItem3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrderItem4 = await LabOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabOrderItem4?.setOrganization) {
    await LabOrderItem4.setOrganization(relatedOrganization4);
  }
}

async function associateLabOrderWithVisit() {
  const relatedVisit0 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const LabOrder0 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabOrder0?.setVisit) {
    await LabOrder0.setVisit(relatedVisit0);
  }

  const relatedVisit1 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const LabOrder1 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabOrder1?.setVisit) {
    await LabOrder1.setVisit(relatedVisit1);
  }

  const relatedVisit2 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const LabOrder2 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabOrder2?.setVisit) {
    await LabOrder2.setVisit(relatedVisit2);
  }

  const relatedVisit3 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const LabOrder3 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabOrder3?.setVisit) {
    await LabOrder3.setVisit(relatedVisit3);
  }

  const relatedVisit4 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const LabOrder4 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabOrder4?.setVisit) {
    await LabOrder4.setVisit(relatedVisit4);
  }
}

async function associateLabOrderWithLab_technician() {
  const relatedLab_technician0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const LabOrder0 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabOrder0?.setLab_technician) {
    await LabOrder0.setLab_technician(relatedLab_technician0);
  }

  const relatedLab_technician1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const LabOrder1 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabOrder1?.setLab_technician) {
    await LabOrder1.setLab_technician(relatedLab_technician1);
  }

  const relatedLab_technician2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const LabOrder2 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabOrder2?.setLab_technician) {
    await LabOrder2.setLab_technician(relatedLab_technician2);
  }

  const relatedLab_technician3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const LabOrder3 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabOrder3?.setLab_technician) {
    await LabOrder3.setLab_technician(relatedLab_technician3);
  }

  const relatedLab_technician4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const LabOrder4 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabOrder4?.setLab_technician) {
    await LabOrder4.setLab_technician(relatedLab_technician4);
  }
}

async function associateLabOrderWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrder0 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabOrder0?.setOrganization) {
    await LabOrder0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrder1 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabOrder1?.setOrganization) {
    await LabOrder1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrder2 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabOrder2?.setOrganization) {
    await LabOrder2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrder3 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabOrder3?.setOrganization) {
    await LabOrder3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabOrder4 = await LabOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabOrder4?.setOrganization) {
    await LabOrder4.setOrganization(relatedOrganization4);
  }
}

async function associateLabTestWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabTest0 = await LabTests.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (LabTest0?.setOrganization) {
    await LabTest0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabTest1 = await LabTests.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (LabTest1?.setOrganization) {
    await LabTest1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabTest2 = await LabTests.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (LabTest2?.setOrganization) {
    await LabTest2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabTest3 = await LabTests.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (LabTest3?.setOrganization) {
    await LabTest3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const LabTest4 = await LabTests.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (LabTest4?.setOrganization) {
    await LabTest4.setOrganization(relatedOrganization4);
  }
}

async function associateMedicationWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Medication0 = await Medications.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Medication0?.setOrganization) {
    await Medication0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Medication1 = await Medications.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Medication1?.setOrganization) {
    await Medication1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Medication2 = await Medications.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Medication2?.setOrganization) {
    await Medication2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Medication3 = await Medications.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Medication3?.setOrganization) {
    await Medication3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Medication4 = await Medications.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Medication4?.setOrganization) {
    await Medication4.setOrganization(relatedOrganization4);
  }
}

async function associatePatientDocumentWithPatient() {
  const relatedPatient0 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const PatientDocument0 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PatientDocument0?.setPatient) {
    await PatientDocument0.setPatient(relatedPatient0);
  }

  const relatedPatient1 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const PatientDocument1 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PatientDocument1?.setPatient) {
    await PatientDocument1.setPatient(relatedPatient1);
  }

  const relatedPatient2 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const PatientDocument2 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PatientDocument2?.setPatient) {
    await PatientDocument2.setPatient(relatedPatient2);
  }

  const relatedPatient3 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const PatientDocument3 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PatientDocument3?.setPatient) {
    await PatientDocument3.setPatient(relatedPatient3);
  }

  const relatedPatient4 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const PatientDocument4 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PatientDocument4?.setPatient) {
    await PatientDocument4.setPatient(relatedPatient4);
  }
}

async function associatePatientDocumentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientDocument0 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PatientDocument0?.setOrganization) {
    await PatientDocument0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientDocument1 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PatientDocument1?.setOrganization) {
    await PatientDocument1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientDocument2 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PatientDocument2?.setOrganization) {
    await PatientDocument2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientDocument3 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PatientDocument3?.setOrganization) {
    await PatientDocument3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PatientDocument4 = await PatientDocuments.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PatientDocument4?.setOrganization) {
    await PatientDocument4.setOrganization(relatedOrganization4);
  }
}

async function associatePatientWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Patient0 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Patient0?.setUser) {
    await Patient0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Patient1 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Patient1?.setUser) {
    await Patient1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Patient2 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Patient2?.setUser) {
    await Patient2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Patient3 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Patient3?.setUser) {
    await Patient3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Patient4 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Patient4?.setUser) {
    await Patient4.setUser(relatedUser4);
  }
}

async function associatePatientWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient0 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Patient0?.setOrganization) {
    await Patient0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient1 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Patient1?.setOrganization) {
    await Patient1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient2 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Patient2?.setOrganization) {
    await Patient2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient3 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Patient3?.setOrganization) {
    await Patient3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient4 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Patient4?.setOrganization) {
    await Patient4.setOrganization(relatedOrganization4);
  }
}

async function associatePatientWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient0 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Patient0?.setOrganization) {
    await Patient0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient1 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Patient1?.setOrganization) {
    await Patient1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient2 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Patient2?.setOrganization) {
    await Patient2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient3 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Patient3?.setOrganization) {
    await Patient3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Patient4 = await Patients.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Patient4?.setOrganization) {
    await Patient4.setOrganization(relatedOrganization4);
  }
}

async function associatePharmacyOrderItemWithPharmacy_order() {
  const relatedPharmacy_order0 = await PharmacyOrders.findOne({
    offset: Math.floor(Math.random() * (await PharmacyOrders.count())),
  });
  const PharmacyOrderItem0 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PharmacyOrderItem0?.setPharmacy_order) {
    await PharmacyOrderItem0.setPharmacy_order(relatedPharmacy_order0);
  }

  const relatedPharmacy_order1 = await PharmacyOrders.findOne({
    offset: Math.floor(Math.random() * (await PharmacyOrders.count())),
  });
  const PharmacyOrderItem1 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PharmacyOrderItem1?.setPharmacy_order) {
    await PharmacyOrderItem1.setPharmacy_order(relatedPharmacy_order1);
  }

  const relatedPharmacy_order2 = await PharmacyOrders.findOne({
    offset: Math.floor(Math.random() * (await PharmacyOrders.count())),
  });
  const PharmacyOrderItem2 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PharmacyOrderItem2?.setPharmacy_order) {
    await PharmacyOrderItem2.setPharmacy_order(relatedPharmacy_order2);
  }

  const relatedPharmacy_order3 = await PharmacyOrders.findOne({
    offset: Math.floor(Math.random() * (await PharmacyOrders.count())),
  });
  const PharmacyOrderItem3 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PharmacyOrderItem3?.setPharmacy_order) {
    await PharmacyOrderItem3.setPharmacy_order(relatedPharmacy_order3);
  }

  const relatedPharmacy_order4 = await PharmacyOrders.findOne({
    offset: Math.floor(Math.random() * (await PharmacyOrders.count())),
  });
  const PharmacyOrderItem4 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PharmacyOrderItem4?.setPharmacy_order) {
    await PharmacyOrderItem4.setPharmacy_order(relatedPharmacy_order4);
  }
}

async function associatePharmacyOrderItemWithMedication() {
  const relatedMedication0 = await Medications.findOne({
    offset: Math.floor(Math.random() * (await Medications.count())),
  });
  const PharmacyOrderItem0 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PharmacyOrderItem0?.setMedication) {
    await PharmacyOrderItem0.setMedication(relatedMedication0);
  }

  const relatedMedication1 = await Medications.findOne({
    offset: Math.floor(Math.random() * (await Medications.count())),
  });
  const PharmacyOrderItem1 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PharmacyOrderItem1?.setMedication) {
    await PharmacyOrderItem1.setMedication(relatedMedication1);
  }

  const relatedMedication2 = await Medications.findOne({
    offset: Math.floor(Math.random() * (await Medications.count())),
  });
  const PharmacyOrderItem2 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PharmacyOrderItem2?.setMedication) {
    await PharmacyOrderItem2.setMedication(relatedMedication2);
  }

  const relatedMedication3 = await Medications.findOne({
    offset: Math.floor(Math.random() * (await Medications.count())),
  });
  const PharmacyOrderItem3 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PharmacyOrderItem3?.setMedication) {
    await PharmacyOrderItem3.setMedication(relatedMedication3);
  }

  const relatedMedication4 = await Medications.findOne({
    offset: Math.floor(Math.random() * (await Medications.count())),
  });
  const PharmacyOrderItem4 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PharmacyOrderItem4?.setMedication) {
    await PharmacyOrderItem4.setMedication(relatedMedication4);
  }
}

async function associatePharmacyOrderItemWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrderItem0 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PharmacyOrderItem0?.setOrganization) {
    await PharmacyOrderItem0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrderItem1 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PharmacyOrderItem1?.setOrganization) {
    await PharmacyOrderItem1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrderItem2 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PharmacyOrderItem2?.setOrganization) {
    await PharmacyOrderItem2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrderItem3 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PharmacyOrderItem3?.setOrganization) {
    await PharmacyOrderItem3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrderItem4 = await PharmacyOrderItems.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PharmacyOrderItem4?.setOrganization) {
    await PharmacyOrderItem4.setOrganization(relatedOrganization4);
  }
}

async function associatePharmacyOrderWithVisit() {
  const relatedVisit0 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const PharmacyOrder0 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PharmacyOrder0?.setVisit) {
    await PharmacyOrder0.setVisit(relatedVisit0);
  }

  const relatedVisit1 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const PharmacyOrder1 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PharmacyOrder1?.setVisit) {
    await PharmacyOrder1.setVisit(relatedVisit1);
  }

  const relatedVisit2 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const PharmacyOrder2 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PharmacyOrder2?.setVisit) {
    await PharmacyOrder2.setVisit(relatedVisit2);
  }

  const relatedVisit3 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const PharmacyOrder3 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PharmacyOrder3?.setVisit) {
    await PharmacyOrder3.setVisit(relatedVisit3);
  }

  const relatedVisit4 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const PharmacyOrder4 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PharmacyOrder4?.setVisit) {
    await PharmacyOrder4.setVisit(relatedVisit4);
  }
}

async function associatePharmacyOrderWithPharmacist() {
  const relatedPharmacist0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const PharmacyOrder0 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PharmacyOrder0?.setPharmacist) {
    await PharmacyOrder0.setPharmacist(relatedPharmacist0);
  }

  const relatedPharmacist1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const PharmacyOrder1 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PharmacyOrder1?.setPharmacist) {
    await PharmacyOrder1.setPharmacist(relatedPharmacist1);
  }

  const relatedPharmacist2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const PharmacyOrder2 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PharmacyOrder2?.setPharmacist) {
    await PharmacyOrder2.setPharmacist(relatedPharmacist2);
  }

  const relatedPharmacist3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const PharmacyOrder3 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PharmacyOrder3?.setPharmacist) {
    await PharmacyOrder3.setPharmacist(relatedPharmacist3);
  }

  const relatedPharmacist4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const PharmacyOrder4 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PharmacyOrder4?.setPharmacist) {
    await PharmacyOrder4.setPharmacist(relatedPharmacist4);
  }
}

async function associatePharmacyOrderWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrder0 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (PharmacyOrder0?.setOrganization) {
    await PharmacyOrder0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrder1 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (PharmacyOrder1?.setOrganization) {
    await PharmacyOrder1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrder2 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (PharmacyOrder2?.setOrganization) {
    await PharmacyOrder2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrder3 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (PharmacyOrder3?.setOrganization) {
    await PharmacyOrder3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const PharmacyOrder4 = await PharmacyOrders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (PharmacyOrder4?.setOrganization) {
    await PharmacyOrder4.setOrganization(relatedOrganization4);
  }
}

async function associateSickLeafeWithVisit() {
  const relatedVisit0 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const SickLeafe0 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SickLeafe0?.setVisit) {
    await SickLeafe0.setVisit(relatedVisit0);
  }

  const relatedVisit1 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const SickLeafe1 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SickLeafe1?.setVisit) {
    await SickLeafe1.setVisit(relatedVisit1);
  }

  const relatedVisit2 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const SickLeafe2 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SickLeafe2?.setVisit) {
    await SickLeafe2.setVisit(relatedVisit2);
  }

  const relatedVisit3 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const SickLeafe3 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (SickLeafe3?.setVisit) {
    await SickLeafe3.setVisit(relatedVisit3);
  }

  const relatedVisit4 = await Visits.findOne({
    offset: Math.floor(Math.random() * (await Visits.count())),
  });
  const SickLeafe4 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (SickLeafe4?.setVisit) {
    await SickLeafe4.setVisit(relatedVisit4);
  }
}

async function associateSickLeafeWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const SickLeafe0 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SickLeafe0?.setOrganization) {
    await SickLeafe0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const SickLeafe1 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SickLeafe1?.setOrganization) {
    await SickLeafe1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const SickLeafe2 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SickLeafe2?.setOrganization) {
    await SickLeafe2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const SickLeafe3 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (SickLeafe3?.setOrganization) {
    await SickLeafe3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const SickLeafe4 = await SickLeaves.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (SickLeafe4?.setOrganization) {
    await SickLeafe4.setOrganization(relatedOrganization4);
  }
}

async function associateVisitWithPatient() {
  const relatedPatient0 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Visit0 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Visit0?.setPatient) {
    await Visit0.setPatient(relatedPatient0);
  }

  const relatedPatient1 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Visit1 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Visit1?.setPatient) {
    await Visit1.setPatient(relatedPatient1);
  }

  const relatedPatient2 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Visit2 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Visit2?.setPatient) {
    await Visit2.setPatient(relatedPatient2);
  }

  const relatedPatient3 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Visit3 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Visit3?.setPatient) {
    await Visit3.setPatient(relatedPatient3);
  }

  const relatedPatient4 = await Patients.findOne({
    offset: Math.floor(Math.random() * (await Patients.count())),
  });
  const Visit4 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Visit4?.setPatient) {
    await Visit4.setPatient(relatedPatient4);
  }
}

async function associateVisitWithDoctor() {
  const relatedDoctor0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Visit0 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Visit0?.setDoctor) {
    await Visit0.setDoctor(relatedDoctor0);
  }

  const relatedDoctor1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Visit1 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Visit1?.setDoctor) {
    await Visit1.setDoctor(relatedDoctor1);
  }

  const relatedDoctor2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Visit2 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Visit2?.setDoctor) {
    await Visit2.setDoctor(relatedDoctor2);
  }

  const relatedDoctor3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Visit3 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Visit3?.setDoctor) {
    await Visit3.setDoctor(relatedDoctor3);
  }

  const relatedDoctor4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Visit4 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Visit4?.setDoctor) {
    await Visit4.setDoctor(relatedDoctor4);
  }
}

async function associateVisitWithDepartment() {
  const relatedDepartment0 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Visit0 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Visit0?.setDepartment) {
    await Visit0.setDepartment(relatedDepartment0);
  }

  const relatedDepartment1 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Visit1 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Visit1?.setDepartment) {
    await Visit1.setDepartment(relatedDepartment1);
  }

  const relatedDepartment2 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Visit2 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Visit2?.setDepartment) {
    await Visit2.setDepartment(relatedDepartment2);
  }

  const relatedDepartment3 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Visit3 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Visit3?.setDepartment) {
    await Visit3.setDepartment(relatedDepartment3);
  }

  const relatedDepartment4 = await Departments.findOne({
    offset: Math.floor(Math.random() * (await Departments.count())),
  });
  const Visit4 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Visit4?.setDepartment) {
    await Visit4.setDepartment(relatedDepartment4);
  }
}

async function associateVisitWithAppointment() {
  const relatedAppointment0 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Visit0 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Visit0?.setAppointment) {
    await Visit0.setAppointment(relatedAppointment0);
  }

  const relatedAppointment1 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Visit1 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Visit1?.setAppointment) {
    await Visit1.setAppointment(relatedAppointment1);
  }

  const relatedAppointment2 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Visit2 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Visit2?.setAppointment) {
    await Visit2.setAppointment(relatedAppointment2);
  }

  const relatedAppointment3 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Visit3 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Visit3?.setAppointment) {
    await Visit3.setAppointment(relatedAppointment3);
  }

  const relatedAppointment4 = await Appointments.findOne({
    offset: Math.floor(Math.random() * (await Appointments.count())),
  });
  const Visit4 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Visit4?.setAppointment) {
    await Visit4.setAppointment(relatedAppointment4);
  }
}

async function associateVisitWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit0 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Visit0?.setOrganization) {
    await Visit0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit1 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Visit1?.setOrganization) {
    await Visit1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit2 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Visit2?.setOrganization) {
    await Visit2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit3 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Visit3?.setOrganization) {
    await Visit3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit4 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Visit4?.setOrganization) {
    await Visit4.setOrganization(relatedOrganization4);
  }
}

async function associateVisitWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit0 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Visit0?.setOrganization) {
    await Visit0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit1 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Visit1?.setOrganization) {
    await Visit1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit2 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Visit2?.setOrganization) {
    await Visit2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit3 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Visit3?.setOrganization) {
    await Visit3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Visit4 = await Visits.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Visit4?.setOrganization) {
    await Visit4.setOrganization(relatedOrganization4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await AppointmentRules.bulkCreate(AppointmentRulesData);

    await Appointments.bulkCreate(AppointmentsData);

    await Departments.bulkCreate(DepartmentsData);

    await DoctorAvailabilities.bulkCreate(DoctorAvailabilitiesData);

    await Holidays.bulkCreate(HolidaysData);

    await ImagingInvestigations.bulkCreate(ImagingInvestigationsData);

    await ImagingOrderItems.bulkCreate(ImagingOrderItemsData);

    await ImagingOrders.bulkCreate(ImagingOrdersData);

    await Insurances.bulkCreate(InsurancesData);

    await InvoiceItems.bulkCreate(InvoiceItemsData);

    await Invoices.bulkCreate(InvoicesData);

    await LabOrderItems.bulkCreate(LabOrderItemsData);

    await LabOrders.bulkCreate(LabOrdersData);

    await LabTests.bulkCreate(LabTestsData);

    await Medications.bulkCreate(MedicationsData);

    await PatientDocuments.bulkCreate(PatientDocumentsData);

    await Patients.bulkCreate(PatientsData);

    await PharmacyOrderItems.bulkCreate(PharmacyOrderItemsData);

    await PharmacyOrders.bulkCreate(PharmacyOrdersData);

    await SickLeaves.bulkCreate(SickLeavesData);

    await Visits.bulkCreate(VisitsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateAppointmentRuleWithDepartment(),

      await associateAppointmentRuleWithOrganization(),

      await associateAppointmentWithPatient(),

      await associateAppointmentWithDoctor(),

      await associateAppointmentWithDepartment(),

      await associateAppointmentWithOrganization(),

      await associateAppointmentWithOrganization(),

      await associateDepartmentWithOrganization(),

      await associateDepartmentWithOrganization(),

      await associateDoctorAvailabilityWithDoctor(),

      await associateDoctorAvailabilityWithOrganization(),

      await associateHolidayWithOrganization(),

      await associateHolidayWithDoctor(),

      await associateHolidayWithDepartment(),

      await associateHolidayWithOrganization(),

      await associateImagingInvestigationWithOrganization(),

      await associateImagingOrderItemWithImaging_order(),

      await associateImagingOrderItemWithImaging_investigation(),

      await associateImagingOrderItemWithOrganization(),

      await associateImagingOrderWithVisit(),

      await associateImagingOrderWithImaging_technician(),

      await associateImagingOrderWithOrganization(),

      await associateInsuranceWithPatient(),

      await associateInsuranceWithOrganization(),

      await associateInvoiceItemWithInvoice(),

      await associateInvoiceItemWithOrganization(),

      await associateInvoiceWithPatient(),

      await associateInvoiceWithVisit(),

      await associateInvoiceWithOrganization(),

      await associateInvoiceWithOrganization(),

      await associateLabOrderItemWithLab_order(),

      await associateLabOrderItemWithLab_test(),

      await associateLabOrderItemWithOrganization(),

      await associateLabOrderWithVisit(),

      await associateLabOrderWithLab_technician(),

      await associateLabOrderWithOrganization(),

      await associateLabTestWithOrganization(),

      await associateMedicationWithOrganization(),

      await associatePatientDocumentWithPatient(),

      await associatePatientDocumentWithOrganization(),

      await associatePatientWithUser(),

      await associatePatientWithOrganization(),

      await associatePatientWithOrganization(),

      await associatePharmacyOrderItemWithPharmacy_order(),

      await associatePharmacyOrderItemWithMedication(),

      await associatePharmacyOrderItemWithOrganization(),

      await associatePharmacyOrderWithVisit(),

      await associatePharmacyOrderWithPharmacist(),

      await associatePharmacyOrderWithOrganization(),

      await associateSickLeafeWithVisit(),

      await associateSickLeafeWithOrganization(),

      await associateVisitWithPatient(),

      await associateVisitWithDoctor(),

      await associateVisitWithDepartment(),

      await associateVisitWithAppointment(),

      await associateVisitWithOrganization(),

      await associateVisitWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('appointment_rules', null, {});

    await queryInterface.bulkDelete('appointments', null, {});

    await queryInterface.bulkDelete('departments', null, {});

    await queryInterface.bulkDelete('doctor_availabilities', null, {});

    await queryInterface.bulkDelete('holidays', null, {});

    await queryInterface.bulkDelete('imaging_investigations', null, {});

    await queryInterface.bulkDelete('imaging_order_items', null, {});

    await queryInterface.bulkDelete('imaging_orders', null, {});

    await queryInterface.bulkDelete('insurances', null, {});

    await queryInterface.bulkDelete('invoice_items', null, {});

    await queryInterface.bulkDelete('invoices', null, {});

    await queryInterface.bulkDelete('lab_order_items', null, {});

    await queryInterface.bulkDelete('lab_orders', null, {});

    await queryInterface.bulkDelete('lab_tests', null, {});

    await queryInterface.bulkDelete('medications', null, {});

    await queryInterface.bulkDelete('patient_documents', null, {});

    await queryInterface.bulkDelete('patients', null, {});

    await queryInterface.bulkDelete('pharmacy_order_items', null, {});

    await queryInterface.bulkDelete('pharmacy_orders', null, {});

    await queryInterface.bulkDelete('sick_leaves', null, {});

    await queryInterface.bulkDelete('visits', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
