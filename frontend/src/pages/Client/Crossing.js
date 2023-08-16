import { Typography, TextField, FormControl, FormLabel } from '@mui/material';
import React from 'react';
import CrossingImage from '../../assests/cross.jpg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PetImage from '../../assests/crospet.jpg';
import Skeleton from '@mui/material/Skeleton';



const Crossing = () => {
    // drop downs
    const [sex, setsex] = React.useState('');
    const handleChangeSex = (event) => {
        setsex(event.target.value);
    };

    return (
        <div style={{ marginTop: '4%', display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ width: '40%' }}>
                <img src={CrossingImage} alt="crossing background image" style={{ height: '800px',position:"fixed" }} />
            </div>

            <div style={{ width: '60%' }}>
                <Typography sx={{ color: 'black', fontSize: '30px', padding: '20px', borderRadius: '10px', textAlign:"center" }}>Pet Crossing Features Guessing </Typography>
                <div style={{height:"100vh"}}>
                    {/* up */}
                    <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: 'rgb(249 249 249)', margin: '10px',width:"50%",marginLeft:"auto",marginRight:"auto" }}>
                        <Typography>Upload your pet image here : </Typography>
                        <TextField
                            sx={{ marginRight: '30px', width: '98%' }}
                            type="file"
                            variant="outlined"
                            placeholder="Choose a file"
                            inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                        // onChange={handleFileChange}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <FormLabel sx={{ color: 'black' }}>Sex </FormLabel>
                            <FormControl sx={{ m: 1,  }}>
                                <Select
                                    value={sex}
                                    onChange={handleChangeSex}
                                    displayEmpty
                                    sx={{ width: '100%' }}
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
                            <Button variant="contained" sx={{ background: "black", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Submit</Button>
                            <Button variant="contained" sx={{ background: "red", marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px', width: '100%' }}> Cancel</Button>
                        </div>

                    </div>

                    {/* down */}
                    <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: 'rgb(249 249 249)', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginLeft:"auto",marginRight:"auto" }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', margin: '10px', width: '40%' }}>
                            <Typography sx={{textAlign:"center"}} >Your Pet Image : </Typography>
                            <img src={PetImage} style={{ height: '200px', width: "auto",marginLeft:"55px" }}></img>
                            <Typography>Sex : </Typography>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                 <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
                                <div>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label=""
                                        defaultValue="Male"
                                    /></div>

                            </Box>
                        </div>

                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', margin: '10px', width: '50%',marginLeft:"auto",marginRight:"auto" }}>
                            <Typography sx={{ fontSize: '20px', marginLeft: '130px' }}>Crossing Features</Typography>
                            <Box
                                sx={{
                                    marginTop: '10px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    padding: '20px',
                                    width: 400,
                                    height: 280,
                                    backgroundColor: 'rgb(249 249 249)',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f5',
                                        opacity: [0.9, 0.8, 0.7],
                                    },
                                }} >
                                     <Skeleton animation="wave" />
                                     <Skeleton animation={false} />
                                
                            </Box>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default Crossing;