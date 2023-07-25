import React, { useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormLabel, TextField, Typography } from "@mui/material";
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";


const Packages = () => {
    const [new1, setNew] = useState(true);  //package cards
    const [form, setForm] = useState(false); //add new package form
    const [updateform, setUpdateform] = useState(false); //update form
    const [popularity, setPopularity] = useState(false); // popularity
    
    // after click on add new package button
    const Change = () => {
        setNew(false);
        setForm(true);
    }
    // after click on submit button on the add new package form
    const afterSubmit = () => {
        // check
        setNew(true);
        setForm(false);
    }
    // after click on update icon
    const update = () => {
        setNew(false);
        setUpdateform(true);
    }
    // after click on submit button on update form
    const afterUpdate = () => {
        // check
        setNew(true);
        setUpdateform(false);
    }
    // after click on view popularity
    const clickPopularity = () => {
        setNew(false);
        setPopularity(true);
    }

    // finish the viewing
    const afterview = () => {
        setNew(true);
        setPopularity(false);
    }

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

            <Box sx={{width:'95%', marginTop:'10px', marginBottom:'10px', marginLeft:'35px', marginRight:'10px', paddingRight:'10px', paddingLeft:'10px'}}>
                <Tabs
                variant="fullWidth"
                aria-label="Tab Component"
                indicatorColor="transparent"
                sx={{borderRadius:'10px'}}
                >

                    <Tab sx={{backgroundColor: 'orange'}} label="Boarding House Packages" ></Tab>
                </Tabs>
            </Box>

            <div className="top-button-header">
                <Button variant="contained" onClick={()=>Change()} sx={{background: "black" ,':hover':{backgroundColor: "black"}}}>Add New Package <AddIcon sx={{marginLeft: '10px'}}/></Button>
                <Button variant="contained" onClick={()=>clickPopularity()} sx={{background: "black" ,':hover':{backgroundColor: "black"}}}>View Popularity</Button>
            </div>

            {new1 && (
                <div className="boarding-card-line">
                    <div className="boarding-card">
                        <div className="boarding-two-icon">
                            <EditIcon onClick={()=> update()} />
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
                            <EditIcon  onClick={()=> update()} />
                            <DeleteIcon color="error" sx={{marginLeft: '15px'}} />
                        </div>
                        <Button variant="contained" sx={{background: "#fe9e0d" ,':hover':{backgroundColor: "#fe9e0d"}}}>most popular</Button>
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
                            <EditIcon  onClick={()=> update()} />
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
            )}

        {/* add a new package */}
            {form && (
            <FormControl  sx={{marginLeft:'30%', borderRadius: '10px', width:'700px', border: '1px', borderStyle:'solid', padding:'20px',backgroundColor:'rgb(255, 240, 224)', fontFamily:'osnovapro,sans-serif'}}>
                <div style={{backgroundColor:'white', padding:'15px', borderRadius:'10px' }}>
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
                    <Button variant="contained" onClick={()=> afterSubmit()} sx={{background:"#fe9e0d", marginTop:'10px', ':hover':{backgroundColor: "#fe9e0d"}, width:'100%'}}>Add Package</Button>
                </div>
            </FormControl>
            )}

            {/* update package */}
            {updateform && (
            <FormControl  sx={{marginLeft:'30%', borderRadius: '10px', width:'700px', border: '1px', borderStyle:'solid', padding:'20px',backgroundColor:'rgb(255, 240, 224)', fontFamily:'osnovapro,sans-serif'}}>
                <div style={{backgroundColor:'white', padding:'15px', borderRadius:'10px' }}>
                    <div className="form-topic">
                        Update Package
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
                        <FormLabel>Update Package Image</FormLabel>
                        <input type="file" placeholder=" Choose a file" variant="outlined" />
                    </div>
                    <Button variant="contained" onClick={()=> afterUpdate()} sx={{background:"#fe9e0d", marginTop:'10px', ':hover':{backgroundColor: "#fe9e0d"}, width:'100%'}}>Update Package</Button>
                </div>
            </FormControl>
            )}
           
            {/* remove a package */}


            {/* view popularity */}
            {popularity && (
                <div className="popularity-view">
                    <div className="form-topic">
                        Popularity
                    </div>
                    <div>
                        <p>Gold      : 20% </p>
                        <p>Silver    : 45% </p>
                        <p>Platinum  : 35% </p>
                    </div>
                    <Button variant="contained" onClick={()=>afterview()} sx={{background:"#fe9e0d", marginTop:'10px', ':hover':{backgroundColor: "#fe9e0d"}, width:'100%'}}>Finish Viewing</Button>
                </div>
            )}
        </div>
    )
}

export default Packages
