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
  t: any,
  dir: string,
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

  const hasUpdatePermission = hasPermission(user, 'UPDATE_PATIENT_DOCUMENTS');

  return [
    {
      field: 'patient',
      headerName: t('patient_documents.patient'),
      flex: 1,
      minWidth: 120,
      filterable: false,
      headerClassName: 'datagrid--header',
      cellClassName: 'datagrid--cell',
      editable: hasUpdatePermission,
      sortable: false,
      type: 'singleSelect',
      getOptionValue: (value: any) => value?.id,
      getOptionLabel: (value: any) =>
        dir === 'rtl' ? value?.label_ar : value?.label,
      valueOptions: await callOptionsApi('patients'),
      valueGetter: (params: GridValueGetterParams) =>
        params?.value?.id ?? params?.value,
    },

    {
      field: 'document_type',
      headerName: t('patient_documents.document_type'),
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
              pathEdit={`/patient_documents/patient_documents-edit/?id=${params?.row?.id}`}
              pathView={`/patient_documents/patient_documents-view/?id=${params?.row?.id}`}
              hasUpdatePermission={hasUpdatePermission}
            />
          </div>,
        ];
      },
    },
  ];
};
