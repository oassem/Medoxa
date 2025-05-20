import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js';
import menuAside from '../menuAside';
import { getMenuNavBar } from '../menuNavBar';
import BaseIcon from '../components/BaseIcon';
import NavBar from '../components/NavBar';
import NavBarItemPlain from '../components/NavBarItemPlain';
import AsideMenu from '../components/AsideMenu';
import FooterBar from '../components/FooterBar';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import Search from '../components/Search';
import { useRouter } from 'next/router';
import { findMe, logoutUser } from '../stores/authSlice';
import { useTranslation } from 'react-i18next';
import { hasPermission } from '../helpers/userPermissions';

type Props = {
  children?: ReactNode;
  permission?: string;
};

export default function LayoutAuthenticated({ children, permission }: Props) {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token, currentUser } = useAppSelector((state) => state.auth);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const [localToken, setLocalToken] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLocalToken(token);
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    dispatch(findMe());
    if (!isTokenValid()) {
      dispatch(logoutUser());
      router.push('/login');
    }
  }, [token, localToken, hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    if (!permission || !currentUser) return;
    if (!hasPermission(currentUser, permission)) router.push('/error');
  }, [currentUser, permission, hasMounted]);

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data) return;
    return date < data.exp;
  };

  const darkMode = useAppSelector((state) => state.style.darkMode);
  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false);
      setIsAsideLgActive(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events, dispatch]);

  const layoutAsidePadding = isRTL ? 'xl:pr-60' : 'xl:pl-60';
  const asideMargin = isRTL ? 'mr-60 lg:mr-0' : 'ml-60 lg:ml-0';
  const menuNavBar = getMenuNavBar(t, isRTL);

  if (!hasMounted) return null;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${darkMode ? 'dark' : ''} ${isRTL ? 'rtl' : ''} overflow-hidden lg:overflow-visible`}
    >
      <div
        className={`${layoutAsidePadding} ${
          isAsideMobileExpanded ? asideMargin : ''
        } pt-14 min-h-screen w-screen transition-position lg:w-auto ${bgColor}  dark:bg-dark-800 dark:text-slate-100`}
      >
        <NavBar
          menu={menuNavBar}
          className={`${layoutAsidePadding} ${
            isAsideMobileExpanded ? asideMargin : ''
          }`}
        >
          <NavBarItemPlain
            display='flex lg:hidden'
            onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
          >
            <BaseIcon
              path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger}
              size='24'
            />
          </NavBarItemPlain>
          <NavBarItemPlain
            display='hidden lg:flex xl:hidden'
            onClick={() => setIsAsideLgActive(true)}
          >
            <BaseIcon path={mdiMenu} size='24' />
          </NavBarItemPlain>
          <NavBarItemPlain useMargin>
            <Search />
          </NavBarItemPlain>
        </NavBar>
        <AsideMenu
          isAsideMobileExpanded={isAsideMobileExpanded}
          isAsideLgActive={isAsideLgActive}
          menu={menuAside}
          onAsideLgClose={() => setIsAsideLgActive(false)}
          isRTL={isRTL}
        />
        {children}
        <FooterBar />
      </div>
    </div>
  );
}
