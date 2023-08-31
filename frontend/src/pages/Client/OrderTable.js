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

import Dialog from "./Dialog";
import EditForm from "./FormPopUp";

import { format } from 'date-fns'

import Button from '@mui/material/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Alert, Box, DialogContent, Stack, Typography } from '@mui/material';




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








export default function OrderTable() {

  const [popup, setpopup] = useState(false)

  const [row, setorder] = useState([])
  const [medi_orders, setmediorder] = useState([])
  const [grooming, setgrooming] = useState(true)
  const [medi, setmedi] = useState(false)
  const [trainning_order, settraining] = useState(false)
  const [displaytrainning, settrainingorders] = useState([])

  const [message, setmessage] = useState("")
  const [error, seterror] = useState(false)

  const input = new Date()
  const date = format(input, 'yyy-MM-dd')


  const confirmDelete = async (rowId) => {
    const res = await axios.post(`http://localhost:5000/pet_care/user/delete_appointment`, {
      rowId,
      date

    })
    if (res.data.message === "deleted") {
      seterror(true)
      setmessage("Successfully Deleted!!!")
      setpopup(true)

    }
    else if (res.data.message === "cannot deleted") {
      seterror(true)
      setmessage("Can not be deleted!!!")
      setpopup(true)

    }

  };




  const get_medi_orders = async () => {
    const res = await axios.get('http://localhost:5000/pet_care/user/get_medi_orders')
    const data = await res.data
    return data;
  }
  const medi_order = () => {
    setmedi(true)
    setgrooming(false)
    settraining(false)
  }
  const grooming_orders = () => {
    setgrooming(true)
    setmedi(false)
    settraining(false)
  }
  const trainning = () => {
    setgrooming(false)
    setmedi(false)
    settraining(true)

  }

  const get_training = async (req, res, next) => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/user/training_orders')
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)

    }
  }
  const get_orders = async (req, res, next) => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/user/care_orders')
      const data = await res.data
      return data

    } catch (err) {
      console.log("There is an internel error")
    }
  }

  useEffect(() => {
    get_training()
      .then((data) => settrainingorders(data.data))
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    get_orders()
      .then((data) => setorder(data.data))
      .catch((err) => console.log(err))
  })
  useEffect(() => {
    get_medi_orders()
      .then((data) => setmediorder(data.data))
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    AOS.init({ duration: 450 });
  }, []);

  return (
    <div style={{ padding: "", display: "flex" }} data-aos="zoom-in">
      <div style={{ backgroundColor: "#f1f0f0", width: "20%", height: "auto", color: "white" }}>
        <h2 style={{ color: "black", marginTop: "80px", textAlign: "center", width: "90%", marginLeft: "8px", borderRadius: "4px" }}>Your Order Details</h2>

        <h1 style={{ fontSize: "15px", fontWeight: "1", marginTop: "25px", padding: "10px", color: "gray", marginLeft: "10px" }}>You only can cancel your Appointment with in a Day</h1>
        <Button onClick={() => grooming_orders()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Pet Grooming</Button>
        <Button onClick={() => medi_order()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Medi - Appointment</Button>
        <Button onClick={() => trainning()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Pet Training</Button>
      </div>

      <div>
        <div style={{ display: 'inline' }}>
          {grooming && (
            <><Typography sx={{ fontSize: '28px', marginTop: '10%', marginLeft: '5%' }}>Pet Grooming</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
              <Table sx={{ minWidth: 1000, marginTop: "20px", border: "none" }} aria-label="customized table">
                <TableHead>
                  <TableRow sx={{ height: "5vh", fontWeight: "1000" }}>
                    <StyledTableCell>Appointment ID</StyledTableCell>
                    <StyledTableCell align="left">Placed Date</StyledTableCell>
                    <StyledTableCell align="left">Package Name</StyledTableCell>
                    <StyledTableCell align="left">Price</StyledTableCell>
                    <StyledTableCell align="left">Edit</StyledTableCell>
                    <StyledTableCell align="left">Delete</StyledTableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {row && row.map((row) => (
                    <StyledTableRow key={row.name}>

                      <StyledTableCell align="left">{row.appointment_id}</StyledTableCell>
                      <StyledTableCell align="left">{row.placed_date}</StyledTableCell>
                      <StyledTableCell align="left">{row.package_name}</StyledTableCell>
                      <StyledTableCell align="left">{row.price}</StyledTableCell>
                      <StyledTableCell align="left">

                        <Dialog title="Changes" btn_name="Edit">
                          <EditForm />
                        </Dialog>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {/* Delete icon */}
                        <IconButton onClick={() => confirmDelete(row.appointment_id)} sx={{ color: "red" }}>
                          <DeleteIcon />
                        </IconButton>

                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></>


          )}

        </div>
        <div style={{ display: 'inline' }}>
          {medi && (
            <><Typography sx={{ fontSize: '28px', marginTop: '10%', marginLeft: '5%' }}>Medi Help Ceneter</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
              <Table sx={{ minWidth: 1000, marginTop: "20px", border: "none" }} aria-label="customized table">
                <TableHead>
                  <TableRow sx={{ height: "5vh", fontWeight: "1000" }}>
                    <StyledTableCell>Appointment ID</StyledTableCell>
                    <StyledTableCell align="left">Placed Date</StyledTableCell>
                    <StyledTableCell align="left">Vet Name</StyledTableCell>
                    <StyledTableCell align="left">Price</StyledTableCell>
                    <StyledTableCell align="left">Edit</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medi_orders && medi_orders.map((menu) => (
                    <StyledTableRow key={menu.name}>

                      <StyledTableCell align="left">{menu.appointment_id}</StyledTableCell>
                      <StyledTableCell align="left">{menu.placed_date}</StyledTableCell>
                      <StyledTableCell align="left">{menu.first_name + " " + menu.last_name}</StyledTableCell>
                      <StyledTableCell align="left">{menu.fee}</StyledTableCell>
                      <StyledTableCell align="left">

                        <Dialog title="Change" btn_name="Edit">
                          <EditForm />
                        </Dialog>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {/* Delete icon */}

                      </StyledTableCell>



                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></>

          )}
        </div>
        <div style={{ display: 'inline' }}>
          {trainning_order && (
            <><Typography sx={{ fontSize: '28px', marginTop: '10%', marginLeft: '5%' }}>Pet Training</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
              <Table sx={{ minWidth: 1000, marginTop: "20px", border: "none" }} aria-label="customized table">
                <TableHead>
                  <TableRow sx={{ height: "5vh", fontWeight: "1000" }}>
                    <StyledTableCell>Appointment ID</StyledTableCell>
                    <StyledTableCell align="left">Placed Date</StyledTableCell>
                    <StyledTableCell align="left">Day</StyledTableCell>
                    <StyledTableCell align="left">Breed</StyledTableCell>
                    <StyledTableCell align="left">Duration</StyledTableCell>
                    <StyledTableCell align="left">Payment</StyledTableCell>
                    <StyledTableCell align="left">Edit</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displaytrainning && displaytrainning.map((menu) => (
                    <StyledTableRow key={menu.name}>

                      <StyledTableCell align="left">{menu.id}</StyledTableCell>
                      <StyledTableCell align="left">{menu.placed_date}</StyledTableCell>
                      <StyledTableCell align="left">{menu.day}</StyledTableCell>
                      <StyledTableCell align="left">{menu.breed}</StyledTableCell>
                      <StyledTableCell align="left">{menu.start + " " + menu.end}</StyledTableCell>
                      <StyledTableCell align="left">{menu.price}</StyledTableCell>
                      <StyledTableCell align="left">

                        <Dialog title="Change" btn_name="Edit">
                          <EditForm />
                        </Dialog>
                      </StyledTableCell>
                      <StyledTableCell align="left">

                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></>

          )}


        </div>
      </div>
      {popup && (
        <div style={{ backdropFilter: 'blur(4px)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <Box sx={{ backgroundColor: '#f0f0f5', width: '50%', height: '30vh', marginTop: '10%' }}>
          
            <div style={{ marginLeft: '5%', marginTop: '5%', fontSize: "24px", marginBottom:'10%' }}>
              {error &&(
                <Stack sx={{ width: '75%' }} spacing={2}>
                <Alert severity={message === "Successfully Deleted!!!" ? "success":"info"}>{message}</Alert>
              </Stack>
              )}
            </div>
            <Button sx={{marginLeft:'80%' ,backgroundColor:'black' , color:'white',':hover':{backgroundColor:'black'}}}>Cancel</Button>
          </Box>
        </div>

      )}


    </div>
  );
}