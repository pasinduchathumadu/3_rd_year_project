import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import profile from "../../assests/profile.jpg";
import care from "../../assests/caregiver.jpg";
import care2 from "../../assests/caregiver2.jpg";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';


const MindRelaxingPets = () => {
    const input = new Date();
    const date = input.toDateString();

    return (
        <div>
            <div style={{ display: "flex", marginTop: '4%' }}>
                <div style={{ display: "inline", marginTop: "30px", marginLeft: "2%", width: "33.3%" }}>
                    <Typography>Care Center Manager</Typography>
                    <Typography>Today</Typography>
                    <Typography>{date}</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: "30px",
                        width: "33.3%",
                        justifyContent: "center"
                    }}>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "24px",
                            fontFamily: "fantasy",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Mind Relaxing - Pets
                    </Typography>
                </div>
                <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginLeft: '150%' }}><Stack direction="row" spacing={2} width={300}>
                        <Avatar
                            alt="Travis Howard"
                            src={profile}
                            sx={{ width: 60, height: 60 }}
                        />
                    </Stack>
                    </div>
                </div>
            </div>

            {/* view pets for mind relaxing */}
            <div style={{marginTop:'10px', marginBottom:'10px', marginLeft:'83%'}}>
                <Button sx={{color:'white', backgroundColor:'black', ':hover':{backgroundColor:'black'}}}>Add New Pets<AddIcon /></Button>
            </div>

            <div className="row">
                <div className="column">
                    <div class="card">
                        <img src={care} alt="John" className="top-img" />
                        <Typography sx={{fontSize:'20px'}}><PetsIcon sx={{color:'orange'}} />Jimmy Boy</Typography><br />
                        <Typography sx={{color:'#A9A9A9', fontWeight:'bold'}}>Male </Typography> <br />
                        <Typography><CategoryIcon sx={{color: 'orange'}} /> Altheshion</Typography>
                    </div>
                </div>

                <div className="column">
                    <div class="card">
                        <img src={care2} alt="John" className="top-img" />
                        <Typography sx={{fontSize:'20px'}}><PetsIcon sx={{color:'orange'}} />Jimmy Boy</Typography><br />
                        <Typography sx={{color:'#A9A9A9', fontWeight:'bold'}}>Male </Typography> <br />
                        <Typography><CategoryIcon sx={{color: 'orange'}} /> Altheshion</Typography>
                        
                    </div>
                </div>

                <div className="column">
                    <div class="card">
                        <img src={care} alt="John" className="top-img" />
                        <Typography sx={{fontSize:'20px'}}><PetsIcon sx={{color:'orange'}} />Jimmy Boy</Typography><br />
                        <Typography sx={{color:'#A9A9A9', fontWeight:'bold'}}>Male </Typography> <br />
                        <Typography><CategoryIcon sx={{color: 'orange'}} /> Altheshion</Typography>
                    </div>
                </div>

                <div className="column">
                    <div class="card">
                        <img src={care2} alt="John" className="top-img" />
                        <Typography sx={{fontSize:'20px'}}><PetsIcon sx={{color:'orange'}} />Jimmy Boy</Typography><br />
                        <Typography sx={{color:'#A9A9A9', fontWeight:'bold'}}>Male </Typography> <br />
                        <Typography><CategoryIcon sx={{color: 'orange'}} /> Altheshion</Typography>
                    </div>
                </div>

                <div className="column">
                    <div class="card">
                        <img src={care} alt="John" className="top-img" />
                        <Typography sx={{fontSize:'20px'}}><PetsIcon sx={{color:'orange'}} />Jimmy Boy</Typography><br />
                        <Typography sx={{color:'#A9A9A9', fontWeight:'bold'}}>Male </Typography> <br />
                        <Typography><CategoryIcon sx={{color: 'orange'}} /> Altheshion</Typography>
                    </div>
                </div>

                <div className="column">
                    <div class="card">
                        <img src={care2} alt="John" className="top-img" />
                        <Typography sx={{fontSize:'20px'}}><PetsIcon sx={{color:'orange'}} />Jimmy Boy</Typography><br />
                        <Typography sx={{color:'#A9A9A9', fontWeight:'bold'}}>Male </Typography> <br />
                        <Typography><CategoryIcon sx={{color: 'orange'}} /> Altheshion</Typography>
                    </div>
                </div>
            </div>

            {/* add pets for mind relaxing */}



        </div>
    )
}

export default MindRelaxingPets