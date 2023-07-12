import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = ({onSignup}) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name,setfirst]=useState("");
  const [last_name,setlast]=useState("");
  const [street,setstreet]=useState("");
  const [city,setcity] = useState("");
  const [contact_number,setcontact_number] = useState("");


  const handlesubmit = async(e) => {
    e.preventDefault();
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
      document.getElementById('error').innerHTML="Registration failed"
      
    }
    else if(res.data.message==="This email is already exist!!!"){
      document.getElementById('error').innerHTML="This email is exist"
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
        <div id="container" className="container">
     
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up" onSubmit={handlesubmit}>
                <div className="input-group" >
                  <div className='first'>
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="First name" onChange={(e)=>setfirst(e.target.value)} />
  
                  </div>
  
                  <div>
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="Last name" onChange={(e)=>setlast(e.target.value)} />               
                 
                </div>
  
                </div>
                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="input-group" >
                  <div className='first'>
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="Stret" onChange={(e)=>setstreet(e.target.value)}/>
  
                  </div>
  
                  <div>
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="City" onChange={(e)=>setcity(e.target.value)} />               
                 
                </div>
  
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Contact number" onChange={(e)=>setcontact_number(e.target.value)} />
                </div>
               
                <button>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={pathdirection} className="pointer">
                  Sign in here
                </b>
              </p>
               
              </div>
            </div>
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
      </div>
    )
}
export default Signup