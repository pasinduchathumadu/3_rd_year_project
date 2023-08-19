
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

import { Typography, Avatar, Stack, Grid, Box, Tab, Tabs,Button } from "@mui/material";


const Doctors = () => {
  const [modelOpen,setModelOpen]=useState(false);
    const [show,setShow]=useState(false);

    const input = new Date();
    const date = input.toDateString();
  
    const [value, setvalue] = React.useState(0);
    const handleChange = (event, newvalue) => {
      setvalue(newvalue);
    }
  
  
    
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
   
      <div className="row1" style={{marginTop:'4%'}}>
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
            <div style={{ display: 'flex', marginLeft: 'auto',alignItems:'center',justifyContent:'center' }}>
                           
                            <div style={{marginLeft:'1%'}}>
                            <Stack direction="row" spacing={2}>
                             <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} />
                            </Stack>
                            </div>
                           
                        </div>
                    </div>
     
                    <Grid>
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
            <Tab
              sx={{
                backgroundColor: value === 0 ? "orange" : "white",
                color: value === 0 ? "white" : "black",
              }}
              label="Register Doctors"
            />
            <Tab
              sx={{
                backgroundColor: value === 1 ? "orange" : "white",
                color: value === 1 ? "white" : "black",
              }}
              label="Doctors Availability"
            />
          </Tabs>
        </Box>
      </Grid>
    
          
    
             
              
          
             
              {value === 0 && (
        (
              <div id="customers6">
                <Button sx={{backgroundColor:'orange',':hover':{backgroundColor:'orange'},marginLeft:'90%',marginTop:'2%',marginBottom:'1%'}} onClick={()=>setModelOpen(true)} > + Add Doctor</Button>
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Doctor Name</StyledTableCell>
            <StyledTableCell align="right">Phone No</StyledTableCell>
            <StyledTableCell align="right" sx={{textAlign:'center'}}>Email</StyledTableCell>
            <StyledTableCell align="right">Register Number</StyledTableCell>
            <StyledTableCell align="right" sx={{textAlign:'center'}}>Category</StyledTableCell>
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
              <StyledTableCell align="right" sx={{textAlign:'center'}}>01234</StyledTableCell>
              <StyledTableCell align="right" sx={{textAlign:'center'}}>Veterinary specialists</StyledTableCell>
              <StyledTableCell align="right"><Button sx={{backgroundColor:'orange',':hover':{backgroundColor:'orange'},color:'white'}}>Edit</Button></StyledTableCell>
              <StyledTableCell align="right"><Button sx={{backgroundColor:'black',':hover':{backgroundColor:'black'},color:'white'}} onClick={()=>setShow(true)}>Delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
       )
       )}
        {value === 1 && (
          (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="right">Doctor Name</StyledTableCell>
                  <StyledTableCell align="right">Date Available</StyledTableCell>
                  <StyledTableCell align="right" sx={{textAlign:'center'}}>Time</StyledTableCell>
                 
                  <StyledTableCell align="right" sx={{textAlign:'center'}}>Status</StyledTableCell>
                 
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
              
                    <StyledTableCell align="right">Monday-Friday</StyledTableCell>
                    <StyledTableCell align="right" sx={{textAlign:'center'}}>8A.M-12P.M</StyledTableCell>
                    <StyledTableCell align="right" sx={{textAlign:'center'}}>Available</StyledTableCell>
                    <StyledTableCell align="right"><Button sx={{backgroundColor:'orange',':hover':{backgroundColor:'orange'},color:'white'}}>Edit</Button></StyledTableCell>
                    <StyledTableCell align="right"><Button sx={{backgroundColor:'black',':hover':{backgroundColor:'black'},color:'white'}} onClick={()=>setShow(true)}>Delete</Button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )

          )}
{modelOpen && <DoctorsAdd  />}
{show &&<DeleteDoctor />}
                    </div>
             
           
  
    )
}
 
export default Doctors
