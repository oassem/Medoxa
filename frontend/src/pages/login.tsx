import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import BaseButton from '../components/BaseButton';
import CardBox from '../components/CardBox';
import BaseIcon from '../components/BaseIcon';
import { mdiInformation, mdiEye, mdiEyeOff } from '@mdi/js';
import SectionFullScreen from '../components/SectionFullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/FormField';
import FormCheckRadio from '../components/FormCheckRadio';
import BaseDivider from '../components/BaseDivider';
import BaseButtons from '../components/BaseButtons';
import { useRouter } from 'next/router';
import { getPageTitle } from '../config';
import { findMe, loginUser, resetAction } from '../stores/authSlice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { getPexelsImage, getPexelsVideo } from '../helpers/pexels';

export default function Login() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const textColor = useAppSelector((state) => state.style.linkColor);
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const notify = (type, msg) => toast(msg, { type });
  const [illustrationImage, setIllustrationImage] = useState({
    src: undefined,
    photographer: undefined,
    photographer_url: undefined,
  });
  const [illustrationVideo, setIllustrationVideo] = useState({
    video_files: [],
  });
  const [contentType, setContentType] = useState('video');
  const [contentPosition, setContentPosition] = useState('right');
  const [showPassword, setShowPassword] = useState(false);
  const {
    currentUser,
    isFetching,
    errorMessage,
    token,
    notify: notifyState,
  } = useAppSelector((state) => state.auth);
  const [initialValues, setInitialValues] = React.useState({
    email: 'super_admin@flatlogic.com',
    password: '2231a1c1',
    remember: true,
  });

  const title = 'Medoxa';
  const [year, setYear] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.on('initialized', () => setReady(true));
  }, [i18n]);

  // Fetch Pexels image/video
  useEffect(() => {
    async function fetchData() {
      const image = await getPexelsImage();
      const video = await getPexelsVideo();
      setIllustrationImage(image);
      setIllustrationVideo(video);
    }
    fetchData();
  }, []);

  // Fetch user data
  useEffect(() => {
    if (token) {
      dispatch(findMe());
    }
  }, [token, dispatch]);

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (currentUser?.id) {
      router.push('/dashboard');
    }
  }, [currentUser?.id, router]);

  // Show error message if there is one
  useEffect(() => {
    if (errorMessage) {
      notify('error', errorMessage);
    }
  }, [errorMessage]);

  // Show notification if there is one
  useEffect(() => {
    if (notifyState?.showNotification) {
      notify('success', notifyState?.textNotification);
      dispatch(resetAction());
    }
  }, [notifyState?.showNotification]);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!ready) return null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (value) => {
    const { remember, ...rest } = value;
    await dispatch(loginUser(rest));
  };

  const setLogin = (target) => {
    const email = target?.innerText;
    setInitialValues((prev) => {
      return { ...prev, email, password: '2231a1c1' };
    });
  };

  const imageBlock = (image) => (
    <div
      className='hidden md:flex flex-col justify-end relative flex-grow-0 flex-shrink-0 w-1/3'
      style={{
        backgroundImage: `${
          image
            ? `url(${image.src?.original})`
            : 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))'
        }`,
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
      }}
    ></div>
  );

  const videoBlock = (video) => {
    if (video?.video_files?.length > 0) {
      return (
        <div className='hidden md:flex flex-col justify-end relative flex-grow-0 flex-shrink-0 w-1/3'>
          <video
            className='absolute top-0 left-0 w-full h-full object-cover'
            autoPlay
            loop
            muted
          >
            <source src={video.video_files[0]?.link} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={isRTL ? 'rtl' : 'ltr'}
      style={
        contentPosition === 'background'
          ? {
              backgroundImage: `${
                illustrationImage
                  ? `url(${illustrationImage.src?.original})`
                  : 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))'
              }`,
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      }
    >
      <Head>
        <title>{getPageTitle(t('pages.login.pageTitle'))}</title>
      </Head>

      <SectionFullScreen bg='violet'>
        <div
          className={`flex ${
            isRTL
              ? contentPosition === 'right'
                ? 'flex-row'
                : 'flex-row-reverse'
              : contentPosition === 'right'
                ? 'flex-row-reverse'
                : 'flex-row'
          } min-h-screen w-full`}
        >
          {contentType === 'image' && contentPosition !== 'background'
            ? imageBlock(illustrationImage)
            : null}
          {contentType === 'video' && contentPosition !== 'background'
            ? videoBlock(illustrationVideo)
            : null}
          <div className='flex items-center justify-center flex-col space-y-4 w-full lg:w-full'>
            <CardBox
              dir='ltr'
              id='loginRoles'
              className='w-full md:w-3/5 lg:w-2/3'
            >
              <Link href={'/home'}>
                <h2 className='text-4xl font-semibold my-4'> {title}</h2>
              </Link>

              <div className='flex flex-row text-gray-500 justify-between'>
                <div>
                  <p className='mb-2'>
                    Use{' '}
                    <code
                      className={`cursor-pointer ${textColor} `}
                      onClick={(e) => setLogin(e.target)}
                    >
                      super_admin@flatlogic.com
                    </code>
                    {' / '}
                    <code className={`${textColor}`}>2231a1c1</code>
                    {' / '}
                    to login as Super Admin
                  </p>

                  <p className='mb-2'>
                    Use{' '}
                    <code
                      className={`cursor-pointer ${textColor} `}
                      onClick={(e) => setLogin(e.target)}
                    >
                      admin@flatlogic.com
                    </code>
                    {' / '}
                    <code className={`${textColor}`}>2231a1c1</code>
                    {' / '}
                    to login as Admin
                  </p>
                  <p>
                    Use{' '}
                    <code
                      className={`cursor-pointer ${textColor} `}
                      onClick={(e) => setLogin(e.target)}
                    >
                      client@hello.com
                    </code>
                    {' / '}
                    <code className={`${textColor}`}>c69e460bf391</code>
                    {' / '}
                    to login as User
                  </p>
                </div>
                <div>
                  <BaseIcon
                    className={`${iconsColor}`}
                    w='w-16'
                    h='h-16'
                    size={48}
                    path={mdiInformation}
                  />
                </div>
              </div>
            </CardBox>

            <CardBox className='w-full md:w-3/5 lg:w-2/3'>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form>
                  <FormField
                    label={t('pages.login.form.loginLabel')}
                    help={t('pages.login.form.loginHelp')}
                  >
                    <Field name='email' />
                  </FormField>

                  <div className='relative'>
                    <FormField
                      label={t('pages.login.form.passwordLabel')}
                      help={t('pages.login.form.passwordHelp')}
                    >
                      <Field
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                      />
                    </FormField>
                    <div
                      className={`absolute bottom-8 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center cursor-pointer`}
                      onClick={togglePasswordVisibility}
                    >
                      <BaseIcon
                        className='text-gray-500 hover:text-gray-700'
                        size={20}
                        path={showPassword ? mdiEyeOff : mdiEye}
                      />
                    </div>
                  </div>

                  <div className={'flex justify-between'}>
                    <FormCheckRadio
                      type='checkbox'
                      label={t('pages.login.form.remember')}
                      isRTL={isRTL}
                    >
                      <Field type='checkbox' name='remember' />
                    </FormCheckRadio>

                    <Link
                      className={`${textColor} text-blue-600`}
                      href={'/forgot'}
                    >
                      {t('pages.login.form.forgotPassword')}
                    </Link>
                  </div>

                  <BaseDivider />

                  <BaseButtons>
                    <BaseButton
                      className={'w-full'}
                      type='submit'
                      label={
                        isFetching
                          ? t('pages.login.form.loading')
                          : t('pages.login.form.loginButton')
                      }
                      color='info'
                      disabled={isFetching}
                    />
                  </BaseButtons>
                  <br />
                  <p className={'text-center'}>
                    {t('pages.login.form.noAccountYet')}{' '}
                    <Link className={`${textColor}`} href={'/register'}>
                      {t('pages.login.form.newAccount')}
                    </Link>
                  </p>
                </Form>
              </Formik>
            </CardBox>
          </div>
        </div>
      </SectionFullScreen>
      <div className='bg-black text-white flex flex-col text-center justify-center md:flex-row'>
        <p className='py-6 text-sm'>
          {isRTL
            ? `${year} Medoxa - ${t('pages.login.footer.copyright_ar')} ©`
            : `© ${year} Medoxa - ${t('pages.login.footer.copyright')}`}
        </p>
        <Link
          className={`py-6 ${isRTL ? 'mr-4' : 'ml-4'} text-sm underline`}
          href='/privacy-policy/'
        >
          {t('pages.login.footer.privacy')}
        </Link>
      </div>
      <ToastContainer rtl={isRTL} />
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
