import React, { useState, useEffect } from 'react';
// import PrimarySearchAppBar from "../../components/Layout/Header";
import { Typography, Button, Card, CardActionArea, CardContent, CardMedia, TextField, IconButton } from "@mui/material";
import CoverImage from '../../assests/mindrelaxcover.jpg';
// import Button from '@mui/material/Button';
import petImage2 from '../../assests/top.png';
import "../../styles/Client/Mindrelax.css";
import AOS from 'aos';
import axios from 'axios';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PetsIcon from '@mui/icons-material/Pets';
import { Stack } from '@mui/system';
import { FormControl } from '@mui/base';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import FormHelperText from '@mui/material/FormHelperText';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';

function MindRealx() {
  const email = localStorage.getItem('store_email') //session

  // animation
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [main, setmain] = useState(true) //main part
  const [petpart, setpetpart] = useState(false)  //display pets part
  const [placeform, setplaceform] = useState(false) //add appointment form 

  // click on GET STARTED button
  const getStarted = () => {
    setmain(false)
    setpetpart(true)
  }

  // get mind relaxing pets
  const [pets, setpets] = useState([])
  const getMindRealxingPets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/getMindRealxingPets`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getMindRealxingPets()
      .then((data) => setpets(data.data))
      .catch((err) => console.log(err))
  })

  // get mind relaxing time slots
  const [slot, setslot] = useState([])
  const getTimeSlots = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/getTimeSlots`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getTimeSlots()
      .then((data) => setslot(data.data))
      .catch((err) => console.log(err))
  })

  // get pet image from db
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  // open place appointment form
  const [id, setid] = useState("")
  const openForm = (id) => {
    setplaceform(true)
    setmain(false)
    setpetpart(false)
    seterror(false)
    setsuccess(false)
    setid(id)
  }

  // get pet details for appointment form
  const [details, setdetails] = useState("")
  const getDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/getDetails/${id}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getDetails()
      .then((data) => setdetails(data.data))
      .catch((err) => console.log(err))
  })


  // const [time, settime] = useState("")
  const [time, settime] = useState("")

  const handleTime = (event) => { //time slot id
    settime(event.target.value)
  }
  const [day, setday] = useState("")
  const [error, seterror] = useState(false)
  const [success, setsuccess] = useState(false)
  const [message, setmessage] = useState("")
  // place appointment form
  const SubmitForm = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/SubmitForm/${id}`, {
        email,
        day,
        time
      })
      if (res.data.message === 'There is an internal error') {
        setmessage('Cannot place the appointment')
        seterror(true)
      } else if (res.data.message === 'Successfully Done!') {
        setsuccess(true)
        seterror(false)
        setmessage('Successfully Done!')
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // close popup without placing appointment
  const closeForm = () => {
    setplaceform(false)
    setmain(false)
    setpetpart(true)
  }

  return (
    <div style={{ marginTop: '5%' }}>
      {/* start page */}
      {main && (
        <div style={{ backgroundColor: '#F0F0F5', width: '96%', height: '100vh', padding: '2%', marginLeft: '2%', marginRight: '2%', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '45px' }}>Creating a Stress-Free Environment</Typography>
          <Typography sx={{ fontSize: '30px' }}>Come and spend time with our <span style={{ color: 'orange', fontSize: '45px' }}><b> Happy Tails </b></span> pets</Typography>

          <div className='smooth-scroll' style={{ lineHeight: "1.5" }}>
            <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "20px", textAlign: "left", marginLeft: "20px", lineHeight: "1.15" }}>
              If you don't have a pet, don't WORRY! We can lend you our lovely pets.
            </p>
            <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "20px", textAlign: "left", marginLeft: "20px", lineHeight: "1.15" }}>
              Spend your valuable time with our pets
            </p>
          </div>

          <div className='smooth-scroll' style={{ textAlign: "left", marginTop: "80px", marginLeft: "20px" }} data-aos="zoom-in">
            <Button onClick={getStarted} variant="outlined" sx={{ color: "white", color: "white", backgroundColor: "black", padding: '1%', width: '12%', ':hover': { backgroundColor: 'black' } }}>
              GET STARTED
            </Button>
          </div>

          <img className='smooth-scroll'
            src={petImage2}
            alt="Pet"
            style={{
              width: "auto",
              height: "48vh",
              textAlign: "left",
              marginLeft: "500px",

            }}
          />
        </div>
      )}

      {/* pet viewing */}
      {petpart && (
        <div style={{ width: '96%', height: 'auto', padding: '2%', marginLeft: '2%', marginRight: '2%', borderRadius: '10px', marginTop: '1%', backgroundColor: '#f0f0f5' }}>
          <Typography sx={{ fontSize: '40px', textAlign: 'center' }}>Mind Relaxing - System Pets</Typography>

          <div style={{ marginLeft: '3%', marginRight: '3%', borderRadius: '10px', padding: '1%', marginTop: '2%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {pets && pets.length > 0 ? (
                pets.map((menu, index) => (

                  <Card sx={{ maxWidth: "250px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                    <CardActionArea>
                      <CardMedia
                        sx={{ minHeight: "300px" }}
                        component={"img"}
                        src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                        alt={menu.name} />
                      <CardContent>
                        <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}><PetsIcon sx={{ color: 'orange' }} />
                          {menu.name}
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>{menu.sex}</Typography><br />
                        <Typography variant="h6" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.breed}</Typography>
                        <Stack sx={{ marginBottom: '2%' }}>
                          <Button onClick={() => openForm(menu.pet_id)} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }} >Add Appointment</Button>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              ) : (
                <div style={{ margin: '3%', backgroundColor: 'white', padding: '2%', borderRadius: '10px', width: '100%' }}>
                  <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}><AnnouncementIcon sx={{ marginRight: '1%', color: 'orange' }} />No Added Pets</Typography>
                  <hr />
                  <img
                    src={getImageSrc("nodata.png")}
                    style={{ width: '15%', height: 'auto', marginLeft: '42%' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* open popup for place appointment */}
      {placeform && (
        <div style={{
          backgroundColor: '#F0F0F5',
          width: '60%',
          height: '40%',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '25%',
          marginTop: '5%',
          marginBottom: '2%',
          padding: '2%',
          borderRadius: '10px',
          border: 'solid black'
        }}>

          <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${CoverImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: "100%",
            width: "100%",
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
          }}>
            <div style={{ marginLeft: '95%', marginBottom: '10%' }}>
              <IconButton onClick={closeForm}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
            </div>
            <div style={{ marginBottom: '2%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '25px', textAlign: 'center' }}>Place your Appointment Here</Typography>
            </div>
          </div>

          {details && details.map((menu, index) => (
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2%' }}>
              <Typography>Your selected Pet : </Typography>
              <CardMedia
                sx={{ width: '20%', height: 'auto', borderRadius: '10%' }}
                component={"img"}
                src={getImageSrc("noimage.png")}
                src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                alt={menu.name}
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
            <div style={{ marginBottom: '2%', width: '50%' }}>
              <Typography>Select the Date :</Typography>
              <TextField type="date" sx={{ width: '90%' }} onChange={(e) => setday(e.target.value)}></TextField>
            </div>

            <div style={{ marginBottom: '2%', width: '50%' }}>
              <Typography>Select the Time Slot :</Typography>

              <FormControl sx={{ minWidth: 120 }}>

                <Select
                  onChange={handleTime}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ width: '90%' }}
                >
                  {slot && slot.map((menu, index) => (
                    <MenuItem key={index} value={menu.id}>
                      {menu.start_time + " - " + menu.end_time}
                    </MenuItem>
                  ))}

                </Select>

              </FormControl>
            </div>
          </div>

          {/* error or success messages displaying */}
          {error && (
            <Stack sx={{ width: '100%', marginTop: '1%', marginBottom: '1%' }} spacing={2}>
              <Alert severity="error">{message}</Alert>
            </Stack>
          )}
          {success && (
            <Stack sx={{ width: '100%', marginTop: '1%', marginBottom: '1%' }} spacing={2}>
              <Alert severity="success">{message}</Alert>
            </Stack>
          )}
          <div style={{ marginBottom: '2%', marginLeft: '38%', marginTop: '2%' }}>
            <Button onClick={SubmitForm} sx={{ backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, color: 'white', width: '40%', padding: '2%' }}>Submit</Button>
          </div>

        </div>
      )}

    </div>
  );
}

export default MindRealx;
