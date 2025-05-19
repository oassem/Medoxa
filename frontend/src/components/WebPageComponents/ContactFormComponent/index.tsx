// src/components/WebPageComponents/ContactFormSection.tsx
import React, { useEffect, useState } from 'react';
import { getMultiplePexelsImages } from '../../../helpers/pexels';
import { useAppSelector } from '../../../stores/hooks';
import { ContactFormDesigns } from '../designs';
import SimpleAndCleanForm from './designs/SimpleAndCleanForm';
import HighlightedForm from './designs/HighlightedForm';
import FormWithImage from './designs/FormWithImage';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactFormSection({
  projectName,
  withBg = 0,
  mainText,
  subTitle,
  design,
  image,
}) {
  const [imageContactForm, setImages] = useState([]);
  const pexelsQueriesWebSite = image;
  const textSecondary = useAppSelector((state) => state.style.textSecondary);

  useEffect(() => {
    const fetchImages = async () => {
      if (design === ContactFormDesigns.WITH_IMAGE) {
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
      }
    };

    fetchImages();
  }, [pexelsQueriesWebSite, design]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axiosInstance.post('/contact-form/send', values);
      toast.success('Your message has been sent successfully!');
      resetForm();
    } catch (error) {
      toast.error('There was an error sending your message');
    } finally {
      setSubmitting(false);
    }
  };

  let DesignComponent;

  switch (design) {
    case ContactFormDesigns.SIMPLE_CLEAN:
    case ContactFormDesigns.SIMPLE_CLEAN_DIVERSITY:
      DesignComponent = SimpleAndCleanForm;
      break;
    case ContactFormDesigns.HIGHLIGHTED:
    case ContactFormDesigns.HIGHLIGHTED_DIVERSITY:
      DesignComponent = HighlightedForm;
      break;
    case ContactFormDesigns.WITH_IMAGE:
      DesignComponent = FormWithImage;
      break;
    default:
      DesignComponent = SimpleAndCleanForm;
      break;
  }

  return (
    <div>
      <DesignComponent
        mainText={mainText}
        subTitle={subTitle}
        onSubmit={handleSubmit}
        imageContactForm={imageContactForm}
        textSecondary={textSecondary}
        design={design}
      />
      <ToastContainer />
    </div>
  );
}
