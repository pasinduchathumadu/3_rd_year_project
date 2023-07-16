import { Grid, Paper, Button ,Alert,AlertTitle} from "@mui/material";
import React, { useState } from "react";
import zxcvbn from 'zxcvbn';
import Header from "../../components/Layout/Header";
import cover from "../../assests/pic3.jpg"
import '../../styles/Common/Forget.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const [new_password, setnew] = useState("")
  const [old_password, setold] = useState("")
  const [confirm, setconfirm] = useState("")
  const [error ,seterror] = useState(false)
  const [display_condition, set_condition] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/pet_care/user/reset", (
        new_password,
        old_password,
        confirm
      ))
      if (res.data.message === "current password isn't match") {
        seterror("Current Password is not matched")

      } else if (res.data.message === "Password iS not changed") {
        seterror("Password is not matched")

      } else {
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
    <div className="body">
    <><Header />
      <Grid sx={{ display: "flex", borderRadius: "100px" }}>
        <Grid>
          <Paper
            component="form"
            onSubmit={submit}
            elevation={4}
            sx={{
              padding: "20px",
              height: "50vh",
              width: "600px",
              marginTop: "130px",
              marginLeft: "20px",
              marginRight: "auto",
              marginBottom: "auto",
              borderRadius: "10px"
            }}
          >
            <Grid align="center">
              <h2>Rset The Password</h2>
            </Grid>


            <Grid sx={{ marginTop: "20px", fontSize: "12px" }}>
              <div className="text-group" >

                <input type="password" placeholder="Current Password" onChange={(e) => setold(e.target.value)} required />
              </div>
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
              sx={{ marginTop: "10px", marginLeft: '6%', backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' }, width: '40%' }}
            >
              Reset
            </Button>
            <Button
              sx={{ float: 'right', backgroundColor: "black", '&:hover': { backgroundColor: 'black' }, width: '15%', color: 'white', marginTop: '13px' }}>
              Back
            </Button>


          </Paper>

        </Grid>
        <Grid sx={{ backgroundImage: `url(${cover})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "50%", height: "90vh", marginLeft: '100px' }}>


        </Grid>
        {error && (
          <Alert severity="error" sx={{ marginTop: '20px', marginLeft: '15px', marginRight: '15px' }}>
            <AlertTitle></AlertTitle>
            <strong>Invalid Number Check it again</strong>
          </Alert>


        )}

      </Grid></>
      </div>
  );
};
export default Reset