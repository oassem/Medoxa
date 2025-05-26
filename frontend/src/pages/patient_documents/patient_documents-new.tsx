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
import { SelectField } from '../../components/SelectField';
import { create } from '../../stores/patient_documents/patient_documentsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';

const initialValues = {
  patient: '',
  document_type: '',
  document_file: null,
};

const Patient_documentsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append('patient', data.patient);
    formData.append('document_type', data.document_type);
    formData.append('document_file', data.document_file);

    await dispatch(create(formData));
    await router.push('/patient_documents/patient_documents-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('New patient document')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New patient document'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ setFieldValue }) => (
              <Form>
                <FormField label='Patient' labelFor='patient'>
                  <Field
                    name='patient'
                    id='patient'
                    component={SelectField}
                    options={[]}
                    itemRef={'patients'}
                  ></Field>
                </FormField>

                <FormField label='Document Type'>
                  <Field name='document_type' placeholder='Document Type' />
                </FormField>

                <FormField label='Document File'>
                  <input
                    name='document_file'
                    type='file'
                    accept='.pdf,.doc,.docx,.jpg,.png'
                    onChange={(event) => {
                      setFieldValue(
                        'document_file',
                        event.currentTarget.files[0],
                      );
                    }}
                  />
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
                    onClick={() =>
                      router.push('/patient_documents/patient_documents-table')
                    }
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

Patient_documentsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PATIENT_DOCUMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Patient_documentsNew;
