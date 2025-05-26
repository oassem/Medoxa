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
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/patients/patientsSlice';
import { hasPermission } from '../../helpers/userPermissions';

const PatientsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'FullName(English)', title: 'full_name_en' },
    { label: 'FullName(Arabic)', title: 'full_name_ar' },
    { label: 'Nationality', title: 'nationality' },
    { label: 'Identifier', title: 'identifier' },
    { label: 'Address', title: 'address' },
    { label: 'EmergencyContactName', title: 'emergency_contact_name' },
    { label: 'EmergencyContactPhone', title: 'emergency_contact_phone' },
    { label: 'MedicalHistory', title: 'medical_history' },
    { label: 'Allergies', title: 'allergies' },
    { label: 'CurrentMedications', title: 'current_medications' },
    { label: 'FamilyHistory', title: 'family_history' },

    { label: 'DateofBirth', title: 'date_of_birth', date: 'true' },

    { label: 'User', title: 'user' },

    {
      label: 'Gender',
      title: 'gender',
      type: 'enum',
      options: ['Male', 'Female', 'Other'],
    },
    {
      label: 'IdentifierType',
      title: 'identifier_type',
      type: 'enum',
      options: ['National ID', 'Iqama', 'Passport'],
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
        <title>{getPageTitle('Patients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Patients'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={'mr-3'}
              href={'/patients/patients-new'}
              color='info'
              label='New Item'
            />
          )}

          <BaseButton
            className={'mr-3'}
            color='info'
            label='Filter'
            onClick={addFilter}
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Download CSV'
            onClick={getPatientsCSV}
          />

          {hasCreatePermission && (
            <BaseButton
              color='info'
              label='Upload CSV'
              onClick={() => setIsModalActive(true)}
            />
          )}

          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>

          <div className='md:inline-flex items-center ms-auto'>
            <Link href={'/patients/patients-table'}>Switch to Table</Link>
          </div>
        </CardBox>

        <CardBox className='mb-6' hasTable>
          <TablePatients
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={false}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title='Upload CSV'
        buttonColor='info'
        buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
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
