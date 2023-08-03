import React, { useState } from "react";
import {Link} from 'react-router-dom'
import  '../../styles/Medi-help_manager/viewApp.css';
import DeleteAppoint from "./DeleteAppointment";
import { useLocation } from 'react-router-dom';

const ViewAppointments = () => {
    const location = useLocation();
        const [show,setShow]=useState(false);
        return (
           
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                              <div className="linkButton">
                            <a href="/viewAppointments" target="_blank"  className={location.pathname === '/viewAppointments' ? 'active' : ''}>All Appointments</a>
                            <a href="/viewPendingAppointments" target="_blank" className={location.pathname === '/viewPendingAppointments' ? 'active' : ''}>Pending Appointments</a>
                            <a href="/viewCompletedAppointments" target="_blank"className={location.pathname === '/viewCompletedAppointments' ? 'active' : ''}>Completed Appointments</a>
                            </div>
                            </div>
                            <table id="appointment">
      <tr>
        <th>AppID</th>
        <th>Doctor Name</th>
       
        <th> Date</th>
        <th>Time</th>
        <th>Client Name</th>
        <th>Client PhoneNo</th>
       
        <th>Delete</th>
      </tr>
      <tr >
        <td>1</td>
        <td>Maria Anders</td>
        <td>2023.08.23</td>
        <td>12P.M</td>
        <td>John Deo</td>
        <td>0123456789</td>
        
        <td><button className='btndelete' onClick={()=>setShow(true)}>Delete</button></td>
      </tr>
     
      <tr >
        <td>2</td>
        <td>Maria Anders</td>
        <td>2023.08.23</td>
        <td>12P.M</td>
        <td>John Deo</td>
        <td>0123456789</td>
       
        <td><button className='btndelete' onClick={()=>setShow(true)}>Delete</button></td>
      </tr>
      <tr >
        <td>3</td>
        <td>Maria Anders</td>
        <td>2023.08.23</td>
        <td>12P.M</td>
        <td>John Deo</td>
        <td>0123456789</td>
        
        <td><button className='btndelete' onClick={()=>setShow(true)}>Delete</button></td>
      </tr>
      
      
    
     
    </table>
    {show &&<DeleteAppoint />}
                        </div>
                    </div>
                    
                </div>
                
      
        )
    }
 


export default ViewAppointments