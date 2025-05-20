import React from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import DataGridMultiSelect from '../DataGridMultiSelect';
import ListActionsPopover from '../ListActionsPopover';
import { hasPermission } from '../../helpers/userPermissions';

type Params = (id: string) => void;

export const loadColumns = async (onDelete: Params, user, t) => {
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

  const hasUpdatePermission = hasPermission(user, 'UPDATE_USERS');

  return [
    {
      field: 'firstName',
      headerName: t('users.firstName'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'lastName',
      headerName: t('users.lastName'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'phoneNumber',
      headerName: t('users.phoneNumber'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'email',
      headerName: t('users.email'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },

    {
      field: 'disabled',
      headerName: t('users.disabled'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      type: 'boolean',
    },

    {
      field: 'avatar',
      headerName: t('users.avatar'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: false,
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <ImageField
          name={'Avatar'}
          image={params?.row?.avatar}
          className='w-24 h-24 lg:w-6 lg:h-6'
        />
      ),
    },

    {
      field: 'app_role',
      headerName: t('users.appRole'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      sortable: false,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.name,
      valueOptions: await callOptionsApi('roles'),
      valueGetter: (params: GridValueGetterParams) => params?.value,
    },

    {
      field: 'custom_permissions',
      headerName: t('users.customPermissions'),
      flex: 1.5,
      minWidth: 200,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: false,
      sortable: false,
      type: 'singleSelect',
      valueFormatter: ({ value }) =>
        dataFormatter.permissionsManyListFormatter(value).join(', '),
      renderEditCell: (params) => (
        <DataGridMultiSelect {...params} entityName={'permissions'} />
      ),
    },

    {
      field: 'organizations',
      headerName: t('users.organizations'),
      flex: 1.5,
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
              pathEdit={`/users/users-edit/?id=${params?.row?.id}`}
              pathView={`/users/users-view/?id=${params?.row?.id}`}
              hasUpdatePermission={hasUpdatePermission}
            />
          </div>,
        ];
      },
    },
  ];
};
