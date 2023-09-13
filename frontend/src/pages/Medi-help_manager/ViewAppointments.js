import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import DeleteAppointment from "./DeleteAppointment";
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
    PendingAppointments()
    
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

  // connect profile 
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)

  }
  const pendingtoCompeleted = async(id) => {

    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/pending/${id}`)


      if (res.data.message === 'There is an internal error') {
        setmessage1('There is an internal error')
        seterror1(true)
      } else if (res.data.message === 'completed') {
        setvalue(1)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }
   const pendingtoUncompeleted = async(id) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/pending1/${id}`)

      if (res.data.message === 'There is an internal error') {
        setmessage2('There is an internal error')
        seterror2(true)
      } else if (res.data.message === 'uncompleted') {
        setvalue(1)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // view pending appointments
  const [pending, setpending] = useState('')
  const PendingAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/PendingAppointments`)
      setpending(res.data.data)
 
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    PendingAppointments()

  },[])
  // view completed and uncompleted appointments
  const [app, setapp] = React.useState('1')
  const handleChange1 = (event) => {
    setapp(event.target.value)

    completedAppointments()
  };

  const [details, setdetails] = useState('')
  const completedAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/completedAppointments/${app}`)
      setdetails(res.data.data)

    } catch (err) {
      console.log(err)
      console.log(app)
    }
  }
  useEffect(() => {
    completedAppointments()
  }, [app])

  // pending => completed
  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState('')


  // pending => uncompleted
  const [error2, seterror2] = useState(false)
  const [message2, setmessage2] = useState('')
 

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
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Payment (Rs)</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pending && pending.map((row, index) => 
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align='center'>{row.appointment_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.pet_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.vet_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.client_email}</StyledTableCell>
                      <StyledTableCell align="center">{row.contact_number}</StyledTableCell>
                      <StyledTableCell align="center">{row.placed_date}</StyledTableCell>
                      <StyledTableCell align="center">payment</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button onClick={() => pendingtoCompeleted(row.appointment_id)} sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white' }}>
                          Completed
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button onClick={() => pendingtoUncompeleted(row.appointment_id)} sx={{ backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, color: 'white' }}>
                          Uncompleted
                        </Button>
                      </StyledTableCell>

                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {value === 1 && (
            <>
              <div style={{ marginLeft: '89%', marginBottom: '1%' }}>
                <Box sx={{ width: '150px' }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"

                      variant='filled'
                      label="appointments"
                      onChange={handleChange1}
                      l
                      sx={{ fontSize: '12px' }}
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
                      <StyledTableCell align="center"> Vet ID</StyledTableCell>
                      <StyledTableCell align="center">Client Email</StyledTableCell>
                      <StyledTableCell align="center">Contact Number</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                      <StyledTableCell align="center">Payment (Rs)</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details && details.map((row1, index) => (
                      <StyledTableRow key={row1.appointment_id}>
                        <StyledTableCell component="th" scope="row" align="center">{row1.appointment_id}</StyledTableCell>
                        <StyledTableCell align="center">{row1.pet_id}</StyledTableCell>
                        <StyledTableCell align="center">{row1.vet_id}</StyledTableCell>
                        <StyledTableCell align="center">{row1.client_email}</StyledTableCell>
                        <StyledTableCell align="center">{row1.contact_number}</StyledTableCell>
                        <StyledTableCell align="center">{row1.placed_date}</StyledTableCell>
                        <StyledTableCell align="center">payment</StyledTableCell>
                        {row1.appointment_status === 'completed' ? (
                          <StyledTableCell align="center"><Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white' }}>Generate Report</Button></StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">Uncompleted Appointment</StyledTableCell>
                        )
                        }
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>


        {/* {show2 && <ViewForm />} */}
        {/* {show && <DeleteAppointment />} */}
      </div>
    </div>
  );
}

export default ViewAppointments;
