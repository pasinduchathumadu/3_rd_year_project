import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Forgot from "./pages/Common/Forget";
import Signup  from "./pages/Common/Signup"
import Blogs from "./pages/Common/Blog";
import Login from "./pages/Common/Login";
import Email from "./pages/Common/Email";

import { Dashboard } from "./pages/Client/Dashboard";
import { Reports } from "./pages/Client/Reports";

import Menu from "./pages/Client/Menu";
import Petcare from "./pages/Client/Petcare"




import Reset from "./pages/Common/Reset";

import Cart from "./pages/Client/Cart"
import Header from "./components/Layout/Header";

import Home from  "./pages/Common/Home";
import Services from  "./pages/Common/Services";
import About from  "./pages/Common/About";
import ComContent from  "./pages/Common/ComContent";
import Contact from  "./pages/Common/Contact";
import Footer from  "./pages/Common/Footer";


import BoardingHome from "./pages/Boarding_house_manager/Home";
import BoardingClients from "./pages/Boarding_house_manager/Clients";
import BoardingPets from "./pages/Boarding_house_manager/Boardpets";
import BoardingPackages from "./pages/Boarding_house_manager/Packages";
import BoardingComplains from "./pages/Boarding_house_manager/Complains";

import Pet_grooming from "../src/pages/Client/Pet_grooming";


import Refund from "./pages/Boarding_house_manager/Refund";

import Caregiverlist from "./pages/Care_center_manager/caregiverlist";


import Onlinehome from "./pages/Online_store_manager/Home"
import OnlineAdd from "./pages/Online_store_manager/Add"
import Complain from "./pages/Online_store_manager/Complain";


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
         
          <Route path="/email" element={issignup ?<Email /> : <Navigate to ="/signup"/>}/>

          <Route path="/" element={
             <><Header />
             <div className="App">
             
              <Home />
              <Services />
              <About />
              <ComContent />
              <Contact />
              <Footer />
            </div></>
          } />
          <Route path="/menu" element={<Menu />}/>
          <Route path="/cart" element = {<Cart />} />
          <Route path="/email" element={!issignup ?<Email /> : <Navigate to ="/signup"/>}/>
          <Route path="/forget" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup}/>} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reports" element={<Reports/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/petcare" element={<Petcare/>}></Route>
          {/* <Route path="/Pet_grooming" element={<Pet_grooming/>}></Route> */}
          <Route path="/Pet_grooming" element={<Pet_grooming/>}></Route>





           {/* boarding house manager */}
           <Route path="/boarding_dashboard" element={<BoardingHome />} />
          <Route path="/boarding_clients" element={<BoardingClients />} />
          <Route path="/boarding_pets" element={<BoardingPets />} />
          <Route path="/boarding_packages" element={<BoardingPackages />} />
          <Route path="/boarding_complains" element={<BoardingComplains />} /> 
          <Route path="/refund" element = { <Refund /> } />         
         

           {/*  */}
           <Route path="/caregiverlist" element={< Caregiverlist />} />

          
          <Route path="/handling_complain" element={<Complain/>}/>
          <Route path="/online_manager" element={<Onlinehome />}/>
          <Route path="/online_add" element={<OnlineAdd/>}/>

        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


