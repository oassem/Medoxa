import React from 'react';
import Switch from 'react-switch';
import { useTranslation } from 'next-i18next';

export const SwitchField = ({ field, form, disabled }) => {
  const { i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const handleChange = (data: any) => {
    form.setFieldValue(field.name, data);
  };

  return (
    <div className={`${isRTL ? 'switch-wrapper' : ''}`}>
      <Switch
        checkedIcon={false}
        uncheckedIcon={false}
        className='check'
        onChange={handleChange}
        checked={!!field?.value}
        disabled={disabled}
      />
    </div>
  );
};
