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
import * as Yup from 'yup';

const initialValues = {
  patient: '',
  document_type: '',
  document_file: null,
};

const validationSchema = Yup.object().shape({
  patient: Yup.string().required('Patient is required'),
  document_type: Yup.string().required('Document Type is required'),
  document_file: Yup.mixed()
    .required('Document File is required')
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || typeof value !== 'object' || !('type' in value))
        return false;
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ];
      return allowed.includes((value as File).type);
    }),
});

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
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                <FormField label='Patient' labelFor='patient' required>
                  <>
                    <Field
                      name='patient'
                      id='patient'
                      component={SelectField}
                      options={[]}
                      itemRef={'patients'}
                    />
                    {touched.patient && errors.patient && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.patient}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Document Type' required>
                  <>
                    <Field
                      name='document_type'
                      placeholder='Document Type'
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                    />
                    {touched.document_type && errors.document_type && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.document_type}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField label='Document File' required>
                  <>
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
                    {touched.document_file && errors.document_file && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.document_file}
                      </div>
                    )}
                  </>
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
