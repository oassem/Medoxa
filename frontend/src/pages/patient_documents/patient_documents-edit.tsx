import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
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
import { SelectField } from '../../components/SelectField';
import {
  update,
  fetch,
} from '../../stores/patient_documents/patient_documentsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';

const EditPatient_documentsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    patient: null,
    document_type: '',
    document_file: null,
  };

  const [initialValues, setInitialValues] = useState(initVals);
  const { patient_documents } = useAppSelector(
    (state) => state.patient_documents,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof patient_documents === 'object') {
      setInitialValues(patient_documents);
    }
  }, [patient_documents]);

  useEffect(() => {
    if (typeof patient_documents === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = patient_documents[el]),
      );
      setInitialValues(newInitialVal);
    }
  }, [patient_documents]);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append('patient', data.patient);
    formData.append('document_type', data.document_type);
    if (data.document_file) {
      formData.append('document_file', data.document_file);
    }

    await dispatch(update({ id, data: formData }));
    await router.push('/patient_documents/patient_documents-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit patient document')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit patient document'}
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
            {({ setFieldValue }) => (
              <Form>
                <FormField label='Patient' labelFor='patient'>
                  <Field
                    name='patient'
                    id='patient'
                    component={SelectField}
                    options={initialValues.patient}
                    itemRef={'patients'}
                    showField={'full_name_en'}
                  ></Field>
                </FormField>

                <FormField label='Document Type'>
                  <Field name='document_type' placeholder='Document Type' />
                </FormField>

                <FormField label='Document File'>
                  <div className='mb-2 flex items-center gap-4'>
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
                    {patient_documents?.document_url && (
                      <a
                        href={`/${patient_documents.document_url.replace(/\\/g, '/')}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 underline'
                        download={patient_documents.document_url
                          .split('/')
                          .pop()}
                      >
                        Download/View Current Document
                      </a>
                    )}
                  </div>
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

EditPatient_documentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PATIENT_DOCUMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPatient_documentsPage;
