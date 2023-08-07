import React from 'react'
import  '../../styles/Medi-help_manager/addDoctor.css';
import { Button, TextField, Typography } from '@mui/material';

const AddDoctors = () => {
  return (
    <div className='add-container'>
         <div className='add'>
        <h1 className='h1'>Register Doctors</h1> 
        <hr />
            <form>
            
                <div style={{margin:'5%'}}>
                <TextField variant="outlined" placeholder="Full Name" size="small"  sx={{ width: '80%' }} required></TextField>
                  
                </div>
                
                    <div style={{margin:'5%'}}>
                    <TextField variant="outlined" placeholder="Email" size="small"  sx={{ width: '80%' }} required></TextField>
                  
                </div>
                
               
                <div style={{margin:'5%'}}>
                <TextField variant="outlined" placeholder="Registration Number" size="small"  sx={{ width: '80%' }} required></TextField>
                  
                </div>
                <div style={{margin:'5%'}}>
                  <Typography sx={{margin:'2%'}}>Type</Typography>
                    <select id="country" name="country" className='select'>
                     <option value="companion">Companion-animal veterinarians</option>
      <option value="specialists">Veterinary specialists</option>
      <option value="food">Food-animal veterinarians</option>
    </select>
                </div>
                 

                  
                    <Button type='submit' sx={{backgroundColor:'orange',width:'30%',':hover':{backgroundColor:'orange'},color:'black',marginRight:'2%'}} >Submit</Button>
                    <Button type='cancel' sx={{backgroundColor:'black',color:'white',width:'20%',':hover':{backgroundColor:'black'}}}>Cancel</Button>
            </form>

            </div>

    </div>
    
  )
}

export default AddDoctors