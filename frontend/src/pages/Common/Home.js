import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import dog1 from "../../assests/home_images/pet3.jpg";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const [loading , setLoading ] = useState(true)
  const start = () => {
    navigate("/login");
  };

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Set showAnimation to true after a short delay (e.g., 1 second)
    const timeout = setTimeout(() => {
      setLoading(false)
      setShowAnimation(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
    {loading ?(
      <LoadingIndicator/>
    ):(
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0.02)), url(${dog1})`, // Adding gradient overlay
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative", // Set the background box as a reference for positioning
          opacity: showAnimation ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <Box
          width={"40%"}
          p={3}
          sx={{
            position: "absolute",
            top: "50%", // Adjust these values to move the inner box
            left: "30%",
            transform: "translate(-50%, -50%)", // Center the box both horizontally and vertically
            borderRadius: "15px",
            backgroundColor: "rgba(245, 245, 245, 0.3)", // Adjust the alpha value (0.5) for transparency
            opacity: showAnimation ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        >
          <Typography variant="h3" mb={2} textTransform={"uppercase"}>
            <span
              style={{ color: "#fff", fontFamily: "'Freckle Face', cursive" }}
            >
              Happy&nbsp;
            </span>
            <span
              style={{ color: "#000", fontFamily: "'Freckle Face', cursive" }}
            >
              Tails
            </span>
          </Typography>
          <Typography
            variant="h6"
            mb={3}
            sx={{
              color: "black", // Add your desired text color here
            }}
          >
            Welcome to our Animal Care Center, your one-stop destination for all
            your pet's needs. From boarding services to veterinary care,
            grooming, and online consultations, we have everything your furry
            friend requires for a happy and healthy life.
          </Typography>
          <Button
            onClick={start}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Get Start Now <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    )}
    </>
  );
};

export default Home;
