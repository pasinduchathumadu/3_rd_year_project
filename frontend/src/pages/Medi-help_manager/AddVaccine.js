import React from 'react'
import  '../../styles/Medi-help_manager/PetProfile.css';

const AddVaccine = () => {
  return (
    <div className='add-container'>
         <div className='addvaccine'>
        <h1>Vaccine & Health Record</h1> 
        <hr />
            <form>
            
                <div>
                    <label htmlFor='name'>Vaccine Name</label>
                    <input name='id' className='vname'/>
                    <label htmlFor='name'>Date Given</label>
                    <input name='id' className='vdate' type='date'/>
                </div>
                
                <div>
                    <label htmlFor='name'>Vaccine Name</label>
                    <input name='id' className='vname'/>
                    <label htmlFor='name'>Date Given</label>
                    <input name='id' className='vdate' type='date'/>
                </div>
                
                <div>
                    <label htmlFor='name'>Vaccine Name</label>
                    <input name='id' className='vname'/>
                    <label htmlFor='name'>Date Given</label>
                    <input name='id' className='vdate' type='date'/>
                </div>
                <div>
                    <label htmlFor='name'>Vaccine Name</label>
                    <input name='id' className='vname'/>
                    <label htmlFor='name'>Date Given</label>
                    <input name='id' className='vdate' type='date'/>
                </div>
                
                <div>
                    <label htmlFor='date'>Other Information</label>
                    <input name='date' />
                </div>
                    <div> <label htmlFor='name'>Next Vaccination Date</label>
                    <input name='id' className='vdate' type='date'/></div>
                 

                    <hr className='hr'/>
                    <button type='submit' className='btnsubmit'>Submit</button>
                    <button type='cancel' className='btncancel'>Cancel</button>
            </form>

            </div>

    </div>
    
  )
}

export default AddVaccine