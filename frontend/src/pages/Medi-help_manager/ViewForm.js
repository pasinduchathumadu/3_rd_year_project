import React from 'react'
import  '../../styles/Medi-help_manager/addDoctor.css';

const ViewForm = () => {
  return (
    <div className='add-container'>
         <div className='update'>
        <h1>Update Appointment Status</h1> 
      
                 

                    <hr className='hr'/>
                    <form>
         
           
            <div>
                <label htmlFor='time'>Status</label>
                <select id="country" name="country">
                 <option value="companion">Accept</option>
  <option value="specialists">In Progress</option>
  <option value="food">Completed</option>
</select>
            </div>
             

                <hr className='hr'/>
                <button type='submit' className='btnsubmit'>Submit</button>
                <button type='cancel' className='btncancel'>Cancel</button>
        </form>


            </div>

    </div>
    
  )
}

export default ViewForm