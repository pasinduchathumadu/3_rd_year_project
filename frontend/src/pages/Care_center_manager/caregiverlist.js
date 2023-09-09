import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/caregiverlist.css";

import AddIcon from "@mui/icons-material/Add";

import Regicaregiver from "./Regicaregiver";
import CaregiverProfile from "./CaregiverProfile"
import {
  Typography, Stack, Card, CardActionArea, CardMedia, CardContent, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Alert
} from "@mui/material";

import { Grid, Box, Tab, Tabs, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";


function Caregiverlist() {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [menu, setemp] = useState([])
  const [id, setid] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error , seterror ] = useState(false)
  const [message , setmessage ] = useState("")


  const openPopup = (id) => {
    setid(id)
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    seterror(false)
    setIsPopupOpen(false);
  };





  const input = new Date();
  const date = input.toDateString();

  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  };

  const leave_submit = async () => {
    const selectedStartDate = new Date(dateStart);
    const selectedEndDate = new Date(dateEnd);
    if(dateStart === "" || dateEnd === ""){
      seterror(true)
      setmessage("Please Filled The Fields!!")
      return
    }
    if (selectedStartDate < input || selectedEndDate < input) {
      seterror(true)
      setmessage("Please Find Future Date!!")
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/pet_care/care_center_manager/leave', {
        id,
        dateStart,
        dateEnd
      })
      if (res.data.message === "updated") {
        closePopup()

      }

    } catch (err) {
      console.log(err)
    }
  }

  const navigate = useNavigate("")
 
  const profile = () => {
    navigate("/profile")
  }
 
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };

  const get_employee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/get_employee`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    get_employee()
      .then((data) => setemp(data.data))
      .catch((err) => console.log(err))
  })

  return (
    <>
      <div style={{ display: "flex", marginTop: '4%' }}>
        <div
          style={{
            display: "inline",
            marginTop: "30px",
            marginLeft: "2%",
            width: "33.3%",
          }}
        >
          <Typography>Care Center Manager</Typography>
          <Typography>Today</Typography>
          <Typography>{date}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            width: "33.3%",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: "24px",
              fontFamily: "fantasy",
              display: "flex",
              alignItems: "center",
            }}
          >
            CareGivers
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: "33.3%",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginLeft: '130%' }}><Stack direction="row" spacing={2} width={300}>
              <NotificationsIcon />
              <Button onClick={profile}>
                <img
                  alt="profilepicture"
                  src={getProfilepicturepath("carecenter_profile.png")}
                  style={{ width: 'auto', height: '60px' }}
                />
              </Button>
            </Stack>
            </div>
          </div>
        </div>
      </div>
      <Grid sx={{ marginLeft: '100px' }}>
        <Box
          sx={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "2%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Tab Component"
            indicatorColor="transparent"
            sx={{ borderRadius: "10px" }}
          >
            <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black" }} label="Pet Grooming Care Givers" />
            <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black", }} label=" Trainning & Exercising Employees" />
          </Tabs>
        </Box>
      </Grid>

      {/* pet grooming  */}
      {value === 0 && (
        <div className="full-page">
          <div className="maintopic">
            <button className="mainbutton" onClick={() => setModelOpen(true)}>
              ADD NEW CAREGIVER
              <AddIcon className="icon-plus" />
            </button>
          </div>

          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>

            {menu.filter((menu, index) => menu.type !== "training").map((menu, index) => (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc(menu.img)}
                    alt={menu.first_name} />
                  <CardContent>
                    <Typography variant="h5" gutterBottom component={"div"}>
                      {menu.first_name + " " + menu.last_name}
                    </Typography>
                    <Typography variant="body2">{menu.email}</Typography>
                    <Typography variant="body2">{menu.contact_number}</Typography><br />
                    <Typography variant="body2" sx={{ color: "black", marginBottom: '9px' }}>Grooming Type - {menu.type}</Typography>
                    <Button
                      sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: "black" } }}
                      onClick={() => {
                        openPopup(menu.emp_id);
                      }}
                    >Add Leave</Button>
                  </CardContent>
                </CardActionArea>
              </Card>

            ))}</Box>
          {modelOpen && <Regicaregiver />}
          {modelOpen2 && <CaregiverProfile />}



        </div>
      )}

      {value === 1 && (
        // trianing employees
        <div className="full-page">
          <div className="maintopic">
            <button className="mainbutton" onClick={() => setModelOpen(true)}>
              ADD NEW CAREGIVER
              <AddIcon className="icon-plus" />
            </button>
          </div>

          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>

            {menu.filter((menu, index) => menu.type === "training").map((menu, index) => (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc(menu.img)}
                    alt={menu.first_name} />
                  <CardContent>
                    <Typography variant="h5" gutterBottom component={"div"}>
                      {menu.first_name + " " + menu.last_name}
                    </Typography>
                    <Typography variant="body2">{menu.email}</Typography>
                    <Typography variant="body2">{menu.contact_number}</Typography><br />
                    <Typography variant="body2" sx={{ color: "black", marginBottom: '9px' }}>Grooming Type - {menu.type}</Typography>

                    <Button
                      sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: "black" } }}
                      onClick={() => {
                        openPopup(menu.emp_id);
                      }}
                    >Add Leave</Button>

                  </CardContent>
                </CardActionArea>
              </Card>

            ))}</Box>

          {modelOpen && <Regicaregiver />}
          {modelOpen2 && <CaregiverProfile />}


        </div>
      )}
      <Dialog open={isPopupOpen} onClose={closePopup} fullWidth>
        <DialogTitle>Add Leave</DialogTitle>
        <DialogContent >
          <DialogContentText sx={{ paddingBottom: '1%' }}>Enter Leave Details:</DialogContentText>
          <Typography>Start Date</Typography>
          <TextField
            placeholder="Date Start"
            type="date"
            fullWidth
           
            onChange={(e) => setDateStart(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Typography>End Date</Typography>
          <TextField
            placeholder="Date End"
            type="date"
            fullWidth
        
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </DialogContent>
        {error &&(
           <Stack sx={{ width: '75%',marginLeft:'3%' }} spacing={2}>
          
           <Alert sx={{width:'75%'}} severity="warning">{message}</Alert>
          
         </Stack>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Handle leave submission here
            leave_submit()
          }}
          sx={{ margin: '16px' }}
        >
          Submit
        </Button>
      </Dialog>
    </>
  );
}

export default Caregiverlist;
