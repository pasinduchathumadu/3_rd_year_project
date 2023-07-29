import React, { useState } from 'react';
import Header from "../../components/Layout/Header";
import ProfilePicture from '../../assests/profile-picture.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormLabel, TextField } from "@mui/material";
import Image from '../../assests/profile.jpg';
import PetImage from '../../assests/dog1.jpg';
import PetImage1 from '../../assests/dog.jpg';

// data for clients
function createData1(id, name, email, contact, address, category) {
    return { id, name, email, contact, address, category };
}

const clientrows = [
    createData1(1, "John Deo", 'abcq@gmail.com', '0771234432', 'No. 23, Main Street, Maharagama', 'premium'),
    createData1(2, "Griya Fernando", 'abcd@gmail.com', '0771234432', 'No. 20, Seocnd Street, Nugegoda', 'regular'),
    createData1(3, "Theraa Perera", 'abcc@gmail.com', '0771234432', 'No. 90, Down Street, Kottawa', 'premium'),
    createData1(4, "King Kimuthu", 'abcs@gmail.com', '0771234432', 'No. 3, Third Street, Colombo 07', 'premium'),
    createData1(5, "Jessy Geo", 'abcr@gmail.com', '0771234432', 'No. 2, Galle Road, Colombo 07', 'regular'),
];

// data for managers
function createData2(id, name, email, contact, address, store) {
    return { id, name, email, contact, address, store };
}

const managerows = [
    createData2(1, "John Deo", 'abcx@gmail.com', '0771234432', 'No. 23, Main Street, Maharagama', 'medi-help'),
    createData2(2, "Griya Fernando", 'abcw@gmail.com', '0771234432', 'No. 20, Seocnd Street, Nugegoda', 'online-store'),
    createData2(3, "Theraa Perera", 'abcu@gmail.com', '0771234432', 'No. 90, Down Street, Kottawa', 'boarding-house'),
    createData2(4, "King Kimuthu", 'abcl@gmail.com', '0771234432', 'No. 3, Third Street, Colombo 07', 'care-center'),
    createData2(5, "Jessy Geo", 'abck@gmail.com', '0771234432', 'No. 2, Galle Road, Colombo 07', 'company'),
];


const Users = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [users, setUsers] = useState(0);
    const handleForm = (event, existing_value) => {
        setUsers(existing_value)
    };

    const [add, setadd] = useState(false);
    const [update, setupdate] = useState(false);
    const [pet, setpet] = useState(false);

    // click on add manager button
    const addManager = () => {
        setUsers(false);
        setadd(true);
    }
    // after entering detials of new mamager
    const submitManager = () => {
        setadd(false);
        setUsers(0);
    }

    // click on update icon
    const updateManager = () => {
        setUsers(false);
        setupdate(true);
    }
    // after updating details
    const FinishUpdate = () => {
        setupdate(false);
        setUsers(0);
    }
    // clients pet viewing
    const PetViewing = () => {
        setUsers(false);
        setpet(true);
    }

    // finish clients pet viewing
    const FinishPetViewing = () => {
        setpet(false);
        setUsers(1);
    }


    return (
        <div className="home-container">

            <Header />
            <div className="top">
                <div className="top-line">
                    <p>Administator</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={users}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: users === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Managers" ></Tab>
                    <Tab sx={{ backgroundColor: users === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients"></Tab>
                </Tabs>
            </Box>

            {/* managers viewing */}
            {users === 0 && (
                <div>
                    <div className="top-button-header">
                        <Button variant="contained" onClick={() => addManager()} sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>Add New Manager </Button>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">Manager ID</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Contact Number</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">Work</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {managerows.map((managerow) => (
                                        <TableRow key={managerow.id}>
                                            <TableCell align="center"><img src={Image} style={{ width: '80px', borderRadius: '50%' }} alt="image" /></TableCell>
                                            <TableCell align="center">{managerow.id}</TableCell>
                                            <TableCell align="center">{managerow.name}</TableCell>
                                            <TableCell align="center">{managerow.email}</TableCell>
                                            <TableCell align="center">{managerow.contact}</TableCell>
                                            <TableCell align="center">{managerow.address}</TableCell>
                                            {/* <TableCell align="center">{managerow.nic}</TableCell> */}
                                            <TableCell align="center">{managerow.store}</TableCell>
                                            <TableCell align="center"><EditIcon onClick={() => updateManager()} /><DeleteIcon sx={{ color: 'red' }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                </div>
            )}

            {/* clients viewing */}
            {users === 1 && (
                <div>
                    <div className="drop-down-box">
                        <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clients}
                                    variant='filled'
                                    label="clients"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '11px' }}>
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Premium</MenuItem>
                                    <MenuItem value={3}>Regular</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Client ID</TableCell>
                                        <TableCell align="center"> Name</TableCell>
                                        <TableCell align="center"> Email</TableCell>
                                        <TableCell align="center">Contact Numebr</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientrows.map((clientrow) => (
                                        <TableRow key={clientrow.id}>
                                            <TableCell align="center">{clientrow.id}</TableCell>
                                            <TableCell align="center">{clientrow.name}</TableCell>
                                            <TableCell align="center">{clientrow.email}</TableCell>
                                            <TableCell align="center">{clientrow.contact}</TableCell>
                                            <TableCell align="center">{clientrow.address}</TableCell>
                                            <TableCell align="center">{clientrow.category}</TableCell>
                                            <TableCell align="center"><Button onClick={() => PetViewing()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pet Details</Button></TableCell>
                                            <TableCell align="center"><DeleteIcon sx={{ color: 'red' }} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}


            {/* managers adding */}
            {add && (
                <div>
                    <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                Add New Manager
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel> Name</FormLabel>
                                    <TextField id="outlined-basic" placeholder="Manager Name" type="text" variant="outlined" sx={{ width: '300px' }} />
                                </div>
                                <div className="form-label">
                                    <FormLabel> Email Address</FormLabel>
                                    <TextField id="outlined-basic" placeholder="youremail@gmail.com" type="email" variant="outlined" sx={{ width: '300px' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel> Contact Number</FormLabel>
                                    <TextField id="outlined-basic" placeholder="Contact Number" type="text" variant="outlined" sx={{ width: '300px' }} />
                                </div>
                                <div className="form-label">
                                    <FormLabel> Address</FormLabel>
                                    <TextField id="outlined-basic" placeholder=" Address" type="text" variant="outlined" sx={{ width: '300px' }} />
                                </div>
                            </div>
                            <div className="form-label">
                                <FormLabel> Store</FormLabel>
                                <TextField id="outlined-basic" placeholder=" Store" variant="outlined" />
                            </div>
                            <div className="form-label">
                                <FormLabel> Profile Picture</FormLabel>
                                <input type="file"></input>
                            </div>
                            <Button variant="contained" onClick={() => submitManager()} sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Add </Button>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* update manager details */}
            {update && (
                <div>
                    <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                Update Managers Details
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>Manager ID : 02</FormLabel>
                                </div>
                                <div className="form-label">
                                    <FormLabel>Name : Gerry Perera</FormLabel>
                                </div>
                            </div>
                            <div className="form-label">
                                <FormLabel>Email Address : manager1@gmail.com</FormLabel>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel> Contact Number</FormLabel>
                                    <TextField id="outlined-basic" placeholder="Contact Number" type="text" variant="outlined" sx={{ width: '300px' }} />
                                </div>
                                <div className="form-label">
                                    <FormLabel> Address</FormLabel>
                                    <TextField id="outlined-basic" placeholder=" Address" type="text" variant="outlined" sx={{ width: '300px' }} />
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel>Profile Picture</FormLabel>
                                <input type="file" placeholder=" Choose a file" variant="outlined" />
                            </div>
                            <Button variant="contained" onClick={() => FinishUpdate()} sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Update</Button>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* clients' pet details */}
            {pet && (
                <div>
                    <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                Pet Details
                            </div>

                            <div className="form-label">
                                <p>Number of Pets : 02</p>
                            </div>

                            <div style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '10px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Pet ID : 02 </FormLabel>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>  Pet Category : Dog </FormLabel>
                                    </div>
                                </div>
                                <div className="form-label">
                                    <img src={PetImage} alt="pet image" style={{ width: '200px', height: 'auto', marginLeft: '180px' }} />
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Pet ID : 05 </FormLabel>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>  Pet Category : Dog </FormLabel>
                                    </div>
                                </div>
                                <div className="form-label">
                                    <img src={PetImage1} alt="pet image" style={{ width: '200px', height: 'auto', marginLeft: '180px' }} />
                                </div>
                            </div>

                            <Button variant="contained" onClick={() => FinishPetViewing()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>OK</Button>
                        </div>
                    </FormControl>
                </div>
            )}

        </div>
    )
}

export default Users;