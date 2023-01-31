import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import {
    Card,
    Stack,
    Avatar,
    Button,
    Checkbox,
    Container,
    Typography,
    Alert,
    FormControl,
    NativeSelect
} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoadingButton } from '@mui/lab';
import swal from 'sweetalert';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, { instance3 } from '../axios';


export default function AllocationAdd() {

    const [result, setResult] = useState([])
    const [error, setError] = useState("")
    const [message, setMessage] = useState()
    const [vehicleId, setVehicleId] = useState("")
    const [userId, setUserId] = useState("")
    const [userList, setUserList] = useState([])
    const [vehicleList, setVehicleList] = useState([])
    const [loading, setLoading] = useState("")


    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getVehicle();
    }, [])
    useEffect(() => {

    }, [error])
    useEffect(() => {
        resultAction()
    }, [result])

    async function getUser() {
        
        const token = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Authorization': token
        }
        instance3.get('user/available_user', { headers }).then(
            response => {
                setUserList(response.data.data)
            }
        ).catch(error => "error")
    }
    async function getVehicle() {
        const token = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Authorization': token
        }
        instance3.get('vehicle/available_vehicle', { headers }).then(
            response => {
                setVehicleList(response.data.data)
            }
        ).catch(error => "error")
    }
    async function addData() {
        const addBy = JSON.parse(localStorage.getItem('user')).user_id;
        if (vehicleId && userId) {
            setLoading(true)
            const formData = new FormData()
            formData.append("register_vehicle_id", vehicleId)
            formData.append("supervisor_id", userId)
            formData.append("userid", addBy)
            formData.append("createdate", new Date().toJSON())

            const token = JSON.parse(localStorage.getItem('token'));
            const headers = {
                'Authorization': token
            }

            await instance3.post('assign/vehicle_to_user', formData, { headers })
                .then(response => {
                    setResult(response.data);
                })
                .catch(error => {
                    // console.log(error.response.status)
                    setMessage(error.response.data)
                });
        } else {
            setError("Vehicle Id & User Id is mandatory field.")
        }


    }

    function resultAction() {

        if (result.msg === "Validation Error.") {
            setError(result.errors)
        }
        if (result.msg === "Vehicle Assigned successfully.") {
            setError()
            swal({
                title: "Success!",
                text: "Vehicle Assigned successfully!",
                icon: "success",
              });
            navigate('/dashboard/allocation')

            // console.log(result)
        }
    }

    return (
        <Page title="User">

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Allocate Vehicle to List
                    </Typography>
                    <Button variant="contained" component={RouterLink} to="/dashboard/allocation" startIcon={<Iconify icon="eva:list-fill" />}>
                        Allocation List
                    </Button>
                </Stack>

                <Card>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        style={{ padding: '20px' }}
                    >
                        <FormControl fullWidth>
                            <h5>Select User *</h5>
                            <NativeSelect
                                value={userId}
                                inputProps={{
                                    name: 'supervisor_id',
                                    id: 'uncontrolled-native'
                                }}
                                onChange={(e) => setUserId(e.target.value)}
                            >
                                <option value={""} >Select User</option>
                                {
                                    userList.map((row) => (
                                        <option value={row.user_id} >{row.user_name}</option>
                                    ))
                                }

                            </NativeSelect>
                            <br />

                        </FormControl>

                        <FormControl fullWidth>
                            <h5>Select Vehicle *</h5>
                            <NativeSelect
                                value={vehicleId}
                                inputProps={{
                                    name: 'vehicle_id',
                                    id: 'uncontrolled-native'
                                }}
                                onChange={(e) => setVehicleId(e.target.value)}
                            >
                                <option value={""} >Select Vehicle</option>
                                {
                                    vehicleList.map((row) => (
                                        <option value={row.id} >{row.vehicle_no} ({row.owner_name})</option>
                                    ))
                                }

                            </NativeSelect>
                            <br />

                        </FormControl>

                        {error ? <Alert severity="error" style={{ width: "100%" }}>{error}</Alert> : ""}


                        <br /><br />
                        <LoadingButton fullWidth  variant="contained" onClick={() => addData()} loading={loading}>
                            Allocate Vehicle
                        </LoadingButton>
                        {/* <Button variant="contained" onClick={() => addData()}>Allocate Vehicle</Button> */}
                    </Box>
                </Card>
            </Container>
        </Page>
    );
}
