
import React, { useState, useEffect } from 'react';
import PrimarySearchAppBar from "../../components/Layout/Header";

import petImage from '../../assests/black2.jpg'; // Replace 'path/to/your/image.png' with the actual path to your image
import Button from '@mui/material/Button';
import petImage2 from '../../assests/top.png'; 
import { Link } from 'react-router-dom';
import "../../styles/Client/Mindrelax.css";
import AOS from 'aos';

// Replace 'path/to/your/image.png' with the actual path to your image



function MindRealx() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (


    
    <div>
   


  <div className='smooth-scroll' style={{
        // backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)) ,url(${petImage2})`,
        width: "90%",
        height: "110vh",
        backgroundColor: "rgb(235 235 235)",
        color: "black",
        marginTop: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "18px",
        textAlign: "center",
         wordSpacing: "10px",fontWeight:"1",
         
        
        
        
      }}
      data-aos="zoom-in"
      >
     
   <div className='smooth-scroll' style={{marginLeft:'2%'}}>
            <p style={{ fontSize: "80px", fontWeight: "10", marginTop: "-240px",textAlign:"left"}}>
            You can spend time
            </p>
            <p style={{ fontSize: "40px", fontWeight: "100", marginTop: "-20px",textAlign:"left",marginLeft:"20px"}}>
            Non bred pets
            </p>
            
          

        <div  className='smooth-scroll' style={{lineHeight:"1.5"}}>
              <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "20px", textAlign:"left",marginLeft:"20px",lineHeight:"1.15"}}>
              you don't have a pet, don't worry! We can lend you our lovely pets.
           
              </p>
         
              <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "20px", textAlign:"left",marginLeft:"20px",lineHeight:"1.15"}}>
              Hurry up and spend your valuable time with our cute pets
              </p>

          
      </div>
        
     <div className='smooth-scroll'style={{textAlign:"left",marginTop:"80px",marginLeft:"20px"}} data-aos="zoom-in">
     <p style={{ fontSize: "20px", fontWeight: "10",textAlign:"left" ,marginLeft:"20px"}}>
            Free 
          </p>

    <Link to="/Shop" style={{ textDecoration: 'none',marginTop:'9%' }}>
      <Button variant="outlined" sx={{ color: "white", color: "white" ,backgroundColor:"black"}}>
        GET Started
      </Button>
    </Link>     </div>
   </div>
            
            <img className='smooth-scroll'
          src={petImage2}
          alt="Pet"
          style={{
            width: "auto",
            height: "48vh",
            textAlign:"left",
            marginLeft:"500px",
            marginBottom:"-200px"
          }}
        />

       
      

      </div>


      <div className='smooth-scroll' style={{
        width: "90%",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
        marginTop: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        textAlign: "center",
       wordSpacing: "10px",fontWeight:"1"
      }}>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "10px", marginBottom: "10px" }}>
            You can spend time with our pets
          </p>
          <p style={{ fontSize: "80px", fontWeight: "10", marginBottom: "-40px" }}>
            Cats &amp; <span style={{ color: "orange" }}>Dogs</span>
          </p>
          <p style={{ fontSize: "20px", fontWeight: "10", marginBottom: "0",marginTop:'8%' }}>
            The most valuable pet care center in the world
          </p>
        </div>
        <img
          src={petImage}
          alt="Pet"
          style={{
            width: "auto",
            height: "50vh",
            marginTop: "20px",
          }}
        /><br/>
         <p style={{ fontSize: "20px", fontWeight: "10",marginBottom:"0px" }}>
            Up to 1500 LKR  
          </p>
          <Link to="/NonBredShop" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={{color:"white",borderColor:"orange",marginTop:'10%'}}>GET Started</Button>
          </Link>
      </div>

      <div  className='smooth-scroll' style={{textAlign:"center",border: "2px solid orange" ,width:"80%",height:"30vh",marginLeft:"auto",marginRight:"auto",marginTop:"30px",marginBottom:"30px"}}>
        <h3 style={{marginTop:"40px",fontSize:"40px",fontWeight:"1"}}>What's in the pro package</h3>

        <p >
  Welcome to our pet shop! At our shop, customers can spend quality time with our adorable pets through our unique pet rental service.<br />
  We offer various packages, including our exclusive pro package, where customers can enjoy their time with our premium and rare pets.<br />
  Whether it's for relaxation or companionship, our diverse selection of pets ensures there's something for everyone to cherish moments of joy and affection.
</p>





      </div>
    </div>
  );
}

export default MindRealx;
