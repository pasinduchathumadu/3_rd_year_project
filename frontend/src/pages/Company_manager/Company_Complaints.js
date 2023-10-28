import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem, Select, FormControl, IconButton, FormLabel, Alert } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';



function Company_Complaints() {
  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  const [compDes, setDescription] = useState("");
  // const [compDate, setDate] = useState("");
  // const [compTime, setTime] = useState("");
  const [com, setCom] = useState([]);

  const [error, seterror] = useState(false);
  const email = localStorage.getItem("store_email");
  const submit = async () => {
    
    if (compDes === null) {
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/pet_care/company_manager/add_complaint",
        {
          compDes,
          email
        }
      );
      if (res.data.message === "successfully added") {
        seterror(true);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const date = new Date();
  const currentdate = date.toDateString();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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

  // function createData(id, name, date) {
  //   return { id, name, date };
  // }

  //new
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    seterror(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //get my complaints
  const [clients1, setClients1] = React.useState('1');
  const handleChange1 = (event) => {
    setClients1(event.target.value);

    getComplaints()
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getComplaints = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/pet_care/company_manager/get_complaints/${clients1}`
      );
      setCom(res.data.data)

    } catch (err) {
      console.log(err)
      console.log(clients1)
    }
  }
  useEffect(() => {
    getComplaints();
  }, [clients1]);

  //get clients complaints
  const [clientcom, setclientcom] = useState([])
  const [clients2, setClients2] = useState('1');
  const handleChange2 = (event) => {
    setClients2(event.target.value);

    clientsComplains()
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clientsComplains = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/clientsComplains/${clients2}`);
      setclientcom(res.data.data)

    } catch (err) {
      console.log(err)
      console.log(clients2)
    }
  }
  useEffect(() => {
    clientsComplains();
  }, [clients2]);

  // ADD RESPONCE TO CLIENTS COMPLAINS
  const [addResponce, setaddResponce] = useState(false);

  // clients complains - add responses - get id
  const [error1, seterror1] = useState(false)

  const [resdetails, setresdetails] = useState([])
  const complainDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/complainDetails/${id}`)
      if (res.data.message === 'There is an internal error') {
        seterror1(true)

      } else {
        setaddResponce(true)
        setresdetails(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // clients complains - add responses
  const [error2, seterror2] = useState(false)
  const [message2, setmessage2] = useState("")
  const [newres, setnewres] = useState("")

  const handleResponse = (event) => {
    setnewres(event.target.value)
  }
  const addingResponse = async (id) => {
    if (newres === '') {
      seterror2(true)
      setmessage2("Please fill the field")
      return;
    }
    setSelectedTab(0)
    setaddResponce(false)

    try {
      const res = await axios.post(`http://localhost:5000/pet_care/company_manager/addingResponse`, {
        id,
        newres
      })
    } catch (err) {
      console.log(err)
    }
  }

  // cancel without adding a response for client complian
  const backAddingRes = () => {
    setaddResponce(false)
    setSelectedTab(0)
  }

  // warning box for deleting a my complain
  const [warn, setwarn] = useState(false)
  const [id, setdeletedid] = useState("")

  // display warning box 
  const displayWarn = (id) => {
    setwarn(true)
    setSelectedTab(false)
    setdeletedid(id)
  }

  // delete the complain

  const deleteMyComplain = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/deleteMyComplain/${id}`)
      if (res.data.message === 'There is an internal error') {
        seterror(true)

      } else {
        setSelectedTab(1)
        setwarn(false)
        window.location.reload()
      }

    } catch (err) {
      console.log(err)
    }
  }
  // cancel deleting
  const cancelDelete = () => {
    setSelectedTab(1)
    setwarn(false)
  }





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
            Complaints
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <NotificationsIcon className="bell-icon" />
          <Button onClick={profile}><img src={getProfilepicturepath("company_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
        </Stack>
      </Stack>

      <Box padding={2}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontSize: "16px",
              color: "black",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#FFD580",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "orange", // Change background color for selected tab
              color: "black", // Change text color for selected tab
              "&:hover": {
                backgroundColor: "orange",
              },
            },
          }}
        >
          <Tab label="Client's Complaints" />
          <Tab label="My Complaints" />
        </Tabs>

        {selectedTab === 0 && (
          <>
            <Box sx={{ width: '12%', marginLeft: '87%', marginBottom: '0' }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant='filled'
                  onChange={handleChange2}
                  value={clients2}
                  sx={{ fontSize: '12px' }}>
                  <MenuItem value={1}>All</MenuItem>
                  <MenuItem value={2}>Pending</MenuItem>
                  <MenuItem value={3}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box padding={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Complaint ID </StyledTableCell>
                      <StyledTableCell align="center">Client ID </StyledTableCell>
                      <StyledTableCell align="center">Complaint</StyledTableCell>
                      <StyledTableCell align="center">Placed Date</StyledTableCell>
                      <StyledTableCell align="center">Response</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientcom && clientcom.map((row) => (
                      <StyledTableRow key={row.complain_id}>
                        <StyledTableCell align="center" component="th" scope="row">
                          {row.complain_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.client_id}</StyledTableCell>
                        <StyledTableCell align="center">{row.complain_txt}</StyledTableCell>
                        <StyledTableCell align="center">{row.com_date}</StyledTableCell>
                        <StyledTableCell align="center">
                          {row.response_txt === null ? (
                            <Button onClick={() => complainDetails(row.complain_id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} > Add Response</Button>
                          ) : (
                            row.response_txt
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}

        {selectedTab === 1 && (
          <Box padding={2}>
            <Button
              onClick={handleClickOpen}
              sx={{
                color: "white",
                backgroundColor: "black",
                marginBottom: "10px",
                ":hover": { backgroundColor: "black" },
              }}
            >
              <AddIcon />
              Add New Complaint
            </Button>

            <Box sx={{ width: '12%', marginLeft: '88%', marginBottom: '1%' }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant='filled'
                  onChange={handleChange1}
                  value={clients1}
                  sx={{ fontSize: '12px' }}>
                  <MenuItem value={1}>All</MenuItem>
                  <MenuItem value={2}>Pending</MenuItem>
                  <MenuItem value={3}>Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Complaint ID </StyledTableCell>
                    <StyledTableCell align="center">Complaint</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Response</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {com &&
                    com.map((row) => (
                      <StyledTableRow key={row.complain_id}>
                        <StyledTableCell component="th" scope="row" align="center">
                          {row.complain_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.complain_txt}</StyledTableCell>
                        <StyledTableCell align="center">{row.com_date}</StyledTableCell>
                        <StyledTableCell align="center">
                          {row.response_txt === null ? (
                            <Button sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }}>Pending</Button>
                          ) : (
                            row.response_txt
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.complain_status === 'pending' ?
                            <IconButton onClick={() => displayWarn(row.complain_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton> : ""}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Complaint Form"}
        </DialogTitle>
        <DialogContent>
          <form action="">
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={compDes}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          </form>
        </DialogContent>
        {error && (
            <Stack >

              <Alert severity="success">Successfully Added</Alert>
            </Stack>
          )}
        <DialogActions>
        
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={submit}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>



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
                  <FormLabel>Enter the Response  </FormLabel>
                  <TextField
                    id="outlined-basic"
                    placeholder=" response"
                    variant="outlined"
                    onChange={handleResponse}
                    sx={{ marginRight: '20px', marginLeft: '10px' }} />
                </div>

                {
                  error2 && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="warning">{message2}</Alert>
                    </Stack>
                  )
                }

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Button variant="contained" onClick={() => addingResponse(resrow.complain_id)} sx={{ background: "orange", width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Response</Button>
                </div>
              </div>
            </FormControl>
          ))}
        </div>
      )}

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

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
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

export default Company_Complaints;