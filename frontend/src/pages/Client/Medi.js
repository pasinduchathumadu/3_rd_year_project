import PrimarySearchAppBar from "../../components/Layout/Header";
import cage from "../../assests/2.png";
import pet_doctor from "../../assests/doctor.png";
import "../../styles/Client/Shop.css"
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion'




function Medi() {
    const [scrollAnimation, setScrollAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 400; // Adjust this value as needed
      if (window.scrollY > offset) {
        setScrollAnimation(true);
      } else {
        setScrollAnimation(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <><PrimarySearchAppBar />
    <div>



    <div className='smooth-scroll' style={{width:"100%",height:"60vh",marginTop:"auto",marginBottom:"auto",fontWeight:"1",display:"flex"}}>
        <div>
        <h2 style={{fontSize:"80px",marginTop:"30px",marginLeft:"50px"}}>meet your <span style={{color:"orange"}}>doctor</span> </h2>
        {/* <h1 style={{marginTop:"20px",fontFamily:"sans-serif",marginLeft:"50px"}}>we protect and care yout pet</h1> */}
        <h1 style={{fontSize:"20px",fontWeight:"1",marginLeft:"250px"}}>24 x 7 service</h1>
        <motion.div
        animate={{ x:100}}
        transition={{ ease: "easeOut", duration: .8 }}
        >
       <img  className="smooth-scroll" src={cage} alt="Cage" style={{fontSize:"20px",width:"80px",height:"80px",marginLeft:"170px"}}/>


       </motion.div>
            
        </div>

      
      <div>
      <img  className="smooth-scroll" src={pet_doctor} alt="Cage" style={{fontSize:"20px",width:"800px",height:"800px",marginTop:"87px"}}/>

      </div>

      </div>

      <div style={{width:"100%",height:"60vh",backgroundColor:"#e4e2df",marginTop:"auto"}}>
        <h2 style={{fontSize:"50px",marginLeft:"50px"}}>Enter your pet details</h2>
        <h2 style={{fontSize:"20px",marginLeft:"50px"}}>We always protect your pet details</h2>

        <Button variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'black', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"45px",marginTop:"20px", fontSize: '12px', '&:hover': { backgroundColor: 'black' } }} >Enter details</Button>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DateTimePicker']} sx={{ width: "500px", marginLeft: "45px", marginTop: "10px" }}>
              <DateTimePicker label="Book your time" />
            </DemoContainer>
          </LocalizationProvider>

      </div>
        
        
        
    </div></>
  )
}

export default Medi