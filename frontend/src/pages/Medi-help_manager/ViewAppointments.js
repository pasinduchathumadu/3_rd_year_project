import React, { useState } from "react";
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
import profile from "../../assests/profile.jpg";
import { Typography, Avatar, Stack, Grid, Box, Tab, Tabs, Button } from "@mui/material";
import ViewForm from "./ViewForm";
import NotificationsIcon from '@mui/icons-material/Notifications';


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
                <Tab
                  sx={{
                    backgroundColor: value === 0 ? "orange" : "white",
                    color: value === 0 ? "white" : "black",
                  }}
                  label="All Appointments"
                />
                <Tab
                  sx={{
                    backgroundColor: value === 1 ? "orange" : "white",
                    color: value === 1 ? "white" : "black",
                  }}
                  label="Completed Appointments"
                />
              </Tabs>
            </Box>
          </Grid>
          {value === 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>AppID</StyledTableCell>
                    <StyledTableCell align="right">Doctor Name</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                    <StyledTableCell align="right">Client Name</StyledTableCell>
                    <StyledTableCell align="right">Client PhoneNo</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">View</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                      </StyledTableCell>
                      <StyledTableCell align="right"> Maria Anders</StyledTableCell>
                      <StyledTableCell align="right">2023.08.23</StyledTableCell>
                      <StyledTableCell align="right">12P.M</StyledTableCell>
                      <StyledTableCell align="right">John Deo</StyledTableCell>
                      <StyledTableCell align="right">0123456789</StyledTableCell>
                      <StyledTableCell align="right"><Button sx={{ backgroundColor: '#7a7979', ':hover': { backgroundColor: '#7a7979' }, color: 'white' }} onClick={() => setShow2(true)}>Update</Button></StyledTableCell>
                      <StyledTableCell align="right"><Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white' }}>Edit</Button></StyledTableCell>
                      <StyledTableCell align="right"><Button sx={{ backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, color: 'white' }} onClick={() => setShow(true)}>Delete</Button></StyledTableCell>

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
                    <StyledTableCell>AppID</StyledTableCell>
                    <StyledTableCell align="right">Doctor Name</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                    <StyledTableCell align="right">Client Name</StyledTableCell>
                    <StyledTableCell align="right">Client PhoneNo</StyledTableCell>

                    <StyledTableCell align="right">View</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">

                      </StyledTableCell>
                      <StyledTableCell align="right"> Maria Anders</StyledTableCell>
                      <StyledTableCell align="right">2023.08.23</StyledTableCell>
                      <StyledTableCell align="right">12P.M</StyledTableCell>
                      <StyledTableCell align="right">John Deo</StyledTableCell>
                      <StyledTableCell align="right">0123456789</StyledTableCell>

                      <StyledTableCell align="right"><Button sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white' }}>Edit</Button></StyledTableCell>
                      <StyledTableCell align="right"><Button sx={{ backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, color: 'white' }} onClick={() => setShow(true)}>Delete</Button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>


        {show2 && <ViewForm />}
        {show && <DeleteAppointment />}
      </div>
    </div>
  );
}

export default ViewAppointments;
