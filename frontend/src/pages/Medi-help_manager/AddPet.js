import React from 'react'
import  '../../styles/Medi-help_manager/PetProfile.css';

const AddPet = () => {
  return (
    <div className='add-container'>
         <div className='add'>
        <h1 className='h1'>Register Pet</h1> 
        <hr />
            <form>
            
                <div>
                    <label htmlFor='name'>Pet Id</label>
                    <input name='id' className='id'/>
                    <label htmlFor='name'>Pet Name</label>
                    <input name='name'className='name'/>
                </div>
                
                    <div>
                    <label htmlFor='name'>Species</label>
                    <input name='id' className='species'/>
                    <label htmlFor='name'>Breed</label>
                    <input name='name'className='name'/>
                </div>
                
                    <div>
                    <label htmlFor='name'>Date of Birth</label>
                    <input name='id' className='date' type='date'/>
                    <label htmlFor='name'>Sex</label>
                    <input name='name'className='sex'type='radio' value={'Female'}/>
                    <label for="female">Female</label>
                    <input name='name'className='sex'type='radio' value={'Male'}/>
                    <label for="male">Male</label>
                </div>
                <div>
                    <label htmlFor='date'>Place of Registration & Number</label>
                    <input name='date' />
                </div>
                </form>
                <h1>Register Pet Owner</h1> 
        <hr />
            <form>
            
                <div>
                    <label htmlFor='name'>Owner Id</label>
                    <input name='id' className='id'/>
                    <label htmlFor='name'> Name</label>
                    <input name='name'className='name'/>
                </div>
                
                    <div>
                    <label htmlFor='name'>Phone </label>
                    <input name='id' className='species'/>
                    <label htmlFor='name'>Email</label>
                    <input name='name'className='name'/>
                </div>
                
                 
                <div>
                    <label htmlFor='date'>Postal Address</label>
                    <input name='date' />
                </div>
                 

                    <hr className='hr'/>
                    <button type='submit' className='btnsubmit'>Submit</button>
                    <button type='cancel' className='btncancel'>Cancel</button>
            </form>

            </div>

    </div>
    
  )
}

export default AddPet