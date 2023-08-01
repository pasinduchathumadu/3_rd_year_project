import React from 'react'
import PrimarySearchAppBar from "../../components/Layout/Header";
import backgroundImageUrl from '../../assests/Grooming.jpg';
import Pricing from './Pricing'; // Replace 'path/to/your/backgroundImage.jpg' with the actual path to your image
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
import { CardActionArea, ListItem } from '@mui/material';
import Bath from "../../assests/bath.jpg"
import Haircut from "../../assests/haircut.png"
import massage from "../../assests/massage.jpg"





function Pet_grooming() {
  return (
    <><PrimarySearchAppBar />
    <div  className='smooth-scroll' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${backgroundImageUrl})`, // Set the background image using the backgroundImage CSS property
        backgroundSize: 'cover', // Adjust background image size to cover the entire div
        backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
        backgroundPosition: 'center', // Center the background image
        minHeight: '90vh', // Set a minimum height to ensure the background image covers the entire screen
        display: 'flex',
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      
        
      }}>

<div style={{height:"15vh",width:"90%",backgroundColor:"rgba(255, 255, 255, 0.5)",color:"black",marginRight:"10px", alignItems: 'center', display: 'flex',}}>
    
    
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker']} sx={{width:"50vh",marginLeft:"10px",marginTop:"-10px"}}>
        <DateTimePicker label="Book your time" />
      </DemoContainer>
    </LocalizationProvider>
    

    <Button variant="contained" disableElevation sx={{backgroundColor:"orange",marginLeft:"850px",marginTop:"0px"}}>
      Submit
    </Button>
</div>
       <h1 style={{marginTop:"-290px",  fontSize: '60px',fontWeight: 'bold',}}> Let's <span style={{color:"orange",  fontSize: '60px',fontWeight: 'bold',}}>Groom</span>  your pet.</h1>
      {/* <h1 style={{fontSize:"30px"}}>Proper grooming does more than simply improve the appearance of your dog. Regular grooming promotes healthy coat and skin, leading to a healthier, happier pet.</h1> */}
      
     



      </div>

      <div style={{backgroundColor:"black",height:"40vh"}}>
        <h1 style={{textAlign:"center",color:"white",fontSize:"10vh",fontWeight:"1"}}>choice your plan now!</h1>
        <h3 style={{textAlign:"center",color:"white",fontWeight:"1"}}>No Risk, 30-Day Money Back Return Policy,</h3><br></br>
        <Pricing/>
        <h1 style={{ fontSize: "60px", textAlign: "center", fontWeight: "normal", marginTop: "40px", backgroundColor: "rgb(235 235 235)", letterSpacing: "-2px", wordSpacing: "10px" }}>
  SELECT A SERVISE
</h1>






  <div className='servises' style={{backgroundColor:"rgb(235 235 235)",borderRadius:"15px",width:"100%",height:"auto",marginLeft:"auto",marginRight:"auto",display:"flex",gap:"30px"}}>
    <Card sx={{ maxWidth: 345,marginLeft:"10%",marginTop:"20px" }}>
      <CardActionArea>
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="140"
          image={Bath}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bath
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Up to Rs.1000
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>



    

    <Card sx={{ maxWidth: 345,marginLeft:"20px",marginTop:"20px" }}>
      <CardActionArea>
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="140"
          image={Haircut}
          alt="green iguana"
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


    <Card sx={{ maxWidth: 345,marginLeft:"20px",marginTop:"20px" }}>
      <CardActionArea>
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="140"
          image={massage}
          alt="green iguana"
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
      </div>


      
    
      </>
  )
}

export default Pet_grooming