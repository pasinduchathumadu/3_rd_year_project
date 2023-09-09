// import { FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { FormControl, InputLabel, TextField, Typography, Button, IconButton, MenuItem, Select, Card, CardActionArea, CardContent, CardMedia, Stack, Alert } from "@mui/material";
import React, { useEffect, useState } from 'react';
import AddBackgroundImage from '../../assests/pet_add.jpeg';
import ViewBackgroundImage from '../../assests/viewpets.png';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
// import Skeleton from '@mui/material/Skeleton';
import AddIcon from "@mui/icons-material/Add";
import PetsIcon from '@mui/icons-material/Pets';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import AnnouncementIcon from '@mui/icons-material/Announcement';


const AddPets = () => {
    const [error, seterror] = useState(false);
    // const [success, setsuccess] = useState(false);
    const [message, setmessage] = useState("")
    const [name, setname] = useState(" ");
    const [breed, setbreed] = useState(" ");
    const [petcategory, setpetcategory] = useState(" ");
    const [petsex, setpetsex] = useState(" ");
    const [viewpet, setviewpet] = useState([]);

    const handleChangeCategory = (event) => {
        setpetcategory(event.target.value)

    };
    const handleChangeSex = (event) => {
        setpetsex(event.target.value)

    };

    const email = localStorage.getItem("client_email")

    const [main, setmain] = useState(true)
    const [addpets, setaddpets] = useState(false)

    // click on add new pet button
    const addNewPet = () => {
        setmain(false)
        setaddpets(true)
    }

    // pet adding
    const addpet = async () => {
        if (petcategory === '' || name === '' || breed === '' || petsex === '') {
            seterror(true)
            setmessage("Please fill all the field")
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/pet_care/user/addpet', {
                email,
                petcategory,
                name,
                breed,
                petsex,
            })

            if (res.data.message === 'There is an internal error') {
                setmessage('Internal error')
                seterror(true)
            } else if (res.data.message === 'success') {
                setmain(true)
                setaddpets(false)
            }
        } catch (err) {
            console.log('There is an internal error')

        }
    }
    // back without adding
    const backfromadding = () => {
        setmain(true)
        setaddpets(false)
    }

    // view pets
    const view_pets = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/view_pets/${email}`)
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        view_pets()
            .then((data) => setviewpet(data.data))
            .catch((err) => console.log(err))
    })

    // get pet image from db
    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // warning box
    const [warn, setwarn] = useState(false)
    const [id, setid] = useState("")
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    const displayWarn = (id) => {
        setwarn(true)
        setmain(false)
        setid(id)
    }

    // deleting
    const deletePet = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/deletePet/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1('There is an internal error')
            } else {
                setwarn(false)
                setmain(true)
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
        <div>
            <div style={{ marginTop: '5%' }}>
                {main && (
                    <>
                        <div style={{
                            backgroundImage: `url(${ViewBackgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            color: 'white',
                            height: "15vh",
                            width: "100%",
                            borderRadius: '5px'
                        }}>
                            <Typography sx={{ position: 'absolute', color: 'white', fontSize: '45px', padding: '20px', borderRadius: '10px', fontWeight: "30", marginBottom: '10%', marginLeft: '40%' }}> Your Pets</Typography>
                        </div>


                        <div style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '87%' }}>
                            <Button onClick={addNewPet} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} >Add New Pets<AddIcon /></Button>
                        </div>

                        <div style={{ marginLeft: '3%', marginRight: '3%', backgroundColor: '#f0f0f5', borderRadius: '10px', padding: '1%' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {viewpet && viewpet.length > 0 ? (
                                    viewpet.map((menu, index) => (

                                        <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    sx={{ minHeight: "300px" }}
                                                    component={"img"}
                                                    src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                                                    alt={menu.name} />
                                                <CardContent>
                                                    <IconButton onClick={() => displayWarn(menu.pet_id)} sx={{ marginLeft: '90%' }}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                                                    <Typography variant="h6" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                                                        Pet ID : {menu.pet_id}
                                                    </Typography>
                                                    <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}><PetsIcon sx={{ color: 'orange' }} />
                                                        {menu.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ textAlign: 'center' }}>{menu.sex}</Typography><br />
                                                    <Typography variant="body2" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.breed}</Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    ))
                                ) : (
                                <div style={{ margin: '3%', backgroundColor: 'white', padding: '2%', borderRadius: '10px', width:'100%' }}>
                                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}><AnnouncementIcon sx={{ marginRight: '1%', color: 'orange' }} />No Added Pets</Typography>
                                    <hr />
                                    <img 
                                        src={getImageSrc("nodata.png")}
                                        style={{width:'15%', height:'auto', marginLeft:'42%'}}
                                    />
                                </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {addpets && (
                    <>
                        <div style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${AddBackgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            height: "100%",
                            width: "100%",
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            borderRadius: "10px",
                            padding: '5%'

                        }}>
                            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%' }}>

                                <div>
                                    <IconButton onClick={backfromadding}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '590px' }} /></IconButton>
                                </div>

                                <div style={{ marginBottom: '3%' }}>
                                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Add Your New Pets</Typography>
                                    <hr />
                                </div>

                                <div style={{ marginBottom: '3%' }}>
                                    <TextField
                                        id="outlined-textarea"
                                        label=" Pet Name"
                                        placeholder="name"
                                        multiline
                                        onChange={(e) => setname(e.target.value)}
                                        sx={{ width: '100%' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '3%' }}>
                                    <TextField
                                        id="outlined-textarea"
                                        label=" Breed "
                                        placeholder="breed"
                                        multiline
                                        onChange={(e) => setbreed(e.target.value)}
                                        sx={{ width: '100%' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '3%' }}>
                                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={petcategory}
                                            onChange={handleChangeCategory}
                                            label="Pet Category"

                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Cat</MenuItem>
                                            <MenuItem value={20}>Dog</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div style={{ marginBottom: '3%' }}>
                                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Sex</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={petsex}
                                            onChange={handleChangeSex}
                                            label="Sex"

                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Male</MenuItem>
                                            <MenuItem value={20}>Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ width: '100%' }}
                                    >
                                        Upload File
                                        <input type="file" hidden required />
                                    </Button>

                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                                    <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={() => addpet()}>Submit</Button>
                                </div>
                                {error && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">{message}</Alert>
                                    </Stack>
                                )}
                                {/* {success && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="success">{message}</Alert>
                                    </Stack>
                                )} */}
                            </FormControl>
                        </div>
                    </>
                )}

                {/* warning box  */}
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
                                    <Button onClick={deletePet} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                    <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default AddPets;
