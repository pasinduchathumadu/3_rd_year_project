import React from 'react';
import PrimarySearchAppBar from "../../components/Layout/Header";
import petImage from '../../assests/black2.jpg'; // Replace 'path/to/your/image.png' with the actual path to your image
import Button from '@mui/material/Button';
import petImage2 from '../../assests/top.png'; 
import { Link } from 'react-router-dom';
// Replace 'path/to/your/image.png' with the actual path to your image



function MindRealx() {
  return (


    
    <div>
      <PrimarySearchAppBar />


  <div style={{
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
        textAlign: "center"
      }}>
     
   <div>
            <p style={{ fontSize: "80px", fontWeight: "10", marginTop: "-240px",textAlign:"left"}}>
            You can spend time
            </p>
          

        <div style={{lineHeight:"1.5"}}>
              <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "20px", textAlign:"left",marginLeft:"20px",lineHeight:"1.15"}}>
            if tou dont have any pet? dont worry we can give you our lovely pets for you,
           
              </p>
         
              <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "20px", textAlign:"left",marginLeft:"20px",lineHeight:"1.15"}}>
                So harryUp spend your valuble time with our cute pets

              </p>

          
      </div>
        
     <div style={{textAlign:"left",marginTop:"80px",marginLeft:"20px"}}>
     <p style={{ fontSize: "20px", fontWeight: "10",textAlign:"left" }}>
            Up to 1500 LKR  
          </p>

    <Link to="/Shop" style={{ textDecoration: 'none' }}>
      <Button variant="outlined" sx={{ color: "white", borderColor: "orange", color: "black" }}>
        GET Started
      </Button>
    </Link>     </div>
   </div>
            
            <img
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


      <div style={{
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
        textAlign: "center"
      }}>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "10px", marginBottom: "-20px" }}>
            You can spend time with our pets
          </p>
          <p style={{ fontSize: "80px", fontWeight: "10", marginBottom: "-40px" }}>
            Cats &amp; <span style={{ color: "orange" }}>Dogs</span>
          </p>
          <p style={{ fontSize: "20px", fontWeight: "10", marginBottom: "0" }}>
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
          <Button variant="outlined" sx={{color:"white",borderColor:"orange"}}>GET Started</Button>
      </div>
    </div>
  );
}

export default MindRealx;
