import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      name: 'Bilingual Interface',
      description:
        'Seamlessly switch between English and Arabic interfaces, ensuring accessibility and ease of use for all healthcare professionals and patients.',
      icon: 'mdiTranslate',
    },
    {
      name: 'AI-Powered Voice-to-Text',
      description:
        'Leverage AI technology to convert voice recordings into structured text, streamlining documentation and improving accuracy in medical records.',
      icon: 'mdiMicrophone',
    },
    {
      name: 'Secure Data Management',
      description:
        'Ensure patient data security with robust role-based access control and data isolation, providing peace of mind for healthcare providers.',
      icon: 'mdiLock',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Learn more about ${projectName}, our mission, values, and the team dedicated to transforming healthcare management in Saudi Arabia.`}
        />
      </Head>
      <WebSiteHeader projectName={'Medoxa'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Medoxa'}
          image={['Team collaborating in modern office']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`At ${projectName}, we are committed to revolutionizing healthcare management. Our mission is to provide innovative solutions that enhance patient care and streamline operations for healthcare providers in Saudi Arabia.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Meet Our Team`}
        />

        <AboutUsSection
          projectName={'Medoxa'}
          image={['Team brainstorming innovative solutions']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`${projectName} is driven by a passion for innovation in healthcare. Our team is dedicated to creating solutions that empower healthcare providers and improve patient outcomes across Saudi Arabia.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn Our Story`}
        />

        <FeaturesSection
          projectName={'Medoxa'}
          image={['Icons representing key features']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover how ${projectName} transforms healthcare management with innovative features designed to enhance efficiency and patient care.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <ContactFormSection
          projectName={'Medoxa'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Contact form on a tablet']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Reach out to us for any inquiries or support. Our team at ${projectName} is ready to assist you promptly and efficiently.`}
        />
      </main>
      <WebSiteFooter projectName={'Medoxa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
