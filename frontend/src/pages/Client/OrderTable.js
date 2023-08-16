import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';



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
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const handleDelete = (rowId) => {
  // Implement your delete logic here
};
const handleEdit = (rowId) => {
  // Implement your edit logic here
};





export default function OrderTable() {

  const [row,setorder] = useState([])

  const get_orders = async(req,res,next)=>{
    try{
      const res = await axios.get('http://localhost:5000/pet_care/user/care_orders')
      const data = await res.data
      return data

    }catch(err){
      console.log("There is an internel error")
    }
  }

  useEffect(()=>{
    get_orders()
    .then((data)=>setorder(data.data))
  })
  
  useEffect(() => {
    AOS.init({ duration: 450   });
  }, []);

  return (
<div style={{ padding: "",display:"flex" }}data-aos="zoom-in">
  <div style={{backgroundColor:"#f1f0f0",width:"20%",height:"100vh",color:"white"}}>
    <h2  style={{color:"black",marginTop:"80px",textAlign:"center",width:"90%",marginLeft:"8px",borderRadius:"4px"}}>Your Order Details</h2>
    
    <h1 style={{fontSize:"15px",fontWeight:"1",marginTop:"25px",padding:"10px",color:"gray",marginLeft:"10px"}}>You only can cancel your Appointment with in a Day</h1>
    <Button sx={{ backgroundColor: "black",width:"90%",marginTop:"30px",marginLeft:"10px",'&:hover': { backgroundColor: 'black' } }} variant="contained">Past Orders</Button>

  
  </div>

    <TableContainer component={Paper} sx={{padding:"50px",boxShadow: "none"}}>
      <Table sx={{ minWidth: 700,marginTop:"100px" , border: "none"}} aria-label="customized table">
        <TableHead>
          <TableRow sx={{height:"5vh",fontWeight:"1000"}}>
            <StyledTableCell>Appointment ID</StyledTableCell> 
            <StyledTableCell align="left">Placed Date</StyledTableCell>
            <StyledTableCell align="left">Package Name</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Edit</StyledTableCell>
            <StyledTableCell align="left">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody >
          {row && row.map((row) => (
            <StyledTableRow key={row.name} >
              
              <StyledTableCell align="left">{row.appointment_id}</StyledTableCell>
              <StyledTableCell align="left">{row.placed_date}</StyledTableCell>
              <StyledTableCell align="left">{row.package_name}</StyledTableCell>
              <StyledTableCell align="left">{row.price}</StyledTableCell>
              <StyledTableCell align="left">
            {/* Delete icon */}
            <IconButton onClick={() => handleEdit(row.id)} sx={{color:"black"}}>
              <EditIcon />
            </IconButton>
          </StyledTableCell>  
              <StyledTableCell align="left">
            {/* Delete icon */}
            <IconButton onClick={() => handleDelete(row.id)} sx={{color:"red"}}>
              <DeleteIcon />
            </IconButton>
          </StyledTableCell>
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
