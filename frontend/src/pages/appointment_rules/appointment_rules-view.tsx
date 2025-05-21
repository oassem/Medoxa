import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/appointment_rules/appointment_rulesSlice';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { useTranslation } from 'react-i18next';

const Appointment_rulesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appointment_rules } = useAppSelector(
    (state) => state.appointment_rules,
  );

  const { id } = router.query;
  const { t } = useTranslation('common');

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle(t('appointmentRules.viewTitle'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('appointmentRules.viewTitle')}
          main
        >
          <BaseButton
            color='info'
            label={t('common.edit')}
            href={`/appointment_rules/appointment_rules-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-8'}>
            <p className={'block font-bold mb-2'}>
              {t('appointmentRules.department')}
            </p>
            <p>{appointment_rules?.department?.name ?? t('common.noData')}</p>
          </div>
          <div className={'mb-8'}>
            <p className={'block font-bold mb-2'}>
              {t('appointmentRules.minHoursBeforeBooking')}
            </p>
            <p>
              {appointment_rules?.min_hours_before_booking ||
                t('common.noData')}
            </p>
          </div>
          <div className={'mb-8'}>
            <p className={'block font-bold mb-2'}>
              {t('appointmentRules.maxDaysAdvanceBooking')}
            </p>
            <p>
              {appointment_rules?.max_days_advance_booking ||
                t('common.noData')}
            </p>
          </div>
          <div className={'mb-8'}>
            <p className={'block font-bold mb-2'}>
              {t('appointmentRules.organizations')}
            </p>
            <p>
              {appointment_rules?.organizations?.name ?? t('common.noData')}
            </p>
          </div>
          <BaseDivider />
          <BaseButton
            color='info'
            label={t('common.back')}
            onClick={() =>
              router.push('/appointment_rules/appointment_rules-table')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Appointment_rulesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_APPOINTMENT_RULES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Appointment_rulesView;
