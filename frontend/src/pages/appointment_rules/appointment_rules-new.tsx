import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import { SelectField } from '../../components/SelectField';
import { create } from '../../stores/appointment_rules/appointment_rulesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const initialValues = {
  department: '',

  min_hours_before_booking: '',

  max_days_advance_booking: '',

  organizations: '',
};

const Appointment_rulesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/appointment_rules/appointment_rules-table');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle(t('appointmentRules.newTitle'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('appointmentRules.newTitle')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField
                label={t('appointmentRules.department')}
                labelFor='department'
              >
                <Field
                  name='department'
                  id='department'
                  component={SelectField}
                  options={[]}
                  itemRef={'departments'}
                ></Field>
              </FormField>

              <FormField label={t('appointmentRules.minHoursBeforeBooking')}>
                <Field
                  type='number'
                  name='min_hours_before_booking'
                  placeholder={t('appointmentRules.minHoursBeforeBooking')}
                />
              </FormField>

              <FormField label={t('appointmentRules.maxDaysAdvanceBooking')}>
                <Field
                  type='number'
                  name='max_days_advance_booking'
                  placeholder={t('appointmentRules.maxDaysAdvanceBooking')}
                />
              </FormField>

              <FormField
                label={t('appointmentRules.organizations')}
                labelFor='organizations'
              >
                <Field
                  name='organizations'
                  id='organizations'
                  component={SelectField}
                  options={[]}
                  itemRef={'organizations'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton
                  type='submit'
                  color='info'
                  label={t('common.submit')}
                />
                <BaseButton
                  type='reset'
                  color='info'
                  outline
                  label={t('common.reset')}
                />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label={t('common.cancel')}
                  onClick={() =>
                    router.push('/appointment_rules/appointment_rules-table')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Appointment_rulesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_APPOINTMENT_RULES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Appointment_rulesNew;
