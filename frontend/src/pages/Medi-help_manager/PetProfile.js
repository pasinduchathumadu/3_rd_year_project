
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import  '../../styles/Medi-help_manager/PetProfile.css';
import DeletePet from "./DeletePet";
import AddPet from "./AddPet";
import AddVaccine from "./AddVaccine";
import ViewVaccine from "./ViewVaccine";  
import ViewProfile from "./ViewProfile";    
 


const PetProfile = () => {
    const [show,setShow]=useState(false);
    const [model2Open,setModel2Open]=useState(false);
    const [model3Open,setModel3Open]=useState(false);
    const [model4Open,setModel4Open]=useState(false);
    const [modelOpen,setModelOpen]=useState(false);
    return (
       
            <div className="row">
                <div className="col-md-12">
                 <p className="title">Pet Details</p> 
                    <div className="card">
                    <div class="petsearch-container">
                        
    
                        <input type="text" placeholder="Search" name="search" />
                        
                    </div>
                        <div className="card-header">
                       
                        <button className='btnadd' onClick={()=>setModelOpen(true)} > + Add Pet</button>
                    
                        </div>
                        <table id="petprofile">
  <tr>
    <th>Pet ID</th>
    <th>Species</th>
    <th>Pet Name</th>
    <th>Owner Name</th>
    <th>Phone Number</th>
    <th>Add Vaccination </th>
    <th>View Vaccination</th>
    <th>View PetProfile</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  <tr >
    <td>1</td>
    <td>Dog</td>
    <td>Chewy</td>
    <td>John Deo</td>
    <td>0123456789</td>
    <td><button className='btnav' onClick={()=>setModel2Open(true)}>AddVaccines</button></td>
    <td><button className='btnvv' onClick={()=>setModel3Open(true)}>ViewVaccines</button></td>
    <td><button className='btnvp' onClick={()=>setModel4Open(true)}>ViewProfile</button></td>
    <td><button className='petbtnedit'>Edit</button></td>
    <td><button className='petbtndelete' onClick={()=>setShow(true)}>Delete</button></td>
  </tr>
  <tr>
  <td>2</td>
    <td>Dog</td>
    <td>Chewy</td>
    <td>John Deo</td>
    <td>0123456789</td>
    <td><button className='btnav' onClick={()=>setModel2Open(true)}>AddVaccines</button></td>
    <td><button className='btnvv' onClick={()=>setModel3Open(true)}>ViewVaccines</button></td>
    <td><button className='btnvp' onClick={()=>setModel4Open(true)}>ViewProfile</button></td>
    <td><button className='petbtnedit'>Edit</button></td>
    <td><button className='petbtndelete' onClick={()=>setShow(true)}>Delete</button></td>
  </tr>
  <tr>
  <td>3</td>
    <td>Dog</td>
    <td>Chewy</td>
    <td>John Deo</td>
    <td>0123456789</td>
    <td><button className='btnav' onClick={()=>setModel2Open(true)}>AddVaccines</button></td>
    <td><button className='btnvv' onClick={()=>setModel3Open(true)}>ViewVaccines</button></td>
    <td><button className='btnvp' onClick={()=>setModel4Open(true)}>ViewProfile</button></td>
    <td><button className='petbtnedit'>Edit</button></td>
    <td><button className='petbtndelete' onClick={()=>setShow(true)}>Delete</button></td>
  </tr>
  <tr>
  <td>4</td>
    <td>Dog</td>
    <td>Chewy</td>
    <td>John Deo</td>
    <td>0123456789</td>
    <td><button className='btnav' onClick={()=>setModel2Open(true)}>AddVaccines</button></td>
    <td><button className='btnvv' onClick={()=>setModel3Open(true)}>ViewVaccines</button></td>
    <td><button className='btnvp' onClick={()=>setModel4Open(true)}>ViewProfile</button></td>
    <td><button className='petbtnedit'>Edit</button></td>
    <td><button className='petbtndelete' onClick={()=>setShow(true)}>Delete</button></td>
  </tr>

 
</table>
{modelOpen && <AddPet />}
{model2Open && <AddVaccine />}
{model3Open && <ViewVaccine />}
{model4Open && <ViewProfile />}
{show &&<DeletePet />}
                    </div>
                </div>
                
            </div>
            
  
    )
}
 
export default PetProfile