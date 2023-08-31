/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../assests/profile-picture.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import { Tab, IconButton, Typography } from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';

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
    const [manager, setmanager] = useState([]) //managers array
    const [client, setclient] = useState([]) //client array

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

    // get and view managers' details 
    const get_manager = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/get_managers')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internel error")
        }
    }

    const [message, setmessage] = useState("")
    // add a new manager
    const submitManager = async (e) => {
        e.preventDefault()
        if (email === '' ||
            first === '' ||
            second === '' ||
            id === '' ||
            contact === '' ||
            city === '' ||
            Street === '' ||
            role === '') {
            seterror(true)
            setmessage("Please fill all fields")
            return;
        }

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
    // cancel adding a new manager
    const cancelAddManager = () => {
        setUsers(0)
        setadd(false)
    }

    // view clients details
    const get_client = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/get_client')
            const data = await res.data
            return data
        } catch (err) {
            console.log("There is an internal error")
        }
    }

    useEffect(() => {
        get_client()
            .then((data) => setclient(data.data))
            .catch((err) => console.log(err))
    })

    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")
    const [managerdetails, setmanagerdetails] = useState([])

    // click on update icon
    const ManagerDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/ManagerDetails/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1("There is an internal error")
            } else {
                setUsers(false)
                setupdate(true)
                seterror2(false)
                setmessage2("")
                setmanagerdetails(res.data.data)
            }

        } catch (err) {
            console.log(err)
        }
    }

    // after updating details
    const [newcontact, setnewcontact] = useState("")
    const [newstreet, setnewstreet] = useState("")
    const [newcity, setnewcity] = useState("")

    const handleContact = (event) => {
        setnewcontact(event.target.value)
    }

    const handleStreet = (event) => {
        setnewstreet(event.target.value)
    }

    const handleCity = (event) => {
        setnewcity(event.target.value)
    }

    const [error2, seterror2] = useState(false)
    const [message2, setmessage2] = useState("")
    const FinishUpdate = async (id) => {
        if (newcontact === '' ||
            newstreet === '' ||
            newcity === '') {
            seterror2(true)
            setmessage2("Please fill all fields")
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/pet_care/admin/FinishUpdate`, {
                id,
                newcontact,
                newstreet,
                newcity
            })
            if (res.data.message === "Updated") {
                setupdate(false);
                setUsers(0);
            }
        } catch (err) {
            console.log(err)
        }
    }
    // cancel without updating
    const backfromupdate = () => {
        setupdate(false)
        setUsers(0)
    }

    // clients pet viewing
    // const PetViewing = () => {
    //     setUsers(false);
    //     setpet(true);
    // }

    // finish clients pet viewing
    // const FinishPetViewing = () => {
    //     setpet(false);
    //     setUsers(1);
    // }

    // warn box - delete manager
    const [warn, setwarn] = useState(false)
    const [deleteid, setdeleteid] = useState("")

    // display warn box
    const displayWarnManager = (deleteid) => {
        setwarn(true)
        setUsers(false)
        setdeleteid(deleteid)
    }

    // delete a manager
    const deleteManager = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/deleteManager/${deleteid}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage('There is an internal error')
            } else {
                setUsers(0)
                setwarn(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // cancel without deleting a manager
    const cancelManagerDelete = () => {
        setUsers(0)
        setwarn(false)
    }

    // warn box - delete client
    const [warn1, setwarn1] = useState(false)
    const [cid, setcid] = useState("")
    const [error4, seterror4] = useState(false)
    const [messsage4 , setmessage4] =useState("")

    // display warning box
    const displayWarnClient = (cid) => {
        setwarn1(true)
        setUsers(false)
        setcid(cid)
    }

    // confirm deletion
    const deleteClient = async() => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/deleteClient/${cid}`)
            if(res.data.message === 'There is an internal error') {
                seterror4(true)
                setmessage4('There is an internal error')
            }else {
                setUsers(1)
                setwarn1(false)
            }

        }catch(err) {
            console.log(err)
        }
    }
    // cancel without deleting the manager
    const cancelCLientDelete = () => {
        setUsers(1)
        setwarn1(false)
    }

    const input = new Date();
    const date = input.toDateString();

    // view client pet details
    const [petdetails, setpetdetails] = useState([])
    const [error3, seterror3] = useState(false)
    const [message3, setmessage3] = useState("")

    const viewPetDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/viewPetDetails/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror3(true)
                setmessage3('There is an internal error')
            } else {
                setpet(true)
                setUsers(false)
                setpetdetails(res.data.data)
            }

        } catch (err) {
            console.log(err)
        }
    }
    // get image of pet
    const getPetImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // after viewing pet details - cross button
    const FinishPetViewing = () => {
        setpet(false);
        setUsers(1);
    }



    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
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
                                        <StyledTableCell align="center">Role</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {manager && manager.map((managerow, index) => (
                                        <StyledTableRow key={managerow.id}>
                                            <StyledTableCell align="center"><img src={Image} style={{ width: '80px', borderRadius: '50%' }} alt="image" /></StyledTableCell>
                                            <StyledTableCell align="center">{managerow.manager_id}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.full_name}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.email}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.contact_number}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.address}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.user_role}</StyledTableCell>
                                            <StyledTableCell align="center"><EditIcon onClick={() => ManagerDetails(managerow.manager_id)} /></StyledTableCell>
                                            <StyledTableCell align="center"><IconButton onClick={() => displayWarnManager(managerow.manager_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton></StyledTableCell>
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
                                    {client && client.map((clientrow, index) => (
                                        <StyledTableRow key={clientrow.id}>
                                            <StyledTableCell align="center">{clientrow.id}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.name}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.email}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.contact}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.address}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {clientrow.category === "premium" ? <><StarIcon sx={{ color: 'orange' }} /> premium</> : "regular"}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={() => viewPetDetails(clientrow.id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pet Details</Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="center"><IconButton onClick={() => displayWarnClient(clientrow.id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton></StyledTableCell>
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
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '5px',
                    width: '100%',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Adjust as needed
                    marginRight: '300px', // Adjust as needed
                    zIndex: 1001,
                    marginTop: '10%'
                }}
                >
                    <FormControl sx={{
                        marginLeft: '10%',
                        borderRadius: '10px',
                        width: '700px',
                        padding: '20px',
                        backgroundColor: '#F0F0F5',
                        position: 'relative', // Add this to ensure content appears on top of the overlay
                        zIndex: 1001
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={cancelAddManager}><CloseIcon sx={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    marginLeft: '600px'
                                }} /></IconButton>
                            </div>

                            <div className="form-topic">
                                Add New Manager
                                <hr />
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

                                    <Alert severity="warning">{message}</Alert>

                                </Stack>
                            )}
                        </div>
                    </FormControl>
                </div>
            )}

            {/* update manager details */}
            {update && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Adjust as needed
                    marginRight: '300px', // Adjust as needed
                    zIndex: 1001, // Ensure the content is above the overlay
                }}>
                    <FormControl sx={{
                        marginLeft: '5%',
                        marginTop: '30%',
                        borderRadius: '10px',
                        width: '700px',
                        padding: '20px',
                        backgroundColor: '#F0F0F5',
                        position: 'relative', // Add this to ensure content appears on top of the overlay
                        zIndex: 1001,
                        backgroundColor: 'black'
                    }}>
                        {managerdetails && managerdetails.map((mgrow, index) => (
                            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                                <div>
                                    <IconButton onClick={backfromupdate}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
                                </div>
                                <div className="form-topic">
                                    Update Managers Details
                                    <hr />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <img src={Image} alt="manager photo" style={{ borderRadius: '50%', width: '200px', height: 'auto' }} />
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Manager ID :</FormLabel>
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
                                                    id="outlined-disabled"
                                                    label=""
                                                    disabled
                                                    defaultValue={mgrow.manager_id}
                                                /></div>
                                        </Box>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <div className="form-label">
                                        <FormLabel>Name :</FormLabel>
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
                                                    id="outlined-disabled"
                                                    label=""
                                                    disabled
                                                    defaultValue={mgrow.name}
                                                /></div>
                                        </Box>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Email Address :</FormLabel>
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
                                                    id="outlined-disabled"
                                                    disabled
                                                    label=""
                                                    defaultValue={mgrow.email}
                                                /></div>
                                        </Box>
                                    </div>
                                </div>

                                <div className="form-label">
                                    <FormLabel> Contact Number</FormLabel>
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
                                                id="outlined-disabled"
                                                label=""
                                                defaultValue={mgrow.contact_number}
                                                onChange={handleContact}
                                            /></div>
                                    </Box>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel> Street</FormLabel>
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
                                                    id="outlined-disabled"
                                                    label=""
                                                    defaultValue={mgrow.street}
                                                    onChange={handleStreet}
                                                /></div>
                                        </Box>
                                    </div>
                                    <div className="form-label">
                                        <FormLabel> City</FormLabel>
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
                                                    id="outlined-disabled"
                                                    label=""
                                                    defaultValue={mgrow.city}
                                                    onChange={handleCity}
                                                /></div>
                                        </Box>
                                    </div>
                                </div>
                                <Button variant="contained" onClick={() => FinishUpdate(mgrow.manager_id)} sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Update</Button>
                                <div style={{ marginTop: '1%' }}>
                                    {error2 && (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="warning">{message2}</Alert>
                                        </Stack>
                                    )}
                                </div>
                            </div>
                        ))}
                    </FormControl>

                </div>
            )}

            {/* clients' pet details */}
            {pet && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                }}>
                    {petdetails && petdetails.map((petrow, index) => (
                        <FormControl sx={{
                            marginLeft: '5%',
                            marginTop: '30%',
                            borderRadius: '10px',
                            width: '700px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                            backgroundColor: 'black'
                        }}>

                            <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                                <div>
                                    <IconButton onClick={FinishPetViewing}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '500px' }} /></IconButton>
                                </div>
                                <div className="form-topic">
                                    Pet Details
                                    <hr />
                                </div>

                                <div style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '10px' }}>
                                    <div className="form-label">
                                        <img
                                            src={getPetImageSrc(petrow.image)}
                                            alt="pet image"
                                            component="img"
                                            style={{ width: '200px', height: 'auto', marginLeft: '150px', borderRadius: '20px' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                                                        defaultValue={petrow.pet_id}
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
                                                        defaultValue={petrow.category}
                                                    /></div>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* warnng box - delete manager */}
            {warn && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '5px',
                    width: '100%',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Adjust as needed
                    marginRight: '300px', // Adjust as needed
                    zIndex: 1001,
                    marginTop: '10%'
                }}>
                    <div style={{ backgroundColor: 'black', padding: '10px' }}>
                        <div style={{
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f5',
                            width: '500px',
                            position: 'relative', // Add this to ensure content appears on top of the overlay
                            zIndex: 1001
                        }}>
                            <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
                            <hr /><br />

                            <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button onClick={deleteManager} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                <Button onClick={cancelManagerDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* warning box for delete client */}
            {warn1 && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '5px',
                    width: '100%',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                    marginTop: '10%'
                }}>
                    <div style={{ backgroundColor: 'black', padding: '10px' }}>
                        <div style={{
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f5',
                            width: '500px',
                            position: 'relative',
                            zIndex: 1001
                        }}>
                            <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
                            <hr /><br />

                            <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button onClick={deleteClient} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                <Button onClick={cancelCLientDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Users;