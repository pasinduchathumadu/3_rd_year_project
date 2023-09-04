import React, { useState, useEffect } from 'react';
import "../../styles/Client/Bording.css";

import cage from "../../assests/2.png";
import "../../styles/Client/Shop.css"
import AOS from 'aos';

import 'aos/dist/aos.css';
import doctor2 from "../../assests/doctor2.png"
import pay from "../../assests/pay1.jpg"
import { Link,useNavigate } from 'react-router-dom';
import { Alert, Button, Checkbox, IconButton, Stack, TextField, Typography } from "@mui/material";
import StripeCheckout from "react-stripe-checkout"
import CloseIcon from "@mui/icons-material/Close"
import "../../styles/Client/Medi.css"
import LoadingIndicator from '../../components/LoadingIndicator';

import StarIcon from '@mui/icons-material/Star';




function Medi() {

  const [vetdata, setdata] = useState([])
  const [first, setfirst] = useState(true)
  const [second, setsecond] = useState(false)
  const [book_doctor, setbookdoctor] = useState([])
  const [user, setuser] = useState([])
  const [appointment, setappoinment] = useState(false)
  const [date_medi, setdate] = useState("")
  const [error, seterror] = useState(false)
  const [message, setmessage] = useState(false)
  const [payment,setpayment] = useState(false)
  const [scrollAnimation, setScrollAnimation] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [payment_charge, setprice] = useState("");
  const email = localStorage.getItem('client_email')

  const currentDate = new Date();
  const twoWeeksFromToday = new Date();
  twoWeeksFromToday.setDate(currentDate.getDate() + 14);
 
  useEffect(() => {
    const handleScroll = () => {
      const offset = 500; // Adjust this value as needed
      if (window.scrollY > offset) {
        setScrollAnimation(true);
      } else {
        setScrollAnimation(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(() => {
      setLoading(false);
  }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
    AOS.init({ duration: 500 });
  }, []);

  const [product] = useState({
    name: "React from FB",
    price: payment_charge,
    productBy: "facebook",
  });
  const openappointment = async (id) => {
   
    try {

      const res = await axios.get(`http://localhost:5000/pet_care/user/book_doctor/${id}`)
      setappoinment(true)
      setbookdoctor(res.data.data)
      seterror(false)
    

    } catch (err) {
      console.log(err)
    }


  }




const Bording = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const seats = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, false, false, true, true, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, true, true, true, true, false],
  ];

  const movies = [
    { name: 'Dogs', price: 1000 },
    { name: 'Cats', price: 800 },
    { name: 'Birds', price: 500 },
    { name: 'The Lion King', price: 9 },
  ];

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`;
    if (!seats[rowIndex][seatIndex]) {
      const updatedSeats = [...selectedSeats, seatKey];
      setSelectedSeats(updatedSeats);
    } else {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatKey);
      setSelectedSeats(updatedSeats);
    }

  }
  const submit1 = async (id) => {
    if (date_medi === "") {
      seterror(true);
      setmessage("Please provide a valid date.");
      return;
    }
  
    const selectedDate = new Date(date_medi);
    if (selectedDate > twoWeeksFromToday) {
      seterror(true);
      setmessage("Please pick a valid date within the next two weeks.");
      return;
    }
    const currentDateMinusOneDay = new Date(currentDate);
    currentDateMinusOneDay.setDate(currentDate.getDate() - 1);

  

    if (selectedDate <= currentDateMinusOneDay) {
        seterror(true);
        setmessage("Can't Pick Previous Days!!");
        return;
    }
  
    const res = await axios.post('http://localhost:5000/pet_care/user/check_appointment', {
      date_medi,
      email,
      id
      
    })
    if (res.data.message === "Appoinments are over") {
      seterror(true)
      setmessage("No more Appointments are placed!!")


  const handleMovieChange = (event) => {
    setSelectedMovieIndex(event.target.value);
  };


    }
    else{
      setprice(book_doctor.map((menu,index)=>menu.fee))
      setpayment(true)
      setsecond(false)
    }
  }
  const cancel = ()=>{
    setpayment(false)
    setfirst(true)
    setappoinment(false)
  }
  const confirm = async(id)=>{
    const cancel_date = new Date(date_medi);
    cancel_date.setDate(cancel_date.getDate() + 2);
    const new_cancel_date = cancel_date.toISOString().substr(0, 10);
    try{
      const res = await axios.post('http://localhost:5000/pet_care/user/medi_payment',{
        id,
        date_medi,
        email,
        new_cancel_date
      })
      if(res.data.message==="There is an internel error"){
        console.log("There is an internel error")

      }
      if(res.data.message === "success"){
        console.log("success")
      }
    }catch(err){
      console.log("There is an internel error")
    }
  }
  

  const makePayment = async (token) => {
    const body = {
      token,
      product
    
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/pet_care/payment/card",
        {
          body,
          headers,
        }
      );
      if (res.data.message === "success") {

        console.log("success")
        navigate('/dashboard')
      }
      else {
       console.log("failed")
      }
    } catch (err) {
      navigate('/dashboard')
      console.log("failed")



  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);


  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };
  useEffect(()=>{
    get_medi_user()
    .then((data)=>{setuser(data.data);setLoading(false)})
    .catch((err)=>console.log(err))
  })

  return (
    <div>
      {loading ?(
        <LoadingIndicator/>
      ):(

    
    <div>
      {first && (
        <div style={{ marginTop: '4%' }}>
          <div className='smooth-scroll' style={{ width: "100%", height: "60vh", marginTop: "auto", marginBottom: "auto", fontWeight: "1", display: "flex" }} data-aos="zoom-out">
            <div>
              <h2 style={{ fontSize: "80px", marginTop: "30px", marginLeft: "50px" }}>Meet your <span style={{ color: "orange" }}>Doctor</span> </h2>
              {/* <h1 style={{marginTop:"20px",fontFamily:"sans-serif",marginLeft:"50px"}}>we protect and care yout pet</h1> */}
              <h1 style={{ fontSize: "20px", fontWeight: "1", marginLeft: "250px" }}>24 x 7 service</h1>
              <motion.div
                animate={{ x: 100 }}
                transition={{ ease: "easeOut", duration: .8 }}
              >
                <img className="smooth-scroll" src={cage} alt="Cage" style={{ fontSize: "20px", width: "80px", height: "80px", marginLeft: "170px" }} />
              </motion.div>
            </div>

            <div data-aos="fade-up">
              <img className="smooth-scroll" src={pet_doctor} alt="Cage" style={{ fontSize: "20px", width: "700px", height: "700px", marginTop: "188px", marginLeft: "150px" }} />

            </div>

          </div>


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

      <div className='main' style={{ marginTop: "20px" }}>
        <div className="movie-con">
          <label>Pick a Cage:</label>
          <select id="movie" onChange={handleMovieChange} value={selectedMovieIndex}>
            {movies.map((movie, index) => (
              <option key={index} value={index}>
                {movie.name} (Rs.{movie.price}-UP)
              </option>
            ))}
          </select>
        </div>

        <ul className="showcase">
          <li>
            <div className="seat"> </div>
            <small>N/A</small>
          </li>

          <li>
            <div className="seat selected"> </div>
            <small>Selected</small>
          </li>

          <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>

        <div className="con">
          <div className="screen"></div>
          {seats.map((row, rowIndex) => (
            <div className="ro" key={rowIndex}>
              {row.map((seat, seatIndex) => {
                const seatKey = `${rowIndex}-${seatIndex}`;
                return (
                  <div

                    key={seatKey}
                    className={`seat ${seat
                      ? "occupied"
                      : selectedSeats.includes(seatKey)
                        ? "selected"
                        : ""}`}
                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                  >
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <p className="text">
          You have selected <span id="count">{count}</span> seats for a price of ${' '}
          <span id="total">{total}</span>
        </p>
        <p style={{ color: "black", marginTop: "30px" }}>Select your time slot</p>
        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ color: "white" }}>
          <DemoContainer components={['DateTimePicker']} sx={{ width: "500px", marginLeft: "45px", marginTop: "10px" }}>
            <DateTimePicker label="Book your time" sx={{ color: "black", backgroundColor: "white", borderRadius: "10px" }} />
          </DemoContainer>
        </LocalizationProvider>

        <Button sx={{ backgroundColor: "black", width: "500px", marginLeft: "45px", marginTop: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Submit</Button>



    </div>
      )}
    </div>
  )
}


export default Bording;