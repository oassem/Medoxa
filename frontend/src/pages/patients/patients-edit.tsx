import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
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
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Full Name (English)'>
                <Field name='full_name_en' placeholder='Full Name (English)' />
              </FormField>

              <FormField label='Full Name (Arabic)'>
                <Field name='full_name_ar' placeholder='Full Name (Arabic)' />
              </FormField>

              <FormField label='Phone'>
                <Field name='phone' placeholder='Phone' />
              </FormField>

              <FormField label='Email'>
                <Field name='email' type='email' placeholder='Email' />
              </FormField>

              <FormField label='Date of Birth'>
                <DatePicker
                  dateFormat='yyyy-MM-dd'
                  showTimeSelect={false}
                  selected={
                    initialValues.date_of_birth
                      ? new Date(
                          dayjs(initialValues.date_of_birth).format(
                            'YYYY-MM-DD',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date_of_birth: date })
                  }
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

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
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
