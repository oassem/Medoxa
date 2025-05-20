import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableUsers from '../../components/Users/TableUsers';
import BaseButton from '../../components/BaseButton';
import axiosInstance from '../../utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import { setRefetch, uploadCsv } from '../../stores/users/usersSlice';
import { useTranslation } from 'react-i18next';
import { hasPermission } from '../../helpers/userPermissions';

const UsersTablesPage = () => {
  const { t } = useTranslation('common');
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    { label: t('users.firstName'), title: 'firstName' },
    { label: t('users.lastName'), title: 'lastName' },
    { label: t('users.phoneNumber'), title: 'phoneNumber' },
    { label: t('users.email'), title: 'email' },
    { label: t('users.appRole'), title: 'app_role' },
    { label: t('users.customPermissions'), title: 'custom_permissions' },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_USERS');

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

  const getUsersCSV = async () => {
    const response = await axiosInstance({
      url: '/users?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'usersCSV.csv';
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
        <title>{getPageTitle(t('users.title'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('users.title')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox
          id='usersList'
          className='mb-6'
          cardBoxClassName='flex flex-wrap'
        >
          {hasCreatePermission && (
            <BaseButton
              className={'me-3'}
              href={'/users/users-new'}
              color='info'
              label={t('users.addInviteUser')}
            />
          )}

          <BaseButton
            className={'me-3'}
            color='info'
            label={t('users.filter')}
            onClick={addFilter}
          />
          <BaseButton
            className={'me-3'}
            color='info'
            label={t('users.downloadCSV')}
            onClick={getUsersCSV}
          />

          {hasCreatePermission && (
            <BaseButton
              color='info'
              label={t('users.uploadCSV')}
              onClick={() => setIsModalActive(true)}
            />
          )}

          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>
        </CardBox>

        <CardBox className='mb-6' hasTable>
          <TableUsers
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={false}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title={t('users.uploadCSV')}
        buttonColor='info'
        buttonLabel={t('users.confirm')}
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

UsersTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_USERS'}>{page}</LayoutAuthenticated>
  );
};

export default UsersTablesPage;
