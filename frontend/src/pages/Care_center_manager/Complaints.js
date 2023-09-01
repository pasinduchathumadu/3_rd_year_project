import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/Complaints.css";
import { Button } from "@mui/material";
import ComplaintForm from "./ComplaintForm";
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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

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

function createData(name, calories, fat, carbs, protein, respond) {
  return { name, calories, fat, carbs, protein, respond };
}

const rows = [
  createData("001", "002", "Took too much time", "2023/08/02", "5.00PM", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "5.00PM", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "5.00PM", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "5.00PM", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "5.00PM", ""),
];

const rows2 = [
  createData("001", "002", "Took too much time", "2023/08/02", "We will look into it", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "We will look into it", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "We will look into it", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "We will look into it", ""),
  createData("001", "002", "Took too much time", "2023/08/02", "We will look into it", ""),
];

function Complaints() {


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

  // view my complains
  const [mycomplain, setmycomplain] = useState("")
  const viewmycomplain = async() => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/care_center_manager/viewmycomplain')
      const data = await res.data
      return data

    }catch(err){
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    viewmycomplain()
    .then((data) => setmycomplain(data.data))
    .catch((err) => console.log(err))
  })

  return (
    <>

      <div className="container1" style={{ marginTop: '4%' }}>
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
              style={{ display: "inline", marginTop: "30px", marginLeft: "2%", width: "33.3%" }}
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
                Complaints Section
              </Typography>
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ marginLeft: '150%' }}><Stack direction="row" spacing={2} width={300}>
                <Avatar
                  alt="Travis Howard"
                  src={profile}
                  sx={{ width: 60, height: 60 }}
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
                  label="Clients' Complaints"
                />
                <Tab
                  sx={{
                    backgroundColor: value === 1 ? "orange" : "white",
                    color: value === 1 ? "white" : "black",
                  }}
                  label="My Complaints"
                />
              </Tabs>
            </Box>
          </Grid>

          {/* clients complains */}
          {value === 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
                      Client ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "15%" }}>
                      Complaint ID
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "30%" }}>
                      Complaint
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "20%" }}>
                      Placed Date
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "15%" }}>
                      Placed Time
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "10%" }}>
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
                        <Button onClick={Submit} sx={{ backgroundColor: "orange", color: "white", width: "85px", ":hover": { backgroundColor: "orange" } }}>Respond</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* my complains */}
          {value === 1 && (
            <div>
              <div style={{ marginBottom: '5px', marginLeft: '87%' }}>
                <Button sx={{ backgroundColor: 'black', color: 'white', width: '180px' }}><AddIcon />Add Complains</Button>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ width: "15%" }}>
                        Complaint ID
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "25%" }}>
                        Complaint
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Placed Date
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "20%" }}>
                        Response
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "20%" }}>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows2.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.calories}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.fat}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.carbs}
                        </StyledTableCell>
                        <StyledTableCell align="center"><DeleteIcon sx={{ color: 'red' }} /></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </Grid>

        {PopupOpen && <ComplaintForm />}

      </div>
    </>
  );
}

export default Complaints;
