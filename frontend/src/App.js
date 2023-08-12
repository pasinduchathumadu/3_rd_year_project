import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Forgot from "./pages/Common/Forget";
import Signup from "./pages/Common/Signup";
import Blogs from "./pages/Common/Blog";
import Login from "./pages/Common/Login";
import Email from "./pages/Common/Email";

import TrackOrder from "./pages/Client/Storereview"


import Bill from "./pages/Client/Bill";

import { Dashboard } from "./pages/Client/Dashboard";
import { Reports } from "./pages/Client/Reports";

import Menu from "./pages/Client/Menu";
import Petcare from "./pages/Client/Petcare";

import MindRealx from "./pages/Client/MindRealx";
import { Shop } from "./pages/Client/Shop";
import { NonBredShop } from "./pages/Client/NonBredShop";
import PopupForm from "./pages/Client/popupform";

import Header from "../src/components/Layout/Header";

import Unregisterestore from "./pages/Client/Unregistered_store";
import Cart from "./pages/Client/Cart";
import LandingHeader from "../../frontend/src/components/Layout/LandingHeader";

import Home from "./pages/Common/Home";
import Services from "./pages/Common/Services";
import About from "./pages/Common/About";
import ComContent from "./pages/Common/ComContent";
import Contact from "./pages/Common/Contact";
import Footer from "./pages/Common/Footer";

import BoardingHome from "./pages/Boarding_house_manager/Home";
import BoardingClients from "./pages/Boarding_house_manager/Clients";
import BoardingPets from "./pages/Boarding_house_manager/Boardpets";
import BoardingPackages from "./pages/Boarding_house_manager/Packages";
import BoardingComplains from "./pages/Boarding_house_manager/Complains";

import AddPets from './pages/Client/AddPets';
import Crossing from './pages/Client/Crossing';
import Bath from "./pages/Client/Bath";
import Haircuts from "./pages/Client/Haircuts";
import Bording from "./pages/Client/Bording";
import Petgrooming from "../src/pages/Client/Pet_grooming";
import Medi from "../src/pages/Client/Medi";
import { DoctorList } from "./pages/Client/DoctorList";
import OrderTable from "./pages/Client/OrderTable";



import Doctor from "./pages/Medi-help_manager/doctors";
import ViewAppointments from "./pages/Medi-help_manager/ViewAppointments";

import PetProfiles from "./pages/Medi-help_manager/PetProfile";
import MediComplaints from "./pages/Medi-help_manager/Complains";
import MediDashboard from "./pages/Medi-help_manager/Dashboard";




import Packages from "./pages/Care_center_manager/Packages";
import Complaints from "./pages/Care_center_manager/Complaints";
import Caregiverlist from "./pages/Care_center_manager/caregiverlist";
import Appointments from "./pages/Care_center_manager/Appointments";

import Reset from "./pages/Common/Reset";

import AdminHome from "./pages/Admin/Home";
import AdminUsers from "./pages/Admin/Users";
import AdminRefund from "./pages/Admin/Refund";
import AdminComplains from "./pages/Admin/Complains";

import Profile from './pages/Common/Profile';



import Onlinehome from "./pages/Online_store_manager/Home";
import OnlineAdd from "./pages/Online_store_manager/Add";
import Complain from "./pages/Online_store_manager/Complain";
import Clientorders from "./pages/Online_store_manager/Clients_orders";

import CompanyHome from "./pages/Company_manager/Company_Home";
import CompanyClients from "./pages/Company_manager/Company_Clients";
import CompanyCompetitions from "./pages/Company_manager/Company_Competitions";
import CompanyComplaints from "./pages/Company_manager/Company_Complaints";

import { useNavigate } from "react-router-dom";
import HomeHeader from "./components/Layout/Homeheader";

import PaymentClient from './pages/Client/Payment';

// sidebar icons
import HomeIcon from '@mui/icons-material/Home';  //dashboard
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'; //complains

// clients
import PetsIcon from '@mui/icons-material/Pets'; //add pets & boarding - pets
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; //crossing
import StoreIcon from '@mui/icons-material/Store';  //shop
import StorefrontIcon from '@mui/icons-material/Storefront'; //non-bread shop
import AssessmentIcon from '@mui/icons-material/Assessment'; //reports

// admin
import GroupIcon from '@mui/icons-material/Group'; //users & boarding - clients & care center - caregivers
import RuleFolderIcon from '@mui/icons-material/RuleFolder'; //refund

// boaridng house
import InventoryIcon from '@mui/icons-material/Inventory'; //package , care center packages

// care center
import BookOnlineIcon from '@mui/icons-material/BookOnline'; // appointments



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [issignup, setIssignup] = useState(false);
  const [user_role, setuserrole] = useState("");

  useEffect(() => {
    // Check if the user is already logged in from previous sessions
    const storedUserRole = localStorage.getItem("userRole");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUserRole && storedIsLoggedIn) {
      setuserrole(storedUserRole);
      setIsLoggedIn(storedIsLoggedIn === "true");
    }
  }, []);


  const navigate = useNavigate();
  const handleLogin = (role, email) => {
    setIsLoggedIn(true);
    setuserrole(role);
    localStorage.setItem("userRole", role);
    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("store_email", email);

    if (role === "online_store_manager") {
      localStorage.setItem("online_store_manager_email", email);
      navigate("/online_home");
    } else if (role === "boarding_house_manager") {
      localStorage.setItem('boarding_email',email)
      navigate("/boarding_dashboard");
    } else if (role === "admin") {
      navigate("/admin_dashboard");
    } else if (role === "client") {
      navigate("/dashboard");
      localStorage.setItem("client_email", email); //session
    } else if (role === "care_center_manager") {
      navigate("/appointments");
      localStorage.setItem("care_center_manager", email);
    } else if (role === "company_manager") {
      navigate("/company_dashboard");
      localStorage.setItem("company_manager", email);

    }
    else if (role === "medi_help_manager") {
      navigate("/Doctors");
      localStorage.setItem("medi_help_manager", email);

    }
  };
  const handleSignup = () => {
    setIssignup(true);
  };
  return (
    <React.Fragment>
      <main>
        <Routes>

          <Route path="/email" element={issignup ? <Email /> : <Navigate to="/signup" />} />
          <Route path="/store" element={<><LandingHeader /><Unregisterestore /></>} />
          <Route path="/about" element={<><LandingHeader /><About /></>} />
          <Route path="/contact" element={<><LandingHeader /><Contact /></>} />
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
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/bill" element={isLoggedIn ? (<><HomeHeader userRole={user_role} /><Bill /></>) : (<Navigate to='/bill' />)} />
          <Route path="/menu" element={isLoggedIn ? (<><HomeHeader userRole={user_role} /><Menu /></>) : (<Navigate to='/login' />)} />
          <Route path="/cart" element={isLoggedIn ? (<><HomeHeader userRole={user_role} /><Cart /></>) : (<Navigate to='/login' />)} />
          <Route path="/email" element={!issignup ? <Email /> : <Navigate to="/signup" />} />
          <Route path="/payment" element={isLoggedIn ? (<><HomeHeader userRole={user_role} /><PaymentClient /></>) : (<Navigate to='/login' />)} />
          <Route
            path="/store"
            element={
              <>
                <LandingHeader />
                <Unregisterestore />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <LandingHeader />
                <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <LandingHeader />
                <Contact />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <LandingHeader />
                <div className="App">
                  <Home />
                  <Services />
                  <About />
                  <ComContent />
                  <Contact />
                  <Footer />
                </div>
              </>
            }
          />


          <Route
            path="/menu"
            element={
              isLoggedIn ? (
                <>
                  <HomeHeader userRole={user_role} />
                  <Menu />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/cart" element={isLoggedIn ? (<><HomeHeader userRole={user_role} /><Cart /></>) : (<Navigate to="/login" />)} />

          <Route path="/track_order" element={isLoggedIn ?(<><HomeHeader userRole={user_role}/><TrackOrder/></>):(<Navigate to="/login"/>)}/>

          <Route path="/forget" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/blog" element={isLoggedIn ? (<><HomeHeader userRole={user_role} /><Blogs /></>) : (<><LandingHeader /><Blogs /></>)} />
          <Route path="/blogs" element={<><LandingHeader /><Blogs /></>} />

          {/* <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} /> */}










          {isLoggedIn && user_role === "client" && (
            <><Route path="/reports" element={<><Header userRole={"client"} /><Reports /> </>}></Route>

              <Route path="/dashboard" element={<><Header userRole={"client"} /> <Dashboard /></>} ></Route>
              <Route path="/petcare" element={<><Header userRole={"client"} /><Petcare /></>}></Route>
              <Route path="/MindRealx" element={<><Header userRole={"client"} /><MindRealx /></>}></Route>
              <Route path="/shop" element={<><Header userRole={"client"} /><Shop /></>}></Route>
              <Route path="/NonBredShop" element={<><Header userRole={"client"} /><NonBredShop /></>}></Route>
              <Route path="/bording" element={<><Header userRole={"client"} /><Bording /></>}></Route>
              <Route path="/medi" element={<><Header userRole={"client"} /><Medi /></>}></Route>
              <Route path="/popupform" element={<><Header userRole={"client"} /><PopupForm /></>}></Route>
              <Route path="/Bath" element={<><Header userRole={"client"} /><Bath /></>}></Route>
              <Route path="/Haircuts" element={<><Header userRole={"client"} /><Haircuts /></>}></Route>
              <Route path="/DoctorList" element={<><Header userRole={"client"} /><DoctorList /></>}></Route>
              <Route path="/addpet" element={<><Header userRole={"client"}/><AddPets /></>}></Route>
              <Route path="/crossing" element={<><Header userRole={"client"}/><Crossing /></>}></Route>
              <Route path="/Pet_grooming" element={<><Header userRole={"client"} /><Petgrooming /></>}></Route></>)}


          {/* <Route path="/Pet_grooming" element={<Pet_grooming/>}></Route> */}

          {/* boarding house manager */}


          {/* <Route path="/Pet_grooming" element={<Pet_grooming/>}></Route> */}


          {/* medi care manager */}


          <><Route path="/Doctors" element={<div className="App">
            <><HomeHeader userRole={"medi_help_manager"} /><Doctor /></>
          </div>} /><Route path="/viewAppointments" element={<><HomeHeader userRole={"medi_help_manager"} /><ViewAppointments /></>} />


            <Route path="/PetProfiles" element={<><HomeHeader userRole={"medi_help_manager"} /><PetProfiles /></>} />

            <Route path="/medi_complaints" element={<><HomeHeader userRole={"medi_help_manager"} /><MediComplaints /></>} />
            <Route path="/medi_dashboard" element={<><HomeHeader userRole={"medi_help_manager"} /><MediDashboard /></>} />


          </>




          {/* boarding house manager */}
          {isLoggedIn && user_role === "boarding_house_manager" && (
            <><Route path="/boarding_dashboard" element={<><HomeHeader userRole={"boarding_house_manager"} /><BoardingHome /></>} />
              <Route path="/boarding_clients" element={<><HomeHeader userRole={"boarding_house_manager"} /><BoardingClients /></>} />
              <Route path="/boarding_pets" element={<><HomeHeader userRole={"boarding_house_manager"} /><BoardingPets /></>} />
              <Route path="/boarding_packages" element={<><HomeHeader userRole={"boarding_house_manager"} /><BoardingPackages /></>} />
              <Route path="/boarding_complains" element={<><HomeHeader userRole={"boarding_house_manager"} /><BoardingComplains /></>} />
            </>
          )}

          {/* <Route path="/addpet" element={<><Header /><AddPets /></>} /> */}


          {/* admin */}
          {isLoggedIn && user_role === "admin" && (
            <><Route path="/admin_dashboard" element={<><HomeHeader userRole={"admin"} /><AdminHome /></>} />
              <Route path="/admin_users" element={<><HomeHeader userRole={"admin"} /><AdminUsers /></>} />
              <Route path="/admin_refund" element={<><HomeHeader userRole={"admin"} /><AdminRefund /></>} />
              <Route path="/admin_complains" element={<><HomeHeader userRole={"admin"} /><AdminComplains /></>} />
            </>
          )}

          <Route path="/profile" element={<Profile />} />




          {/* admin */}
          {/* <Route path="/admin_dashboard" element={<AdminHome />} />
          <Route path="/admin_users" element={<AdminUsers />} />
          <Route path="/admin_refund" element={<AdminRefund />} />
          <Route path="/admin_complains" element={<AdminComplains />} />  */}

          {isLoggedIn && user_role === "care_center_manager" && (
            <>
              <Route path="/caregiverlist" element={<> <HomeHeader userRole={"care_center_manager"} /><Caregiverlist /></>} />
              <Route path="/packages" element={<>   <HomeHeader userRole={"care_center_manager"} /> <Packages /></>} />
              <Route path="/appointments" element={<>  <HomeHeader userRole={"care_center_manager"} />  <Appointments /></>} />
              <Route path="/complaints" element={<>   <HomeHeader userRole={"care_center_manager"} /> <Complaints /></>} /></>
          )}

          {isLoggedIn && user_role === "online_store_manager" && (
            <>
              <Route path="/handling_complain" element={<>   <HomeHeader userRole={"online_store_manager"} />   <Complain /> </>} />
              <Route path="/online_add" element={<>   <HomeHeader userRole={"online_store_manager"} /> <OnlineAdd />  </>} />
              <Route path="/online_home" element={<>  <HomeHeader userRole={"online_store_manager"} />  <Onlinehome /></>} />
              <Route path="/online_client" element={<>   <HomeHeader userRole={"online_store_manager"} />   <Clientorders /> </>} />
            </>
          )}
          {/* company manager */}
          {isLoggedIn && user_role === "company_manager" && (
            <>
              <Route
                path="/company_dashboard"
                element={
                  <>
                    <HomeHeader userRole={"company_manager"} />
                    <CompanyHome />
                  </>
                }
              />
              <Route
                path="/company_clients"
                element={
                  <>
                    <HomeHeader userRole={"company_manager"} />
                    <CompanyClients />
                  </>
                }
              />
              <Route
                path="/company_competitions"
                element={
                  <>
                    <HomeHeader userRole={"company_manager"} />
                    <CompanyCompetitions />
                  </>
                }
              />
              <Route
                path="/company_complains"
                element={
                  <>
                    <HomeHeader userRole={"company_manager"} />
                    <CompanyComplaints />
                  </>
                }
              />
            </>
          )}

        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
