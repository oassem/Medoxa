import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
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
import { create } from '../../stores/patients/patientsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const initialValues = {
  full_name_en: '',

  full_name_ar: '',

  date_of_birth: '',

  gender: 'Male',

  nationality: '',

  identifier_type: 'National ID',

  identifier: '',

  address: '',

  emergency_contact_name: '',

  emergency_contact_phone: '',

  medical_history: '',

  allergies: '',

  current_medications: '',

  family_history: '',

  phone: '',

  email: '',
};

const PatientsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/patients/patients-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('New patient')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New patient'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Full Name (English)'>
                <Field name='full_name_en' placeholder='Full Name (English)' />
              </FormField>

              <FormField label='Full Name (Arabic)'>
                <Field name='full_name_ar' placeholder='Full Name (Arabic)' />
              </FormField>

              <FormField label='Date of Birth'>
                <Field
                  type='date'
                  name='date_of_birth'
                  placeholder='Date of Birth'
                />
              </FormField>

              <FormField label='Gender' labelFor='gender'>
                <Field name='gender' id='gender' component='select'>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </Field>
              </FormField>

              <FormField label='Nationality'>
                <Field name='nationality' placeholder='Nationality' />
              </FormField>

              <FormField label='Identifier Type' labelFor='identifier_type'>
                <Field
                  name='identifier_type'
                  id='identifier_type'
                  component='select'
                >
                  <option value='National ID'>National ID</option>
                  <option value='Iqama'>Iqama</option>
                  <option value='Passport'>Passport</option>
                </Field>
              </FormField>

              <FormField label='Identifier Number'>
                <Field name='identifier' placeholder='Identifier Number' />
              </FormField>

              <FormField label='Address'>
                <Field name='address' placeholder='Address' />
              </FormField>

              <FormField label='Emergency Contact Name'>
                <Field
                  name='emergency_contact_name'
                  placeholder='Emergency Contact Name'
                />
              </FormField>

              <FormField label='Emergency Contact Phone'>
                <Field
                  name='emergency_contact_phone'
                  placeholder='Emergency Contact Phone'
                />
              </FormField>

              <FormField label='Medical History' hasTextareaHeight>
                <Field
                  name='medical_history'
                  as='textarea'
                  placeholder='Medical History'
                />
              </FormField>

              <FormField label='Allergies' hasTextareaHeight>
                <Field name='allergies' as='textarea' placeholder='Allergies' />
              </FormField>

              <FormField label='Current Medications' hasTextareaHeight>
                <Field
                  name='current_medications'
                  as='textarea'
                  placeholder='Current Medications'
                />
              </FormField>

              <FormField label='Family History' hasTextareaHeight>
                <Field
                  name='family_history'
                  as='textarea'
                  placeholder='Family History'
                />
              </FormField>

              <FormField label='Phone'>
                <Field name='phone' placeholder='Phone' />
              </FormField>

              <FormField label='Email'>
                <Field name='email' type='email' placeholder='Email' />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/patients/patients-table')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

PatientsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PATIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PatientsNew;
