import React, { useEffect, useState } from "react";
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
import { Typography, Stack, Grid, Box, Tab, Tabs } from "@mui/material";
import axios from 'axios'
import CPetProfile from "./CPetProfile";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';

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


function Appo() {
  const [rows, setgrooming] = useState([])
  const [rows2, settraining] = useState([])

  // grooming appointments viewing
  // drop down
  const [client3, setclient3] = React.useState('1')
  const handleChange3 = (event) => {
    setclient3(event.target.value)

    get_groom_apo()
  }
  const get_groom_apo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/get_groom_apo/${client3}`)
      setgrooming(res.data.data)
    } catch (err) {
      console.log(client3)
      console.log(err)
    }
  }
  useEffect(() => {
    get_groom_apo()
  }, [client3, get_groom_apo])

  // exercising appointments viewing
  // drop down
  const [client2, setclient2] = React.useState('1')
  const handleChange2 = (event) => {
    setclient2(event.target.value)

    pet_training()
  }
  const pet_training = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/get_training/${client2}`)
      settraining(res.data.data)
    } catch (err) {
      console.log(client2)
      console.log(err)
    }
  }
  useEffect(() => {
    pet_training()
  }, [client2, pet_training])

  // mind relaxing appointments
  // drop down
  const [client1, setclient1] = React.useState('1')
  const handleChange1 = (event) => {
    setclient1(event.target.value)

    mind_relaxing()
  }
  const [mind, setmind] = useState("")
  const mind_relaxing = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/mind_relaxing/${client1}`)
      setmind(res.data.data)
    } catch (err) {
      console.log(client1)
      console.log(err)
    }
  }
  useEffect(() => {
    mind_relaxing()
  }, [client1, mind_relaxing])

  // pending -> completed
  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")

  const CompletePending = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/CompletePending`, {
        id
      })
      if (res.data.message === 'There is an internal error') {
        setmessage1('There is an internal error')
        seterror1(true)
      } else if (res.data.message === "completed") {
        setvalue(2)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }


  const input = new Date();
  const date = input.toDateString();
  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  };


  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }
  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  // WARNING BOX
  const [warn, setwarn] = useState(false)

  // display warning box
  const displayWarning = () => {
    setwarn(true)
    setvalue(false)
  }

  // removing all uncompleted appointments
  const [error2, seterror2] = useState(false)
  const [success2, setsuccess2] = useState(false)
  const [message2, setmessage2] = useState("")
  const removeUncompleted = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/removeUncompleted`)
      if (res.data.message === 'There is an internal error') {
        seterror2(true)
        setmessage2('There is an internal error')
      }
      else if (res.data.message === 'Deleted') {
        setvalue(2)
        setwarn(false)
        setsuccess2(true)
        setmessage2('Successfully Removed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // cancel removing
  const cancelDelete = () => {
    setwarn(false)
    setvalue(2)
  }

  // grooming appointment => pending -> completed
  const [error3, seterror3] = useState(false)
  const [message3, setmessage3] = useState("")

  const GroomingPendingToComplete = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/GroomingPendingToComplete`, {
        id
      })
      if (res.data.message === 'There is an internal error') {
        setmessage3('There is an internal error')
        seterror3(true)
      } else if (res.data.message === "completed") {
        setvalue(0)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // Training appointment => pending -> completed
  const [error4, seterror4] = useState(false)
  const [message4, setmessage4] = useState("")

  const TrainingPendingToComplete = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/TrainingPendingToComplete`, {
        id
      })
      if (res.data.message === 'There is an internal error') {
        setmessage4('There is an internal error')
        seterror4(true)
      } else if (res.data.message === "completed") {
        setvalue(1)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }



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
                Appointments
              </Typography>
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ marginLeft: '130%' }}><Stack direction="row" spacing={2} width={300}>
                <NotificationsIcon />
                <Button onClick={profile}>
                  <img
                    alt="profilepicture"
                    src={getProfilepicturepath("carecenter_profile.png")}
                    style={{ width: 'auto', height: '60px' }}
                  />
                </Button>
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
                <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black" }} label="Pet Grooming Appointments" />
                <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black", }} label="Dog Trainning & Exercising Appointments" />
                <Tab sx={{ backgroundColor: value === 2 ? "orange" : "white", color: value === 2 ? "white" : "black", }} label="Mind Relaxing Appointments" />

              </Tabs>
            </Box>
          </Grid>

          {value === 0 && (
            <>
              <div>
                <Box sx={{ width: '13%', marginLeft: '87%', marginBottom: '1%' }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant='filled'
                      onChange={handleChange3}
                      l
                      sx={{ fontSize: '12px' }}>
                      <MenuItem value={1}>All</MenuItem>
                      <MenuItem value={2}>Pending</MenuItem>
                      <MenuItem value={3}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" >
                        Appointment ID
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Client Email
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        Placed Date
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        Payment(Rs)
                      </StyledTableCell>
                      <StyledTableCell align="center" >
                        Appointment Status
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.appointment_id}>
                        <StyledTableCell component="th" scope="row" align="center">
                          {row.appointment_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.client_email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.placed_date}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.price}.00
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.appointment_status}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.appointment_status === 'pending' && (
                            <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={() => GroomingPendingToComplete(row.appointment_id)}>COMPLETE </Button>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {value === 1 && (
            <>
              <div>
                <Box sx={{ width: '13%', marginLeft: '87%', marginBottom: '1%' }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant='filled'
                      onChange={handleChange2}
                      l
                      sx={{ fontSize: '12px' }}>
                      <MenuItem value={1}>All</MenuItem>
                      <MenuItem value={2}>Pending</MenuItem>
                      <MenuItem value={3}>Completed</MenuItem>
                      <MenuItem value={4}>Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Pet ID
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Client Email
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Category
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Selected Time Slot
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Trainning Day
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Payment (Rs.)
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Status
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}></StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows2.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="center">
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row" align="center">
                          {row.client_email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.breed}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.start + " - " + row.end}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.day}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.price}.00
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status === 'pending' && (
                            <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={() => TrainingPendingToComplete(row.id)}>COMPLETE </Button>
                          )}
                        </StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {value === 2 && (
            <>
              <div>
                <div>
                  <Button onClick={displayWarning} sx={{ backgroundColor: 'black', color: 'white', 'hover': { backgroundColor: 'black' } }}>Remove All Uncompleted Appointments</Button>
                  {error2 && (
                    <Stack sx={{ width: '20%' }} spacing={2}>
                      <Alert severity="error">{message2}</Alert>
                    </Stack>
                  )}
                  {success2 && (
                    <Stack sx={{ width: '20%' }} spacing={2}>
                      <Alert severity="success">{message2}</Alert>
                    </Stack>
                  )}
                </div>
                <div>
                  <Box sx={{ width: '15%', marginLeft: '85%', marginBottom: '1%' }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        variant='filled'
                        onChange={handleChange1}
                        l
                        sx={{ fontSize: '12px' }}>
                        <MenuItem value={1}>All</MenuItem>
                        <MenuItem value={2}>Pending</MenuItem>
                        <MenuItem value={3}>Completed</MenuItem>
                        <MenuItem value={4}>Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Appointment ID
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Client Email
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Selected Pet ID
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Date
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Selected Time Slot
                      </StyledTableCell>
                      {/* <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Cancelled Date
                      </StyledTableCell> */}
                      <StyledTableCell align="center" sx={{ width: "10%" }}>
                        Appointment Status
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ width: "10%" }}></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mind && mind.map((row, index) => (
                      <StyledTableRow key={row.appointment_id}>
                        <StyledTableCell component="th" scope="row" align="center">
                          {row.appointment_id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row" align="center">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.pet_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.date}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.start_time + " - " + row.end_time}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                          {row.early_cancel_date}
                        </StyledTableCell> */}
                        <StyledTableCell align="center">
                          {row.status}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status === 'pending' ? (
                            <Button onClick={() => CompletePending(row.appointment_id)} sx={{ backgroundColor: "black", color: "white", ":hover": { backgroundColor: "black" } }}>Completed</Button>
                          ) : (
                            "")
                          }
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
        {/* {PopupOpen && <CPetProfile />} */}

        {/* warning box for removing */}
        {warn && (
          <div style={{
            backdropFilter: 'blur(4px)',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '5px',
            width: '100%',
            height: '100vh',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '300px',
            zIndex: 1001,
          }}>
            <div style={{ backgroundColor: 'black', padding: '10px' }}>
              <div style={{
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#f0f0f5',
                width: '500px',
                position: 'relative',
                zIndex: 1001,
              }}>
                <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
                <hr /><br />

                <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Button onClick={removeUncompleted} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                  <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Appo;