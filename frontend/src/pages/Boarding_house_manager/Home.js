import React from "react";
import '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";

import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import  ProfilePicture  from '../../assests/profile-picture.png';
// import BoxPicture1 from '../../assests/boarding-analyse-1.png';
// import BoxPicture2 from '../../assests/boarding-analyse-2.png';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { margin, typography, width } from "@mui/system";
import { Table, TableHead, TableRow, TableBody, TableCell} from "@mui/material";

const Home = () => {
    const [time, setTime] = React.useState('1');

      const handleChange = (event) => {
        setTime(event.target.value);
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
                   <p style={{fontSize: '20px', fontWeight: 1000, color:'black'}}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon"/>
                    <img src= { ProfilePicture } alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>
        
            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <AnalyticsIcon sx={{marginRight:'10px', marginTop:'2px', color:'orange'}} />
                        <h3>Analytical Overview</h3>
                        <Box sx={{ minWidth: 120, marginLeft:'315px'}}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{fontSize:'12px'}}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>  
                    </div>

                    <div className="boarding-wrapper-box-mian">
                        <div className="boarding-wrapper-box" style={{backgroundColor:'white' }}>
                            <p style={{ fontWeight:'bold'}}><PetsIcon sx={{color:'orange', marginRight:'5px'}} />Current Boarding Pets</p>
                            <br />
                            <h1 style={{fontWeight: '1000', textAlign: 'center', fontSize:'40px', color:'orange'}}>10</h1>
                        </div>
                        <div className="boarding-wrapper-box" style={{backgroundColor:'white' }} >
                            <p style={{ fontWeight:'bold'}}><PetsIcon sx={{color:'orange',  marginRight:'5px'}} />Completed Requests</p>
                            <br />
                            <h1 style={{ fontWeight:'1000', textAlign: 'center', fontSize:'40px', color:'orange' }}>06</h1>
                        </div>
                    </div>
                </div>

                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <AssignmentLateIcon sx={{marginRight:'10px', marginTop:'2px', color:'orange'}}/>
                        <h3>Pending Boarding Requests</h3>
                    </div>
                    
                    <Accordion sx={{
                        border: 'black',
                        borderWidth:'2px',
                        borderRadius:'10px',
                        marginBottom:'10px',
                        marginTop:'10px'
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Request ID : 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead sx={{backgroundColor:'#fe9e0d', color:'white'}}>
                                    <TableRow>
                                        <TableCell align="center">Client ID</TableCell>
                                        <TableCell align="center">Pet ID</TableCell>
                                        <TableCell align="center">Pickup Date</TableCell>
                                        <TableCell align="center">Pickup Time</TableCell>
                                    </TableRow>
                                </TableHead >
                                <TableBody>
                                    <TableCell align="center">01</TableCell>
                                    <TableCell align="center">04</TableCell>
                                    <TableCell align="center">20/07/2023</TableCell>
                                    <TableCell align="center">10:00:00</TableCell>
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion  sx={{
                        border: 'black',
                        borderWidth:'2px',
                        borderRadius:'10px',
                        marginBottom:'10px',
                        marginTop:'10px'
                    }}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                        <Typography>Request ID : 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead sx={{backgroundColor:'#fe9e0d', color:'white'}}>
                                    <TableRow>
                                        <TableCell align="center">Client ID</TableCell>
                                        <TableCell align="center">Pet ID</TableCell>
                                        <TableCell align="center">Pickup Date</TableCell>
                                        <TableCell align="center">Pickup Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell align="center">02</TableCell>
                                    <TableCell align="center">03</TableCell>
                                    <TableCell align="center">20/07/2023</TableCell>
                                    <TableCell align="center">10:00:00</TableCell>
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
            
            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <AssessmentIcon sx={{marginRight:'10px', marginTop:'2px', color:'orange'}}/>
                        <h3>Pet Analyze</h3>

                        <Box sx={{ minWidth: 120, marginLeft:'400px'}}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{fontSize:'12px'}}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    
                </div>

                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <InventoryIcon sx={{marginRight:'10px', marginTop:'2px', color:'orange'}}/>
                        <h3>Packages</h3>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Home
