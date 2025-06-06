import React from 'react';
import ListActionsPopover from '../ListActionsPopover';
import { GridRowParams } from '@mui/x-data-grid';
import { hasPermission } from '../../helpers/userPermissions';

type Params = (id: string) => void;

export const loadColumns = async (
  onDelete: Params,
  entityName: string,
  user,
) => {
  const hasUpdatePermission = hasPermission(user, 'UPDATE_ORGANIZATIONS');

  return [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 120,
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
              pathEdit={`/organizations/organizations-edit/?id=${params?.row?.id}`}
              pathView={`/organizations/organizations-view/?id=${params?.row?.id}`}
              hasUpdatePermission={hasUpdatePermission}
            />
          </div>,
        ];
      },
    },
  ];
};
