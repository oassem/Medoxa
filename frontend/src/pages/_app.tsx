import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { store } from '../stores/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import ErrorBoundary from '../components/ErrorBoundary';
import i18n from '../i18n';
import IntroGuide from '../components/IntroGuide';
import '../css/main.css';
import 'intro.js/introjs.css';
import {
  appSteps,
  landingSteps,
  loginSteps,
  usersSteps,
  rolesSteps,
} from '../stores/introSteps';
import UniversalLoader from '../components/UniversalLoader';
import Router from 'next/router';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const [stepsEnabled, setStepsEnabled] = React.useState(false);
  const [stepName, setStepName] = React.useState('');
  const [steps, setSteps] = React.useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // Read language from localStorage
    const savedLanguage = localStorage.getItem('app_lang_31447') || 'en';

    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  React.useEffect(() => {
    // Setup message handler
    const handleMessage = (event) => {
      if (event.data === 'getLocation') {
        event.source.postMessage(
          { iframeLocation: window.location.pathname },
          event.origin,
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  React.useEffect(() => {
    const isCompleted = (stepKey: string) => {
      return localStorage.getItem(`completed_${stepKey}`) === 'true';
    };
    if (router.pathname === '/login' && !isCompleted('loginSteps')) {
      setSteps(loginSteps);
      setStepName('loginSteps');
      setStepsEnabled(true);
    } else if (router.pathname === '/' && !isCompleted('landingSteps')) {
      setSteps(landingSteps);
      setStepName('landingSteps');
      setStepsEnabled(true);
    } else if (router.pathname === '/dashboard' && !isCompleted('appSteps')) {
      setTimeout(() => {
        setSteps(appSteps);
        setStepName('appSteps');
        setStepsEnabled(true);
      }, 1000);
    } else if (
      router.pathname === '/users/users-list' &&
      !isCompleted('usersSteps')
    ) {
      setTimeout(() => {
        setSteps(usersSteps);
        setStepName('usersSteps');
        setStepsEnabled(true);
      }, 1000);
    } else if (
      router.pathname === '/roles/roles-list' &&
      !isCompleted('rolesSteps')
    ) {
      setTimeout(() => {
        setSteps(rolesSteps);
        setStepName('rolesSteps');
        setStepsEnabled(true);
      }, 1000);
    } else {
      setSteps([]);
      setStepsEnabled(false);
    }
  }, [router.pathname]);

  const handleExit = () => {
    setStepsEnabled(false);
  };

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    // For full page reloads (F5, etc.)
    window.addEventListener('beforeunload', start);
    window.addEventListener('load', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
      window.removeEventListener('beforeunload', start);
      window.removeEventListener('load', end);
    };
  }, []);

  const title = 'Medoxa';
  const url = 'https://flatlogic.com/';
  const image = `https://flatlogic.com/logo.svg`;
  const imageWidth = '1920';
  const imageHeight = '960';

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta property='og:url' content={url} />
            <meta property='og:site_name' content='https://flatlogic.com/' />
            <meta property='og:title' content={title} />
            <meta property='og:image' content={image} />
            <meta property='og:image:type' content='image/png' />
            <meta property='og:image:width' content={imageWidth} />
            <meta property='og:image:height' content={imageHeight} />
            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:title' content={title} />
            <meta property='twitter:image:src' content={image} />
            <meta property='twitter:image:width' content={imageWidth} />
            <meta property='twitter:image:height' content={imageHeight} />

            <link rel='icon' href='/favicon.svg' />
          </Head>

          {loading && <UniversalLoader />}
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <IntroGuide
            steps={steps}
            stepsName={stepName}
            stepsEnabled={stepsEnabled}
            onExit={handleExit}
          />
        </>,
      )}
    </Provider>
  );
}

export default MyApp;
