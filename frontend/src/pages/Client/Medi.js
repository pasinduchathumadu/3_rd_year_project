/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import cage from "../../assests/2.png";
import pet_doctor from "../../assests/doctor.png";
import "../../styles/Client/Shop.css"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import petcare1 from "../../assests/vaccine.png";
import petcare2 from "../../assests/tooth-cleaning.png";
import petcare3 from "../../assests/pet-care.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import doctor2 from "../../assests/doctor2.png"

import { Link } from 'react-router-dom';
import { Button, Checkbox,IconButton, Stack, TextField, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close"
import "../../styles/Client/Medi.css"

import StarIcon from '@mui/icons-material/Star';


function Medi() {


  const [vetdata , setdata] = useState([])
  const [first ,setfirst] = useState(true)
  const [second ,setsecond ] = useState(false)
  const [book_doctor , setbookdoctor] = useState([])
  const [user,setuser] = useState([])
  const [appointment,setappoinment] = useState(false)
  const [date_medi , setdate] = useState("")
 
  const [scrollAnimation, setScrollAnimation] = useState(false);
 const email = localStorage.getItem('client_email')
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  const openappointment = async(id)=>{
    try{
     
      const res = await axios.get(`http://localhost:5000/pet_care/user/book_doctor/${id}`)
      setappoinment(true)
      setbookdoctor(res.data.data)
      get_medi_user()

    }catch(err){
      console.log(err)
    }
  

  }

  const close_form = ()=>{
    setappoinment(false)
  }
  const get_medi_user = async()=>{
    try{
      const res = await axios.get(`http://localhost:5000/pet_care/user/get_medi_user/${email}`)
      setuser(res.data.data)

    }catch(err){
      console.log(err)
    }
  }

 

 
  const submit = async()=>{
    try{
      const res = await axios.get('http://localhost:5000/pet_care/user/get_doctors')
      if(res.message ==='There is an internel error'){
        
      }
      else{
        setdata(res.data.data)
        setfirst(false)
        setsecond(true)

      }
     

    }catch(err){
      console.log("There is an internel error")
    }
  }
  const submit1 = async(id)=>{
    const res = await axios.post('http://localhost:5000/pet_care/user/check_appointment',{
      date_medi,
      email,
      id
    })
  }

  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };


  return (
    <>
    {first &&(
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

    <div style={{ width: "100%", height: "60vh", backgroundColor: "#121334", marginTop: "auto", color: "white" }}  >
      <h2 style={{ fontSize: "50px", marginLeft: "50px" }}>View your Pets Previous Medical Reports</h2>
      <h2 style={{ fontSize: "20px", marginLeft: "50px" }}>< StarIcon sx={{ color: 'red' }} />We always protect your pet details</h2>

      <Link to="/viewMedicalReports" style={{ textDecoration: 'none' }}>
      {/* <Button variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'orange', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"45px",marginTop:"20px", fontSize: '16px', fontWeight:'bold', '&:hover': { backgroundColor: 'orange' } }} >View Previous Medical Reports</Button></Link> */}
      <Button variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'orange', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"45px",marginTop:"20px", fontSize: '16px', fontWeight:'bold', '&:hover': { backgroundColor: 'orange' } }} >Click Here </Button></Link>
      
    </div>


    <div style={{ width: "100%", height: "60vh", backgroundColor: "white", marginTop: "auto" }}>

      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Our Services</h1>
      <h1 style={{ textAlign: "center", fontSize: "80px", marginTop: "-20px", fontWeight: "1000", color: "rgb(163 169 168)" }}>Services we provide</h1>


    </div>

    <div style={{ display: "flex", marginTop: "-200px", textAlign: "ceneter" }} >

      <div style={{ width: "30%", height: "40vh", backgroundColor: "white", marginLeft: "auto", marginRight: "auto" }} data-aos="zoom-in">
        <img className="smooth-scroll" src={petcare1} alt="Cage" style={{ fontSize: "20px", width: "80px", height: "80px", marginLeft: "190px" }} />
        <h1 style={{ textAlign: "center" }}>Pet Vaccine </h1>

        <h3 style={{ textAlign: "center", fontWeight: "1" }}>Protect your furry friend's health with our expert pet vaccines!</h3>


      </div>
      <div style={{ width: "30%", height: "40vh", backgroundColor: "white", marginLeft: "auto", marginRight: "auto" }} data-aos="zoom-in">
        <img className="smooth-scroll" src={petcare2} alt="Cage" style={{ fontSize: "20px", width: "80px", height: "80px", marginLeft: "auto", marginRight: "auto", marginLeft: "190px" }} />
        <h1 style={{ textAlign: "center" }}>Pet Dentel </h1>
        <h3 style={{ textAlign: "center", fontWeight: "1" }}>Keep your furry friend's smile shinning with our expert pet dental care services!</h3>


      </div>
      <div style={{ width: "30%", height: "40vh", backgroundColor: "white", marginLeft: "auto", marginRight: "auto" }} data-aos="zoom-in">
        <img className="smooth-scroll" src={petcare3} alt="Cage" style={{ fontSize: "20px", width: "80px", height: "80px", marginLeft: "auto", marginRight: "auto", marginLeft: "190px" }} />
        <h1 style={{ textAlign: "center" }}>Pet Sergury </h1>
        <h3 style={{ textAlign: "center", fontWeight: "1" }}> Expert surgical care for your furry members, ensuring their healthy life!</h3>


      </div>


    </div>

    <div style={{ width: "100%", height: "73vh", backgroundColor: "#121334", marginTop: "auto", display: "flex" }} data-aos="fade-right">
      <img className="smooth-scroll" src={doctor2} alt="Cage" style={{ fontSize: "700px", width: "400px", height: "600px", marginTop: "-80px" }} />



    <h1  style={{color:"white",textAlign:"center",marginTop:"90px",marginLeft:"300px"}}> Make your appoinment here</h1>
    <div style={{textAlign:'center'}}>

    
      <Button  onClick={submit} variant="contained" sx={{ width:"500px",height:"50px",backgroundColor: 'orange', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px',marginLeft:"-450px",marginTop:"260px", fontSize: '12px', '&:hover': { backgroundColor: 'orange' } }} >Enter details</Button>

      </div>
    </div>



  </div>

    )}

    {second &&(
       <><div className='smooth-scroll' style={{ filter: appointment ? 'blur(5px)' : 'none',marginTop:'4%' }}>
          <div style={{ width: "100%", height: "73vh", backgroundColor: "rgb(18, 19, 52)", marginTop: "auto" }} data-aos="fade-right">

            <h1 style={{ color: "blue", fontSize: "80px", marginLeft: "15px" }}>Meet Your Doctor Now</h1>
            <h1 style={{ color: "white", fontSize: "20px", fontWeight: "1", marginLeft: "20px" }}>Expert vet doctors dedicated to your pet's well-being </h1>
            <h1 style={{ color: "white", fontSize: "20px", fontWeight: "1", marginLeft: "20px" }}> Trust us with their care</h1>

            <h1 style={{ color: "#a5a5ac", fontSize: "40px", fontWeight: "1000", marginLeft: "50px", marginTop: "30px" }}>24x7 service </h1>

          </div>
          <div className='shop'>
            <div className='shopTitle'>

              <h2>Happy Tails Veterinarians</h2>

            </div>
            <Typography sx={{ textAlign: 'center', marginTop: '2%', fontSize: '30px' }}>Week Days For Chanelling</Typography>
            <div className='products'>
              {vetdata && vetdata.filter((menu) => menu.working === 'week').map((product, index) => (
                <div className='product' key={index}>
                  <img src={getImageSrc(product.img)} style={{ width: "40vh", height: "40vh" }} />
                  <div className='description'>
                    <Typography sx={{ fontSize: '24px', color: 'black' }}>{product.first_name + " " + product.last_name}</Typography>
                    <Typography sx={{ fontSize: '20px', color: 'red' }}>Start at:{product.start_time}</Typography>
                    <Typography sx={{ fontSize: '15px', color: 'black' }}>{product.contact_number}</Typography>

                    <StarIcon sx={{ color: "orange", marginBottom: "-5px" }} />

                    <Button onClick={()=>openappointment(product.vet_id)} sx={{ backgroundColor: 'black', color: 'white', marginTop: '2%',':hover':{backgroundColor:'black'} }}>Add Appoinment</Button>

                  </div>


                </div>
              ))}
            </div>
            <Typography sx={{ textAlign: 'center', marginTop: '2%', fontSize: '30px' }}>Week-End Days For Chanelling</Typography>
            <div className='products'>
              {vetdata && vetdata.filter((menu) => menu.working === 'weekend').map((product, index) => (
                <div className='product' key={index}>
                  <img src={getImageSrc(product.img)} style={{ width: "40vh", height: "40vh" }} />
                  <div className='description'>
                    <Typography sx={{ fontSize: '24px', color: 'black' }}>{product.first_name + " " + product.last_name}</Typography>
                    <Typography sx={{ fontSize: '20px', color: 'red' }}>Start at:{product.start_time}</Typography>
                    <Typography sx={{ fontSize: '15px', color: 'black' }}>{product.contact_number}</Typography>

                    <StarIcon sx={{ color: "orange", marginBottom: "-5px", marginLeft: '2px' }} />

                    <Button onClick={()=>openappointment(product.vet_id)}  sx={{ backgroundColor: 'black', color: 'white', marginTop: '2%', ':hover': { backgroundColor: 'black' } }}>Add Appoinment</Button>

                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
        {appointment &&(
       <div
       style={{
         position: 'fixed',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
       }}
     >
       <div
         style={{
           background: 'white',
           paddingTop: '3%',
           paddingLeft:'3%',
           width:'50%',
           borderRadius: '8px',
           boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
         }}
       >
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           <Typography  sx={{marginLeft:'30%',fontSize:'30px'}}>Doctor Appointment</Typography>
           <IconButton onClick={close_form} sx={{marginRight:'18px'}}>
             <CloseIcon color="primary" />
           </IconButton>
         </div>
         <Typography sx={{marginLeft:'2%',fontSize:'20px',marginTop:'2%'}}>Do you want to book this doctor?</Typography>
         {book_doctor.map((menu,index)=>
          <Stack spacing={2} margin={2}>
            <TextField variant="outlined" label="Client Name" defaultValue={user.map((product1,index)=>product1.first_name+" "+product1.last_name)}   InputProps={{
    readOnly: true,
  }}/>
       
          <TextField variant="outlined" label="Vet Name" defaultValue={menu.first_name+" "+menu.last_name}   InputProps={{
    readOnly: true,
  }}/>
          <TextField variant="outlined" label="Channeling Fee" defaultValue={"RS."+menu.fee}  InputProps={{
    readOnly: true,
  }} />
   
  <Typography>Appointment Date: </Typography>
          <TextField onChange={(e)=>setdate(e.target.value)} type="date" variant="outlined"></TextField>
          <div style={{display:'flex',alignItems:'center'}}>
          <Checkbox defaultChecked color="primary" label="d"/>
          <Typography>Agree Terms & Condition</Typography>

          </div>
         
          <Button
          onClick={()=>submit1(menu.vet_id)}
            style={{ backgroundColor: "black" }}
            variant="contained"
          
          >
            PAY
          </Button>
        </Stack>
         )}
        
         
       </div>
     </div>

        )}
        </>

    )}
      

   
    </>
  )
}

export default Medi