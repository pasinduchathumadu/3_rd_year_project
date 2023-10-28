import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import format from 'date-fns/format';
import Dialog from "./Dialog";
import EditForm from "./FormPopUp";
import { format } from 'date-fns'
import Button from '@mui/material/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Alert, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Stack, Typography } from '@mui/material';
import LoadingIndicator from '../../components/LoadingIndicator';




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

  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")
  const [row, setorder] = useState([])
  const [medi_orders, setmediorder] = useState([])
  const [grooming, setgrooming] = useState(true)
  const [medi, setmedi] = useState(false)
  const [trainning_order, settraining] = useState(false)
  const [displaytrainning, settrainingorders] = useState([])
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = useState("")
  const [error, seterror] = useState(false)
  const [loading, setLoading] = useState(true);
  const input = new Date()
  const date = format(input, 'yyy-MM-dd')
  const [boarding, setboarding] = useState(false)
  const [mind, setmind] = useState(false)

  const handleClose = () => {
    window.location.reload()
  }

  const email = localStorage.getItem('store_email')
  const confirmDelete = async (rowId) => {

    const res = await axios.post(`http://localhost:5000/pet_care/user/delete_appointment`, {
      rowId,
      date

    })
    if (res.data.message === "deleted") {
      seterror(true)
      setmessage("Successfully Deleted!!!")

    }
    else if (res.data.message === "cannot deleted") {
      seterror(true)
      setmessage("Can't be deleted")
    }

  };

  const confirmDelete_training = async (rowId) => {
    const res = await axios.post(`http://localhost:5000/pet_care/user/delete_appointment_training`, {
      rowId,
      date
    })
    if (res.data.message === "deleted") {
      seterror1(true)
      setmessage1("Successfully Deleted!!!")

    }
    else if (res.data.message === "cannot deleted") {
      seterror1(true)
      setmessage1("Can't be deleted")
    }
  };

  const get_medi_orders = async () => {

    const res = await axios.get(`http://localhost:5000/pet_care/user/get_medi_orders/${email}`)
    const data = await res.data
    return data;
  }
  const medi_order = () => {
    setmedi(true)
    setgrooming(false)
    settraining(false)
    setboarding(false)
    setmind(false)

  }
  const grooming_orders = () => {
    setgrooming(true)
    setmedi(false)
    settraining(false)
    setboarding(false)
    setmind(false)

  }
  const trainning = () => {
    setgrooming(false)
    setmedi(false)
    settraining(true)
    setboarding(false)
    setmind(false)

  }
  // boaridng requests
  const boardingrequests = () => {
    setboarding(true)
    setgrooming(false)
    setmedi(false)
    settraining(false)
    setmind(false)
  }
  // mind relaxing appointments
  const mindrelaxing = () => {
    setboarding(false)
    setgrooming(false)
    setmedi(false)
    settraining(false)
    setmind(true)

  }

  const get_training = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/training_orders/${email}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)

    }
  }
  const get_orders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/care_orders/${email}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log("There is an internel error")
    }
  }

  useEffect(() => {

    get_training()
      .then((data) => { settrainingorders(data.data); setLoading(false) })
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    get_orders()
      .then((data) => { setorder(data.data); setLoading(false) })
      .catch((err) => console.log(err))
  })
  useEffect(() => {
    get_medi_orders()
      .then((data) => { setmediorder(data.data); setLoading(false) })
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    AOS.init({ duration: 450 });
  }, []);

  // const email = localStorage.getItem("client_email")


  // boarding requests viewing
  const [boardingdata, setboardingdata] = useState("")
  const boardingRequestsViewing = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/boardingRequestsViewing/${email}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    boardingRequestsViewing()
      .then((data) => setboardingdata(data.data))
      .catch((err) => console.log(err))
  })

  // cancel boarding request
  // const [id, setid] = useState("")
  const cancelBoarding = async(id) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/cancelBoarding/${id}`)
      const data = await res.data
      return data

    }catch(err){
      console.log(err)
    }
  }

  // mind relaxing appointments viewing
  const [minddetails, setminddetails] = useState("")
  const mindrelaxingAppointments = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/mindrelaxingAppointments/${email}`)
      const data = await res.data
      return data
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    mindrelaxingAppointments()
      .then((data) => setminddetails(data.data))
      .catch((err) => console.log(err))
  })

  // cancel mid relaxing appointments 
  // const [id1, setid1] = useState("")
  const cancelMindRelaxingAppointment = async(id1) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/cancelMindRelaxingAppointment/${id1}`)
      const data = await res.data
      return data

    }catch(err){
      console.log(err)
    }
  }



  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div style={{ padding: "", display: "flex" }} data-aos="zoom-in">
          <div style={{ backgroundColor: "#f1f0f0", width: "20%", height: "100vh", color: "white" }}>
            <h2 style={{ color: "black", marginTop: "80px", textAlign: "center", width: "90%", marginLeft: "8px", borderRadius: "4px" }}>Your Order Details</h2>

            {/* <h1 style={{ fontSize: "15px", fontWeight: "1", marginTop: "25px", padding: "10px", color: "gray", marginLeft: "10px" }}>You only can cancel your Appointment with in a Day</h1> */}
            <Button onClick={() => grooming_orders()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Pet Grooming</Button>
            <Button onClick={() => medi_order()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Medi - Appointment</Button>
            <Button onClick={() => trainning()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Pet Training</Button>
            <Button onClick={() => mindrelaxing()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Mind Relaxing </Button>
            <Button onClick={() => boardingrequests()} sx={{ backgroundColor: "black", width: "90%", marginTop: "30px", marginLeft: "10px", '&:hover': { backgroundColor: 'black' } }} variant="contained">Boarding Requests</Button>
          </div>

          <div>
            <div style={{ display: 'inline' }}>
              {grooming && (
                <><Typography sx={{ fontSize: '28px', marginTop: '8%', marginLeft: '5%' }}>Pet Grooming</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
                  <h1 style={{ fontSize: "15px", fontWeight: "1", marginTop: "25px", padding: "10px", color: "gray", marginLeft: "10px" }}>You only can cancel your Appointment with in a Day</h1>

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
                            <div style={{ width: '60%', marginTop: '1px', backgroundColor: 'white' }}>
                              <Dialog
                                btn_name="Delete"
                                open={open}
                                onClose={() => handleClose()// Close the dialog when the "Back" button is clicked
                                }
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  Confirmation
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Are You Sure Do you want to Delete this Permenatly?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <DialogContent>
                                    <div style={{ marginTop: '1%' }}>
                                      {error && (
                                        <Stack sx={{ width: '85%' }} spacing={3}>
                                          <Alert
                                            sx={{ color: 'black', fontSize: '14px' }}
                                            severity={message === 'Successfully Deleted!!!' ? 'success' : 'warning'}
                                          >
                                            {message}
                                          </Alert>
                                        </Stack>
                                      )}
                                    </div>
                                  </DialogContent>
                                  <Button onClick={() => handleClose()} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }} >
                                    Back
                                  </Button>
                                  <Button onClick={() => confirmDelete(row.appointment_id)} sx={{ backgroundColor: 'red', color: 'white', ':hover': { backgroundColor: 'red' } }}>
                                    Delete
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
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
                <><Typography sx={{ fontSize: '28px', marginTop: '8%', marginLeft: '5%' }}>Medi Help Ceneter</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
                  <h1 style={{ fontSize: "15px", fontWeight: "1", marginTop: "25px", padding: "10px", color: "gray", marginLeft: "10px" }}>You only can cancel your Appointment with in a Day</h1>
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
                <><Typography sx={{ fontSize: '28px', marginTop: '8%', marginLeft: '5%' }}>Pet Training</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
                  <h1 style={{ fontSize: "15px", fontWeight: "1", marginTop: "25px", padding: "10px", color: "gray", marginLeft: "10px" }}>You only can cancel your Appointment with in a Day</h1>
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
                            <div style={{ width: '60%', marginTop: '1px', backgroundColor: 'white' }}>
                              <Dialog
                                btn_name="Delete"
                                open={open}
                                onClose={() => {
                                  seterror(false); // Set error to false when the dialog is closed for Pet Grooming
                                  seterror1(false); // Set error1 to false when the dialog is closed for Pet Training
                                  handleClose();
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  Confirmation
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Are You Sure Do you want to Delete this Permenatly?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <DialogContent>
                                    <div style={{ marginLeft: '1%', marginTop: '1%' }}>
                                      {error1 && (
                                        <Stack sx={{ width: '85%' }} spacing={3}>
                                          <Alert
                                            sx={{ color: 'black', fontSize: '14px' }}
                                            severity={message1 === 'Successfully Deleted!!!' ? 'success' : 'warning'}
                                          >
                                            {message1}
                                          </Alert>
                                        </Stack>
                                      )}
                                    </div>
                                  </DialogContent>
                                  <Button onClick={() => handleClose()} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }} >
                                    Back
                                  </Button>
                                  <Button onClick={() => confirmDelete_training(menu.id)} sx={{ backgroundColor: 'red', color: 'white', ':hover': { backgroundColor: 'red' } }} autoFocus>
                                    Delete
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer></>

              )}
            </div>

            {/* placed boarding requests */}
            <div style={{ display: 'inline' }}>
              {boarding && (
                <><Typography sx={{ fontSize: '28px', marginTop: '8%', marginLeft: '5%' }}>Boarding Requests</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
                  <InputLabel><span style={{ color: 'red' }}>**</span> You can cancel your placed requests within two days</InputLabel>
                  <Table sx={{ minWidth: 1000, marginTop: "20px", border: "none" }} aria-label="customized table">
                    <TableHead>
                      <TableRow sx={{ height: "5vh", fontWeight: "1000" }}>
                        <StyledTableCell align="center">Request ID</StyledTableCell>
                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                        <StyledTableCell align="center">Package </StyledTableCell>
                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {boardingdata && boardingdata.map((menu, index) => (
                        <StyledTableRow key={menu.request_id}>
                          <StyledTableCell align="center">{menu.request_id}</StyledTableCell>
                          <StyledTableCell align="center">{menu.pet_id}</StyledTableCell>
                          <StyledTableCell align="center">{menu.package_name}</StyledTableCell>
                          <StyledTableCell align="center">{menu.board_arrival_date}</StyledTableCell>
                          <StyledTableCell align="center">{menu.placed_date}</StyledTableCell>
                          <StyledTableCell align="center">
                            {menu.request_status === "pending" && menu.placed_date + 2 >= date
                              ? (<Button sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }}>CANCEL</Button>)
                              : menu.request_status
                            }
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                </>

              )}
            </div>

            {/* mind relaxing appointments */}
            <div style={{ display: 'inline' }}>
              {mind && (
                <><Typography sx={{ fontSize: '28px', marginTop: '8%', marginLeft: '5%' }}> Mind Relaxing Appointments</Typography><TableContainer component={Paper} sx={{ padding: "50px", boxShadow: "none" }}>
                  <Table sx={{ minWidth: 1000, marginTop: "20px", border: "none" }} aria-label="customized table">
                    <TableHead>
                      <TableRow sx={{ height: "5vh", fontWeight: "1000" }}>
                        <StyledTableCell align="center">Appointment ID</StyledTableCell>
                        <StyledTableCell align="center">TimeSlot</StyledTableCell>
                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                        <StyledTableCell align="center">Reserved Date</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {minddetails && minddetails.map((menu, index) => (
                        <StyledTableRow key={menu.appointment_id}>

                          <StyledTableCell align="center">{menu.appointment_id}</StyledTableCell>
                          <StyledTableCell align="center">{menu.start_time  + " - " + menu.end_time}</StyledTableCell>
                          <StyledTableCell align="center">{menu.pet_id}</StyledTableCell>
                          <StyledTableCell align="center">{menu.date}</StyledTableCell>
                          <StyledTableCell align="center">{menu.status}</StyledTableCell>
                          <StyledTableCell align="left">
                            <div style={{ width: '60%', marginTop: '1px', backgroundColor: 'white' }}>
                              <Dialog
                                btn_name="Delete"
                                open={open}
                                onClose={() => {
                                  seterror(false); // Set error to false when the dialog is closed for Pet Grooming
                                  seterror1(false); // Set error1 to false when the dialog is closed for Pet Training
                                  handleClose();
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  Confirmation
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Are You Sure Do you want to Delete this Permenatly?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <DialogContent>
                                    <div style={{ marginLeft: '1%', marginTop: '1%' }}>
                                      {error1 && (
                                        <Stack sx={{ width: '85%' }} spacing={3}>
                                          <Alert
                                            sx={{ color: 'black', fontSize: '14px' }}
                                            severity={message1 === 'Successfully Deleted!!!' ? 'success' : 'warning'}
                                          >
                                            {message1}
                                          </Alert>
                                        </Stack>
                                      )}
                                    </div>
                                  </DialogContent>
                                  <Button onClick={() => handleClose()} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }} >
                                    Back
                                  </Button>
                                  <Button onClick={() => cancelMindRelaxingAppointment(menu.appointment_id)} sx={{ backgroundColor: 'red', color: 'white', ':hover': { backgroundColor: 'red' } }} autoFocus>
                                    Delete
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer></>

              )}
            </div>

           


          </div>




        </div>
      )}

    </div>

  );
}