import { Avatar, Button, FormLabel, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TextField, FormControl } from "@mui/material";
import ProfilePhoto from "../../assests/profile-picture.png";
import PetImage1 from '../../assests/blog-1.png';
// import PetImage2 from '../../assests/blog-2.png';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// import StarIcon from '@mui/icons-material/Star';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Profile = () => {
    const email = localStorage.getItem("store_email")

    //VIEW PROFILE
    const [main, setmain] = useState(true)

    // client profile viewing
    const [profiledetails, setprofiledetails] = useState([])
    const ClientProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/common/ClientProfile/${email}`)
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        ClientProfile()
            .then((data) => setprofiledetails(data.data))
            .catch((err) => console.log(err))
    })

    // click on UPDATE icon
    const updateButton = () => {
        setmain(false)
        setupdate(true)
    }

    // UPDATE PROFILE
    const [update, setupdate] = useState(false)
    // back without updating manager details
    const backFromProfile = () => {
        setupdate(false)
        setmain(true)
    }


    return (
        <div style={{ padding: '2%', marginTop: '3%' }}>
            {/* client profile */}
            <div>
                {main && (
                    <>
                        <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', width: '98%', marginLeft: '1%' }}> Profile</Typography>
                        <div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%', width: '100%', backgroundColor: 'white', borderRadius: '10px' }}>
                                <div style={{ width: '45%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px' }}>
                                    <div style={{ marginLeft: '85%', display: 'flex', flexDirection: 'row' }}>
                                        <IconButton onClick={updateButton}><EditIcon /></IconButton>
                                        <IconButton><DeleteIcon sx={{ marginLeft: '5px', color: 'red' }} /></IconButton>
                                    </div>

                                    {profiledetails && profiledetails.map((drow, index) => (
                                        <FormControl sx={{ marginLeft: '1%', marginRight: '1%', backgroundColor: 'white', padding: '5%', borderRadius: '10px', marginBottom: '3%' }}>
                                            <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                                <img src={ProfilePhoto} alt="profile photo" style={{ height: '30%', width: '30%', marginLeft: '35%', borderRadius: '50%' }} />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Client ID  </FormLabel>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    defaultValue={drow.client_id}
                                                    sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    defaultValue={drow.name}
                                                    sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    defaultValue={drow.email}
                                                    sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    defaultValue={drow.contact_number}
                                                    sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    defaultValue={drow.address}
                                                    sx={{ textAlign: 'center', width: '300px', marginLeft: '10px' }}
                                                />
                                            </div>
                                        </FormControl>
                                    ))}
                                </div>

                                <div style={{ width: '50%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', height: 'auto', margin: '10px' }}>
                                    <Typography sx={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '5px', width: '99%', marginLeft: '1%' }}>Pets Details</Typography>
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
                        </div > </>
                )}
            </div>

            {/* client update profile */}
            {update && (
                <div style={{ backgroundColor: '#f0f0f5', borderRadius: '10px', padding: '2%' }}>
                    <FormControl sx={{ backgroundColor: 'white', width: '50%', paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', paddingBottom: '20px', borderRadius: '10px', marginTop: '2%', marginBottom: '2%' }}>
                        <div style={{ marginLeft: '90%' }}>
                            <IconButton onClick={backFromProfile} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
                        </div>
                        <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px', marginBottom: '10px', width: '50%', marginLeft: '25%' }}>Update Profile</Typography>

                        {/* {viewmanager && viewmanager.map((mrow, index) => ( */}
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Typography sx={{ fontWeight: 'bold', marginLeft: '35%' }}>
                                    {/* {(() => {
                                        switch (mrow.user_role) {
                                            case "boarding_house_manager": return "Boarding House Manager";
                                            case "care_center_manager": return "Care Center Manager";
                                            case "online_store_manager": return "Online Store Manager";
                                            case "company_manager": return "Company Manager";
                                            case "medi_help_manager": return "Medi Help Center Manager";
                                            default: return "";
                                        }
                                    })()} */}
                                </Typography>
                            </div>

                            <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                <img
                                    // src={getProfilePath(mrow.profile_image)}
                                    alt="profile photo"
                                    style={{ height: '150px', width: 'auto', borderRadius: '50px' }} />
                            </div>

                            <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Manager ID"
                                            defaultValue="{mrow.manager_id}"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Name"
                                            defaultValue="{mrow.name}"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Email Address"
                                            defaultValue="{mrow.email}"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="outlined-helperText"
                                            label="Contact Number"
                                            defaultValue="{mrow.contact_number}"

                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div>
                                        <TextField
                                            id="outlined-helperText"
                                            label="Street"
                                            defaultValue="{mrow.street}"

                                            required
                                        />
                                    </div>
                                    <div >
                                        <TextField
                                            id="outlined-helperText"
                                            label="City"
                                            defaultValue="{mrow.city}"

                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                        {/* ))} */}

                        <div style={{ marginLeft: '1%' }}>
                            <Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '35%' }}>Update</Button>
                        </div>
                    </FormControl>




                </div>
            )}

        </div >
    )
}
export default Profile;