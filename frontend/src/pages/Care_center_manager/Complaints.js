import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/Complaints.css";
import { Alert, Button, FormControl, FormLabel, IconButton, MenuItem, Select, TextField } from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';


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
  const viewmycomplain = async () => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/care_center_manager/viewmycomplain')
      const data = await res.data
      return data

    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    viewmycomplain()
      .then((data) => setmycomplain(data.data))
      .catch((err) => console.log(err))
  })

  const email = localStorage.getItem("care_center_manager")
  // add new complain form
  const [form, setform] = useState(false)

  const [complain, setcomplain] = useState("")
  const [message, setMessage] = useState("");
  const [error, seterror] = useState("");

  // open ad new complain form
  const OpenComplainForm = () => {
    setform(true)
    setvalue(false)
  }
  // click on add new complain button
  const add_complain = async () => {
    if (complain === '') {
      seterror(true)
      setMessage('Please fill the filed')
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/add_complain`, {
        email,
        complain
      })
      if (res.data.message === 'There is an internal error') {
        setMessage('Error')
        seterror(true)
      } else if (res.data.message === 'success') {
        setform(false)
        setvalue(1)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // cancel without adding complain
  const cancelAddingComplain = () => {
    setform(false)
    setvalue(1)
  }

  // view clients complains
  const [clientcomplain, setclientcomplain] = useState("")
  const viewClientcomplains = async () => {
    try {
      const res = await axios.get('http://localhost:5000/pet_care/care_center_manager/viewClientcomplains')
      const data = await res.data
      return data
    } catch (err) {
      console.log(err)
    }
  }
  useState(() => {
    viewClientcomplains()
      .then((data) => setclientcomplain(data.data))
      .catch((err) => console.log(err))

  })
  // add repsonse button click 
  const [addResponce, setaddResponce] = useState("")

  // add response for client complains - view details on form
  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")
  const [resdetails, setresdetails] = useState("")

  const complainDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/complainDetails/${id}`)
      if (res.data.message === 'There is an internal error') {
        seterror1(true)
        setmessage1('There is an internal error')
      } else {
        setaddResponce(true)
        setresdetails(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // add response - post
  const [newres, setnewres] = useState("")
  const handleResponse = (event) => {
    setnewres(event.target.value)
  }
  const addResponse = async (id) => {
    setvalue(0)
    setaddResponce(false)

    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/addResponse`, {
        id,
        newres
      })

    } catch (err) {
      console.log(err)
    }
  }
  // close withour responcing 
  const backAddingRes = () => {
    setaddResponce(false)
    setvalue(0)
  }

  // delete my pending complain
  const [warn, setwarn] = useState(false)
  const [id, setid] = useState("") // id - going to be deleted
  const [error2, seterror2] = useState(false)
  const [message2, setmessage2] = useState("")

  // display warning box (click on delete icon)
  const displayWarn = (id) => {
    setwarn(true)
    setvalue(false)
    setid(id)
  }

  // delete selected complain
  const deleteMyComplain = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/deleteMyComplain/${id}`)
      if (res.data.message === 'There is an internal error') {
        seterror2(true)
        setmessage2('There is an internal error')
      } else {
        setvalue(1)
        setwarn(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // close watn box without deleting
  const cancelDelete = () => {
    setwarn(false)
    setvalue(1)
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
                    <StyledTableCell align="center" sx={{ width: "10%" }}>
                      Complaint ID
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "15%" }}>
                      Client ID
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "30%" }}>
                      Complaint
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "20%" }}>
                      Placed Date
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "15%" }}>
                      Placed Time
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ width: "10%" }}>
                      Response
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientcomplain && clientcomplain.map((clientrow, index) => (
                    <StyledTableRow key={clientrow.complain_id}>
                      <StyledTableCell aling="center" component="th" scope="row">
                        {clientrow.complain_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {clientrow.client_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {clientrow.complain_txt}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {clientrow.com_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {clientrow.com_time}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {clientrow.complain_status === 'pending'
                          ? (
                            <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={() => complainDetails(clientrow.complain_id)}> Add Response</Button>
                          ) : (
                            clientrow.response_txt
                          )}
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
              <div className="drop-down-box">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div className="top-button-header">
                    <Button variant="contained" sx={{ background: "black", ':hover': { backgroundColor: "black" } }} onClick={OpenComplainForm}>Add New Complain <AddIcon sx={{ marginLeft: '10px' }} /></Button>
                  </div>
                  <div>
                    <Box sx={{ width: '150px', marginRight: '25px' }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={value}
                          variant='filled'
                          label="clients"
                          onChange={handleChange}
                          l
                          sx={{ fontSize: '11px' }}
                        >
                          <MenuItem value={1}>All</MenuItem>
                          <MenuItem value={2}>Pending</MenuItem>
                          <MenuItem value={2}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </div>
              <div className="form-content">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                        <StyledTableCell align="center">Complain</StyledTableCell>
                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                        <StyledTableCell align="center">Placed Time</StyledTableCell>
                        <StyledTableCell align="center">Response</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mycomplain && mycomplain.map((myrow, index) => (
                        <StyledTableRow key={myrow.complain_id}>
                          <StyledTableCell align="center">{myrow.complain_id}</StyledTableCell>
                          <StyledTableCell align="center">{myrow.complain_txt}</StyledTableCell>
                          <StyledTableCell align="center">{myrow.com_date}</StyledTableCell>
                          <StyledTableCell align="center">{myrow.com_time}</StyledTableCell>
                          <StyledTableCell align="center">
                            {myrow.complain_status === "pending" ?
                              <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pending</Button>
                              : (myrow.response_txt)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {myrow.complain_status === 'pending' ?
                              <IconButton onClick={() => displayWarn(myrow.complain_id)} ><DeleteIcon sx={{ color: 'red' }} /></IconButton> : ""}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )}
        </Grid>
        {PopupOpen && <ComplaintForm />}
      </div>

      {/* add new complain */}
      {form && (
        <div style={{
          backdropFilter: 'blur(4px)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '300px',
          zIndex: 1001,
        }}>
          <FormControl sx={{
            marginLeft: '5%',
            marginTop: '20%',
            borderRadius: '10px',
            width: '700px',
            padding: '20px',
            position: 'relative',
            zIndex: 1001,
            backgroundColor: 'black'
          }}>
            <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
              <div>
                <IconButton onClick={cancelAddingComplain}><CloseIcon sx={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginLeft: '600px'
                }} /></IconButton>
              </div>

              <div className="form-topic">
                Add New Complain
                <hr />
              </div>
              <div className="form-label">
                <FormLabel>Enter your complain: </FormLabel>
                <TextField id="outlined-basic" placeholder="Complain" variant="outlined" sx={{ marginRight: '20px', marginTop: '10px' }} onChange={(e) => setcomplain(e.target.value)} required />
              </div>
              {
                error && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning">{message}</Alert>
                  </Stack>
                )
              }
              <Button variant="contained" onClick={() => add_complain()} sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button>
            </div>
          </FormControl>
        </div>
      )}

      {/* add response */}
      {addResponce && (
        <div style={{
          backdropFilter: 'blur(4px)',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '300px',
          zIndex: 1001,
        }}>
          {resdetails && resdetails.map((resrow, index) => (
            <FormControl sx={{
              marginLeft: '5%',
              marginTop: '30%',
              borderRadius: '10px',
              width: '600px',
              padding: '20px',
              position: 'relative',
              zIndex: 1001,
              backgroundColor: 'black'
            }}>
              <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                <div>
                  <IconButton onClick={backAddingRes}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '500px' }} /></IconButton>
                </div>
                <div className="form-topic">
                  Adding Response
                  <hr />
                </div>
                <div className="form-label">
                  <FormLabel>Complain ID :  </FormLabel>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        label=""
                        defaultValue={resrow.complain_id}
                      /></div>
                  </Box>
                </div>
                <div className="form-label">
                  <FormLabel>Complain :  </FormLabel>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        label=""
                        defaultValue={resrow.complain_txt}
                      /></div>
                  </Box>
                </div>

                <div className="form-label">
                  <FormLabel>Enter the Response  </FormLabel>
                  <TextField
                    id="outlined-basic"
                    placeholder=" response"
                    variant="outlined"
                    onChange={handleResponse}
                    sx={{ marginRight: '20px', marginLeft: '10px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button variant="contained" onClick={() => addResponse(resrow.complain_id)} sx={{ background: "orange", width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Response</Button>
                </div>
              </div>
            </FormControl>
          ))}
        </div>
      )}

      {/* delete my complain (pending) - warn box */}
      {warn && (
        <div style={{
          backdropFilter: 'blur(4px)',
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '5px',
          width: '100%',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '300px',
          zIndex: 1001,
          marginTop: '10%'
        }}>
          <div style={{ backgroundColor: 'black', padding: '10px' }}>
            <div style={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#f0f0f5',
              width: '500px',
              position: 'relative',
              zIndex: 1001
            }}>
              <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
              <hr /><br />

              <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button onClick={deleteMyComplain} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Complaints;
