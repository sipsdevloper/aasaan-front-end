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
    FormControl,
    InputLabel,
    NativeSelect,
    Grid,
    Alert
} from '@mui/material';
import { border } from '@mui/system';
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



export default function VehicleAdd() {
    const [error, setError] = useState([])
    const [message, setMessage] = useState()
    const [result, setResult] = useState([])
    const [division, setDivision] = useState([])
    const [divisionForm, setDivisionForm] = useState([])
    const [subDivision, setSubDivision] = useState([])
    const [subDivisionForm, setSubDivisionForm] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [vehicleTypeForm, setVehicleTypeForm] = useState([])
    const [fuelType, setFuelType] = useState([])
    const [fuelTypeForm, setFuelTypeForm] = useState([])
    const [vehicleNo, setVehicleNo] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [address, setAddress] = useState("")
    const [panCardNo, setPanCardNo] = useState("")
    const [aadharCard, setAadharCard] = useState("")
    const [bank, setBank] = useState([])
    const [bankForm, setBankForm] = useState("")
    const [ifscCode, setIfscCode] = useState("")
    const [accountNo, setAccountNo] = useState("")
    const [avgKm, setAvgKm] = useState("")
    const [monthlyFixRate, setMonthlyFixRate] = useState([])
    const [monthlyRate, setMonthlyRate] = useState([])
    const [monthlyRateForm, setMonthlyRateForm] = useState([])

    const [rcImage, setRcImage] = useState("")
    const [vehicleImage, setVehicleImage] = useState("")

    const [inputList, setInputList] = useState([{ description: "", image: "" }]);
    // const [description, setDescription] = useState([])
    // const [image, setImage] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getMasData()

    }, [])

    useEffect(() => {
        getSubDivision()
    }, [divisionForm])

    useEffect(() => {
        resultAction()
    }, [result])

    async function getMasData() {

        await instance3.get(`mas/division`)
            .then(response => {
                setDivision(response.data.data);

            })
            .catch(error => "error");

        await instance3.get(`mas/vehicle_type`)
            .then(response => {
                setVehicleType(response.data.data);

            })
            .catch(error => "error");

        await instance3.get(`mas/fuel_type`)
            .then(response => {
                setFuelType(response.data.data);

            })
            .catch(error => "error");

        await instance3.get(`mas/banks`)
            .then(response => {
                setBank(response.data.data);

            })
            .catch(error => "error");
        await instance3.get(`mas/monthly_rate`)
            .then(response => {
                setMonthlyRate(response.data.data);

            })
            .catch(error => "error");
        // console.log(result)
        // return result
    }

    async function getSubDivision() {

        await instance3.get(`mas/subdivision/${divisionForm}`)
            .then(response => {
                setSubDivision(response.data.data);
                // console.log(error.response)
            })
            .catch(error => "erro")
    }

    async function addBlog() {

        // console.log(inputList)
        const formData = new FormData()
        formData.append("divcode", divisionForm)
        formData.append("sub_divcode", subDivisionForm)
        formData.append("vehicle_type_id", vehicleTypeForm)
        formData.append("fuel_type_id", fuelTypeForm)
        formData.append("vehicle_no", vehicleNo)
        formData.append("owner_name", ownerName)
        formData.append("contact_no", contactNo)
        formData.append("address", address)
        formData.append("pancard_no", panCardNo)
        formData.append("aadhaar_card", aadharCard)
        formData.append("bank_id", bankForm)
        formData.append("ifsc_code", ifscCode)
        formData.append("account_no", accountNo)
        formData.append("avg_km", avgKm)
        formData.append("createdate", new Date().toJSON())
        formData.append("userid", JSON.parse(localStorage.getItem('user')).user_id)
        formData.append("monthly_fixed_rate", monthlyFixRate)
        formData.append("monthly_rate_id", monthlyRateForm)

        // formData.append("description_image", JSON.stringify(inputList))
        formData.append("rc_image", rcImage)
        formData.append("vehicle_image", vehicleImage)

        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token)
        const headers = {
            'Authorization': token
        }

        await instance3.post('vehicle/add_web', formData, { headers })
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
        if (result.msg === "Data added successfully.") {
            setError()
            navigate('/dashboard/vehicle')

            // console.log(result)
        }
    }




    return (
        <Page title="User">

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add New Vehicle
                    </Typography>
                    <Button variant="contained" component={RouterLink} to="/dashboard/vehicle" startIcon={<Iconify icon="eva:list-fill" />}>
                        Vehicles
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
                        <Grid container spacing={2} style={{ width: '100%' }}>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <h5>Select Division *</h5>
                                    <NativeSelect
                                        value={divisionForm}
                                        inputProps={{
                                            name: 'division_id',
                                            id: 'uncontrolled-native'
                                        }}
                                        onChange={(e) => setDivisionForm(e.target.value)}
                                    >
                                        <option value={""} >Select Division</option>
                                        {
                                            division.map((row) => (
                                                <option value={row.divcode} >{row.division_name}</option>
                                            ))
                                        }

                                    </NativeSelect>
                                    <br />
                                    {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.divcode}</span> : ""}

                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <h5>Select Sub Division *</h5>
                                    <NativeSelect
                                        value={subDivisionForm}
                                        inputProps={{
                                            name: 'sub_division_id',
                                            id: 'uncontrolled-native'
                                        }}
                                        onChange={(e) => setSubDivisionForm(e.target.value)}
                                    >
                                        <option value={""} >Select Sub Division</option>
                                        {
                                            subDivision.map((row) => (
                                                <option value={row.sub_divcode} >{row.sub_division_name}</option>
                                            ))
                                        }

                                    </NativeSelect>
                                    <br />
                                    {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.sub_divcode}</span> : ""}

                                </FormControl>

                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <h5>Select Vehicle Type *</h5>
                                    <NativeSelect
                                        value={vehicleTypeForm}
                                        inputProps={{
                                            name: 'vehicle_type',
                                            id: 'uncontrolled-native'
                                        }}
                                        onChange={(e) => setVehicleTypeForm(e.target.value)}
                                    >
                                        <option value={""} >Select Vehicle Type</option>
                                        {
                                            vehicleType.map((row) => (
                                                <option value={row.vehicle_type_id} >{row.vehicle_type_name}</option>
                                            ))
                                        }

                                    </NativeSelect>
                                    <br />
                                    {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.vehicle_type_id}</span> : ""}

                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <h5>Select Fuel Type *</h5>
                                    <NativeSelect
                                        value={fuelTypeForm}
                                        inputProps={{
                                            name: 'fuel_type',
                                            id: 'uncontrolled-native'
                                        }}
                                        onChange={(e) => setFuelTypeForm(e.target.value)}
                                    >
                                        <option value={""} >Select Fuel Type</option>
                                        {
                                            fuelType.map((row) => (
                                                <option value={row.fuel_id} >{row.fuel_type}</option>
                                            ))
                                        }

                                    </NativeSelect>
                                    <br />
                                    {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.fuel_type_id}</span> : ""}

                                </FormControl>

                            </Grid>
                            <Grid item xs={6}>
                                <TextField required id="vehicleNo" label="Vehicle Number" variant="standard" style={{ width: '100%' }} value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.vehicle_no}</span> : ""}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="ownerName" required label="Owner Name" variant="standard" style={{ width: '100%' }} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.owner_name}</span> : ""}
                            </Grid>

                            <Grid item xs={6}>
                                <TextField required type="number" id="contactNo"  label="Contact Number" variant="standard" style={{ width: '100%' }} value={contactNo} onChange={(e) => setContactNo(e.target.value)} helperText={`${contactNo.length}/10`}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value,10)).toString().slice(0, 10)
                                }}/>
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.contact_no}</span> : ""}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="address" label="Address" variant="standard" style={{ width: '100%' }} value={address} onChange={(e) => setAddress(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.address}</span> : ""}
                            </Grid>

                            <Grid item xs={6}>
                                <TextField id="panCardNo" label="Pan Card Number" variant="standard" style={{ width: '100%' }} value={panCardNo} onChange={(e) => setPanCardNo(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.pancard_no}</span> : ""}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="number" required id="aadharCard" label="Aadhar Card"  variant="standard" style={{ width: '100%' }} value={aadharCard} onChange={(e) => setAadharCard(e.target.value)} 
                                helperText={`${aadharCard.length}/12`}
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value,10)).toString().slice(0, 12)
                                }} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.aadhaar_card}</span> : ""}
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <h5>Select Bank</h5>
                                    <NativeSelect
                                        value={bankForm}
                                        inputProps={{
                                            name: 'fuel_type',
                                            id: 'uncontrolled-native'
                                        }}
                                        onChange={(e) => setBankForm(e.target.value)}
                                    >
                                        <option value={""} >Select Bank</option>
                                        {
                                            bank.map((row) => (
                                                <option value={row.bank_id} >{row.bank_name}</option>
                                            ))
                                        }

                                    </NativeSelect>
                                    <br />
                                    {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.bank}</span> : ""}

                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="ifscCode" label="IFSC Code" variant="standard" style={{ width: '100%' }} value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.ifscCode}</span> : ""}
                            </Grid>
                            <Grid item xs={4}>
                                <TextField type="number" id="accountNo" label="Account No." variant="standard" style={{ width: '100%' }} value={accountNo} onChange={(e) => setAccountNo(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.accountNo}</span> : ""}
                            </Grid>

                            <Grid item xs={4}>
                                <TextField type="number" id="avgKm" label="Avg Km" variant="standard" style={{ width: '100%' }} value={avgKm} onChange={(e) => setAvgKm(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.avg_km}</span> : ""}
                            </Grid>

                            <Grid item xs={4}>
                                <TextField type="number" id="monthlyFixRate" label="Monthly Fix Rate" variant="standard" style={{ width: '100%' }} value={monthlyFixRate} onChange={(e) => setMonthlyFixRate(e.target.value)} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.monthly_fixed_rate}</span> : ""}
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <h5>Select Monthly Rate *</h5>
                                    <NativeSelect
                                        value={monthlyRateForm}
                                        inputProps={{
                                            name: 'fuel_type',
                                            id: 'uncontrolled-native'
                                        }}
                                        onChange={(e) => setMonthlyRateForm(e.target.value)}
                                    >
                                        <option value={""} >Select Monthly Rate</option>
                                        {
                                            monthlyRate.map((row) => (
                                                <option value={row.monthly_rate_id} >{row.monthly_rate_name} (Rs. {row.monthly_rate}/Km)</option>
                                            ))
                                        }

                                    </NativeSelect>
                                    <br />
                                    {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.monthly_rate_id}</span> : ""}

                                </FormControl>
                            </Grid>



                            <Grid item xs={6}>
                                <h5>RC Image *</h5>
                                <TextField type="file" variant="standard" style={{ width: '100%' }} onChange={(e) => setRcImage(e.target.files[0])} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.rc_image}</span> : ""}
                            </Grid>
                            <Grid item xs={6}>
                                <h5>Vehicle Image *</h5>

                                <TextField type="file" variant="standard" style={{ width: '100%' }} onChange={(e) => setVehicleImage(e.target.files[0])} />
                                {error ? <span style={{ color: "red", fontSize: "12px" }}>{error.vehicle_image}</span> : ""}
                            </Grid>


                        </Grid>
                        <br />

                        {message ? <Alert severity="error" style={{ width: "100%" }}>{message.msg}</Alert> : ""}

                        <br />
                        <Button variant="contained" onClick={() => addBlog()}>Add Vehicle</Button>
                    </Box>
                </Card>
            </Container>
        </Page>
    );
}
