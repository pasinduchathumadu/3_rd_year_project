import React, { useState,useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Forgot from "./pages/Common/Forget";
import Signup  from "./pages/Common/Signup"
import Blogs from "./pages/Common/Blog";
import Login from "./pages/Common/Login";
import Email from "./pages/Common/Email";

import { Dashboard } from "./pages/Client/Dashboard";
import { Reports } from "./pages/Client/Reports";

import Reset from "./pages/Common/Reset";
import Menu from "./pages/Client/Menu";
import Petcare from "./pages/Client/Petcare"
import Unregisterestore from "./pages/Client/Unregistered_store"
import Cart from "./pages/Client/Cart"
import LandingHeader from "../../frontend/src/components/Layout/LandingHeader"


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

import AdminHome from './pages/Admin/Home';
import AdminUsers from './pages/Admin/Users';
import AdminRefund from './pages/Admin/Refund';
import AdminComplains from './pages/Admin/Complains';

import Petgrooming from "../src/pages/Client/Pet_grooming";


import Caregiverlist from "./pages/Care_center_manager/caregiverlist";


import Onlinehome from "./pages/Online_store_manager/Home"
import OnlineAdd from "./pages/Online_store_manager/Add"
import Complain from "./pages/Online_store_manager/Complain";
import Clientorders from "./pages/Online_store_manager/Clients_orders";

import { useNavigate } from "react-router-dom";
import HomeHeader from './components/Layout/Homeheader'
// import Complains from "./pages/Boarding_house_manager/Complains";

function App() {

  

  const [isLoggedIn, setIsLoggedIn] = useState("")
  const [issignup,setIssignup] = useState(false)
  const [user_role,setuserrole] = useState("")



  useEffect(() => {
    // Check if the user is already logged in from previous sessions
    const storedUserRole = localStorage.getItem("userRole");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUserRole && storedIsLoggedIn) {
      setuserrole(storedUserRole);
      setIsLoggedIn(storedIsLoggedIn === "true");
    }
  }, []);

  const navigate = useNavigate()
  const handleLogin = (role,email) => {
    setIsLoggedIn(true);
    setuserrole(role);
    localStorage.setItem("userRole", role);
    localStorage.setItem("isLoggedIn", "true");


  
    if(role === 'online_store_manager'){

      localStorage.setItem("online_store_manager_email",email)
      navigate('/online_home')
    }
    else if(role === 'boarding_house_manager'){
      navigate('/boarding_dashboard')
    }
    else if(role === 'client'){
      localStorage.setItem("client_email",email)
    }
  };
  const handleSignup = () => {
    setIssignup(true);
  }
  return (
    <React.Fragment>
      <main>
       
        <Routes>
         
          <Route path="/email" element={issignup ?<Email /> : <Navigate to ="/signup"/>}/>
          <Route path="/store" element={<><LandingHeader/><Unregisterestore/></>}/>
          <Route path="/about" element={<><LandingHeader/><About/></>} />
          <Route path="/contact" element={<><LandingHeader/><Contact/></>}/>
          <Route path="/" element={
             <><LandingHeader />
             <div className="App">
             
              <Home />
              <Services />
              <About />
              <ComContent />
              <Contact />
              <Footer />
            </div></>
          } />
          <Route path="/signup" element={<Signup onSignup={handleSignup}/>} />
          <Route path="/login" element={ <Login onLogin={handleLogin} />} />
          

          <Route path="/menu" element={<><HomeHeader userRole={'client'}/><Menu/></>}/>
          <Route path="/cart" element = {<><HomeHeader userRole={'client'}/><Cart /></>} />
          <Route path="/email" element={!issignup ?<Email /> : <Navigate to ="/signup"/>}/>
          <Route path="/forget" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          
          <Route path="/blog" element={<Blogs />} />
          {/* <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} /> */}
       
      
          <Route path="/reports" element={<Reports/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/petcare" element={<Petcare/>}></Route>
          {/* <Route path="/Pet_grooming" element={<Pet_grooming/>}></Route> */}
          <Route path="/Pet_grooming" element={<Petgrooming/>}></Route>


           {/* boarding house manager */}
           {isLoggedIn && user_role === "boarding_house_manager" &&(
             <><Route path="/boarding_dashboard" element={<><HomeHeader userRole={"boarding_house_manager"}/><BoardingHome /></>} />
             <Route path="/boarding_clients" element={<><HomeHeader userRole={"boarding_house_manager"}/><BoardingClients /></>} />
             <Route path="/boarding_pets" element={<><HomeHeader userRole={"boarding_house_manager"}/><BoardingPets /></>} />
             <Route path="/boarding_packages" element={<><HomeHeader userRole={"boarding_house_manager"}/><BoardingPackages /></>} />
             <Route path="/boarding_complains" element={<><HomeHeader userRole={"boarding_house_manager"}/><BoardingComplains /></>} />
             </>         
           )}

           {/* admin */}
           {/* {isLoggedIn && user_role === "admin" &&(
             <><Route path="/admin_dashboard" element={<><HomeHeader userRole={"admin"}/><AdminHome /></>} />
             <Route path="/admin_users" element={<><HomeHeader userRole={"admin"}/><AdminUsers /></>} />
             <Route path="/admin_refund" element={<><HomeHeader userRole={"admin"}/><AdminRefund /></>} />
             <Route path="/admin_complains" element={<><HomeHeader userRole={"admin"}/><AdminComplains /></>} />
             </>         
           )} */}
          

          {/* admin */}
          <Route path="/admin_dashboard" element={<AdminHome />} />
          <Route path="/admin_users" element={<AdminUsers />} />
          <Route path="/admin_refund" element={<AdminRefund />} />
          <Route path="/admin_complains" element={<AdminComplains />} /> 


           {/*  */}
           <Route path="/caregiverlist" element={< Caregiverlist />} />

           {isLoggedIn && user_role === "online_store_manager" && (
          <><Route path="/handling_complain" element={<><HomeHeader userRole={"online_store_manager"} /><Complain /></>} />
          <Route path="/online_add" element={<><HomeHeader userRole={"online_store_manager"} /><OnlineAdd /></>} />
          <Route path="/online_home" element={<><HomeHeader userRole={"online_store_manager"} /><Onlinehome /></>} />
          <Route path="/online_client" element={<><HomeHeader userRole={"online_store_manager"} /><Clientorders /></>} /></>
           )}

        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


