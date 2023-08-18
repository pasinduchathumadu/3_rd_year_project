import React, { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close"
import StarIcon from '@mui/icons-material/Star';

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";


export const MindRelaxDoctors=(props) => {
    const {id,productName,productImages,price} = props.data;

    const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };
  
  


        return <div className='product'>
                    <img src={productImages} style={{width:"40vh",height:"40vh"}}/>
                    <div className='description'>
                        <p>
                            <b>{productName}</b>
                        </p>
                        <p>
                            <StarIcon sx={{color:"orange",marginBottom:"-5px"}}/>{price}
                        </p>
                        <button onClick={functionopenpopup}   className='addToCartBttn'>Add Appoinment</button>
                        <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Doctor Appoinment  <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                    <Stack spacing={2} margin={2} >
                      <TextField variant="outlined" label="Full Name"></TextField>
                      <TextField variant="outlined" label="UserID"></TextField>
                      <TextField variant="outlined" label="Pet name"></TextField>
                      <TextField variant="outlined" label="Phone"></TextField>
                      <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                      <Button sx={{backgroundColor:"black",'&:hover': { backgroundColor: 'black' }}} variant="contained">Submit</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                </DialogActions>
            </Dialog>
                    </div>


              </div> ;
            
 }

