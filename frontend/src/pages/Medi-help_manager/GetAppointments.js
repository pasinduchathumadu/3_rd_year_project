import React from 'react'
import  '../../styles/Medi-help_manager/getapp.css';
import { TextField, Typography } from '@mui/material';

const GetAppointments = () => {
  return (
    <div style={{marginTop:'4%'}}>


<div className='bookform'>
<div className='getapp-container1'>
         <div className='app1'>
        <h1>Appointment</h1> 
        <hr />
            <form>
            <div>
                  
                   <TextField variant="outlined" placeholder="Email" size="small"  sx={{ width: '80%',marginTop:'3%' }} required></TextField>
                </div>
                <div>
                <TextField variant="outlined" placeholder="Paitent Full Name" size="small"  sx={{ width: '80%',marginTop:'3%' }} required></TextField>
                </div>
                
                    
                
                  
                <div>
                    
                   <Typography sx={{marginTop:'2%',marginBottom:'2%'}}>Select Date</Typography>
                    <input name='date' type='date' style={{width:'50%',textAlign:'center'}}/>
                </div>
                <div style={{marginBottom:'2%'}}>
                    
                   <Typography sx={{marginTop:'2%',marginBottom:'2%'}}>Select Date</Typography>
                    <input name='time' type='time' style={{width:'50%',textAlign:'center'}}/>
                </div>
                
                 

                    <hr className='hr'/>
                    <button type='submit' className='btnsubmit'>Book Appointment</button>
                    <button type='cancel' className='btncancel'>Cancel</button>
                    
            </form>
            </div>

</div>
    </div>
    
    </div>


  )
}

export default GetAppointments