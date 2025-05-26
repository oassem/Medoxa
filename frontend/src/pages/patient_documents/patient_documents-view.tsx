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

const Patient_documentsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { patient_documents } = useAppSelector(
    (state) => state.patient_documents,
  );

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View patient document')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View patient documents')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/patient_documents/patient_documents-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Patient</p>
            <p>{patient_documents?.patient?.full_name_en ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Document Type</p>
            <p>{patient_documents?.document_type}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Document File</p>
            {patient_documents?.document_url ? (
              <a
                href={`/${patient_documents.document_url.replace(/\\/g, '/')}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline'
                download={patient_documents.document_url.split('/').pop()}
              >
                Download/View Document
              </a>
            ) : (
              <p>No file uploaded</p>
            )}
          </div>
          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
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
