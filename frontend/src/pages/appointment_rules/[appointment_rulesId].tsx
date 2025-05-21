import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/appointment_rules/appointment_rulesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditAppointment_rules = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const { currentUser } = useAppSelector((state) => state.auth);

  const { appointment_rulesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: appointment_rulesId }));
  }, [appointment_rulesId]);

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
    await dispatch(update({ id: appointment_rulesId, data }));
    await router.push('/appointment_rules/appointment_rules-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit appointment_rules')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit appointment_rules'}
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
              <FormField label='Department' labelFor='department'>
                <Field
                  name='department'
                  id='department'
                  component={SelectField}
                  options={initialValues.department}
                  itemRef={'departments'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='MinHoursBeforeBooking'>
                <Field
                  type='number'
                  name='min_hours_before_booking'
                  placeholder='MinHoursBeforeBooking'
                />
              </FormField>

              <FormField label='MaxDaysAdvanceBooking'>
                <Field
                  type='number'
                  name='max_days_advance_booking'
                  placeholder='MaxDaysAdvanceBooking'
                />
              </FormField>

              <FormField label='organizations' labelFor='organizations'>
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
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
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

EditAppointment_rules.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_APPOINTMENT_RULES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAppointment_rules;
