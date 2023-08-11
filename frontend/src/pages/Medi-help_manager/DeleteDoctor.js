import React from 'react'
import  '../../styles/Medi-help_manager/deleteDoctor.css';
import { Button } from '@mui/material';

function DeleteDoctor() {
  return (
    <div className='delete-container'>
    <div className='boxdelete'>
   <h1>Delete Doctors</h1> 
   <hr />
       <form>
        
           <div>
               <h4 style={{margin:'1%'}}>Are You Want to Delete this Doctor ?</h4>
               <Button type='submit' sx={{backgroundColor:'orange',color:'black',':hover':{backgroundColor:'orange'}}} >Delete</Button>
                    <Button  sx={{marginLeft:'2%',backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} type='cancel'>Cancel</Button>
           </div>
           </form>
           </div>
           </div>
  )
}

export default DeleteDoctor