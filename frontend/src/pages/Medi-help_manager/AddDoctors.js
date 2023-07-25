import React from 'react'
import  '../../styles/Medi-help_manager/addDoctor.css';

const AddDoctors = () => {
  return (
    <div className='add-container'>
         <div className='add'>
        <h1>Register Doctors</h1> 
        <hr />
            <form>
            
                <div>
                    <label htmlFor='name'>Full Name</label>
                    <input name='name'/>
                </div>
                
                    <div>
                    <label htmlFor='email' className='email'>Email</label>
                    <input name='email'/>
                </div>
                
                    <div>
                    <label htmlFor='phone' className='phone'>Phone Number</label>
                    <input name='phone'/>
                </div>
                <div>
                    <label htmlFor='date'>Available Date</label>
                    <input name='date' />
                </div>
                <div>
                    <label htmlFor='time'>Available Time</label>
                    <input name='time'/>
                </div>
                 

                    <hr className='hr'/>
                    <button type='submit' className='btnsubmit'>Submit</button>
                    <button type='cancel' className='btncancel'>Cancel</button>
            </form>

            </div>

    </div>
    
  )
}

export default AddDoctors