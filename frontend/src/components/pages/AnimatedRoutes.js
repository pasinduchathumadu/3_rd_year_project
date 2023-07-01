import React from 'react'
import {Route,Routes,useLocation} from "react-router-dom"
// import Menu from '../pages/Menu'
// import Slider from '../pages/Slider'
// import About from '../pages/About';
// import Contact from '../pages/Contact';
import Home from '../pages/Home'
import Login from "../pages/Login"
// import Login from  '../pages/Login';
// import VideoBackground from '../pages/VideoBackground';
// import {AnimatePresence}from 'framer-motion'


function AnimatedRoutes() {
    const location=useLocation();

  return (
    // <AnimatePresence>
    <Routes  location={location} key={location.pathname}>
       <Route path="/" element={<Home/>}/>
    {/* <Route path="/menu" element={<Menu/>}/>
    <Route path="/Slider" element={<Slider/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/> */}
    {/* <Route path="/Login" element={<Login/>}/> */}
    {/* <Route path="/VideoBackground" element={<VideoBackground/>}/> */}
  </Routes>
  // </AnimatePresence>
  )
}

export default AnimatedRoutes