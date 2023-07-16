import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Forgot from "./pages/Common/Forget";
import Signup  from "./pages/Common/Signup"
import Blogs from "./pages/Client/Payment";
import Login from "./pages/Common/Login";
import Home from  "./pages/Client/Home";
import Email from "./pages/Common/Email";
import { Dashboard } from "./pages/Client/Dashboard";
import { Reports } from "./pages/Client/Reports";
import PrimarySearchAppBar from "./components/Layout/Header";


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
        <PrimarySearchAppBar/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/email" element={issignup ?<Email /> : <Navigate to ="/signup"/>}/>
          <Route path="/forget" element={<Forgot />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup}/>} />
          <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reports" element={<Reports/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


