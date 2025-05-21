import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  appointment_rules: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListAppointment_rules = ({
  appointment_rules,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(
    currentUser,
    'UPDATE_APPOINTMENT_RULES',
  );

  const { t } = useTranslation('common');

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          appointment_rules.map((item) => (
            <div key={item.id}>
              <CardBox hasTable isList className={'rounded shadow-none'}>
                <div
                  className={`flex rounded  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}
                >
                  <Link
                    href={`/appointment_rules/appointment_rules-view/?id=${item.id}`}
                    className={
                      'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                    }
                  >
                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs text-gray-500 '}>
                        {t('appointmentRules.department')}
                      </p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.departmentsOneListFormatter(
                          item.department,
                        )}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs text-gray-500 '}>
                        {t('appointmentRules.minHoursBeforeBooking')}
                      </p>
                      <p className={'line-clamp-2'}>
                        {item.min_hours_before_booking}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs text-gray-500 '}>
                        {t('appointmentRules.maxDaysAdvanceBooking')}
                      </p>
                      <p className={'line-clamp-2'}>
                        {item.max_days_advance_booking}
                      </p>
                    </div>
                  </Link>
                  <ListActionsPopover
                    onDelete={onDelete}
                    itemId={item.id}
                    pathEdit={`/appointment_rules/appointment_rules-edit/?id=${item.id}`}
                    pathView={`/appointment_rules/appointment_rules-view/?id=${item.id}`}
                    hasUpdatePermission={hasUpdatePermission}
                  />
                </div>
              </CardBox>
            </div>
          ))}
        {!loading && appointment_rules.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>{t('appointmentRules.noData')}</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListAppointment_rules;
