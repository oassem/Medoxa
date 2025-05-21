import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
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
import {
  update,
  fetch,
} from '../../stores/appointment_rules/appointment_rulesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const EditAppointment_rulesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const initVals = {
    department: null,

    min_hours_before_booking: '',

    max_days_advance_booking: '',

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { appointment_rules } = useAppSelector(
    (state) => state.appointment_rules,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof appointment_rules === 'object') {
      setInitialValues(appointment_rules);
    }
  }, [appointment_rules]);

  useEffect(() => {
    if (typeof appointment_rules === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = appointment_rules[el]),
      );
      setInitialValues(newInitialVal);
    }
  }, [appointment_rules]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/appointment_rules/appointment_rules-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle(t('appointmentRules.editTitle'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('appointmentRules.editTitle')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
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
                  options={initialValues.department}
                  itemRef={'departments'}
                  showField={'name'}
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
                  options={initialValues.organizations}
                  itemRef={'organizations'}
                  showField={'name'}
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
                  onClick={() => {
                    setInitialValues(initVals);
                  }}
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

EditAppointment_rulesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_APPOINTMENT_RULES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAppointment_rulesPage;
