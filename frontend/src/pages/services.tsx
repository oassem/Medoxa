import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FeaturesDesigns,
} from '../components/WebPageComponents/designs';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

export default function WebSite() {
  const projectName = 'Medoxa';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Patient Registration',
      description:
        'Streamline the patient registration process with easy-to-use forms and automated data entry, ensuring accurate and efficient onboarding.',
      icon: 'mdiAccountPlus',
    },
    {
      name: 'Appointment Management',
      description:
        'Effortlessly schedule, reschedule, and manage appointments with a user-friendly interface, reducing no-shows and improving patient satisfaction.',
      icon: 'mdiCalendarClock',
    },
    {
      name: 'Billing \u0026 Insurance',
      description:
        'Simplify billing processes and insurance claims with integrated tools that ensure accuracy and compliance with national standards.',
      icon: 'mdiCashRegister',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the comprehensive services offered by ${projectName}, designed to streamline healthcare management and enhance patient care in Saudi Arabia.`}
        />
      </Head>
      <WebSiteHeader projectName={'Medoxa'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Medoxa'}
          image={['Healthcare professionals collaborating']}
          mainText={`Transform Healthcare with ${projectName} Services`}
          subTitle={`Discover the range of services offered by ${projectName} to streamline healthcare operations and enhance patient care. Our solutions are tailored to meet the unique needs of healthcare providers in Saudi Arabia.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'Medoxa'}
          image={['Icons representing various services']}
          withBg={1}
          features={features_points}
          mainText={`Comprehensive Services by ${projectName}`}
          subTitle={`Explore the diverse range of services offered by ${projectName} to enhance healthcare management and patient care.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <ContactFormSection
          projectName={'Medoxa'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact form on a laptop']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`For inquiries or support, contact us anytime. Our team at ${projectName} is here to assist you with any questions or concerns.`}
        />
      </main>
      <WebSiteFooter projectName={'Medoxa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
