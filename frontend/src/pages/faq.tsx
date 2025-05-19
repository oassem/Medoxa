import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and who can use it?',
      answer:
        '${projectName} is a healthcare management platform designed for clinics, hospitals, and healthcare organizations in Saudi Arabia. It is suitable for healthcare professionals, administrators, and patients.',
    },
    {
      question: 'How does ${projectName} ensure data security?',
      answer:
        '${projectName} uses advanced encryption and role-based access control to protect sensitive data. Each organization has isolated data to ensure privacy and compliance with regulations.',
    },
    {
      question: 'Can I integrate ${projectName} with other systems?',
      answer:
        'Yes, ${projectName} supports integration with national health APIs like NPHIES, as well as other third-party systems for seamless data exchange and enhanced functionality.',
    },
    {
      question: 'Is ${projectName} available in multiple languages?',
      answer:
        'Yes, ${projectName} offers a bilingual interface in English and Arabic, including right-to-left (RTL) support for Arabic users.',
    },
    {
      question: 'How can I get started with ${projectName}?',
      answer:
        'To get started, contact our team for a demo or consultation. We will guide you through the onboarding process and help set up your organization.',
    },
    {
      question: 'Does ${projectName} offer customer support?',
      answer:
        'Yes, our dedicated support team is available to assist you with any questions or issues. You can reach out to us via email or through the contact form on our website.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our services, features, and how we can assist you in healthcare management.`}
        />
      </Head>
      <WebSiteHeader projectName={'Medoxa'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Medoxa'}
          image={['Person reading FAQ on tablet']}
          mainText={`Your Questions Answered by ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to common questions about ${projectName}. Learn how our platform can enhance your healthcare management experience.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Medoxa'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Medoxa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
