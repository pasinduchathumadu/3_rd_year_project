import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Forgot from "./pages/Common/Forget";
import Signup  from "./pages/Common/Signup"
import Blogs from "./pages/Client/Payment";
import Login from "./pages/Common/Login";
// import Home from  "./pages/Common/Home";
import Email from "./pages/Common/Email";

import { Dashboard } from "./pages/Client/Dashboard";
import { Reports } from "./pages/Client/Reports";


import Reset from "./pages/Common/Reset";
import Menu from "./pages/Client/Menu";
import Cart from "./pages/Client/Cart"
import Header from "./components/Layout/Header"
import Home from  "./pages/Common/Home";
import Services from  "./pages/Common/Services";
import About from  "./pages/Common/About";
import ComContent from  "./pages/Common/ComContent";
import Contact from  "./pages/Common/Contact";
import Footer from  "./pages/Common/Footer";


import BoardingHome from "./pages/Boarding_house_manager/Home";
import BoardingSideMenu from "./components/Layout/BoardingSideMenu";
import BoardingClients from "./pages/Boarding_house_manager/Clients";
import BoardingPets from "./pages/Boarding_house_manager/Boardpets";
import BoardingPackages from "./pages/Boarding_house_manager/Packages";
import BoardingComplains from "./pages/Boarding_house_manager/Complains";

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

          {/* <Route path="/" element={<Dashboard/>} /> */}
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
          <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reports" element={<Reports/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>

           {/* boarding house manager */}
           <Route path="/boarding_dashboard" element={<BoardingHome />} />
          <Route path="/sidemenu" element={<BoardingSideMenu />} />
          <Route path="/boarding_clients" element={<BoardingClients />} />
          <Route path="/boarding_pets" element={<BoardingPets />} />
          <Route path="/boarding_packages" element={<BoardingPackages />} />
          <Route path="/boarding_complains" element={<BoardingComplains />} />

          

        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


