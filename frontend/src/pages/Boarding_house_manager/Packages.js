import React, { useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import ProfilePicture from '../../assests/profile-picture.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormLabel, TextField, Typography } from "@mui/material";
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';


const Packages = () => {
    const [new1, setNew] = useState(true);  //package cards
    const [form, setForm] = useState(false); //add new package form
    const [updateform, setUpdateform] = useState(false); //update form
    const [popularity, setPopularity] = useState(false); // popularity

    // after click on add new package button
    const Change = () => {
        setNew(false);
        setForm(true);
    }
    // after click on submit button on the add new package form
    const afterSubmit = () => {
        // check
        setNew(true);
        setForm(false);
    }
    // cancel button of adding new package
    const cancelAdding = () => {
        setForm(false);
        setNew(true);
    }
    // after click on update icon
    const update = () => {
        setNew(false);
        setUpdateform(true);
    }
    // after click on submit button on update form
    const afterUpdate = () => {
        // check
        setNew(true);
        setUpdateform(false);
    }
    // click on cancel button ofupdate package
    const cancelUpdate = () => {
        setUpdateform(false);
        setNew(true);
    }

    // after click on view popularity
    const clickPopularity = () => {
        setNew(false);
        setPopularity(true);
    }

    // finish the viewing
    const afterview = () => {
        setNew(true);
        setPopularity(false);
    }

    return (
        <div className="home-container" style={{marginTop:'4%'}} >
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <Box sx={{ width: '95%', marginTop: '10px', marginBottom: '10px', marginLeft: '35px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    variant="fullWidth"
                    aria-label="Tab Component"
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >

                    <Tab sx={{ backgroundColor: 'orange', color: 'white' }} label="Boarding House Packages" ></Tab>
                </Tabs>
            </Box>

            <div className="top-button-header">
                <Button variant="contained" onClick={() => Change()} sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>Add New Package <AddIcon sx={{ marginLeft: '10px' }} /></Button>
                <Button variant="contained" onClick={() => clickPopularity()} sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>View Popularity</Button>
            </div>

            {new1 && (
                <div className="boarding-card-line">
                    <div className="boarding-card">
                        <div className="boarding-two-icon">
                            <EditIcon onClick={() => update()} />
                            <DeleteIcon color="error" sx={{ marginLeft: '15px' }} />
                        </div>
                        <Typography sx={{ color: '#FBBD08', fontSize: '35px', fontWeight: 'bold' }}>Gold</Typography>
                        <Typography sx={{ color: 'black', fontSize: '55px', fontWeight: 'bold' }}>Rs. 4000</Typography>
                        <Typography sx={{ color: '#C0C0C0', fontSize: '25px', fontWeight: 'bold' }}>/ week</Typography>
                        <div className="boarding-card-facility">
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 01</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 02</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 03</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 04</p>
                        </div>
                    </div>

                    <div className="boarding-card">
                        <div className="boarding-two-icon">
                            <EditIcon onClick={() => update()} />
                            <DeleteIcon color="error" sx={{ marginLeft: '15px' }} />
                        </div>
                        <Button variant="contained" sx={{ background: "#fe9e0d", ':hover': { backgroundColor: "#fe9e0d" } }}>most popular</Button>
                        <Typography sx={{ color: '#A6A6A6', fontSize: '35px', fontWeight: 'bold' }}>Silver</Typography>
                        <Typography sx={{ color: 'black', fontSize: '55px', fontWeight: 'bold' }}>Rs. 3000</Typography>
                        <Typography sx={{ color: '#C0C0C0', fontSize: '25px', fontWeight: 'bold' }}>/ week</Typography>
                        <div className="boarding-card-facility">
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 01</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 02</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 03</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 04</p>
                        </div>
                    </div>

                    <div className="boarding-card">
                        <div className="boarding-two-icon">
                            <EditIcon onClick={() => update()} />
                            <DeleteIcon color="error" sx={{ marginLeft: '15px' }} />
                        </div>
                        <Typography sx={{ color: '#55555C', fontSize: '35px', fontWeight: 'bold' }}>Platinum</Typography>
                        <Typography sx={{ color: 'black', fontSize: '55px', fontWeight: 'bold' }}>Rs. 2000</Typography>
                        <Typography sx={{ color: '#C0C0C0', fontSize: '25px', fontWeight: 'bold' }}>/ week</Typography>
                        <div className="boarding-card-facility">
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 01</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 02</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 03</p>
                            <p><CheckIcon sx={{ marginRight: '20px' }} />Facility 04</p>
                        </div>
                    </div>
                </div>
            )}

            {/* add a new package */}
            {form && (
                <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                        <div className="form-topic">
                            Add New Package
                        </div>
                        <hr />
                        <div style={{ marginTop: '20px' }} className="form-label">
                            <FormLabel>Package Name</FormLabel>
                            <TextField id="outlined-basic" placeholder="Package Name" variant="outlined" />
                        </div>

                        <div className="form-label">
                            <FormLabel>Price(per week) Rs.</FormLabel>
                            <TextField id="outlined-basic" placeholder="Package Price" variant="outlined" />
                        </div>

                        <div className="form-label">
                            <FormLabel>Facilities</FormLabel>
                            <TextField id="outlined-basic" placeholder="Facility 01" variant="outlined" sx={{ marginBottom: '5px' }} />
                            <TextField id="outlined-basic" placeholder="Facility 02" variant="outlined" sx={{ marginBottom: '5px' }} />
                            <TextField id="outlined-basic" placeholder="Facility 03" variant="outlined" sx={{ marginBottom: '5px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button variant="contained" onClick={() => afterSubmit()} sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Add Package</Button>
                            <Button variant="contained" onClick={() => cancelAdding()} sx={{ background: "red", marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px', width: '100%' }}> Cancel</Button>
                        </div>

                    </div>
                </FormControl>
            )}

            {/* update package */}
            {updateform && (
                <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                    <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                        <div className="form-topic">
                            Update Package
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div className="form-label">
                                <FormLabel>Package ID : </FormLabel>
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
                                            label=""
                                            defaultValue="02"
                                        /></div>

                                </Box>
                            </div>
                            <div className="form-label">
                                <FormLabel>Package Name : </FormLabel>
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
                                            required
                                            id="outlined-required"
                                            label=""
                                            defaultValue="Gold"
                                        /></div>

                                </Box>
                            </div>
                        </div>

                        <div className="form-label">
                            <FormLabel>Price(per week) Rs.</FormLabel>
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
                                        required
                                        type="number"
                                        id="outlined-required"
                                        label=""
                                        defaultValue="4000.00"
                                    /></div>

                            </Box>
                        </div>

                        <div className="form-label">
                            <FormLabel>Facilities</FormLabel>
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
                                        required
                                        id="outlined-required"
                                        label=""
                                        defaultValue="Facility 01"
                                    /></div>

                            </Box>
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
                                        required
                                        id="outlined-required"
                                        label=""
                                        defaultValue="Facility 02"
                                    /></div>

                            </Box>
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
                                        required
                                        id="outlined-required"
                                        label=""
                                        defaultValue="Facility 03"
                                    /></div>

                            </Box>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button variant="contained" onClick={() => afterUpdate()} sx={{ background: "#fe9e0d", marginTop: '10px', marginRight: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Update Package</Button>
                            <Button variant="contained" onClick={() => cancelUpdate()} sx={{ background: "red", marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px', width: '100%' }}> Cancel</Button>
                        </div>
                    </div>
                </FormControl>
            )}

            {/* remove a package */}


            {/* view popularity */}
            {popularity && (
                <div className="popularity-view">
                    <div className="form-topic">
                        Popularity
                    </div>

                    <div>
                        <PieChart
                            colors={['#FBBD08', '#A6A6A6', '#55555C']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 15, label: 'Gold' },
                                        { id: 1, value: 20, label: 'Silver' },
                                        { id: 2, value: 10, label: 'Platinum' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={300}
                        />
                    </div>
                    <Button variant="contained" onClick={() => afterview()} sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Finish Viewing</Button>
                </div>
            )}
        </div>
    )
}

export default Packages
