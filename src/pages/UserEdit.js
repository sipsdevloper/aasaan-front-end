import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// material
import {
    Card,
    Stack,
    Avatar,
    Button,
    Checkbox,
    Container,
    Typography,
    Alert
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, { instance3 } from '../axios';


export default function UserEdit() {
    const params = useParams();
    // let radix;
    // const id = parseInt(params.id, radix)

    const [result, setResult] = useState([])
    const [error, setError] = useState([])
    const [message, setMessage] = useState()
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [imeiNo, setImeiNo] = useState("")
    const [fcmToken, setFcmToken] = useState("")
    const [activeStatus, setActiveStatus] = useState("")
    // const [checked, setChecked] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getuser()
    }, [])
    useEffect(() => {
        resultAction()
    }, [result])

    async function getuser() {

        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token)
        const headers = {
            'Authorization': token
        }
        await instance3.get(`/user/user_single/${params.id}`, { headers })
            .then(response => {
                // setResult(response.data);
                setUserId(response.data.data.user_id)
                setUserName(response.data.data.user_name)
                setContactNo(response.data.data.contact_no)
                setImeiNo(response.data.data.imeino)
                setFcmToken(response.data.data.fcm_token)
                setActiveStatus(response.data.data.active_status)
            })
            .catch(error => "error");


        return result

    }

    const switchHandler = (event) => {
        setActiveStatus(event.target.checked);
    };

    async function updateUser() {

        const formData = new FormData()
        formData.append("user_id", userId)
        formData.append("user_name", userName)
        formData.append("contact_no", contactNo)
        formData.append("imeino", imeiNo)
        formData.append("fcm_token", fcmToken)
        if (activeStatus) {
            formData.append("active_status", 1)
        } else {
            formData.append("active_status", 0)
        }
        const token = JSON.parse(localStorage.getItem('token'));

        const headers = {
            'Authorization': token
        }

        await instance3.post('/user/user_update', formData, { headers })
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                // console.log(error.response.status)
                setMessage(error.response.data)
            });

    }

    function resultAction() {

        if (result.msg === "Validation Error.") {
            setError(result.errors)
        }
        if (result.msg === "User Data Updated Successfully.") {
            setError()
            navigate('/dashboard/user')

            // console.log(result)
        }
    }

    return (
        <Page title="User">

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update User
                    </Typography>
                    <Button variant="contained" component={RouterLink} to="/dashboard/user" startIcon={<Iconify icon="eva:list-fill" />}>
                        Users List
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
                        <TextField disabled id="user_id" label="User Id" variant="standard" style={{ width: '100%' }} value={userId} onChange={(e) => setUserId(e.target.value)} />
                        {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.user_id}</span> : ""}

                        <TextField required id="name" label="User Name" variant="standard" style={{ width: '100%' }} value={userName} onChange={(e) => setUserName(e.target.value)} />
                        {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.user_name}</span> : ""}

                        <TextField required type="number" id="contact_no" label="Contact Number" variant="standard" style={{ width: '100%' }} value={contactNo} onChange={(e) => setContactNo(e.target.value)} helperText={`${contactNo.length}/10`}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 10)
                            }} />
                        {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.contact_no}</span> : ""}

                        <TextField id="imei" label="IMEI No" variant="standard" style={{ width: '100%' }} value={imeiNo} onChange={(e) => setImeiNo(e.target.value)} />

                        <TextField id="fcm" label="FCM Token" variant="standard" style={{ width: '100%' }} value={fcmToken} onChange={(e) => setFcmToken(e.target.value)} />

                        <FormGroup>

                            <FormControlLabel control={<Switch checked={activeStatus} onChange={switchHandler} name="status" color="success" />} label="Active Status" />
                        </FormGroup>

                        {message ? <Alert severity="error" style={{ width: "100%" }}>{message.msg}</Alert> : ""}


                        <br /><br />
                        <Button variant="contained" onClick={() => updateUser()}>Update User</Button>
                    </Box>
                </Card>
            </Container>
        </Page>
    );
}
