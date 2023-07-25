import React, { useState } from "react";
import  '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import ProfilePicture from '../../assests/profile-picture.png';

import NotificationsIcon from '@mui/icons-material/Notifications';


const Refund = () => {
    return (
        <div className="home-container">
            <Header />
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>
                <div>
                    <p>Refund for Boaridng Requests</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div> 
        </div>
    )
}

export default Refund;