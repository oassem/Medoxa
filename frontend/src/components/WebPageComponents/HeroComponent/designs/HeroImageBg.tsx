import React from 'react';
import BaseButton from '../../../BaseButton';

const HeroImageBg = ({
  mainText,
  subTitle,
  buttonText,
  imageHero,
  textSecondary,
}) => (
  <div
    className='relative w-full h-screen flex items-center justify-center text-center mb-24  bg-cover bg-center'
    style={{
      backgroundImage: `url(${imageHero[0]?.src})`,
    }}
  >
    <div className='absolute inset-0 bg-black opacity-50'></div>
    <div className='relative container z-10 p-8 md:p-16 text-white'>
      <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4'>
        {mainText}
      </h1>
      <p className={`text-sm mb-8`}>{subTitle}</p>
      <BaseButton
        href='/login'
        label={`${buttonText}`}
        color='info'
        className='px-4 sm:px-6 py-2 '
      />
    </div>
  </div>
);

export default HeroImageBg;
