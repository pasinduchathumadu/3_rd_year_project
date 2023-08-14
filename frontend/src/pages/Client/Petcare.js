import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import image1 from "../../assests/online-store-image.png";
import image2 from "../../assests/care-center-image.png";
import image3 from "../../assests/pic3.jpg";
import { Link } from "react-router-dom";
import video from "../../assests/Video3.mp4";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DownImage from "../../assests/down.png";
import "../../styles/Client/Mindrelax.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import video2 from "../../assests/video2.mp4"



export default function Petcare() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const videoPlaybackRate = 0.2 + scrollPosition * 0.0001;
  const videoOpacity = 0.9 - scrollPosition * 0.002;

  const scrollToSection = () => {
    const section = document.getElementById("section"); // Replace 'section' with the actual id
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        <video
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: videoOpacity,
          }}
          src={video}
          autoPlay
          loop
          muted
          playbackRate={videoPlaybackRate}
        />
        <div className="content">
          <h1 style={{ fontSize: "80px", color: "white", marginTop: "-30vh" }}>
            Pet Care
          </h1>

          <p>keep your pet happy</p>
          <p style={{ marginTop: "200px" }}> OUR SERVICES</p>
          <img
            src={DownImage}
            alt="Down Arrow"
            style={{
              width: 40,
              height: 40,
              cursor: "pointer",
              marginTop: "20px",
            }}
            onClick={scrollToSection}
          />
        </div>
      </div>
      <div
        id="section"
        className="smooth-scroll"
        style={{
          marginLeft: "180px",
          display: "flex",
          gap: "30px",
          marginTop: "35px",
        }}
        data-aos="zoom-out-down"
      >
        <Card
          sx={{
            maxWidth: 345,
            transition: "transform 0.5s ",
            "&:hover": {
              transform: "scale(1.1)", // Apply scale transform on hover
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
            },
          }}
        >
          <CardActionArea>
            <Link
              to="/Pet_grooming"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardMedia
                style={{ height: "35vh" }}
                component="img"
                height="140"
                image={image2}
                alt=""
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pet grooming
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 345,
            transition: "transform 0.5s ",
            "&:hover": {
              transform: "scale(1.1)", // Apply scale transform on hover
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
            },
          }}
        >
          <CardActionArea>
            <Link
              to="/MindRealx"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardMedia
                style={{ height: "35vh" }}
                component="img"
                height="140"
                image={image1}
                alt="green iguana"
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mind relax
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>
        <Card
          sx={{
            maxWidth: 345,
            transition: "transform 0.5s ",
            "&:hover": {
              transform: "scale(1.1)", // Apply scale transform on hover
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
            },
          }}
        >
          <CardActionArea>
            <Link
              to="/MindRealx"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardMedia
                style={{ height: "35vh" }}
                component="img"
                height="140"
                image={image3}
                alt="green iguana"
              />
            </Link>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pet training
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>


   
    </div></>

  );
}
