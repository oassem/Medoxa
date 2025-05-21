import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableAppointment_rules from '../../components/Appointment_rules/TableAppointment_rules';
import BaseButton from '../../components/BaseButton';
import axiosInstance from '../../utils/axiosInstance';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/appointment_rules/appointment_rulesSlice';
import { useTranslation } from 'react-i18next';
import { hasPermission } from '../../helpers/userPermissions';

const Appointment_rulesTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const [filters] = useState([
    {
      label: t('appointmentRules.minHoursBeforeBooking'),
      title: 'min_hours_before_booking',
      number: 'true',
    },
    {
      label: t('appointmentRules.maxDaysAdvanceBooking'),
      title: 'max_days_advance_booking',
      number: 'true',
    },
    { label: t('appointmentRules.department'), title: 'department' },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_APPOINTMENT_RULES');

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

  const getAppointment_rulesCSV = async () => {
    const response = await axiosInstance({
      url: '/appointment_rules?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'appointment_rulesCSV.csv';
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
        <title>{getPageTitle(t('appointmentRules.pageTitle'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('appointmentRules.title')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName={`flex flex-row`}>
          {hasCreatePermission && (
            <BaseButton
              className={`${isRTL ? 'ml-3' : 'mr-3'}`}
              href={'/appointment_rules/appointment_rules-new'}
              color='info'
              label={t('appointmentRules.newItem')}
            />
          )}

          <BaseButton
            className={`${isRTL ? 'ml-3' : 'mr-3'}`}
            color='info'
            label={t('appointmentRules.filter')}
            onClick={addFilter}
          />
          <BaseButton
            className={`${isRTL ? 'ml-3' : 'mr-3'}`}
            color='info'
            label={t('appointmentRules.downloadCSV')}
            onClick={getAppointment_rulesCSV}
          />

          {hasCreatePermission && (
            <BaseButton
              color='info'
              label={t('appointmentRules.uploadCSV')}
              onClick={() => setIsModalActive(true)}
            />
          )}

          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>
          </div>
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TableAppointment_rules
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={true}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title={t('appointmentRules.uploadCSV')}
        buttonColor='info'
        buttonLabel={t('appointmentRules.confirm')}
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

Appointment_rulesTablesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_APPOINTMENT_RULES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Appointment_rulesTablesPage;
