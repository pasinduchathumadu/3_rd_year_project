import * as React from 'react';
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
import DownImage from '../../assests/white2.jpg';
import Button from '@mui/material/Button';


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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Pet bathing', 1500, 6.0, 24, 4.0),
  createData('Mini grooming', 23  , 9.0, 37, 4.3),
 
];

export default function OrderTable() {
  return (
<div style={{ padding: "",display:"flex" }}>
  <div style={{backgroundColor:"#f1f0f0",width:"20%",height:"100vh",color:"white"}}>
    <h2  style={{color:"black",marginTop:"80px",textAlign:"center",width:"90%",marginLeft:"8px",borderRadius:"4px"}}>Your Order Details</h2>
    
    <h1 style={{fontSize:"15px",fontWeight:"1",marginTop:"25px",padding:"10px",color:"gray",marginLeft:"10px"}}>You only can cancel your Appointment with in a Day</h1>
    <Button sx={{ backgroundColor: "black",width:"90%",marginTop:"30px",marginLeft:"10px",'&:hover': { backgroundColor: 'black' } }} variant="contained">Past Orders</Button>

  
  </div>

    <TableContainer component={Paper} sx={{padding:"50px",boxShadow: "none"}}>
      <Table sx={{ minWidth: 700,marginTop:"100px" , border: "none"}} aria-label="customized table">
        <TableHead>
          <TableRow sx={{height:"5vh",fontWeight:"1000"}}>
            <StyledTableCell>Packege details</StyledTableCell> 
            <StyledTableCell align="right">Price(Rs.)</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">PetID</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody sx={{height:"50vh"}}>
          {rows.map((row) => (
            <StyledTableRow key={row.name} sx={{backgroundColor:"#f7f7f7",borderRadius:"8px",marginTop: "10px" }}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell >
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">
            {/* Delete icon */}
            <IconButton onClick={() => handleEdit(row.id)} sx={{color:"black"}}>
              <EditIcon />
            </IconButton>
          </StyledTableCell>  
              <StyledTableCell align="right">
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
