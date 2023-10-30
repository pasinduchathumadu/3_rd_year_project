import { Alert, Avatar, bottomNavigationClasses, Button, FormLabel, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TextField, FormControl } from "@mui/material";
import ProfilePhoto from "../../assests/profile-picture.png";
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Profile = () => {
    const email = localStorage.getItem("store_email")

    const [main, setmain] = useState(true)
    // update manager profile
    const [update, setupdate] = useState(false)

    // back without updating manager details
    const backFromProfile = () => {
        setupdate(false)
        setmain(true)
    }

    // manager profile viewing
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

    // close viewing
    // const navigate = useNavigate("")
    // const backtoDashboard = () => {
    //     navigate("/boarding_dashboard")
    // }

    // get profile picture path
    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    //update profile - view manager details 
    const [viewmanager, setviewmanager] = useState("")
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const DisplayManagerDetails = async (email) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/common/DisplayManagerDetails/${email}`)
            if (res.data.message === 'Therei is an internal error') {
                seterror(true)
                setmessage('There is an internal error')
            } else {
                seterror1(false)
                setupdate(true)
                setmain(false)
                setviewmanager(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // update profile - get profile picture
    const getProfilePath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // update
    const [contact, setcontact] = useState(null)
    const [street, setstreet] = useState(null)
    const [city, setcity] = useState(null)

    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    const UpdateManager = async () => {
        const updatedCity = city === null ? profiledetails.map((menu,index)=>menu.city) : city;
        const updatedStreet = street === null ?  profiledetails.map((menu,index)=>menu.street): street;
        const updatedContact = contact === null ?  profiledetails.map((menu,index)=>menu.contact_number): contact;
      
       
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/common/UpdateManager`, {
                email,
                contact: updatedContact,
                street: updatedStreet,
                city: updatedCity
            });
            if (res.data.message === 'There is an internal error') {
                setmessage1('Internal error')
                seterror1(true)
            } else if (res.data.message === 'success') {
                
                seterror1(true)
                setmessage1("Successfully Updated!!")
            }
        } catch (err) {
            console.log('There is an internal error')
        }
    }


    return (
        <div>
            {/* view manager profile */}
            {main && (
                <div style={{ width: '100%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', marginTop: '4%' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '63%', paddingLeft: '10px', paddingRight: '10px', marginTop: '1%' }}>
                        {profiledetails && profiledetails.map((menu, index) => (
                            <Button onClick={() => DisplayManagerDetails(menu.email)} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }}><EditIcon sx={{ marginRight: '10px' }} />Update Profile</Button>
                        ))}
                    </div>

                    <FormControl sx={{ backgroundColor: 'white', width: '50%', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '20px', borderRadius: '10px', marginTop: '2%', marginBottom: '2%' }}>
                        {/* <div style={{marginLeft:'90%'}}>
                            <IconButton onClick={backtoDashboard}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
                        </div> */}
                        <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '1%', marginBottom: '10px', width: '50%', marginLeft: '25%' }}>Profile</Typography>

                        {profiledetails && profiledetails.map((menu, index) => (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold', marginLeft: '35%' }}>
                                        {(() => {
                                            switch (menu.user_role) {
                                                case "boarding_house_manager": return "Boarding House Manager";
                                                case "care_center_manager": return "Care Center Manager";
                                                case "online_store_manager": return "Online Store Manager";
                                                case "company_manager": return "Company Manager";
                                                case "medi_help_manager": return "Medi Help Center Manager";
                                                default: return "";
                                            }
                                        })()}
                                    </Typography>
                                </div>

                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <img
                                        src={menu.profile_image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.profile_image)}
                                        alt="profile photo"
                                        component="img"
                                        style={{ height: '150px', width: '100px', borderRadius: '50px' }} />
                                </div>

                                <div style={{ marginLeft: "5%" }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <FormLabel sx={{ color: 'black', textAlign: 'center' }}>Manager ID  </FormLabel>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue={menu.manager_id}
                                            sx={{ width: '500px', marginLeft: '10px' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <FormLabel sx={{ color: 'black' }}>Name  </FormLabel>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue={menu.name}
                                            sx={{ width: '500px', marginLeft: '10px' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <FormLabel sx={{ color: 'black' }}>Email Address  </FormLabel>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue={menu.email}
                                            sx={{ width: '500px', marginLeft: '10px' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <FormLabel sx={{ color: 'black' }}>Contact Number  </FormLabel>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue={menu.contact_number}
                                            sx={{ width: '500px', marginLeft: '10px' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <FormLabel sx={{ color: 'black' }}>Address  </FormLabel>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            defaultValue={menu.address}
                                            sx={{ width: '500px', marginLeft: '10px' }} />
                                    </div>
                                </div>
                            </>
                        ))}
                    </FormControl>

                </div>
            )}

            {/* update manager profile */}
            {update && (
                <div style={{ width: '100%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', margin: '10px', textAlign: 'center', marginTop: '4%' }}>

                    <FormControl sx={{ backgroundColor: 'white', width: '50%', paddingLeft: '10px', paddingRight: '10px', paddingTop: '10px', paddingBottom: '20px', borderRadius: '10px', marginTop: '2%', marginBottom: '2%' }}>
                        <div style={{ marginLeft: '90%' }}>
                            <IconButton onClick={backFromProfile} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
                        </div>
                        <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', marginTop: '5px', marginBottom: '10px', width: '50%', marginLeft: '25%' }}>Update Profile</Typography>

                        {viewmanager && viewmanager.map((mrow, index) => (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography sx={{ fontWeight: 'bold', marginLeft: '35%' }}>
                                        {(() => {
                                            switch (mrow.user_role) {
                                                case "boarding_house_manager": return "Boarding House Manager";
                                                case "care_center_manager": return "Care Center Manager";
                                                case "online_store_manager": return "Online Store Manager";
                                                case "company_manager": return "Company Manager";
                                                case "medi_help_manager": return "Medi Help Center Manager";
                                                default: return "";
                                            }
                                        })()}
                                    </Typography>
                                </div>

                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <img
                                        src={getProfilePath(mrow.profile_image)}
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
                                                defaultValue={mrow.manager_id}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Name"
                                                defaultValue={mrow.name}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Email Address"
                                                defaultValue={mrow.email}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-helperText"
                                                label="Contact Number"
                                                defaultValue={mrow.contact_number}
                                                onChange={(e) => setcontact(e.target.value)}
                                             
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <TextField
                                                id="outlined-helperText"
                                                label="Street"
                                                defaultValue={mrow.street}
                                                onChange={(e) => setstreet(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div >
                                            <TextField
                                                id="outlined-helperText"
                                                label="City"
                                                defaultValue={mrow.city}
                                                onChange={(e) => setcity(e.target.value)}
                                             
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                          {error1 && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="info">{message1}</Alert>
                                    </Stack>
                                )}
                        <div style={{ marginLeft: '1%' }}>
                            <Button onClick={() => UpdateManager()} sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '35%' }}>Update</Button>
                        </div>
                    </FormControl>

                </div>

            )}
        </div>

    )
}
export default Profile;