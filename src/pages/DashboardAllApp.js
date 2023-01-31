import { faker } from '@faker-js/faker';
// @mui
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
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


export default function DashboardAllApp() {
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

        <Box sx={{ display: 'inline-flex' }}>
          <img src="../favicon/logo.png" alt="" width="120px" />
        </Box>

        <Typography variant="h6" sx={{ mb: 5 }}>

          Hi {JSON.parse(localStorage.getItem('user')).user_name}, Welcome back
        </Typography>


        <Grid container spacing={3}>

          <Grid item xs={12} md={1}>
            <></>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            {/* <RouterLink to='/dashboard/activity' style={{ textDecoration: 'none' }}> */}
            <AppWidgetSummary total="POD" title="Proof of Delivery" icon={'fluent:reciept-20-filled'} />
            {/* </RouterLink> */}
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <RouterLink to='/dashboard/app' style={{ textDecoration: 'none' }}>
              <AppWidgetSummary total="VTS" title="Vehicle Tracking System" color="error" icon={'fluent:vehicle-cab-24-filled'} />
            </RouterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <AppWidgetSummary total="Meter" title="Meter Installation App" color="success" icon={'ic:round-electric-meter'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <AppWidgetSummary total="Projects" title="Project Progress Tracking" color="warning" icon={'humbleicons:activity'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <AppWidgetSummary title="Raise an Issue" total="Ticketing" color="info" icon={'ph:ticket-fill'} />
          </Grid>



        </Grid>



      </Container>
    </Page>
  );
}
