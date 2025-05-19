import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableDoctor_availabilities from '../../components/Doctor_availabilities/TableDoctor_availabilities';
import BaseButton from '../../components/BaseButton';
import axiosInstance from '../../utils/axiosInstance';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/doctor_availabilities/doctor_availabilitiesSlice';

import { hasPermission } from '../../helpers/userPermissions';

const Doctor_availabilitiesTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: 'Weekday', title: 'weekday' },
    {
      label: 'SlotDurationMinutes',
      title: 'slot_duration_minutes',
      number: 'true',
    },

    { label: 'MorningStartTime', title: 'morning_start_time', date: 'true' },
    { label: 'MorningEndTime', title: 'morning_end_time', date: 'true' },
    { label: 'EveningStartTime', title: 'evening_start_time', date: 'true' },
    { label: 'EveningEndTime', title: 'evening_end_time', date: 'true' },

    { label: 'Doctor', title: 'doctor' },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_DOCTOR_AVAILABILITIES');

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

  const getDoctor_availabilitiesCSV = async () => {
    const response = await axiosInstance({
      url: '/doctor_availabilities?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'doctor_availabilitiesCSV.csv';
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
        <title>{getPageTitle('Doctor_availabilities')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Doctor_availabilities'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={'mr-3'}
              href={'/doctor_availabilities/doctor_availabilities-new'}
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
            onClick={getDoctor_availabilitiesCSV}
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
            <Link href={'/doctor_availabilities/doctor_availabilities-table'}>
              Switch to Table
            </Link>
          </div>
        </CardBox>

        <CardBox className='mb-6' hasTable>
          <TableDoctor_availabilities
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

Doctor_availabilitiesTablesPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_DOCTOR_AVAILABILITIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Doctor_availabilitiesTablesPage;
