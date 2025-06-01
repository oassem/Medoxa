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
  t: (key: string) => string
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

  const hasUpdatePermission = hasPermission(user, 'UPDATE_APPOINTMENT_RULES');

  return [
    {
      field: 'department',
      headerName: t('appointmentRules.department'),
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      sortable: false,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) => value?.label,
      valueOptions: await callOptionsApi('departments'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
      align: 'left' as const,
      headerAlign: 'left' as const,
    },

    {
      field: 'min_hours_before_booking',
      headerName: t('appointmentRules.minHoursBeforeBooking'),
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      type: 'number',
      align: 'left' as const,
      headerAlign: 'left' as const,
    },

    {
      field: 'max_days_advance_booking',
      headerName: t('appointmentRules.maxDaysAdvanceBooking'),
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      type: 'number',
      align: 'left' as const,
      headerAlign: 'left' as const,
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
              pathEdit={`/appointment_rules/appointment_rules-edit/?id=${params?.row?.id}`}
              pathView={`/appointment_rules/appointment_rules-view/?id=${params?.row?.id}`}
              hasUpdatePermission={hasUpdatePermission}
            />
          </div>,
        ];
      },
    },
  ];
};
