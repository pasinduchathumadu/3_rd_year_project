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

import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../styles/Client/Mindrelax.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Bath from "../../assests/bath.jpg";
import Haircut from "../../assests/haircut.png";
import massage from "../../assests/massage.jpg";

import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import BathImage from '../../assests/bath2.jpg'; // Import the background image
import { TextField, FormControlLabel} from "@mui/material";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';



import caregiver from "../../assests/emp1.jpg";

// import petcare3 from "../../assests/premium.jpg";
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
  const [timeslot, settimeslot] = useState([])
  const [Id, setSelectedId] = useState(null);
  const navigate = useNavigate()
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setPersonName(selectedValue);
    const selectedItem = timeslot.find(item => selectedValue === item.start + ' - ' + item.end);
    if (selectedItem) {
      setSelectedId(selectedItem.id); // Set the corresponding ID to selectedId
    }
  };
  const [selectpackage,setselectpackage] = useState([])
  const [first, setfirst] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [bath, setbath] = useState(false)
  const [error, seterror] = useState(false)
  const [message, setmessage] = useState("")
  const [package_care, setpackage] = useState([])
  const [fill, setfilled] = useState(false)
  const [employee_detail, setEmployeeDetail] = useState([]);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const email = localStorage.getItem('store_email')

  const input = new Date()
  const date = format(input, 'MM-dd-yyyy')

  const selectedDateString = selectedDate ? selectedDate.format('MM-DD-YYYY') : '';

  const handleFormOpen = async () => {
    seterror(false)
    if (selectedDate === null || Id === null) {
      console.log("ooo")
      setfilled(true)
      seterror(true)
      setmessage("Please Select Date & TimeSlot")
      return
    }
    if (date > selectedDateString) {
      setfilled(true)
      seterror(true)
      setmessage("You can't pick that date")
      return
    }


    try {
      const res = await axios.post('http://localhost:5000/pet_care/user/date_client', {
        selectedDateString,
        Id
      })
      if (res.data.message === "already filled") {
        seterror(true)
        setfilled(true)
        setmessage("This Time Slot Is not availble")

      }
      else if (res.data.message === "added") {
        setfilled(false)
        seterror(true)
        setmessage("You Time Slot is successfully placed now!")
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
          setfirst(false)
          setbath(true)
        }


      } catch (err) {
        console.log(err)
      }
    }
  }

  const get_timeslot = async () => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/user/get_timeslot')
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

  useEffect(() => {
    get_package()
      .then((data) => setpackage(data.data))
      .catch((err) => console.log(err))
  })



  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
  
  

  return (
    <>

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
              </FormControl>

            </div>


            <Button variant="contained" disableElevation sx={{ backgroundColor: "orange", marginLeft: "500px", marginTop: "0px", ':hover': { backgroundColor: 'orange' } }} onClick={handleFormOpen}>
              Submit
            </Button>
          </div>
          {error && (
            <div style={{ marginTop: '2%',width:"40%"}}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error" >{message}</Alert>
              </Stack>
            </div>

          )}


          <h1 style={{ marginTop: "-290px", fontSize: '60px', fontWeight: 'bold' }}> Let's <span style={{ color: "orange", fontSize: '60px', fontWeight: 'bold' }}>Groom</span> your pet.</h1>


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
                        Up to Rs.{menu.price}
                      </Typography><ol style={{ listStyleType: 'none', padding: 0, textAlign: "", marginTop: "40px", color: "black", fontSize: "20px" }}>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Deep Cleaning Shampoo</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Blow Dry</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> Ear Cleaning</li>
                        <li className="tick-icon"><CheckCircleIcon sx={{ color: "orange" }} /> 15- Min Brushout</li>

                      </ol><Typography variant="body2" color="text.secondary" sx={{ marginTop: "90px", textAlign: "center" }}>
                        Clean grooming service without parabens,phthalates, and chamical dyes
                      </Typography><div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                        <Button onClick={() => random_assit(menu.package_id)} sx={{ backgroundColor: "black", width: "90%", '&:hover': { backgroundColor: 'black' } }} variant="contained">Edit</Button>
                      </div>
                    </CardContent>
                  ))}

                </CardActionArea>
              </Card>


              <Link to="/Haircuts" style={{ textDecoration: "none", color: "inherit", height: "70vh" }}>

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
                    <CardContent>
                      {package_care.filter((menu, index) => menu.package_id === 2).map((menu) => (
                        <><Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "", fontSize: "23px" }}>
                          {menu.package_name}

                        </Typography><Typography variant="body2" color="text.secondary">
                            Up to Rs.{menu.price}
                          </Typography></>
                      ))}

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
                        <Button sx={{ backgroundColor: "black", width: "90%", '&:hover': { backgroundColor: 'black' } }} variant="contained">Edit</Button>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>



              <Link to="/MiniGrooming" style={{ textDecoration: "none", color: "inherit", height: "70vh" }}>

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
                    <CardContent>
                      {package_care.filter((menu, index) => menu.package_id === 3).map((menu) => (
                        <><Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "", fontSize: "23px" }}>
                          {menu.package_name}
                        </Typography><Typography variant="body2" color="text.secondary">
                            Up to Rs.{menu.price}
                          </Typography></>
                      ))}

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
                        <Button sx={{ backgroundColor: "black", width: "90%", '&:hover': { backgroundColor: 'black' } }} variant="contained">Edit</Button>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </div>


          </div></>


      )}

      {bath && (
        <div style={{ marginTop: '4%' }}>


          <div style={{ display: 'f', }} data-aos="zoom-in" >
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${BathImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '91.5vh',
                marginTop: "0px  "
              }}
            >
              <div style={{ padding: "80px" }}>
                <img className="smooth-scroll" src={logo} alt="Cage" style={{ fontSize: "10px", width: "70px", height: "70px", marginLeft: "140px", borderRadius: "50%", marginBottom: "5px" }} />

                <h2 style={{ color: "white", marginLeft: "50px", fontSize: "50px" }}>Pet Bathing</h2>
                <h1 style={{ color: "white", marginLeft: "30px", fontSize: "15px", fontWeight: "1" }}>Our pet bathing service provides a relaxing and </h1>
                <h1 style={{ color: "white", marginLeft: "30px", fontSize: "15px", fontWeight: "1" }}> thorough bath for your furry companions, leaving them clean, fresh, and happy. </h1>
                <img className="smooth-scroll" src={star} alt="Cage" style={{ fontSize: "10px", width: "150px", height: "150px", marginLeft: "100px", borderRadius: "50%", marginBottom: "-35px" }} />



                <div style={{ display: "flex", marginTop: "30px" }}>

                </div>



              </div>

            </div>

            <div style={{ backgroundColor: "black", width: "100%", height: "80vh",     }} data-aos="zoom-in" >
              <h2 style={{ textAlign: "center", color: "orange", fontSize: "40px", paddingTop: '1%' }}>Your Assistant</h2>
              <div style={{ display: "flex", marginTop: "60px", marginLeft: "60px" }}>
                <div>
                  {employee_detail && employee_detail.map((menu,index)=>(
                     <img
                     component={"img"}
                     src={getImageSrc(menu.img)}
                     alt="Down Arrow"
                     style={{ width: 400, height: 400, cursor: 'pointer', borderRadius: "50%" }}
 
                   />

                  ))}
                 
                </div>
                <div style={{ color: "white" }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: "90px" }} >
                    <h1 style={{ marginRight: '10px', fontSize: '20px', fontWeight: '1' }}>4.5</h1>
                    <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="2x" style={{ marginRight: '10px' }} />
                  </div>


                  <><h1 style={{ marginLeft: "400px", fontSize: "50px",marginTop :"-179px" }} data-aos="fade-right">{employee_detail && employee_detail.map((menu, index) => menu.full_name)}</h1><h1 style={{ marginLeft: "400px", fontSize: "20px", fontWeight: "1" }} data-aos="fade-left">{employee_detail && employee_detail.map((menu, index) => menu.email)}</h1><h1 style={{ marginLeft: "400px", fontSize: "20px", fontWeight: "1" }} data-aos="fade-right">{employee_detail && employee_detail.map((menu, index) => menu.contact_number)}</h1><h1 style={{ marginLeft: "400px", fontSize: "100px", fontWeight: "1" }} data-aos="fade-right">10 <span style={{ color: "orange", fontSize: "20px" }}> Pet grooming</span>
                  </h1></>

                </div>
              </div>


            </div>

            <div style={{ backgroundColor: '#f5f7f6', width: '90%', height: '80vh', marginLeft: "auto", marginRight: "auto", borderRadius: "8px" }} data-aos="zoom-in">

              <div style={{ marginTop: '5%' }}>
                <h1 style={{ textAlign: "center", paddingTop: '2%' }}>Appointment Details</h1>

                <Stack spacing={2} margin={2} style={{ padding: "450px", marginTop: "-400px" }}>
                  <TextField InputProps={{
                    readOnly: true,
                  }} variant="outlined"  value={"Appointment Date: " + selectedDateString}></TextField>
                  <TextField variant="outlined" value={"Time Slot: " + personName}></TextField>
                  {selectpackage && selectpackage.map((menu,index)=>(
                       <><TextField variant="outlined" value={"PackageName: " + menu.package_name}></TextField>
                       <TextField variant="outlined" value={"Package Price: Rs." + menu.price}></TextField></>

                  ))}
               
              
                  <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                  <Box display="flex" justifyContent="space-between">
  <Button sx={{ backgroundColor: "black",width:'50%',':hover':{backgroundColor:'black'} }} variant="contained">
    Make The Payment
  </Button>
  <Button sx={{ backgroundColor: "red",width:'40%',':hover':{backgroundColor:'red'} }} variant="contained">
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
  );
}

export default Pet_grooming;