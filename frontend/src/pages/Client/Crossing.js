import { Typography, TextField, FormControl, FormLabel } from '@mui/material';
import React from 'react';
import CrossingImage from '../../assests/crossing.jpeg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PetImage from '../../assests/add_pet.jpg';


const Crossing = () => {
    // drop downs
    const [sex, setsex] = React.useState('');
    const handleChangeSex = (event) => {
        setsex(event.target.value);
    };

    return (
        <div style={{ marginTop: '4%', display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ width: '40%' }}>
                <img src={CrossingImage} alt="crossing background image" style={{ height: '800px' }} />
            </div>

            <div style={{ width: '75%' }}>
                <Typography sx={{ color: 'black', fontSize: '30px', padding: '20px', borderRadius: '10px', marginLeft: '250px' }}>Pet Crossing Features Guessing </Typography>
                <div>
                    {/* up */}
                    <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f0f0f5', margin: '10px' }}>
                        <Typography>Upload your pet image here : </Typography>
                        <TextField
                            sx={{ marginRight: '30px', width: '100%' }}
                            type="file"
                            variant="outlined"
                            placeholder="Choose a file"
                            inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                        // onChange={handleFileChange}
                        />

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

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                            <Button variant="contained" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Submit</Button>
                            <Button variant="contained" sx={{ background: "red", marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px', width: '100%' }}> Cancel</Button>
                        </div>

                    </div>

                    {/* down */}
                    <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f0f0f5', margin: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', margin: '10px', width: '40%' }}>
                            <Typography>Your Pet Image : </Typography>
                            <img src={PetImage} style={{ height: '200px', width: "auto" }}></img>
                            <Typography>Sex : </Typography>
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

                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', margin: '10px', width: '50%' }}>
                            <Typography sx={{ fontSize: '20px', marginLeft: '130px' }}>Crossing Features</Typography>
                            <Box
                                sx={{
                                    marginTop: '10px',
                                    marginLeft: '20px',
                                    padding: '20px',
                                    width: 400,
                                    height: 280,
                                    backgroundColor: '#f0f0f5',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f5',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }} >
                                This is the corssing features of you entered image pet
                            </Box>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default Crossing;