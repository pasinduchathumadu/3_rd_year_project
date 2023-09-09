import { Avatar, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BackgroundImage from '../../assests/pet_add.jpeg';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';


const AddPets = () => {
    const [error, seterror] = useState(false);
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

    // pet adding
    const addpet = async () => {
        seterror(false);
        try {
            const res = await axios.post('http://localhost:5000/pet_care/user/addpet', {
                email,
                petcategory,
                name,
                breed,
                petsex,
                // picture,

            })
            if (res.data.message === 'success') {
                seterror("Pet details added successfully!")
            }

        } catch {
            console.log('There is an internal error')

        }
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


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
                <div style={{ width: '50%', height: '100%', padding: '20px', marginLeft: '20px', marginRight: '5px', backgroundColor: 'rgb(245 245 245)', borderRadius: '10px' }}>
                    {/* add pets */}
                    <FormControl>
                        <div style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${BackgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            height: "50vh",
                            width: "90vh",
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            borderRadius: "10px"
                        }}>
                        </div>
                        <Typography sx={{ position: 'absolute', color: 'white', fontSize: '50px', padding: '20px', borderRadius: '10px', marginLeft: '150px', marginTop: "120px", fontWeight: "10" }}>Add Your Pets</Typography>

                        <div style={{ padding: "50px" }}>
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
                                <FormLabel sx={{ color: 'black' }}>Sex </FormLabel>
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


                            <div>
                                <FormLabel sx={{ color: 'black', marginRight: '' }}>Pet Name</FormLabel>
                                <TextField id="outlined-basic" placeholder="Pet Name" variant="outlined" required sx={{ width: '100%' }} onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormLabel sx={{ color: 'black' }}>Breed</FormLabel>
                                <TextField id="outlined-basic" placeholder="Breed" variant="outlined" sx={{ width: '100%' }} onChange={(e) => setbreed(e.target.value)} />
                            </div>

                            <div>
                                <FormLabel sx={{ color: 'black' }}>Profile Picture</FormLabel>
                                <TextField
                                    sx={{ marginRight: '20px', width: '100%' }}
                                    type="file"
                                    variant="outlined"
                                    placeholder="Choose a file"
                                    inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                                // onChange={handleFileChange}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                                <Button variant="contained" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }} onClick={() => addpet()}>Submit</Button>
                                <Button variant="contained" sx={{ background: "red", marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px', width: '100%' }}> Cancel</Button>
                            </div>

                        </div>
                    </FormControl>
                </div>

                <div style={{ width: '50%', height: '100%', padding: '20px', marginRight: '20px', marginLeft: '5px', backgroundColor: 'rgb(245 245 245)', borderRadius: '10px' }}>
                    <FormControl>
                        <Typography sx={{ fontSize: '40px', padding: '20px', borderRadius: '10px', marginLeft: '250px' }}>Your Pets</Typography>
                        <Skeleton />
                        <Skeleton animation="wave" sx={{ width: "90vh" }} />
                        <Skeleton animation="wave" sx={{ width: "90vh" }} />

                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            {viewpet && viewpet.map((menu, index) => (
                                <Accordion sx={{ marginBottom: '10px', width: '700px' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <div>
                                            <img
                                                style={{ width: '140px', height: '100px', border: 'solid black 1px', borderRadius: '50%' }}
                                                component={"img"}
                                                src={menu.profile_image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.profile_image)}
                                                alt={menu.name} />
                                        </div>
                                        <div style={{ marginLeft: '10%' }}>
                                            <Typography>Pet ID </Typography>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <div>
                                                    <TextField
                                                        disabled
                                                        id="outlined-disabled"
                                                        label={menu.pet_id}
                                                    /></div>
                                            </Box>
                                        </div>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <div style={{ marginLeft: '95%' }}>
                                            <DeleteIcon sx={{ color: 'red' }} />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <div>
                                                <Typography>Pet Category : </Typography>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <div>
                                                        <TextField
                                                            disabled
                                                            id="outlined-disabled"
                                                            label={menu.category}
                                                        /></div>
                                                </Box>
                                            </div>
                                            <div>
                                                <Typography>Pet Name : </Typography>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <div>
                                                        <TextField
                                                            disabled
                                                            id="outlined-disabled"
                                                            label={menu.name}
                                                        /></div>
                                                </Box>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <div>
                                                <Typography> Breed : </Typography>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <div>
                                                        <TextField
                                                            disabled
                                                            id="outlined-disabled"
                                                            label={menu.breed}
                                                        /></div>
                                                </Box>
                                            </div>
                                            <div>
                                                <Typography> Sex : </Typography>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <div>
                                                        <TextField
                                                            disabled
                                                            id="outlined-disabled"
                                                            label={menu.sex}
                                                            placeholder={menu.sex} />
                                                    </div>
                                                </Box>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    )
    // add a commnt
}

export default AddPets;
