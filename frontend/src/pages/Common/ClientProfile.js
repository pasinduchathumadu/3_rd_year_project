import { Avatar, Button, FormLabel, Typography } from '@mui/material';
import React from 'react';
import { TextField, FormControl } from "@mui/material";
import ProfilePhoto from "../../assests/profile-picture.png";
import PetImage1 from '../../assests/blog-1.png';
// import PetImage2 from '../../assests/blog-2.png';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Profile = () => {
    return (
        <div style={{ padding: '20px' }}>
            {/* client profile */}
            <div>
                <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px' }}> Profile</Typography>
                <div>
                    <Button sx={{backgroundColor:'black', color:'white', marginLeft:'1350px', marginTop:'5px', marginBottom:'5px', width:'120px', ':hover':{backgroundColor:'black'}}}><ArrowBackIcon sx={{ marginRight: '20px' }} />Back</Button>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: 'white', borderRadius:'10px' }}>
                        <div style={{ width: '45%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px' }}>
                            <div style={{ marginLeft: '580px' }}>
                                <EditIcon />
                                <DeleteIcon sx={{ marginLeft: '5px', color: 'red' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '5px', width: '50%', textAlign: 'center' }}>Client Categorization :</Typography>
                                <Typography sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '5px', width: '40%', textAlign: 'center' }}><StarIcon sx={{ color: 'orange' }} /> Premium</Typography>
                            </div>

                            <FormControl sx={{ marginLeft: '15%' }}>
                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Avatar src={ProfilePhoto} alt="profile photo" sx={{ height: '180px', width: '180px', marginLeft: '140px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Client ID  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="02"
                                        sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="Mr. John Deo"
                                        sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="johndeo@gmail.com"
                                        sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="077 345 1221"
                                        sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="No: 23, Second Street, Colombo 07"
                                        sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                    />
                                </div>
                            </FormControl>
                        </div>

                        <div style={{ width: '50%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', height: 'auto', margin: '10px' }}>
                            <Typography sx={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '5px' }}>Pets Details</Typography>
                            <FormControl sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', marginTop: '10px', marginLeft: '10px' }}>
                                <div style={{ marginTop: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Avatar src={PetImage1} alt="profile photo" sx={{ height: '150px', width: '150px', marginLeft: '20px', marginRight: '200px' }} />
                                    <div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <FormLabel sx={{ color: 'black', marginLeft: '10px' }}>Pet ID   </FormLabel>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue=" 03"
                                            sx={{ textAlign: 'center', marginLeft: '10px' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                        <div>
                                            <FormLabel sx={{ color: 'black' }}>Pet Name  </FormLabel><br />
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                defaultValue="Jimmy Boy"
                                                sx={{ textAlign: 'center', width: '250px' }}
                                            />
                                        </div>

                                        <div>
                                            <FormLabel sx={{ color: 'black' }}>Breed  </FormLabel><br />
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                defaultValue="xxx"
                                                sx={{ textAlign: 'center', width: '250px' }}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                        <div>
                                            <FormLabel sx={{ color: 'black' }}>Category  </FormLabel><br />
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                defaultValue="Dog"
                                                sx={{ textAlign: 'center', width: '250px' }}
                                            />
                                        </div>

                                        <div>
                                            <FormLabel sx={{ color: 'black' }}>Sex  </FormLabel><br />
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                defaultValue="Male"
                                                sx={{ textAlign: 'center', width: '250px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FormControl>
                        </div>
                    </div >
                </div >
            </div>
        </div >
    )
}
export default Profile;