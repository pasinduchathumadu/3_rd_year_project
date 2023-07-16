import React from "react";
import {
  
  Grid,
  Paper,

  Button,

} from "@mui/material";
import Header from '../../components/Layout/Header'
import axios from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import cover from "../../assests/cover.png"

const Email = () => {
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate()
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const submit = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/pet_care/email/verify",{
        otp
      
    })
    if(res.data.message === "Registered Succeed"){
      navigate('/login')
    }
    else{
      

    }


    }
    catch(err){
      console.log("There is an internal error")

    }

  }



  return (
    <><Header />
    <Grid sx={{ display: "flex", borderRadius: "100px" }}>
      <Grid sx={{ backgroundImage: `url(${cover})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "50%", height: "90vh" }}>


      </Grid>
      <Paper onSubmit={submit}
        elevation={4}
        sx={{
          padding: "20px",
          height: "50vh",
          width: "300px",
          marginTop: "150px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "auto",
          borderRadius: "10px"
        }}
      >
        <Grid align="center">
          <h2>Enter the OTP</h2>
        </Grid>
        <div>
          <MuiOtpInput value={otp} onChange={handleChange} sx={{ marginTop: "50px" }}/>
        </div>

        <Grid sx={{ marginTop: "40px", fontSize: "12px", textAlign: "center" }}><h4>Check your email and enter the valid numbers</h4></Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ marginTop: "60px", backgroundColor: "orange",'&:hover':{backgroundColor:'orange'} }}
        >
          Verify
        </Button>


      </Paper>
    </Grid></>
  );
};

export default Email;
