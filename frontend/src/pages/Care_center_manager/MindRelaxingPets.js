import {Button, FormControl, FormLabel, IconButton, MenuItem, Select, TextField, Typography, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import profile from "../../assests/profile.jpg";
// import care from "../../assests/caregiver.jpg";
// import care2 from "../../assests/caregiver2.jpg";
import AddIcon from "@mui/icons-material/Add";
// import StarIcon from "@mui/icons-material/Star";
// import CategoryIcon from '@mui/icons-material/Category';
import PetsIcon from '@mui/icons-material/Pets';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import BackgroundImage from './../../assests/mindrelax_bkgnd.png'
import DeleteIcon from '@mui/icons-material/Delete';
// import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';


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

    // pet adding
    const [error, seterror] = useState(false)
    const [petcategory, setpetcategory] = useState("")
    const [name, setname] = useState("")
    const [breed, setbreed] = useState("")
    const [petsex, setpetsex] = useState("")

    const handleChangeCategory = (event) => {
        setpetcategory(event.target.value)
    };
    const handleChangeSex = (event) => {
        setpetsex(event.target.value)
    };

    const addingpet = async () => {
        seterror(false);
        try {
            const res = await axios.post('http://localhost:5000/pet_care/care_center_manager/addingpet', {
                petcategory,
                name,
                breed,
                petsex,

            })
            if (res.data.message === 'success') {
                seterror("Pet details added successfully!")
                setaddpet(false)
                setviewpet(true)
            }

        } catch {
            console.log('There is an internal error')
        }
    }

    // pet viewing
    const [petdetails, setpetdetails] = useState("")
    const petViewing = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/petViewing`)
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        petViewing()
            .then((data) => setpetdetails(data.data))
            .catch((err) => console.log(err))
    })

    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)

    }

    // display warn box before deleting
    const [warn, setwarn] = useState(false)
    const [id, setid] = useState("")
    const displayWarn = (id) => {
        setwarn(true)
        setviewpet(false)
        setid(id)
    }
    // cancel withour deleting
    const cancelDelete = () => {
        setwarn(false)
        setviewpet(true)
    }

    // pet deleting
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    const petDeleteing = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/petDeleteing/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1('There is an internal error')
            } else {
                setviewpet(true)
                setwarn(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }
    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
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
                            <div style={{ marginLeft: '130%' }}><Stack direction="row" spacing={2} width={300}>
                                <NotificationsIcon />
                                <Button onClick={profile}>
                                    <img
                                        alt="profilepicture"
                                        src={getProfilepicturepath("carecenter_profile.png")}
                                        style={{ width: 'auto', height: '60px' }}
                                    />
                                </Button>
                            </Stack>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '83%' }}>
                        <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={addnewpet}>Add New Pets<AddIcon /></Button>
                    </div>

                    <div style={{ marginLeft: '5%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {petdetails && petdetails.map((menu, index) => (

                                <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{ minHeight: "300px" }}
                                            component={"img"}
                                            src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                                            alt={menu.name} />
                                        <CardContent>
                                            <IconButton sx={{ marginLeft: '90%' }} onClick={() => displayWarn(menu.pet_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                                            <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}><PetsIcon sx={{ color: 'orange' }} />
                                                {menu.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ textAlign: 'center' }}>{menu.sex}</Typography><br />
                                            <Typography variant="body2" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.breed}</Typography>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* add new pets for mind relaxing */}
            {addpet && (
                <div style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: "100vh",
                    width: "1700px",
                    display: 'flex',
                    flexDirection: "column",
                }}>
                    <div style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '30px', width: '40%', marginLeft: '30%', marginTop: '5%', marginBottom: '5%' }}>
                        <div>
                            <IconButton onClick={backfromaddpet}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '590px' }} /></IconButton>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Add New Pets</Typography>
                            <hr />
                        </div>
                        <FormControl>
                            <div>
                                <FormLabel sx={{ color: 'black', marginRight: '' }}>Pet Name</FormLabel>
                                <TextField id="outlined-basic" placeholder="Pet Name" variant="outlined" required sx={{ width: '100%', width: '610px' }} onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Breed</FormLabel>
                                <TextField id="outlined-basic" placeholder="Breed" variant="outlined" required sx={{ width: '100%', width: '610px' }} onChange={(e) => setbreed(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Category</FormLabel>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        value={petcategory}
                                        onChange={handleChangeCategory}
                                        displayEmpty
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
                                        value={petsex}
                                        onChange={handleChangeSex}
                                        displayEmpty
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
                                <Button onClick={() => addingpet()} sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '150px' }}> Submit</Button>
                            </div>
                        </FormControl>
                    </div>
                </div>
            )}

            {/* warning box before deleting a pet */}
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
                                <Button onClick={petDeleteing} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MindRelaxingPets