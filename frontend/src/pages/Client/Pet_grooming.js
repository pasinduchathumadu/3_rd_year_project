
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
import FormDialog from './OpenForm';
import { Link } from 'react-router-dom';
import platinum from "../../assests/platinum.png"
import gold from "../../assests/gold.png"
import silver from "../../assests/silver.png"


function Pet_grooming() {
  const [isFormOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
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

        <div style={{ height: "15vh", width: "90%", backgroundColor: "rgba(255, 255, 255, 0.5)", color: "black", marginRight: "10px", alignItems: 'center', display: 'flex', }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DateTimePicker']} sx={{ width: "50vh", marginLeft: "10px", marginTop: "-10px" }}>
              <DateTimePicker label="Book your time" />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained" disableElevation sx={{ backgroundColor: "orange", marginLeft: "850px", marginTop: "0px" }} onClick={handleFormOpen}>
            Submit
          </Button>
        </div>
        <h1 style={{ marginTop: "-290px", fontSize: '60px', fontWeight: 'bold' }}> Let's <span style={{ color: "orange", fontSize: '60px', fontWeight: 'bold' }}>Groom</span> your pet.</h1>
      </div>

      <div style={{ backgroundColor: "black", height: "50vh" }} data-aos="zoom-out-down">
        <h1 style={{ textAlign: "center", color: "white", fontSize: "10vh", fontWeight: "1" }}>choice your plan now!</h1>
        <h3 style={{ textAlign: "center", color: "white", fontWeight: "1" }}>No Risk, 30-Day Money Back Return Policy,</h3><br></br>




        <h1 style={{ fontSize: "60px", textAlign: "center", fontWeight: "normal", marginTop: "60px", backgroundColor: "rgb(235 235 235)", letterSpacing: "-2px", wordSpacing: "10px" ,height:"30vh"}}>
          SELECT A PACKAGE
        </h1>

        <div
          className='servises'
          data-aos="zoom-in"
          style={{ backgroundColor: "rgb(235 235 235)", borderRadius: "15px", width: "100%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "flex", gap: "30px" ,marginTop:""}}
        >
        
        <Card sx={{ maxWidth: 345, marginLeft: "10%", marginTop: "20px", height: "70vh", transition: "transform 0.5s",
      "&:hover": {
        transform: "scale(1.2)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",

        // Gold color tint on hover
        "& $cardMedia": {
          filter: "brightness(1.2) sepia(1) hue-rotate(45deg)",
        }
      }
    }}>
      <CardActionArea>
        <Link to="/Bath" style={{ textDecoration: "none", color: "inherit" }}>
          <CardMedia
            component="img"
            height="140"
            image={Bath}
            alt="Bath"
            className="cardMedia" // Added class name for selecting in CSS
            sx={{ height: "35vh" }} // You can also define the height here
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", fontSize: "30px" }}>
              package 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Up to Rs.1000
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
          
        
        <Link to="/Haircuts" style={{ textDecoration: "none", color: "inherit",height:"70vh" }}>

          <Card sx={{ maxWidth: 345, marginLeft: "20px", marginTop: "20px",height:"70vh", transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.2)", // Apply scale transform on hover
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
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center",fontSize:"30px"}}>
                  package 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Up to Rs.1200
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>


          <Card sx={{ maxWidth: 345, marginLeft: "20px", marginTop: "20px" , transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.2)", // Apply scale transform on hover
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                },}}>
            <CardActionArea>
              <CardMedia style={{ height: "35vh" }}
                component="img"
                height="140"
                image={massage}
                alt="PetSpa"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center",fontSize:"30px"}}>
                  package 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Only Rs.1500
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Pet_grooming;
