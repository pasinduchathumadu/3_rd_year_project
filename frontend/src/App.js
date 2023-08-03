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
import PrimarySearchAppBar from "./components/Layout/Header";

import Reset from "./pages/Common/Reset";
import Menu from "./pages/Client/Menu";

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


import Doctors from "./pages/Medi-help_manager/doctors";
import ViewAppointments from "./pages/Medi-help_manager/ViewAppointments";
import PendingAppointments from "./pages/Medi-help_manager/PendingAppointments";
import CompletedAppointments from "./pages/Medi-help_manager/CompletedAppointments";
import PetProfiles from "./pages/Medi-help_manager/PetProfile";
import ViewDoctors from "./pages/Medi-help_manager/ViewDoctors";
import GetAppointments from "./pages/Medi-help_manager/GetAppointments";
function App() {
  //popup
  const [modelOpen,setModelOpen]=useState(false);

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

          {/* <Route path="/" element={<Dashboard/>} /> */}
          <Route path="/email" element={issignup ?<Email /> : <Navigate to ="/signup"/>}/>


          <Route path="/" element={
            <div className="App">
            <Home />
            <Services />
            <About />
            <ComContent />
            <Contact />
            <Footer />
          </div>
          } />
          <Route path="/menu" element={<Menu />}/>

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

          {/* medi care manager */}
          
          
           <Route path="/Doctors" element={
            <div className="App">
              
          <Doctors />
         
        
          
          </div>
          } />
          <Route path="/viewAppointments" element={<ViewAppointments />} />
          <Route path="/viewPendingAppointments" element={<PendingAppointments />} />
          <Route path="/viewCompletedAppointments" element={<CompletedAppointments />} />
          <Route path="/PetProfiles" element={<PetProfiles />} />
          <Route path="/viewDoctors" element={<ViewDoctors />} />
          <Route path="/getAppointment" element={<GetAppointments />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


