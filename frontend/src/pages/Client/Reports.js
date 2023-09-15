import React from "react";
import CoverImage from '../../assests/reportcover.jpeg';
import { Button, InputLabel, TextField, Typography } from "@mui/material"

const Reports = () => {

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

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '20%', height: '100vh', backgroundColor: '#F0F0F5', padding: '1%', borderRadius: '10px' }}>
                    <Button sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Boarding House Reports</Button>
                    <Button sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Online Store Reports</Button>
                    <Button sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Medi Help Center Reports</Button>
                    <Button sx={{ color: 'white', backgroundColor: 'black', borderRadius: '10px', padding: '3%', width: '100%', marginTop: '5%', marginBottom: '5%', ':hover': { backgroundColor: 'black' } }}>Care Center Reports</Button>
                </div>

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
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Request ID"
                                defaultValue="02"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ width: '40%' }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Client ID"
                                defaultValue="02"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ width: '40%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1%', marginBottom: '1%' }}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Pet ID"
                                defaultValue="02"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ width: '40%' }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Package"
                                defaultValue="Gold"
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{ width: '40%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%', marginBottom: '1%' }}>
                            <InputLabel>Boarding Time Period :</InputLabel>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' }}>

                                <TextField
                                    id="outlined-read-only-input"
                                    label="From "
                                    defaultValue="2023-08-10"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ width: '40%' }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="To "
                                    defaultValue="2023-08-14"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ width: '40%' }}
                                />
                            </div>

                            <div style={{ marginTop: '1%', marginBottom: '1%' }} >
                                <hr />
                            </div>
                            <div style={{ marginTop: '1%', marginBottom: '1%', display:'flex' ,flexDirection: 'row'}}>
                                <InputLabel> Payment (Rs) :</InputLabel>

                                <TextField
                                    id="outlined-read-only-input"
                                    // label="Payment "
                                    defaultValue="1200.00"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{marginLeft:'1%'}}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2%', marginBottom: '1%', marginLeft: '40%' }}>
                        <Button sx={{ color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: 'red' }, width: '25%' }}>Download</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Reports;