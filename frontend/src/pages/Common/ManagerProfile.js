import { Avatar, Button, FormLabel, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TextField, FormControl } from "@mui/material";
import ProfilePhoto from "../../assests/profile-picture.png";
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Profile = () => {
    const email = localStorage.getItem("store_email")

    const [main, setmain] = useState(true)
    // update manager profile
    const [update, setupdate] = useState(false)

    // click on update icon
    const updateManagerDetails = () => {
        setupdate(true)
        setmain(false)
    }

    // back without updating manager details
    const backFromProfile = () => {
        setupdate(false)
        setmain(true)
    }

    // manager profile viewing
    // const [error, seterror] = useState(false)
    // const [message, setmessage] = useState("")
    const [profiledetails, setprofiledetails] = useState([])
    const ManagerProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/common/ManagerProfile/${email}`)
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        ManagerProfile()
            .then((data) => setprofiledetails(data.data))
            .catch((err) => console.log(err))
    })
    // get profile picture path
    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }


    return (
        <div>
            {/* view manager profile */}
            {main && (
                <div style={{ width: '100%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', marginTop: '4%' }}>
                    <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px', marginBottom: '10px', width: '30%', marginLeft: '550px' }}>Profile</Typography>

                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '86%', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Button onClick={updateManagerDetails} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }}><EditIcon sx={{ marginRight: '10px' }} />Update Profile</Button>
                    </div>

                    <FormControl>
                        {profiledetails && profiledetails.map((menu, index) => (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '300px' }}>
                                        {menu.user_role}
                                    </Typography>
                                </div>

                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <img 
                                        src={menu.profile_image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.profile_image)} 
                                        alt="profile photo" 
                                        component="img"
                                        style={{ height: '150px', width: '100px', marginLeft: '50px', borderRadius:'10px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Manager ID  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue={menu.manager_id}
                                        sx={{ width: '600px', marginLeft: '10px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue={menu.name}
                                        sx={{ width: '600px', marginLeft: '10px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue={menu.email}
                                        sx={{ width: '600px', marginLeft: '10px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue={menu.contact_number}
                                        sx={{ width: '600px', marginLeft: '10px' }} />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        defaultValue={menu.address}
                                        sx={{ width: '600px', marginLeft: '10px' }} />
                                </div>
                            </>
                        ))}
                    </FormControl>

                </div>
            )}

            {/* update manager profile */}
            {update && (
                <div style={{ width: '100%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', marginTop: '4%' }}>

                    <div>
                        <IconButton onClick={backFromProfile} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '700px' }} /></IconButton>
                    </div>

                    <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px', marginBottom: '10px', width: '30%', marginLeft: '550px' }}>Update Profile</Typography>

                    <FormControl>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '300px' }}>Boarding House Manager  </Typography>

                        </div>
                        <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                            <Avatar src={ProfilePhoto} alt="profile photo" sx={{ height: '180px', width: '180px', marginLeft: '300px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Manager ID  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="02"
                                    sx={{ width: '300px', marginLeft: '10px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="Mr. John Deo"
                                    sx={{ width: '300px', marginLeft: '10px' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                                <TextField
                                    disabled
                                    id="outlined-disabled"
                                    defaultValue="johndeo@gmail.com"
                                    sx={{ width: '300px', marginLeft: '10px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                                <TextField
                                    id="outlined-disabled"
                                    defaultValue="077 345 1221"
                                    sx={{ width: '300px', marginLeft: '10px' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                <TextField
                                    id="outlined-disabled"
                                    defaultValue="No: 23, Second Street, Colombo 07"
                                    sx={{ width: '300px', marginLeft: '10px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                <TextField
                                    id="outlined-disabled"
                                    defaultValue="No: 23, Second Street, Colombo 07"
                                    sx={{ width: '300px', marginLeft: '10px' }}
                                />
                            </div>
                        </div>

                        <div>
                            <Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '20%', marginLeft: '100px' }}>Update</Button>
                        </div>
                    </FormControl>

                </div>

            )}
        </div>

    )
}
export default Profile;