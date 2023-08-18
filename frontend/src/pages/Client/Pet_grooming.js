import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import backgroundImageUrl from '../../assests/Grooming.jpg';
import pay from "../../assests/pay1.jpg"
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../styles/Client/Mindrelax.css";
import StripeCheckout from "react-stripe-checkout"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea} from "@mui/material";

import Bath from "../../assests/bath.jpg";
import Haircut from "../../assests/haircut.png";
import massage from "../../assests/massage.jpg";

import { format, setSeconds} from 'date-fns'
import { Link, useNavigate } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import BathImage from '../../assests/bath2.jpg'; // Import the background image
import { TextField, FormControlLabel} from "@mui/material";
import Box from '@mui/material/Box';
import logo from "../../assests/2.png";
import star from "../../assests/star3.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';


import 'aos/dist/aos.css';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Pet_grooming() {
  
  const [personName, setPersonName] = React.useState('');
  const [choose_package, setchoose] = React.useState('');
  const [timeslot, settimeslot] = useState([])
  const [Id, setSelectedId] = useState(null);
  const [third , setthird ] = useState(false)
  const navigate = useNavigate()
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setPersonName(selectedValue);
    const selectedItem = timeslot.find(item => selectedValue === item.start + ' - ' + item.end);
    if (selectedItem) {
      setSelectedId(selectedItem.id);
    }
  };
  const handlepackage = (event) => {
    const selectedValue = event.target.value;
    setchoose(selectedValue);
    setthird(true)
  };
  const [hair,sethair] = useState(false)
  const [mini,setmini] = useState(false)
  const [payment_charge,setpaymentcharge] = useState(null)
  const [selectpackage,setselectpackage] = useState([])
  const [first, setfirst] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [bath, setbath] = useState(false)
  const [error, seterror] = useState(false)
  const [message, setmessage] = useState("")
  const [package_care, setpackage] = useState([])
  const [fill, setfilled] = useState(false)
  const [paymentdo,setpaymentdo] = useState(false)
  const [employee_detail, setEmployeeDetail] = useState([]);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const email = localStorage.getItem('store_email')

  const input = new Date()
  const date = format(input, 'MM-dd-yyyy')
  const currentDate = new Date();
  const twoWeeksFromToday = new Date();
  twoWeeksFromToday.setDate(currentDate.getDate() + 14);

  const selectedDateString = selectedDate ? selectedDate.format('MM-DD-YYYY') : '';

  const handleFormOpen = async () => {
    seterror(false)
    if (selectedDate === null || Id === null) {
    
      setfilled(true)
      seterror(true)
      setmessage("Kindly choose a date and a time slot.")
      return
    }
    if (date > selectedDateString) {
      setfilled(true)
      seterror(true)
      setmessage("You can't pick that date")
      return
    }

    if (selectedDate > twoWeeksFromToday) {
      setfilled(true);
      seterror(true);
      setmessage("You can only pick a date within two weeks from today");
      return;
    }


    try {
      const res = await axios.post('http://localhost:5000/pet_care/user/date_client', {
        selectedDateString,
        Id
      })
      if (res.data.message === "already filled") {
        seterror(true)
        setfilled(true)
        setmessage("This time slot is not available")

      }
      else if (res.data.message === "added") {
        setfilled(false)
        seterror(true)
        setmessage("Your time slot has been successfully reserved!")
      }
    } catch (err) {
      console.log("There is an internel error")
    }
  };

  const random_assit = async (package_id) => {
    if (fill) {
      navigate('/Pet_grooming')
    }
    else {
      try {
        const res = await axios.post('http://localhost:5000/pet_care/user/random_assistant', {
          Id,
          selectedDateString,
          email,
          package_id
        })
        const data = await res.data
        setEmployeeDetail(data.data)

        if (res.data.message === "There is an internel error") {
         
          navigate('/Pet_grooming')
        }
        else {
  
          const res = await axios.get(`http://localhost:5000/pet_care/user/get_package/${package_id}`)
          const data = await res.data
          setselectpackage(data.data)
        
          if(data.data[0].package_name === "BATH"){
            setfirst(false)
            setbath(true)
          }
          if(data.data[0].package_name === "BATH AND HAIR CUTS"){
            setfirst(false)
            sethair(true)
          }
          if(data.data[0].package_name === "MINI GROOMING"){
            setfirst(false)
            setmini(true)
          }
        }


      } catch (err) {
        console.log(err)
      }
    }
  }

  const get_appointment_id = async()=>{
    try{
      const res = await axios.get(`http://localhost:5000/pet_care/user/get_appointment_id/${email}`)
  
      if(res.data.message === "success"){
        confirm()
      }

    }
    catch(err){
      console.log("There is an internel error")
    }
  }

  const payment1 = (price)=>{
    setpaymentdo(true)
    setbath(false)
    sethair(false)
    setmini(false)
    setpaymentcharge(price)
  }
  
  const confirm = async(id) =>{
    try{
    await axios.get(`http://localhost:5000/pet_care/user/payment/${id}`)
    }
    catch(err){
      console.log(err)
    }
  }
  const [product] = useState({
    name: "React from FB",
    price:payment_charge,
    productBy: "facebook"
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    try {
      const res = await axios.post("http://localhost:5000/pet_care/payment/card", {
        body,
        headers
      })
      if (res.data.message === "success") {
        console.log("success")
        navigate('/petcare')
      }
      else {
       console.log("failed")
      }
    } catch (err) {
      navigate('/petcare')
      console.log("failed")

    }

  }

  const cancel_appointment = async()=>{
    try{
      const res = await axios.get(`http://localhost:5000/pet_care/user/cancel_appointment/${email}`)
      if(res.data.message === "deleted"){
        navigate('/petcare')
      }

    }catch(err){
      console.log("There is an internel error")
    }
  }

  const get_timeslot = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/get_timeslot/${choose_package}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    get_timeslot()
      .then((data) => settimeslot(data.data))
      .catch((err) => console.log(err))
  })
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };
  const get_package = async () => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/user/get_allpackages')
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }

  const cancel = ()=>{
    navigate('/petcare')
  }

  useEffect(() => {
    get_package()
      .then((data) => setpackage(data.data))
      .catch((err) => console.log(err))
  })



  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  

  return (
    <><>

      {first && (
        <><div
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
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']} sx={{ width: "50vh", marginLeft: "10px", marginTop: "-10px" }}>
                  <DatePicker label="Book your time" value={selectedDate} onChange={handleDateChange} />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-single-checkbox-label">Select Package</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  value={choose_package}
                  onChange={handlepackage}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected}
                  MenuProps={MenuProps}
                >
                  {package_care && package_care.map((name, index) => (
                    <MenuItem key={name.id} value={name.package_name}>
                      <Checkbox checked={choose_package === name.package_name} />
                      <ListItemText primary={name.package_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {third &&(
                 <><FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-single-checkbox-label">Time Slot</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                  >
                    {timeslot && timeslot.map((name, index) => (
                      <MenuItem key={name.id} value={name.start + " - " + name.end}>
                        <Checkbox checked={personName === name.start + " - " + name.end} />
                        <ListItemText primary={name.start + " - " + name.end} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl><Button variant="contained" disableElevation sx={{ backgroundColor: "orange", marginLeft: "100px", marginTop: "0px", ':hover': { backgroundColor: 'orange' } }} onClick={handleFormOpen}>
                    Submit
                  </Button></>

              )}
             

            </div>


           
          </div>
          {error && (
            <div style={{ marginTop: '2%', width: "40%" }}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {message === "Your time slot has been successfully reserved!" && (
                  <Alert variant="filled" severity="success">{message}</Alert>
                )}


                {message !== "Your time slot has been successfully reserved!" && (
                  <Alert variant="filled" severity="error">{message}</Alert>
                )}

              </Stack>
            </div>

          )}


          <h1 style={{ marginTop: "-290px", fontSize: '60px', fontWeight: 'bold' }}> Let's <span style={{ color: "orange", fontSize: '60px', fontWeight: 'bold' }}>Groom</span> your pet.</h1>
           <Typography sx={{color:'red'}}>Note : Pick a Date within two weeks today onwards</Typography>

        </div>

          <div style={{ backgroundColor: "black", height: "50vh" }} data-aos="zoom-out-down">

            <h1 style={{ textAlign: "center", color: "white", fontSize: "10vh", fontWeight: "1" }}>choice your plan now!</h1>
            <h3 style={{ textAlign: "center", color: "white", fontWeight: "1" }}>No Risk, 30-Day Money Back Return Policy,</h3><br></br>




            <h1 style={{ fontSize: "60px", color: "white", textAlign: "center", fontWeight: "10000", marginTop: "60px", backgroundColor: "black", letterSpacing: "-2px", wordSpacing: "10px", height: "30vh" }}>
              SELECT A PACKAGE
            </h1>

            <div
              className='servises'
              data-aos="zoom-in"
              style={{ backgroundColor: "rgb(235 235 235)", height: "110vh", marginLeft: "auto", marginRight: "auto", display: "flex", gap: "", marginTop: "" }}
            >

              <Card sx={{
                maxWidth: 345, marginLeft: "220px", marginTop: "20px", height: "100vh", transition: "transform 0.5s",
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

                  <CardMedia
                    component="img"
                    height="140"
                    image={Bath}
                    alt="Bath"
                    className="cardMedia"
                    sx={{ height: "35vh" }} />
                  {package_care.filter((menu, index) => menu.package_id === 1).map((menu) => (
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "", fontSize: "23px" }}>
                        {menu.package_name}
                      </Typography><Typography variant="body2" color="text.secondary">
                        Rs.{menu.price}
                      </Typography><ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Deep Cleaning Shampoo</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Blow Dry</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> 15- Min Brushout</li>

                      </ol><Typography variant="body2" color="text.secondary" sx={{ marginTop: "90px", textAlign: "center" }}>
                        Clean grooming service without parabens,phthalates, and chamical dyes
                      </Typography><div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                        <Button onClick={() => random_assit(menu.package_id)} sx={{ backgroundColor: "black", width: "90%", '&:hover': { backgroundColor: 'black' } }} variant="contained">SELECT</Button>
                      </div>
                    </CardContent>
                  ))}

                </CardActionArea>
              </Card>


             

                <Card sx={{
                  maxWidth: 345, marginLeft: "20px", marginTop: "20px", height: "100vh", transition: "transform 0.5s ",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                  },
                }}>
                  <CardActionArea>
                    <CardMedia style={{ height: "35vh" }}
                      component="img"
                      height="140"
                      image={Haircut}
                      alt="Haircut" />
                       {package_care.filter((menu, index) => menu.package_id === 2).map((menu) => (
                    <CardContent>
                     
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "", fontSize: "23px" }}>
                          {menu.package_name}

                        </Typography><Typography variant="body2" color="text.secondary">
                            Rs.{menu.price}
                          </Typography>
                     

                      <ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Deep Cleaning Shampoo</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Hair Cuting  And Styling</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Blow Dry</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Nail Trim</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> 15-Min Brushout</li>
                      </ol>
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: "20px", textAlign: "center" }}>
                        Clean grooming service without parabens,phthalates, and chamical dyes
                      </Typography>

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button  onClick={() => random_assit(menu.package_id)} sx={{ backgroundColor: "black", width: "90%", '&:hover': { backgroundColor: 'black' } }} variant="contained">SELECT</Button>
                      </div>
                    </CardContent>
                     ))}
                  </CardActionArea>
                </Card>
             



             

                <Card sx={{
                  maxWidth: 345, marginLeft: "20px", marginTop: "20px", height: "100vh", transition: "transform 0.5s ",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                  },
                }}>
                  <CardActionArea>
                    <CardMedia style={{ height: "35vh" }}
                      component="img"
                      height="140"
                      image={massage}
                      alt="Haircut" />
                       {package_care.filter((menu, index) => menu.package_id === 3).map((menu) => (
                    <CardContent>
                     
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "", fontSize: "23px" }}>
                          {menu.package_name}
                        </Typography><Typography variant="body2" color="text.secondary">
                            Rs.{menu.price}
                          </Typography>
                     

                      <ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Hair Styling</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Sanitary Trim</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Body Massage</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> De-Shedding Treatment</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Nail Trim</li>
                      </ol>
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: "20px", textAlign: "center" }}>
                        Clean grooming service without parabens,phthalates, and chamical dyes
                      </Typography>

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button  onClick={() => random_assit(menu.package_id)} sx={{ backgroundColor: "black", width: "90%", '&:hover': { backgroundColor: 'black' } }} variant="contained">SELECT</Button>
                      </div>
                    </CardContent>
                     ))}
                  </CardActionArea>
                </Card>
             
            </div>


          </div></>


      )}
        {mini && (
        <div style={{ marginTop: "4%" }}>
          <div style={{ display: "f" }} data-aos="zoom-in">
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${BathImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "91.5vh",
                marginTop: "0px  ",
              }}
            >
              <div style={{ padding: "80px" }}>
                <img
                  className="smooth-scroll"
                  src={logo}
                  alt="Cage"
                  style={{
                    fontSize: "10px",
                    width: "70px",
                    height: "70px",
                    marginLeft: "140px",
                    borderRadius: "50%",
                    marginBottom: "5px",
                  }} />

                <h2
                  style={{
                    color: "white",
                    marginLeft: "50px",
                    fontSize: "50px",
                  }}
                >
                 Mini Grooming
                </h2>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "30px",
                    fontSize: "15px",
                    fontWeight: "1",
                  }}
                >
               Our pet bathing service provides a relaxing and{" "}
                </h1>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "30px",
                    fontSize: "15px",
                    fontWeight: "1",
                  }}
                >
                  {" "}
                  thorough bath for your furry companions, leaving them clean, fresh, and happy. {" "}
                </h1>
                <img
                  className="smooth-scroll"
                  src={star}
                  alt="Cage"
                  style={{
                    fontSize: "10px",
                    width: "150px",
                    height: "150px",
                    marginLeft: "100px",
                    borderRadius: "50%",
                    marginBottom: "-35px",
                  }} />

                <div style={{ display: "flex", marginTop: "30px" }}></div>
              </div>
            </div>
            <Typography sx={{ marginTop: '2%', marginLeft: '40%', color: 'black', fontSize: '48px', fontWeight: '600' }}>Our Team</Typography>
            <Stack

              direction={"row"}
              spacing={2}
              mt={4}
              mb={4}
              justifyContent={"center"}
              alignItems="center"
            >

              {employee_detail &&
                employee_detail.map((menu, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: "black",
                      width: 250,
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

                    <CardMedia>
                      <Stack mt={4}>
                        <img
                          component="img"
                          src={getImageSrc(menu.img)}
                          alt="Down Arrow"
                          style={{
                            width: 200,
                            height: 200,
                            cursor: "pointer",
                            borderRadius: "50%",
                          }} />
                      </Stack>
                    </CardMedia>

                    <CardContent>
                      <Box>
                        <Stack justifyContent={"center"} alignItems={"center"} mb={2}>
                          <Typography
                            variant="h6"
                            data-aos="fade-right"
                            sx={{ color: "white" }}

                          >
                            {menu.full_name}
                          </Typography>
                        </Stack>

                        <Stack sx={{ color: "white" }}>
                          <Stack direction={"row"} alignItems={"center"}>
                            <Stack direction={"row"} alignItems={"center"} data-aos="fade-left">
                              <Typography variant="h6" marginRight={1} marginLeft={3}>
                                4.5
                              </Typography>
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                            </Stack>
                          </Stack>

                          <Stack alignItems={"center"} justifyContent={"center"}>
                            <Typography variant="h6" data-aos="fade-left">
                              {menu.email}
                            </Typography>
                            <Typography variant="h6" data-aos="fade-right">
                              {menu.contact_number}
                            </Typography>
                            <Stack alignItems={"center"} justifyContent={"center"} mt={2} p={1}>
                              <Typography
                                variant="h3"
                                p={1}
                                data-aos="fade-right"
                                sx={{
                                  color: "black",
                                  backgroundColor: "white",
                                  borderRadius: 10,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >

                                10 <span style={{ color: "orange", fontSize: "20px" }}> Pet grooming</span>
                              </Typography>
                            </Stack>
                          </Stack>

                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </Stack>
            


            <div
              style={{
                backgroundColor: "#f5f7f6",
                width: "90%",
                height: "80vh",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "8px",
              }}
              data-aos="zoom-in"
            >
              <div style={{ marginTop: "5%" }}>
                <h1 style={{ textAlign: "center", paddingTop: "2%" }}>
                  Appointment Details
                </h1>

                <Stack
                  spacing={2}
                  margin={2}
                  style={{ padding: "450px", marginTop: "-400px" }}
                >
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    value={"Appointment Date: " + selectedDateString}
                  ></TextField>
                  <TextField
                    variant="outlined"
                    value={"Time Slot: " + personName}
                  ></TextField>
                  {selectpackage &&
                    selectpackage.map((menu, index) => (
                      <>
                        <TextField
                          variant="outlined"
                          value={"PackageName: " + menu.package_name}
                        ></TextField>
                        <TextField
                          variant="outlined"
                          value={"Package Price: Rs." + menu.price}
                        ></TextField>
                      </>
                    ))}

                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary"></Checkbox>}
                    label="Agree terms & conditions"
                  ></FormControlLabel>
                  <Box display="flex" justifyContent="space-between">
                   {selectpackage && selectpackage.map((menu,index)=>(
                    <Button
                    onClick={()=>payment1(menu.price)}
                    sx={{
                      backgroundColor: "black",
                      width: "50%",
                      ":hover": { backgroundColor: "black" },
                    }}
                    variant="contained"
                  >
                    Make The Payment
                  </Button>

                   ))}
                    <Button
                    onClick={cancel}
                      sx={{
                        backgroundColor: "red",
                        width: "40%",
                        ":hover": { backgroundColor: "red" },
                      }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </div>
            </div>
          </div>
        </div>

      )}
       {hair && (
        <div style={{ marginTop: "4%" }}>
          <div style={{ display: "f" }} data-aos="zoom-in">
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${BathImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "91.5vh",
                marginTop: "0px  ",
              }}
            >
              <div style={{ padding: "80px" }}>
                <img
                  className="smooth-scroll"
                  src={logo}
                  alt="Cage"
                  style={{
                    fontSize: "10px",
                    width: "70px",
                    height: "70px",
                    marginLeft: "140px",
                    borderRadius: "50%",
                    marginBottom: "5px",
                  }} />

                <h2
                  style={{
                    color: "white",
                    marginLeft: "50px",
                    fontSize: "50px",
                  }}
                >
                  Pet Bathing And Haircut
                </h2>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "30px",
                    fontSize: "15px",
                    fontWeight: "1",
                  }}
                >
                Our pet bathing service provides a relaxing and {" "}
                </h1>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "30px",
                    fontSize: "15px",
                    fontWeight: "1",
                  }}
                >
                  {" "}
                  thorough bath for your furry companions, leaving them clean, fresh, and happy. {" "}
                </h1>
                <img
                  className="smooth-scroll"
                  src={star}
                  alt="Cage"
                  style={{
                    fontSize: "10px",
                    width: "150px",
                    height: "150px",
                    marginLeft: "100px",
                    borderRadius: "50%",
                    marginBottom: "-35px",
                  }} />

                <div style={{ display: "flex", marginTop: "30px" }}></div>
              </div>
            </div>
            <Typography sx={{ marginTop: '2%', marginLeft: '40%', color: 'black', fontSize: '48px', fontWeight: '600' }}>Our Team</Typography>
            <Stack

              direction={"row"}
              spacing={2}
              mt={4}
              mb={4}
              justifyContent={"center"}
              alignItems="center"
            >

              {employee_detail &&
                employee_detail.map((menu, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: "black",
                      width: 250,
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

                    <CardMedia>
                      <Stack mt={4}>
                        <img
                          component="img"
                          src={getImageSrc(menu.img)}
                          alt="Down Arrow"
                          style={{
                            width: 200,
                            height: 200,
                            cursor: "pointer",
                            borderRadius: "50%",
                          }} />
                      </Stack>
                    </CardMedia>

                    <CardContent>
                      <Box>
                        <Stack justifyContent={"center"} alignItems={"center"} mb={2}>
                          <Typography
                            variant="h6"
                            data-aos="fade-right"
                            sx={{ color: "white" }}

                          >
                            {menu.full_name}
                          </Typography>
                        </Stack>

                        <Stack sx={{ color: "white" }}>
                          <Stack direction={"row"} alignItems={"center"}>
                            <Stack direction={"row"} alignItems={"center"} data-aos="fade-left">
                              <Typography variant="h6" marginRight={1} marginLeft={3}>
                                4.5
                              </Typography>
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                            </Stack>
                          </Stack>

                          <Stack alignItems={"center"} justifyContent={"center"}>
                            <Typography variant="h6" data-aos="fade-left">
                              {menu.email}
                            </Typography>
                            <Typography variant="h6" data-aos="fade-right">
                              {menu.contact_number}
                            </Typography>
                            <Stack alignItems={"center"} justifyContent={"center"} mt={2} p={1}>
                              <Typography
                                variant="h3"
                                p={1}
                                data-aos="fade-right"
                                sx={{
                                  color: "black",
                                  backgroundColor: "white",
                                  borderRadius: 10,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >

                                10 <span style={{ color: "orange", fontSize: "20px" }}> Pet grooming</span>
                              </Typography>
                            </Stack>
                          </Stack>

                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </Stack>
            


            <div
              style={{
                backgroundColor: "#f5f7f6",
                width: "90%",
                height: "80vh",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "8px",
              }}
              data-aos="zoom-in"
            >
              <div style={{ marginTop: "5%" }}>
                <h1 style={{ textAlign: "center", paddingTop: "2%" }}>
                  Appointment Details
                </h1>

                <Stack
                  spacing={2}
                  margin={2}
                  style={{ padding: "450px", marginTop: "-400px" }}
                >
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    value={"Appointment Date: " + selectedDateString}
                  ></TextField>
                  <TextField
                    variant="outlined"
                    value={"Time Slot: " + personName}
                  ></TextField>
                  {selectpackage &&
                    selectpackage.map((menu, index) => (
                      <>
                        <TextField
                          variant="outlined"
                          value={"PackageName: " + menu.package_name}
                        ></TextField>
                        <TextField
                          variant="outlined"
                          value={"Package Price: Rs." + menu.price}
                        ></TextField>
                      </>
                    ))}

                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary"></Checkbox>}
                    label="Agree terms & conditions"
                  ></FormControlLabel>
                  <Box display="flex" justifyContent="space-between">
                   {selectpackage && selectpackage.map((menu,index)=>(
                    <Button
                    onClick={()=>payment1(menu.price)}
                    sx={{
                      backgroundColor: "black",
                      width: "50%",
                      ":hover": { backgroundColor: "black" },
                    }}
                    variant="contained"
                  >
                    Make The Payment
                  </Button>

                   ))}
                    <Button
                    onClick={cancel}
                      sx={{
                        backgroundColor: "red",
                        width: "40%",
                        ":hover": { backgroundColor: "red" },
                      }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </div>
            </div>
          </div>
        </div>

      )}
      {bath && (
        <div style={{ marginTop: "4%" }}>
          <div style={{ display: "f" }} data-aos="zoom-in">
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${BathImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "91.5vh",
                marginTop: "0px  ",
              }}
            >
              <div style={{ padding: "80px" }}>
                <img
                  className="smooth-scroll"
                  src={logo}
                  alt="Cage"
                  style={{
                    fontSize: "10px",
                    width: "70px",
                    height: "70px",
                    marginLeft: "140px",
                    borderRadius: "50%",
                    marginBottom: "5px",
                  }} />

                <h2
                  style={{
                    color: "white",
                    marginLeft: "50px",
                    fontSize: "50px",
                  }}
                >
                  Pet Bathing
                </h2>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "30px",
                    fontSize: "15px",
                    fontWeight: "1",
                  }}
                >
                  Our pet bathing service provides a relaxing and{" "}
                </h1>
                <h1
                  style={{
                    color: "white",
                    marginLeft: "30px",
                    fontSize: "15px",
                    fontWeight: "1",
                  }}
                >
                  {" "}
                  thorough bath for your furry companions, leaving them clean,
                  fresh, and happy.{" "}
                </h1>
                <img
                  className="smooth-scroll"
                  src={star}
                  alt="Cage"
                  style={{
                    fontSize: "10px",
                    width: "150px",
                    height: "150px",
                    marginLeft: "100px",
                    borderRadius: "50%",
                    marginBottom: "-35px",
                  }} />

                <div style={{ display: "flex", marginTop: "30px" }}></div>
              </div>
            </div>
            <Typography sx={{ marginTop: '2%', marginLeft: '40%', color: 'black', fontSize: '48px', fontWeight: '600' }}>Our Team</Typography>
            <Stack

              direction={"row"}
              spacing={2}
              mt={4}
              mb={4}
              justifyContent={"center"}
              alignItems="center"
            >

              {employee_detail &&
                employee_detail.map((menu, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: "black",
                      width: 250,
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >

                    <CardMedia>
                      <Stack mt={4}>
                        <img
                          component="img"
                          src={getImageSrc(menu.img)}
                          alt="Down Arrow"
                          style={{
                            width: 200,
                            height: 200,
                            cursor: "pointer",
                            borderRadius: "50%",
                          }} />
                      </Stack>
                    </CardMedia>

                    <CardContent>
                      <Box>
                        <Stack justifyContent={"center"} alignItems={"center"} mb={2}>
                          <Typography
                            variant="h6"
                            data-aos="fade-right"
                            sx={{ color: "white" }}

                          >
                            {menu.full_name}
                          </Typography>
                        </Stack>

                        <Stack sx={{ color: "white" }}>
                          <Stack direction={"row"} alignItems={"center"}>
                            <Stack direction={"row"} alignItems={"center"} data-aos="fade-left">
                              <Typography variant="h6" marginRight={1} marginLeft={3}>
                                4.5
                              </Typography>
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                              <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />
                            </Stack>
                          </Stack>

                          <Stack alignItems={"center"} justifyContent={"center"}>
                            <Typography variant="h6" data-aos="fade-left">
                              {menu.email}
                            </Typography>
                            <Typography variant="h6" data-aos="fade-right">
                              {menu.contact_number}
                            </Typography>
                            <Stack alignItems={"center"} justifyContent={"center"} mt={2} p={1}>
                              <Typography
                                variant="h3"
                                p={1}
                                data-aos="fade-right"
                                sx={{
                                  color: "black",
                                  backgroundColor: "white",
                                  borderRadius: 10,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >

                                {menu.count}<span style={{ color: "orange", fontSize: "20px" }}> Pet grooming</span>
                              </Typography>
                            </Stack>
                          </Stack>

                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </Stack>
            


            <div
              style={{
                backgroundColor: "#f5f7f6",
                width: "90%",
                height: "80vh",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "8px",
              }}
              data-aos="zoom-in"
            >
              <div style={{ marginTop: "5%" }}>
                <h1 style={{ textAlign: "center", paddingTop: "2%" }}>
                  Appointment Details
                </h1>

                <Stack
                  spacing={2}
                  margin={2}
                  style={{ padding: "450px", marginTop: "-400px" }}
                >
                  <TextField
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    value={"Appointment Date: " + selectedDateString}
                  ></TextField>
                  <TextField
                    variant="outlined"
                    value={"Time Slot: " + personName}
                  ></TextField>
                  {selectpackage &&
                    selectpackage.map((menu, index) => (
                      <>
                        <TextField
                          variant="outlined"
                          value={"PackageName: " + menu.package_name}
                        ></TextField>
                        <TextField
                          variant="outlined"
                          value={"Package Price: Rs." + menu.price}
                        ></TextField>
                      </>
                    ))}

                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary"></Checkbox>}
                    label="Agree terms & conditions"
                  ></FormControlLabel>
                  <Box display="flex" justifyContent="space-between">
                   {selectpackage && selectpackage.map((menu,index)=>(
                    <Button
                    onClick={()=>payment1(menu.price)}
                    sx={{
                      backgroundColor: "black",
                      width: "50%",
                      ":hover": { backgroundColor: "black" },
                    }}
                    variant="contained"
                  >
                    Make The Payment
                  </Button>

                   ))}
                    <Button
                    onClick={cancel}
                      sx={{
                        backgroundColor: "red",
                        width: "40%",
                        ":hover": { backgroundColor: "red" },
                      }}
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
   
    {paymentdo &&(
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${pay})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "white", marginBottom: "20px" }}>
              Are you sure
            </Typography>
            <StripeCheckout
              stripeKey="pk_test_51NGJbtSDLfwYkCbGu6RR8Pf0Pj8KoKTEdIogc7wKKhMBsoEzaoLuwmukYs8Tc6GF8YqvdXJ7AYzk5ktxfByXN1Wk00elCyMdCm"
              token={makePayment}
              name="Buy React"
              amount={product.price}
              shippingAddress
            >
                <Stack justifyContent={"center"} alignItems={"center" } direction={"row"} spacing={2}>
    
              <Button
                onClick={get_appointment_id}
                variant="contained"
                sx={{
                  width: "300px",
                  height: "50px",
                  backgroundColor: "black",
                  marginTop: "10px",
                  paddingLeft: "15px",
                  marginLeft:'1%',
                  fontSize: "16px",
                  "&:hover": { backgroundColor: "black" },
                }}
              >
                Confirm (Rs.{payment_charge})
              </Button>
              <Button
              onClick={cancel_appointment}
              variant="contained"
              sx={{
                width: "300px",
                height: "50px",
                backgroundColor: "red",
             
                fontSize: "16px",
                "&:hover": { backgroundColor: "red" },
                marginTop: "10px",
              }}
            >
              Cancel
            </Button>
            </Stack>
            </StripeCheckout>
            
          </div>
        </div>
    )}</>
  );
}

export default Pet_grooming;