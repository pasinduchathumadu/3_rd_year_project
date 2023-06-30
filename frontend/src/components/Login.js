import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/pet_care/user/login",{
        email,
        password
    })
    if(res.data.message==="Username or password incorrect!!"){
      console.log("Login Failed")
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

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
