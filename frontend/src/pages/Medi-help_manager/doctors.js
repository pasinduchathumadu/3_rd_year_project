
import React, { useState } from "react";

import  '../../styles/Medi-help_manager/doctorsStyles.css';
import DeleteDoctor from "./DeleteDoctor";

import DoctorsAdd from "./AddDoctors";



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
 


const Doctors = () => {
  const [modelOpen,setModelOpen]=useState(false);
    const [show,setShow]=useState(false);

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
    return (
   
      <div className="row1">
          <div style={{ display: 'flex' }}>
                        <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
                            <Typography>
                                 Medi Care Manager
                            </Typography>
                            <Typography>
                                Today
                            </Typography>
                            <Typography>
                                {date}
                            </Typography>
                        </div>
                        <div
             style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}
            >
             <Typography
               sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
                Doctor Details
              </Typography>
            </div>
                    
                    </div>
      <div className="col-md-12">
      
          <div className="card1">
       
              <div className="card-header1">
             
              <Button sx={{backgroundColor:'orange',':hover':{backgroundColor:'orange'},marginLeft:'90%',marginTop:'2%',marginBottom:'1%'}} onClick={()=>setModelOpen(true)} > + Add Doctor</Button>
          
              </div>
              <div id="customers6">
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Doctor Name</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Available Date</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
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
              <StyledTableCell align="right"><button className='docbtnedit'>Edit</button></StyledTableCell>
              <StyledTableCell align="right"><button className='docbtndelete' onClick={()=>setShow(true)}>Delete</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
{modelOpen && <DoctorsAdd  />}
{show &&<DeleteDoctor />}
                    </div>
                </div>
                
            </div>
           
  
    )
}
 
export default Doctors