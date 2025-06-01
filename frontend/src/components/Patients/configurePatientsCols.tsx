import React from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import ListActionsPopover from '../ListActionsPopover';
import { hasPermission } from '../../helpers/userPermissions';

type Params = (id: string) => void;

export const loadColumns = async (
  onDelete: Params,
  entityName: string,
  user,
  t: (key: string) => string,
) => {
  async function callOptionsApi(entityName: string) {
    if (!hasPermission(user, 'READ_' + entityName.toUpperCase())) return [];

    try {
      const data = await axiosInstance(`/${entityName}/autocomplete?limit=100`);
      return data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const hasUpdatePermission = hasPermission(user, 'UPDATE_PATIENTS');

  return [
    {
      field: 'organization',
      headerName: t('patients.organization'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      sortable: false,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('organizations'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'full_name_en',
      headerName: t('patients.full_name_en'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'full_name_ar',
      headerName: t('patients.full_name_ar'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'phone',
      headerName: t('patients.phone'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'email',
      headerName: t('patients.email'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'date_of_birth',
      headerName: t('patients.date_of_birth'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      type: 'date',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.date_of_birth ? new Date(params.row.date_of_birth) : null,
    },

    {
      field: 'gender',
      headerName: t('patients.gender'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      type: 'singleSelect',
      getOptionValue: (option) => option.value,
      getOptionLabel: (option) => option.label,
      valueOptions: [
        { value: 'Male', label: t('patients.male') },
        { value: 'Female', label: t('patients.female') },
      ],
      //renderCell: (params) => t(`patients.${params.value?.toLowerCase?.()}`),
    },

    {
      field: 'nationality',
      headerName: t('patients.nationality'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'identifier_type',
      headerName: t('patients.identifier_type'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      type: 'singleSelect',
      getOptionValue: (option) => option.value,
      getOptionLabel: (option) => option.label,
      valueOptions: [
        { value: 'National ID', label: t('patients.national_id') },
        { value: 'Iqama', label: t('patients.iqama') },
        { value: 'Passport', label: t('patients.passport') },
      ],
      //renderCell: (params) =>
      //  t(`patients.${params.value?.replace(/\s+/g, '_').toLowerCase?.()}`),
    },

    {
      field: 'identifier',
      headerName: t('patients.identifier'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'address',
      headerName: t('patients.address'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'emergency_contact_name',
      headerName: t('patients.emergency_contact_name'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'emergency_contact_phone',
      headerName: t('patients.emergency_contact_phone'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'medical_history',
      headerName: t('patients.medical_history'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'allergies',
      headerName: t('patients.allergies'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'current_medications',
      headerName: t('patients.current_medications'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'family_history',
      headerName: t('patients.family_history'),
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'actions',
      type: 'actions',
      minWidth: 30,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      getActions: (params: GridRowParams) => {
        return [
          <div key={params?.row?.id}>
            <ListActionsPopover
              onDelete={onDelete}
              itemId={params?.row?.id}
              pathEdit={`/patients/patients-edit/?id=${params?.row?.id}`}
              pathView={`/patients/patients-view/?id=${params?.row?.id}`}
              hasUpdatePermission={hasUpdatePermission}
            />
          </div>,
        ];
      },
    },
  ];
};
