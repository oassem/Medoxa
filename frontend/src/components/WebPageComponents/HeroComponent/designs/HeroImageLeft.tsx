import React from 'react';
import BaseButton from '../../../BaseButton';

const HeroImageLeft = ({
  mainText,
  subTitle,
  buttonText,
  imageHero,
  textSecondary,
}) => (
  <div className='flex flex-col lg:flex-row pb-24 h-auto lg:h-screen'>
    <div className='flex-1 flex items-center justify-center order-last lg:order-first p-4 sm:p-8'>
      <div className='text-center lg:ml-16 lg:text-left'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4'>
          {mainText}
        </h1>
        <div className='space-y-3 mb-8'>
          <p className={`text-sm ${textSecondary}`}>{subTitle}</p>
        </div>
        <BaseButton
          href='/login'
          label={`${buttonText}`}
          color='info'
          className=' px-4 sm:px-6 py-2 '
        />
      </div>
    </div>
    <div className='flex-1 lg:w-2/5 order-first lg:order-last'>
      <img
        src={`${imageHero[0]?.src}`}
        alt='Hero'
        className='w-full h-64 sm:h-full object-cover'
      />
    </div>
  </div>
);

export default HeroImageLeft;
