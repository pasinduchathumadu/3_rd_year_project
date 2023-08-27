import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import image1 from "../../assests/online-store-image.png"
import image2 from "../../assests/care-center-image.png"
import image3 from "../../assests/pic3.jpg"
import { Link } from 'react-router-dom';

import "../../styles/Client/Mindrelax.css";






export default function Petcare() {
  return (
    <div style={{marginTop:'4%'}}>

 
    <h1 style={{textAlign:"center",fontSize:"60px",fontWeight:"40",marginTop:"30px"}}> Pet <span style={{color:"orange"}}>care</span> </h1>
    <div className='smooth-scroll' style={{marginLeft:"180px",display:"flex",gap:"30px",marginTop:"35px"}}>
    <Card sx={{ maxWidth: 345 ,transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.1)", // Apply scale transform on hover
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                },}}>
      <CardActionArea>
      <Link to="/Pet_grooming" style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="140"
          image={image2}
          alt="" />
          </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pet grooming
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Good grooming is just as important for your pet as it is for all of us.
          To make this convenient, and pleasure for your pet, 
          our specially trained teams are available to keep your pet well groomed and looking fine at all times.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 345 ,transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.1)", // Apply scale transform on hover
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                },}}>
      <CardActionArea>
      <Link to="/MindRealx" style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="140"
          image={image1}
          alt="green iguana" />
          </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Mind relax
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Escape the worries of everyday life in our Pet care center, surrounded by quiet, contented felines and dogs.
At Happy Tails, you can forget about the outside world and take a well-deserved break from reality by spending time with our pet friends.
Our lovely team look forward to introducing our beautiful pets to you.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 345,transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.1)", // Apply scale transform on hover
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                }, }}>
      <CardActionArea>
        <Link to="/Bording" style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="180"
          image={image3}
          alt="green iguana" />
          </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pet  traning
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Happy Tails Pet Training comes with a guarantee and personalized support, while we remain your consultants for the life of the pet even after training is completed. 
          Our testimonials are proof of our outstanding performance!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>


   
    </div></div>
  );
}
