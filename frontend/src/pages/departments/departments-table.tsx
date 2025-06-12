import { mdiChartTimelineVariant } from '@mdi/js';
import { uniqueId } from 'lodash';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableDepartments from '../../components/Departments/TableDepartments';
import BaseButton from '../../components/BaseButton';
import axiosInstance from '../../utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/departments/departmentsSlice';

import { hasPermission } from '../../helpers/userPermissions';

const DepartmentsTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const globalAccess = currentUser?.app_role?.globalAccess;

  const filtersArray = [
    ...(globalAccess ? [{ label: 'Organization', title: 'organization' }] : []),
    { label: 'Name', title: 'name' },
    { label: 'Description', title: 'description' },
  ];

  const [filters] = useState(filtersArray);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_DEPARTMENTS');

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

  const getDepartmentsCSV = async () => {
    const response = await axiosInstance({
      url: '/departments?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'departmentsCSV.csv';
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
        <title>{getPageTitle('Departments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Departments'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={'mr-3'}
              href={'/departments/departments-new'}
              color='info'
              label='New Department'
              disabled={currentUser?.app_role?.globalAccess}
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
            onClick={getDepartmentsCSV}
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
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TableDepartments
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={true}
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

DepartmentsTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DEPARTMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DepartmentsTablesPage;
