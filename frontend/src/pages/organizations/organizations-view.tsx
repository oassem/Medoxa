import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
import { getPageTitle } from '../../config';
import { mdiChartTimelineVariant } from '@mdi/js';
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import 'react-datepicker/dist/react-datepicker.css';

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);
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
        <title>{getPageTitle('View organization')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/organizations/organizations-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            <p>{organizations?.description}</p>
          </div>

          <>
            <p className={'block font-bold mb-4'}>Users</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.users_organizations &&
                      Array.isArray(organizations.users_organizations) &&
                      organizations.users_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.users_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-4'}>Appointment Rules</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Min. Hours Before Booking</th>

                      <th>Max. Days Advance Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.appointment_rules_organizations &&
                      Array.isArray(
                        organizations.appointment_rules_organizations,
                      ) &&
                      organizations.appointment_rules_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/appointment_rules/appointment_rules-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='min_hours_before_booking'>
                              {item.min_hours_before_booking}
                            </td>

                            <td data-label='max_days_advance_booking'>
                              {item.max_days_advance_booking}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.appointment_rules_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          {/* <>
            <p className={'block font-bold mb-2'}>Appointments Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AppointmentDate</th>

                      <th>StartTime</th>

                      <th>EndTime</th>

                      <th>Type</th>

                      <th>Status</th>

                      <th>ReminderSent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.appointments_organization &&
                      Array.isArray(organizations.appointments_organization) &&
                      organizations.appointments_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/appointments/appointments-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='appointment_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.appointment_date,
                              )}
                            </td>

                            <td data-label='start_time'>
                              {dataFormatter.dateTimeFormatter(item.start_time)}
                            </td>

                            <td data-label='end_time'>
                              {dataFormatter.dateTimeFormatter(item.end_time)}
                            </td>

                            <td data-label='type'>{item.type}</td>

                            <td data-label='status'>{item.status}</td>

                            <td data-label='reminder_sent'>
                              {dataFormatter.booleanFormatter(
                                item.reminder_sent,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.appointments_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Appointments organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AppointmentDate</th>

                      <th>StartTime</th>

                      <th>EndTime</th>

                      <th>Type</th>

                      <th>Status</th>

                      <th>ReminderSent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.appointments_organizations &&
                      Array.isArray(organizations.appointments_organizations) &&
                      organizations.appointments_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/appointments/appointments-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='appointment_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.appointment_date,
                              )}
                            </td>

                            <td data-label='start_time'>
                              {dataFormatter.dateTimeFormatter(item.start_time)}
                            </td>

                            <td data-label='end_time'>
                              {dataFormatter.dateTimeFormatter(item.end_time)}
                            </td>

                            <td data-label='type'>{item.type}</td>

                            <td data-label='status'>{item.status}</td>

                            <td data-label='reminder_sent'>
                              {dataFormatter.booleanFormatter(
                                item.reminder_sent,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.appointments_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          <>
            <p className={'block font-bold mb-4'}>Departments</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.departments_organization &&
                      Array.isArray(organizations.departments_organization) &&
                      organizations.departments_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/departments/departments-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='description'>{item.description}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.departments_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          {/* <>
            <p className={'block font-bold mb-2'}>
              Doctor_availabilities organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Weekday</th>

                      <th>MorningStartTime</th>

                      <th>MorningEndTime</th>

                      <th>EveningStartTime</th>

                      <th>EveningEndTime</th>

                      <th>SlotDurationMinutes</th>

                      <th>IsActive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.doctor_availabilities_organizations &&
                      Array.isArray(
                        organizations.doctor_availabilities_organizations,
                      ) &&
                      organizations.doctor_availabilities_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/doctor_availabilities/doctor_availabilities-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='weekday'>{item.weekday}</td>

                            <td data-label='morning_start_time'>
                              {dataFormatter.dateTimeFormatter(
                                item.morning_start_time,
                              )}
                            </td>

                            <td data-label='morning_end_time'>
                              {dataFormatter.dateTimeFormatter(
                                item.morning_end_time,
                              )}
                            </td>

                            <td data-label='evening_start_time'>
                              {dataFormatter.dateTimeFormatter(
                                item.evening_start_time,
                              )}
                            </td>

                            <td data-label='evening_end_time'>
                              {dataFormatter.dateTimeFormatter(
                                item.evening_end_time,
                              )}
                            </td>

                            <td data-label='slot_duration_minutes'>
                              {item.slot_duration_minutes}
                            </td>

                            <td data-label='is_active'>
                              {dataFormatter.booleanFormatter(item.is_active)}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.doctor_availabilities_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Holidays Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>StartDate</th>

                      <th>EndDate</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.holidays_organization &&
                      Array.isArray(organizations.holidays_organization) &&
                      organizations.holidays_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/holidays/holidays-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>

                          <td data-label='notes'>{item.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.holidays_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Holidays organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>StartDate</th>

                      <th>EndDate</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.holidays_organizations &&
                      Array.isArray(organizations.holidays_organizations) &&
                      organizations.holidays_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/holidays/holidays-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>

                          <td data-label='notes'>{item.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.holidays_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Imaging_investigations organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.imaging_investigations_organizations &&
                      Array.isArray(
                        organizations.imaging_investigations_organizations,
                      ) &&
                      organizations.imaging_investigations_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/imaging_investigations/imaging_investigations-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='description'>{item.description}</td>

                            <td data-label='price'>{item.price}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.imaging_investigations_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Imaging_order_items organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {organizations.imaging_order_items_organizations &&
                      Array.isArray(
                        organizations.imaging_order_items_organizations,
                      ) &&
                      organizations.imaging_order_items_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/imaging_order_items/imaging_order_items-view/?id=${item.id}`,
                              )
                            }
                          ></tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.imaging_order_items_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Imaging_orders organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalAmount</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.imaging_orders_organizations &&
                      Array.isArray(
                        organizations.imaging_orders_organizations,
                      ) &&
                      organizations.imaging_orders_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/imaging_orders/imaging_orders-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='total_amount'>
                              {item.total_amount}
                            </td>

                            <td data-label='status'>{item.status}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.imaging_orders_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Insurances organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ProviderName</th>

                      <th>PolicyNumber</th>

                      <th>CoverageStart</th>

                      <th>CoverageEnd</th>

                      <th>PlanDetails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.insurances_organizations &&
                      Array.isArray(organizations.insurances_organizations) &&
                      organizations.insurances_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/insurances/insurances-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='provider_name'>
                              {item.provider_name}
                            </td>

                            <td data-label='policy_number'>
                              {item.policy_number}
                            </td>

                            <td data-label='coverage_start'>
                              {dataFormatter.dateTimeFormatter(
                                item.coverage_start,
                              )}
                            </td>

                            <td data-label='coverage_end'>
                              {dataFormatter.dateTimeFormatter(
                                item.coverage_end,
                              )}
                            </td>

                            <td data-label='plan_details'>
                              {item.plan_details}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.insurances_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Invoice_items organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>

                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.invoice_items_organizations &&
                      Array.isArray(
                        organizations.invoice_items_organizations,
                      ) &&
                      organizations.invoice_items_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/invoice_items/invoice_items-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='description'>{item.description}</td>

                            <td data-label='amount'>{item.amount}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.invoice_items_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Invoices Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalAmount</th>

                      <th>VATAmount</th>

                      <th>IsPaid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.invoices_organization &&
                      Array.isArray(organizations.invoices_organization) &&
                      organizations.invoices_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/invoices/invoices-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='total_amount'>{item.total_amount}</td>

                          <td data-label='vat_amount'>{item.vat_amount}</td>

                          <td data-label='is_paid'>
                            {dataFormatter.booleanFormatter(item.is_paid)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.invoices_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Invoices organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalAmount</th>

                      <th>VATAmount</th>

                      <th>IsPaid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.invoices_organizations &&
                      Array.isArray(organizations.invoices_organizations) &&
                      organizations.invoices_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/invoices/invoices-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='total_amount'>{item.total_amount}</td>

                          <td data-label='vat_amount'>{item.vat_amount}</td>

                          <td data-label='is_paid'>
                            {dataFormatter.booleanFormatter(item.is_paid)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.invoices_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Lab_order_items organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {organizations.lab_order_items_organizations &&
                      Array.isArray(
                        organizations.lab_order_items_organizations,
                      ) &&
                      organizations.lab_order_items_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/lab_order_items/lab_order_items-view/?id=${item.id}`,
                              )
                            }
                          ></tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.lab_order_items_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Lab_orders organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalAmount</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.lab_orders_organizations &&
                      Array.isArray(organizations.lab_orders_organizations) &&
                      organizations.lab_orders_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/lab_orders/lab_orders-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='total_amount'>
                              {item.total_amount}
                            </td>

                            <td data-label='status'>{item.status}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.lab_orders_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Lab_tests organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.lab_tests_organizations &&
                      Array.isArray(organizations.lab_tests_organizations) &&
                      organizations.lab_tests_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/lab_tests/lab_tests-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='price'>{item.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.lab_tests_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Medications organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.medications_organizations &&
                      Array.isArray(organizations.medications_organizations) &&
                      organizations.medications_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/medications/medications-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='description'>{item.description}</td>

                            <td data-label='price'>{item.price}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.medications_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Patient_documents organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>DocumentType</th>

                      <th>DocumentURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.patient_documents_organizations &&
                      Array.isArray(
                        organizations.patient_documents_organizations,
                      ) &&
                      organizations.patient_documents_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/patient_documents/patient_documents-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='document_type'>
                              {item.document_type}
                            </td>

                            <td data-label='document_url'>
                              {item.document_url}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.patient_documents_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Patients Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>FullName(English)</th>

                      <th>FullName(Arabic)</th>

                      <th>DateofBirth</th>

                      <th>Gender</th>

                      <th>Nationality</th>

                      <th>IdentifierType</th>

                      <th>Identifier</th>

                      <th>Address</th>

                      <th>EmergencyContactName</th>

                      <th>EmergencyContactPhone</th>

                      <th>MedicalHistory</th>

                      <th>Allergies</th>

                      <th>CurrentMedications</th>

                      <th>FamilyHistory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.patients_organization &&
                      Array.isArray(organizations.patients_organization) &&
                      organizations.patients_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/patients/patients-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='full_name_en'>{item.full_name_en}</td>

                          <td data-label='full_name_ar'>{item.full_name_ar}</td>

                          <td data-label='date_of_birth'>
                            {dataFormatter.dateTimeFormatter(
                              item.date_of_birth,
                            )}
                          </td>

                          <td data-label='gender'>{item.gender}</td>

                          <td data-label='nationality'>{item.nationality}</td>

                          <td data-label='identifier_type'>
                            {item.identifier_type}
                          </td>

                          <td data-label='identifier'>{item.identifier}</td>

                          <td data-label='address'>{item.address}</td>

                          <td data-label='emergency_contact_name'>
                            {item.emergency_contact_name}
                          </td>

                          <td data-label='emergency_contact_phone'>
                            {item.emergency_contact_phone}
                          </td>

                          <td data-label='medical_history'>
                            {item.medical_history}
                          </td>

                          <td data-label='allergies'>{item.allergies}</td>

                          <td data-label='current_medications'>
                            {item.current_medications}
                          </td>

                          <td data-label='family_history'>
                            {item.family_history}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.patients_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Pharmacy_order_items organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.pharmacy_order_items_organizations &&
                      Array.isArray(
                        organizations.pharmacy_order_items_organizations,
                      ) &&
                      organizations.pharmacy_order_items_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/pharmacy_order_items/pharmacy_order_items-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='quantity'>{item.quantity}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.pharmacy_order_items_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>
              Pharmacy_orders organizations
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>TotalAmount</th>

                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.pharmacy_orders_organizations &&
                      Array.isArray(
                        organizations.pharmacy_orders_organizations,
                      ) &&
                      organizations.pharmacy_orders_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/pharmacy_orders/pharmacy_orders-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='total_amount'>
                              {item.total_amount}
                            </td>

                            <td data-label='status'>{item.status}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.pharmacy_orders_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Sick_leaves organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>StartDate</th>

                      <th>EndDate</th>

                      <th>Diagnosis</th>

                      <th>Instructions</th>

                      <th>DocumentURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.sick_leaves_organizations &&
                      Array.isArray(organizations.sick_leaves_organizations) &&
                      organizations.sick_leaves_organizations.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/sick_leaves/sick_leaves-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='start_date'>
                              {dataFormatter.dateTimeFormatter(item.start_date)}
                            </td>

                            <td data-label='end_date'>
                              {dataFormatter.dateTimeFormatter(item.end_date)}
                            </td>

                            <td data-label='diagnosis'>{item.diagnosis}</td>

                            <td data-label='instructions'>
                              {item.instructions}
                            </td>

                            <td data-label='document_url'>
                              {item.document_url}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.sick_leaves_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Visits Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VisitDateTime</th>

                      <th>Symptoms</th>

                      <th>Diagnosis</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.visits_organization &&
                      Array.isArray(organizations.visits_organization) &&
                      organizations.visits_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/visits/visits-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='visit_datetime'>
                            {dataFormatter.dateTimeFormatter(
                              item.visit_datetime,
                            )}
                          </td>

                          <td data-label='symptoms'>{item.symptoms}</td>

                          <td data-label='diagnosis'>{item.diagnosis}</td>

                          <td data-label='notes'>{item.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.visits_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          {/* <>
            <p className={'block font-bold mb-2'}>Visits organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VisitDateTime</th>

                      <th>Symptoms</th>

                      <th>Diagnosis</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.visits_organizations &&
                      Array.isArray(organizations.visits_organizations) &&
                      organizations.visits_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/visits/visits-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='visit_datetime'>
                            {dataFormatter.dateTimeFormatter(
                              item.visit_datetime,
                            )}
                          </td>

                          <td data-label='symptoms'>{item.symptoms}</td>

                          <td data-label='diagnosis'>{item.diagnosis}</td>

                          <td data-label='notes'>{item.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.visits_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </> */}

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
