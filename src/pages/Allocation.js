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
    Chip,
    Alert

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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SkeletonView from '../components/SkeletonView';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, { instance2, instance3 } from '../axios';
import { fDate, fDateTime } from '../utils/formatTime';

export default function Allocatoin() {
    const [result, setResult] = useState([])
    const [itemscount, setItemsCount] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchKey, setSearchKey] = useState('null')
    const [vehicleAllocationId, setVehicleAllocationId] = useState()


    const [open, setOpen] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false);

    const handleClickOpen = (id) => {
        setVehicleAllocationId(id);
        setOpen(true);
    };

    const handleCloseYes = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token)
        const headers = {
            'Authorization': token
        }
        await instance3.get(`assign/disallocate_vehicle_user/${vehicleAllocationId}`, { headers })
            .then(response => {
                getData()
            })
            .catch(error => "error");

        setOpen(false);
        setSuccessNotification(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSuccessNotification(false);
    };
    useEffect(() => {
        console.log("component update")
        getData()
        // console.log(result)
        // setCurrentPage('1')
    }, [])

    useEffect(() => {
        console.log("page change")
        getData()
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
        getData()
        // setCurrentPage('1')
    }, [searchKey])

    async function getData() {
        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token)
        const headers = {
            'Authorization': token
        }
        await instance3.get(`assign/allocated_vehicle_user_list_web/${currentPage}/${limit}/${searchKey}`, { headers })
            .then(response => {
                setResult(response.data.data);
                setItemsCount(response.data.count);
            })
            .catch(error => "error");

    }

    const getPageCount = async () => {
        console.log("getPageCount fun")
        const count = Math.ceil(itemscount / limit)
        setPageCount(count)
    }

    const handlePageClick = async (event, pageNumber = 1) => {
        setCurrentPage(pageNumber)
    }

    return (
        <Page title="User">

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Allocation
                    </Typography>

                    <Button variant="contained" component={RouterLink} to="/dashboard/allocation/add" startIcon={<Iconify icon="eva:plus-fill" />}>
                        Allocate Vehicle
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
                                        <TableCell align="left">Vehicle No</TableCell>
                                        <TableCell align="left">User Name</TableCell>
                                        <TableCell align="left">User Id</TableCell>
                                        <TableCell align="left">Division</TableCell>
                                        <TableCell align="left">Allocated On</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                {
                                    result[0] ?
                                        <TableBody>
                                            {result.map((row) => (
                                                <TableRow
                                                    key={row.vehicle_allocation_id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left" style={{ fontWeight: 'bold', fontSize: "12px" }}>{row.vehicle_no}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px"}}>{row.user_name}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px"}}>{row.user_id}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px"}}>{row.division_name} ({row.sub_division_name})</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px"}}>{fDate(row.vehicle_allocation_date)}</TableCell>
                                                    <TableCell align="left"> {row.status === 1
                                                        ? <Chip label="Allocated" size="small" variant="outlined" color="success" style={{ fontSize: "10px"}}/>
                                                        : <Chip label="Deallocated" size="small" variant="outlined" color="error" style={{ fontSize: "10px"}}/>}

                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {
                                                            row.status === 1
                                                                ? <Button variant="contained" color="error" size="small" onClick={() => handleClickOpen(row.vehicle_allocation_id)} style={{ fontSize: "10px"}}>
                                                                    Deallocate
                                                                </Button>
                                                                : null
                                                        }
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
            {/* Confirmation Dilouge popup */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alert!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do You want Deallocate this vehicle from user ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleCloseYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={successNotification} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" color="error" sx={{ width: '100%' }} style={{ color: 'white' }}>
                    Vehicle deallocated successfully!
                </Alert>
            </Snackbar>
        </Page>
    );
}
