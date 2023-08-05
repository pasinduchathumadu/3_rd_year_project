import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PrimarySearchAppBar from "../../components/Layout/Header";
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
      <PrimarySearchAppBar />
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

      <div style={{ backgroundColor: "black", height: "40vh" }} data-aos="zoom-out-down">
        <h1 style={{ textAlign: "center", color: "white", fontSize: "10vh", fontWeight: "1" }}>choice your plan now!</h1>
        <h3 style={{ textAlign: "center", color: "white", fontWeight: "1" }}>No Risk, 30-Day Money Back Return Policy,</h3><br></br>
        <Pricing />
        <h1 style={{ fontSize: "60px", textAlign: "center", fontWeight: "normal", marginTop: "40px", backgroundColor: "rgb(235 235 235)", letterSpacing: "-2px", wordSpacing: "10px" }}>
          SELECT A SERVICE
        </h1>

        <div
          className='servises'
          data-aos="zoom-in"
          style={{ backgroundColor: "rgb(235 235 235)", borderRadius: "15px", width: "100%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "flex", gap: "30px" }}
        >
        
          <Card sx={{ maxWidth: 345, marginLeft: "10%", marginTop: "20px" }}>
            <CardActionArea>  
            <Link to="/Bath" style={{ textDecoration: "none", color: "inherit" }}>
              <CardMedia style={{ height: "35vh" }}
                component="img"
                height="140"
                image={Bath}
                alt="Bath"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bath
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Up to Rs.1000
                </Typography>
              </CardContent>
              </Link>

            </CardActionArea>
          </Card>
          
          <Card sx={{ maxWidth: 345, marginLeft: "20px", marginTop: "20px" }}>
            <CardActionArea>
              <CardMedia style={{ height: "35vh" }}
                component="img"
                height="140"
                image={Haircut}
                alt="Haircut"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Haircuts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Up to Rs.1200
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ maxWidth: 345, marginLeft: "20px", marginTop: "20px" }}>
            <CardActionArea>
              <CardMedia style={{ height: "35vh" }}
                component="img"
                height="140"
                image={massage}
                alt="PetSpa"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  PetSpa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Only Rs.1500
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <FormDialog open={isFormOpen} handleClose={handleFormClose} />
      </div>
    </>
  );
}

export default Pet_grooming;
