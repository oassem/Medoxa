// src/components/WebPageComponents/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { getMultiplePexelsImages } from '../../../helpers/pexels';
import { useAppSelector } from '../../../stores/hooks';
import { HeroDesigns } from '../designs';
import HeroImageLeft from './designs/HeroImageLeft';
import HeroImageRight from './designs/HeroImageRight';
import HeroImageBg from './designs/HeroImageBg';
import HeroTextCenter from './designs/HeroTextCenter';

export default function HeroSection({
  image,
  mainText,
  subTitle,
  design,
  buttonText,
}) {
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const [imageHero, setImages] = useState([]);
  const pexelsQueriesWebSite = image;

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchImages = async () => {
        try {
          const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
          const formattedImages = (images || []).map((image) => ({
            src: image?.src || undefined,
            photographer: image?.photographer || undefined,
            photographer_url: image?.photographer_url || undefined,
          }));
          setImages(formattedImages);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
      fetchImages();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pexelsQueriesWebSite, design]);

  let DesignComponent;

  switch (design) {
    case HeroDesigns.IMAGE_LEFT:
      DesignComponent = HeroImageLeft;
      break;
    case HeroDesigns.IMAGE_RIGHT:
      DesignComponent = HeroImageRight;
      break;
    case HeroDesigns.IMAGE_BG:
      DesignComponent = HeroImageBg;
      break;
    case HeroDesigns.TEXT_CENTER:
      DesignComponent = HeroTextCenter;
      break;
    default:
      DesignComponent = HeroImageRight;
      break;
  }

  return (
    <DesignComponent
      mainText={mainText}
      subTitle={subTitle}
      buttonText={buttonText}
      imageHero={imageHero}
      textSecondary={textSecondary}
    />
  );
}
