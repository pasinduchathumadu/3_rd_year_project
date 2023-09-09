
import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import ProfilePicture from '../../assests/profile-picture.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, IconButton, Tab, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { FormLabel, TextField } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from "@mui/system";
import {  useNavigate } from "react-router";

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

const Complains = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [own, setOwn] = useState(0);
    const handleForm = (event, existing_value) => {
        setOwn(existing_value)
    };
    const [form, setForm] = useState(false);
    const [addResponce, setaddResponce] = useState(false);
    // const [viewResponce, setviewResponce] = useState(false);

    // after click on add new complain button
    const addForm = () => {
        setOwn(false);
        setForm(true);
    }

    const input = new Date();
    const date = input.toDateString();

    const email = localStorage.getItem("boarding_email");

    const [complain, setcomplain] = useState("");
    const [message, setMessage] = useState("");
    const [error, seterror] = useState("");

    // adding a complain
    const add_complain = async () => {
        if (complain === '') {
            seterror(true)
            setMessage("Please fill the field")
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/pet_care/boarding_house_manager/add_complain', {
                email,
                complain,
            })
            if (res.data.message === 'There is an internal error') {
                setMessage('You cannot add this complain')
                seterror(true)
            } else if (res.data.message === 'success') {
                setOwn(1);
                setForm(false);

            }
        } catch (err) {
            console.log("There is an internal error")
        }
    }
    // cancel without adding a complain
    const cancelAddingComplain = () => {
        setForm(false);
        setOwn(1);
    }

    // clients complains - add responses - get id 
    const [resdetails, setresdetails] = useState("")
    const complainDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/complainDetails/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setMessage('There is an internal error')
            } else {
                setaddResponce(true)
                setresdetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // clients complains - add responses
    const [newres, setnewres] = useState("")
    const handleResponse = (event) => {
        setnewres(event.target.value)
    }
    const addingResponse = async (id) => {
        setOwn(0)
        setaddResponce(false)

        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/addingResponse`, {
                id,
                newres
            })
        } catch (err) {
            console.log(err)
        }
    }

    // cancel without adding a response for client complian
    const backAddingRes = () => {
        setaddResponce(false)
        setOwn(0)
    }

    // warning box for deleting a my complain
    const [warn, setwarn] = useState(false)
    const [id, setdeletedid] = useState("")

    // display warning box 
    const displayWarn = (id) => {
        setwarn(true)
        setOwn(false)
        setdeletedid(id)
    }
    // delete the complain
    const deleteMyComplain = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/deleteMyComplain/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setMessage('There is an internal error')
            } else {
                setOwn(1)
                setwarn(false)
            }

        } catch (err) {
            console.log(err)
        }
    }
    // cancel deleting
    const cancelDelete = () => {
        setOwn(1)
        setwarn(false)
    }

    // viewing my complains
    const [mycomplain, setmycomplain] = useState("");
    const viewmyComplains = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/viewmyComplains')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        viewmyComplains()
            .then((data) => setmycomplain(data.data))
            .catch((err) => console.log(err))
    })

    // viewing clients all complains
    const [clientcomplain, setclientcomplain] = useState("");
    const viewClientsComplains = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/viewClientsComplains')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        viewClientsComplains()
            .then((data) => setclientcomplain(data.data))
            .catch((err) => console.log(err))
    })

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

     // get profile picture
     const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)

    }

    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date} </p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={getProfilepicturepath("boarding_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={own}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: own === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients' Complains" ></Tab>
                    <Tab sx={{ backgroundColor: own === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="My Complains"></Tab>
                </Tabs>
            </Box>

            {/* Clients Complains */}
            {own === 0 && (
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
                                    <MenuItem value={2}>Pending</MenuItem>
                                    <MenuItem value={3}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Placed Time</StyledTableCell>
                                        <StyledTableCell align="center">Response</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientcomplain && clientcomplain.map((clientrow, next) => (
                                        <StyledTableRow key={clientrow.complain_id}>
                                            <StyledTableCell align="center">{clientrow.complain_id}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.complain_txt}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.com_date}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.com_time}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {clientrow.response_txt === null ? (
                                                    <Button onClick={() => complainDetails(clientrow.complain_id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} > Add Response</Button>
                                                ) : (
                                                    clientrow.response_txt
                                                )}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* My Complains */}
            {own === 1 && (
                <div>
                    <div className="drop-down-box">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div className="top-button-header">
                                <Button variant="contained" onClick={() => addForm()} sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>Add New Complain <AddIcon sx={{ marginLeft: '10px' }} /></Button>
                            </div>
                            <div>
                                <Box sx={{ width: '150px', marginRight: '25px' }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={own}
                                            variant='filled'
                                            label="clients"
                                            onChange={handleChange}
                                            l
                                            sx={{ fontSize: '11px' }}
                                        >
                                            <MenuItem value={1}>All</MenuItem>
                                            <MenuItem value={2}>Pending</MenuItem>
                                            <MenuItem value={2}>Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Placed Time</StyledTableCell>
                                        <StyledTableCell align="center">Response</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mycomplain && mycomplain.map((myrow, index) => (
                                        <StyledTableRow key={myrow.complain_id}>
                                            <StyledTableCell align="center">{myrow.complain_id}</StyledTableCell>
                                            <StyledTableCell align="center">{myrow.complain_txt}</StyledTableCell>
                                            <StyledTableCell align="center">{myrow.com_date}</StyledTableCell>
                                            <StyledTableCell align="center">{myrow.com_time}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {myrow.complain_status === "pending" ?
                                                    <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pending</Button>
                                                    : (myrow.response_txt)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {myrow.complain_status === 'pending' ?
                                                    <IconButton onClick={() => displayWarn(myrow.complain_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton> : ""}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* add new complain */}
            {form && (
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
                        marginTop: '20%',
                        borderRadius: '10px',
                        width: '700px',
                        padding: '20px',
                        position: 'relative', // Add this to ensure content appears on top of the overlay
                        zIndex: 1001,
                        backgroundColor: 'black'
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={cancelAddingComplain}><CloseIcon sx={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    marginLeft: '600px'
                                }} /></IconButton>
                            </div>

                            <div className="form-topic">
                                Add New Complain
                                <hr />
                            </div>
                            <div className="form-label">
                                <FormLabel>Enter your complain: </FormLabel>
                                <TextField id="outlined-basic" placeholder="Complain" variant="outlined" sx={{ marginRight: '20px', marginTop: '10px' }} onChange={(e) => setcomplain(e.target.value)} required />
                            </div>
                            {
                                error && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="warning">{message}</Alert>
                                    </Stack>
                                )
                            }

                            <Button variant="contained" onClick={() => add_complain()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* add response */}
            {addResponce && (
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
                    {resdetails && resdetails.map((resrow, index) => (
                        <FormControl sx={{
                            marginLeft: '5%',
                            marginTop: '30%',
                            borderRadius: '10px',
                            width: '600px',
                            padding: '20px',
                            position: 'relative', 
                            zIndex: 1001,
                            backgroundColor: 'black'
                        }}>
                            <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                                <div>
                                    <IconButton onClick={backAddingRes}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '500px' }} /></IconButton>
                                </div>
                                <div className="form-topic">
                                    Adding Response
                                    <hr />
                                </div>
                                <div className="form-label">
                                    <FormLabel>Complain ID :  </FormLabel>
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
                                                defaultValue={resrow.complain_id}
                                            /></div>
                                    </Box>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Enter the Response  </FormLabel>
                                    <TextField
                                        id="outlined-basic"
                                        placeholder=" response"
                                        variant="outlined"
                                        onChange={handleResponse}
                                        sx={{ marginRight: '20px', marginLeft: '10px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button variant="contained" onClick={() => addingResponse(resrow.complain_id)} sx={{ background: "orange", width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Response</Button>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* warning box for delete*/}
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
                                <Button onClick={deleteMyComplain} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Complains