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

import { update, fetch } from '../../stores/patients/patientsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPatients = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    user: null,

    organization: null,

    full_name_en: '',

    full_name_ar: '',

    date_of_birth: new Date(),

    gender: '',

    nationality: '',

    identifier_type: '',

    identifier: '',

    address: '',

    emergency_contact_name: '',

    emergency_contact_phone: '',

    medical_history: '',

    allergies: '',

    current_medications: '',

    family_history: '',

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { patients } = useAppSelector((state) => state.patients);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { patientsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: patientsId }));
  }, [patientsId]);

  useEffect(() => {
    if (typeof patients === 'object') {
      setInitialValues(patients);
    }
  }, [patients]);

  useEffect(() => {
    if (typeof patients === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach((el) => (newInitialVal[el] = patients[el]));

      setInitialValues(newInitialVal);
    }
  }, [patients]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: patientsId, data }));
    await router.push('/patients/patients-table');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit patients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit patients'}
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
              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
                <FormField label='Organization' labelFor='organization'>
                  <Field
                    name='organization'
                    id='organization'
                    component={SelectField}
                    options={initialValues.organization}
                    itemRef={'organizations'}
                    showField={'name'}
                  ></Field>
                </FormField>
              )}

              <FormField label='FullName(English)'>
                <Field name='full_name_en' placeholder='FullName(English)' />
              </FormField>

              <FormField label='FullName(Arabic)'>
                <Field name='full_name_ar' placeholder='FullName(Arabic)' />
              </FormField>

              <FormField label='DateofBirth'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.date_of_birth
                      ? new Date(
                          dayjs(initialValues.date_of_birth).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date_of_birth: date })
                  }
                />
              </FormField>

              <FormField label='Gender' labelFor='gender'>
                <Field name='gender' id='gender' component='select'>
                  <option value='Male'>Male</option>

                  <option value='Female'>Female</option>

                  <option value='Other'>Other</option>
                </Field>
              </FormField>

              <FormField label='Nationality'>
                <Field name='nationality' placeholder='Nationality' />
              </FormField>

              <FormField label='IdentifierType' labelFor='identifier_type'>
                <Field
                  name='identifier_type'
                  id='identifier_type'
                  component='select'
                >
                  <option value='National ID'>National ID</option>

                  <option value='Iqama'>Iqama</option>

                  <option value='Passport'>Passport</option>
                </Field>
              </FormField>

              <FormField label='Identifier'>
                <Field name='identifier' placeholder='Identifier' />
              </FormField>

              <FormField label='Address'>
                <Field name='address' placeholder='Address' />
              </FormField>

              <FormField label='EmergencyContactName'>
                <Field
                  name='emergency_contact_name'
                  placeholder='EmergencyContactName'
                />
              </FormField>

              <FormField label='EmergencyContactPhone'>
                <Field
                  name='emergency_contact_phone'
                  placeholder='EmergencyContactPhone'
                />
              </FormField>

              <FormField label='MedicalHistory' hasTextareaHeight>
                <Field
                  name='medical_history'
                  as='textarea'
                  placeholder='MedicalHistory'
                />
              </FormField>

              <FormField label='Allergies' hasTextareaHeight>
                <Field name='allergies' as='textarea' placeholder='Allergies' />
              </FormField>

              <FormField label='CurrentMedications' hasTextareaHeight>
                <Field
                  name='current_medications'
                  as='textarea'
                  placeholder='CurrentMedications'
                />
              </FormField>

              <FormField label='FamilyHistory' hasTextareaHeight>
                <Field
                  name='family_history'
                  as='textarea'
                  placeholder='FamilyHistory'
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
                  onClick={() => router.push('/patients/patients-table')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditPatients.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PATIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPatients;
