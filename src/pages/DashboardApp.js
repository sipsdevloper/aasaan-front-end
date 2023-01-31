import { faker } from '@faker-js/faker';
// @mui
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Stack, Link, Card, Button, Divider, CardHeader } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';


import axios, { instance2, instance3 } from '../axios';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// utils
import { fDate, fDateTime } from '../utils/formatTime';
// components

import Scrollbar from '../components/Scrollbar';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [result, setResult] = useState([])
  const [dashboardcount, setDashboardCount] = useState([])
  const [dateWiseCount, setDateWiseCount] = useState([])
  const [userWiseCount, setUserWiseCount] = useState([])

  useEffect(() => {
    console.log("component update")
    getActivities()
    getDashboardCount()
    getdateWiseCount()
    getuserWiseCount()
  }, [])

  async function getActivities() {
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    const headers = {
      'Authorization': token
    }
    await instance3.get(`user/all_users_daily_activity_list`, { headers })
      .then(response => {
        setResult(response.data.data);
      })
      .catch(error => "error");
    // console.log(result)
    return result
  }

  async function getDashboardCount() {

    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    const headers = {
      'Authorization': token
    }
    await instance3.get(`analytics/admin_dashboard`, { headers })
      .then(response => {
        setDashboardCount(response.data.data);

      })
      .catch(error => "error");
    // console.log(result)
    return dashboardcount
  }

  async function getdateWiseCount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
      'Authorization': token
    }
    await instance3.get(`analytics/last7days_date_wise_activity_count`, { headers })
      .then(response => {
        setDateWiseCount(response.data.data);

      })
      .catch(error => "error");
  }
  async function getuserWiseCount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
      'Authorization': token
    }
    await instance3.get(`analytics/last30days_user_wise_activity_count`, { headers })
      .then(response => {
        setUserWiseCount(response.data.data);

      })
      .catch(error => "error");
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {JSON.parse(localStorage.getItem('user')).user_name}, Welcome to VTS Portal
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {
              dashboardcount.free_user ?
                <AppWidgetSummary title="Free/Total Users" total={`${dashboardcount.free_user}/${dashboardcount.total_user}`} icon={'mdi:user-group'} />
                :
                <AppWidgetSummary title="Free/Total Users" total="0" icon={'mdi:user-group'} />
            }

          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {
              dashboardcount.free_user ?
                <AppWidgetSummary title="Free/Total Vehicle" total={`${dashboardcount.free_vehicle}/${dashboardcount.total_vehicle}`} color="info" icon={'fluent:vehicle-cab-24-filled'} />
                :
                <AppWidgetSummary title="Free/Total Vehicle" total="0" color="info" icon={'fluent:vehicle-cab-24-filled'} />
            }
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Today Activity" total={dashboardcount.today_activity} color="success" icon={'material-symbols:local-activity-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Activity" total={dashboardcount.total_activity} color="warning" icon={'humbleicons:activity'} />
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            {
              dateWiseCount ?

                <AppWebsiteVisits
                  title="Last Week User Activity Count"
                  subheader="Date Wise"
                  chartLabels={dateWiseCount.date}
                  chartData={[
                    {
                      name: 'User Activity',
                      type: 'column',
                      fill: 'solid',
                      data: dateWiseCount.activity_count,
                    }
                  ]}

                  chartColors={[
                    theme.palette.chart.violet[0],
                    theme.palette.chart.yellow[0],
                  ]}
                />

                : <AppWebsiteVisits
                  title="Last Week User Activity Count"
                  subheader="Date Wise"
                  chartLabels={[]}
                  chartData={[
                    {
                      name: 'User Activity',
                      type: 'column',
                      fill: 'solid',
                      data: {},
                    }
                  ]}

                  chartColors={[
                    theme.palette.chart.violet[0],
                    theme.palette.chart.yellow[0],
                  ]}
                />
            }


          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <AppConversionRates
              title="Last 30 Days Activity Count"
              subheader="User Wise"
              chartData={userWiseCount}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card >
              <CardHeader title={"Latest Activity"} />

              <Scrollbar>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="sticky  table" size='small' >
                      <TableHead>
                        <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell align="left">User</TableCell>
                          <TableCell align="left">Vehicle</TableCell>
                          <TableCell align="left">Date</TableCell>
                          <TableCell align="left">Visiting Place</TableCell>
                          {/* <TableCell align="left">In</TableCell>
                          <TableCell align="left">Out</TableCell>
                          <TableCell align="left">Distance</TableCell> */}
                        </TableRow>
                      </TableHead>
                      {
                        result[0] ?
                          <TableBody >
                            {
                              result.map((row) => (
                                <TableRow
                                  key={row.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                  <TableCell align="left" style={{ fontSize: "12px" }}>{row.user_name} ({row.userid})</TableCell>
                                  <TableCell align="left" style={{ fontSize: "12px" }}>{row.vehicle_no}</TableCell>
                                  <TableCell align="left" style={{ fontSize: "12px" }}>{fDate(row.date)}</TableCell>
                                  <TableCell align="left" style={{ fontSize: "12px" }}>{row.visiting_place}</TableCell>
                                  {/* <TableCell align="left" style={{ fontSize: "11px" }}>
                                <Iconify icon="icomoon-free:meter" color="success" style={{ color: "green" }} />
                                <strong> {row.in_odometer_reading}  </strong>
                                <br /><Iconify icon="ic:twotone-access-time" color="success" style={{ color: "red" }} /> {fDateTime(row.in_time)}

                              </TableCell>

                              <TableCell align="left" style={{ fontSize: "11px" }}>
                                {
                                  row.out_time ?
                                    <>
                                      <Iconify icon="icomoon-free:meter" color="success" style={{ color: "green" }} />
                                      <strong> {row.out_odometer_reading}  </strong>
                                      <br /><Iconify icon="ic:twotone-access-time" color="success" style={{ color: "red" }} /> {fDateTime(row.out_time)}


                                    </>
                                    : <span style={{ color: "red" }}>Not Done Yet</span>
                                }

                              </TableCell>

                              <TableCell align="left" style={{ fontSize: "13px", fontWeight: 'bold' }}>
                                {row.in_odometer_reading && row.out_odometer_reading
                                  ? row.out_odometer_reading - row.in_odometer_reading
                                  : 0} Km.</TableCell> */}
                                </TableRow>
                              ))
                            }
                          </TableBody>
                          : ""
                      }

                    </Table>
                  </TableContainer>
                </Stack>
              </Scrollbar>

              <Divider />

              <Box sx={{ p: 2, textAlign: 'right' }}>
                <RouterLink to='/dashboard/activity'>
                  <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
                    View all
                  </Button>
                </RouterLink>
              </Box>
            </Card>
          </Grid>



          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
                { label: 'India', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> 

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
