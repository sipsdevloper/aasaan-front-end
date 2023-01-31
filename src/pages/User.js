import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
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
import SkeletonView from '../components/SkeletonView';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, {instance2, instance3} from '../axios';


export default function User() {
  const [result, setResult] = useState([])
  const [itemscount, setItemsCount] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchKey, setSearchKey] = useState('null')

  useEffect(() => {
    console.log("component update")
    getCategories()
    // console.log(result)
    // setCurrentPage('1')
  }, [])

  useEffect(() => {
    console.log("page change")
    getCategories()
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
    getCategories()
    // setCurrentPage('1')
  }, [searchKey])

  async function getCategories() {
   
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    const headers = {
      'Authorization': token
    }
    await instance3.get(`user/user_list_web/${currentPage}/${limit}/${searchKey}`, { headers })
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

  return (
    <Page title="User">

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>

          <Button variant="contained" component={RouterLink} to="/dashboard/user/add" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New User
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">User Name</TableCell>
                    <TableCell align="left">User Id</TableCell>
                    <TableCell align="left">Contact No.</TableCell>
                    <TableCell align="left">Active Status</TableCell>
                    <TableCell align="left">Allocation Status</TableCell>
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

                      <TableCell align="left" style={{ fontSize: "12px"}}>{row.user_name}</TableCell>
                      <TableCell align="left" style={{ fontSize: "12px"}}>{row.user_id}</TableCell>
                      <TableCell align="left" style={{ fontSize: "12px"}}>{row.contact_no}</TableCell>
                      <TableCell align="left">
                        {row.active_status === 1
                        ? <Chip label="Active" size="small" variant="outlined" color="success" style={{ fontSize: "10px"}}/>
                        : <Chip label="Inactive" size="small" variant="outlined" color="error"  style={{ fontSize: "10px"}}/>} 
                        </TableCell>
                      <TableCell align="left"> {row.status === 1
                        ? <Chip label="Allocated" size="small" variant="outlined" color="success"  style={{ fontSize: "10px"}}/>
                        : <Chip label="Not Allocated" size="small" variant="outlined" color="error"  style={{ fontSize: "10px"}}/>} 
                       
                        </TableCell>
                      
                      <TableCell align="left">
                        <RouterLink to={`/dashboard/user/update/${row.user_id}`}><Iconify icon="eva:edit-2-fill" /> </RouterLink>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
                : <SkeletonView/>
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
    </Page>
  );
}
