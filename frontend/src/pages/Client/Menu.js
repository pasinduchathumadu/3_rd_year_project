import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Common/Email.css'
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
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
  Avatar,
} from "@mui/material";
import '../../styles/Common/HeaderStyles.css'
import dog from '../../assests/pettoy1.jpg'
import dog1 from '../../assests/pettoy2.jpg'
import dog2 from '../../assests/pettoy3.jpg'
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingIndicator from "../../components/LoadingIndicator";
const Menu = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [value_dog, setdog] = useState(0)
  const [value_dog1, setdog1] = useState(0)
  const [MenuList, setmenu] = useState([])
  const [dogBackground, setDogBackground] = useState(dog)
  const [error, seterror] = useState([])
  const handleselection = (event) => {
    setdog(event.target.value);
    get_store()
  };
  const handleselection1 = (event) => {
    setdog1(event.target.value);
    get_store()
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const email = localStorage.getItem("store_email")
  const changelocation = () => {
    navigate('/cart')
  }
  const submit = async (id, price) => {
    try {
   
      const res = await axios.post('http://localhost:5000/pet_care/user/temp_cart', {
        id,
        email,
        price
      });
      if (res.data.message === "added") {
        changelocation()

      }
      else if (res.data.message === 'already in the cart') {
        seterror(() => ({

          [id]: 'already in the cart'
        }));

      }

    } catch (err) {
      console.log("There is an internel error")
    }



  }
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };
  const get_store = async () => {
    var new_value_dog1 = ""
    if (value_dog1 === 0) {
      new_value_dog1 = "no"
    }
    if (value_dog1 === 10) {
      new_value_dog1 = "foods"
    }
    if (value_dog1 === 20) {
      new_value_dog1 = "toys"
    }
    if (value_dog1 === 30) {
      new_value_dog1 = "accessories"
    }

    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/get_store/${value}`, {
        value_dog,
        new_value_dog1
      })

      const data = await res.data
      setmenu(data.data);
      setLoading(false)

    }
    catch (err) {
      console.log("There is an internel error")
    }
  }
  useEffect(() => {
    get_store()
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
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <Box sx={{ width: '100%', height: '80vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${dogBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease-in-out' }}>
              <Grid sx={{ marginTop: '150px', marginLeft: '100px', fontStyle: 'bold' }}>
                <h1 style={{ fontSize: "55px", color: 'white', textAlign: "center" }}>10% discount for</h1>
                <Typography sx={{ fontSize: '24px', fontStyle: 'bold', marginTop: '10px', marginBottom: '10px', color: 'white', textAlign: "center" }}>FIRST ORDER</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    marginLeft: "650px",
                    border: "2px solid white", // Adding the border
                    ':hover': {
                      backgroundColor: 'black',
                      borderColor: 'gray',
                    },
                  }}
                >
                  show now
                </Button>

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
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>100    -    500</MenuItem>
              <MenuItem value={20}>500    -    1000</MenuItem>
              <MenuItem value={30}>1000   -    5000</MenuItem>
            </Select>
          </FormControl>


          <FormControl sx={{ m: 1, minWidth: 120, width: '30%', marginLeft: '10%', marginTop: '2%', textAlign: 'center' }} size="small">

            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label" sx={{ color: 'black' }}>Categories</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={value_dog1}
              label="Age"
              onChange={handleselection1}


            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Food Item</MenuItem>
              <MenuItem value={20}>Toys Item</MenuItem>
              <MenuItem value={30}>Accessories Item</MenuItem>
            </Select>
          </FormControl>


          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>
            <Grid container justifyContent="center" sx={{ marginTop: '30px' }} >
              <Typography sx={{ textAlign: 'center', color: 'black', fontSize: '20px', fontFamily: 'inherit', backgroundColor: 'orange', width: '180px', paddingLeft: '18px', paddingRight: '18px' }}>Food Item</Typography>

            </Grid>
            {MenuList.filter((menu, index) => menu.catogories === 'foods').length === 0 ? (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc("noimage.png")}
                  />
                </CardActionArea>
              </Card>
            ) : null}

            {MenuList.filter((menu, index) => menu.catogories === 'foods').map((menu) => (
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
                    <Stack>
                      <Box component='div' display='flex'>
                        <Typography variant="body1" sx={{ color: "red", marginBottom: '5px', fontSize: '18px' }}>RS.{menu.unit_price}</Typography>
                        {menu.discount !== 0 && (
                          <ArrowDownwardTwoToneIcon />

                        )}

                      </Box>
                    </Stack>

                    {menu.discount !== 0 && (
                      <Typography sx={{ fontFamily: 'fantasy', fontSize: '24px', textAlign: 'center', marginBottom: '2%' }}>New Price : Rs.{menu.unit_price - (menu.discount * menu.unit_price) / 100}</Typography>
                    )}



                    <Button variant="contained" sx={{
                      backgroundColor: 'black', color: 'white', '&:active, &:focus': {
                        backgroundColor: 'black'
                      }, ':hover': { backgroundColor: 'black' }
                    }} onClick={() => submit(menu.item_id,menu.unit_price - (menu.discount * menu.unit_price) / 100)}>Add To Cart</Button>
                    {error[menu.item_id] && (
                      <Stack sx={{ width: '90%', marginTop: '4%' }} spacing={2}>
                        <Alert severity="warning">Already Added!</Alert>
                      </Stack>
                    )}
                    {menu.discount !== 0 && (
                      <Stack direction="row" spacing={1} sx={{ marginTop: '2%', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: 'red', color: 'black', width: 56, height: 56 }}>{menu.discount}%</Avatar><Typography sx={{ fontFamily: 'fantasy' }}>Discount</Typography>

                      </Stack>
                    )}

                  </CardContent>
                </CardActionArea>
              </Card>

            ))}</Box>
          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>

            <Grid container justifyContent="center" sx={{ marginTop: '30px' }} >
              <Typography sx={{ textAlign: 'center', paddingRight: '18px', color: 'black', fontSize: '20px', fontFamily: 'inherit', backgroundColor: 'orange', width: '180px', paddingLeft: '18px' }}>Toys Item</Typography>

            </Grid>
            {MenuList.filter((menu, index) => menu.catogories === 'toys').length === 0 ? (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc("noimage.png")}
                  />
                </CardActionArea>
              </Card>
            ) : null}

            {MenuList.filter((menu, index) => menu.catogories === 'toys').map((menu) => (
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
                    <Stack>
                      <Box component='div' display='flex'>
                        <Typography variant="body1" sx={{ color: "red", marginBottom: '9px', fontSize: '18px' }}>RS.{menu.unit_price}</Typography>
                        {menu.discount !== 0 && (
                          <ArrowDownwardTwoToneIcon />
                        )}

                      </Box>
                    </Stack>
                    {menu.discount !== 0 && (
                      <Typography sx={{ fontFamily: 'fantasy', fontSize: '24px', textAlign: 'center', marginBottom: '2%' }}>New Price : Rs.{menu.unit_price - (menu.discount * menu.unit_price) / 100}</Typography>
                    )}




                    <Button variant="contained" sx={{
                      backgroundColor: 'black', color: 'white', '&:active, &:focus': {
                        backgroundColor: 'black'
                      }, ':hover': { backgroundColor: 'black' }
                    }} onClick={() => submit(menu.item_id,menu.unit_price - (menu.discount * menu.unit_price) / 100)}>Add To Cart</Button>
                    {error[menu.item_id] && (
                      <Stack sx={{ width: '90%', marginTop: '4%' }} spacing={2}>
                        <Alert severity="warning">Already Added!</Alert>
                      </Stack>
                    )}
                    {menu.discount !== 0 && (
                      <Stack direction="row" spacing={1} sx={{ marginTop: '2%', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: 'red', color: 'black', width: 56, height: 56 }}>{menu.discount}%</Avatar><Typography sx={{ fontFamily: 'fantasy' }}>Discount</Typography>

                      </Stack>


                    )}

                  </CardContent>
                </CardActionArea>
              </Card>

            ))}</Box>
          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>
            <Grid container justifyContent="center" sx={{ marginTop: '30px' }} >
              <Typography sx={{ textAlign: 'center', color: 'black', fontSize: '20px', fontFamily: 'inherit', backgroundColor: 'orange', width: '180px', paddingLeft: '18px', paddingRight: '18px' }}>Accessories</Typography>

            </Grid>

            {MenuList.filter((menu, index) => menu.catogories === 'accessories').length === 0 ? (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc("noimage.png")}
                  />
                </CardActionArea>
              </Card>
            ) : null}
            {MenuList.filter((menu, index) => menu.catogories === 'accessories').map((menu) => (
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
                    <Stack>
                      <Box component='div' display='flex'>
                        <Typography variant="body1" sx={{ color: "red", marginBottom: '9px', fontSize: '18px' }}>RS.{menu.unit_price}</Typography>
                        {menu.discount !==0 &&(
                            <ArrowDownwardTwoToneIcon />
                        )}
                      
                      </Box>
                    </Stack>

                    {menu.discount !== 0 && (

                      <Typography sx={{ fontFamily: 'fantasy', fontSize: '24px', textAlign: 'center', marginBottom: '2%' }}>New Price : Rs.{menu.unit_price - (menu.discount * menu.unit_price) / 100}</Typography>
                    )}


                    <Button variant="contained" sx={{
                      backgroundColor: 'black', color: 'white', '&:active, &:focus': {
                        backgroundColor: 'black'
                      }, ':hover': { backgroundColor: 'black' }
                    
                    }} onClick={() => submit(menu.item_id,menu.unit_price - (menu.discount * menu.unit_price) / 100)}>Add To Cart</Button>
                    {error[menu.item_id] && (
                      <Stack sx={{ width: '90%', marginTop: '4%' }} spacing={2}>
                        <Alert severity="warning">Already Added!</Alert>
                      </Stack>
                    )}
                    {menu.discount !== 0 && (
                      <Stack direction="row" spacing={1} sx={{ marginTop: '2%', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: 'red', color: 'black', width: 56, height: 56 }}>{menu.discount}%</Avatar><Typography sx={{ fontFamily: 'fantasy' }}>Discount</Typography>
                      </Stack>

                    )}


                  </CardContent>
                </CardActionArea>
              </Card>

            ))}</Box>


        </>
      )}
    </div>
  );
};

export default Menu;
