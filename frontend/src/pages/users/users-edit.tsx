import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'next-i18next';
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
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { update, fetch } from '../../stores/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EditUsersPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const initVals = {
    firstName: '',

    lastName: '',

    phoneNumber: '',

    email: '',

    disabled: false,

    avatar: [],

    app_role: null,

    custom_permissions: [],

    organizations: null,

    password: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { users } = useAppSelector((state) => state.users);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof users === 'object') {
      setInitialValues(users);
    }
  }, [users]);

  useEffect(() => {
    if (typeof users === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach((el) => (newInitialVal[el] = users[el]));
      setInitialValues(newInitialVal);
    }
  }, [users]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/users/users-list');
  };

  return (
    <>
      <Head>
        <title>
          {getPageTitle(
            t('pages.users.editTitle', { defaultValue: 'Edit users' }),
          )}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('pages.users.editTitle', { defaultValue: 'Edit users' })}
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
              <FormField label={t('fields.firstName')}>
                <Field name='firstName' placeholder={t('fields.firstName')} />
              </FormField>

              <FormField label={t('fields.lastName')}>
                <Field name='lastName' placeholder={t('fields.lastName')} />
              </FormField>

              <FormField label={t('fields.phoneNumber')}>
                <Field
                  name='phoneNumber'
                  placeholder={t('fields.phoneNumber')}
                />
              </FormField>

              <FormField label={t('fields.email')}>
                <Field name='email' placeholder={t('fields.email')} />
              </FormField>

              <FormField label={t('fields.disabled')} labelFor='disabled'>
                <Field
                  name='disabled'
                  id='disabled'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField>
                <Field
                  label={t('fields.avatar')}
                  color='info'
                  icon={mdiUpload}
                  path={'users/avatar'}
                  name='avatar'
                  id='avatar'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label={t('fields.appRole')} labelFor='app_role'>
                <Field
                  name='app_role'
                  id='app_role'
                  component={SelectField}
                  options={initialValues.app_role}
                  itemRef={'roles'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField
                label={t('fields.customPermissions')}
                labelFor='custom_permissions'
              >
                <Field
                  name='custom_permissions'
                  id='custom_permissions'
                  component={SelectFieldMany}
                  options={initialValues.custom_permissions}
                  itemRef={'permissions'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField
                label={t('fields.organizations')}
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

              <FormField label={t('fields.password')}>
                <Field name='password' placeholder={t('fields.password')} />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton
                  type='submit'
                  color='info'
                  label={t('actions.submit')}
                />
                <BaseButton
                  type='reset'
                  color='info'
                  outline
                  label={t('actions.reset')}
                  onClick={() => setInitialValues(initVals)}
                />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label={t('actions.cancel')}
                  onClick={() => router.push('/users/users-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditUsersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_USERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditUsersPage;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
