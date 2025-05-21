import React from 'react';
import type { ReactElement } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Head from 'next/head';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import BaseDivider from '../components/BaseDivider';
import BaseButtons from '../components/BaseButtons';
import { useRouter } from 'next/router';
import { getPageTitle } from '../config';
import Select from 'react-select';
import { useAppDispatch } from '../stores/hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const notify = (type, msg) => toast(msg, { type, position: 'bottom-center' });
  const [organizations, setOrganizations] = React.useState(null);
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  const fetchOrganizations = createAsyncThunk('/org-for-auth', async () => {
    try {
      const response = await axiosInstance.get('/org-for-auth');
      setOrganizations(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  });

  React.useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);
  const options = organizations?.map((org) => ({
    value: org.id,
    label: org.name,
  }));

  const handleSubmit = async (value) => {
    setLoading(true);
    try {
      await router.push('/login');
      setLoading(false);
      notify('success', t('register.checkEmail'));
    } catch (error) {
      setLoading(false);
      console.log('error: ', error);
      notify('error', t('register.error'));
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle(t('register.title'))}</title>
      </Head>

      <SectionFullScreen bg='violet'>
        <CardBox className='w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12'>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirm: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form dir={isRTL ? 'rtl' : 'ltr'}>
              <label className='block font-bold mb-2'>
                {t('register.organization')}
              </label>

              <Select
                classNames={{
                  control: () => 'px-1 mb-4 py-2',
                }}
                value={selectedOrganization}
                onChange={setSelectedOrganization}
                options={options}
                placeholder={t('register.selectOrganization')}
              />

              <FormField
                label={t('register.email')}
                help={t('register.emailHelp')}
              >
                <Field
                  type='email'
                  name='email'
                  placeholder={t('register.emailPlaceholder')}
                />
              </FormField>
              <FormField
                label={t('register.password')}
                help={t('register.passwordHelp')}
              >
                <Field
                  type='password'
                  name='password'
                  placeholder={t('register.passwordPlaceholder')}
                />
              </FormField>
              <FormField
                label={t('register.confirm')}
                help={t('register.confirmHelp')}
              >
                <Field
                  type='password'
                  name='confirm'
                  placeholder={t('register.confirmPlaceholder')}
                />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                <BaseButton
                  type='submit'
                  label={loading ? t('common.loading') : t('register.register')}
                  color='info'
                />
                <BaseButton
                  href={'/login'}
                  label={t('common.login')}
                  color='info'
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
      <ToastContainer rtl={isRTL} />
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
