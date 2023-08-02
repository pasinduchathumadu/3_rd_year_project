import React, { useState, useEffect } from "react";

import '../../styles/Common/Email.css'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

  Typography,
} from "@mui/material";
import '../../styles/Common/HeaderStyles.css'
import dog from '../../assests/pic3.jpg'
import dog1 from '../../assests/dog3.jpg'
import dog2 from '../../assests/pic57.webp'
import axios from "axios";


const Menu = () => {

  const [value, setValue] = useState(0);
  const [value_dog, setdog] = useState("")
  const [MenuList,setmenu] = useState([])
  const [dogBackground, setDogBackground] = useState(dog)
 
  const handleselection = (event) => {
    setdog(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };
  const get_store = async(req,res,next)=>{
    try{
      const res = await axios.get(`http://localhost:5000/pet_care/user/get_store/${value}`)
      const data = await res.data
      return data
    }
    catch(err){
      console.log("There is an internel error")
    }
  }
  useEffect(()=>{
    get_store()
    .then((data)=>setmenu(data.data))
    .catch((err)=>console.log("There is an internel error"))
  })

  useEffect(() => {
    // Change the background image every 2 minutes
    const interval = setInterval(() => {
      setDogBackground((prevBackground) => {
        if (prevBackground === dog) {
          return dog1;
        } else if (prevBackground === dog1) {
          return dog2;
        } else {
          return dog;
        }
      });
    }, 1200); // 2 minutes in milliseconds

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Box sx={{ width: '100%', height: '80vh', backgroundImage: `url(${dogBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Grid sx={{ marginTop: '150px', marginLeft: '100px', fontStyle: 'bold' }}>
            <h1 style={{ fontSize: "55px", color: 'black' }}>50% discount for</h1>
            <Typography sx={{ fontSize: '24px', fontStyle: 'bold', marginTop: '10px', marginBottom: '10px', color: 'white' }}>FIRST ORDER</Typography>
            <Button variant="contained" sx={{ width: '15%', backgroundColor: 'orange' }}>SHOP NOW</Button>
          </Grid>
        </Box>
        <Box sx={{ width: "90%", marginTop: '30px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Tab Component"
            indicatorColor='transparent'
            sx={{ borderRadius: '10px' }}

          >
            <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="dogs" />
            <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="cats" />
          </Tabs>

        </Box>

      </Box>

      <FormControl sx={{ m: 1, minWidth: 120, width: '30%', marginLeft: '10%', marginTop: '2%', textAlign: 'center' }} size="small">
        <InputLabel disabled={true} displayPrint="none" variant="filled" color="warning" htmlFor="demo-input" sx={{ color: 'black' }}>Price Ranges</InputLabel>
        <Select
          labelId="demo-select-error-label"
          id="demo-select-small"
          value={value_dog}
          label="Age"
          onChange={handleselection}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>100    -    1000</MenuItem>
          <MenuItem value={20}>1000   -   10 000</MenuItem>
          <MenuItem value={30}>10 000 -   50 000</MenuItem>
        </Select>
      </FormControl>


      <FormControl sx={{ m: 1, minWidth: 120, width: '30%', marginLeft: '10%', marginTop: '2%', textAlign: 'center' }} size="small">
      
        <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label" sx={{ color: 'black' }}>Categories</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value_dog}
          label="Age"
          onChange={handleselection}


        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Food Item</MenuItem>
          <MenuItem value={20}>Toys Item</MenuItem>
          <MenuItem value={30}>Others</MenuItem>
        </Select>
      </FormControl>
     
      
      <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>
      <Grid container justifyContent="center" sx={{marginTop:'30px'}} >
          <Typography sx={{ textAlign:'center',color:'black',fontSize:'20px',fontFamily:'inherit',backgroundColor:'orange',width:'180px',paddingLeft:'18px',paddingRight:'18px' }}>Food Item</Typography>

        </Grid>


        {MenuList.filter((menu,index)=>menu.catogories==='foods').map((menu) => (
          <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "300px" }}
                component={"img"}
                src={getImageSrc(menu.image)}
                alt={menu.name} />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography><br />
                <Typography variant="body2" sx={{ color: "red", marginBottom: '9px' }}>RS.{menu.unit_price}</Typography>
               
              </CardContent>
            </CardActionArea>
          </Card>

        ))}</Box>
      <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>

      <Grid container justifyContent="center" sx={{marginTop:'30px'}} >
          <Typography sx={{textAlign:'center',paddingRight:'18px', color: 'black',fontSize:'20px',fontFamily:'inherit',backgroundColor:'orange',width:'180px',paddingLeft:'18px' }}>Toys Item</Typography>

        </Grid>

        {MenuList.filter((menu,index)=>menu.catogories==='toys').map((menu) => (
          <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "300px" }}
                component={"img"}
                src={getImageSrc(menu.image)}
                alt={menu.name} />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography><br />
                <Typography variant="body2" sx={{ color: "red", marginBottom: '9px' }}>RS.{menu.unit_price}</Typography>
              
             
              </CardContent>
            </CardActionArea>
          </Card>

        ))}</Box>
        <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>
      <Grid container justifyContent="center" sx={{marginTop:'30px'}} >
          <Typography sx={{ textAlign:'center',color:'black',fontSize:'20px',fontFamily:'inherit',backgroundColor:'orange',width:'180px',paddingLeft:'18px',paddingRight:'18px' }}>Accessories</Typography>

        </Grid>


        {MenuList.filter((menu,index)=>menu.catogories==='accessories').map((menu) => (
          <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: "300px" }}
                component={"img"}
                src={getImageSrc(menu.image)}
                alt={menu.name} />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography><br />
                <Typography variant="body2" sx={{ color: "red", marginBottom: '9px' }}>RS.{menu.unit_price}</Typography>
               
              </CardContent>
            </CardActionArea>
          </Card>

        ))}</Box>


    </>
  );
};

export default Menu;
