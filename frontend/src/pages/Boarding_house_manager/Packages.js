import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';

import NotificationsIcon from '@mui/icons-material/Notifications';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormLabel, TextField, Typography } from "@mui/material";
import { FormControl } from '@mui/material';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

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

            <div className="boarding-card-line">
                <div className="boarding-card">
                    <div className="boarding-two-icon">
                        <EditIcon />
                        <DeleteIcon color="error" sx={{marginLeft: '15px'}} />
                    </div>
                    <Typography sx={{color:'#FBBD08', fontSize: '35px', fontWeight: 'bold'}}>Gold</Typography>
                    <Typography sx={{color:'black', fontSize: '55px', fontWeight: 'bold'}}>Rs. 4000</Typography>
                    <Typography sx={{color:'#C0C0C0', fontSize: '25px', fontWeight: 'bold'}}>/ week</Typography>
                    <div className="boarding-card-facility">
                        <p><CheckIcon  sx={{marginRight:'20px'}}/>Facility 01</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 02</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 03</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 04</p>
                    </div>
                </div>

                <div className="boarding-card">
                    <div className="boarding-two-icon">
                        <EditIcon />
                        <DeleteIcon color="error" sx={{marginLeft: '15px'}} />
                    </div>
                    <Button variant="contained" sx={{background: "#ED5C01" ,':hover':{backgroundColor: "#ED5C01"}}}>most popular</Button>
                    <Typography sx={{color:'#A6A6A6', fontSize: '35px', fontWeight: 'bold'}}>Silver</Typography>
                    <Typography sx={{color:'black', fontSize: '55px', fontWeight: 'bold'}}>Rs. 3000</Typography>
                    <Typography sx={{color:'#C0C0C0', fontSize: '25px', fontWeight: 'bold'}}>/ week</Typography>
                    <div className="boarding-card-facility">
                        <p><CheckIcon  sx={{marginRight:'20px'}}/>Facility 01</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 02</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 03</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 04</p>
                    </div>
                </div>

                <div className="boarding-card">
                    <div className="boarding-two-icon">
                        <EditIcon />
                        <DeleteIcon color="error" sx={{marginLeft: '15px'}} />
                    </div>
                    <Typography sx={{color:'#55555C', fontSize: '35px', fontWeight: 'bold'}}>Platinum</Typography>
                    <Typography sx={{color:'black', fontSize: '55px', fontWeight: 'bold'}}>Rs. 2000</Typography>
                    <Typography sx={{color:'#C0C0C0', fontSize: '25px', fontWeight: 'bold'}}>/ week</Typography>
                    <div className="boarding-card-facility">
                        <p><CheckIcon  sx={{marginRight:'20px'}}/>Facility 01</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 02</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 03</p>
                        <p><CheckIcon  sx={{marginRight:'20px'}} />Facility 04</p>
                    </div>
                </div>      
            </div>
{/* add a new package */}
            <FormControl  sx={{marginLeft:'35%', borderRadius: '10px', width:'500px', border: '1px', borderStyle:'solid', padding:'20px',backgroundColor:'#E3E3E3', fontFamily:'osnovapro,sans-serif'}}>
                <div className="form-topic">
                    Add New Package
                </div>
                <div className="form-label">
                    <FormLabel>Package Name</FormLabel>
                    <TextField id="outlined-basic" placeholder="Package Name" variant="outlined" />
                </div>

                <div className="form-label">
                    <FormLabel>Price(per week) Rs.</FormLabel>
                    <TextField id="outlined-basic" placeholder="Package Price" variant="outlined" />
                </div>

                <div className="form-label">
                    <FormLabel>Facilities</FormLabel>
                    <TextField id="outlined-basic" placeholder="Facilities" variant="outlined" sx={{marginBottom:'5px'}} />
                    <TextField id="outlined-basic" placeholder="Facilities" variant="outlined"  sx={{marginBottom:'5px'}} />
                    <TextField id="outlined-basic" placeholder="Facilities" variant="outlined"  sx={{marginBottom:'5px'}} />
                </div>
                
                <div className="form-label">
                    <FormLabel>Upload Package Image</FormLabel>
                    <input type="file" placeholder=" Choose a file" variant="outlined" />
                </div>
                <Button variant="contained" sx={{background:"#fe9e0d", marginTop:'10px', ':hover':{backgroundColor: "#ED5C01"}}}>Add Package</Button>
            </FormControl>

{/* view popularity */}
            {/* <div className="popularity-view">
                <div className="form-topic">
                    Popularity
                </div>
            </div> */}
        </div>
    )
}

export default Packages
