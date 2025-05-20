import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';
import HeroSection from '../../components/WebPageComponents/HeroComponent';
import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';
import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';
import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';
import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      name: 'Patient Management',
      description:
        'Efficiently manage patient records, appointments, and medical histories. Enhance patient care with streamlined processes and easy access to information.',
      icon: 'mdiAccountCircle',
    },
    {
      name: 'Electronic Medical Records',
      description:
        'Securely store and access comprehensive patient medical records. Ensure accurate and up-to-date information for better decision-making.',
      icon: 'mdiFileDocument',
    },
    {
      name: 'Appointment Scheduling',
      description:
        'Simplify appointment booking with an intuitive interface. Reduce no-shows and improve patient satisfaction with automated reminders.',
      icon: 'mdiCalendarCheck',
    },
  ];

  const faqs = [
    {
      question: 'What is ${projectName} and who is it for?',
      answer:
        '${projectName} is a healthcare management platform designed for clinics, hospitals, and healthcare organizations in Saudi Arabia. It streamlines operations and enhances patient care.',
    },
    {
      question: 'How does ${projectName} ensure data security?',
      answer:
        '${projectName} employs strict role-based access control and data isolation per organization, ensuring that all patient and organizational data is secure and compliant with regulations.',
    },
    {
      question: 'Can ${projectName} integrate with national health APIs?',
      answer:
        'Yes, ${projectName} integrates with national health APIs like NPHIES to verify insurance eligibility and obtain pre-authorization for procedures.',
    },
    {
      question: 'Is ${projectName} available in multiple languages?',
      answer:
        'Yes, ${projectName} supports bilingual interfaces in English and Arabic, including right-to-left (RTL) support for Arabic.',
    },
    {
      question: 'How can I get started with ${projectName}?',
      answer:
        'To get started, contact our team for a demo or consultation. We will guide you through the onboarding process and help set up your organization.',
    },
    {
      question: 'Does ${projectName} offer a patient self-service portal?',
      answer:
        'Yes, ${projectName} includes a patient self-service portal where registered patients can manage appointments, view records, and update personal information.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Comprehensive Healthcare Management Platform`}</title>
        <meta
          name='description'
          content={`Explore our multi-tenant healthcare management platform designed for clinics and hospitals in Saudi Arabia. Streamline operations with patient registration, EMR, billing, and more.`}
        />
      </Head>
      <WebSiteHeader projectName={'Medoxa'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Medoxa'}
          image={['Healthcare management platform interface']}
          mainText={`Revolutionize Healthcare with ${projectName}`}
          subTitle={`Experience seamless healthcare management with ${projectName}, designed to enhance patient care and operational efficiency for clinics and hospitals in Saudi Arabia.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'Medoxa'}
          image={['Dashboard showcasing healthcare features']}
          withBg={0}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of healthcare management with ${projectName}. Streamline operations and enhance patient care effortlessly.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'Medoxa'}
          image={['Team collaborating on healthcare solutions']}
          mainText={`Empowering Healthcare with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming healthcare management in Saudi Arabia. Our platform is designed to streamline operations, enhance patient care, and ensure compliance with national standards.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <FaqSection
          projectName={'Medoxa'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Medoxa'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact form on a screen']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you promptly and efficiently.`}
        />
      </main>
      <WebSiteFooter projectName={'Medoxa'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
