import React, { useState } from "react";
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
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { FormLabel, TextField } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Slip from '../../assests/bankslip1.png';

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

function createRefundData(rfid, rqid, name, date, payment, rqStatus, rfStatus) {
    return { rfid, rqid, name, date, payment, rqStatus, rfStatus };

}

const refundrows = [
    createRefundData(1, 1, 'John Deo', '2023-07-10', '1200.00', 'cancelled', 'pending'),
    createRefundData(2, 2, 'John Ziya', '2023-07-12', '1200.00', 'incomplete', 'pending'),
    createRefundData(3, 3, 'Jonathan Perera', '2023-07-13', '1200.00', 'cancelled', 'completed'),
    createRefundData(4, 4, 'Gulio Dias', '2023-07-11', '1200.00', 'incomplete', 'completed'),
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
        setShowRequests(0);
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
        <div className="home-container" style={{ marginTop: '4%'}}>
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

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={showRequests}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >

                    <Tab sx={{ backgroundColor: showRequests === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients' Request" ></Tab>
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
                                        <StyledTableCell align="center">Points</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell align="center">{row.id}</StyledTableCell>
                                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                                            <StyledTableCell align="center">{row.address}</StyledTableCell>
                                            <StyledTableCell align="center">{row.contact}</StyledTableCell>
                                            <StyledTableCell align="center">{row.usability}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.status === "premium" ? <><StarIcon sx={{color:'orange'}} /> premium</> : "regular"}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={()=> viewPet()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pets Details</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* clients request */}
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
                                    <MenuItem value={5}>Cancelled</MenuItem>
                                    <MenuItem value={6}>Incomplete</MenuItem>
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
                                        <StyledTableCell align="center">Requested Date Period</StyledTableCell>
                                        <StyledTableCell align="center">Pick Up Time</StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center">Request Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {secondrows.map((secondrows) => (
                                        <StyledTableRow key={secondrows.id}>
                                            <StyledTableCell align="center">{secondrows.id}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrows.name}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrows.date}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrows.time}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrows.payment}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrows.status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={()=> viewPet()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pets Details</Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {secondrows.status === 'accepted' ? <Button sx={{ color: 'white', backgroundColor: '#000000', ':hover': { backgroundColor: '#000000' } }}>Completed</Button> : ""}
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
                                        <StyledTableCell align="center">Refund ID</StyledTableCell>
                                        <StyledTableCell align="center">Request ID</StyledTableCell>
                                        <StyledTableCell align="center">Client Name</StyledTableCell>
                                        <StyledTableCell align="center">Cancelled / Incompleted Date </StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center">Request Status</StyledTableCell>
                                        <StyledTableCell align="center">Refund Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {refundrows.map((refundrow) => (
                                        <StyledTableRow key={refundrow.rfid}>
                                            <StyledTableCell align="center">{refundrow.rfid}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.rqid}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.name}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.date}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.payment}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.rqStatus}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.rfStatus}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.rfStatus === 'completed' 
                                                    ? <Button onClick={()=> ViewRefundDetails()} sx={{ color: 'white', width: '80%', backgroundColor: '#000000', ':hover': { backgroundColor: '#555555' } }}>Refund Details</Button>
                                                    : <Button onClick={() => RefundAdding()} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>}
                                                    {/* : <Button onClick ={()=> addRefund()} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>} */}
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
                        <div style={{ backgroundColor: 'white', paddingTop:'20px', paddingBottom:'20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                 Pet Details
                            </div>

                            <div className="form-label">
                                <img src={ PetImage } alt="pet image" style={{width:'200px', height:'auto', marginLeft:'180px'}} />
                            </div>

                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div className="form-label">
                                    <FormLabel>  Pet ID : 02 </FormLabel>
                                </div>

                                <div className="form-label">
                                    <FormLabel>  Pet Category : Dog </FormLabel>
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel>Food Preference : <br /> </FormLabel>
                                <ul style={{paddingRight:'20px', paddingLeft:'30px', paddingTop:'10px', paddingBottom:'10px', borderStyle:'solid', borderColor:'black', borderRadius:'10px'}}>
                                    <li>This is food prefernece 01</li>
                                    <li>This is food prefernece 02</li>
                                    <li>This is food prefernece 03</li>
                                </ul>
                            </div>
                            <div className="form-label">
                                    <FormLabel>Owner Details :</FormLabel>
                            </div>
                               
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div className="form-label">
                                    <FormLabel>Owner ID : 05 </FormLabel>
                                </div>
                                <div className="form-label">
                                    <FormLabel>Name : John Doe </FormLabel>
                                </div>
                            </div>

                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div className="form-label">
                                        <img src={ OwnerImage } alt="owner image" style={{width:'100px', height:'auto'}} />
                                </div>

                                <div className="form-label">
                                    <FormLabel>Contact Number : 0773214533 </FormLabel>
                                    <FormLabel>Address :  No: 23, Main Street, Negombo </FormLabel>
                                </div>
                            </div>

                            {/* <Button variant="contained" onClick={() => afterAddingComplain()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button> */}
                            <Button variant="contained" onClick={() => FinishPetViewing()}  sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>OK</Button>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* place refund */}
            {addRefund && (
                <div>
                    <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white', paddingTop:'20px', paddingBottom:'20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                Place Refund
                            </div>

                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div className="form-label">
                                    <FormLabel>  Refund ID : 02 </FormLabel>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Request ID : 05 </FormLabel>
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel>Upload Bank Slip : </FormLabel>
                                <input type="file" placeholder=" Choose a file" variant="outlined" />
                            </div>
                            {/* <Button variant="contained" onClick={() => afterAddingComplain()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button> */}
                            <Button variant="contained" onClick={()=> PlaceRefund()}  sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Place Refund</Button>
                        </div>
                    </FormControl>
                </div>
            )}
            
            {/* view refund details */}
            {viewRefund && (
                <div>
                    <FormControl sx={{ marginLeft: '30%', borderRadius: '10px', width: '700px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ backgroundColor: 'white',paddingTop:'20px', paddingBottom:'20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div className="form-topic">
                                View Refund Details
                            </div>

                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div className="form-label">
                                    <FormLabel>  Refund ID : 02 </FormLabel>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Request ID : 05 </FormLabel>
                                </div>
                            </div>

                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div className="form-label">
                                    <FormLabel>  Refund Date : 2023/07/20 </FormLabel>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Refund Time : 10:00:00 </FormLabel>
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel>Uploaded Bank Slip : </FormLabel>
                                <img src={ Slip } alt="bank slip" style={{width:'100%', height:'auto',  borderRadius:'10px'}} />
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
