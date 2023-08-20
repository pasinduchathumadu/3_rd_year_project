import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import ProfilePicture from '../../assests/profile-picture.png';
import PetImage from '../../assests/blog-1.png';
import OwnerImage from '../../assests/profile-picture.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Avatar, Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { FormLabel, TextField } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Slip from '../../assests/bankslip1.png';
import axios from "axios";
import CircleIcon from '@mui/icons-material/Circle';

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

function createData(id, name, address, contact, usability, status) {
    return { id, name, address, contact, usability, status };
}

const rows = [
    createData(1, 'John Deo', 'No:23, Main Road, Colombo', '0778912212', 3, 'regular'),
    createData(2, 'John Perera', 'No:50, Second Road, Nugegoda', '0778022212', 5, 'premium'),
    createData(3, 'John Nikil', 'No:30, Temple Road, Maharagama', '0770011112', 6, 'premium'),
    createData(4, 'John Wistle', 'No:24, Katuwana Road, Homagama', '0746614212', 2, 'regular'),
    createData(5, 'John Bye', 'No:2, Down Street, Kottawa', '0703332212', 2, 'regular'),
];

function createDataRows(id, name, date, time, payment, status) {
    return { id, name, date, time, payment, status };
}

const secondrows = [
    createDataRows(1, 'John Deo', '2023-07-10 to 2023-07-12', '12:00:00', '1200.00', 'pending'),
    createDataRows(2, 'John Perera', '2023-07-10 to 2023-07-12', '13:15:00', '2200.00', 'accepted'),
    createDataRows(3, 'John Nikil', '2023-07-10 to 2023-07-12', '09:30:00', '2400.00', 'accepted'),
    createDataRows(4, 'John Wistle', '2023-07-10 to 2023-07-12', '10:00:00', '1600.00', 'completed'),
    createDataRows(5, 'John Bye', '2023-07-10 to 2023-07-12', '16:00:00', '1500.00', 'cancelled'),
];

function createRefundData(rfid, rqid, name, date, payment, rqStatus, rfStatus, aStatus) {
    return { rfid, rqid, name, date, payment, rqStatus, rfStatus, aStatus };

}

const refundrows = [
    createRefundData(1, 1, 'John Deo', '2023-07-10', '1200.00', 'cancelled', 'pending', ''),
    createRefundData(2, 2, 'John Ziya', '2023-07-12', '1200.00', 'incomplete', 'pending', ''),
    createRefundData(3, 3, 'Jonathan Perera', '2023-07-13', '1200.00', 'cancelled', 'completed', 'verified'),
    createRefundData(4, 4, 'Gulio Dias', '2023-07-11', '1200.00', 'incomplete', 'completed', 'rejected'),
];

const Clients = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [showRequests, setShowRequests] = useState(0);
    const handleForm = (event, existing_value) => {
        setShowRequests(existing_value)
    };

    const [request, setrequest] = useState([]) //boarding request array
    // boarding requests viewing
    const view_requests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/view_requests')
            const data = await res.data
            return data
        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        view_requests()
            .then((data) => setrequest(data.data))
            .catch((err) => console.log(err))
    })

    const [allclient, setallclient] = useState([])
    //all clients - get services from boarding house
    const view_allclients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/view_allclients')
            const data = await res.data
            return data
        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        view_allclients()
            .then((data) => setallclient(data.data))
            .catch((err) => console.log(err))
    })

    // view requests for refund
    const [refund, setrefund] = useState([])
    const refund_requests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/refund_requests')
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        refund_requests()
            .then((data) => setrefund(data.data))
            .catch((err) => console.log(err))
    })


    const input = new Date();
    const date = input.toDateString();

    const [pet, setPet] = useState(false);
    const [addRefund, setaddRefund] = useState(false);
    const [viewRefund, setviewRefund] = useState(false);

    // click on view pet details button
    const viewPet = () => {
        setShowRequests(false);
        setPet(true);
    }

    // after viewing  pet details 
    const FinishPetViewing = () => {
        setPet(false);
        setShowRequests(2);
    }

    // click on add refund
    const RefundAdding = () => {
        setShowRequests(false);
        setaddRefund(true);
    }

    // after click on place refund
    const PlaceRefund = () => {
        setaddRefund(false);
        setShowRequests(1);
    }

    // cancel refund
    const cancelRefund = () => {
        setaddRefund(false);
        setShowRequests(1);
    }

    // click on view refund details
    const ViewRefundDetails = () => {
        setShowRequests(false);
        setviewRefund(true);
    }
    // after viewing the refund details
    const FinishRefundViewing = () => {
        setviewRefund(false);
        setShowRequests(1);
    }


    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
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
                    value={showRequests}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >

                    <Tab sx={{ backgroundColor: showRequests === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients' Boarding Request" ></Tab>
                    <Tab sx={{ backgroundColor: showRequests === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Refund Requests"></Tab>
                    <Tab sx={{ backgroundColor: showRequests === 2 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients"></Tab>

                </Tabs>
            </Box>

            {/* clients */}
            {showRequests === 2 && (
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
                                    sx={{ fontSize: '11px' }}
                                >
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
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Client Name</StyledTableCell>
                                        <StyledTableCell align="center">Address</StyledTableCell>
                                        <StyledTableCell align="center">Contact Number</StyledTableCell>
                                        {/* <StyledTableCell align="center">Points</StyledTableCell> */}
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allclient && allclient.map((client, index) => (
                                        <StyledTableRow key={client.id}>
                                            <StyledTableCell align="center">{client.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{client.name}</StyledTableCell>
                                            <StyledTableCell align="center">{client.address}</StyledTableCell>
                                            <StyledTableCell align="center">{client.contact_number}</StyledTableCell>
                                            {/* <StyledTableCell align="center">3</StyledTableCell> */}
                                            <StyledTableCell align="center">
                                                {client.status === "premium" ? <><StarIcon sx={{ color: 'orange' }} /> premium</> : "regular"}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={() => viewPet()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pets Details</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* clients requests */}
            {showRequests === 0 && (
                <div>
                    <div className="drop-down-box1">
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
                                    sx={{ fontSize: '11px' }}
                                >
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Pending</MenuItem>
                                    <MenuItem value={3}>Accepted</MenuItem>
                                    <MenuItem value={4}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Request ID</StyledTableCell>
                                        <StyledTableCell align="center">Client Name</StyledTableCell>
                                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Package ID</StyledTableCell>
                                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                        <StyledTableCell align="center">Carry Date</StyledTableCell>
                                        <StyledTableCell align="center">Arrival Time</StyledTableCell>
                                        <StyledTableCell align="center">Request Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {request && request.map((requestrow, index) => (
                                        <StyledTableRow key={requestrow.id}>
                                            <StyledTableCell align="center">{requestrow.request_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.pet_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.package_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_arrival_date}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_carry_date}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_time}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.request_status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {requestrow.request_status === 'accepted' ? <Button sx={{ color: 'white', backgroundColor: '#000000', ':hover': { backgroundColor: '#000000' } }}>Completed</Button> : ""}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* refund requests */}
            {showRequests === 1 && (
                <div>
                    <div className="drop-down-box1">
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
                                    sx={{ fontSize: '11px' }}
                                >
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Cancelled</MenuItem>
                                    <MenuItem value={3}>Incompleted</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Refund ID</StyledTableCell>
                                        <StyledTableCell align="center">Request ID</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Cancelled / Incompleted Date </StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center">Admin Verification</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {refund && refund.map((refundrow, next) => (
                                        <StyledTableRow key={refundrow.refund_id}>
                                            <StyledTableCell align="center">{refundrow.refund_id}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.request_id}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.cancelled_date === "" ? "Incompleted Request" : refundrow.cancelled_date}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.price}.00</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.refund_status === 'completed'
                                                    ? <Button onClick={() => ViewRefundDetails()} sx={{ color: 'white', width: '80%', backgroundColor: '#000000', ':hover': { backgroundColor: '#555555' } }}>Refund Details</Button>
                                                    : <Button onClick={() => RefundAdding()} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.admin_verification === 'rejected'
                                                    ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }}>Rejected</Button>)
                                                    : refundrow.admin_verification === 'verified'
                                                        ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}>Verified</Button>)
                                                        : (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>Pending</Button>)
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* pet details */}
            {pet && (
                <div>
                    <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                Pet Details
                                <hr />
                            </div>

                            <div className="form-label" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>
                                    <Avatar src={PetImage} alt="pet image" style={{ width: '200px', height: 'auto' }} />
                                </div>
                                <div>
                                    <FormLabel>  Pet ID  </FormLabel>
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
                            </div>

                            <div className="form-label" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>
                                    <FormLabel>  Pet Name  </FormLabel>
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
                                                defaultValue="Jimmy Boy"
                                            /></div>

                                    </Box>
                                </div>

                                <div>
                                    <FormLabel>  Pet Breed  </FormLabel>
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
                                                defaultValue="Alteshion"
                                            /></div>

                                    </Box>
                                </div>
                            </div>
                            <div className="form-label" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>
                                    <FormLabel>Category</FormLabel>
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

                                <div>
                                    <FormLabel>  Sex  </FormLabel>
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
                                                defaultValue="Male"
                                            /></div>

                                    </Box>
                                </div>
                            </div>
                            <Button variant="contained" onClick={() => FinishPetViewing()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>OK</Button>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* place refund */}
            {addRefund && (
                <div>
                    <FormControl sx={{ marginLeft: '18%', borderRadius: '10px', width: '1000px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                Place Refund
                                <hr />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>  Refund ID  </FormLabel>
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

                                <div className="form-label" style={{ marginLeft: '290px' }}>
                                    <FormLabel>Request ID  </FormLabel>
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
                                                defaultValue=" 05 "
                                            /></div>

                                    </Box>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>  Account Number :   </FormLabel>
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
                                                defaultValue="345 7890 6658"
                                            /></div>
                                    </Box>

                                </div>

                                <div className="form-label">
                                    <FormLabel>Bank  </FormLabel>
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
                                                defaultValue=" Peaples Bank "
                                            /></div>

                                    </Box>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Branch  </FormLabel>
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
                                                defaultValue=" Homagama "
                                            /></div>

                                    </Box>
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel> Refund Amount(Rs.) </FormLabel>
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
                                            defaultValue=" 7500.00 "
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Upload Bank Slip : </FormLabel>
                                <TextField
                                    sx={{ marginRight: '20px', marginLeft: '10px' }}
                                    type="file"
                                    variant="outlined"
                                    placeholder="Choose a file"
                                    inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                                // onChange={handleFileChange}
                                />
                            </div>
                            {/* <Button variant="contained" onClick={() => afterAddingComplain()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button> */}
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button variant="contained" onClick={() => PlaceRefund()} sx={{ background: 'orange', width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Place Refund</Button>
                                <Button variant="contained" onClick={() => cancelRefund()} sx={{ background: 'red', width: '100%', marginTop: '10px', marginLeft: '10px', ':hover': { backgroundColor: "red" } }}> Cancel</Button>
                            </div>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* view refund details */}
            {viewRefund && (
                <div>
                    <FormControl sx={{ marginLeft: '15%', borderRadius: '10px', width: '1000px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                View Refund Details
                                <hr />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>  Refund ID  </FormLabel>
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
                                                defaultValue=" 02 "
                                            /></div>

                                    </Box>
                                </div>

                                <div className="form-label" style={{ marginLeft: '290px' }} >
                                    <FormLabel>Request ID </FormLabel>
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
                                                defaultValue=" 05 "
                                            /></div>

                                    </Box>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>  Account Number :   </FormLabel>
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
                                                defaultValue="345 7890 6658"
                                            /></div>
                                    </Box>

                                </div>

                                <div className="form-label">
                                    <FormLabel>Bank  </FormLabel>
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
                                                defaultValue=" Peaples Bank "
                                            /></div>

                                    </Box>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Branch  </FormLabel>
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
                                                defaultValue=" Homagama "
                                            /></div>

                                    </Box>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>  Refund Date </FormLabel>
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
                                                defaultValue=" 2023/07/20 "
                                            /></div>

                                    </Box>
                                </div>

                                <div className="form-label" style={{ marginLeft: '290px' }}>
                                    <FormLabel>Refund Time </FormLabel>
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
                                                defaultValue=" 10:00:00  "
                                            /></div>

                                    </Box>
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel>Uploaded Bank Slip : </FormLabel>
                                <img src={Slip} alt="bank slip" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                            </div>
                            {/* <Button variant="contained" onClick={() => afterAddingComplain()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button> */}
                            <Button variant="contained" onClick={() => FinishRefundViewing()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Finish Viewing</Button>
                        </div>
                    </FormControl>
                </div>
            )}

        </div>
    );
};

export default Clients;
