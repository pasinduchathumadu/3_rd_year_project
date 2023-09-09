import { Button, FormLabel, Typography, IconButton, Stack, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TextField, FormControl } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from "react-router";


const Profile = () => {
    const navigate = useNavigate("")
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

    // get profile image path
    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // click on UPDATE icon
    const [update, setupdate] = useState(false)
    const [error, seterror] = useState(false)
    const [viewclient, setviewclient] = useState("")
    const [message, setmessage] = useState("")
    const DisplayClientDetails = async (email) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/common/DisplayClientDetails/${email}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage("There is an internal error")
            } else {
                setupdate(true)
                setmain(false)
                setviewclient(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [city, setcity] = useState("")
    const [street, setstreet] = useState("")
    const [contact, setcontact] = useState("")

    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    // updating profile
    const updateClient = async () => {
        if (contact === "" || street === "" || city === "") {
            seterror1(true)
            setmessage1('Please fill all fields')
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/common/updateClient`, {
                email,
                contact,
                street,
                city
            });
            if (res.data.message === 'There is an internal error') {
                setmessage1('Internal error')
                seterror1(true)
            } else if (res.data.message === 'success') {
                // setviewclient(false)
                setmain(true)
                setupdate(false)
            }

        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // back without updating manager details
    const backFromProfile = () => {
        setupdate(false)
        setmain(true)
    }

    // DELETE client profile
    const [warn, setwarn] = useState(false)
    const [id, setid] = useState("")
    const [error2, seterror2] = useState(false)
    const [message2, setmessage2] = useState("")
    //display warning box
    const displayWarn = (email) => {
        setwarn(true)
        setmain(false)
        setid(email)
    }
    // deleting
    const deleteProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/common/deleteProfile/${email}`)
            if (res.data.message === 'There is an internal error') {
                seterror2(true)
                setmessage2('There is an internal error')
            } else {
                setwarn(false)
                navigate('/')

            }

        } catch (err) {
            console.log(err)
        }
    }

    // cancel without deleting
    const cancelDelete = () => {
        setmain(true)
        setwarn(false)
    }

    return (
        <div style={{ padding: '3%', marginTop: '2%' }}>
            {/* client profile */}
            <div>
                {main && (
                    <>
                        <div style={{ width: '80%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', marginLeft: '10%' }}>

                            {profiledetails && profiledetails.map((drow, index) => (
                                <FormControl sx={{ width: '70%', backgroundColor: 'white', paddingLeft: '5%', paddingRight: '5%', paddingTop: '3%', paddingBottom: '2%', borderRadius: '10px', marginLeft: '15%' }}>
                                    <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', width: '60%', marginLeft: '20%' }}> Profile</Typography>

                                    <div style={{ marginLeft: '90%', display: 'flex', flexDirection: 'row' }}>
                                        <IconButton onClick={() => DisplayClientDetails(drow.email)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => displayWarn(drow.email)}><DeleteIcon sx={{ marginLeft: '5px', color: 'red' }} /></IconButton>
                                    </div>

                                    <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                        <img
                                            src={drow.profile_image === "" ? getImageSrc("noimage.png") : getImageSrc(drow.profile_image)}
                                            alt="profile photo"
                                            style={{ height: '30%', width: '30%', marginLeft: '35%', borderRadius: '50%' }} />
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
                    </>
                )}
            </div>

            {/* client update profile */}
            {update && (
                <>
                    <div style={{ width: '80%', backgroundColor: '#f0f0f5', padding: '10px', borderRadius: '10px', marginLeft: '10%' }}>

                        {viewclient && viewclient.map((menu, index) => (
                            <FormControl sx={{ width: '70%', backgroundColor: 'white', paddingLeft: '5%', paddingRight: '5%', paddingTop: '3%', paddingBottom: '2%', borderRadius: '10px', marginLeft: '15%', marginBottom: '1%' }}>
                                <div style={{ marginLeft: '97%' }}>
                                    <IconButton onClick={backFromProfile} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
                                </div>
                                <Typography sx={{ textAlign: 'center', backgroundColor: 'orange', color: 'white', fontWeight: 'bold', borderRadius: '10px', padding: '10px', width: '60%', marginLeft: '20%' }}> Update Profile</Typography>

                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <img
                                        src={menu.profile_image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.profile_image)}
                                        // src={getImageSrc("noimage.png")}
                                        alt="profile photo"
                                        style={{ height: '30%', width: '30%', marginLeft: '35%', borderRadius: '50%' }} />
                                </div>

                                <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Client ID"
                                                defaultValue={menu.client_id}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Name"
                                                defaultValue={menu.name}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label="Email Address"
                                                defaultValue={menu.email}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-helperText"
                                                label="Contact Number"
                                                defaultValue={menu.contact_number}
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
                                                defaultValue={menu.street}
                                                onChange={(e) => setstreet(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div >
                                            <TextField
                                                id="outlined-helperText"
                                                label="City"
                                                defaultValue={menu.city}
                                                onChange={(e) => setcity(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginLeft: '1%' }}>
                                    <Button onClick={() => updateClient()} sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '30%', marginLeft: '35%', marginBottom: '1%' }}>Update</Button>
                                </div>
                                {error1 && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">{message1}</Alert>
                                    </Stack>
                                )}
                            </FormControl>
                        ))}
                    </div>
                </>
            )}

            {warn && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '5px',
                    width: '100%',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                    marginTop: '10%'
                }}>
                    <div style={{ backgroundColor: 'black', padding: '10px' }}>
                        <div style={{
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f5',
                            width: '500px',
                            position: 'relative',
                            zIndex: 1001
                        }}>
                            <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
                            <hr /><br />

                            <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button onClick={deleteProfile} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div >
    )
}
export default Profile;