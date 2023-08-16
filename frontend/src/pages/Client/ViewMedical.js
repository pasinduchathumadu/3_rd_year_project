import { FormControl, Typography, TextField, Avatar } from '@mui/material';
import React from 'react';
import BackgroundImage from '../../assests/medical-reports.jpeg';
import PDFIcon from '../../assests/pdf.jpeg';
import Box from '@mui/material/Box';
import ProfilePhoto from '../../assests/oip.jpg';

const ViewMedical = () => {
    return (
        <div style={{ marginTop: '4%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '45%', marginRight: '5%' }}>
                <Typography sx={{ position: 'absolute', fontSize: '50px', fontWeight: 'bold', marginLeft: '80px', marginTop: '150px' }}>Your Pets Medical Reports</Typography>
                <img src={BackgroundImage} alt="background image" style={{ height: '700px' }} />
            </div>
            <div style={{ width: '50%', marginLeft: '3%' }}>
                <div style={{ margin: '10px', padding: '20px', backgroundColor: '#f0f0f5', borderRadius: '10px', marginTop: '30px' }}>
                    <FormControl>
                        <Typography sx={{ fontSize: '30px', marginLeft: '250px' }}>Pet Details </Typography>
                        <Avatar src={ProfilePhoto} alt="profile" sx={{height:'100px', width:'100px', marginLeft:'270px'}} />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
                            <div>
                                <Typography>Pet ID :</Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            // label="04"
                                            defaultValue="04"
                                        /></div>
                                </Box>
                            </div>

                            <div>
                                <Typography>Pet Name :</Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            // label="Jimmy Boy"
                                            defaultValue="Jimmy Boy"
                                        /></div>
                                </Box>
                            </div>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>
                            <div>
                                <Typography>Category :</Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue="Dog"
                                        /></div>
                                </Box>
                            </div>

                            <div>
                                <Typography>Breed :</Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue="Jerman Shepard"
                                        /></div>
                                </Box>
                            </div>

                        </div>

                        <div style={{ width: '650px', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginBottom: '15px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Vaccination Records :</Typography>
                            <div>
                                <img src={PDFIcon} alt="pdf" style={{ height: '70px', width: 'auto' }} />
                            </div>
                        </div>

                        <div style={{ width: '650px', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginBottom: '15px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>X -ray Records :</Typography>
                            <div>
                                <img src={PDFIcon} alt="pdf" style={{ height: '70px', width: 'auto' }} />
                                <img src={PDFIcon} alt="pdf" style={{ height: '70px', width: 'auto' }} />
                                <img src={PDFIcon} alt="pdf" style={{ height: '70px', width: 'auto' }} />

                            </div>
                        </div>
                    </FormControl>

                </div>

            </div>
        </div>
    )

}

export default ViewMedical;