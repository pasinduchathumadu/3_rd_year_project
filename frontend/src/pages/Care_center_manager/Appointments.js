import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/Appointments.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Stack, Grid, Box, Tab, Tabs } from "@mui/material";
import axios from 'axios'
import CPetProfile from "./CPetProfile";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router";
// import NotificationsIcon from '@mui/icons-material/Notifications';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));









function Appo() {

 
  const [rows , setgrooming ] = useState([])
  const [ rows2 , settraining ] = useState([])

  
  const get_groom_apo = async()=>{
    try{
      const res = await axios.get('http://localhost:5000/pet_care/care_center_manager/get_groom_apo')
      const data = await res.data
      return data
    }catch(err){
      console.log(err)
    }
  }
  const pet_training = async()=>{
    try{
      const res = await axios.get('http://localhost:5000/pet_care/care_center_manager/get_training')
      const data = await res.data
      return data
  
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    get_groom_apo()
    .then((data)=>setgrooming(data.data))
    .catch((err)=>console.log(err))
  })
  useEffect(()=>{
    pet_training()
    .then((data)=>settraining(data.data))
    .catch((err)=>console.log(err))
  })

  const input = new Date();
  const date = input.toDateString();
  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  };

  const [PopupOpen, setPopoup] = useState(false);
  const Submit = () => {
    setPopoup(true)
  }

  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }
   // get profile picture
   const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
}

  return (
    <>
      <div className="container1" style={{ marginTop: '4%' }}>
        <Grid
          sx={{
            marginTop: "2%",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{ display: "inline", marginTop: "30px", marginLeft: "2%", width: "33.3%" }}
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
                justifyContent: "center"
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
                Appointments
              </Typography>
            </div>
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
          <Grid>
            <Box
              sx={{
                width: "100%",
                marginTop: "15px",
                marginBottom: "5%",
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
                <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black" }} label="Pet Grooming Appointments" />
                <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black", }} label="Dog Trainning & Exercising Appointments" />
                <Tab sx={{ backgroundColor: value === 2 ? "orange" : "white", color: value === 2 ? "white" : "black", }} label="Mind Relaxing Appointments" />
              </Tabs>
            </Box>
          </Grid>

          {value === 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" >
                     Appointment ID
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Client Email
                    </StyledTableCell>
                    <StyledTableCell align="left" >
                      Appointment Status
                    </StyledTableCell>
                    <StyledTableCell align="left" >
                     Placed Date
                    </StyledTableCell>
                    <StyledTableCell align="left" >
                      Payment(Rs)
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      Cancel Date
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.appointment_id}>
                      <StyledTableCell component="th" scope="row">
                        {row.appointment_id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.client_email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.appointment_status}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.placed_date}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.cancel_date}
                      </StyledTableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {value === 1 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Client Email
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Category
                    </StyledTableCell>
                    {/* <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Package
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      CareGiver ID
                    </StyledTableCell> */}
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Selected Time Slot
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                     Trainning Day
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Payment
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet Profile
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => (
                    <StyledTableRow key={row.name}>
                       <StyledTableCell align="left">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.client_email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.breed}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.start+" - "+row.end}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.day}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.price}.00
                      </StyledTableCell>
                     
                      <StyledTableCell align="left">
                        <Button onClick={Submit} sx={{ backgroundColor: "orange", color: "white", width: "75px", ":hover": { backgroundColor: "orange" } }}>View</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {value === 2 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Client ID
                    </StyledTableCell>
                    {/* <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet ID
                    </StyledTableCell> */}
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Category
                    </StyledTableCell>
                    {/* <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Package
                    </StyledTableCell> */}
                    {/* <StyledTableCell align="left" sx={{ width: "10%" }}>
                      CareGiver ID
                    </StyledTableCell> */}
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Selected Time Slot
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Payment(Rs)
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Appointment Status
                    </StyledTableCell>
                    {/* <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet Profile
                    </StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.client_email}
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">
                        {row.calories}
                      </StyledTableCell> */}
                      <StyledTableCell align="left">
                        {row.breed}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.day}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.price}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.start + row.end}
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">
                        <Button onClick={Submit} sx={{ backgroundColor: "orange", color: "white", width: "75px", ":hover": { backgroundColor: "orange" } }}>View</Button>
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        {PopupOpen && <CPetProfile />}

      </div>
    </>
  );
}

export default Appo;