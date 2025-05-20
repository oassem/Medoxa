import React, { ReactNode } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { containerMaxW } from '../config';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: ReactNode;
};

export default function FooterBar({ children }: Props) {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className={`py-2 px-6 ${containerMaxW}`}>
      <div className='block md:flex items-center justify-between'>
        <div className='text-center md:text-left mb-6 md:mb-0'>
          <b>
            {isRTL
              ? `${t('pages.login.footer.copyright')} ${year} ©`
              : `© ${year} ${t('pages.login.footer.copyright')}`}
          </b>
          {` `}
          {children}
        </div>

        <div className='flex item-center md:py-2 gap-4'>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
