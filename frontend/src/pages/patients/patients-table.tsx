import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TablePatients from '../../components/Patients/TablePatients';
import BaseButton from '../../components/BaseButton';
import axiosInstance from '../../utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/patients/patientsSlice';
import { hasPermission } from '../../helpers/userPermissions';
import { useTranslation } from 'react-i18next';

const PatientsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  // Get current direction (ltr/rtl)
  const dir = i18n.dir();

  const [filters] = useState([
    { label: t('patients.full_name_en'), title: 'full_name_en' },
    { label: t('patients.full_name_ar'), title: 'full_name_ar' },
    { label: t('patients.nationality'), title: 'nationality' },
    { label: t('patients.identifier'), title: 'identifier' },
    { label: t('patients.address'), title: 'address' },
    {
      label: t('patients.emergency_contact_name'),
      title: 'emergency_contact_name',
    },
    {
      label: t('patients.emergency_contact_phone'),
      title: 'emergency_contact_phone',
    },
    { label: t('patients.medical_history'), title: 'medical_history' },
    { label: t('patients.allergies'), title: 'allergies' },
    { label: t('patients.current_medications'), title: 'current_medications' },
    { label: t('patients.family_history'), title: 'family_history' },
    {
      label: t('patients.date_of_birth'),
      title: 'date_of_birth',
      date: 'true',
    },
    {
      label: t('patients.gender'),
      title: 'gender',
      type: 'enum',
      options: [
        { value: 'Male', label: t('patients.male') },
        { value: 'Female', label: t('patients.female') },
      ],
    },
    {
      label: t('patients.identifier_type'),
      title: 'identifier_type',
      type: 'enum',
      options: [
        { value: 'National ID', label: t('patients.national_id') },
        { value: 'Iqama', label: t('patients.iqama') },
        { value: 'Passport', label: t('patients.passport') },
      ],
    },
    {
      title: 'phone',
      label: t('patients.phone'),
      type: 'string',
    },
    {
      title: 'email',
      label: t('patients.email'),
      type: 'string',
    },
    {
      title: 'organization',
      label: t('patients.organization'),
    },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_PATIENTS');

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

  const getPatientsCSV = async () => {
    const response = await axiosInstance({
      url: '/patients?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });

    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'patientsCSV.csv';
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
        <title>{getPageTitle(t('patients.title'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('patients.title')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={dir === 'rtl' ? 'ml-3' : 'mr-3'}
              href={'/patients/patients-new'}
              color='info'
              label={t('patients.newPatient')}
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
            onClick={getPatientsCSV}
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
          <TablePatients
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

PatientsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PATIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PatientsTablesPage;
