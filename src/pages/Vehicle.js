
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { trackPromise } from 'react-promise-tracker';

// material
import {
  Card,
  Grid,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Container,
  Typography,
  Box,
  Chip
} from '@mui/material';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { fDate, fDateTime } from '../utils/formatTime';
import SkeletonView from '../components/SkeletonView';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, { instance2, instance3 } from '../axios';


export default function Blog() {
  const [result, setResult] = useState([])
  const [itemscount, setItemsCount] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKey, setSearchKey] = useState('null')
  const [open, setOpen] = React.useState(false);
  const [singleVehicleDetails, setSingleVehicleDetails] = React.useState([]);

  const handleClickOpen = (id) => {
    getSingleVehicleDetail(id);
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    console.log("component update")
    trackPromise(
      getVehicles()
    )
    // console.log(result)
    // setCurrentPage('1')
  }, [])

  useEffect(() => {
    console.log("page change")
    trackPromise(
      getVehicles()
    )
  }, [currentPage])

  useEffect(() => {
    // console.log("itemscount count",itemscount)
    getPageCount()
  }, [itemscount])

  useEffect(() => {
    console.log("search")
    if (searchKey < 1) {
      setSearchKey('null')
    }

    trackPromise(
      getVehicles()
    )

    // setCurrentPage('1')
  }, [searchKey])


  async function getVehicles() {
    const data = {
      'user_id': 1
    }
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    const headers = {
      'Authorization': token
    }
    await instance3.get(`vehicle/list_web/${currentPage}/${limit}/${searchKey}`, { headers })
      .then(response => {
        setResult(response.data.data);
        setItemsCount(response.data.count);
      })
      .catch(error => "error");
    // console.log(result)
    return result
  }

  const getPageCount = async () => {
    console.log("getPageCount fun")
    const count = Math.ceil(itemscount / limit)
    setPageCount(count)
  }

  const handlePageClick = async (event, pageNumber = 1) => {
    // console.log(event.target.textContent)
    // const currentPage = pageNumber + 1
    // console.log(currentPage)
    setCurrentPage(pageNumber)
  }
  // popup data **************************************************
  async function getSingleVehicleDetail(id) {

    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    const headers = {
      'Authorization': token
    }
    await instance3.get(`vehicle/single_vehicle_web/${id}`, { headers })
      .then(response => {
        setSingleVehicleDetails(response.data.data);
      })
      .catch(error => "error");
    // console.log(result)
    return result
  }


  return (
    <Page title="Vehicle">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Vehicles
          </Typography>

          <Button variant="contained" component={RouterLink} to="/dashboard/vehicle/add" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New Vehicle
          </Button>

        </Stack>

        <Card>

          <Scrollbar>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ padding: "30px" }}
            >
              <TextField id="key" label="Search ...." variant="standard" style={{ width: '100%' }} onChange={(e) => setSearchKey(e.target.value)} />

            </Grid>


            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table"  size="small">
                <TableHead>
                  <TableRow>

                    <TableCell style={{ width: '150px' }}>Vehicle No.</TableCell>
                    <TableCell align="left">Division</TableCell>
                    {/* <TableCell align="left">Blog Image</TableCell> */}
                    <TableCell align="left">Vehicle Type</TableCell>
                    <TableCell align="left">Owner</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>

                {
                  result[0] ?
                    <TableBody>
                      {result.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                          {/* <TableCell component="th" scope="row" padding="1">
              
                        <Box component="img" alt={row.title} src={`http://sipshrms.in/vts/uploads/vehicle/${row.vehicle_image}`} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
                      </TableCell> */}
                          <TableCell align="left" style={{ fontWeight: 'bold', fontSize: "12px" }}>{row.vehicle_no}</TableCell>
                          <TableCell align="left" style={{ fontSize: "12px"}}>{row.division_name} ({row.sub_division_name})</TableCell>
                          <TableCell align="left" style={{ fontSize: "12px"}}>{row.vehicle_type_name} ({row.fuel_type})</TableCell>
                          <TableCell align="left" style={{ fontSize: "12px"}}>{row.owner_name} ({row.contact_no})</TableCell>


                          {/* <TableCell align="left">
                        <img
                          src={`http://localhost:8000/storage/blog/${row.image1}`}
                          srcSet={`http://localhost:8000/storage/blog/${row.image1}`}
                          alt={row.title}
                          loading="lazy"
                          style={{width:'100px'}}
                        />
                      </TableCell> */}
                          <TableCell align="left" > {row.status === 1
                            ? <Chip label="Allocated" size="small" variant="outlined" color="success" style={{ fontSize: "10px"}}/>
                            : <Chip label="Not Allocated" size="small" variant="outlined" color="error" style={{ fontSize: "10px"}}/>} </TableCell>
                          <TableCell align="left">

                            <Button color="warning" variant="soft" onClick={() => handleClickOpen(row.id)}>
                              <Iconify icon="eva:eye-fill" style={{ color: '#32875D' }} />
                            </Button>

                            {/* <RouterLink to={`/dashboard/blog/update/${row.id}`}>
                          
                        </RouterLink> */}
                            {/* <Button variant="soft" color="info">
                              <Iconify icon="eva:edit-2-fill" />
                            </Button> */}

                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                    : <SkeletonView />
                }




              </Table>
            </TableContainer>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ marginBottom: "20px" }}
            >
              <Stack spacing={2}>
                <Pagination count={pageCount} variant="outlined" shape="rounded" onChange={(event, pageNumber) => handlePageClick(event, pageNumber)} />
              </Stack>

            </Grid>

          </Scrollbar>

        </Card>
      </Container>
      {/* Popup Code */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}

      >
        <AppBar sx={{ position: 'relative' }} style={{ background: '#32875D' }}>
          <Toolbar >

            <Iconify icon="eva:car-fill" style={{ fontSize: '32px' }} />
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {singleVehicleDetails.vehicle_no}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button> */}
          </Toolbar>
        </AppBar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell rowspan={2} style={{ fontWeight: 'bold', color: '#3495E0' }}><Iconify icon="eva:car-fill" style={{ fontSize: '22px', marginBottom: '-6px' }} /> Vehicle Details</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Division</TableCell>
              <TableCell>{singleVehicleDetails.division_name}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Sub Division</TableCell>
              <TableCell>{singleVehicleDetails.sub_division_name}</TableCell>
              <TableCell rowspan={4} style={{ fontWeight: 'bold' }}>
                <Box component="img" alt={singleVehicleDetails.vehicle_no} src={`http://sipshrms.in/vts/uploads/vehicle/${singleVehicleDetails.vehicle_image}`} sx={{ width: 150, borderRadius: 1.5, flexShrink: 0 }} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Vehicle Type</TableCell>
              <TableCell>{singleVehicleDetails.vehicle_type_name}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Fuel Type</TableCell>
              <TableCell>{singleVehicleDetails.fuel_type}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell rowspan={2} style={{ fontWeight: 'bold', color: '#E57D20' }}><Iconify icon="eva:person-fill" style={{ fontSize: '22px', marginBottom: '-6px' }} /> Owner Personal Details</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Owner Name</TableCell>
              <TableCell>{singleVehicleDetails.owner_name}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Contact No.</TableCell>
              <TableCell>{singleVehicleDetails.contact_no}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell>{singleVehicleDetails.address}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Aadhar Card No.</TableCell>
              <TableCell>{singleVehicleDetails.aadhaar_card}</TableCell>
            </TableRow>


            <TableRow>
              <TableCell rowspan={2} style={{ fontWeight: 'bold', color: '#32875D' }}><Iconify icon="ph:bank-fill" style={{ fontSize: '22px', marginBottom: '-6px' }} /> Owner Bank Details</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Bank Name</TableCell>
              <TableCell>{singleVehicleDetails.bank_name}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Account No</TableCell>
              <TableCell>{singleVehicleDetails.account_no}</TableCell>
              <TableCell rowspan={4} style={{ fontWeight: 'bold' }}>
                <Box component="img" alt={singleVehicleDetails.vehicle_no} src={`http://sipshrms.in/vts/uploads/vehicle/${singleVehicleDetails.rc_image}`} sx={{ width: 150, borderRadius: 1.5, flexShrink: 0 }} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>IFSC Code</TableCell>
              <TableCell>{singleVehicleDetails.ifsc_code}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Pan Card No.</TableCell>
              <TableCell>{singleVehicleDetails.pancard_no}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell rowspan={3} style={{ fontWeight: 'bold', color: '#EC4946' }}><Iconify icon="ri:bank-card-2-fill" style={{ fontSize: '22px', marginBottom: '-6px' }} /> Other Details</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Avg Km.</TableCell>
              <TableCell>{singleVehicleDetails.avg_km}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Monthly Fixed Rate</TableCell>
              <TableCell>Rs. {singleVehicleDetails.monthly_fixed_rate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Monthly Rate</TableCell>
              <TableCell>Rs. {singleVehicleDetails.monthly_rate}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell>{singleVehicleDetails.status ? "Allocated" : "Not Allocated"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Added By</TableCell>
              <TableCell>{singleVehicleDetails.user_name}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Added On</TableCell>
              <TableCell>{singleVehicleDetails.createdate ? fDate(singleVehicleDetails.createdate) : null}</TableCell>
            </TableRow>

          </TableBody>



        </Table>
      </Dialog>
    </Page>
  );
}
