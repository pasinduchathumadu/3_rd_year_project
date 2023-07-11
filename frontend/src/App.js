import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Verify from "./pages/Client/Verify";
import Signup  from "./pages/Client/Signup"
import Blogs from "./pages/Client/Payment";
import Login from "./pages/Common/Login";
import Home from  "./pages/Client/Home";
import Email from "./pages/Common/Email_opt";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [issignup,setIssignup] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleSignup = () => {
    setIssignup(true);
  }
  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email" element={<Email />}/>
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


