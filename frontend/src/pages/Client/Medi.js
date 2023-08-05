import PrimarySearchAppBar from "../../components/Layout/Header";
import cage from "../../assests/2.png";
import pet_doctor from "../../assests/doctor.png";
import "../../styles/Client/Shop.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React, { useState, useEffect } from 'react';
import {color, motion} from 'framer-motion'
import petcare1 from "../../assests/vaccine.png";
import petcare2 from "../../assests/tooth-cleaning.png";
import petcare3 from "../../assests/pet-care.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import doctor2 from "../../assests/doctor2.png"
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import "../../styles/Client/Medi.css"






function Medi() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };

    const [scrollAnimation, setScrollAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 500; // Adjust this value as needed
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

  useEffect(() => {
    AOS.init({ duration:500 });
  }, []);
  const StyledDateTimePicker = styled(DateTimePicker)({
    color: 'white',
  });


  const [open,openchange]=useState(false);
  const functionopenpopup=()=>{
      openchange(true);
  }
  const closepopup=()=>{
      openchange(false);
  }



  return (
    <><PrimarySearchAppBar />
    <div>



    <div className='smooth-scroll' style={{width:"100%",height:"60vh",marginTop:"auto",marginBottom:"auto",fontWeight:"1",display:"flex"}} data-aos="zoom-out">
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

      
      <div data-aos="fade-up">
      <img  className="smooth-scroll" src={pet_doctor} alt="Cage" style={{fontSize:"20px",width:"700px",height:"700px",marginTop:"188px",marginLeft:"150px"}}/>

      </div>

      </div>

      <div style={{width:"100%",height:"60vh",backgroundColor:"#121334",marginTop:"auto",color:"white"}}  >
        <h2 style={{fontSize:"50px",marginLeft:"50px"}}>Enter your pet details</h2>
        <h2 style={{fontSize:"20px",marginLeft:"50px"}}>We always protect your pet details</h2>

        <Button variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'orange', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"45px",marginTop:"20px", fontSize: '12px', '&:hover': { backgroundColor: 'orange' } }} >Enter details</Button>
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{color:"white"}}>
            <DemoContainer components={['DateTimePicker']} sx={{ width: "500px", marginLeft: "45px", marginTop: "10px" }}>
              <DateTimePicker label="Book your time" sx={{color:"white",backgroundColor:"white",borderRadius:"10px"}} />
            </DemoContainer>
          </LocalizationProvider>

      </div>


      <div style={{width:"100%",height:"60vh",backgroundColor:"white",marginTop:"auto"}}>

        <h1 style={{textAlign:"center",marginTop:"20px"}}>Our servises</h1>
        <h1 style={{textAlign:"center",fontSize:"80px",marginTop:"-20px",fontWeight:"1000",color:"rgb(163 169 168)"}}>Servises we provide</h1>


      </div>

      <div style={{display:"flex",marginTop:"-200px",textAlign:"ceneter"}} >

        <div style={{width:"30%",height:"40vh",backgroundColor:"white",marginLeft:"auto",marginRight:"auto"}}data-aos="zoom-in">
        <img  className="smooth-scroll" src={petcare1} alt="Cage" style={{fontSize:"20px",width:"80px",height:"80px",marginLeft:"190px"}}/>
        <h1 style={{textAlign:"center"}}>pet vaccine </h1>

        <h3 style={{textAlign:"center",fontWeight:"1"}}>pet dentel jaij jbaj jdai aowiu and djo laihws a  </h3>


        </div>
        <div style={{width:"30%",height:"40vh",backgroundColor:"white",marginLeft:"auto",marginRight:"auto"}}data-aos="zoom-in">
        <img  className="smooth-scroll" src={petcare2} alt="Cage" style={{fontSize:"20px",width:"80px",height:"80px",marginLeft:"auto",marginRight:"auto",marginLeft:"190px"}}/>
        <h1 style={{textAlign:"center"}}>pet dentel </h1>
        <h3 style={{textAlign:"center",fontWeight:"1"}}>pet dentel wie he njdhru nsjp</h3>


        </div>
        <div style={{width:"30%",height:"40vh",backgroundColor:"white",marginLeft:"auto",marginRight:"auto"}}data-aos="zoom-in">
        <img  className="smooth-scroll" src={petcare3} alt="Cage" style={{fontSize:"20px",width:"80px",height:"80px",marginLeft:"auto",marginRight:"auto",marginLeft:"190px"}}/>
        <h1 style={{textAlign:"center"}}>pet sergury </h1>
        <h3 style={{textAlign:"center",fontWeight:"1"}}>pet dentel jajwu ndndj </h3>


        </div>

        
      </div>

      <div style={{width:"100%",height:"73vh",backgroundColor:"#121334",marginTop:"auto",display:"flex"}} data-aos="fade-right">
      <img  className="smooth-scroll" src={doctor2} alt="Cage" style={{fontSize:"700px",width:"400px",height:"600px",marginTop:"-80px"}} />


      <h1 style={{color:"white",textAlign:"center",marginTop:"90px",marginLeft:"300px"}}> Make your appoinment here</h1>
      <div style={{textAlign:'center'}}>
            <Button onClick={functionopenpopup}  variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'orange', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"-450px",marginTop:"260px", fontSize: '12px', '&:hover': { backgroundColor: 'orange' } }} >Enter details</Button>

            <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>User Registeration  <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                    <Stack spacing={2} margin={2} >
                      <TextField variant="outlined" label="Username"></TextField>
                      <TextField variant="outlined" label="Password"></TextField>
                      <TextField variant="outlined" label="Email"></TextField>
                      <TextField variant="outlined" label="Phone"></TextField>
                      <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                      <Button sx={{backgroundColor:"orange"}} variant="contained">Submit</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                </DialogActions>
            </Dialog>
        </div>
      </div>
        
        
        
    </div></>
  )
}

export default Medi