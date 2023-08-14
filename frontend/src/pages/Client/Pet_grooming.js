import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


import backgroundImageUrl from '../../assests/Grooming.jpg';
import Pricing from './Pricing';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "../../styles/Client/Mindrelax.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Bath from "../../assests/bath.jpg";
import Haircut from "../../assests/haircut.png";
import massage from "../../assests/massage.jpg";

import {format} from 'date-fns'
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
function Pet_grooming() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [error,seterror] = useState(false)
  const [message,setmessage] = useState("")
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const email = localStorage.getItem('store_email')
  const input = new Date()
  const date = format(input, 'MM-dd-yyyy')

  const selectedDateString = selectedDate ? selectedDate.format('MM-DD-YYY') : '';
  const selectedTimeString = selectedDate ? selectedDate.format('HH:mm:ss') : '';

  
  const handleFormOpen = async() => {
    seterror(false)
    if(date >selectedDateString){
     seterror(true)
     setmessage("You can't pick that date")
      return
    }

    try{
      const res = await axios.post('http://localhost:5000/pet_care/user/date_client',{
        email,
        selectedDateString,
        selectedTimeString,
      })
      if(res.data.message === "already filled"){
        seterror(true)
        setmessage("This Time Slot Is not availble")
      
      }
      else if(res.data.message === "added"){
        seterror(true)
        setmessage("You Time Slot is successfully placed now!")

      }
    }catch(err){
        console.log("There is an internel error")
    }
   
    
  };



  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>

  
      <div
        className='smooth-scroll'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >



        <h1 style={{ marginTop: "", fontSize: '60px', fontWeight: 'bold' }}> Let's <span style={{ color: "orange", fontSize: '60px', fontWeight: 'bold' }}>Groom</span> your pet.</h1>

        <div style={{ height: "15vh", width: "90%", backgroundColor: "rgba(255, 255, 255, 0.5)", color: "black", marginRight: "10px", alignItems: 'center', display: 'flex', }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DateTimePicker']} sx={{ width: "50vh", marginLeft: "10px", marginTop: "-10px" }}>
              <DateTimePicker label="Book your time"  value={selectedDate}  onChange={handleDateChange} />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained" disableElevation sx={{ backgroundColor: "orange", marginLeft: "850px", marginTop: "0px" }} onClick={handleFormOpen}>
            Submit
          </Button>
        </div>
        {error &&(
           <div style={{marginTop:'2%'}}>
           <Stack sx={{ width: '100%' }} spacing={2}>
           <Alert severity="warning">{message}</Alert>
           </Stack>
           </div>

        )}
       

      </div>


      <div style={{ backgroundColor: "black", height: "50vh" }} data-aos="zoom-out-down">
        <h1 style={{ textAlign: "center", color: "white", fontSize: "10vh", fontWeight: "1" }}>choice your plan now!</h1>
        <h3 style={{ textAlign: "center", color: "white", fontWeight: "1" }}>No Risk, 30-Day Money Back Return Policy,</h3><br></br>




        <h1 style={{ fontSize: "60px", color:"white",textAlign: "center", fontWeight: "10000", marginTop: "60px", backgroundColor: "black", letterSpacing: "-2px", wordSpacing: "10px" ,height:"30vh"}}>
          SELECT A PACKAGE
        </h1>

        <div
          className='servises'
          data-aos="zoom-in"
          style={{ backgroundColor: "rgb(235 235 235)",  width: "100%", height: "110vh", marginLeft: "auto", marginRight: "auto", display: "flex", gap: "30px" ,marginTop:"-20px"}}
        >
        
        <Card sx={{ maxWidth: 345, marginLeft: "10%", marginTop: "20px", height: "100vh", transition: "transform 0.5s",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",

        // Gold color tint on hover
        "& $cardMedia": {
          filter: "brightness(1.2) sepia(1) hue-rotate(45deg)",
        }
      }
    }}>
       <CardActionArea>
              <Link to="/Bath" style={{ textDecoration: "none", color: "inherit", }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={Bath}
                  alt="Bath"
                  className="cardMedia"
                  sx={{ height: "35vh" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "", fontSize: "23px" }}>
                    BATH
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Up to Rs.1000
                  </Typography>
                  <ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
                    <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Deep Cleaning Shampoo</li>
                    <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Blow Dry</li>
                    <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
                    <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> 15- Min Brushout</li>

                  </ol>
                  <Typography variant="body2" color="text.secondary" sx={{marginTop:"90px",textAlign:"center"}}>
                    Clean grooming service without parabens,phthalates, and chamical dyes
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                  <Button sx={{ backgroundColor: "black",width:"90%" ,'&:hover': { backgroundColor: 'black' }}} variant="contained">Edit</Button>
                </div>
                </CardContent>
              </Link>
            </CardActionArea>
    </Card>
          
        
        <Link to="/Haircuts" style={{ textDecoration: "none", color: "inherit",height:"70vh" }}>

          <Card sx={{ maxWidth: 345, marginLeft: "20px", marginTop: "20px",height:"100vh", transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.1)", // Apply scale transform on hover
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                }, }}>
            <CardActionArea>
              <CardMedia style={{ height: "35vh" }}
                component="img"
                height="140"
                image={Haircut}
                alt="Haircut"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"",fontSize:"23px"}}>
                  BATH AND HAIR CUTS
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Up to Rs.1200
                </Typography>
                
                <ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Deep Cleaning Shampoo</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Hair Cuting  And Styling</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Blow Dry</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Nail Trim</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> 15-Min Brushout</li>
        </ol>
        <Typography variant="body2" color="text.secondary" sx={{marginTop:"20px",textAlign:"center"}}>
                    Clean grooming service without parabens,phthalates, and chamical dyes
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button sx={{ backgroundColor: "black",width:"90%",'&:hover': { backgroundColor: 'black' } }} variant="contained">Edit</Button>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>


          
        <Link to="/MiniGrooming" style={{ textDecoration: "none", color: "inherit",height:"70vh" }}>

<Card sx={{ maxWidth: 345, marginLeft: "20px", marginTop: "20px",height:"100vh", transition: "transform 0.5s ",
      "&:hover": {
        transform: "scale(1.1)", // Apply scale transform on hover
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
      }, }}>
  <CardActionArea>
    <CardMedia style={{ height: "35vh" }}
      component="img"
      height="140"
      image={massage}
      alt="Haircut"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"",fontSize:"23px"}}>
        MINI GROOMING
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Up to Rs.1200
      </Typography>
      
      <ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Hair Styling</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Sanitary Trim</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Body Massage</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> De-Shedding Treatment</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
          <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Nail Trim</li>
        </ol>
        <Typography variant="body2" color="text.secondary" sx={{marginTop:"20px",textAlign:"center"}}>
                    Clean grooming service without parabens,phthalates, and chamical dyes
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button sx={{ backgroundColor: "black",width:"90%",'&:hover': { backgroundColor: 'black' } }} variant="contained">Edit</Button>
                </div>
    </CardContent>
  </CardActionArea>
</Card>
</Link>
        </div>


      </div>
    </>
  );
}

export default Pet_grooming;
