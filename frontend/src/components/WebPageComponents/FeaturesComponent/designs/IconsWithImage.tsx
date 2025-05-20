import React from 'react';
import BaseIcon from '../../../BaseIcon';
import * as icon from '@mdi/js';

const IconsWithImage = ({
  features,
  projectName,
  withBg,
  iconsColor,
  mainText,
  subTitle,
  image,
  textSecondary,
  websiteSectionStyle,
  corners,
}) => {
  const displayedFeatures = features.slice(0, 4);

  return (
    <div className={``}>
      <div className='container mx-auto p-8 lg:px-0 py-24'>
        <div className='flex flex-wrap lg:gap-16'>
          <div className='w-full md:w-5/12 mb-8 md:mb-0 '>
            <img
              src={`${image[0]?.src}`}
              alt='Hero'
              className={`w-full h-48 sm:h-full object-cover ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              }`}
            />
          </div>

          <div className='w-full md:w-6/12 flex flex-col justify-center '>
            <div className='space-y-12'>
              {displayedFeatures.map((feature, index) => (
                <div key={index} className='flex items-start'>
                  <div className='flex-shrink-0 mr-4'>
                    <BaseIcon
                      className={` mr-2 ${iconsColor}`}
                      w='w-12'
                      h='h-12'
                      size={48}
                      path={
                        icon[feature.icon] ? icon[feature.icon] : icon.mdiLeaf
                      }
                    />
                  </div>

                  {/* Текст */}
                  <div>
                    <h4 className='text-xl font-medium'>
                      {feature.name.replace(/\${projectName}/g, projectName)}
                    </h4>
                    <p className={`mt-2 `}>
                      {feature.description.replace(
                        /\${projectName}/g,
                        projectName,
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconsWithImage;
