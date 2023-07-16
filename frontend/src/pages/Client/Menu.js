import React,{useState} from "react";
import { MenuList } from "../../components/data/data";
import Header from "../../components/Layout/Header";
import { useNavigate } from "react-router-dom";
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

  Typography,
} from "@mui/material";
import '../../styles/Common/HeaderStyles.css'
import dog from '../../assests/dog3.jpg'

const Menu = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const submit = () =>{
    navigate('/cart')

  }
  return (
    <><Header />
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Box sx={{ width: '100%', height: '60vh', backgroundImage: `url(${dog})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Grid sx={{ marginTop: '150px', marginLeft: '100px', fontStyle: 'bold' }}>
          <h1 style={{ fontSize: "44px" }}>50% discount for</h1>
          <Typography sx={{ fontSize: '24px', fontStyle: 'bold', marginTop: '10px', marginBottom: '10px', color: 'white' }}>FIRST ORDER</Typography>
          <Button variant="contained" sx={{ width: '15%' }}>SHOP NOW</Button>
        </Grid>
      </Box>
      <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="Tab Component"
      >
        <Tab label="dogs" />
        <Tab label="cats" />
      </Tabs>
     
    </Box>


      {MenuList.map((menu) => (
        <Card sx={{ maxWidth: "300px", display: "flex", m: 2 }}>
          <CardActionArea>
            <CardMedia
              sx={{ minHeight: "300px" }}
              component={"img"}
              src={menu.image}
              alt={menu.name} />
            <CardContent>
              <Typography variant="h5" gutterBottom component={"div"}>
                {menu.name}
              </Typography>
              <Typography variant="body2">{menu.description}</Typography><br />
              <Typography variant="body2" sx={{ color: "red", marginBottom: '9px' }}>RS.{menu.price}</Typography>
              <Button variant="contained" sx={{
                backgroundColor: 'black', color: 'white', '&:active, &:focus': {
                  backgroundColor: 'black'
                },
              }} onClick={submit}>Add To Cart</Button>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box></>
  );
};

export default Menu;
