
import React, { useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ProfilePicture from '../../assests/profile-picture.png';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableHead, TableRow, TableBody, TableCell, Button } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TableViewIcon from '@mui/icons-material/TableView';

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


const Dashboard = () => {
    // drop down
    const [time, setTime] = React.useState('1');

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    const [main, setmain] = useState(true);
    const [tables, setTables] = useState(false);
    // click on particualar request box
    const ClickRequest = () => {
        setmain(false);
        setTables(true);
    }

    // finish viewing the details 
    const FinishViewing = () => {
        setTables(false);
        setmain(true);
    }

    return (

        <div className="home-container" style={{ marginTop: '4%'}}>
            <div className="top">
                <div className="top-line">
                    <p>Medi Care Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>
                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>


            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper" style={{ backgroundColor: 'orange', height: '250px' }}>
                    <div className="boarding-box-header">
                        <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Analytical Overview</h3>
                        <Box sx={{ minWidth: 120, marginLeft: '315px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="boarding-wrapper-box-mian">
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }}>
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Pending Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>10</h1>
                        </div>
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Completed Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>06</h1>
                        </div>
                    </div>
                </div>

                <div className="boarding-wrapper" style={{ backgroundColor: 'orange', height: '250px' }}>
                    <div className="boarding-box-header">
                        <AssignmentLateIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Pending Appointments</h3>
                    </div>

                    {main && (
                        <div>
                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment  ID : 1 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>

                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment ID : 2 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>

                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '5px', width: '100%', marginBottom: '5px' }}>Appointment ID : 3 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>
                        </div>
                    )}



                </div>
            </div>

            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper" style={{ backgroundColor: '#F0F0F5', height: '310px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AssessmentIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black',padding: '20px' }} />
                            <h3 style={{ color: 'black' }}>Pet Analyze</h3>
                        </div>

                        <Box sx={{ minWidth: 120, marginLeft: '400px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div>
                        <BarChart
                            colors={['black']}
                            sx={{ marginBottom: '3%', backgroundColor: '#f0f0f5' }}
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: ['Cats', 'Dogs'],

                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: [5, 10],
                                },
                            ]}

                            width={600}
                            height={250}
                        />
                    </div>


                </div>

                <div className="boarding-wrapper" style={{ backgroundColor: '#F0F0F5', height: '310px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <InventoryIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>Appointments</h3>
                        </div>

                        <Box sx={{ minWidth: 120, marginLeft: '400px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div>

                        <PieChart
                            colors={['#FBBD08', '#A6A6A6', 'black']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 15, label: 'Pending' },
                                        { id: 1, value: 20, label: 'Accepted' },
                                        { id: 2, value: 10, label: 'Complete' },
                                    ],
                                },
                            ]}
                            width={550}
                            height={200}
                        />
                    </div>
                </div>
            </div>

            {/* view details of pending boarding requests (after click on) */}
            {tables && (
                <div style={{ padding: '20px', margin: '20px', borderRadius: '10px', backgroundColor: '#f0f0f5' }}>
                    <p>Request ID : 1 </p>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#fe9e0d', color: 'blue' }}>
                            <StyledTableRow>
                                <StyledTableCell align="center">Client ID</StyledTableCell>
                                <StyledTableCell align="center">Pet ID</StyledTableCell>
                                <StyledTableCell align="center">Pickup Date</StyledTableCell>
                                <StyledTableCell align="center">Pickup Time</StyledTableCell>
                            </StyledTableRow>
                        </TableHead >
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell align="center">01</StyledTableCell>
                                <StyledTableCell align="center">04</StyledTableCell>
                                <StyledTableCell align="center">20/07/2023</StyledTableCell>
                                <StyledTableCell align="center">10:00:00</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>

                    <Button onClick={() => FinishViewing()} sx={{ backgroundColor: 'orange', color: 'white', width: '100px', marginTop: '10px', marginLeft: '90%' }}>Done</Button>

                </div>
            )}




        </div>
    )
}

export default Dashboard
