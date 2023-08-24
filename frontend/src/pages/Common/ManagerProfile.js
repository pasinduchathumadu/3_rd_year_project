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
        // <div>
        <div style={{ width: '100%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center' }}>
            <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px', marginBottom: '10px' }}>Profile</Typography>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px' }}>
                <Button sx={{ backgroundColor: 'black', color: 'white', marginTop: '5px', marginBottom: '5px', width: '150px', ':hover': { backgroundColor: 'black' } }}><ArrowBackIcon sx={{ marginRight: '20px' }} />Back</Button>
                <div >
                    <EditIcon />
                    <DeleteIcon sx={{ marginLeft: '5px', color: 'red' }} />
                </div>
            </div>

            <FormControl>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '300px' }}>Boarding House Manager  </Typography>

                </div>
                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                    <Avatar src={ProfilePhoto} alt="profile photo" sx={{ height: '180px', width: '180px', marginLeft: '300px' }} />
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
        </div>
        // </div >
    )
}
export default Profile;