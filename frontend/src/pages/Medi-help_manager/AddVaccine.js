import React from 'react'
import  '../../styles/Medi-help_manager/PetProfile.css';
import { Button, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
const AddVaccine = () => {
  return (
    <div className='add-container'>
         <div className='addvaccine'>
     
    <h1 className='h1'>Vaccine & Health Record</h1> 
    <hr />
        <form>
        
            <div style={{margin:'5%'}}>
          
            <TextField id="outlined-basic" label="Vaccine Name" variant="outlined" sx={{ width: '100%',height:'50px' }} />
              
            </div>
            
                <div style={{margin:'5%'}}>
                <TextField id="outlined-basic" label="Date Given" variant="outlined" sx={{ width: '100%',height:'50px' }} />
              
            </div>
            
           
            <div style={{margin:'5%'}}>
            <TextField id="outlined-basic" label="Other Information" variant="outlined" sx={{ width: '100%',height:'50px' }}/>
              
            </div>
            <div style={{margin:'5%'}}>
            <TextField id="outlined-basic" label="Next Vaccination Date" variant="outlined" sx={{ width: '100%',height:'50px' }} />
              
            </div>
          
             

              
                <Button type='submit' sx={{backgroundColor:'orange',width:'30%',':hover':{backgroundColor:'orange'},color:'black',marginLeft:'30%'}} >Submit</Button>
                <Button  sx={{marginLeft:'2%',backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} type='cancel'>Cancel</Button>
        </form>

        </div>

</div>

    
  )
}

export default AddVaccine