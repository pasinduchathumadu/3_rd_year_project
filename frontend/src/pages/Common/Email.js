import React, { useState } from "react";
import {
  
  Grid,
  Paper,

  Button,

} from "@mui/material";
import Header from '../../components/Layout/LandingHeader'
import axios from "axios";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import cover from "../../assests/pic3.jpg"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const Email = () => {
  const [otp, setOtp] = React.useState("");
  const [error,seterror] = useState(false)
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
        seterror(true)
      }
  
  
      }
      catch(err){
        console.log("There is an internal error")
  
      }

    
 
   

  }



  return (
    <>
    <Header />
    <Grid
      container
      sx={{
        display: "flex",
       
        backgroundImage: `url(${cover})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Set the image background size to cover
        width: "100%", // Set the container width to 100%
        height: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          height: "50vh",
          width: "300px",
          marginLeft: "auto",
          marginRight: "70%",
    
          borderRadius: "10px",
          marginTop:'7%'
        }}
      >
        <Grid align="center">
          <h2>Enter the OTP</h2>
        </Grid>
        <div>
          <MuiOtpInput
            value={otp}
            onChange={handleChange}
            sx={{ marginTop: "50px" }}
          />
        </div>

        <Grid
          sx={{ marginTop: "40px", fontSize: "12px", textAlign: "center" }}
        >
          <h4>Check your email and enter the valid numbers</h4>
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          onClick={submit}
          sx={{ marginTop: "60px", backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' } }}
        >
          Verify
        </Button>
      </Paper>
      {error &&(
         <Stack sx={{ width: '30%',marginLeft:'5%' }} spacing={2}>
         <Alert severity="error">
           <AlertTitle>Error</AlertTitle>
           This is an error alert — <strong>check it out!</strong>
         </Alert>
         </Stack>
      )}
    </Grid>
  </>
  );
};

export default Email;
