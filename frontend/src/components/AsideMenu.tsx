import React from 'react';
import { MenuAsideItem } from '../interfaces';
import AsideMenuLayer from './AsideMenuLayer';
import OverlayLayer from './OverlayLayer';

type Props = {
  menu: MenuAsideItem[];
  isAsideMobileExpanded: boolean;
  isAsideLgActive: boolean;
  onAsideLgClose: () => void;
  isRTL?: boolean;
};

export default function AsideMenu({
  isAsideMobileExpanded = false,
  isAsideLgActive = false,
  isRTL = false,
  ...props
}: Props) {
  const sideExpanded = isRTL ? 'right-0' : 'left-0';
  const sideCollapsed = isRTL ? '-right-60 lg:right-0' : '-left-60 lg:left-0';

  return (
    <>
      <AsideMenuLayer
        menu={props.menu}
        className={`${
          isAsideMobileExpanded ? sideExpanded : sideCollapsed
        } ${!isAsideLgActive ? 'lg:hidden xl:flex' : ''}`}
        onAsideLgCloseClick={props.onAsideLgClose}
      />
      {isAsideLgActive && (
        <OverlayLayer zIndex='z-30' onClick={props.onAsideLgClose} />
      )}
    </>
  );
}
