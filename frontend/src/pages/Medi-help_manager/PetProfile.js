
import React, { useState } from "react";

import  '../../styles/Medi-help_manager/PetProfile.css';
import DeletePet from "./DeletePet";
import AddPet from "./AddPet";
import AddVaccine from "./AddVaccine";
import ViewVaccine from "./ViewVaccine";  
import ViewProfile from "./ViewProfile";    
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import profile from "../../assests/profile.jpg";
import { Typography, Avatar, Stack, Button } from "@mui/material";


const PetProfile = () => {
    const [show,setShow]=useState(false);
    const [model2Open,setModel2Open]=useState(false);
    const [model3Open,setModel3Open]=useState(false);
    const [model4Open,setModel4Open]=useState(false);
    const [modelOpen,setModelOpen]=useState(false);



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
              Pet Details
              </Typography>
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto',alignItems:'center',justifyContent:'center',marginRight:'4%' }}>
                           
                            <div style={{marginLeft:'1%'}}>
                            <Stack direction="row" spacing={2}>
                             <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} />
                            </Stack>
                            </div>
                           
                        </div>
                    </div>
                <div className="col-md-12">
              
                    <div className="card1">
                   
                        <div className="card-header">
                       
                        <Button sx={{width:'10%',color:'black',marginLeft:'78%',backgroundColor:'orange',':hover':{backgroundColor:'orange'}}} onClick={()=>setModelOpen(true)} > + Add Pet</Button>
                    
                        </div>
                        <div >
                        <TableContainer sx={{marginLeft:'8%',marginRight:'2%',marginTop:'2%'}}>
      <Table sx={{ minWidth: 700,width:'80%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Species</StyledTableCell>
            <StyledTableCell align="right">Pet Name</StyledTableCell>
            <StyledTableCell align="right">Owner Name</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Add Vaccination</StyledTableCell>
            <StyledTableCell align="right">View Vaccination</StyledTableCell>
            <StyledTableCell align="right">View PetProfile</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                
              </StyledTableCell>
             
              <StyledTableCell align="right"> Dog</StyledTableCell>
             <StyledTableCell align="right">Chewy</StyledTableCell>
              <StyledTableCell align="right">John Deo</StyledTableCell>
              <StyledTableCell align="right">0123456789</StyledTableCell>
              
              <StyledTableCell align="right"><Button sx={{backgroundColor:'orange',':hover':{backgroundColor:'orange'},color:'white'}} onClick={()=>setModel2Open(true)}>AddVaccines</Button></StyledTableCell>
              <StyledTableCell align="right"><Button sx={{backgroundColor:'#313130',':hover':{backgroundColor:'#313130'},color:'white'}}  onClick={()=>setModel3Open(true)}>ViewVaccines</Button></StyledTableCell>
              <StyledTableCell align="right"><Button sx={{backgroundColor:'#bbbbbb',':hover':{backgroundColor:'#bbbbbb'},color:'white'}}  onClick={()=>setModel4Open(true)}>ViewProfile</Button></StyledTableCell>
              <StyledTableCell align="right"><Button sx={{backgroundColor:'orange',':hover':{backgroundColor:'orange'},color:'white'}} >Edit</Button></StyledTableCell>
              <StyledTableCell align="right"><Button sx={{backgroundColor:'black',':hover':{backgroundColor:'black'},color:'white'}} onClick={()=>setShow(true)}>Delete</Button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
{modelOpen && <AddPet />}
{model2Open && <AddVaccine />}
{model3Open && <ViewVaccine />}
{model4Open && <ViewProfile />}
{show &&<DeletePet />}
                    </div>
                </div>
                
            </div>
            
  
    )
}
 
export default PetProfile