import { Avatar, Button, FormControl, FormLabel, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import profile from "../../assests/profile.jpg";
import care from "../../assests/caregiver.jpg";
import care2 from "../../assests/caregiver2.jpg";
import AddIcon from "@mui/icons-material/Add";
// import StarIcon from "@mui/icons-material/Star";
import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';


const MindRelaxingPets = () => {
    const input = new Date();
    const date = input.toDateString();

    const [viewpet, setviewpet] = useState(true)
    const [addpet, setaddpet] = useState(false)

    // click on add new pet button
    const addnewpet = () => {
        setviewpet(false)
        setaddpet(true)
    }

    // back without adding a pet
    const backfromaddpet = () => {
        setviewpet(true)
        setaddpet(false)
    }

    return (
        <div>
            {viewpet && (
                <>
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

                    <div style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '83%' }}>
                        <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={addnewpet}>Add New Pets<AddIcon /></Button>
                    </div>

                    <div className="row">
                        <div className="column">
                            <div class="card">
                                <img src={care} alt="John" className="top-img" />
                                <Typography sx={{ fontSize: '20px' }}><PetsIcon sx={{ color: 'orange' }} />Jimmy Boy</Typography><br />
                                <Typography sx={{ color: '#A9A9A9', fontWeight: 'bold' }}>Male </Typography> <br />
                                <Typography><CategoryIcon sx={{ color: 'orange' }} /> Altheshion</Typography>
                            </div>
                        </div>

                        <div className="column">
                            <div class="card">
                                <img src={care2} alt="John" className="top-img" />
                                <Typography sx={{ fontSize: '20px' }}><PetsIcon sx={{ color: 'orange' }} />Jimmy Boy</Typography><br />
                                <Typography sx={{ color: '#A9A9A9', fontWeight: 'bold' }}>Male </Typography> <br />
                                <Typography><CategoryIcon sx={{ color: 'orange' }} /> Altheshion</Typography>

                            </div>
                        </div>

                        <div className="column">
                            <div class="card">
                                <img src={care} alt="John" className="top-img" />
                                <Typography sx={{ fontSize: '20px' }}><PetsIcon sx={{ color: 'orange' }} />Jimmy Boy</Typography><br />
                                <Typography sx={{ color: '#A9A9A9', fontWeight: 'bold' }}>Male </Typography> <br />
                                <Typography><CategoryIcon sx={{ color: 'orange' }} /> Altheshion</Typography>
                            </div>
                        </div>

                        <div className="column">
                            <div class="card">
                                <img src={care2} alt="John" className="top-img" />
                                <Typography sx={{ fontSize: '20px' }}><PetsIcon sx={{ color: 'orange' }} />Jimmy Boy</Typography><br />
                                <Typography sx={{ color: '#A9A9A9', fontWeight: 'bold' }}>Male </Typography> <br />
                                <Typography><CategoryIcon sx={{ color: 'orange' }} /> Altheshion</Typography>
                            </div>
                        </div>

                        <div className="column">
                            <div class="card">
                                <img src={care} alt="John" className="top-img" />
                                <Typography sx={{ fontSize: '20px' }}><PetsIcon sx={{ color: 'orange' }} />Jimmy Boy</Typography><br />
                                <Typography sx={{ color: '#A9A9A9', fontWeight: 'bold' }}>Male </Typography> <br />
                                <Typography><CategoryIcon sx={{ color: 'orange' }} /> Altheshion</Typography>
                            </div>
                        </div>

                        <div className="column">
                            <div class="card">
                                <img src={care2} alt="John" className="top-img" />
                                <Typography sx={{ fontSize: '20px' }}><PetsIcon sx={{ color: 'orange' }} />Jimmy Boy</Typography><br />
                                <Typography sx={{ color: '#A9A9A9', fontWeight: 'bold' }}>Male </Typography> <br />
                                <Typography><CategoryIcon sx={{ color: 'orange' }} /> Altheshion</Typography>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* add new pets for mind relaxing */}
            {addpet && (
                <div>
                    <div style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '30px', width: '40%', marginLeft: '30%', marginTop: '6%' }}>
                        <div>
                            <IconButton onClick={backfromaddpet}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '500px' }} /></IconButton>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Add New Pets</Typography>
                            <hr />
                        </div>
                        <FormControl>
                            <div>
                                <FormLabel sx={{ color: 'black', marginRight: '' }}>Pet Name</FormLabel>
                                <TextField id="outlined-basic" placeholder="Pet Name" variant="outlined" required sx={{ width: '100%', width: '550px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Breed</FormLabel>
                                <TextField id="outlined-basic" placeholder="Breed" variant="outlined" sx={{ width: '100%', width: '550px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Category</FormLabel>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value=""
                                        displayEmpty
                                        sx={{ width: '550px' }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Cat</MenuItem>
                                        <MenuItem value={20}>Dog</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Sex</FormLabel>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value=""
                                        displayEmpty
                                        sx={{ width: '550px' }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Male</MenuItem>
                                        <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Upload Pet Image</FormLabel>
                                <Button
                                    variant="contained"
                                    component="label"

                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload File
                                    <input type="file" hidden required />
                                </Button>
                            </div>

                            <div style={{ marginTop: '15px', marginBottom: '20px', marginLeft: '220px' }}>
                                <Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '150px' }}> Submit</Button>
                            </div>
                        </FormControl>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MindRelaxingPets