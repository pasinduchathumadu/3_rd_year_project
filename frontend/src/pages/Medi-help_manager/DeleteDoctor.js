import React from 'react'
import  '../../styles/Medi-help_manager/deleteDoctor.css';

function DeleteDoctor() {
  return (
    <div className='delete-container'>
    <div className='delete'>
   <h1>Delete Doctors</h1> 
   <hr />
       <form>
        
           <div>
               <h4 className='h4'>Are You Want to Delete this Doctor ?</h4>
               <button type='submit' className='btnDelete'>Delete</button>
                    <button type='cancel' className='btndcancel'>Cancel</button>
           </div>
           </form>
           </div>
           </div>
  )
}

export default DeleteDoctor