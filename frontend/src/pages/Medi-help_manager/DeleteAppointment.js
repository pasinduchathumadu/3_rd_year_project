import React from 'react'
import  '../../styles/Medi-help_manager/deleteDoctor.css';
import { Button } from '@mui/material';

function DeleteDoctor() {
  return (
    <div className='delete-container'>
    <div className='boxdelete'>
   <h1 style={{textAlign:'center'}}>Delete Appointment</h1> 
   <hr />
       <form>
        
           <div>
               <h4 style={{textAlign:'center'}}>Are You Want to Delete this Appointment ?</h4>
               <Button type='submit' sx={{marginLeft:'35%',backgroundColor:'orange',color:'black',':hover':{backgroundColor:'orange'}}} >Delete</Button>
                    <Button  sx={{marginLeft:'5%',marginright:'40%',backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} type='cancel'>Cancel</Button>
           </div>
           </form>
           </div>
           </div>
  )
}

export default DeleteDoctor