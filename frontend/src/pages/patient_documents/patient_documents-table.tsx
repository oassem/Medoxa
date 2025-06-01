import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TablePatient_documents from '../../components/Patient_documents/TablePatient_documents';
import BaseButton from '../../components/BaseButton';
import axiosInstance from '../../utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/patient_documents/patient_documentsSlice';
import { hasPermission } from '../../helpers/userPermissions';
import { useTranslation } from 'react-i18next';

const Patient_documentsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: t('patient_documents.document_type'), title: 'document_type' },
    { label: t('patient_documents.patient'), title: 'patient' },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_PATIENT_DOCUMENTS');

  const addFilter = () => {
    const newItem = {
      id: uniqueId(),
      fields: {
        filterValue: '',
        filterValueFrom: '',
        filterValueTo: '',
        selectedField: '',
      },
    };
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem]);
  };

  const getPatient_documentsCSV = async () => {
    const response = await axiosInstance({
      url: '/patient_documents?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });

    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'patient_documentsCSV.csv';
    link.click();
  };

  const onModalConfirm = async () => {
    if (!csvFile) return;
    await dispatch(uploadCsv(csvFile));
    dispatch(setRefetch(true));
    setCsvFile(null);
    setIsModalActive(false);
  };

  const onModalCancel = () => {
    setCsvFile(null);
    setIsModalActive(false);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle(t('patient_documents.title'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('patient_documents.title')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={dir === 'rtl' ? 'ml-3' : 'mr-3'}
              href={'/patient_documents/patient_documents-new'}
              color='info'
              label={t('patient_documents.newPatientDocument')}
            />
          )}

          <BaseButton
            className={dir === 'rtl' ? 'ml-3' : 'mr-3'}
            color='info'
            label={t('actions.filter')}
            onClick={addFilter}
          />

          <BaseButton
            className={dir === 'rtl' ? 'ml-3' : 'mr-3'}
            color='info'
            label={t('actions.downloadCSV')}
            onClick={getPatient_documentsCSV}
          />

          {hasCreatePermission && (
            <BaseButton
              color='info'
              label={t('actions.uploadCSV')}
              onClick={() => setIsModalActive(true)}
            />
          )}

          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TablePatient_documents
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={true}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title={t('actions.uploadCSV')}
        buttonColor='info'
        buttonLabel={t('actions.confirm')}
        isActive={isModalActive}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      >
        <DragDropFilePicker
          file={csvFile}
          setFile={setCsvFile}
          formats={'.csv'}
        />
      </CardBoxModal>
    </>
  );
};

Patient_documentsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PATIENT_DOCUMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Patient_documentsTablesPage;
