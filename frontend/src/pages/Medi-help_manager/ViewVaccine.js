import React from 'react'
import  '../../styles/Medi-help_manager/view.css';

const ViewVaccine = () => {
  return (
    <div className='add-container'>
         <div className='viewvaccine'>
        <h1>Vaccine & Health Record</h1> 
        <hr />
            <form>
            
                <div className='vaccinename'>
                    Pavovirus Vaccine < p className='vaccinedate'>2020.10.11</p>
                </div>
                
                <div className='vaccinename'>
                    Rabies Vaccine<p className='vaccinedate'>2020.10.11</p>
                </div>
                
                <div className='vaccinename'>
                    Distemper    <p className='vaccinedate'>2020.10.11</p>
                </div>
                <div className='vaccinename'>
                    Hepatitis <p className='vaccinedate'>2020.10.11</p>
                </div>
                
                <div className='vaccinename'>
                    Leptospirosis <p className='vaccinedate'>2020.10.11</p>
                </div>
                    <div> <label htmlFor='name'>Next Vaccination Date</label>
                     <p className='ndate'>2020.10.11 </p>
                 </div>

                    <hr className='hr'/>
                    <button type='submit' className='btnsubmit'>Submit</button>
                    <button type='cancel' className='btncancel'>Cancel</button>
            </form>

            </div>

    </div>
    
  )
}

export default ViewVaccine