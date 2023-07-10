import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = ({onSignup}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name,setfirst]=useState("");
  const [last_name,setlast]=useState("");
  const [street,setstreet]=useState("");
  const [city,setcity] = useState("");
  const [contact_number,setcontact_number] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
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
      navigate('/verify')
    }

    }catch(err){
      console.log("There is an error")

    }
    // Perform login logic here, e.g., send login request to the server

    // Reset form fields
   
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
      
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
          
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First_name</label>
          <input
            type="text"
       
            onChange={(e) => setfirst(e.target.value)}
            required
          />
        </div>
        <div>
          <label>last name:</label>
          <input
            type="text"
            onChange={(e)=>setlast(e.target.value)}
            required
          />
        </div>
        <div>
          <label>street</label>
          <input 
            type="text"
            onChange={(e)=>setstreet(e.target.value)}
            required
          />
        </div>
        <div>
          <label>city</label>
          <input
            type="text"
            onChange={(e)=>setcity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>contact_number</label>
          <input
            type="text"
            onChange={(e)=>setcontact_number(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Register</button>
        <p id="error"></p>
      </form>
    </div>
  );
};

export default Signup;