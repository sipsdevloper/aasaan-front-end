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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// components
import Page from '../components/Page';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

// mock
import USERLIST from '../_mock/user';
import axios, { instance3 } from '../axios';


export default function UserAdd() {

  const [result, setResult] = useState([])
  const [error, setError] = useState([])
  const [message, setMessage] = useState()
  const [userId, setuserId] = useState("")
  const [userName, setUserName] = useState("")
  const [contactNo, setContactNo] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    resultAction()
  }, [result])
  async function addUser() {

    const formData = new FormData()
    formData.append("user_id", userId)
    formData.append("user_name", userName)
    formData.append("contact_no", contactNo)
    formData.append("create_date", new Date().toJSON())

    /* let result = await fetch("http://localhost:8000/api/blog/add", {
      method: 'POST',    
      body: formData
    })
    result = await result.json()
    */
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token)
    const headers = {
      'Authorization': token
    }

    await instance3.post('/user/user_add', formData, { headers })
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
    if (result.msg === "User added successfully.") {
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
            Add New User
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
            <TextField required id="user_id" label="User Id" variant="standard" style={{ width: '100%' }} value={userId} onChange={(e) => setuserId(e.target.value)} />
            {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.user_id}</span> : ""}

            <TextField required id="name" label="User Name" variant="standard" style={{ width: '100%' }} value={userName} onChange={(e) => setUserName(e.target.value)} />
            {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.user_name}</span> : ""}

            <TextField required type="number" id="contact_no" label="Contact Number" variant="standard" style={{ width: '100%' }} value={contactNo} onChange={(e) => setContactNo(e.target.value)} helperText={`${contactNo.length}/10`}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 10)
              }} />
            {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.contact_no}</span> : ""}

            {message ? <Alert severity="error" style={{ width: "100%" }}>{message.msg}</Alert> : ""}


            <br /><br />
            <Button variant="contained" onClick={() => addUser()}>Add User</Button>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
