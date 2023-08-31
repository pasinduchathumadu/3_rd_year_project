import React from 'react'
import  '../../styles/Medi-help_manager/addDoctor.css';
import { Button, TextField, Typography,FormLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


const AddDoctors = () => {
  const [age, setAge] = React.useState('');
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  return (
    <div className='add-container'>
         <div className='boxadd'>
        <h1 className='h1'>Register Doctors</h1> 
        <hr />
            <form>
            
                <div style={{margin:'5%'}}>
              
                <TextField id="outlined-basic" label="Full Name" variant="outlined" sx={{ width: '100%',height:'50px' }} />
                  
                </div>
                
                    <div style={{margin:'5%'}}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100%',height:'50px' }} />
                  
                </div>
                
               
                <div style={{margin:'5%'}}>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" sx={{ width: '100%',height:'50px' }}/>
                  
                </div>
                <div style={{margin:'5%'}}>
                <TextField id="outlined-basic" label="Register Number" variant="outlined" sx={{ width: '100%',height:'50px' }} />
                  
                </div>
                <div style={{margin:'5%'}}>
                <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Doctor barCategory</InputLabel>
                
  <Select  sx={{ width: '100%',height:'50px' }}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Companion-animal veterinarians</MenuItem>
    <MenuItem value={20}>Veterinary specialists</MenuItem>
    <MenuItem value={30}>Food-animal veterinarians</MenuItem>
  </Select>
  </FormControl>
    </Box>
                 
</div>
<div>
                                <FormLabel sx={{ color: 'black',marginRight:'10px',position:'relative',left:'-35px',top:'-10px' }}>Profile Picture</FormLabel>
                                <TextField
                                    sx={{ marginLeft: '10px', width: '50%',position:'relative',top:'-10px' }}
                                    type="file"
                                    variant="outlined"
                                    placeholder="Choose a file"
                                    inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                                // onChange={handleFileChange}
                                />
                            </div>
                  
                    <Button type='submit' sx={{backgroundColor:'orange',width:'30%',':hover':{backgroundColor:'orange'},color:'black',marginRight:'2%'}} >Submit</Button>
                    <Button  sx={{marginLeft:'2%',backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} type='cancel'>Cancel</Button>
            </form>

            </div>

    </div>
    
  )
}

export default AddDoctors
