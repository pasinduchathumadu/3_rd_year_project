import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid,  Button } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";


const ViewAppointments = () => {
  const navigate = useNavigate("")

  const input = new Date();
  const date = input.toDateString();
  
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

  const [details, setdetails] = useState("")
  const ViewAppointments = async() => {
    try{
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/ViewAppointments`)
      const data = await res.data
      return data

    }catch(err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    ViewAppointments()
    .then((data) =>setdetails(data.data))
    .catch((err) => console.log('There is an internal error'))
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
          <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Medi Appointments</p>
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
         
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Appintment ID</StyledTableCell>
                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                    <StyledTableCell align="center">Vet ID</StyledTableCell>
                    <StyledTableCell align="center">Client Email</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Payment (Rs)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details && details.map((row, index) => 
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align='center'>{row.appointment_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.pet_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.vet_id}</StyledTableCell>
                      <StyledTableCell align="center">{row.client_email}</StyledTableCell>
                      <StyledTableCell align="center">{row.placed_date}</StyledTableCell>
                      <StyledTableCell align="center">{row.payment}.00</StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
        </Grid>
      </div>
    </div>
  );
}

export default ViewAppointments;
