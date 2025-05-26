import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import { update, fetch } from '../../stores/patients/patientsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  full_name_en: Yup.string().required('Full Name (English) is required'),
  full_name_ar: Yup.string().required('Full Name (Arabic) is required'),
  date_of_birth: Yup.date()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  gender: Yup.string()
    .oneOf(['Male', 'Female'], 'Invalid gender')
    .required('Gender is required'),
  nationality: Yup.string().required('Nationality is required'),
  identifier_type: Yup.string()
    .oneOf(['National ID', 'Iqama', 'Passport'], 'Invalid identifier type')
    .required('Identifier Type is required'),
  identifier: Yup.string().required('Identifier Number is required'),
  address: Yup.string().required('Address is required'),
  emergency_contact_name: Yup.string().required(
    'Emergency Contact Name is required',
  ),
  emergency_contact_phone: Yup.string()
    .required('Emergency Contact Phone is required')
    .matches(/^[0-9+\-\s()]{7,20}$/, 'Invalid phone number'),
  medical_history: Yup.string().required('Medical History is required'),
  allergies: Yup.string().required('Allergies is required'),
  current_medications: Yup.string().required('Current Medications is required'),
  family_history: Yup.string().required('Family History is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^[0-9+\-\s()]{7,20}$/, 'Invalid phone number'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const EditPatientsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    full_name_en: '',
    full_name_ar: '',
    phone: '',
    email: '',
    date_of_birth: new Date(),
    gender: '',
    nationality: '',
    identifier_type: '',
    identifier: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    medical_history: '',
    allergies: '',
    current_medications: '',
    family_history: '',
  };

  const [initialValues, setInitialValues] = useState(initVals);
  const { patients } = useAppSelector((state) => state.patients);
  const { id } = router.query;

  const fieldNames = [
    'full_name_en',
    'full_name_ar',
    'phone',
    'email',
    'date_of_birth',
    'gender',
    'nationality',
    'identifier_type',
    'identifier',
    'address',
    'emergency_contact_name',
    'emergency_contact_phone',
    'medical_history',
    'allergies',
    'current_medications',
    'family_history',
  ];

  const fieldRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const focusFirstError = (errors: any) => {
    const firstErrorField = fieldNames.find((name) => errors[name]);
    if (firstErrorField) {
      if (firstErrorField === 'date_of_birth' && datePickerRef.current) {
        const input = datePickerRef.current.querySelector('input');
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (fieldRefs.current[firstErrorField]) {
        fieldRefs.current[firstErrorField]?.focus();
        fieldRefs.current[firstErrorField]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof patients === 'object') {
      setInitialValues(patients);
    }
  }, [patients]);

  useEffect(() => {
    if (typeof patients === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach((el) => (newInitialVal[el] = patients[el]));
      setInitialValues(newInitialVal);
    }
  }, [patients]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/patients/patients-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit patient')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit patient'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={async (values) => {
              await handleSubmit(values);
            }}
          >
            {({ errors, setFieldValue, values, validateForm, submitForm }) => (
              <Form>
                <FormField label='Full Name (English)' required>
                  <>
                    <Field
                      name='full_name_en'
                      placeholder='Full Name (English)'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['full_name_en'] = el)
                      }
                    />
                    {errors.full_name_en && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.full_name_en}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Full Name (Arabic)' required>
                  <>
                    <Field
                      name='full_name_ar'
                      placeholder='Full Name (Arabic)'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['full_name_ar'] = el)
                      }
                    />
                    {errors.full_name_ar && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.full_name_ar}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Phone' required>
                  <>
                    <Field
                      name='phone'
                      placeholder='Phone'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['phone'] = el)
                      }
                    />
                    {errors.phone && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.phone}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Email' required>
                  <>
                    <Field
                      name='email'
                      type='email'
                      placeholder='Email'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['email'] = el)
                      }
                    />
                    {errors.email && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.email}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Date of Birth' required>
                  <>
                    <div ref={datePickerRef}>
                      <DatePicker
                        dateFormat='yyyy-MM-dd'
                        showTimeSelect={false}
                        selected={
                          values.date_of_birth
                            ? new Date(values.date_of_birth)
                            : null
                        }
                        onChange={(date) =>
                          setFieldValue('date_of_birth', date)
                        }
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                      />
                    </div>
                    {errors.date_of_birth && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.date_of_birth}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Gender' labelFor='gender' required>
                  <>
                    <Field
                      name='gender'
                      id='gender'
                      component='select'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLSelectElement) =>
                        (fieldRefs.current['gender'] = el)
                      }
                    >
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </Field>
                    {errors.gender && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.gender}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Nationality' required>
                  <>
                    <Field
                      name='nationality'
                      placeholder='Nationality'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['nationality'] = el)
                      }
                    />
                    {errors.nationality && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.nationality}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField
                  label='Identifier Type'
                  labelFor='identifier_type'
                  required
                >
                  <>
                    <Field
                      name='identifier_type'
                      id='identifier_type'
                      component='select'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLSelectElement) =>
                        (fieldRefs.current['identifier_type'] = el)
                      }
                    >
                      <option value='National ID'>National ID</option>
                      <option value='Iqama'>Iqama</option>
                      <option value='Passport'>Passport</option>
                    </Field>
                    {errors.identifier_type && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.identifier_type}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Identifier Number' required>
                  <>
                    <Field
                      name='identifier'
                      placeholder='Identifier Number'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['identifier'] = el)
                      }
                    />
                    {errors.identifier && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.identifier}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Address' required>
                  <>
                    <Field
                      name='address'
                      placeholder='Address'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['address'] = el)
                      }
                    />
                    {errors.address && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.address}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Emergency Contact Name' required>
                  <>
                    <Field
                      name='emergency_contact_name'
                      placeholder='Emergency Contact Name'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['emergency_contact_name'] = el)
                      }
                    />
                    {errors.emergency_contact_name && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.emergency_contact_name}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Emergency Contact Phone' required>
                  <>
                    <Field
                      name='emergency_contact_phone'
                      placeholder='Emergency Contact Phone'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLInputElement) =>
                        (fieldRefs.current['emergency_contact_phone'] = el)
                      }
                    />
                    {errors.emergency_contact_phone && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.emergency_contact_phone}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Medical History' hasTextareaHeight required>
                  <>
                    <Field
                      name='medical_history'
                      as='textarea'
                      placeholder='Medical History'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLTextAreaElement) =>
                        (fieldRefs.current['medical_history'] = el)
                      }
                    />
                    {errors.medical_history && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.medical_history}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Allergies' hasTextareaHeight required>
                  <>
                    <Field
                      name='allergies'
                      as='textarea'
                      placeholder='Allergies'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLTextAreaElement) =>
                        (fieldRefs.current['allergies'] = el)
                      }
                    />
                    {errors.allergies && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.allergies}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField
                  label='Current Medications'
                  hasTextareaHeight
                  required
                >
                  <>
                    <Field
                      name='current_medications'
                      as='textarea'
                      placeholder='Current Medications'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLTextAreaElement) =>
                        (fieldRefs.current['current_medications'] = el)
                      }
                    />
                    {errors.current_medications && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.current_medications}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Family History' hasTextareaHeight required>
                  <>
                    <Field
                      name='family_history'
                      as='textarea'
                      placeholder='Family History'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                      innerRef={(el: HTMLTextAreaElement) =>
                        (fieldRefs.current['family_history'] = el)
                      }
                    />
                    {errors.family_history && (
                      <div className='text-red-500 text-xs mt-1'>
                        {errors.family_history}
                      </div>
                    )}
                  </>
                </FormField>

                <BaseDivider />
                <BaseButtons>
                  <BaseButton
                    type='button'
                    color='info'
                    label='Submit'
                    onClick={async () => {
                      const errors = await validateForm();

                      if (Object.keys(errors).length > 0) {
                        focusFirstError(errors);
                        return;
                      }

                      submitForm();
                    }}
                  />

                  <BaseButton
                    type='reset'
                    color='info'
                    outline
                    label='Reset'
                    onClick={() => setInitialValues(initVals)}
                  />

                  <BaseButton
                    type='reset'
                    color='danger'
                    outline
                    label='Cancel'
                    onClick={() => router.push('/patients/patients-table')}
                  />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPatientsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PATIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPatientsPage;
