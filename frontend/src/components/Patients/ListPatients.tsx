import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import { hasPermission } from '../../helpers/userPermissions';
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';

type Props = {
  patients: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListPatients = ({
  patients,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_PATIENTS');

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          patients.map((item) => (
            <div key={item.id}>
              <CardBox hasTable isList className={'rounded shadow-none'}>
                <div
                  className={`flex rounded  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}
                >
                  <Link
                    href={`/patients/patients-view/?id=${item.id}`}
                    className={
                      'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                    }
                  >
                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>User</p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.usersOneListFormatter(item.user)}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Organization</p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.organizationsOneListFormatter(
                          item.organization,
                        )}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        FullName(English)
                      </p>
                      <p className={'line-clamp-2'}>{item.full_name_en}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        FullName(Arabic)
                      </p>
                      <p className={'line-clamp-2'}>{item.full_name_ar}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>DateofBirth</p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.dateTimeFormatter(item.date_of_birth)}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Gender</p>
                      <p className={'line-clamp-2'}>{item.gender}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Nationality</p>
                      <p className={'line-clamp-2'}>{item.nationality}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        IdentifierType
                      </p>
                      <p className={'line-clamp-2'}>{item.identifier_type}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Identifier</p>
                      <p className={'line-clamp-2'}>{item.identifier}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Address</p>
                      <p className={'line-clamp-2'}>{item.address}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        EmergencyContactName
                      </p>
                      <p className={'line-clamp-2'}>
                        {item.emergency_contact_name}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        EmergencyContactPhone
                      </p>
                      <p className={'line-clamp-2'}>
                        {item.emergency_contact_phone}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        MedicalHistory
                      </p>
                      <p className={'line-clamp-2'}>{item.medical_history}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Allergies</p>
                      <p className={'line-clamp-2'}>{item.allergies}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        CurrentMedications
                      </p>
                      <p className={'line-clamp-2'}>
                        {item.current_medications}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>
                        FamilyHistory
                      </p>
                      <p className={'line-clamp-2'}>{item.family_history}</p>
                    </div>
                  </Link>
                  <ListActionsPopover
                    onDelete={onDelete}
                    itemId={item.id}
                    pathEdit={`/patients/patients-edit/?id=${item.id}`}
                    pathView={`/patients/patients-view/?id=${item.id}`}
                    hasUpdatePermission={hasUpdatePermission}
                  />
                </div>
              </CardBox>
            </div>
          ))}
        {!loading && patients.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
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

export default ListPatients;
