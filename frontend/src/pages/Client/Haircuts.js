import React, { useState, useEffect } from 'react';
import PrimarySearchAppBar from '../../components/Layout/Header';
import BathImage from '../../assests/washing.jpg'; // Import the background image
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import petcare1 from "../../assests/dog.png";
import petcare2 from "../../assests/grooming.png";
import petcare3 from "../../assests/premium.png";
import AOS from 'aos';
import 'aos/dist/aos.css';


function Haircuts() {

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
    <div>
      <PrimarySearchAppBar />

      <div style={{ display: 'flex' }} data-aos="zoom-in">
        <div
          style={{
            backgroundImage: `url(${BathImage})`, // Set the background image
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '70%',
            height: '91.05vh',
          }}
        ></div>

        <div style={{ backgroundColor: 'white', width: '50%', height: '80vh' }}>

            <div>
                <h1 style={{textAlign:"center"}}>Pet Bathing</h1>
                <h2 style={{fontSize:"15px",fontWeight:"1",padding:"15px",marginLeft:"10px"}}>Our pet bathing service provides a relaxing and thorough bath for your furry companions, leaving them clean, fresh, and happy.</h2>
                {/* <h1 style={{marginTop:"20px",marginLeft:"30px",textAlign:"center" ,fontWeight:"1"}}>This are our packages</h1> */}

                
      <div style={{display:"flex",marginTop:"80px",color:"gray"}} >

<div style={{width:"15%",height:"30vh",backgroundColor:"white",marginLeft:"auto",marginRight:"auto"}}>
<img  className="smooth-scroll" src={petcare1} alt="Cage" style={{fontSize:"10px",width:"50px",height:"50px",marginLeft:"30px"}}/>
<h1 style={{textAlign:"center",fontSize:"15px"}}>Normal body wash</h1>

<h3 style={{textAlign:"center",fontSize:"10px",fontWeight:"1"}}>Rs.1000 </h3>


</div>
<div style={{width:"15%",height:"30vh",backgroundColor:"white",marginLeft:"auto",marginRight:"auto"}}>
<img  className="smooth-scroll" src={petcare2} alt="Cage" style={{fontSize:"20px",width:"50px",height:"50px",marginLeft:"20px",marginRight:"auto"}}/>
<h1 style={{textAlign:"center",fontSize:"15px"}}>Full body wash with drying</h1>
<h3 style={{textAlign:"center",fontSize:"10px",fontWeight:"1"}}>Rs.1300</h3>


</div>
<div style={{width:"15%",height:"30vh",backgroundColor:"white",marginLeft:"auto",marginRight:"auto"}}>
<img  className="smooth-scroll" src={petcare3} alt="Cage" style={{fontSize:"20px",width:"50px",height:"50px",marginLeft:"auto",marginRight:"auto",marginLeft:"19px"}}/>
<h1 style={{textAlign:"center",fontSize:"15px"}}>Full body with tooth wash </h1>
<h3 style={{textAlign:"center",fontSize:"10px",fontWeight:"1"}}>Rs.2000 </h3>


</div>


</div>

<h1 style={{fontWeight:"1",textAlign:"center",fontSize:"20px"}}>Add your details and make a appoinment</h1>
                <div >
            <Button onClick={functionopenpopup}  variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'black', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"80px",marginTop:"60px", fontSize: '12px', '&:hover': { backgroundColor: 'black' } }} >Enter details</Button>

            <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>Pet bathing appoinment  <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                    <Stack spacing={2} margin={2} >
                      <TextField variant="outlined" label="Pet name"></TextField>
                      <TextField variant="outlined" label="Pet id"></TextField>
                      <TextField variant="outlined" label="Packege name"></TextField>
                      <TextField variant="outlined" label="Phone"></TextField>
                      <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                      <Button sx={{backgroundColor:"black"}} variant="contained">Submit</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                </DialogActions>
            </Dialog>
        </div>

            </div>
        </div>
      </div>
    </div>
  );
}

export default Haircuts;
