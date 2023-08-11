import React from 'react'
import  '../../styles/Medi-help_manager/addDoctor.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField, Typography } from '@mui/material';

const ViewForm = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='add-container'>
         <div className='update' style={{height: '9.9rem'}} >
       
 
     <Box sx={{ minWidth: 120 }}>
     <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Status</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         value={age}
         label="Age"
         onChange={handleChange}
        
       >
         <MenuItem value={10}>Accept</MenuItem>
         <MenuItem value={20}>In Progress</MenuItem>
         <MenuItem value={30}>Completed</MenuItem>
       </Select>

       
     </FormControl>
   </Box>
   <Button type='submit' sx={{marginTop:'5%',marginLeft:'35%',backgroundColor:'orange',color:'black',':hover':{backgroundColor:'orange'}}} >Delete</Button>
                    <Button  sx={{marginTop:'5%',marginLeft:'5%',marginright:'40%',backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} type='cancel'>Cancel</Button>
  </div>
  </div>  
  )
}

export default ViewForm