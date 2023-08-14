import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <Typography variant="h4" mt={3} mb={3}>
        Have You Questions? Let Us Help You
      </Typography>

      <Box
        mb={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">Shoot Us&nbsp;</Typography>
        <Typography
          variant="body1"
          sx={{ color: "orange", fontWeight: "bold" }}
        >
          happytails@gmail.com
        </Typography>
      </Box>

      <Box
        mb={4}
        sx={{
          width: "100%",
          maxWidth: "600px",
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.05)", // Background color with low opacity
          borderRadius: "10px",
        }}
      >
        <Box mb={2}>
          <Typography variant="h6" mb={2}>
            Your Email Address :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="youremail@gmail.com"
            sx={{ borderRadius: "10px", backgroundColor: "#F0F0F5" }}
          />
        </Box>
        <Box mb={3}>
          <Typography variant="h6" mb={2}>
            Your Problem :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your problem"
            sx={{
              borderRadius: "10px",
              backgroundColor: "#F0F0F5",
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            width: "150px",
            "&:hover": {
              backgroundColor: "darkgray", // Change the hover color here
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
