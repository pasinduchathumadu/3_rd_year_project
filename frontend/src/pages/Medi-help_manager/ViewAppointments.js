import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeleteAppointment from "./DeleteAppointment";
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import profile from "../../assests/profile.jpg";
import { Typography, Avatar, Stack, Grid, Box, Tab, Tabs, Button } from "@mui/material";
import ViewForm from "./ViewForm";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";


const ViewAppointments = () => {
  const navigate = useNavigate("")
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const input = new Date();
  const date = input.toDateString();
  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  };

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  // connect profile 
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)

  }

  // view pending appointments
  const [pending, setpending] = useState('')
  const PendingAppointments = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/PendingAppointments`)
      const data = await res.data
      return data
    }catch(err){
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    PendingAppointments()
    .then((data) =>setpending(data.data))
    .catch((err) => console.log(err))

  })



  return (
    <div style={{ marginTop: '4%' }}>
      <div className="top">
        <div className="top-line">
          <p>Medi Help Center Manager</p>
          <p className="top-line-text">Today</p>
          <p class="top-line-text">{date}</p>
        </div>
        <div className="top-line">
          <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Appointments</p>
        </div>

        <div className="top-line">
          <NotificationsIcon className="bell-icon" />
          <Button onClick={profile}>
            <img src={getProfilepicturepath("medi_profile.jpg")}
              alt="profilepicture"
              className="boarding-profile-picture" />
          </Button>
        </div>
      </div>

      <div className="container1">
        <Grid
          sx={{
            marginTop: "2%",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%",
          }}
        >

          <Grid>
            <Box
              sx={{
                width: "100%",
                marginTop: "25px",
                marginBottom: "1%",
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
                <Tab
                  sx={{
                    backgroundColor: value === 0 ? "orange" : "white",
                    color: value === 0 ? "white" : "black",
                  }}
                  label="Pending Appointments"
                />
                <Tab
                  sx={{
                    backgroundColor: value === 1 ? "orange" : "white",
                    color: value === 1 ? "white" : "black",
                  }}
                  label="Completed/ Uncompleted Appointments"
                />
              </Tabs>
            </Box>
          </Grid>
          {value === 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Appintment ID</StyledTableCell>
                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                    <StyledTableCell align="center">Vet ID</StyledTableCell>
                    <StyledTableCell align="center">Client Email</StyledTableCell>
                    <StyledTableCell align="center">Contact Number</StyledTableCell>
                    {/* <StyledTableCell align="center">Doctor Name</StyledTableCell> */}
                    <StyledTableCell align="center">Date</StyledTableCell>
                    {/* <StyledTableCell align="center">Time</StyledTableCell> */}
                    <StyledTableCell align="center">Payment (Rs)</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pending && pending.map((row, index) => (
                    <StyledTableRow key={row.appointment_id}>
                      <StyledTableCell component="th" scope="row" align='center'>{row.appointment_id}</StyledTableCell>
                      <StyledTableCell align="center"> pet id</StyledTableCell>
                      <StyledTableCell align="center">{row.vet_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.client_email}</StyledTableCell>
                      <StyledTableCell align="center">{row.contact_number}</StyledTableCell>
                      {/* <StyledTableCell align="center"></StyledTableCell> */}
                      <StyledTableCell align="center">{row.placed_date}</StyledTableCell>
                      {/* <StyledTableCell align="center">12PM</StyledTableCell> */}
                      <StyledTableCell align="center">payment</StyledTableCell>
                      <StyledTableCell align="right"><Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white' }}>Completed</Button></StyledTableCell>
                      <StyledTableCell align="right"><Button sx={{ backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, color: 'white' }}>Uncompleted</Button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {value === 1 && (
            <>
              <div style={{marginLeft:'89%', marginBottom:'1%'}}>
                <Box sx={{ width: '150px' }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"

                      variant='filled'
                      label="clients"
                      // onChange={handleChange}
                      l
                      sx={{ fontSize: '11px' }}
                    >
                      <MenuItem value={1}>All</MenuItem>
                      <MenuItem value={2}>Completed</MenuItem>
                      <MenuItem value={3}>Uncompleted</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Appintment ID</StyledTableCell>
                      <StyledTableCell align="center">Pet ID</StyledTableCell>
                      <StyledTableCell align="center">Client</StyledTableCell>
                      <StyledTableCell align="center">Contact Number</StyledTableCell>
                      <StyledTableCell align="center">Doctor Name</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                      <StyledTableCell align="center">Time</StyledTableCell>
                      <StyledTableCell align="center">Payment (Rs)</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      {/* <StyledTableCell align="center">Client PhoneNo</StyledTableCell> */}

                      {/* <StyledTableCell align="center">Generate Report</StyledTableCell> */}
                      {/* <StyledTableCell align="center">Delete</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row" align="center">1</StyledTableCell>
                        <StyledTableCell align="center">  2</StyledTableCell>
                        <StyledTableCell align="center"> Maria Anders</StyledTableCell>
                        <StyledTableCell align="center">0123456789</StyledTableCell>
                        <StyledTableCell align="center">John Deo</StyledTableCell>
                        <StyledTableCell align="center">2023.08.23</StyledTableCell>
                        <StyledTableCell align="center">12PM</StyledTableCell>
                        <StyledTableCell align="center">1200.00</StyledTableCell>


                        <StyledTableCell align="center"><Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white' }}>Generate Report</Button></StyledTableCell>
                        {/* <StyledTableCell align="center"><Button sx={{ backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, color: 'white' }} onClick={() => setShow(true)}>Delete</Button></StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>


        {show2 && <ViewForm />}
        {show && <DeleteAppointment />}
      </div>
    </div>
  );
}

export default ViewAppointments;
