import React, { useEffect } from 'react';
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
import axiosInstance from '../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

export default function Forgot() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const notify = (type, msg) => toast(msg, { type });
  const [ready, setReady] = React.useState(false);
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.on('initialized', () => setReady(true));
  }, [i18n]);

  const handleSubmit = async (value) => {
    setLoading(true);
    try {
      const { data: response } = await axiosInstance.post(
        '/auth/send-password-reset-email',
        value,
      );
      setLoading(false);
      notify('success', t('forgot.checkEmail'));
      setTimeout(async () => {
        await router.push('/login');
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log('error: ', error);
      notify('error', t('forgot.error'));
    }
  };

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>{getPageTitle(t('forgot.title'))}</title>
      </Head>

      <SectionFullScreen bg='violet'>
        <CardBox className='w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12'>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form dir={isRTL ? 'rtl' : 'ltr'}>
              <FormField
                label={t('forgot.emailLabel')}
                help={t('forgot.emailHelp')}
              >
                <Field
                  name='email'
                  placeholder={t('forgot.emailPlaceholder')}
                  className='w-full'
                />
              </FormField>

              <BaseDivider />

              <BaseButtons>
                <BaseButton
                  type='submit'
                  label={loading ? t('common.loading') : t('common.submit')}
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

Forgot.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
