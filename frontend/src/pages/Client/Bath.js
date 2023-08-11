import React, { useState, useEffect } from 'react';

import BathImage from '../../assests/bath2.jpg'; // Import the background image
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"
import petcare1 from "../../assests/bath4.jpg";
import petcare2 from "../../assests/bath5.jpg";
// import petcare3 from "../../assests/premium.jpg";
import logo from "../../assests/2.png";
import star from "../../assests/star3.png";


import AOS from 'aos';
import 'aos/dist/aos.css';
// import petcare1 from "../../assests/dog.png";



function Bath() {

    const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }
    useEffect(() => {
        AOS.init({ duration:450 });
      }, []);

  
  return (
    <div style={{marginTop:'4%'}}>
    

      <div style={{ display: 'f', }} data-aos="zoom-in" >
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${BathImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '91.5vh',
            marginTop:"0px  "
          }}
        >
          <div style={{padding:"80px"}}>
          <img  className="smooth-scroll" src={logo} alt="Cage" style={{fontSize:"10px",width:"70px",height:"70px",marginLeft:"140px",borderRadius: "50%",marginBottom:"-35px"}}/>

          <h2 style={{color:"white",marginLeft:"50px",fontSize:"50px"}}>Pet Bathing</h2>
          <h1 style={{color:"white",marginLeft:"30px",fontSize:"15px",fontWeight:"1"}}>Our pet bathing service provides a relaxing and </h1>
          <h1 style={{color:"white",marginLeft:"30px",fontSize:"15px",fontWeight:"1"}}> thorough bath for your furry companions, leaving them clean, fresh, and happy. </h1>
          <img  className="smooth-scroll" src={star} alt="Cage" style={{fontSize:"10px",width:"150px",height:"150px",marginLeft:"100px",borderRadius: "50%",marginBottom:"-35px"}}/>

          <div style={{display:"flex",marginTop:"30px"}}>
         
          </div>
          



          </div>

        </div>

  <div style={{ backgroundColor: '#f5f7f6', width: '90%', height: '80vh' ,marginLeft:"auto",marginRight:"auto",borderRadius:"8px"}}>

            <div style={{marginTop:'5%'}}>
                <h1 style={{textAlign:"center"}}>Appointment Details</h1>
                <Stack spacing={2} margin={2} style={{padding:"450px",marginTop:"-400px"}}>
                      <TextField variant="outlined" label="Pet name"></TextField>
                      <TextField variant="outlined" label="Pet id"></TextField>
                      <TextField variant="outlined" label="Packege name"></TextField>
                      <TextField variant="outlined" label="Phone"></TextField>
                      <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                      <Button sx={{backgroundColor:"black"}} variant="contained">Submit</Button>
                    </Stack>
                
                

                




            </div>
        </div>
      </div>
    </div>
  );
}

export default Bath;
