import { Avatar, Button, FormLabel, Typography } from '@mui/material';
import React from 'react';
import { TextField, FormControl } from "@mui/material";
import ProfilePhoto from "../../assests/profile-picture.png";
import PetImage1 from '../../assests/blog-1.png';
import PetImage2 from '../../assests/blog-2.png';


const Profile = () => {
    return (
        <div style={{ padding: '20px' }}>
            {/* client profile */}
            <div>
                <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px' }}>View Clients Profile</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                    <div style={{ width: '40%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px' }}>
                        <Typography sx={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '5px' }}>Client Details</Typography>
                        <FormControl sx={{ marginLeft: '15%' }}>
                            <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                <Avatar src={ProfilePhoto} alt="profile photo" sx={{ height: '200px', width: '200px', marginLeft: '100px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Client ID  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="02"
                                    sx={{ textAlign: 'center' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="Mr. John Deo"
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="johndeo@gmail.com"
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="077 345 1221"
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="No: 23, Second Street, Colombo 07"
                                />
                            </div>


                        </FormControl>
                    </div>

                    <div style={{ width: '50%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', height: 'auto', margin: '10px' }}>
                        <Typography sx={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '5px' }}>Pet Details</Typography>
                        <FormControl sx={{ marginLeft: '10%' }}>
                            <div style={{ marginTop: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black', marginLeft: '10px' }}>Pet ID : 03  </FormLabel>
                                </div>
                                <Avatar src={PetImage1} alt="profile photo" sx={{ height: '200px', width: '200px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Pet Name  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="Jimmy Boy"
                                        sx={{ textAlign: 'center' }}
                                    />
                                </div>

                                <div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Category  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue="Dog"
                                        sx={{ textAlign: 'center', width: '100px' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black', textAlign: 'center' }}> Food Preference  </FormLabel>
                                <Button sx={{ backgroundColor: 'orange', color: 'white', width: '200px', ':hover': { backgroundColor: 'orange' } }}>View</Button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Vaccination Records  </FormLabel>
                                <Button sx={{ backgroundColor: 'orange', color: 'white', width: '200px', ':hover': { backgroundColor: 'orange' } }}>View</Button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black', textAlign: 'center' }}> Boarding House Facility Details  </FormLabel>
                                <Button sx={{ backgroundColor: 'orange', color: 'white', width: '200px', ':hover': { backgroundColor: 'orange' } }}>View</Button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Care Center Facility Details  </FormLabel>
                                <Button sx={{ backgroundColor: 'orange', color: 'white', width: '200px', ':hover': { backgroundColor: 'orange' } }}>View</Button>
                            </div>

                        </FormControl>

                    </div>

                </div >

                <Button sx={{ backgroundColor: 'orange', color: 'white', width: '100%', ':hover': { backgroundColor: 'orange' } }}>Finish View</Button>
            </div>


            {/* manager  profile */}
            <div>
                <div style={{ width: '100%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center' }}>
                    <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px', marginBottom:'10px' }}>View Magaers Profile</Typography>

                    <FormControl>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '300px' }}>Boarding House Manager  </Typography>

                        </div>
                        <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                            <Avatar src={ProfilePhoto} alt="profile photo" sx={{ height: '200px', width: '200px', marginLeft: '300px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Manager ID  </FormLabel>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                defaultValue="02"
                                sx={{ width: '600px', marginLeft: '10px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                defaultValue="Mr. John Deo"
                                sx={{ width: '600px', marginLeft: '10px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                defaultValue="johndeo@gmail.com"
                                sx={{ width: '600px', marginLeft: '10px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                defaultValue="077 345 1221"
                                sx={{ width: '600px', marginLeft: '10px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                defaultValue="No: 23, Second Street, Colombo 07"
                                sx={{ width: '600px', marginLeft: '10px' }}
                            />
                        </div>
                    </FormControl>
                    <Button sx={{ backgroundColor: 'orange', color: 'white', marginTop: '10px', width: '100%', ':hover': { backgroundColor: 'orange' } }}>Finish View</Button>
                </div>
            </div>
        </div >
    )
}
export default Profile;