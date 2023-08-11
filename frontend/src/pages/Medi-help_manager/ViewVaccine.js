import React from 'react'
import  '../../styles/Medi-help_manager/view.css';
import { Button, TextField, Typography } from '@mui/material';
const ViewVaccine = () => {
  return (
    <div className='add-container'>
         <div className='viewvaccine'>
        <h1 className='h1'>Vaccine & Health Record</h1> 
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
                    
                    <Button  sx={{marginLeft:'80%',backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} type='cancel'>Cancel</Button>
            </form>

            </div>

    </div>
    
  )
}

export default ViewVaccine