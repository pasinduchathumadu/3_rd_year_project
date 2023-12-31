import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { Button,Alert,AlertTitle } from "@mui/material";
import axios from "axios";
import Header from "../../components/Layout/LandingHeader"
import zxcvbn from 'zxcvbn';
import '../../styles/Common/Login.css';
const Signup = ({onSignup}) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setmessage] = useState(false)
  const [error1,seterror1] = useState(false)
  const [first_name,setfirst]=useState("");
  const [last_name,setlast]=useState("");
  const [street,setstreet]=useState("");
  const [city,setcity] = useState("");
  const [contact_number,setcontact_number] = useState("");
  const [passwordStrength, setPasswordStrength] = useState('');
  const [display_condition, set_condition] = useState(false)

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
  const handlesubmit = async(e) => {
    e.preventDefault();
    if(email === null || password === null || first_name === null || last_name === null || street === null || city === null || contact_number === null){
      seterror1(true)
      setmessage("Kindly complete all the required fields.")
      return;
    }
    var pattern = /^[A-Za-z]+$/;
    const check =pattern.test(first_name.trim())
    const check1 = pattern.test(last_name.trim())
    const check2 = pattern.test(city.trim())

   

    if(!check || !check1 || !check2){
      seterror1(true)
      setmessage("Please enter a valid name using only characters.")
      return;
    }

   

    
 
    try{
    
     
      const res = await axios.post("http://localhost:5000/pet_care/user/signup",{
        email,
        password,
        first_name,
        last_name,
        street,
        city,
        contact_number
        
    })
    if(res.data.message==="Registration failed"|| res.data.message==="There is an internal error!!"){
      seterror1(true)
      setmessage(res.data.message)
      
    }
    else if(res.data.message==="This email is already exist!!!"){
     seterror1(true)
     setmessage(res.data.message)
    }
    else{
      onSignup()
      setEmail("")
      setPassword("")
      setcity("")
      setstreet("")
      setcontact_number("")
      setfirst("")
      setlast("")
      navigate('/email')
    }

    }catch(err){
      console.log("There is an error")

    }
    // Perform login logic here, e.g., send login request to the server

    // Reset form fields
  }
    const navigate = useNavigate();
    useEffect(() => {

        const container = document.getElementById('container');
        setTimeout(() => {
          container.classList.add('sign-up');
        }, 200);
    
        return () => {
          container.classList.remove('sign-in');
          container.classList.remove('sign-up');
        };
      }, []);
        const pathdirection = ()=>{
          navigate('/login')
        }
    
    return(
      <><Header />
      <div id="container" className="container">

        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <form action='' onSubmit={handlesubmit}>
                  <div className="input-group">
                    <div className='first'>
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="First name" onChange={(e) => setfirst(e.target.value)} required />

                    </div>

                    <div>
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="Last name" onChange={(e) => setlast(e.target.value)} required />

                    </div>

                  </div>
                  <div className="input-group">
                    <i className="bx bx-mail-send"></i>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-user"></i>
                    <input type="password" placeholder="Password"  onChange={(e) => { setPassword(e.target.value); setPasswordStrength(calculatePasswordStrength(e.target.value)); }} required />
                   
                  </div>
                  {display_condition && (
                <p className="password-strength" style={{width:'20%',paddingLeft:'1%',paddingTop:'1%',paddingBottom:'1%',color:'white'}}>{passwordStrength}</p>

              )}
                  <div className="input-group">
                    <div className='first'>
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="Street" onChange={(e) => setstreet(e.target.value)} required />

                    </div>

                    <div>
                      <i className="bx bxs-user"></i>
                      <input type="text" placeholder="City" onChange={(e) => setcity(e.target.value)} required />

                    </div>

                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt"></i>
                    <input type="text" placeholder="Contact number" onChange={(e) => setcontact_number(e.target.value)} required />
                  </div>

                  <Button sx={{ '&:hover': { backgroundColor: 'orange' } }} type='submit'>Sign up</Button>
                  <p>
                    <span>Already have an account?</span>
                    <b onClick={pathdirection} className="pointer">
                      Sign in here
                    </b>
                  </p>
                </form>

              </div>
            </div>
            {error1 && (
              <Alert severity="error" sx={{ marginTop: '20px' }}>
                <AlertTitle></AlertTitle>
                <strong>{message}</strong>
              </Alert>


            )}
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}

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
      </div></>
    )
}
export default Signup