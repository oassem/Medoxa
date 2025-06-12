import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import 'react-datepicker/dist/react-datepicker.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormImagePicker from '../../components/FormImagePicker';
import { getPageTitle } from '../../config';
import { Field, Form, Formik } from 'formik';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { update, fetch } from '../../stores/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';

const EditUsersPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    department: '',
  };

  const [initialValues, setInitialValues] = useState(initVals);
  const [selectedRole, setSelectedRole] = React.useState('');
  const { currentUser } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const { id } = router.query;

  const isAdminRole = selectedRole === '373a71ca-cb63-4924-8c8a-021900a7eb7b';
  const isSuperAdminRole =
    selectedRole === '7db26e30-c5bc-426a-8e44-59917ac8e4d3';
  const isFormDisabled =
    currentUser?.app_role?.globalAccess && !isAdminRole && !isSuperAdminRole;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof users === 'object') {
      setInitialValues(users);
      setSelectedRole(users.app_role?.id);
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
    const { department, organizations, ...rest } = data;
    const submitData = {
      ...rest,
      departmentId: isAdminRole ? null : department || null,
      organizations: isSuperAdminRole ? null : organizations || null,
    };

    await dispatch(update({ id: id, data: submitData }));
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
                <Field
                  name='firstName'
                  placeholder={t('fields.firstName')}
                  disabled={isFormDisabled}
                />
              </FormField>

              <FormField label={t('fields.lastName')}>
                <Field
                  name='lastName'
                  placeholder={t('fields.lastName')}
                  disabled={isFormDisabled}
                />
              </FormField>

              <FormField label={t('fields.phoneNumber')}>
                <Field
                  name='phoneNumber'
                  placeholder={t('fields.phoneNumber')}
                  disabled={isFormDisabled}
                />
              </FormField>

              <FormField label={t('fields.email')}>
                <Field
                  name='email'
                  placeholder={t('fields.email')}
                  disabled={isFormDisabled}
                />
              </FormField>

              <FormField label={t('fields.disabled')} labelFor='disabled'>
                <Field
                  name='disabled'
                  id='disabled'
                  component={SwitchField}
                  disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
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
                  onChange={(value) => {
                    setSelectedRole(value);
                  }}
                  disabled={isFormDisabled}
                ></Field>
              </FormField>

              {!isSuperAdminRole && (
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
                    disabled={isFormDisabled}
                  ></Field>
                </FormField>
              )}

              {currentUser?.app_role?.globalAccess && !isSuperAdminRole && (
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
                    disabled={isFormDisabled}
                  ></Field>
                </FormField>
              )}

              {!currentUser?.app_role?.globalAccess &&
                !isAdminRole &&
                !isSuperAdminRole && (
                  <FormField label='Department' labelFor='department'>
                    <Field
                      name='department'
                      id='department'
                      component={SelectField}
                      options={initialValues.department}
                      itemRef={'departments'}
                      showField={'name'}
                      disabled={isFormDisabled}
                    ></Field>
                  </FormField>
                )}

              <FormField label={t('fields.password')}>
                <Field
                  name='password'
                  placeholder={t('fields.password')}
                  disabled={isFormDisabled}
                />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                {!isFormDisabled && (
                  <BaseButton
                    type='submit'
                    color='info'
                    label={t('actions.submit')}
                  />
                )}

                {!isFormDisabled && (
                  <BaseButton
                    type='reset'
                    color='info'
                    outline
                    label={t('actions.reset')}
                    onClick={() => setInitialValues(initVals)}
                  />
                )}

                <BaseButton
                  type='reset'
                  color='danger'
                  outline={!isFormDisabled}
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
