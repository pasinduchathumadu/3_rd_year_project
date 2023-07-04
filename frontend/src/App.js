import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Verify from "./components/Verify";
import Signup  from "./components/Signup"
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Home from  "./components/Home";
import Navbar from "./components/Navbar";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [issignup,setIssignup] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleSignup = () => {
    setIssignup(true);
  }
  return (
    
    <React.Fragment>
              <Navbar/>

      <main>
        <Routes>

          <Route path="" element = {<Home />} />
          <Route path="/verify" element={issignup ?<Verify /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup onSignup = {handleSignup} />} />
          <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


