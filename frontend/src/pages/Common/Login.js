import React, { useEffect, useState } from 'react';
import '../../styles/Common/Login.css';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Button, Typography } from "@mui/material"
import axios from 'axios';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error ,seterror] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {

    const container = document.getElementById('container');
    setTimeout(() => {
      container.classList.add('sign-in');
    }, 200);

    return () => {
      container.classList.remove('sign-in');
      container.classList.remove('sign-up');
    };
  }, []);

  const handlesubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/pet_care/user/login", {
        email,
        password
      })
      if (res.data.message === "User not found" || res.data.message === "Password didn't Matched") {
        seterror(true)
      }
      else {
        seterror(false)
        onLogin();
        setEmail("");
        setPassword("");
        navigate(`/blogs`);
      }

    } catch (err) {
      console.log("There is an error")

    }
    // Perform login logic here, e.g., send login request to the server

    // Reset form fields

  };

  const pathdirection = async (e) => {
    e.preventDefault();
    navigate('/signup')
  }

  const forget = async (e) => {
    e.preventDefault();
    navigate('/forget')
  }



  return (

    <div id="container" className="container">

      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">

        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            
            
         
            <div className="form sign-in" >
            <form action='' onSubmit={handlesubmit}>
          
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <Button sx={{'&:hover':{backgroundColor:'orange'}}} type='submit'>Sign in</Button>
              <p>
                <b onClick={forget} className='pointer'>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={pathdirection} className="pointer">
                  Sign up here
                </b>
              </p>
              </form>

            </div>
          
            
             


          </div>
          {error &&(
          <Alert severity="error" sx={{ marginTop: '20px' }}>
          <AlertTitle ></AlertTitle>
          <strong> Username or Password incorrect</strong>
        </Alert>


         )}
        
          
          
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
};

export default Login;
