import { mdiAccount, mdiLogout, mdiThemeLightDark } from '@mdi/js';
import { MenuNavBarItem } from './interfaces';

// Export a function that takes the translation function `t`
export function getMenuNavBar(
  t: (key: string) => string,
  isRTL = false,
): MenuNavBarItem[] {
  return [
    {
      isCurrentUser: true,
      menu: [
        {
          icon: mdiAccount,
          label: t('navbar.profile'),
          href: '/profile',
        },
        {
          isDivider: true,
        },
        {
          icon: mdiLogout,
          label: t('navbar.logout'),
          isLogout: true,
        },
      ],
    },
    {
      icon: mdiThemeLightDark,
      label: t('navbar.theme'),
      isDesktopNoLabel: true,
      isToggleLightDark: true,
    },
    {
      icon: mdiLogout,
      label: t('navbar.logout'),
      isDesktopNoLabel: true,
      isLogout: true,
      flipIconRTL: isRTL,
    },
  ];
}
