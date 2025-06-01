import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import BaseButton from '../BaseButton';
import CardBoxModal from '../CardBoxModal';
import CardBox from '../CardBox';
import {
  fetch,
  update,
  deleteItem,
  setRefetch,
  deleteItemsByIds,
} from '../../stores/appointment_rules/appointment_rulesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { Field, Form, Formik } from 'formik';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { loadColumns } from './configureAppointment_rulesCols';
import _ from 'lodash';
import dataFormatter from '../../helpers/dataFormatter';
import { dataGridStyles } from '../../styles';
import { useTranslation } from 'react-i18next';
import ListAppointment_rules from './ListAppointment_rules';
import { dataGridStyles_ar } from '../../styles_ar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const perPage = 10;

const TableSampleAppointment_rules = ({
  filterItems,
  setFilterItems,
  filters,
  showGrid,
}) => {
  const notify = (type, msgKey) =>
    toast(t(msgKey), { type, position: 'bottom-center' });
  const dispatch = useAppDispatch();
  const pagesList = [];
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterRequest, setFilterRequest] = React.useState('');
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: '',
      sort: 'desc',
    },
  ]);

  const {
    appointment_rules,
    loading,
    count,
    notify: appointment_rulesNotify,
    refetch,
  } = useAppSelector((state) => state.appointment_rules);
  const { currentUser } = useAppSelector((state) => state.auth);
  const focusRing = useAppSelector((state) => state.style.focusRingColor);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const corners = useAppSelector((state) => state.style.corners);
  const numPages =
    Math.floor(count / perPage) === 0 ? 1 : Math.ceil(count / perPage);
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i);
  }

  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const loadData = async (page = currentPage, request = filterRequest) => {
    if (page !== currentPage) setCurrentPage(page);
    if (request !== filterRequest) setFilterRequest(request);
    const { sort, field } = sortModel[0];

    const query = `?page=${page}&limit=${perPage}${request}&sort=${sort}&field=${field}`;
    dispatch(fetch({ limit: perPage, page, query }));
  };

  useEffect(() => {
    if (appointment_rulesNotify.showNotification) {
      notify(
        appointment_rulesNotify.typeNotification,
        appointment_rulesNotify.textNotification,
      );
    }
  }, [appointment_rulesNotify.showNotification]);

  useEffect(() => {
    if (!currentUser) return;
    loadData();
  }, [sortModel, currentUser]);

  useEffect(() => {
    if (refetch) {
      loadData(0);
      dispatch(setRefetch(false));
    }
  }, [refetch, dispatch]);

  const [isModalInfoActive, setIsModalInfoActive] = useState(false);
  const [isModalTrashActive, setIsModalTrashActive] = useState(false);

  const handleModalAction = () => {
    setIsModalInfoActive(false);
    setIsModalTrashActive(false);
  };

  const handleDeleteModalAction = (id: string) => {
    setId(id);
    setIsModalTrashActive(true);
  };

  const handleDeleteAction = async () => {
    if (id) {
      await dispatch(deleteItem(id));
      await loadData(0);
      setIsModalTrashActive(false);
    }
  };

  const generateFilterRequests = useMemo(() => {
    let request = '&';
    filterItems.forEach((item) => {
      const isRangeFilter = filters.find(
        (filter) =>
          filter.title === item.fields.selectedField &&
          (filter.number || filter.date),
      );

      if (isRangeFilter) {
        const from = item.fields.filterValueFrom;
        const to = item.fields.filterValueTo;
        if (from) {
          request += `${item.fields.selectedField}Range=${from}&`;
        }
        if (to) {
          request += `${item.fields.selectedField}Range=${to}&`;
        }
      } else {
        const value = item.fields.filterValue;
        if (value) {
          request += `${item.fields.selectedField}=${value}&`;
        }
      }
    });
    return request;
  }, [filterItems, filters]);

  const deleteFilter = (value) => {
    const newItems = filterItems.filter((item) => item.id !== value);

    if (newItems.length) {
      setFilterItems(newItems);
    } else {
      loadData(0, '');
      setFilterItems(newItems);
    }
  };

  const handleSubmit = () => {
    loadData(0, generateFilterRequests);
  };

  const handleChange = (id) => (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFilterItems(
      filterItems.map((item) => {
        if (item.id !== id) return item;
        if (name === 'selectedField') return { id, fields: { [name]: value } };
        return { id, fields: { ...item.fields, [name]: value } };
      }),
    );
  };

  const handleReset = () => {
    setFilterItems([]);
    loadData(0, '');
  };

  const onPageChange = (page: number) => {
    loadData(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!currentUser) return;

    loadColumns(
      handleDeleteModalAction,
      `appointment_rules`,
      currentUser,
      t,
    ).then((newCols) => setColumns(newCols));
  }, [currentUser, t]);

  const handleTableSubmit = async (id: string, data) => {
    if (!_.isEmpty(data)) {
      await dispatch(update({ id, data }))
        .unwrap()
        .then((res) => res)
        .catch((err) => {
          throw new Error(err);
        });
    }
  };

  const onDeleteRows = async (selectedRows) => {
    await dispatch(deleteItemsByIds(selectedRows));
    await loadData(0);
  };

  const controlClasses =
    'w-full py-2 px-2 my-2   rounded dark:placeholder-gray-400 ' +
    ` ${bgColor} ${focusRing} ${corners} ` +
    'dark:bg-slate-800 border';

  const theme = useMemo(
    () =>
      createTheme({
        direction: isRTL ? 'rtl' : 'ltr',
      }),
    [isRTL],
  );

  const dataGrid = (
    <ThemeProvider theme={theme}>
      <div className='relative overflow-x-auto' dir={isRTL ? 'rtl' : 'ltr'}>
        <DataGrid
          autoHeight
          rowHeight={64}
          sx={isRTL ? dataGridStyles_ar : dataGridStyles}
          className={'datagrid--table'}
          getRowClassName={() => `datagrid--row`}
          rows={appointment_rules ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          onProcessRowUpdateError={(params) => {
            console.log('Error', params);
          }}
          processRowUpdate={async (newRow, oldRow) => {
            const data = dataFormatter.dataGridEditFormatter(newRow);

            try {
              await handleTableSubmit(newRow.id, data);
              return newRow;
            } catch {
              return oldRow;
            }
          }}
          sortingMode={'server'}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            setSelectedRows(ids);
          }}
          onSortModelChange={(params) => {
            params.length
              ? setSortModel(params)
              : setSortModel([{ field: '', sort: 'desc' }]);
          }}
          rowCount={count}
          pageSizeOptions={[10]}
          paginationMode={'server'}
          loading={loading}
          onPaginationModelChange={(params) => {
            onPageChange(params.page);
          }}
          disableColumnMenu
        />
      </div>
    </ThemeProvider>
  );

  return (
    <>
      {filterItems && Array.isArray(filterItems) && filterItems.length ? (
        <CardBox>
          <Formik
            initialValues={{
              checkboxes: ['lorem'],
              switches: ['lorem'],
              radio: 'lorem',
            }}
            onSubmit={() => null}
          >
            <Form>
              <div dir={isRTL ? 'rtl' : 'ltr'}>
                {filterItems &&
                  filterItems.map((filterItem) => {
                    return (
                      <div key={filterItem.id} className='flex mb-4'>
                        <div className='flex flex-col w-full mr-3 rtl:ml-3 rtl:mr-0'>
                          <div className='text-gray-500 font-bold'>
                            {t('appointmentRules.filter')}
                          </div>
                          <Field
                            className={`${controlClasses} filter-select`}
                            name='selectedField'
                            id='selectedField'
                            component='select'
                            value={filterItem?.fields?.selectedField || ''}
                            onChange={handleChange(filterItem.id)}
                          >
                            {filters.map((selectOption) => (
                              <option
                                key={selectOption.title}
                                value={`${selectOption.title}`}
                              >
                                {selectOption.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                        {filters.find(
                          (filter) =>
                            filter.title === filterItem?.fields?.selectedField,
                        )?.type === 'enum' ? (
                          <div className='flex flex-col w-full mr-3 rtl:ml-3 rtl:mr-0'>
                            <div className='text-gray-500 font-bold'>
                              {t('appointmentRules.value')}
                            </div>
                            <Field
                              className={controlClasses}
                              name='filterValue'
                              id='filterValue'
                              component='select'
                              value={filterItem?.fields?.filterValue || ''}
                              onChange={handleChange(filterItem.id)}
                            >
                              <option value=''>Select Value</option>
                              {filters
                                .find(
                                  (filter) =>
                                    filter.title ===
                                    filterItem?.fields?.selectedField,
                                )
                                ?.options?.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                            </Field>
                          </div>
                        ) : filters.find(
                            (filter) =>
                              filter.title ===
                              filterItem?.fields?.selectedField,
                          )?.number ? (
                          <div className='flex flex-row w-full mr-3'>
                            <div className='flex flex-col w-full mr-3 rtl:ml-3 rtl:mr-0'>
                              <div className='  text-gray-500  font-bold'>
                                {t('appointmentRules.from')}
                              </div>
                              <Field
                                className={controlClasses}
                                name='filterValueFrom'
                                placeholder={t('appointmentRules.from')}
                                id='filterValueFrom'
                                value={
                                  filterItem?.fields?.filterValueFrom || ''
                                }
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                            <div className='flex flex-col w-full rtl:ml-3 rtl:mr-0'>
                              <div className='  text-gray-500  font-bold'>
                                {t('appointmentRules.to')}
                              </div>
                              <Field
                                className={controlClasses}
                                name='filterValueTo'
                                placeholder={t('appointmentRules.to')}
                                id='filterValueTo'
                                value={filterItem?.fields?.filterValueTo || ''}
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                          </div>
                        ) : filters.find(
                            (filter) =>
                              filter.title ===
                              filterItem?.fields?.selectedField,
                          )?.date ? (
                          <div className='flex flex-row w-full mr-3'>
                            <div className='flex flex-col w-full mr-3 rtl:ml-3 rtl:mr-0'>
                              <div className='  text-gray-500  font-bold'>
                                {t('appointmentRules.from')}
                              </div>
                              <Field
                                className={controlClasses}
                                name='filterValueFrom'
                                placeholder={t('appointmentRules.from')}
                                id='filterValueFrom'
                                type='datetime-local'
                                value={
                                  filterItem?.fields?.filterValueFrom || ''
                                }
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                            <div className='flex flex-col w-full rtl:ml-3 rtl:mr-0'>
                              <div className='text-gray-500  font-bold'>
                                {t('appointmentRules.to')}
                              </div>
                              <Field
                                className={controlClasses}
                                name='filterValueTo'
                                placeholder={t('appointmentRules.to')}
                                id='filterValueTo'
                                type='datetime-local'
                                value={filterItem?.fields?.filterValueTo || ''}
                                onChange={handleChange(filterItem.id)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className='flex flex-col w-full mr-3 rtl:ml-3 rtl:mr-0'>
                            <div className='  text-gray-500  font-bold'>
                              {t('appointmentRules.contains')}
                            </div>
                            <Field
                              className={controlClasses}
                              name='filterValue'
                              placeholder={t('appointmentRules.contains')}
                              id='filterValue'
                              value={filterItem?.fields?.filterValue || ''}
                              onChange={handleChange(filterItem.id)}
                            />
                          </div>
                        )}
                        <div className='flex flex-col'>
                          <div className='text-gray-500 font-bold invisible'>
                            {t('appointmentRules.action')}
                          </div>
                          <BaseButton
                            className='my-2'
                            type='reset'
                            color='danger'
                            label={t('appointmentRules.delete')}
                            onClick={() => {
                              deleteFilter(filterItem.id);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                <div className='flex'>
                  <BaseButton
                    className='my-2 mr-3 rtl:ml-3 rtl:mr-0'
                    color='success'
                    label={t('appointmentRules.apply')}
                    onClick={handleSubmit}
                  />
                  <BaseButton
                    className='my-2'
                    color='info'
                    label={t('appointmentRules.cancel')}
                    onClick={handleReset}
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </CardBox>
      ) : null}
      <CardBoxModal
        title={t('appointmentRules.pleaseConfirm')}
        buttonColor='info'
        buttonLabel={
          loading
            ? t('appointmentRules.deleting')
            : t('appointmentRules.confirm')
        }
        isActive={isModalTrashActive}
        onConfirm={handleDeleteAction}
        onCancel={handleModalAction}
      >
        <p>{t('appointmentRules.deleteConfirm')}</p>
      </CardBoxModal>

      {appointment_rules && Array.isArray(appointment_rules) && !showGrid && (
        <ListAppointment_rules
          appointment_rules={appointment_rules}
          loading={loading}
          onDelete={handleDeleteModalAction}
          currentPage={currentPage}
          numPages={numPages}
          onPageChange={onPageChange}
        />
      )}

      {showGrid && dataGrid}

      {selectedRows.length > 0 &&
        createPortal(
          <BaseButton
            className='me-4'
            color='danger'
            label={
              selectedRows.length === 1
                ? t('appointmentRules.deleteRow')
                : t('appointmentRules.deleteRows', {
                    count: selectedRows.length,
                  })
            }
            onClick={() => onDeleteRows(selectedRows)}
          />,
          document.getElementById('delete-rows-button'),
        )}
      <ToastContainer rtl={isRTL} />
    </>
  );
};

export default TableSampleAppointment_rules;
