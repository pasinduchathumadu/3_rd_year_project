import React from 'react'
import  '../../styles/Medi-help_manager/addDoctor.css';

const AddDoctors = () => {
  return (
    <div className='add-container'>
         <div className='add'>
        <h1 className='h1'>Register Doctors</h1> 
        <hr />
            <form>
            
                <div>
                    <label htmlFor='name'>Full Name</label>
                    <input className="input" name='name'/>
                </div>
                
                    <div>
                    <label htmlFor='email' className='email'>Email</label>
                    <input className="input" name='email'/>
                </div>
                
                    <div>
                    <label htmlFor='phone' className='phone'>Phone Number</label>
                    <input className="input" name='phone'/>
                </div>
                <div>
                <label htmlFor='no' className='no'>Registration Number</label>
                    <input className="input" name='no'/>
                </div>
                <div>
                    <label htmlFor='time'>Type</label>
                    <select id="country" name="country" className='select'>
                     <option value="companion">Companion-animal veterinarians</option>
      <option value="specialists">Veterinary specialists</option>
      <option value="food">Food-animal veterinarians</option>
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

export default AddDoctors