import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import  ProfilePicture  from '../../assests/profile-picture.png';

// import {
//     Chart as ChartJS,
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend 
// } from 'chart.js';

// import { Bar } from 'react-chartjs-2';

// ChartJS.register (
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend 
// )

const Home = () => {
    // const data = {
    //     labels: ['Cats', 'Dogs'],
    //     datasets: [
    //         {
    //             label: '369',
    //             data: [3,6,9],
    //             backgroundColor: 'aqua',
    //             borderColor: 'black',
    //             borderWidth: 1,
    //         }
    //     ]
    // }

    return (
        <div className="home-container">
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


            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <h3>Analytical Overview</h3>
                    <div className="boarding-wrapper-box-mian">
                        <div className="boarding-wrapper-box">
                            <h1>10</h1>
                            <p>Current Boarding Pets</p>
                        </div>
                        <div className="boarding-wrapper-box">
                            <h1>06</h1>
                            <p>Completed Requests</p>
                        </div>
                    </div>
                </div>

                <div className="boarding-wrapper">
                    <h3>Pending Boarding Requests</h3>
                    <div className="bording-pending-box">
                        <p>Request ID : 02</p>
                    </div>
                    <div className="bording-pending-box">
                        <p>Request ID : 03</p>
                    </div>
                    <div className="bording-pending-box">
                        <p>Request ID : 04</p>
                    </div>
                </div>
            </div>

            
            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <h3>Pet Analyze</h3>
                </div>

                <div className="boarding-wrapper">
                    <h3>Packages</h3>
                      
                </div>
            </div>
        </div>
    )
}

export default Home