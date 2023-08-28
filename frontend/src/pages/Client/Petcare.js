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
import LoadingIndicator from "../../components/LoadingIndicator";
import DownImage from "../../assests/down.png";
import "../../styles/Client/Mindrelax.css";
import AOS from 'aos';
import 'aos/dist/aos.css';





export default function Petcare() {
  const [scrollPosition, setScrollPosition] = useState("");
  const [loading , setLoading ] = useState(true)
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
    setLoading(false)
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    {loading ?(
      <LoadingIndicator/>
    ):(
      <><div
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
              playbackRate={videoPlaybackRate} />
            <div className="content">
              <h1 style={{ fontSize: "80px", color: "white", marginTop: "-30vh" }}>
                Pet Care Center
              </h1>

              <p>Keep your Pet Happy</p>
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
                onClick={scrollToSection} />
            </div>
          </div><div
            id="section"
            className="smooth-scroll"
            style={{
              marginLeft: "200px",
              display: "flex",
              gap: "30px",
              marginTop: "50px",
            }}
            data-aos="zoom-out-down"
          >
              <Card
                sx={{
                  maxWidth: 345,
                  transition: "transform 0.5s ",
                  "&:hover": {
                    transform: "scale(1.1)",
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
                      alt="" />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Pet Grooming
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enhance your pet's well-being and appearance with our expert grooming. Tailored treatments include bathing, fur trimming, nail care, and more, ensuring your furry companion looks and feels their best. Experience the joy of a pampered pet with our specialized grooming sessions.

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
                    transform: "scale(1.1)",
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
                      alt="green iguana" />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Mind Relaxing
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Treat your pet to a rejuvenating spa-like grooming experience, providing a calming oasis of care and relaxation. Our skilled groomers pamper your furry friend, leaving them refreshed, adorable, and blissfully content.
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
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Add box shadow on hover
                  },
                }}
              >
                <CardActionArea>
                  <Link
                    to="/trainning"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      style={{ height: "35vh" }}
                      component="img"
                      height="140"
                      image={image3}
                      alt="green iguana" />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Pet Training
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unleash your pet's potential through our customized training. Tailored sessions build understanding and cooperation, enhancing skills and confidence for harmonious interactions.

                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
              </Card>



            </div><div style={{ height: "5vh" }}>

            </div></>
    )}
    </>

  );
}
