import React, { useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';




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

function createCurrentData (id, category, p_ckage, aDate, rDate, payment) {
    return {id, category, p_ckage, aDate, rDate, payment};
}

const currents = [
    createCurrentData(1,'cat', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCurrentData(2,'dog', 'gold', '2023-07-26', '2023-07-30', '1200.00'),
    createCurrentData(3,'dog', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCurrentData(4,'cat', 'platinum', '2023-07-26', '2023-07-30', '1200.00'),
];

function createRequestedData (id, category, p_ckage, aDate, rDate, payment, status) {
    return {id, category, p_ckage, aDate, rDate, payment, status};
}

const requests = [
    createRequestedData(1,'cat', 'silver', '2023-07-26', '2023-07-30', '1200.00', 'pending'),
    createRequestedData(2,'dog', 'gold', '2023-07-26', '2023-07-30', '1200.00','pending'),
    createRequestedData(3,'dog', 'silver', '2023-07-26', '2023-07-30', '1200.00', 'accepted'),
    createRequestedData(4,'cat', 'platinum', '2023-07-26', '2023-07-30', '1200.00','accepted'),
];

function createCompletedData (id, category, p_ckage, aDate, rDate, payment) {
    return {id, category, p_ckage, aDate, rDate, payment};
}

const completes = [
    createCompletedData(1,'cat', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCompletedData(2,'dog', 'gold', '2023-07-26', '2023-07-30', '1200.00'),
    createCompletedData(3,'dog', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCompletedData(4,'cat', 'platinum', '2023-07-26', '2023-07-30', '1200.00'),
];



const BoardPets = () => {
    // const [currents, setCurrents] = React.useState('1');
    // const [requests, setRequests] = useState('0');
    // const [completes, setCompletes] = useState('2');

    // const handleChange = (event) => {
    //     setClients(event.target.value);
    // };

    // const handleForm = (event,existing_value) => {
    //     setOwn(existing_value)
    // };





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
                <NotificationsIcon className="bell-icon"/>
                <img src= { ProfilePicture } alt="profilepicture" className="boarding-profile-picture" />
            </div>
        </div>

        <Box sx={{width:'98%', marginTop:'10px', marginBottom:'10px', marginLeft:'20px', marginRight:'10px', paddingRight:'10px', paddingLeft:'10px'}}>
                <Tabs
                // value={own}
                variant="fullWidth"
                aria-label="Tab Component"
                // onChange={handleForm}
                indicatorColor="transparent"
                sx={{borderRadius:'10px'}}
                >
                    {/* <Tab sx={{backgroundColor:own === 0 ? 'orange':'white',color:'black'}} label="Current Boarding Pets" ></Tab> */}
                    {/* <Tab sx={{backgroundColor:own === 1 ? 'orange':'white',color:'black'}} label="Requested Pets"></Tab> */}
                    {/* <Tab sx={{backgroundColor:own === 2 ? 'orange':'white',color:'black'}} label="Past Boarded Pets"></Tab> */}
                    <Tab label="Current Boarding Pets"></Tab>
                    <Tab label="Requested Pets"></Tab>
                    <Tab label="Past Boarded Pets"></Tab>
                </Tabs>
            </Box>

            {/* current boarding pets */}
            <div>
                <div className="drop-down-box">
                    <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={clients}
                                variant='filled'
                                label="clients"
                                // onChange={handleChange}
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
                                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Package</StyledTableCell>
                                    <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                    <StyledTableCell align="center">Return Time</StyledTableCell>
                                    <StyledTableCell align="center">Payment(Rs.)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currents.map((current) => (
                                    <StyledTableRow key={current.id}>
                                        <StyledTableCell align="center">{current.id}</StyledTableCell>
                                        <StyledTableCell align="center">{current.category}</StyledTableCell>
                                        <StyledTableCell align="center">{current.p_ckage}</StyledTableCell>
                                        <StyledTableCell align="center">{current.aDate}</StyledTableCell>
                                        <StyledTableCell align="center">{current.rDate}</StyledTableCell>
                                        <StyledTableCell align="center">{current.payment}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* requested pets */}
            <div>
                <div className="drop-down-box">
                    <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={clients}
                                variant='filled'
                                label="clients"
                                // onChange={handleChange}
                                l
                                sx={{ fontSize: '11px' }}>
                                <MenuItem value={1}>All</MenuItem>
                                <MenuItem value={2}>Pending</MenuItem>
                                {/* <MenuItem value={3}>Completed</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div className="form-content">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Package</StyledTableCell>
                                    <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                    <StyledTableCell align="center">Return Time</StyledTableCell>
                                    <StyledTableCell align="center">Payment(Rs.)</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map((request) => (
                                    <StyledTableRow key={request.id}>
                                        <StyledTableCell align="center">{request.id}</StyledTableCell>
                                        <StyledTableCell align="center">{request.category}</StyledTableCell>
                                        <StyledTableCell align="center">{request.p_ckage}</StyledTableCell>
                                        <StyledTableCell align="center">{request.aDate}</StyledTableCell>
                                        <StyledTableCell align="center">{request.rDate}</StyledTableCell>
                                        <StyledTableCell align="center">{request.payment}</StyledTableCell>
                                        <StyledTableCell align="center">{request.status}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* past boarded pets */}
            <div>
                <div className="drop-down-box">
                    <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={clients}
                                variant='filled'
                                label="clients"
                                // onChange={handleChange}
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
                                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Package</StyledTableCell>
                                    <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                    <StyledTableCell align="center">Return Time</StyledTableCell>
                                    <StyledTableCell align="center">Payment(Rs.)</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completes.map((complete) => (
                                    <StyledTableRow key={complete.id}>
                                        <StyledTableCell align="center">{complete.id}</StyledTableCell>
                                        <StyledTableCell align="center">{complete.category}</StyledTableCell>
                                        <StyledTableCell align="center">{complete.p_ckage}</StyledTableCell>
                                        <StyledTableCell align="center">{complete.aDate}</StyledTableCell>
                                        <StyledTableCell align="center">{complete.rDate}</StyledTableCell>
                                        <StyledTableCell align="center">{complete.payment}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button sx={{color:'white', backgroundColor:'#fe9e0d', ':hover':{ backgroundColor: '#fe9e0d'}}}>Generate Report</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>


            </div>

        
       
    </div>
    )
}

export default BoardPets