import React from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ProfilePicture from '../../assests/profile-picture.png';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PieChart } from '@mui/x-charts/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousIcon from '@mui/icons-material/Dangerous';

const Home = () => {
    // drop down
    const [time, setTime] = React.useState('1');

    const handleChange = (event) => {
        setTime(event.target.value);
    };

    return (
        <div className="home-container">

            <div className="top">
                <div className="top-line">
                    <p>Administrator</p>
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

            <div style={{ padding: '20px', backgroundColor: '#F0F0F5', margin: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'orange' }} />
                        <h3>Analytical Overview</h3>
                    </div>
                    <Box sx={{ width: '120px', marginLeft: '70%' }}>
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
                                <MenuItem value={3}>Last Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                {/* upper 3 boxes */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '300px', height: '180px' }}>
                        <p style={{ fontWeight: 'bold', marginLeft: '10px' }}><PeopleIcon sx={{ color: 'black', marginRight:'6px',  marginLeft:'5px' }} /> Clients</p>
                        <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color:'white' }}>50</p>
                    </div>

                    <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '300px', height: '180px' }}>
                        <p style={{ fontWeight: 'bold' }}><AccountCircleIcon sx={{ color: 'black', marginRight:'6px',  marginLeft:'5px' }} />Managers</p>
                        <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color:'white'  }}>5</p>
                    </div>

                    <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '300px', height: '180px' }}>
                        <p style={{  fontWeight: 'bold' }}><ListIcon sx={{ color: 'black', marginRight:'6px' , marginLeft:'5px' }} /> Pending Verifications</p>
                        <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color:'white'  }}>3</p>
                    </div>
                </div>

                {/* user 2 boxes */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'20px'}}>
                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', width: '600px', height: '280px' }}>
                        <p style={{ marginBottom: '30px', fontWeight: 'bold' }}><VerifiedIcon sx={{ color: 'orange', marginRight:'6px', marginLeft:'5px' }} /> Verified Refund Slips </p>
                        <PieChart
                            colors={['#02FB1B', '#A65959']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Pending' },
                                        { id: 1, value: 15, label: 'Verified' },
                                    ],
                                },
                            ]}
                            width={500}
                            height={200}
                        />
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', width: '600px', height: '280px' }}>
                        <p style={{ marginBottom: '30px', fontWeight: 'bold' }}><DangerousIcon sx={{ color: 'orange', marginRight:'6px',  marginLeft:'5px' }} /> Complains </p>
                        <PieChart
                        colors={['#FFBE9D', '#790052']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 20, label: ' Pending' },
                                        { id: 1, value: 15, label: 'Verified' },
                                    ],
                                },
                            ]}
                            width={500}
                            height={200}
                        />
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Home;