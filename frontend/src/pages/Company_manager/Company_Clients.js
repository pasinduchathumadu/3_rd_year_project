import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router";
import axios from "axios";
import { format } from 'date-fns';


function Company_Clients() {
  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  const date = new Date()
  const currentdate = date.toDateString();
  const [error, seterror] = useState(false)
  // const currentDate = new Date()
  const date_today = format(date, 'yyy-MM-dd')
  const monthBeforeFromToday = new Date()
  monthBeforeFromToday.setDate(date.getDate() - 30)
  const date_month = format(monthBeforeFromToday, 'yyy-MM-dd')
  const [offer, setoffer] = useState("")
  const [ message , setmessage ] = useState('')
  const offeritem = async () => {
   
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/offer/${offer}`)
      if (res.data.message === "updated") {
        seterror(true);
        setmessage('Successfully Updated!!')
      }
    }
    catch (err) {
      console.log(err)
    }
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //modal


  // display clients details
  const [details, setdetails] = useState("")
  const [open, setOpen] = React.useState(false);
  const categorizeClients = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/categorizeClients`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    categorizeClients()
      .then((data) => setdetails(data.data))
      .catch((err) => console.log(err))
  })
  const addoffer = () => {
    seterror(false)
    setOpen(true);

  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
            {currentdate}
          </Typography>
        </Box>
        <Stack justifyContent="center" alignItems="center">
          <Typography color="textPrimary" fontWeight="bold" fontSize={"25px"}>
            Clients Categorization - Online Store
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <NotificationsIcon className="bell-icon" />
          <Button onClick={profile}><img src={getProfilepicturepath("company_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
        </Stack>
      </Stack>

      <Box padding={2}>
        <Box padding={2}>
          <div style={{ marginBottom: '1%', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography>Considered Time Period :- <span sx={{ fontWeight: 'bold' }}>{date_month} - {date_today}</span> </Typography>
            <div style={{ marginLeft: 'auto' }}>
           <Button onClick={addoffer} sx={{ width: '100%', backgroundColor: 'black', color: 'white', "&:hover": { backgroundColor: "black" } }}>  <AddIcon sx={{marginRight:'1px'}}/> Add The Offer</Button>
            </div>


          </div>



          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Client ID </StyledTableCell>
                  <StyledTableCell align="center">Email Address </StyledTableCell>
                  <StyledTableCell align="center">Completed Orders </StyledTableCell>
                  <StyledTableCell align="center">Total Price (Rs.)</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {details && details.map((menu, index) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row" align="center">{menu.client_id}

                    </StyledTableCell>
                    <StyledTableCell align="center">{menu.order_email}</StyledTableCell>
                    <StyledTableCell align="center">{menu.order_count}</StyledTableCell>
                    <StyledTableCell align="center">{menu.total_amount}.00</StyledTableCell>

                    <StyledTableCell align="center">{menu.status}</StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

         
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Offer Rate For Premium Users"}
         
           
        
        </DialogTitle>
        <DialogContent>
          <form action="">

            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Offer Rate"
              onChange={(e) => setoffer(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />


          </form>
        </DialogContent>
        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>

            <Alert severity="success">{message}</Alert>
          </Stack>
        )}
        <DialogActions>

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={offeritem}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Company_Clients;
