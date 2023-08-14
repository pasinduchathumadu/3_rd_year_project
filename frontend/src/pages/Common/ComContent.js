import React, { useEffect, useState } from "react";
import Competition1 from "../../assests/com-1-image.png";
import Competition2 from "../../assests/com-2-image.png";
import Competition3 from "../../assests/com-3-image.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ComContent = () => {
  const workInfoData = [
    {
      image: Competition1,
    },
    {
      image: Competition2,
    },
    {
      image: Competition3,
    },
  ];

  return (
    <>
      <Box mt={6} mb={4}>
        <Typography variant="h5" mb={6}>
          Our Competition Notices
        </Typography>
        <Stack spacing={8} direction="row" justifyContent={"center"} mb={5}>
          {workInfoData.map((data, index) => (
            <Card
              key={index}
              sx={{
                width: 200, // Set a fixed width for consistent cards
                maxWidth: "100%", // Prevent cards from becoming too wide
                border: "5px solid orange", // Add orange border
                borderRadius: 5, // Add border radius for a rounded look
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
                      height: "300",
                      width: "100%",
                    }}
                  />
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Stack>
        <Box>
          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Explore More <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ComContent;
