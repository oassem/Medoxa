import React from 'react';
import { FooterStyle } from './designs';
import { FooterDesigns } from './designs';
import Link from 'next/link';
import { humanize } from '../../helpers/humanize';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../stores/hooks';
interface WebSiteFooterProps {
  projectName: string;
  pages: any;
}
export default function WebSiteFooter({
  projectName,
  pages,
}: WebSiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const borders = useAppSelector((state) => state.style.borders);
  const websiteHeder = useAppSelector((state) => state.style.websiteHeder);

  const style = FooterStyle.WITH_PROJECT_NAME;

  const design = FooterDesigns.DEFAULT_DESIGN;

  return (
    <div
      className={`${
        design ? `bg-black` : 'bg-blue-700 bg-opacity-25'
      } border-t ${borders}`}
    >
      <div className='container mx-auto'>
        <div
          className={`${
            design ? 'text-white ' : ' text-black '
          } flex flex-col text-center justify-between md:flex-row `}
        >
          <p className='py-6 text-sm'>
            © {currentYear} Medoxa - All rights reserved.
          </p>
          {style ? (
            <p className='py-6 font-bold'>{projectName}</p>
          ) : (
            <div className='py-6 md:py-0 flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 items-center md:space-x-4'>
              {pages.map((page, index) => {
                const isRootRoute = router.pathname === '/';
                const isActive = isRootRoute
                  ? index === 0
                  : router.pathname.includes(page.href);

                return (
                  <Link
                    key={index}
                    href={page.href}
                    className={`block text-sm text-center ${
                      isActive ? `border-b-2 ${borders}` : ''
                    }`}
                  >
                    {humanize(page.label)}
                  </Link>
                );
              })}
            </div>
          )}
          <div className='py-6'>
            <Link href={'/terms-of-use'} className='mr-4 text-sm'>
              Terms of Use
            </Link>
            <Link href={'/privacy-policy'} className=' text-sm'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
