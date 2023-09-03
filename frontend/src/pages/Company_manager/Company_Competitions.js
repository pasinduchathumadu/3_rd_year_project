import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, IconButton, TextField } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfilePicture from "../../assests/profile-picture.png";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';


function Company_Competitions() {
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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [com, setCom] = useState([]);
  const [second, setSecond] = useState(false);
  const [id ,setid] = useState("")


  const getCompetitions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/pet_care/company_manager/get_competitions"
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
 const close = ()=>{
  setSecond(false)
 }
  useEffect(() => {
    getCompetitions()
      .then((data) => setCom(data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (id) => {
    setid(id)
   
    setSecond(true);
  };

  return (
    <>
      
        <div >
          <Stack
            direction="row"
            justifyContent="space-between"
            padding={2}
            sx={{ marginTop: "4%" }}
          >
            <Box>
              <Typography variant="inherit" color="textSecondary">
                Company Manager
              </Typography>
              <Typography variant="inherit" color="textSecondary">
                Today
              </Typography>
              <Typography variant="inherit" color="textSecondary">
                08 August 2023
              </Typography>
            </Box>
            <Stack justifyContent="center" alignItems="center">
              <Typography color="textPrimary" fontWeight="bold" fontSize={"25px"}>
                Company Competitions
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <NotificationsIcon className="bell-icon" />
              <img
                src={ProfilePicture}
                alt="profilepicture"
                className="boarding-profile-picture"
              />
            </Stack>
          </Stack>
          <Box padding={2}>
            <Box>
              <Button sx={{color:'white', backgroundColor:'black', marginBottom:'10px', ':hover':{backgroundColor:'black'}}}><AddIcon />Add New Competition</Button>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Competition ID </StyledTableCell>
                    <StyledTableCell>Competition Name</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Start Time</StyledTableCell>
                    <StyledTableCell>Venue</StyledTableCell>
                    <StyledTableCell> Competition Post</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {com && com.map((row) => (
                    <StyledTableRow key={row.notice_id}>
                      <StyledTableCell component="th" scope="row">
                        {row.notice_id}
                      </StyledTableCell>
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Button onClick={()=>handleClick(row.notice_id)}>View</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>

      {second && (
         <div style={{ backdropFilter: 'blur(3px)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form style={{marginTop:'6%'}}>
        <Box sx={{backgroundColor:"white"}} p={5} >
<IconButton onClick={close} sx={{float:'right'}}>
  <CloseIcon/>
</IconButton>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }} mt={5}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1581753418434-51c11169a3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            sx={{ width: 220, height: 320, backgroundSize: "cover" }}
            variant="rounded"
          />

          <Box>
          {com.filter((menu,index)=>menu.notice_id === id).map((menu,index)=>(
            <Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }} >
             
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Competition ID"
                value={menu.notice_id}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Competition Name"
                value={menu.name}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Date"
                value={menu.date}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Time"
                value={menu.time}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>

            <Stack sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Organized by"
                value={"VA Group"}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Venue"
                value={menu.venu}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
          </Stack>
                  
                  ))}
            
          </Box>
        </Stack>
          </Box>
        </form>
        </div>
      )}
    </>
  );
}

export default Company_Competitions;
