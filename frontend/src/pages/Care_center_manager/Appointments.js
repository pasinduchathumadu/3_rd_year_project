import React, { useState } from "react";
import "../../styles/Care_center_manager/Appointments.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Avatar, Stack, Grid, Box, Tab, Tabs } from "@mui/material";
import profile from "../../assests/profile.jpg";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CPetProfile from "./CPetProfile";


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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein,respond,btn1,btn2,status) {
  return { name, calories, fat, carbs, protein,respond,btn1,btn2,status};
}

const rows = [
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","","","pending"),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","","","pending"),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","","","pending"),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","","","pending"),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","","","pending"),
];

const rows2 = [
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","",""),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","",""),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","",""),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","",""),
  createData("001", "Dog", "Bath", "002", "5.00PM","3000","",""),
];

function Appo() {

  const [age, setAge] = React.useState('');

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };



  const input = new Date();
  const date = input.toDateString();
  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  };

  const [PopupOpen, setPopoup] = useState(false);
  const Submit = () => {
    setPopoup(true)
  }

  return (
    <>
     
      <div className="container1" style={{ marginTop: '4%'}}>
        <Grid
          sx={{
            marginTop: "2%",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{ display: "inline", marginTop: "30px", marginLeft: "2%",width:"33.3%"}}
            >
              <Typography>Care Center Manager</Typography>
              <Typography>Today</Typography>
              <Typography>{date}</Typography>
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
                  color: "black",
                  fontSize: "24px",
                  fontFamily: "fantasy",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Appointments
              </Typography>
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ marginLeft: '150%' }}><Stack direction="row" spacing={2} width={300}>
                <Avatar
                  alt="Travis Howard"
                  src={profile}
                  sx={{  width: 60, height: 60}}
                />
              </Stack>
              </div>
            </div>
          </div>
          <Grid>
            <Box
              sx={{
                width: "100%",
                marginTop: "15px",
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
                  label="Pending Clients' Appointments"
                />
                <Tab
                  sx={{
                    backgroundColor: value === 1 ? "orange" : "white",
                    color: value === 1 ? "white" : "black",
                  }}
                  label="Responded Clients' Appointments"
                />
              </Tabs>
            </Box>
          </Grid>
          {value === 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Category
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Package
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      CareGiver ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Checked in
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Payment(Rs)
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet Profile
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "20%" }}>
                      Assign CareGiver
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Reject
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.fat}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.protein}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.respond}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Button onClick={Submit} sx={{backgroundColor:"orange",color:"white",width:"75px",":hover":{backgroundColor:"orange"}}}>View</Button>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange2}
        >
          <MenuItem value={10}>John Doe</MenuItem>
          <MenuItem value={20}>Mary Poppins</MenuItem>
          <MenuItem value={30}>Stephany Grey</MenuItem>
        </Select>
      </FormControl>
    </Box>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                      <Button sx={{backgroundColor:"red",color:"white",width:"75px",":hover":{backgroundColor:"red"}}}>Reject</Button>
                      </StyledTableCell>
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
                  <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Category
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Package
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      CareGiver ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Checked in
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Payment(Rs)
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Pet Profile
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.fat}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.carbs}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.protein}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.respond}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                      <Button onClick={Submit} sx={{backgroundColor:"orange",color:"white",width:"75px",":hover":{backgroundColor:"orange"}}}>View</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        {PopupOpen && <CPetProfile/>}

      </div>
    </>
  );
}

export default Appo;