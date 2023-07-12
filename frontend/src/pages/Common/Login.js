import React, { useEffect,useState } from 'react';
import '../../styles/Common/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/pet_care/user/login",{
        email,
        password
    })
    if(res.data.message==="User not found"|| res.data.message==="Password didn't Matched"){
      document.getElementById('error').innerHTML="Username or Password is incorrect"
    }
    else{
     
      onLogin();
      setEmail("");
      setPassword("");
      navigate(`/blogs`);
    }

    }catch(err){
      console.log("There is an error")

    }
    // Perform login logic here, e.g., send login request to the server

    // Reset form fields
   
  };
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

  const toggle = () => {
    const container = document.getElementById('container');
    container.classList.toggle('sign-in');
    container.classList.toggle('sign-up');
  };
  
  return (
    
    <div id="container" className="container">
     
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group" >
                <div className='first'>
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="First name" />

                </div>

                <div>
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Last name" />               
               
              </div>

              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Password" />
              </div>
              <div className="input-group" >
                <div className='first'>
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Stret" />

                </div>

                <div>
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="City" />               
               
              </div>

              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Contact number" />
              </div>
              <a href='./Email_otp.js'>
              <button>Sign up</button></a>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in" onSubmit={handlesubmit}>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
              </div>
              
              <button onclick>Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper"></div>
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
