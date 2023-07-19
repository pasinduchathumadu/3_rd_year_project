import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';
import Button from '@mui/material/Button';

import NotificationsIcon from '@mui/icons-material/Notifications';

const BoardPets = () => {
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

        <div className="top-line-bar"> 
            {/* <Button sx={{width:'100%', border:'solid black 1px'}}>Boarding Pets</Button> */}
            <Button sx={{width:'33.34%', border:'solid black 1px'}}>Current Boarding Pets</Button>
            <Button sx={{width:'33.34%', border:'solid black 1px'}}>Requested  Pets</Button>
            <Button sx={{width:'33.34%', border:'solid black 1px'}}>Past Boarded Pets</Button>
        </div>
    </div>
    )
}

export default BoardPets