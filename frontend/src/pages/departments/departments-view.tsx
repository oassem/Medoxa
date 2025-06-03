import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/departments/departmentsSlice';
import { getPageTitle } from '../../config';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { hasPermission } from '../../helpers/userPermissions';

const DepartmentsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.departments);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View department')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View departments')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/departments/departments-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>Organization</p>
              <p>{departments?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{departments?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            <p>{departments?.description}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/departments/departments-table')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

DepartmentsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DEPARTMENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DepartmentsView;
