import React, { useState, useEffect } from 'react';
import "../../styles/Client/Bording.css";
import "../../styles/Client/Shop.css"
import pay from "../../assests/pay1.jpg"
import AOS from 'aos';
import Button from '@mui/material/Button';
import platinum from "../../assests/platinum.png"
import gold from "../../assests/gold.png"
import silver from "../../assests/silver.png";
import Cover from "../../assests/boardingimage.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns'
import StripeCheckout from 'react-stripe-checkout';

const Bording = () => {
  const email = localStorage.getItem('store_email')
  const [startdate, setstartdate] = useState("")
  const [enddate, setenddate] = useState("")
  const [selectpackage, setselectpackage] = useState("")
  const [selectpet, setselectpet] = useState("")
  const [cage, setcage] = useState([])
  const [success, setsuccess] = useState("")
  const [payment, setpayment] = useState([])
  const [allcages, setallcages] = useState([])
  const [paymentdo, setpaymentdo] = useState(false)
  const [value1, setvalue1] = useState(true)

  const navigate = useNavigate()
  const move = () => {
    setvalue1(false)
    setpaymentdo(true)
  }
  const cancel = () => {
    setvalue1(true)
    setpaymentdo(false)
  }

  const handleStartDate = (event) => {
    setstartdate(event.target.value)
  }

  const handleEndDate = (event) => {
    setenddate(event.target.value)
  }
  const [error, seterror] = useState(false)

  const [message, setmessage] = useState('')
  // submit the form

  const millisecperday = 24 * 60 * 60 * 1000
  const sDate = new Date(startdate)
  const eDate = new Date(enddate)
  const diff = (eDate - sDate) / millisecperday;

  const [newprice, setnew] = useState(false)

  const [product] = useState({
    name: "React from FB",
    price: payment.map((menu, index) => menu.price * diff),
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
  const insert = async () => {
    try {
      const res = await axios.post('http://localhost:5000/pet_care/user/insert', {
        email,
        startdate,
        enddate,
        selectpackage,
        selectpet,
        originalprice: payment.map((menu, index) => menu.price * diff),

        originalcage: cage.map((menu, index) => menu.cage_id)

      })

    } catch (err) {
      console.log(err)

    }
  }
  const SubmitForm = async () => {
    const currentDate = new Date();
    const date = format(currentDate, 'yyy-MM-dd')
    const twoWeeksFromToday = new Date();
    twoWeeksFromToday.setDate(currentDate.getDate() + 14);
    const date_twoweek = format(twoWeeksFromToday, 'yyy-MM-dd')

    seterror(false)

    if (date > startdate) {
      setmessage('Cannot do it')
      seterror(true)
      return
    }

    if (date_twoweek < startdate) {
      setmessage('Cannot place the boarding request')
      seterror(true)
      return
    }
    if (startdate === "" || enddate === "" || selectpackage === "" || setselectpet === "") {
      setmessage('Cannot place the boarding request')
      seterror(true)
      return

    }
    if (enddate < startdate) {
      setmessage('Cannot place the boarding request11')
      seterror(true)
      return
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/AssignCage`, {
        selectpackage
      })


      if (res.data.message === 'There is an internal error') {
        setmessage('Cannot place the boarding request')
        seterror(true)
      }


      else if (res.data.message !== "There is an internal error") {
        setcage(res.data.data)
        const res1 = await axios.post('http://localhost:5000/pet_care/user/getprice', {
          startdate,
          enddate,
          selectpackage
        })
        if (res1.data.message === "There is an internel error") {
          setmessage('Cannot place the boarding request')
          seterror(true)
        }
        else {

          setpayment(res1.data.data)
          const res2 = await axios.post('http://localhost:5000/pet_care/user/getallcages', {
            selectpackage
          })
          setallcages(res2.data.data)
          setnew(true)

        }

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
      {value1 && (
        <>
          <div className="smooth-scroll" 
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(${Cover})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              minHeight: '90vh',
              display: 'flex',
              flexDirection: "column",
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              marginTop:'4%',
              marginBottom:'2%'
            }}>
            <div className='smooth-scroll' style={{ textAlign: "center", width: "100%", height: "75vh", marginTop: "auto", marginBottom: "auto", fontWeight: "1" }}><h2 style={{ fontSize: "80px", marginTop: "90px" }}><span style={{color:'orange'}}>Book</span> your <span style={{ color: "orange" }}>pets</span> Cage <span style={{color:'orange'}}> Now</span></h2>
              <h1 style={{ marginTop: "20px", fontFamily: "sans-serif" }}>We protect and care your pet</h1>
              <h1 style={{ fontSize: "22px", fontWeight: "1" }}>24 x 7 Service</h1>
            </div>
          </div>

          <div style={{ width: "100%", height: "80vh", backgroundColor: "", display: "flex", padding: "100px" }}>
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
                backgroundImage: "linear-gradient(to left, #000000, #1b1b1b, #2e2e2e, #444444, #5a5a5a, #5a5a5a, #5a5a5a, #5a5a5a, #444444, #2e2e2e, #1b1b1b, #000000)",
                marginRight: "auto", marginLeft: "auto",
                borderRadius: "8px",
                transition: "transform 0.5s ",
                "&:hover": {
                  transform: "scale(1.1)",
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
              <Stack sx={{ width: '100%', marginTop: '1%', marginBottom: '1%' }} spacing={2}>
                <Alert severity="error">{message}</Alert>
              </Stack>
            )}
            {success && (
              <Stack sx={{ width: '100%', marginTop: '1%', marginBottom: '1%' }} spacing={2}>
                <Alert severity="success">{message}</Alert>
              </Stack>
            )}


            <div style={{ marginLeft: '40%', marginTop: '2%', marginBottom: '1%' }}>
              <Button type="submit" onClick={SubmitForm} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, width: '40%', padding: '2%' }}>Submit</Button>
            </div>
          </div>

          {newprice && (
            <Stack>
              <Typography sx={{ marginLeft: '45%', fontWeight: 'bold' }}>{payment.map((menu, index) => menu.package_name + "Package Catagories")}</Typography>
              <div style={{ padding: '10px', marginLeft: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ backgroundColor: 'brown', height: '30px', width: '30px', marginRight: '10px' }} />
                  <Typography>Reserved</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ backgroundColor: 'blue', height: '30px', width: '30px', marginRight: '10px' }} />
                  <Typography>Selected Cage</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ backgroundColor: 'gray', height: '30px', width: '30px', marginRight: '10px' }} />
                  <Typography>Free</Typography>
                </div>
              </div>


              <Stack sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '375px', marginLeft: '35%' }}>
                {allcages.map((cage1, index) => (
                  <div
                    style={{
                      flexBasis: '20%',
                      flexGrow: 0,
                      flexShrink: 0,
                      marginBottom: '10px',
                      marginLeft: '5%',
                    }}
                    key={index}
                  >
                    <Box
                      sx={{
                        backgroundColor: cage1.status === 'reserved'
                          ? 'brown'
                          : cage.map((menu) => menu.cage_id).includes(cage1.cage_id)
                            ? 'blue'
                            : 'gray',
                        height: '65px',
                        width: '65px',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ color: 'white' }}>{cage1.cage_id}</span>
                    </Box>

                  </div>
                ))}

              </Stack>

              <Button onClick={move} sx={{ backgroundColor: 'orange', color: 'black', width: '30%', marginLeft: '35%', marginBottom: '5%', marginTop: '2%' }}>{payment && payment.map((menu, index) => "payment RS." + menu.price * diff)}</Button>

            </Stack>
          )}

        </>
      )}
      <Stack>
        {paymentdo && (
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
                <Stack justifyContent={"center"} alignItems={"center"} direction={"row"} spacing={2}>

                  <Button

                    onClick={insert}

                    variant="contained"
                    sx={{
                      width: "300px",
                      height: "50px",
                      backgroundColor: "black",
                      marginTop: "10px",
                      paddingLeft: "15px",
                      marginLeft: '1%',
                      fontSize: "16px",
                      "&:hover": { backgroundColor: "black" },
                    }}
                  >
                    Confirm (Rs.{payment.map((menu, index) => menu.price * diff)})
                  </Button>
                  <Button
                    onClick={cancel}
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

        )}

      </Stack></>

  );
};

export default Bording;