import React, { useState, useEffect } from 'react';
// import PrimarySearchAppBar from "../../components/Layout/Header";
import { Typography, Button, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";


import petImage from '../../assests/black2.jpg'; // Replace 'path/to/your/image.png' with the actual path to your image
// import Button from '@mui/material/Button';
import petImage2 from '../../assests/top.png';
import "../../styles/Client/Mindrelax.css";
import AOS from 'aos';
import axios from 'axios';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import PetsIcon from '@mui/icons-material/Pets';
import { Stack } from '@mui/system';



// Replace 'path/to/your/image.png' with the actual path to your image

function MindRealx() {
  // animation
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [main, setmain] = useState(true) //main part
  const [petpart, setpetpart] = useState(false)  //display pets part

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

  // get pet image from db
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
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
            {/* <Link to="/Shop" style={{ textDecoration: 'none', marginTop: '9%' }}>
              <Button variant="outlined" sx={{ color: "white", color: "white", backgroundColor: "black", padding: '1%', width: '12%', ':hover': { backgroundColor: 'black' } }}>
                GET STARTED
              </Button>
            </Link> */}
            {/* <Link to="/Shop" style={{ textDecoration: 'none', marginTop: '9%' }}> */}
            <Button onClick={getStarted} variant="outlined" sx={{ color: "white", color: "white", backgroundColor: "black", padding: '1%', width: '12%', ':hover': { backgroundColor: 'black' } }}>
              GET STARTED
            </Button>
            {/* </Link> */}
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
        <div style={{ width: '96%', height: '100vh', padding: '2%', marginLeft: '2%', marginRight: '2%', borderRadius: '10px', marginTop: '1%' }}>
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
                          <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }} >Add Appointment</Button>
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




    </div>
  );
}

export default MindRealx;
