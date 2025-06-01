import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/patient_documents/patient_documentsSlice';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { baseURL } from '../../config';
import { useTranslation } from 'react-i18next';

const Patient_documentsView = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { patient_documents } = useAppSelector(
    (state) => state.patient_documents,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>
          {getPageTitle(t('patient_documents.view_patient_document'))}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('patient_documents.view_patient_document')}
          main
        >
          <BaseButton
            color='info'
            label={t('common.edit')}
            href={`/patient_documents/patient_documents-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patient_documents.patient')}
            </p>
            <p>
              {i18n.dir() === 'rtl'
                ? patient_documents?.patient?.full_name_ar
                : (patient_documents?.patient?.full_name_en ??
                  t('patient_documents.no_data'))}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patient_documents.document_type')}
            </p>
            <p>{patient_documents?.document_type}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>
              {t('patient_documents.document_file')}
            </p>
            {patient_documents?.document_url ? (
              <a
                href={`${baseURL}/${patient_documents.document_url.replace(/\\/g, '/')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline'
                download={patient_documents.document_url.split('/').pop()}
              >
                {t('patient_documents.download_view_document')}
              </a>
            ) : (
              <p>{t('patient_documents.no_file_uploaded')}</p>
            )}
          </div>
          <BaseDivider />

          <BaseButton
            color='info'
            label={t('common.back')}
            onClick={() =>
              router.push('/patient_documents/patient_documents-table')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Patient_documentsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PATIENT_DOCUMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Patient_documentsView;
