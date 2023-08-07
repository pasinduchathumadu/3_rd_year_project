/* eslint-disable jsx-a11y/alt-text */

import React, { useState } from "react";
import {Link} from 'react-router-dom'
import  '../../styles/Medi-help_manager/viewDoctor.css';
import GetAppointments from "./GetAppointments";
import { Tab,Tabs,Box,Typography,Stack,Avatar } from "@mui/material";

import profile from "../../assests/profile.jpg";
 


const ViewDoctors = () => {
    const [modelOpen,setModelOpen]=useState(false);
    const [value,setvalue]= useState(0)
    const handlechange = (event,newValue)=>{
      setvalue(event.target.newValue)
      
    }
    
    const input = new Date();
    const date = input.toDateString();
    return (

      <><div style={{ display: 'flex', marginTop:'4%' }}>
        <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
          <Typography>
            Medi Care Manager
          </Typography>
          <Typography>
            Today
          </Typography>
          <Typography>
            {date}
          </Typography>
        </div>
        <div
          style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}
        >
          <Typography
            sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
            Doctor Details
          </Typography>
        </div>
        <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>

          <div style={{ marginLeft: '1%' }}>
            <Stack direction="row" spacing={2} sx={{marginRight:'1%'}}>
              <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} />
            </Stack>
          </div>

        </div>
      </div><div className="row1">
          <div className="col-md-12">

            <div className="card1">
              <div style={{ marginTop: '2%' }}>
                {/* <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab sx={{width:'20%'}} label="Available Doctors" className="avalDoc" component={Link} to="/viewDoctors" />
        <Tab sx={{width:'20%'}} label="View All Doctors" className="allDoc" component={Link} to="/viewAllDoctors" />
    </Tabs> */}
                <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
                  <Tabs
                    value={value}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    indicatorColor='transparent'
                    onChange={handlechange}
                    sx={{ borderRadius: '10px' }}

                  >
                    <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Available Doctors" component={Link} to="/viewDoctors" />
                    <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="View All Doctors" component={Link} to="/viewAllDoctors" />
                  </Tabs>

                </Box>
              </div>
              <div class="boxcontainer">
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <button className='btnapp' onClick={() => setModelOpen(true)}>Get Appointment</button>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>
                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>
                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>
                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
                <div className="docbox">
                  <div>
                    <img className="img" src="https://static7.depositphotos.com/1158045/696/i/600/depositphotos_6961638-stock-photo-doctor-portrait.jpg" />
                  </div>
                  <h6 style={{ paddingTop: '15px', paddingBottom: '7px', fontSize: '16px' }} className="h6">Jenny Wilson<br />  Specialist</h6>

                  <Link to='/getAppointment'> <button className='btnapp'>Get Appointment</button></Link>
                </div>
              </div>


              {modelOpen && <GetAppointments />}

            </div>
          </div>

        </div></>
          
  
    )
}
 
export default ViewDoctors