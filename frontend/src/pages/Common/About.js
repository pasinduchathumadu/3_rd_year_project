import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import dog1 from "../../assests/home_images/pet1.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "101vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0.02)), url(${dog1})`, // Adding gradient overlay
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative", // Set the background box as a reference for positioning
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "40%", // Adjust these values to move the inner box
            left: "70%",
            transform: "translate(-50%, -50%)", // Center the box both horizontally and vertically
          }}
          width={"40%"}
        >
          <Typography variant="h3" mb={6}>
            About Us
          </Typography>
          <Box
            p={3}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
            }}
          >
            <Typography>
              Our dedicated and experienced staff are passionate about providing
              the best care possible for your beloved pets. With our
              state-of-the-art facilities and a focus on comfort and security,
              you can rest assured that your pet will be in safe hands while
              you're away.
            </Typography>
            <Box mt={3}>
              <Button
                variant="contained"
                component={Link}
                to="/login" // Should link to about-us page
                style={{ backgroundColor: "black", color: "white" }}
              >
                Explore More <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
