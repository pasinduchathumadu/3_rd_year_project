import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../assests/profile-picture.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import { IconButton, Tab } from "@mui/material";
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
import { FormLabel, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

// data for magaers complains
// function createData1(com_id, user_id, text, date, status) {
//     return { com_id, user_id, text, date, status };
// }

// const managerows = [
//     createData1(1, 1, "Complain text 1", '2023-07-12', 'pending'),
//     createData1(2, 1, "Complain text 2", '2023-07-13', 'pending'),
//     createData1(3, 3, "Complain text 3", '2023-07-14', 'pending'),
//     createData1(4, 4, "Complain text 4", '2023-07-15', 'completed'),
//     createData1(5, 6, "Complain text 5", '2023-07-16', 'completed'),
// ];


const Complains = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [complain, setComplain] = useState(0);
    const handleForm = (event, existing_value) => {
        setComplain(existing_value)
    };

    const [addResponce, setaddResponce] = useState(false);
    const [viewResponce, setviewResponce] = useState(false);

    // click on add response button - get details
    const [comdetails, setcomdetails] = useState("")
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")

    const addResponse = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/addResponse/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage('There is an internal error')
            } else {
                setaddResponce(true)
                setComplain(false)
                setcomdetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // after click on submit button of add response form
    const [addres, setaddres] = useState("")
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    const handleres = (event) => {
        setaddres(event.target.value)
    }
    const submitResponse = async (id1) => {
        if (addres === '') {
            seterror1(true)
            setmessage1("Please fill the field")
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/pet_care/admin/submitResponse`, {
                id1,
                addres
            })
            if (res.data.message === 'Added response') {
                setComplain(0);
                setaddResponce(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    // cancel without adding a response for manager complian
    const backAddingRes = () => {
        setaddResponce(false)
        setComplain(0)
    }

    // cancel adding responce
    // const cancelResponse = () => {
    //     setaddResponce(false);
    //     setComplain(0);
    // }

    // after click on view response
    // const viewResponse = () => {
    //     setComplain(false);
    //     setviewResponce(true);
    // }

    // after viewing the response
    const afterViewingResponse = () => {
        setComplain(0);
        setviewResponce(false);
    }

    const input = new Date();
    const date = input.toDateString();

    // view clients complains
    const [clientcom, setclientcom] = useState("");
    const clientComplains = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/clientComplains')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        clientComplains()
            .then((data) => setclientcom(data.data))
            .catch((err) => console.log(err))
    })

    // view managers complains
    const [managercom, setmanagercom] = useState("");
    const managerComplains = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/managerComplains')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        managerComplains()
            .then((data) => setmanagercom(data.data))
            .catch((err) => console.log(err))
    })



    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Administrator</p>
                    <p className="top-line-text">Today</p>
                    {/* <p class="top-line-text">18 June 2023</p> */}
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={complain}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: complain === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Managers' Complains" ></Tab>
                    <Tab sx={{ backgroundColor: complain === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients' Complains"></Tab>
                </Tabs>
            </Box>

            {/* clients complains */}
            {complain === 1 && (
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
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Related Manager</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Manager Response</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {clientcom && clientcom.map((crow, next) => (
                                        <StyledTableRow key={crow.complain_id}>
                                            <StyledTableCell align="center">{crow.complain_id}</StyledTableCell>
                                            <StyledTableCell align="center">{crow.client_id}</StyledTableCell>
                                            <StyledTableCell align="left">{crow.complain_txt}</StyledTableCell>
                                            <StyledTableCell align="center">{crow.manager_role}</StyledTableCell>
                                            <StyledTableCell align="center">{crow.com_date}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {crow.complain_status === "pending" ?
                                                    <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pending</Button>
                                                    : (crow.response_txt)}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* managers complains */}
            {complain === 0 && (
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
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                                        <StyledTableCell align="center">Manager Role</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Placed Time</StyledTableCell>
                                        <StyledTableCell align="center">Response</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {managercom && managercom.map((mrow, next) => (
                                        <StyledTableRow key={mrow.com_id}>
                                            <StyledTableCell align="center">{mrow.complain_id}</StyledTableCell>
                                            <StyledTableCell align="center">{mrow.manager_role}</StyledTableCell>
                                            <StyledTableCell align="center">{mrow.complain_txt}</StyledTableCell>
                                            <StyledTableCell align="center">{mrow.com_date}</StyledTableCell>
                                            <StyledTableCell align="center">{mrow.com_time}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {mrow.response_txt === null ? (
                                                    <Button onClick={() => addResponse(mrow.complain_id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} > Add Response</Button>
                                                ) : (
                                                    mrow.response_txt
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
                    // Adjust as needed
                    marginRight: '300px', // Adjust as needed
                    zIndex: 1001, // Ensure the content is above the overlay
                }}>
                    {comdetails && comdetails.map((resrow, index) => (
                        <FormControl sx={{
                            marginLeft: '5%',
                            marginTop: '25%',
                            borderRadius: '10px',
                            width: '600px',
                            padding: '20px',
                            backgroundColor: 'black',
                            position: 'relative', // Add this to ensure content appears on top of the overlay
                            zIndex: 1001
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
                                    <FormLabel>Complain ID </FormLabel>
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
                                    <FormLabel>Complain  </FormLabel>
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
                                                defaultValue={resrow.complain_txt}
                                            /></div>
                                    </Box>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Enter the Response  </FormLabel>
                                    <TextField
                                        id="outlined-basic"
                                        placeholder=" response"
                                        variant="outlined"
                                        onChange={handleres}
                                        sx={{ marginLeft: '10px', marginRight: '20px' }} />
                                </div>

                                <Button variant="contained" onClick={() => submitResponse(resrow.complain_id)} sx={{ background: "orange", marginRight: '10px', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Response</Button>
                                <div style={{ marginTop: '1%' }}>
                                    {error1 && (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="warning">{message1}</Alert>
                                        </Stack>
                                    )}
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* view response */}
            {viewResponce && (
                <div>
                    <FormControl sx={{ marginLeft: '35%', borderRadius: '10px', width: '600px', padding: '20px', backgroundColor: '#F0F0F5', fontFamily: 'osnovapro,sans-serif' }}>
                        <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                            <div className="form-topic">
                                Viewing Response
                            </div>
                            <div className="form-label">
                                <FormLabel>Complain ID  </FormLabel>
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
                                            defaultValue="04"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Complain </FormLabel>
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
                                            defaultValue="Card payment error"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Response   </FormLabel>
                                {/* <p style={{ paddingRight: '20px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px', borderStyle: 'solid', borderColor: 'black', borderRadius: '10px' }} >This is the response for your complain</p> */}
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
                                            defaultValue="It may be a connection issue"
                                        /></div>
                                </Box>
                            </div>

                            <Button variant="contained" onClick={() => afterViewingResponse()} sx={{ background: "#fe9e0d", width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>OK</Button>
                        </div>
                    </FormControl>
                </div>
            )}

        </div>
    )
}

export default Complains;