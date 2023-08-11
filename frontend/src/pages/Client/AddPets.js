// import Add from '@mui/icons-material/Add';
import { Avatar, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import React from 'react';
// import { BsTranslate } from 'react-icons/bs';
import BackgroundImage from '../../assests/pet_add.jpeg';
// import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CatImage from '../../assests/cat_image.jpeg';
import DogImage from '../../assests/dog_image.jpeg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AddPets = () => {
    // drop downs
    const [category, setcategory] = React.useState('');
    const [sex, setsex] = React.useState('');

    const handleChangeCategory = (event) => {
        setcategory(event.target.value);
    };

    const handleChangeSex = (event) => {
        setsex(event.target.value);
    };


    return (
        <div>
            {/* <div style={{ marginTop: '5%', padding: '10px', marginLeft: '1330px' }}>
                <Button sx={{ color: 'white', backgroundColor: 'orange', padding: '10px', borderRadius: '10px', width: '150px', ':hover':{backgroundColor:'orange'} }}><ArrowBackIcon sx={{ marginRight: '20px' }} />Back</Button>
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%'}}>
                <div style={{ width: '50%', height: '100%', padding: '20px', marginLeft: '20px', marginRight: '5px', backgroundColor: '#F0F0F5', borderRadius: '10px' }}>
                    <FormControl>
                        <img src={BackgroundImage} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} alt="background image" />
                        <Typography sx={{ position: 'absolute', color: 'white', fontSize: '50px', padding: '20px', borderRadius: '10px', marginLeft: '180px' }}>Add Your Pets</Typography>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormLabel sx={{ color: 'black' }}>Category</FormLabel>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={category}
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

                        <div>
                            <FormLabel sx={{ color: 'black', marginRight: '20px' }}>Pet Name</FormLabel>
                            <TextField id="outlined-basic" placeholder="Pet Name" variant="outlined" required sx={{ width: '100%' }} />
                        </div>

                        <div>
                            <FormLabel sx={{ color: 'black', marginRight: '20px' }}> Current Age (years) </FormLabel>
                            <TextField id="outlined-basic" placeholder="Pet Age" variant="outlined" type="number" required sx={{ width: '100%' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormLabel sx={{ color: 'black' }}>Breed</FormLabel>
                            <TextField id="outlined-basic" placeholder="Breed" variant="outlined" sx={{ width: '100%' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormLabel sx={{ color: 'black' }}>Sex </FormLabel>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={sex}
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
                            <Button variant="contained" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Submit</Button>
                            <Button variant="contained" sx={{ background: "red", marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px', width: '100%' }}> Cancel</Button>
                        </div>
                    </FormControl>
                </div>

                <div style={{ width: '50%', height: '100%', padding: '20px', marginRight: '20px', marginLeft: '5px', backgroundColor: '#F0F0F5', borderRadius: '10px' }}>
                    <FormControl>
                        <Typography sx={{ fontSize: '40px', padding: '20px', borderRadius: '10px', marginLeft: '250px' }}>Your Pets</Typography>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Accordion sx={{ marginBottom: '10px', width: '700px' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div>
                                        <Avatar src={DogImage} sx={{ width: '100px', height: '100px', border: 'solid black 1px' }} />
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
                                                    label=""
                                                    defaultValue="03"
                                                /></div>
                                        </Box>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
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
                                                        label=""
                                                        defaultValue=" Dog"
                                                    /></div>
                                            </Box>
                                        </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                                        label=""
                                                        defaultValue="Jimmy Boy"
                                                    /></div>
                                            </Box>
                                        </div>
                                        <div>

                                            <Typography> Age : </Typography>
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
                                                        label=""
                                                        defaultValue="1 years"
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
                                                        label=""
                                                        defaultValue="Beagle"
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
                                                        label=""
                                                        defaultValue="Male"
                                                    /></div>
                                            </Box>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div>
                                        <Avatar src={CatImage} sx={{ width: '100px', height: '100px', border: 'solid black 1px' }} />
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
                                                    label=""
                                                    defaultValue="05"
                                                /></div>
                                        </Box>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                                        label=""
                                                        defaultValue="Tommy "
                                                    /></div>
                                            </Box>
                                        </div>
                                        <div>

                                            <Typography> Age : </Typography>
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
                                                        label=""
                                                        defaultValue="1 years"
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
                                                        label=""
                                                        defaultValue="Ragdoll"
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
                                                        label=""
                                                        defaultValue="Male"
                                                    /></div>
                                            </Box>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    )

}

export default AddPets;
