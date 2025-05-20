import React from 'react';
import { Formik, Form, Field } from 'formik';
import BaseButton from '../../../BaseButton';
import FormField from '../../../../components/FormField';
import { useAppSelector, useAppDispatch } from '../../../../stores/hooks';

const FormWithImage = ({ mainText, subTitle, onSubmit, imageContactForm }) => {
  const corners = useAppSelector((state) => state.style.corners);
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  return (
    <div className=' '>
      <div className={` `}>
        <div className=' grid grid-cols-1 md:grid-cols-2'>
          <div className='w-full h-full hidden md:block'>
            <img
              src={`${imageContactForm[0]?.src}`}
              alt='Contact Us'
              className=' object-cover '
            />
          </div>

          <div className='flex items-center justify-center'>
            <div className='p-8'>
              <h2 className='text-3xl font-bold mb-6'>{mainText}</h2>
              <p className={`text-base mb-8 ${textSecondary}`}>{subTitle}</p>

              <Formik
                initialValues={{
                  email: '',
                  subject: '',
                  message: '',
                }}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className='space-y-6'>
                    <FormField websiteBg>
                      <Field
                        name='email'
                        type='email'
                        placeholder='Name'
                        required
                        className=''
                      />
                    </FormField>

                    <FormField websiteBg>
                      <Field
                        name='subject'
                        type='text'
                        placeholder='Subject'
                        required
                        className=''
                      />
                    </FormField>

                    <FormField websiteBg>
                      <Field
                        name='message'
                        as='textarea'
                        placeholder='Message'
                        required
                        className=''
                      />
                    </FormField>

                    <BaseButton
                      className='w-1/2 md:w-1/4 '
                      type='submit'
                      color='info'
                      label={isSubmitting ? 'Sending...' : 'Contact Us'}
                      disabled={isSubmitting}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormWithImage;
