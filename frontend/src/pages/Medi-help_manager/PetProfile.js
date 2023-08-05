
import React, { useState } from "react";
import {Link} from 'react-router-dom'
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
import Paper from '@mui/material/Paper';
import profile from "../../assests/profile.jpg";
import { Typography, Avatar, Stack } from "@mui/material";


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
       
          
               <div className="row">
          <div style={{ display: 'flex' }}>
                        <div style={{ display: 'inline', marginTop: '20px', marginLeft: '2%',color:'rgb(139, 139, 139)' }}>
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
              style={{
                display: "flex",
                marginTop: "30px",
                width: "33.3%",
                justifyContent:"center"
              }}
            >
             <Typography
                sx={{
                  position:"relative",
                 left:"200px",
                  color: "black",
                  fontSize: "24px",
                  fontFamily: "fantasy",
                  display: "flex",
                  alignItems: "center",
                }}
              >
               Pet Details
              </Typography>
            </div>
                        <div style={{ display: "flex",width:"33.3%"}}>
              <Stack direction="row" spacing={2} width={1500}>
              <img src={profile} alt="profilepicture" className="boarding-profile-picture" />
              </Stack>
            
                           
                        </div>
                    </div>
                <div className="col-md-12">
              
                    <div className="card">
                    <div class="petsearch-container">
                        
    
                        <input type="text" placeholder="Search" name="search" />
                        
                    </div>
                        <div className="card-header">
                       
                        <button className='btnadd' onClick={()=>setModelOpen(true)} > + Add Pet</button>
                    
                        </div>
                        <div id="customers">
                        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
              
              <StyledTableCell align="right"><button className='btnav' onClick={()=>setModel2Open(true)}>AddVaccines</button></StyledTableCell>
              <StyledTableCell align="right"><button className='btnvv' onClick={()=>setModel3Open(true)}>ViewVaccines</button></StyledTableCell>
              <StyledTableCell align="right"><button className='btnvp' onClick={()=>setModel4Open(true)}>ViewProfile</button></StyledTableCell>
              <StyledTableCell align="right"><button className='petbtnedit'>Edit</button></StyledTableCell>
              <StyledTableCell align="right"><button className='petbtndelete' onClick={()=>setShow(true)}>Delete</button></StyledTableCell>

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