import React, { useState } from "react";
import  '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import ProfilePicture from '../../assests/profile-picture.png';

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

const Clients = () => {
    const [clients, setClients] = React.useState('1');
  
    const [showRequests, setShowRequests] = useState(0);

    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const handleForm = (event,existing_value) => {
        setShowRequests(existing_value)
    };

    return (
        <div className="home-container">
            <Header />
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

            <Box sx={{width:'98%', marginTop:'10px', marginBottom:'10px', marginLeft:'20px', marginRight:'10px', paddingRight:'10px', paddingLeft:'10px'}}>
                <Tabs
                value={showRequests}
                variant="fullWidth"
                aria-label="Tab Component"
                onChange={handleForm}
                indicatorColor="transparent"
                sx={{borderRadius:'10px'}}
                >

                    <Tab sx={{backgroundColor:showRequests === 0 ? 'orange':'#F0F0F5',color:'black'}} label="Clients' Request" ></Tab>
                    <Tab sx={{backgroundColor:showRequests === 1 ? 'orange':'#F0F0F5',color:'black'}} label="Refund Requests"></Tab>

                </Tabs>
            </Box>

            {showRequests===1 && (
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
                                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button sx={{ color: 'white', backgroundColor: '#fe9e0d', ':hover': { backgroundColor: '#fe9e0d' } }}>Pets Details</Button>
                                           </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {showRequests===0 && (
                <div>
                    <div className="drop-down-box1">
                        <div className="top-button-header">
                            <Button variant="contained"  sx={{background: "black" ,':hover':{backgroundColor: "black"}}}>Refund for Requests</Button>
                        </div>
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
                                                <Button sx={{ color: 'white', backgroundColor: '#fe9e0d', ':hover': { backgroundColor: '#fe9e0d' } }}>Pets Details</Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {secondrows.status === 'accepted' ? <Button sx={{ color: 'white', backgroundColor: '#555555', ':hover': { backgroundColor: '#555555' } }}>Completed</Button> : ""}
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

        </div>
    );
};

export default Clients;
