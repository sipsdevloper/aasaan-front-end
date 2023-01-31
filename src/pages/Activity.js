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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fDate, fDateTime } from '../utils/formatTime';

import SkeletonView from '../components/SkeletonView';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, { instance2, instance3 } from '../axios';


export default function Activity() {
    const [result, setResult] = useState([])
    const [itemscount, setItemsCount] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchKey, setSearchKey] = useState('null')
    const [open, setOpen] = useState(false);
    const [inOut, setInOut] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [singleActivity, setSingleActivity] = useState([]);


    const handleClickOpenIn = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token)
        const headers = {
            'Authorization': token
        }
        await instance3.get(`user/user_daily_activity_single/${id}`, { headers })
            .then(response => {
                setInOut('In')
                setImgUrl(`${response.data.image_url}${response.data.data.in_odometer_image}`);
                setSingleActivity(response.data.data);
            })
            .catch(error => "error");

        setOpen(true);

    };
    const handleClickOpenOut = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token)
        const headers = {
            'Authorization': token
        }
        await instance3.get(`user/user_daily_activity_single/${id}`, { headers })
            .then(response => {
                setInOut('Out')
                setImgUrl(`${response.data.image_url}${response.data.data.out_odometer_image}`);
                setSingleActivity(response.data.data);
            })
            .catch(error => "error");

        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };
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
        await instance3.get(`user/all_users_daily_activity_list`, { headers })
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
                        Users Daily Activity
                    </Typography>

                    {/* <Button variant="contained" component={RouterLink} to="/dashboard/user/add" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New User
          </Button> */}

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
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small' >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">User</TableCell>
                                        <TableCell align="left">Vehicle</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Visiting Place</TableCell>
                                        <TableCell align="left">In</TableCell>
                                        <TableCell align="left">Out</TableCell>
                                        <TableCell align="left">Distance</TableCell>
                                    </TableRow>
                                </TableHead>

                                {
                                    result[0] ?
                                        <TableBody >
                                            {result.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >

                                                    <TableCell align="left" style={{ fontSize: "12px" }}>{row.user_name} ({row.userid})</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px" }}>{row.vehicle_no}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px" }}>{fDate(row.date)}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "12px" }}>{row.visiting_place}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: "11px" }}>
                                                        <Iconify icon="icomoon-free:meter" color="success" style={{ color: "green" }} />
                                                        <strong> {row.in_odometer_reading}  </strong>
                                                        <br /><Iconify icon="ic:twotone-access-time" color="success" style={{ color: "red" }} /> {fDateTime(row.in_time)} <br />
                                                        <Button color="warning" variant="soft" onClick={() => handleClickOpenIn(row.register_vehicle_id)} style={{ color: '#32875D', fontSize: '14px' }}>
                                                            <Iconify icon="material-symbols:image" />
                                                        </Button>
                                                    </TableCell>

                                                    <TableCell align="left" style={{ fontSize: "11px" }}>
                                                        {
                                                            row.out_time ?
                                                                <>
                                                                    <Iconify icon="icomoon-free:meter" color="success" style={{ color: "green" }} />
                                                                    <strong> {row.out_odometer_reading}  </strong>
                                                                    <br /><Iconify icon="ic:twotone-access-time" color="success" style={{ color: "red" }} /> {fDateTime(row.out_time)}
                                                                    <br />
                                                                    <Button color="warning" variant="soft" onClick={() => handleClickOpenOut(row.register_vehicle_id)} style={{ color: '#32875D', fontSize: '14px' }}>
                                                                        <Iconify icon="material-symbols:image" />
                                                                    </Button>
                                                                </>
                                                                : <span style={{color:"red"}}>Not Done Yet</span>
                                                        }


                                                    </TableCell>

                                                    <TableCell align="left" style={{ fontSize: "13px", fontWeight: 'bold' }}>
                                                        {row.in_odometer_reading && row.out_odometer_reading
                                                            ? row.out_odometer_reading - row.in_odometer_reading
                                                            : 0} Km.</TableCell>



                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        :
                                        <SkeletonView />
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{singleActivity.vehicle_no} ({inOut} Odometer)</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box component="img" alt='Meter Img' src={imgUrl} sx={{ width: 250, borderRadius: 1.5, flexShrink: 0 }} />
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Page>
    );
}
