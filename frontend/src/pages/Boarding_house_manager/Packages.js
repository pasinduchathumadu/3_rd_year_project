import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';

import NotificationsIcon from '@mui/icons-material/Notifications';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


const Packages = () => {
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
                   <p style={{fontSize: '18px', fontWeight: 1000}}>Boarding House Packages</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon"/>
                    <img src= { ProfilePicture } alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <div className="top-button-header">
                <Button variant="contained" sx={{background: "black" ,':hover':{backgroundColor: "black"}}}>Add New Package <AddIcon sx={{marginLeft: '10px'}}/></Button>
                <Button variant="contained" sx={{background: "black" ,':hover':{backgroundColor: "black"}}}>View Popularity</Button>
            </div>
        </div>
    )
}

export default Packages


// export default function BasicButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }