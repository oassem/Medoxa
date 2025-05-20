import React, { useEffect, useState } from 'react';
import { getMultiplePexelsImages } from '../../../../helpers/pexels';
import { useAppSelector } from '../../../../stores/hooks';
import BaseButton from '../../../BaseButton';

const ImageRight = ({
  projectName,
  mainText,
  subTitle,
  imageAbout,
  buttonText,
  corners,
  textSecondary,
}) => {
  return (
    <div className='container p-16 lg:py-24 lg:px-0 mx-auto'>
      <div className='flex flex-col md:flex-row items-center py-8 md:gap-16'>
        <div className='md:w-1/2'>
          <h1 className='text-3xl font-bold mb-4'>{mainText}</h1>
          <p className={`mb-4 ${textSecondary}`}> {subTitle}</p>
          <BaseButton
            href='/login'
            label={`${buttonText}`}
            color='info'
            className='px-4 sm:px-6 py-2 '
          />
        </div>

        <div className='md:w-1/2 mt-6 md:mt-0'>
          <img
            src={`${imageAbout[0]?.src}`}
            alt='Hero'
            className={`w-full h-48 sm:h-auto sm:max-h-96 object-cover ${
              corners !== 'rounded-full' ? corners : 'rounded-3xl'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageRight;
