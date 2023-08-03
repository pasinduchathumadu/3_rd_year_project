import React from 'react'
import "../../styles/Client/Dashboard.css"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import logoImage from "../../assests/cover.png";
import card2 from "../../assests/cover.png"
import PrimarySearchAppBar from "../../components/Layout/Header";
import Image1 from '../../assests/cover.png'
import Image2 from '../../assests/pic3.jpg'
import Image3 from '../../assests/medi-help-image.png'
import Image4 from '../../assests/pet-foods.png'
import "../../styles/Client/Shop.css"
import Button from '@mui/material/Button';

import {useNavigate} from 'react-router-dom'

const images = [
  {
    url: Image1,
    title: 'petcare',
    width: '40%',
    slag: '/petcare'
  },
  {
    url: Image2,
    title: 'Bording-House',
    width: '30%',
    slag: '/bording'
  },
  {
    url: Image3,
    title: 'Medi house',
    width: '30%',
    slag: '/ghi'
  },
 
  {
    
    url: Image4,
    title: 'Medi house',
    width: '100%',
    marginTop : '1%' ,
    height:450,
    slag: '/ghi'
  },
];  



const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.2,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className='dashboard'>

        <><PrimarySearchAppBar />
        <div className='smooth-scroll'>
          <h1 style={{textAlign:"center",fontSize:"60px",fontWeight:"40",marginTop:"30px"}}>Keep your Pet <span style={{color:"orange"}}>Happy</span> </h1>

        </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' ,marginTop:"60px"}}>
      {images.map((image) => (
        <ImageButton className='smooth-scroll'
          focusRipple
          key={image.title}
          style={{
            width: image.width,
            marginTop : image.marginTop,
            height : image.height
          }}

          onClick={() => {
            navigate(image.slag);
          } }

        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      )

      )}
      {/* <div className='bottm'>
      <h2>happt tail shop</h2>
    </div> */}
    </Box></>

     
  </div>
  
   
  )
}
