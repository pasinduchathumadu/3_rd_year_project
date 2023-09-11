
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
import { Table, TableHead, TableRow, TableBody, TableCell, Button, InputLabel } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TableViewIcon from '@mui/icons-material/TableView';
import { ResponsiveChartContainer, LinePlot, useDrawingArea } from '@mui/x-charts';
import { useNavigate } from "react-router";


const StyledPath = styled('path')(({ theme }) => ({
    fill: 'none',
    stroke: theme.palette.text.primary,
    shapeRendering: 'crispEdges',
    strokeWidth: 2,
    pointerEvents: 'none',
}));

const StyledText = styled('text')(({ theme }) => ({
    stroke: 'none',
    fill: theme.palette.text.primary,
    shapeRendering: 'crispEdges',
}));
function DrawingAreaBox() {
    const { left, top, width, height } = useDrawingArea();
    return (
        <React.Fragment>
            <StyledPath
                d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
            />
            <circle cx={left} cy={top} r={3} style={{ fill: 'orange' }} />
            <circle cx={left + width} cy={top + height} r={3} style={{ fill: 'orange' }} />
            <StyledText
                x={left}
                y={top}
                textAnchor="start"
                dominantBaseline="text-after-edge"
            >

            </StyledText>
            <StyledText

                textAnchor="end"
                dominantBaseline="text-before-edge"
            >

            </StyledText>
        </React.Fragment>
    );
}

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
    const navigate = useNavigate("")

    const input = new Date();
    const date = input.toDateString();
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

    // connect profile 
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)

    }

    return (

        <div className="home-container" style={{ marginTop: '4%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Medi Help Center Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}>
                        <img src={getProfilepicturepath("medi_profile.jpg")}
                            alt="profilepicture"
                            className="boarding-profile-picture" />
                    </Button>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', marginBottom:'1%' }}>
                <div style={{ backgroundColor: 'orange', height: '250px', width: '46%', padding: '1%', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="boarding-box-header">
                            <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>Appointments Analyze</h3>
                        </div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    variant='outlined'
                                    label="Time"
                                    // onChange={handleChange1}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Month</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ backgroundColor: 'white', width: '50%', borderRadius: '10px', margin: '1%' , padding:'1%'}} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Completed Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>07</h1>
                        </div>
                        <div style={{ backgroundColor: 'white', width: '50%', borderRadius: '10px', margin: '1%', padding:'1%' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Pending Appointments</p>
                            <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>03</h1>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: 'orange', height: '250px', width: '46%', padding: '1%', borderRadius: '10px', marginRight: '4%' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row' }}>
                        <AssignmentLateIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Pending Appointments</h3>
                    </div>
                    {main && (
                        <div>
                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '1%', width: '100%', marginBottom: '5px', height: '50px' }}>Appointment  ID : 1 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>

                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '1%', width: '100%', marginBottom: '5px', height: '50px' }}>Appointment ID : 2 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>
                            <div>
                                <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '1%', width: '100%', marginBottom: '5px', height: '50px' }}>Appointment ID : 3 <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                            </div>


                        </div>
                    )}
                    {tables && (
                        <div style={{ padding: '20px', margin: '20px', borderRadius: '10px', backgroundColor: '#f0f0f5' }}>
                            <p>Appointment ID : 1 </p>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#fe9e0d', color: 'blue' }}>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Doctor ID</StyledTableCell>
                                        <StyledTableCell align="center">Appointment Date</StyledTableCell>
                                        <StyledTableCell align="center">Appointment Time</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead >
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">01</StyledTableCell>
                                        <StyledTableCell align="center">04</StyledTableCell>
                                        <StyledTableCell align="center">05</StyledTableCell>
                                        <StyledTableCell align="center">20/07/2023</StyledTableCell>
                                        <StyledTableCell align="center">10:00:00</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>

                            <Button onClick={() => FinishViewing()} sx={{
                                backgroundColor: 'orange', color: 'white', width: '100px', marginTop: '10px', marginLeft: '80%', ':hover': {
                                    backgroundColor: 'orange',
                                }
                            }}>Done</Button>

                        </div>
                    )}
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', marginTop:'1%' }}>
                <div style={{ backgroundColor: '#F0F0F5', height: '310px', width: '46%', padding: '1%', borderRadius: '10px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AssessmentIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>System Doctors </h3>
                        </div>
                    </div>
                    <div>
                        <PieChart
                            colors={['#FBBD08', '#55555C']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 15, label: 'Weekdays' },
                                        { id: 1, value: 25, label: 'Weekend' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={200}
                        />
                    </div>
                </div>

                <div style={{ backgroundColor: '#F0F0F5', height: '310px', width: '46%', padding: '1%', borderRadius: '10px', marginRight: '4%'  }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <InventoryIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ fontWeight: 'normal', marginBottom: '50', color: 'black' }}>Daily</h3>
                            <h3 style={{ fontWeight: 'normal', marginTop: '0', color: 'black' }}>Appointment</h3>
                            <h3 style={{ fontWeight: 'normal', marginTop: '0', color: 'black' }}>Analyze</h3>
                        </div>
                    </div>
                    <div>

                        <ResponsiveChartContainer
                            margin={{ top: 20, left: 10, right: 10, bottom: 30 }}
                            height={250}
                            series={[
                                {
                                    type: 'line',
                                    data: [13, 13, 54, 651, 657, 987, 64, 654, 954, 654, 897, 84],
                                },
                            ]}
                            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                        >

                            <LinePlot className="custom-chart-line" /> {/* Set the line chart color to orange */}
                            <DrawingAreaBox />
                        </ResponsiveChartContainer>
                        <div className="x-axis-labels">
                            <span>Days</span>

                        </div>

                        <div className="y-axis-labels">
                            <span>Appointments</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
