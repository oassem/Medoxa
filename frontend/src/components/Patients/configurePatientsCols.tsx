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
      headerName: 'Organization',
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
      headerName: 'Full Name (English)',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'full_name_ar',
      headerName: 'Full Name (Arabic)',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'date_of_birth',
      headerName: 'Date of Birth',
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
      headerName: 'Gender',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'nationality',
      headerName: 'Nationality',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'identifier_type',
      headerName: 'Identifier Type',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'identifier',
      headerName: 'Identifier Number',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'emergency_contact_name',
      headerName: 'Emergency Contact Name',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'emergency_contact_phone',
      headerName: 'Emergency Contact Phone',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'medical_history',
      headerName: 'Medical History',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'allergies',
      headerName: 'Allergies',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'current_medications',
      headerName: 'Current Medications',
      flex: 1,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'family_history',
      headerName: 'Family History',
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
