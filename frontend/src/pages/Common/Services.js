import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Grow,
} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import MediHelp from "../../assests/medi-help-image.png";
import Boarding from "../../assests/boarding-pets-image.png";
import OnlineStore from "../../assests/online-store-image.png";
import CareCenter from "../../assests/care-center-image.png";
import PetAccessories from "../../assests/pet-accessories-image.png";
import PetFood from "../../assests/pet-foods.png";
import PetToys from "../../assests/pet-toys.png";
import { Link } from "react-router-dom";

const Services = () => {
  const [showServicesContent, setShowServicesContent] = useState(false);
  const [showStoreContent, setShowStoreContent] = useState(false);

  const handleScroll = () => {
    const servicesBox = document.getElementById("services-box");
    const storeBox = document.getElementById("store-box");

    if (servicesBox) {
      const servicesRect = servicesBox.getBoundingClientRect();
      setShowServicesContent(
        servicesRect.top < window.innerHeight && servicesRect.bottom >= 0
      );
    }

    if (storeBox) {
      const storeRect = storeBox.getBoundingClientRect();
      setShowStoreContent(
        storeRect.top < window.innerHeight && storeRect.bottom >= 0
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const servicesInfoData = [
    {
      image: MediHelp,
      title: "Medi Help Center Services",
      // des: "medihelp_center",
    },
    {
      image: Boarding,
      title: "Boarding House Services",
    },
    {
      image: OnlineStore,
      title: "Pet Online Store Services",
    },
    {
      image: CareCenter,
      title: "Care Center Services",
    },
  ];

  const StoreInfoData = [
    {
      image: PetAccessories,
      title: "Pet Accessories",
    },
    {
      image: PetFood,
      title: "Pet Food",
    },
    {
      image: PetToys,
      title: "Pet Toys",
    },
  ];

  return (
    <Box mt={10}>
      <Box mb={4} id="services-box">
        <Grow
          in={showServicesContent}
          {...(showServicesContent ? { timeout: 1500 } : {})}
        >
          <Box>
            <Typography variant="h5" mb={4}>
              Our Services
            </Typography>
            <Stack spacing={4} direction="row" justifyContent={"center"} mb={4}>
              {servicesInfoData.map((data, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 200, // Set a fixed width for consistent cards
                    maxWidth: "100%", // Prevent cards from becoming too wide
                  }}
                >
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    {/* //<Link to={`/store/${data.title}`} style={{ textDecoration: "none" }}> */}
                    <CardActionArea onClick="#">
                      <CardMedia
                        component="img"
                        src={data.image}
                        alt="images"
                        sx={{
                          height: 200,
                          width: "100%",
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6">{data.title}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              ))}
            </Stack>
            <Button
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Explore More <ArrowForwardIcon />
            </Button>
          </Box>
        </Grow>
      </Box>

      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.05)", // Background color with low opacity
          padding: 4,
        }}
      >
        <Box id="store-box">
          <Grow
            in={showStoreContent}
            {...(showStoreContent ? { timeout: 1500 } : {})}
          >
            <Box mb={4}>
              <Typography variant="h5">Online Store Services</Typography>
              <Stack
                spacing={4}
                direction="row"
                mt={4}
                justifyContent={"center"}
              >
                {StoreInfoData.map((data, index) => (
                  <Card
                    key={index}
                    sx={{
                      width: 200, // Set a fixed width for consistent cards
                      maxWidth: "100%", // Prevent cards from becoming too wide
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={data.image}
                      alt="images"
                      sx={{
                        height: 200,
                        width: "100%",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6">{data.title}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
