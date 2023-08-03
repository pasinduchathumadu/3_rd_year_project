import { Grid, Paper, Button ,Alert,AlertTitle} from "@mui/material";
import React, { useState } from "react";
import zxcvbn from 'zxcvbn';
import Header from "../../components/Layout/LandingHeader";
import cover from "../../assests/pic3.jpg"
import '../../styles/Common/Forget.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const [new_password, setnew] = useState("")
  const [confirm, setconfirm] = useState("")
  const [error ,seterror] = useState(false)
  const [display_condition, set_condition] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate()
  const submit = async () => {

    try {
      const res = await axios.post("http://localhost:5000/pet_care/user/reset",{
        new_password,
        confirm
    })
      if (res.data.message === "Password was not changed.") {
        seterror("Password was not changed.")

      } else if (res.data.message === "New password and confirm password do not match.") {
        seterror("New password and confirm password do not match.")

      }else if(res.data.message === "All fields are required."){
        seterror("All fields are required.")
      }
      else if(res.data.message === "Password Changed.") {
        navigate('/login')

      }


    } catch (err) {
      console.log("There is an internel error")

    }
  }

  const calculatePasswordStrength = (password) => {
    const strengthScore = zxcvbn(password).score;

    set_condition(true)

    if (strengthScore === 0) {
      document.documentElement.style.setProperty('--password-strength-color', '#FF0000');
      return 'Poor';
    } else if (strengthScore === 1 || strengthScore === 2) {
      document.documentElement.style.setProperty('--password-strength-color', '#ff8c00');
      return 'Medium';
    } else {
      document.documentElement.style.setProperty('--password-strength-color', '#008000');
      return 'Strong';
    }
  };

  return (
    <div className="body" 
    style={{
      backgroundImage: `url(${cover})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh",
    }}
    >
    <><Header />
      <Grid >
        <Grid>
          <Paper
           
           
            elevation={4}
            sx={{
              padding: "20px",
            height: "50vh",
            width: "40%",
            marginLeft: "5%",
            marginRight: "70%",
            marginBottom: "auto",
            borderRadius: "10px",
            marginTop: '7%'
            }}
          >
            <Grid align="center">
              <h2>Rset The Password</h2>
            </Grid>


            <Grid sx={{ marginTop: "20px", fontSize: "12px",width:'150%'}}>
              <div className="text-group" >

                <input type="password" placeholder="New Password" onChange={(e) => { setnew(e.target.value); setPasswordStrength(calculatePasswordStrength(e.target.value)); }} required />

              </div>
              {display_condition && (
                <p className="password-strength">{passwordStrength}</p>

              )}

              <div className="text-group" >

                <input type="password" placeholder="Confirm Password" onChange={(e) => setconfirm(e.target.value)} required />
              </div>



            </Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              align="center"
              onClick={submit}
              sx={{ marginTop: "10px", marginLeft: '6%', backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' }, width: '75%' }}
            >
              Reset
            </Button>
            <Button
              sx={{ float: 'right', backgroundColor: "black", '&:hover': { backgroundColor: 'black' }, width: '15%', color: 'white', marginTop: '13px' }}>
              Back
            </Button>


          </Paper>
          {error && (
          <Alert severity="error" sx={{ marginTop: '20px', marginLeft: '5%',width:'15%' }}>
            <AlertTitle></AlertTitle>
            <strong>{error}</strong>
          </Alert>
        )}
        </Grid>
      </Grid></>
      </div>
  );
};
export default Reset