import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import CardBox from '../components/CardBox';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import { getPageTitle } from '../config';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import BaseDivider from '../components/BaseDivider';
import BaseButtons from '../components/BaseButtons';
import BaseButton from '../components/BaseButton';
import FormImagePicker from '../components/FormImagePicker';
import { SwitchField } from '../components/SwitchField';
import { SelectField } from '../components/SelectField';
import { update } from '../stores/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { useRouter } from 'next/router';
import { findMe } from '../stores/authSlice';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EditUsers = () => {
  const { t } = useTranslation('common');
  const { currentUser, isFetching, token } = useAppSelector(
    (state) => state.auth,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notify = (type, msg) => toast(msg, { type });
  const initVals = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    app_role: '',
    disabled: false,
    avatar: [],
    password: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  useEffect(() => {
    if (currentUser?.id && typeof currentUser === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = currentUser[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [currentUser]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: currentUser.id, data }));
    await dispatch(findMe());
    await router.push('/users/users-list');
    notify('success', t('profile.updated'));
  };

  return (
    <>
      <Head>
        <title>{getPageTitle(t('profile.editProfile'))}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={t('profile.editProfile')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          {currentUser?.avatar[0]?.publicUrl && (
            <div className={'grid grid-cols-6 gap-4 mb-4'}>
              <div className='col-span-1 w-80 h-80 overflow-hidden border-2 rounded-full inline-flex items-center justify-center mb-8'>
                <Image
                  className='w-80 h-80 max-w-full max-h-full object-cover object-center'
                  src={currentUser?.avatar[0]?.publicUrl}
                  alt='Avatar'
                  width={320}
                  height={320}
                />
              </div>
            </div>
          )}
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField>
                <Field
                  label={t('profile.avatar')}
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
              <FormField label={t('profile.firstName')}>
                <Field name='firstName' placeholder={t('profile.firstName')} />
              </FormField>

              <FormField label={t('profile.lastName')}>
                <Field name='lastName' placeholder={t('profile.lastName')} />
              </FormField>

              <FormField label={t('profile.phoneNumber')}>
                <Field
                  name='phoneNumber'
                  placeholder={t('profile.phoneNumber')}
                />
              </FormField>

              <FormField label={t('profile.email')}>
                <Field name='email' placeholder={t('profile.email')} disabled />
              </FormField>

              <FormField label={t('profile.appRole')} labelFor='app_role'>
                <Field
                  name='app_role'
                  id='app_role'
                  component={SelectField}
                  options={initialValues.app_role}
                  itemRef={'roles'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label={t('profile.disabled')} labelFor='disabled'>
                <Field
                  name='disabled'
                  id='disabled'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField label={t('profile.password')}>
                <Field name='password' placeholder={t('profile.password')} />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                <BaseButton
                  type='submit'
                  color='info'
                  label={t('profile.submit')}
                />
                <BaseButton
                  type='button'
                  color='info'
                  outline
                  label={t('profile.reset')}
                  onClick={() => setInitialValues(initVals)}
                />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label={t('profile.cancel')}
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

EditUsers.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default EditUsers;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
