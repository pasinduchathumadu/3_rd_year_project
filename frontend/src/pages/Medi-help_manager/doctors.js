
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import  '../../styles/Medi-help_manager/doctorsStyles.css';
import DeleteDoctor from "./DeleteDoctor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/fontawesome-free';


    
    
 


const Doctors = () => {
    const [show,setShow]=useState(false);
    return (
       
            <div className="row">
                <div className="col-md-12">
               
                    <div className="card">
                       
                   
                        <div className="card-header">
                       
                        <div class="search-container">
                        
    
      <input type="text" placeholder="Search" name="search" />
      
  </div>
 
                        </div>
                        <table id="customers">
  <tr>
    <th>ID</th>
    <th>Doctor Name</th>
    <th>Phone Number</th>
    <th>Email</th>
    <th>Available Date</th>
    <th>Time</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  <tr >
    <td>1</td>
    <td>Maria Anders</td>
    <td>0123456789</td>
    <td>maria@gmail.com</td>
    <td>Monday-Friday</td>
    <td>8A.M -7P.M</td>
    <td><button className='btnedit'><FontAwesomeIcon icon={faEdit} />Edit</button></td>
    <td><button className='btndelete' onClick={()=>setShow(true)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button></td>
  </tr>
  <tr>
    <td>2</td>
    <td>Christina Berglund</td>
    <td>0123456789</td>
    <td>christina@gmail.com</td>
    <td>Monday-Friday</td>
    <td>8A.M -7P.M</td>
    <td><Link to ='/editDoctor' className='btnedit'>Edit</Link></td>
    <td><Link to ='/deleteDoctor' className='btndelete'>Delete</Link></td>
  </tr>
  <tr>
    <td>3</td>
    <td>Christina Berglund</td>
    <td>0123456789</td>
    <td>christina@gmail.com</td>
    <td>Monday-Friday</td>
    <td>8A.M -7P.M</td>
    <td><Link to ='/editDoctor' className='btnedit'>Edit</Link></td>
    <td><Link to ='/deleteDoctor' className='btndelete'>Delete</Link></td>
  </tr>
  <tr>
    <td>4</td>
    <td>Maria Anders</td>
    <td>0123456789</td>
    <td>maria@gmail.com</td>
    <td>Monday-Friday</td>
    <td>8A.M -7P.M</td>
    <td><Link to ='/editDoctor' className='btnedit'>Edit</Link></td>
    <td><Link to ='/deleteDoctor' className='btndelete'>Delete</Link></td>
  </tr>

 
</table>
{show &&<DeleteDoctor />}
                    </div>
                </div>
                
            </div>
            
  
    )
}
 
export default Doctors