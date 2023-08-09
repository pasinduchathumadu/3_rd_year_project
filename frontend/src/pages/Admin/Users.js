/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Image from '../../assests/profile.jpg';
import PetImage from '../../assests/dog1.jpg';
import PetImage1 from '../../assests/dog.jpg';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// import { FormHelperText } from '@material-ui';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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
    // select manager role

    const [role, setRole] = React.useState('');
    const [email, setemail] = useState(" ")
    const [id, setId] = useState("")
    const [first, setfirst] = useState(" ")
    const [second, setsecond] = useState(" ")
    const [contact, setcontact] = useState(" ")
    const [city, setcity] = useState(" ")
    const [Street, setstreet] = useState(" ")
    const [error, seterror] = useState(false)
    const [manager, setmanager] = useState([])

    const handle = (event) => {

        setRole(event.target.value)

    };

    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {

        setClients(event.target.value);
    };

    const [users, setUsers] = useState(0);
    const handleForm = (event, existing_value) => {
        setadd(false)
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

    const get_manager = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/get_managers')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internel error")
        }
    }
    const submitManager = async (e) => {
        e.preventDefault()


        try {
            const res = await axios.post("http://localhost:5000/pet_care/admin/registration", {
                email,
                first,
                second,
                id,
                contact,
                city,
                Street,
                role,

            })
            if (res.data.message === 'Email already exists') {
                seterror("Email already exists")
            }
            else if (res.data.message === 'Manager ID already exists') {
                seterror("Manager ID already exists")
            } else if (res.data.message === 'success') {
                setUsers(0)
                setadd(false)
            } else if (res.data.message === 'message not send') {
                seterror("message not send")
            }

        } catch (err) {
            console.log("There is error")

        }

    }

    useEffect(() => {
        get_manager()
            .then((data) => setmanager(data.data))
            .catch((err) => console.log(err))
    })

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

    const input = new Date();
    const date = input.toDateString();


    return (
        <div className="home-container" style={{ marginTop: '4%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Administrator</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
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
                                    <StyledTableRow>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center">Manager ID</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center">Contact Number</StyledTableCell>
                                        <StyledTableCell align="center">Address</StyledTableCell>
                                        <StyledTableCell align="center">Work</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {manager && manager.map((managerow) => (
                                        <StyledTableRow key={managerow.id}>
                                            <StyledTableCell align="center"><img src={Image} style={{ width: '80px', borderRadius: '50%' }} alt="image" /></StyledTableCell>
                                            <StyledTableCell align="center">{managerow.manager_id}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.full_name}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.email}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.contact_number}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.address}</StyledTableCell>
                                            {/* <StyledTableCell align="center">{managerow.nic}</StyledTableCell> */}
                                            <StyledTableCell align="center">{managerow.user_role}</StyledTableCell>
                                            <StyledTableCell align="center"><EditIcon onClick={() => updateManager()} /><DeleteIcon sx={{ color: 'red' }} /></StyledTableCell>
                                        </StyledTableRow>
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
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center"> Name</StyledTableCell>
                                        <StyledTableCell align="center"> Email</StyledTableCell>
                                        <StyledTableCell align="center">Contact Numebr</StyledTableCell>
                                        <StyledTableCell align="center">Address</StyledTableCell>
                                        <StyledTableCell align="center">Category</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {clientrows.map((clientrow) => (
                                        <StyledTableRow key={clientrow.id}>
                                            <StyledTableCell align="center">{clientrow.id}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.name}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.email}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.contact}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.address}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {clientrow.category === "premium" ? <><StarIcon sx={{ color: 'orange' }} /> premium</> : "regular"}
                                            </StyledTableCell>
                                            <StyledTableCell align="center"><Button onClick={() => PetViewing()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pet Details</Button></StyledTableCell>
                                            <StyledTableCell align="center"><DeleteIcon sx={{ color: 'red' }} /></StyledTableCell>
                                        </StyledTableRow>
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
                                    <FormLabel>First Name</FormLabel>
                                    <TextField id="outlined-basic" placeholder="First Name" type="text" variant="outlined" sx={{ width: '300px' }} onChange={(e) => setfirst(e.target.value)} required />
                                </div>
                                <div className="form-label">
                                    <FormLabel> Last Name</FormLabel>
                                    <TextField id="outlined-basic" placeholder="Last Name" type="email" variant="outlined" sx={{ width: '300px' }} onChange={(e) => setsecond(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-label">
                                <FormLabel> Email Address</FormLabel>
                                <TextField id="outlined-basic" placeholder="youremail@gmail.com" type="email" variant="outlined" sx={{ width: '300px' }} onChange={(e) => setemail(e.target.value)} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>Street</FormLabel>
                                    <TextField id="outlined-basic" placeholder="Street" type="text" variant="outlined" sx={{ width: '300px' }} onChange={(e) => setstreet(e.target.value)} required />
                                </div>
                                <div className="form-label">
                                    <FormLabel>City</FormLabel>
                                    <TextField id="outlined-basic" placeholder="City" type="text" variant="outlined" sx={{ width: '300px' }} onChange={(e) => setcity(e.target.value)} required />
                                </div>
                            </div>
                            <div className="form-label">
                                <FormLabel>Contact Number</FormLabel>
                                <TextField id="outlined-basic" placeholder="Contact Number" type="text" variant="outlined" sx={{ width: '100%' }} onChange={(e) => setcontact(e.target.value)} required />
                            </div>
                            <div className="form-label">
                                <FormLabel> Role</FormLabel>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={role}
                                        onChange={handle}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        required
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Medi Help Center Manager</MenuItem>
                                        <MenuItem value={20}>Boarding House Manager</MenuItem>
                                        <MenuItem value={30}>Online Store Manager</MenuItem>
                                        <MenuItem value={40}>Care Center Manager</MenuItem>
                                        <MenuItem value={50}>Company Manager</MenuItem>
                                    </Select>

                                </FormControl>
                            </div>

                            <Button variant="contained" onClick={submitManager} sx={{ background: "orange", marginTop: '10px', ':hover': { backgroundColor: "orange" }, width: '100%' }}>Add </Button>
                        </div>
                        <div style={{ marginTop: '1%' }}>
                            {error && (
                                <Stack sx={{ width: '100%' }} spacing={2}>

                                    <Alert severity="info">{error}</Alert>

                                </Stack>

                            )}

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

                            <div className="form-label">
                                <img src={Image} alt="manager photo" style={{ borderRadius: '50%', width: '200px', height: 'auto', marginLeft: '35%' }} />
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

                            {/* <div className="form-label">
                                <FormLabel>Profile Picture</FormLabel>
                                <input type="file" placeholder=" Choose a file" variant="outlined" />
                            </div> */}
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
                                        <FormLabel>  Pet ID </FormLabel>
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
                                        <FormLabel>  Pet Category </FormLabel>
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
                                                    defaultValue="Dog"
                                                /></div>

                                        </Box>
                                    </div>
                                </div>
                                <div className="form-label">
                                    <img src={PetImage} alt="pet image" style={{ width: '200px', height: 'auto', marginLeft: '180px' }} />
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Pet ID </FormLabel>
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
                                                    defaultValue="03"
                                                /></div>

                                        </Box>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>  Pet Category </FormLabel>
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
                                                    defaultValue="Dog"
                                                /></div>

                                        </Box>
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