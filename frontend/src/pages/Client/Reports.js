import React, { useEffect, useState } from "react";
import CoverImage from '../../assests/reportcover.jpeg';
import { Button, InputLabel, Select, TextField, Typography } from "@mui/material"
import axios from "axios"

import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



const Reports = () => {

    const email = localStorage.getItem('client_email')
    const [board, setboardreport] = useState([])
    const [online, setonline] = useState([])
    const [value, setvalue] = useState(0)
    const [medi, setmedi] = useState([])
    const [care, setcare] = useState([])

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const download = async (price, placed_date, early_cancel_date, package_name, appointment_id, appointment_status, client_email) => {
        try {
            // Replace with the actual email

            // Add any additional data that the server requires to generate the PDF
            const requestData = {
                price,
                placed_date,
                early_cancel_date,
                package_name,
                appointment_id,
                appointment_status,
                client_email,
                item: 'Online-Store'
                // Add other data here if needed
            };

            const response = await axios.post('http://localhost:5000/pet_care/pdf/card', requestData, {
                responseType: 'blob' // Tell Axios to expect binary data in the response
            });

            // Create a blob with the PDF data from the response
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Create a link and trigger a click event to download the PDF
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf'; // You can set the desired filename
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
        }
    }
    const download_online = async (po_id, order_email, placed_date, placed_time, handover_date, payment, payment_method, collecting_method, shipping_address, shipping_number) => {
        try {
            // Replace with the actual email

            // Add any additional data that the server requires to generate the PDF
            const requestData = {

                po_id,
                order_email,
                placed_date,
                placed_time,
                handover_date,
                payment,
                payment_method,
                collecting_method,
                shipping_address,
                shipping_number,
                item: 'Online-Store'
                // Add other data here if needed
            };

            const response = await axios.post('http://localhost:5000/pet_care/pdf/card1', requestData, {
                responseType: 'blob' // Tell Axios to expect binary data in the response
            });

            // Create a blob with the PDF data from the response
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Create a link and trigger a click event to download the PDF
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf'; // You can set the desired filename
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
        }
    }

    const download_medi = async (
        appointment_id,
        client_email,
        placed_date,
        first_name,
        last_name,
        pet_id,
        payment,
    ) => {
        try {
            // Replace with the actual email

            // Add any additional data that the server requires to generate the PDF
            const requestData = {

                appointment_id,
                client_email,
                placed_date,
                first_name,
                last_name,
                pet_id,
                payment,
                item: 'Medi-Help Center'
                // Add other data here if needed
            };

            const response = await axios.post('http://localhost:5000/pet_care/pdf/card3', requestData, {
                responseType: 'blob' // Tell Axios to expect binary data in the response
            });

            // Create a blob with the PDF data from the response
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Create a link and trigger a click event to download the PDF
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf'; // You can set the desired filename
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
        }
    }

    const download_board = async (
        request_id,
        client_id,
        pet_id,
        package_name,
        board_arrival_date,
        board_carry_date,
        price) => {
        try {
            // Replace with the actual email

            // Add any additional data that the server requires to generate the PDF
            const requestData = {

                request_id,
                client_id,
                pet_id,
                package_name,
                board_arrival_date,
                board_carry_date,
                price,
                item: 'Boarding House'
                // Add other data here if needed
            };

            const response = await axios.post('http://localhost:5000/pet_care/pdf/card2', requestData, {
                responseType: 'blob' // Tell Axios to expect binary data in the response
            });

            // Create a blob with the PDF data from the response
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Create a link and trigger a click event to download the PDF
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf'; // You can set the desired filename
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
        }
    }


    const boardreport = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/boardreport/${email}`)
            const data = await res.data
            return data

        }
        catch (err) {
            console.log(err)

        }

    }
    const onlinereport = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/onlinereport/${email}`)
            const data = await res.data
            return data

        }
        catch (err) {
            console.log(err)

        }

    }
    const carecenterreport = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/carecenter/${email}`)
            const data = await res.data

            return data

        } catch (err) {
            console.log(err)

        }
    }
    const medireport = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/medireport/${email}`)
            const data = await res.data
            return data
        }
        catch (err) {
            console.log(err)

        }

    }


    useEffect(() => {
        boardreport()
            .then((data) => setboardreport(data.data))
            .catch((err) => console.log(err))
    })
    useEffect(() => {

        onlinereport()
            .then((data) => setonline(data.data))
            .catch((err) => console.log(err))
    })
    useEffect(() => {
        medireport()
            .then((data) => setmedi(data.data))
            .catch((err) => console.log(err))
    })

    useEffect(() => {

        carecenterreport()

            .then((data) => setcare(data.data))
            .catch((err) => console.log(err))
    })


    return (
        <div style={{ marginTop: '4%' }}>
            <div style={{
                borderRadius: '5px',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${CoverImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "15vh",
                width: "100%",
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            }}>




                <Typography sx={{ position: 'absolute', color: 'white', fontSize: '45px', padding: '20px', borderRadius: '10px', fontWeight: "30" }}> Your Reports</Typography>
                
            </div>
            <div style={{textAlign:'right',marginTop:'2%',marginRight:'2%'}}>
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl sx={{width:200}}>
                            <InputLabel id="demo-simple-select-label">Current</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Last 7 days</MenuItem>
                                <MenuItem value={20}>Last Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={{ width: '20%', height: '100vh', backgroundColor: '#F0F0F5', padding: '1%', borderRadius: '10px' }}>
                    <Button onClick={() => setvalue(1)} sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Online Store Reports</Button>
                    <Button onClick={() => setvalue(0)} sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Boarding House Reports</Button>

                    <Button onClick={() => setvalue(2)} sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Medi Help Center Reports</Button>
                    <Button onClick={() => setvalue(3)} sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Care Center Reports</Button>
                </div>
                {value === 1 && (
                    <div style={{ width: '80%', height: '100%', padding: '2%', margin: '2%', borderRadius: '10px', border: '#F0F0F5 2px', backgroundColor: '#F0F0F5' }}>
                        <div>
                            <Typography sx={{ fontWeight: '100', fontSize: '20px', marginTop: '1%', textAlign: 'center' }}> Happy Tails - Boarding House</Typography>
                            <Typography sx={{ fontWeight: '100', fontSize: '18px', marginTop: '1%', textAlign: 'center' }}><u>Online Store Receipt</u></Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Contact Number : 077123456</Typography>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Email Address  : happytails@gmail.com</Typography>
                            </div>
                        </div>
                        <hr />
                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                            {online && online.map((menu, index) => (
                                <><><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Purchase ID"
                                        defaultValue={menu.po_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Client Email"
                                        defaultValue={menu.order_email}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                </div><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="Placed Date"
                                            defaultValue={menu.placed_date}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '30%', marginRight: '2%' }} />
                                        <TextField

                                            id="outlined-read-only-input"
                                            label="Placed Time"
                                            defaultValue={menu.placed_time}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '40%' }} />
                                        <TextField

                                            id="outlined-read-only-input"
                                            label="Hand Over Date"
                                            defaultValue={menu.handover_date}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '30%', marginLeft: '2%' }} />

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%', marginLeft: '2%' }}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="Payment Method"
                                            defaultValue={menu.payment_method}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '30%', marginLeft: '15%' }} />
                                        <TextField

                                            id="outlined-read-only-input"
                                            label="Collecting Method"
                                            defaultValue={menu.collecting_method}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '30%', marginRight: '15%' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%', marginBottom: '1%', marginLeft: '2%' }}>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' }}>

                                            <TextField
                                                id="outlined-read-only-input"
                                                label="Shipping Address"
                                                defaultValue={menu.shipping_address}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                            <TextField
                                                id="outlined-read-only-input"
                                                label="Shipping Number "
                                                defaultValue={menu.shipping_number}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                        </div>

                                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                                            <hr />
                                        </div>
                                        <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', flexDirection: 'row' }}>
                                            <InputLabel> Payment (Rs) :</InputLabel>

                                            <TextField
                                                id="outlined-read-only-input"
                                                // label="Payment "
                                                defaultValue={menu.payment}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ marginLeft: '1%' }} />
                                        </div>
                                    </div></><div style={{ marginTop: '2%', marginBottom: '1%', marginLeft: '40%' }}>
                                        <Button
                                            onClick={() => download_online(
                                                menu.po_id,
                                                menu.order_email,
                                                menu.placed_date,
                                                menu.placed_time,
                                                menu.handover_date,
                                                menu.payment,
                                                menu.payment_method,
                                                menu.collecting_method,
                                                menu.shipping_address,
                                                menu.shipping_number,
                                            )} sx={{ color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: 'red' }, width: '25%' }}>Download</Button>
                                    </div></>

                            ))}
                        </div>


                    </div>

                )}

                {value === 0 && (
                    <div style={{ width: '80%', height: '100%', padding: '2%', margin: '2%', borderRadius: '10px', border: '#F0F0F5 2px', backgroundColor: '#F0F0F5' }}>
                        <div>
                            <Typography sx={{ fontWeight: '100', fontSize: '20px', marginTop: '1%', textAlign: 'center' }}> Happy Tails - Boarding House</Typography>
                            <Typography sx={{ fontWeight: '100', fontSize: '18px', marginTop: '1%', textAlign: 'center' }}><u>Boarding Receipt</u></Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Contact Number : 077123456</Typography>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Email Address  : happytails@gmail.com</Typography>
                            </div>
                        </div>
                        <hr />
                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                            {board && board.map((menu, index) => (
                                <><><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Request ID"
                                        defaultValue={menu.request_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Client ID"
                                        defaultValue={menu.client_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                </div><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="Pet ID"
                                            defaultValue={menu.pet_id}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '40%' }} />
                                        <TextField

                                            id="outlined-read-only-input"
                                            label="Package"
                                            defaultValue={menu.package_name}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '40%' }} />
                                    </div><div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%', marginBottom: '1%' }}>
                                        <InputLabel sx={{marginBottom:'2px'}}>Boarding Time Period :</InputLabel>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' }}>

                                            <TextField
                                                id="outlined-read-only-input"
                                                label="From "
                                                defaultValue={menu.board_arrival_date}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                            <TextField
                                                id="outlined-read-only-input"
                                                label="To "
                                                defaultValue={menu.board_carry_date}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                        </div>

                                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                                            <hr />
                                        </div>
                                        <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', flexDirection: 'row' }}>
                                            <InputLabel> Payment (Rs) :</InputLabel>

                                            <TextField
                                                id="outlined-read-only-input"
                                                // label="Payment "
                                                defaultValue={menu.price}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ marginLeft: '1%' }} />
                                        </div>
                                    </div></><div style={{ marginTop: '2%', marginBottom: '1%', marginLeft: '40%' }}>
                                        <Button
                                            onClick={() => download_board(
                                                menu.request_id,
                                                menu.client_id,
                                                menu.pet_id,
                                                menu.package_name,
                                                menu.board_arrival_date,
                                                menu.board_carry_date,
                                                menu.price
                                            )} sx={{ color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: 'red' }, width: '25%' }}>Download</Button>
                                    </div></>

                            ))}
                        </div>


                    </div>

                )}
                {value === 3 && (
                    <div style={{ width: '80%', height: '100%', padding: '2%', margin: '2%', borderRadius: '10px', border: '#F0F0F5 2px', backgroundColor: '#F0F0F5' }}>
                        <div>
                            <Typography sx={{ fontWeight: '100', fontSize: '20px', marginTop: '1%', textAlign: 'center' }}> Happy Tails - Boarding House</Typography>
                            <Typography sx={{ fontWeight: '100', fontSize: '18px', marginTop: '1%', textAlign: 'center' }}><u>carecenter Receipt</u></Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Contact Number : 077123456</Typography>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Email Address  : happytails@gmail.com</Typography>
                            </div>
                        </div>
                        <hr />
                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                            {care && care.map((menu, index) => (
                                <><><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>

                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Request ID"
                                        defaultValue={menu.appointment_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Client Email"
                                        defaultValue={menu.client_email}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                </div><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="Appointment Status"
                                            defaultValue={menu.appointment_status}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '40%' }} />
                                        <TextField

                                            id="outlined-read-only-input"
                                            label="Package Name"
                                            defaultValue={menu.package_name}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '40%' }} />
                                    </div><div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%', marginBottom: '1%' }}>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' }}>

                                            <TextField
                                                id="outlined-read-only-input"
                                                label="Placed Date"
                                                defaultValue={menu.placed_date}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                            <TextField
                                                id="outlined-read-only-input"
                                                label="Cancel Appoinment DATE"
                                                defaultValue={menu.early_cancel_date}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                        </div>

                                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                                            <hr />
                                        </div>
                                        <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', flexDirection: 'row' }}>
                                            <InputLabel> Payment (Rs) :</InputLabel>

                                            <TextField
                                                id="outlined-read-only-input"
                                                // label="Payment "
                                                defaultValue={menu.price}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ marginLeft: '1%' }} />
                                        </div>
                                    </div></><div style={{ marginTop: '2%', marginBottom: '1%', marginLeft: '40%' }}>

                                        <Button onClick={() => download(
                                            menu.price,
                                            menu.placed_date,
                                            menu.early_cancel_date,
                                            menu.package_name,
                                            menu.appointment_id,
                                            menu.appointment_status,
                                            menu.client_email
                                        )}
                                            sx={{ color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: 'red' }, width: '25%' }}>Download
                                        </Button>
                                    </div></>

                            ))}
                        </div>


                    </div>

                )}

                {value === 2 && (
                    <div style={{ width: '80%', height: '100%', padding: '2%', margin: '2%', borderRadius: '10px', border: '#F0F0F5 2px', backgroundColor: '#F0F0F5' }}>
                        <div>
                            <Typography sx={{ fontWeight: '100', fontSize: '20px', marginTop: '1%', textAlign: 'center' }}> Happy Tails - Boarding House</Typography>
                            <Typography sx={{ fontWeight: '100', fontSize: '18px', marginTop: '1%', textAlign: 'center' }}><u>Chanelling Receipt</u></Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Contact Number : 077123456</Typography>
                                <Typography sx={{ fontWeight: '100', fontSize: '14px', marginTop: '1%' }}> Email Address  : happytails@gmail.com</Typography>
                            </div>
                        </div>
                        <hr />
                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                            {medi && medi.map((menu, index) => (
                                <><><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Appointment ID"
                                        defaultValue={menu.appointment_id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Client Email"
                                        defaultValue={menu.client_email}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ width: '40%' }} />
                                </div><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="Placed Date"
                                            defaultValue={menu.placed_date}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '30%', marginRight: '2%' }} />
                                        <TextField
                                            id="outlined-read-only-input"
                                            label="Payment Method"
                                            defaultValue={"Card Payment Only"}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ width: '30%', marginLeft: '15%' }} />



                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%', marginBottom: '1%', marginLeft: '2%' }}>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' }}>

                                            <TextField
                                                id="outlined-read-only-input"
                                                label="Chanelling Doctor "
                                                defaultValue={"Dr." + menu.first_name + " " + menu.last_name}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                            <TextField
                                                id="outlined-read-only-input"
                                                label="Pet ID "
                                                defaultValue={menu.pet_id}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ width: '40%' }} />
                                        </div>

                                        <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                                            <hr />
                                        </div>
                                        <div style={{ marginTop: '1%', marginBottom: '1%', display: 'flex', flexDirection: 'row' }}>
                                            <InputLabel> Payment (Rs) :</InputLabel>

                                            <TextField
                                                id="outlined-read-only-input"
                                                // label="Payment "
                                                defaultValue={menu.payment}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ marginLeft: '1%' }} />
                                        </div>
                                    </div></><div style={{ marginTop: '2%', marginBottom: '1%', marginLeft: '40%' }}>
                                        <Button
                                            onClick={() => download_medi(
                                                menu.appointment_id,
                                                menu.client_email,
                                                menu.placed_date,
                                                menu.first_name,
                                                menu.last_name,
                                                menu.pet_id,
                                                menu.payment
                                            )} sx={{ color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: 'red' }, width: '25%' }}>Download</Button>
                                    </div></>

                            ))}

                        </div>


                    </div>

                )}





            </div>
        </div>
    )
}

export default Reports;