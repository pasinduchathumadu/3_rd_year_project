import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Blogs from "./components/Blogs";
// import Login from "./components/Login";
import Navbar from './components/Navbar.js';
import AnimatedRoutes from '../src/components/pages/AnimatedRoutes';
import Home from '../src/components/pages/Home'
import Login from "./components/pages/Login"





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    
    <React.Fragment>
      <Navbar/>
      <main>
       <Routes>

       {/* <AnimatedRoutes/> */}
        
          {/* <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} /> */}
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


