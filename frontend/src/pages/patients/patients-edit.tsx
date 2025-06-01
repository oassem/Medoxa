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
import { useTranslation } from 'react-i18next';

// Validation schema using Yup
const getValidationSchema = (t: any) =>
  Yup.object().shape({
    full_name_en: Yup.string().required(
      t('patients.validation.full_name_en_required'),
    ),
    full_name_ar: Yup.string().required(
      t('patients.validation.full_name_ar_required'),
    ),
    date_of_birth: Yup.date()
      .required(t('patients.validation.date_of_birth_required'))
      .max(new Date(), t('patients.validation.date_of_birth_max')),
    gender: Yup.string()
      .oneOf(['Male', 'Female'], t('patients.validation.gender_invalid'))
      .required(t('patients.validation.gender_required')),
    nationality: Yup.string().required(
      t('patients.validation.nationality_required'),
    ),
    identifier_type: Yup.string()
      .oneOf(
        ['National ID', 'Iqama', 'Passport'],
        t('patients.validation.identifier_type_invalid'),
      )
      .required(t('patients.validation.identifier_type_required')),
    identifier: Yup.string().required(
      t('patients.validation.identifier_required'),
    ),
    address: Yup.string().required(t('patients.validation.address_required')),
    emergency_contact_name: Yup.string().required(
      t('patients.validation.emergency_contact_name_required'),
    ),
    emergency_contact_phone: Yup.string()
      .required(t('patients.validation.emergency_contact_phone_required'))
      .matches(
        /^[0-9+\-\s()]{7,20}$/,
        t('patients.validation.emergency_contact_phone_invalid'),
      ),
    medical_history: Yup.string().required(
      t('patients.validation.medical_history_required'),
    ),
    allergies: Yup.string().required(
      t('patients.validation.allergies_required'),
    ),
    current_medications: Yup.string().required(
      t('patients.validation.current_medications_required'),
    ),
    family_history: Yup.string().required(
      t('patients.validation.family_history_required'),
    ),
    phone: Yup.string()
      .required(t('patients.validation.phone_required'))
      .matches(/^[0-9+\-\s()]{7,20}$/, t('patients.validation.phone_invalid')),
    email: Yup.string()
      .email(t('patients.validation.email_invalid'))
      .required(t('patients.validation.email_required')),
  });

const EditPatientsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

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
        <title>{getPageTitle(t('patients.editPatient'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('patients.editPatient')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div dir={dir}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={getValidationSchema(t)}
              validateOnMount
              onSubmit={async (values) => {
                await handleSubmit(values);
              }}
            >
              {({
                errors,
                setFieldValue,
                values,
                validateForm,
                submitForm,
                touched,
              }) => (
                <Form>
                  <FormField label={t('patients.full_name_en')} required>
                    <>
                      <Field
                        name='full_name_en'
                        placeholder={t('patients.full_name_en')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['full_name_en'] = el)
                        }
                      />
                      {touched.full_name_en && errors.full_name_en && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.full_name_en}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.full_name_ar')} required>
                    <>
                      <Field
                        name='full_name_ar'
                        placeholder={t('patients.full_name_ar')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['full_name_ar'] = el)
                        }
                      />
                      {touched.full_name_ar && errors.full_name_ar && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.full_name_ar}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.phone')} required>
                    <>
                      <Field
                        name='phone'
                        placeholder={t('patients.phone')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['phone'] = el)
                        }
                      />
                      {touched.phone && errors.phone && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.phone}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.email')} required>
                    <>
                      <Field
                        name='email'
                        type='email'
                        placeholder={t('patients.email')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['email'] = el)
                        }
                      />
                      {touched.email && errors.email && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.email}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.date_of_birth')} required>
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
                      {touched.date_of_birth && errors.date_of_birth && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.date_of_birth}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.gender')}
                    labelFor='gender'
                    required
                  >
                    <>
                      <Field
                        name='gender'
                        id='gender'
                        component='select'
                        className={`w-full border-1 border-gray-300 rounded-md p-2 ${dir === 'rtl' ? 'filter-select' : ''}`}
                        innerRef={(el: HTMLSelectElement) =>
                          (fieldRefs.current['gender'] = el)
                        }
                      >
                        <option value='Male'>{t('patients.male')}</option>
                        <option value='Female'>{t('patients.female')}</option>
                      </Field>
                      {touched.gender && errors.gender && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.gender}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.nationality')} required>
                    <>
                      <Field
                        name='nationality'
                        placeholder={t('patients.nationality')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['nationality'] = el)
                        }
                      />
                      {touched.nationality && errors.nationality && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.nationality}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.identifier_type')}
                    labelFor='identifier_type'
                    required
                  >
                    <>
                      <Field
                        name='identifier_type'
                        id='identifier_type'
                        component='select'
                        className={`w-full border-1 border-gray-300 rounded-md p-2 ${dir === 'rtl' ? 'filter-select' : ''}`}
                        innerRef={(el: HTMLSelectElement) =>
                          (fieldRefs.current['identifier_type'] = el)
                        }
                      >
                        <option value='National ID'>
                          {t('patients.national_id')}
                        </option>
                        <option value='Iqama'>{t('patients.iqama')}</option>
                        <option value='Passport'>
                          {t('patients.passport')}
                        </option>
                      </Field>
                      {touched.identifier_type && errors.identifier_type && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.identifier_type}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.identifier')} required>
                    <>
                      <Field
                        name='identifier'
                        placeholder={t('patients.identifier')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['identifier'] = el)
                        }
                      />
                      {touched.identifier && errors.identifier && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.identifier}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField label={t('patients.address')} required>
                    <>
                      <Field
                        name='address'
                        placeholder={t('patients.address')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['address'] = el)
                        }
                      />
                      {touched.address && errors.address && (
                        <div className='text-red-500 text-xs mt-2'>
                          {errors.address}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.emergency_contact_name')}
                    required
                  >
                    <>
                      <Field
                        name='emergency_contact_name'
                        placeholder={t('patients.emergency_contact_name')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['emergency_contact_name'] = el)
                        }
                      />
                      {touched.emergency_contact_name &&
                        errors.emergency_contact_name && (
                          <div className='text-red-500 text-xs mt-2'>
                            {errors.emergency_contact_name}
                          </div>
                        )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.emergency_contact_phone')}
                    required
                  >
                    <>
                      <Field
                        name='emergency_contact_phone'
                        placeholder={t('patients.emergency_contact_phone')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLInputElement) =>
                          (fieldRefs.current['emergency_contact_phone'] = el)
                        }
                      />
                      {touched.emergency_contact_phone &&
                        errors.emergency_contact_phone && (
                          <div className='text-red-500 text-xs mt-2'>
                            {errors.emergency_contact_phone}
                          </div>
                        )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.medical_history')}
                    hasTextareaHeight
                    required
                  >
                    <>
                      <Field
                        name='medical_history'
                        as='textarea'
                        placeholder={t('patients.medical_history')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLTextAreaElement) =>
                          (fieldRefs.current['medical_history'] = el)
                        }
                      />
                      {touched.medical_history && errors.medical_history && (
                        <div className='text-red-500 text-xs mt-1'>
                          {errors.medical_history}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.allergies')}
                    hasTextareaHeight
                    required
                  >
                    <>
                      <Field
                        name='allergies'
                        as='textarea'
                        placeholder={t('patients.allergies')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLTextAreaElement) =>
                          (fieldRefs.current['allergies'] = el)
                        }
                      />
                      {touched.allergies && errors.allergies && (
                        <div className='text-red-500 text-xs mt-1'>
                          {errors.allergies}
                        </div>
                      )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.current_medications')}
                    hasTextareaHeight
                    required
                  >
                    <>
                      <Field
                        name='current_medications'
                        as='textarea'
                        placeholder={t('patients.current_medications')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLTextAreaElement) =>
                          (fieldRefs.current['current_medications'] = el)
                        }
                      />
                      {touched.current_medications &&
                        errors.current_medications && (
                          <div className='text-red-500 text-xs mt-1'>
                            {errors.current_medications}
                          </div>
                        )}
                    </>
                  </FormField>

                  <FormField
                    label={t('patients.family_history')}
                    hasTextareaHeight
                    required
                  >
                    <>
                      <Field
                        name='family_history'
                        as='textarea'
                        placeholder={t('patients.family_history')}
                        className='w-full border-1 border-gray-300 rounded-md p-2'
                        innerRef={(el: HTMLTextAreaElement) =>
                          (fieldRefs.current['family_history'] = el)
                        }
                      />
                      {touched.family_history && errors.family_history && (
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
                      label={t('actions.submit')}
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
                      label={t('actions.reset')}
                      onClick={() => setInitialValues(initVals)}
                    />

                    <BaseButton
                      type='reset'
                      color='danger'
                      outline
                      label={t('actions.cancel')}
                      onClick={() => router.push('/patients/patients-table')}
                    />
                  </BaseButtons>
                </Form>
              )}
            </Formik>
          </div>
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
