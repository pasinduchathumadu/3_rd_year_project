import React, { useState, useEffect } from 'react';
import "../../styles/Client/Bording.css";
import cage from "../../assests/2.png";
import "../../styles/Client/Shop.css"
import AOS from 'aos';
import Button from '@mui/material/Button';
import platinum from "../../assests/platinum.png"
import gold from "../../assests/gold.png"
import silver from "../../assests/silver.png";
import { Link } from 'react-router-dom';
import { FormControl, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Bording = () => {
  const email = localStorage.getItem('store_email')
  const [startdate, setstartdate] = useState("")
  const [enddate, setenddate] = useState("")
  const [selectpackage, setselectpackage] = useState("")
  const [selectpet, setselectpet] = useState("")
  const currentDate = new Date();

  const handleStartDate = (event) => {
    setstartdate(event.target.value)
  }

  const handleEndDate = (event) => {
    setenddate(event.target.value)
  }
  const [error, seterror] = useState(false)
  const [success, setsuccess] = useState(false)
  const [message, setmessage] = useState('')
  // submit the form
  const SubmitForm = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/AssignCage`, {
        email,
        startdate,
        enddate,
        selectpet,
        selectpackage
      })
      if (res.data.message === 'There is an internal error') {
        setmessage('Cannot place the boarding request')
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


  // get packages id
  const [package1, setpackage] = useState([])
  const getPackageid = async () => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/user/getPackageid')
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPackageid()
      .then((data) => setpackage(data.data))
      .catch((err) => console.log(err));
  })

  // animation
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // get pet details
  const [pet, setpet] = useState([])
  const getallpets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/getallpets/${email}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getallpets()
      .then((data) => setpet(data.data))
      .catch((err) => console.log(err));
  })

  return (
    <>

      <div className='smooth-scroll' style={{ textAlign: "center", width: "100%", height: "75vh", marginTop: "auto", marginBottom: "auto", fontWeight: "1" }}><h2 style={{ fontSize: "80px", marginTop: "90px" }}>Book your <span style={{ color: "orange" }}>pets</span> Cage Now</h2>
        <h1 style={{ marginTop: "20px", fontFamily: "sans-serif" }}>We protect and care your pet</h1>
        <h1 style={{ fontSize: "20px", fontWeight: "1" }}>24 x 7 Service</h1>

        <img className="smooth-scroll" src={cage} alt="Cage" style={{ fontSize: "20px", width: "80px", height: "80px" }} />
        <div>
          <Link to="/activityTracking"><Button sx={{ backgroundColor: 'orange', width: '500px', color: 'white', ':hover': { backgroundColor: 'orange' }, fontWeight: 'bold', fontSize: '18px' }}>View Your Past Pets Records</Button></Link>
          <h1 style={{ marginTop: "20px", fontFamily: "sans-serif" }}>Boarding Packages</h1>
        </div>
      </div>

      <div style={{ width: "100%", height: "80vh", backgroundColor: "", display: "flex", padding: "100px" }} >

        <div style={{
          width: "33%", height: "70vh", backgroundImage: "linear-gradient(to left, #5d5d5d, #797979, #959595, #b3b3b3, #d2d2d2, #d2d2d2, #d1d1d1, #d1d1d1, #b1b1b1, #939292, #757475, #595858)",
          marginRight: "auto", marginLeft: "auto", borderRadius: "8px"
        }} data-aos="flip-left">
          <img className="smooth-scroll" src={silver} alt="Cage" style={{ fontSize: "20px", width: "150px", height: "150px", marginLeft: "34%", marginTop: "-50px" }} />
          <h1 style={{ color: "black", textAlign: "center", fontWeight: "1" }}>Rs.1000</h1>
          <p style={{ color: "black", textAlign: "center", fontWeight: "2" }}>/ per day</p>
          <ol style={{ listStyleType: 'none', padding: 0, textAlign: "center", marginTop: "20px", color: "black", fontSize: "20px" }}>
            <li className="tick-icon">Foods with <b>normal brands</b></li>
            <li className="tick-icon">Washing only</li>
            <li className="tick-icon"><b>No</b> air condition apply </li>
          </ol>
        </div>

        <div
          style={{
            width: "33%", height: "85vh", marginTop: "-80px",
            backgroundImage: "linear-gradient(to left, #000000, #1b1b1b, #2e2e2e, #444444, #5a5a5a, #5a5a5a, #5a5a5a, #5a5a5a, #444444, #2e2e2e, #1b1b1b, #000000)"
            , marginRight: "auto", marginLeft: "auto",
            borderRadius: "8px",
            transition: "transform 0.5s ",
            "&:hover": {
              transform: "scale(1.1)", // Apply scale transform on hover
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            },

          }} data-aos="fade-up">
          <img className="smooth-scroll" src={platinum} alt="Cage" style={{ fontSize: "20px", width: "150px", height: "150px", marginLeft: "34%", marginTop: "-50px" }} />
          <h1 style={{ color: "white", textAlign: "center", fontWeight: "1" }}>Rs.1500</h1>
          <p style={{ color: "black", textAlign: "center", fontWeight: "2", color: 'white' }}>/ per day</p>
          <ol style={{ listStyleType: 'none', padding: 0, textAlign: "center", marginTop: "20px", color: "white", fontSize: "20px" }}>
            <li className="tick-icon">Foods with <b>high brands</b></li>
            <li className="tick-icon"><b>Free</b> washing with <b>high brands</b> ingrediants</li>
            <li className="tick-icon"><b>Air conditional</b> apply</li>
            <li className="tick-icon"><b>Free</b> spa</li>
            <li className="tick-icon"><b>Comforting</b> medicine </li>
          </ol>
        </div>

        <div style={{
          width: "33%", height: "70vh", backgroundImage: "linear-gradient(to left, #cb8700, #d5941f, #dea133, #e8ae45, #f1bb56, #f1bb56, #f1bb56, #f1bb56, #e8ae45, #dea133, #d5941f, #cb8700)",
          marginRight: "auto", marginLeft: "auto", borderRadius: "8px"
        }} data-aos="flip-right">
          <img className="smooth-scroll" src={gold} alt="Cage" style={{ fontSize: "20px", width: "150px", height: "150px", marginLeft: "34%", marginTop: "-50px" }} />
          <h1 style={{ color: "black", textAlign: "center", fontWeight: "1" }}>Rs.1200</h1>
          <p style={{ color: "black", textAlign: "center", fontWeight: "2" }}>/ per day</p>
          <ol style={{ listStyleType: 'none', padding: 0, textAlign: "center", marginTop: "20px", color: "black", fontSize: "20px" }}>
            <li className="tick-icon">Foods  with <b>normal brands</b></li>
            <li className="tick-icon"><b>Free </b> washing with <b>normal brand</b> ingrediants</li>
            <li className="tick-icon"><b>Air conditional</b> apply</li>
            <li className="tick-icon"><b>Free</b> spa</li>
          </ol>
        </div>
      </div>

      <div style={{
        marginRight: '2%',
        marginLeft: '2%',
        marginTop: '6%',
        marginBottom: '2%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '2%',
        width: '60%',
        marginLeft: '20%',
        justifyContent: 'center',
        border: 'solid black'
      }}>
        <div style={{ marginTop: '2%', marginBottom: '2%' }}>
          <Typography sx={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>Place Your Boarding Request</Typography>
          <hr />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '40%', marginTop: '1%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputLabel>Board Date :</InputLabel>
            <TextField type="date" onChange={handleStartDate} sx={{ width: '200%' }}></TextField>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputLabel>Arrived Date :</InputLabel>
            <TextField type="date" onChange={handleEndDate} sx={{ width: '200%' }}></TextField>
          </div>
        </div>

        <div style={{ marginTop: '1%' }}>
          <InputLabel>Package</InputLabel>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '250%' }}
              onChange={(e) => setselectpackage(e.target.value)}
            >
              {package1 &&
                package1.map((menu, index) => (
                  <MenuItem key={index} value={menu.package_id}>
                    {menu.package_name} {/* Display package name */}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>


        <div style={{ marginTop: '1%' }}>
          <InputLabel>Pet ID</InputLabel>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '250%' }}
              onChange={(e) => setselectpet(e.target.value)}
            >
              {pet &&
                pet.map((menu, index) => (
                  <MenuItem key={index} value={menu.pet_id}>
                    {menu.name} {/* Display pet name */}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        {/* error / success messages displaying */}
        {error && (
          <Stack sx={{ width: '100%', marginTop:'1%', marginBottom:'1%'}} spacing={2}>
            <Alert severity="error">{message}</Alert>
          </Stack>
        )}
        {success && (
          <Stack sx={{ width: '100%',  marginTop:'1%', marginBottom:'1%' }} spacing={2}>
            <Alert severity="success">{message}</Alert>
          </Stack>
        )}


        <div style={{ marginLeft: '40%', marginTop: '2%', marginBottom: '1%' }}>
          <Button type="submit" onClick={SubmitForm} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, width: '40%', padding: '2%' }}>Submit</Button>
        </div>
      </div>
    </>
  );
};

export default Bording;