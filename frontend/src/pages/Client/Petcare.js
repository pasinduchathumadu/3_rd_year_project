import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import image1 from "../../assests/online-store-image.png"
import image2 from "../../assests/care-center-image.png"
import image3 from "../../assests/pic3.jpg"
import { Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import PrimarySearchAppBar from "../../components/Layout/Header";



export default function Petcare() {
  return (
    <><PrimarySearchAppBar />

 
    <h1 style={{textAlign:"center",fontSize:"60px",fontWeight:"40",marginTop:"30px"}}> Pet <span style={{color:"orange"}}>care</span> </h1>
    <div style={{marginLeft:"180px",display:"flex",gap:"30px",marginTop:"35px"}}>
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
        <CardMedia style={{height:"35vh"}}
          component="img"
          height="180"
          image={image3}
          alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pet  traning
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>


   
    </div></>
  );
}
