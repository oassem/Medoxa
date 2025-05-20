import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
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
import { SwitchField } from '../../components/SwitchField';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { create } from '../../stores/users/usersSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const initialValues = {
  firstName: '',

  lastName: '',

  phoneNumber: '',

  email: '',

  disabled: false,

  avatar: [],

  app_role: '',

  custom_permissions: [],

  organizations: '',
};

const UsersNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/users/users-list');
  };
  return (
    <>
      <Head>
        <title>
          {getPageTitle(
            t('pages.users.newTitle', { defaultValue: 'New User' }),
          )}
        </title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('pages.users.newTitle', { defaultValue: 'New User' })}
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
                  options={[]}
                  itemRef={'roles'}
                ></Field>
              </FormField>

              <FormField
                label={t('fields.customPermissions')}
                labelFor='custom_permissions'
              >
                <Field
                  name='custom_permissions'
                  id='custom_permissions'
                  itemRef={'permissions'}
                  options={[]}
                  component={SelectFieldMany}
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
                  options={[]}
                  itemRef={'organizations'}
                ></Field>
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

UsersNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_USERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default UsersNew;
