import React, { useState } from "react";
import '../../styles/Medi-help_manager/viewApp.css';
import DeleteAppointment from "./DeleteAppointment";
import { useLocation } from 'react-router-dom';

const ViewAppointments = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
 

  return (
    <div className="row">
    <div className="col-md-12">
     <p className="title">Doctor Details</p> 
        <div className="card">
        <div class="petsearch-container">
            

            <input type="text" placeholder="Search" name="search" />
            
        </div>
          <div className="card-header">
            <div className="linkButton">
            </div>
</div>            

             
              
          <table id="appointment">
            <tr>
              <th>AppID</th>
              <th>Doctor Name</th>

              <th>Date</th>
              <th>Time</th>
              <th>Client Name</th>
              <th>Client PhoneNo</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
            <tr >
              <td>1</td>
              <td>Maria Anders</td>
              <td>2023.08.23</td>
              <td>12P.M</td>
              <td>John Deo</td>
              <td>0123456789</td>
              <td><button className='btnedit' onClick={() => setShow(true)}>View</button></td>
              <td><button className='btndelete' onClick={() => setShow(true)}>Delete</button></td>
            </tr>

            <tr >
              <td>2</td>
              <td>Maria Anders</td>
              <td>2023.08.23</td>
              <td>12P.M</td>
              <td>John Deo</td>
              <td>0123456789</td>
              <td><button className='btnedit' onClick={() => setShow(true)}>View</button></td>
              <td><button className='btndelete' onClick={() => setShow(true)}>Delete</button></td>
            </tr>

            <tr >
              <td>3</td>
              <td>Maria Anders</td>
              <td>2023.08.23</td>
              <td>12P.M</td>
              <td>John Deo</td>
              <td>0123456789</td>
              <td><button className='btnedit' onClick={() => setShow(true)}>View</button></td>
              <td><button className='btndelete' onClick={() => setShow(true)}>Delete</button></td>
            </tr>

          </table>
          {show && <DeleteAppointment />}
        </div>
      </div>
    </div>
  )
}

export default ViewAppointments;
