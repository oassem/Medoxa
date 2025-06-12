import React, { useEffect, useId, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../stores/hooks';
import axiosInstance from '../utils/axiosInstance';

export const SelectField = ({
  options,
  field,
  form,
  itemRef,
  showField,
  disabled,
  onChange,
}) => {
  const { i18n, t } = useTranslation();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [value, setValue] = useState(null);
  const PAGE_SIZE = 100;

  useEffect(() => {
    if (options?.id && field?.value?.id) {
      setValue({ value: field.value?.id, label: field.value[showField] });
      form.setFieldValue(field.name, field.value?.id);
    } else if (!field.value) {
      setValue(null);
    }
  }, [options?.id, field?.value?.id, field?.value]);

  const mapResponseToValuesAndLabels = (data) => ({
    value: data.id,
    label: i18n.language === 'ar' && data.label_ar ? data.label_ar : data.label,
  });

  const handleChange = (option) => {
    const newValue = option?.value || null;
    form.setFieldValue(field.name, newValue);
    setValue(option);

    if (onChange) {
      onChange(newValue);
    }
  };

  async function callApi(inputValue: string, loadedOptions: any[]) {
    const path = `/${itemRef}/autocomplete?limit=${PAGE_SIZE}&offset=${
      loadedOptions.length
    }${inputValue ? `&query=${inputValue}` : ''}`;
    const { data } = await axiosInstance(path);

    let filteredData = data;
    if (itemRef === 'roles' && currentUser?.app_role?.globalAccess) {
      // Only show roles with 'admin' in their label
      filteredData = data.filter((role) =>
        role.label?.toLowerCase().includes('admin'),
      );
    }

    return {
      options: filteredData.map(mapResponseToValuesAndLabels),
      hasMore: filteredData.length === PAGE_SIZE,
    };
  }

  return (
    <AsyncPaginate
      classNames={{
        control: () => 'px-1 py-2',
      }}
      classNamePrefix='react-select'
      instanceId={useId()}
      value={value}
      debounceTimeout={1000}
      loadOptions={callApi}
      onChange={handleChange}
      defaultOptions
      isDisabled={disabled}
      isClearable
      placeholder={t('actions.select')}
    />
  );
};
