import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";

import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import  ProfilePicture  from '../../assests/profile-picture.png';
import BoxPicture1 from '../../assests/boarding-analyse-1.png';
import BoxPicture2 from '../../assests/boarding-analyse-2.png';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
                   <p style={{fontSize: '18px', fontWeight: 1000}}>Boarding House Manager - DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon"/>
                    <img src= { ProfilePicture } alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>
        

            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <AnalyticsIcon className="box-icons"/>
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
                        <div className="boarding-wrapper-box" style={{backgroundImage:`url(${ BoxPicture1 })` }}>
                            <p><PetsIcon />Current Boarding Pets</p>
                            <br />
                            <h1 style={{fontWeight: 1000, textAlign: 'center'}}>10</h1>
                        </div>
                        <div className="boarding-wrapper-box" style={{backgroundImage:`url(${ BoxPicture2 })` }} >
                            <p><PetsIcon />Completed Requests</p>
                            <br />
                            <h1 style={{fontWeight: 1000, textAlign: 'center' }}>06</h1>
                        </div>
                    </div>
                </div>

                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <AssignmentLateIcon className="box-icons"/>
                        <h3>Pending Boarding Requests</h3>
                    </div>
                    <div className="bording-pending-box">
                        <p>Request ID : 02</p>
                        <ArrowDropDownIcon/>
                    </div>
                    <div className="bording-pending-box">
                        <p>Request ID : 03</p>
                        <ArrowDropDownIcon/>
                    </div>
                    <div className="bording-pending-box">
                        <p> Request ID : 04</p>
                        <ArrowDropDownIcon/>
                    </div>
                </div>
            </div>
            
            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <div className="boarding-box-header">
                        <AssessmentIcon className="box-icons"/>
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
                        <InventoryIcon className="box-icons"/>
                        <h3>Packages</h3>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Home
