import React, { useState } from "react";
import {Link} from 'react-router-dom'
import  '../../styles/Medi-help_manager/viewApp.css';
import DeleteAppoint from "./DeleteAppointment";
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
import { Typography, Avatar, Stack, Button } from "@mui/material";
 
const ViewAppointments = () => {
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
    const location = useLocation();
        const [show,setShow]=useState(false);
        return (
          <div style={{marginTop:'4%'}}><div style={{ display: "flex" }}>
            <div
              style={{ display: "inline", marginTop: "10px", marginLeft: "2%", width: "33.3%" }}
            >
              <Typography>Medi Help Manager</Typography>
              <Typography>Today</Typography>
              <Typography>{date}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
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
                Appointment Details
              </Typography>
            </div>

            <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center',marginRight:'2%'  }}>

              <div style={{ marginLeft: '1%'}}>
                <Stack direction="row" spacing={2}>
                  <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} />
                </Stack>

              </div>

            </div>
          </div><div className="row1">
              <div className="col-md-12">
                <div className="card1">
                  <div className="card-header">
                    <div className="linkButton">
                      <a href="/viewAppointments" target="_blank" style={{ color: 'black' }} className={location.pathname === '/viewAppointments' ? 'active' : ''}>All Appointments</a>
                      <a href="/viewPendingAppointments" target="_blank" className={location.pathname === '/viewPendingAppointments' ? 'active' : ''}>Pending Appointments</a>
                      <a href="/viewCompletedAppointments" target="_blank" className={location.pathname === '/viewCompletedAppointments' ? 'active' : ''}>Completed Appointments</a>
                    </div>
                  </div>
                  <TableContainer sx={{ marginTop: '5%', marginLeft: '10%', marginRight: '2%' }}>
                    <Table sx={{ minWidth: 400, width: '80%' }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>ID</StyledTableCell>
                          <StyledTableCell align="right">AppID</StyledTableCell>
                          <StyledTableCell align="right">Doctor Name</StyledTableCell>
                          <StyledTableCell align="right">Date</StyledTableCell>
                          <StyledTableCell align="right">Time</StyledTableCell>
                          <StyledTableCell align="right">Client Name</StyledTableCell>
                          <StyledTableCell align="right">Client PhoneNo</StyledTableCell>
                          <StyledTableCell align="right">Delete</StyledTableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">

                            </StyledTableCell>

                            <StyledTableCell align="right"> Maria Anders</StyledTableCell>
                            <StyledTableCell align="right">0123456789</StyledTableCell>
                            <StyledTableCell align="right">maria@gmail.com</StyledTableCell>
                            <StyledTableCell align="right">Monday-Friday</StyledTableCell>
                            <StyledTableCell align="right">8A.M -7P.M</StyledTableCell>
                            <StyledTableCell align="right">Monday-Friday</StyledTableCell>
                            <StyledTableCell align="right"><Button sx={{backgroundColor:'black',color:'white',':hover':{backgroundColor:'black'}}} onClick={() => setShow(true)}>Delete</Button></StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {show && <DeleteAppoint />}
                </div>
              </div>

            </div></div>
                
      
        )
    }
 


export default ViewAppointments