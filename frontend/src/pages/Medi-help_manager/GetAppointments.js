import React from 'react'
import  '../../styles/Medi-help_manager/getapp.css';

const GetAppointments = () => {
  return (
    <div>


<div className='bookform'>
<div className='getapp-container'>
         <div className='app'>
        <h1>Appointment</h1> 
        <hr />
            <form>
            <div>
                    <label htmlFor='email' className='email'>Patient ID</label>
                    <input name='email'/>
                </div>
                <div>
                    <label htmlFor='name'>Pateint Full Name</label>
                    <input name='name'/>
                </div>
                
                    
                
                  
                <div>
                    <label htmlFor='date'>Select  Date</label>
                    <input name='date' type='date'/>
                </div>
                <div>
                    <label htmlFor='time'>Select Time</label>
                    <input name='time' />
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