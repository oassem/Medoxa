import React, { ReactNode } from 'react';
import { useAppSelector } from '../stores/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: ReactNode;
};

export default function LayoutGuest({ children }: Props) {
  const darkMode = useAppSelector((state) => state.style.darkMode);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const { i18n } = useTranslation('common');
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (i18n.isInitialized) setReady(true);
    else i18n.on('initialized', () => setReady(true));
  }, [i18n]);

  if (!ready) return null;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`${bgColor} dark:bg-slate-800 dark:text-slate-100`}>
        {children}
      </div>
    </div>
  );
}
