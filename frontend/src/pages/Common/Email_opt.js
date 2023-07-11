import React from "react";
import {
  
  Grid,
  Paper,

  Button,
  Typography,
} from "@mui/material";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";

import cover from "../../assests/cover.png"
=======
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import { Link } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";

import cover from "../assests/cover.png"
>>>>>>> e6742b61bad6b2c5050998082ba19ebac585541e

const Email_opt = () => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (

    <Grid sx={{display:"flex",borderRadius:"100px"}}>
      <Grid sx={{backgroundImage:`url(${cover})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",width:"50%",height:"100vh"}}> 


      </Grid>
      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          height: "50vh",
          width: "300px",
          marginTop: "150px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "auto"
          ,borderRadius:"10px"
        }}
      >
        <Grid align="center">
          <h2>Enter the OTP</h2>
        </Grid>
        <div>
          <MuiOtpInput value={otp} onChange={handleChange} sx={{marginTop:"50px"}} />
        </div>

       <Grid sx={{marginTop:"40px" ,fontSize:"12px",textAlign:"center"}}><h4 >Check your email and enter the valid numbers</h4></Grid> 
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ marginTop: "60px", backgroundColor: "orange" }}
        >
          Sign in
        </Button>

        <Typography>
          <Link to="/signup"></Link>
        </Typography>
       
      </Paper>
    </Grid>
  );
};

export default Email_opt;
