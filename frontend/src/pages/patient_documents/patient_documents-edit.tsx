import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle, baseURL } from '../../config';
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
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const getValidationSchema = (t) =>
  Yup.object().shape({
    patient: Yup.string().required(t('patient_documents.patient_required')),
    document_type: Yup.string().required(
      t('patient_documents.document_type_required'),
    ),
    document_file: Yup.mixed().test(
      'fileType',
      t('patient_documents.unsupported_file_format'),
      (value) => {
        if (!value) return true; // No new file selected, skip validation
        if (typeof value !== 'object' || !('type' in value)) return false;
        const allowed = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png',
        ];
        return allowed.includes((value as File).type);
      },
    ),
  });

const EditPatient_documentsPage = () => {
  const { t, i18n } = useTranslation();
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

  // Regenerate schema when language changes
  const validationSchema = useMemo(
    () => getValidationSchema(t),
    [t, i18n.language],
  );

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
        <title>
          {getPageTitle(t('patient_documents.edit_patient_document'))}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('patient_documents.edit_patient_document')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form>
                <FormField
                  label={t('patient_documents.patient')}
                  labelFor='patient'
                  required
                >
                  <>
                    <Field
                      name='patient'
                      id='patient'
                      component={SelectField}
                      options={initialValues.patient}
                      itemRef={'patients'}
                      showField={
                        i18n.language === 'ar' ? 'full_name_ar' : 'full_name_en'
                      }
                    />
                    {touched.patient && errors.patient && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.patient}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField
                  label={t('patient_documents.document_type')}
                  required
                >
                  <>
                    <Field
                      name='document_type'
                      placeholder={t('patient_documents.document_type')}
                      className='w-full border-1 border-gray-300 rounded-md p-2'
                    />
                    {touched.document_type && errors.document_type && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.document_type}
                      </div>
                    )}
                  </>
                </FormField>

                <FormField
                  label={t('patient_documents.document_file')}
                  required
                >
                  <>
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
                          href={`${baseURL}/${patient_documents.document_url.replace(/\\/g, '/')}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 underline'
                          download={patient_documents.document_url
                            .split('/')
                            .pop()}
                        >
                          {t(
                            'patient_documents.download_view_current_document',
                          )}
                        </a>
                      )}
                    </div>
                    {touched.document_file && errors.document_file && (
                      <div className='text-red-500 text-xs mt-2'>
                        {errors.document_file}
                      </div>
                    )}
                  </>
                </FormField>

                <BaseDivider />
                <BaseButtons>
                  <BaseButton
                    type='submit'
                    color='info'
                    label={t('actions.submit')}
                  />

                  <BaseButton
                    type='reset'
                    color='danger'
                    outline
                    label={t('actions.cancel')}
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
