
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import  '../../styles/Medi-help_manager/viewDoctor.css';
import GetAppointments from "./GetAppointments";

    
    
 


const ViewDoctors = () => {
    const [modelOpen,setModelOpen]=useState(false);
    return (
       
            <div className="row">
                <div className="col-md-12">
                <div class="doctorsearch-container">
                        
    
                        <input type="text" placeholder="Search" name="search" />
                        
                    </div>
                    <div className="card">
                        <div className="card-header">
                       <p> <Link to ='/viewDoctors' className='avalDoc'>Available Doctors</Link></p>
                       <p> <Link to ='/viewAllDoctors' className='allDoc'>View All Doctors</Link></p>
                    
                        </div>
 <div class="boxcontainer">                  
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
    <button className='btnapp' onClick={()=>setModelOpen(true)}>Get Appointment</button>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
     <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
     <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
     <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
   <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
   <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
    <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
    <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
     <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
    <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
    <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  <div className="docbox">
    <div className="img">
   <img src ="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" /> 
    </div>
     <h6>Jenny Wilson<br />  Specialist</h6>
   
     <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
  </div>
  </div>

 
  {modelOpen && <GetAppointments />}  

                    </div>
                </div>
                
            </div>
          
  
    )
}
 
export default ViewDoctors