import React, { useEffect, useState } from 'react'
import '../../styles/Medi-help_manager/PetProfile.css';
import { Button, TextField, Typography, Tab, Tabs, TableBody, Box, Paper, Table, TableHead, FormControl, IconButton, FormLabel, Stack, Alert, InputLabel, Select, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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


const AddVaccine = () => {
  const input = new Date();
  const date = input.toDateString();
  const navigate = useNavigate("")

  // connect profile 
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  const [vaccine, setvaccine] = useState(0)
  const handleForm = (event, existing_value) => {
    setvaccine(existing_value)
  };

  // new vaccine adding
  const [newvaccine, setnewvaccine] = useState(false)
  const [error, seterror] = useState(false)
  const [message, setmessage] = useState("")
  const [name, setname] = useState("")
  const [category, setcategory] = useState("")
  const [time, settime] = useState("")

  const handleChangeCategory = (event) => {
    setcategory(event.target.value)
  };

  const newVaccine = () => {
    setnewvaccine(true)
    setvaccine(false)
    setcategory(false)
  }
  const submitNewVaccine = async () => {
    if (name === "" || category === "" || time === "") {
      seterror(true)
      setmessage("Please fill all the fileds")
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/medi_help_manager/submitNewVaccine`, {
        name,
        category,
        time,
      })
      if (res.data.message === 'There is an internal error') {
        setmessage('Internal error')
        seterror(true)
      } else if (res.data.message === 'success') {
        setvaccine(0)
        setnewvaccine(false)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // view dogs vaccine schedule
  const [dog, setdog] = useState("")
  const DogVaccine = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/DogVaccine`)
      const data = await res.data
      return data

    } catch (err) {
      console.log("There is an internal error")
    }
  }
  useEffect(() => {
    DogVaccine()
      .then((data) => setdog(data.data))
      .catch((err) => console.log(err))
  })

  // view cats vaccine schedule
  const [cat, setcat] = useState("")
  const CatVaccine = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/CatVaccine`)
      const data = await res.data
      return data

    } catch (err) {
      console.log("There is an internal error")
    }
  }
  useEffect(() => {
    CatVaccine()
      .then((data) => setcat(data.data))
      .catch((err) => console.log(err))
  })

  // cancel adding
  const cancelAdding = () => {
    setnewvaccine(false)
    setvaccine(0)
  }

  const [warn, setwarn] = useState(false)
  const [id, setdeletedid] = useState("")
  // display warn box
  const displayWarn = (id) => {
    setwarn(true)
    setvaccine(false)
    setdeletedid(id)
  }
  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")
  // deletion of a vaccine
  const deleteVaccine = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/deleteVaccine/${id}`)
      if (res.data.message === 'There is an internal error') {
        seterror1(true)
        setmessage1('There is an internal error')
      } else {
        setwarn(false)
        setvaccine(0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // cancel deletion
  const cancelDelete = () => {
    setwarn(false)
    setvaccine(0)
  }

  // UPDATE VACCINE
  const [update, setupdate] = useState(false)
  const [id1, setid1] = useState("")
  const [error2, seterror2] = useState(false)
  const [message2, setmessage2] = useState("")

  // display update form
  const displayUpdateForm = (id1) => {
    setupdate(true)
    setid1(id1)
    setvaccine(false)
    seterror2(false)
  }

  // get details for update form
  const [details, setdetails] = useState("")
  const getDetailsforUpdate = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/getDetailsforUpdate/${id1}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getDetailsforUpdate()
      .then((data) => setdetails(data.data))
      .catch((err) => console.log(err))
  })

  // update vaccine details
  const [newtime, setnewtime] = useState("")
  const [error3, seterror3] = useState(false)
  const [message3, setmessage3] = useState("")

  const updateVaccine = async (id2) => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/medi_help_manager/updateVaccine`, {
        id2,
        newtime,
      })
      if (res.data.message === 'There is an internal error') {
        setmessage3('Internal error')
        seterror3(true)
      } else if (res.data.message === 'success') {
        setvaccine(0)
        setupdate(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // cancelling update
  const cancelUpdating = () => {
    setupdate(false)
    setvaccine(0)
  }






  return (
    <div style={{ marginTop: '4%' }}>
      <div className="top">
        <div className="top-line">
          <p>Medi Help Center Manager</p>
          <p className="top-line-text">Today</p>
          <p class="top-line-text">{date}</p>
        </div>
        <div className="top-line">
          <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Vaccination Schedule </p>
        </div>

        <div className="top-line">
          <NotificationsIcon className="bell-icon" />
          <Button onClick={profile}>
            <img src={getProfilepicturepath("medi_profile.jpg")}
              alt="profilepicture"
              className="boarding-profile-picture" />
          </Button>
        </div>
      </div>

      <Box sx={{ marginLeft: '1%' }}>
        <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, marginTop: '1%', marginLeft: '1%' }} onClick={newVaccine}><AddIcon />Add New Vaccine</Button>
      </Box>

      <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '1%', marginRight: '1%', paddingRight: '10px', paddingLeft: '10px' }}>
        <Tabs
          value={vaccine}
          variant="fullWidth"
          aria-label="Tab Component"
          onChange={handleForm}
          indicatorColor="transparent"
          sx={{ borderRadius: '10px' }}
        >
          <Tab sx={{ backgroundColor: vaccine === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Dogs Vaccination Schedule" ></Tab>
          <Tab sx={{ backgroundColor: vaccine === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Cats Vaccination Schedule "></Tab>
        </Tabs>
      </Box>

      {vaccine === 0 && (
        <div className="form-content" style={{ marginLeft: '5%', marginRight: '5%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Vaccine ID</StyledTableCell>
                  <StyledTableCell align="center">Vaccine Name</StyledTableCell>
                  <StyledTableCell align="center"> Time Period</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dog && dog.map((menu, next) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">{menu.vaccine_id}</StyledTableCell>
                    <StyledTableCell align="center">{menu.name}</StyledTableCell>
                    <StyledTableCell align="center">{menu.period}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => displayUpdateForm(menu.vaccine_id)}><EditIcon /></IconButton>
                      <IconButton onClick={() => displayWarn(menu.vaccine_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {vaccine === 1 && (
        <div className="form-content" style={{ marginLeft: '5%', marginRight: '5%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Vaccine ID</StyledTableCell>
                  <StyledTableCell align="center">Vaccine Name</StyledTableCell>
                  <StyledTableCell align="center">Time Period</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cat && cat.map((menu, next) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">{menu.vaccine_id}</StyledTableCell>
                    <StyledTableCell align="center">{menu.name}</StyledTableCell>
                    <StyledTableCell align="center">{menu.period}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => getDetailsforUpdate(menu.vaccine_id)}><EditIcon /></IconButton>
                      <IconButton onClick={() => displayWarn(menu.vaccine_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {newvaccine && (
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
            marginLeft: '8%',
            borderRadius: '10px',
            marginTop: '25%',
            width: '700px',
            padding: '20px',
            backgroundColor: '#F0F0F5',
            position: 'relative',
            zIndex: 1001
          }}>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
              <div>
                <IconButton onClick={cancelAdding} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
              </div>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Add New Vaccine
              </Typography>
              <hr />

              <div style={{ marginTop: '20px' }} className="form-label">
                <FormLabel>Vaccine Name</FormLabel>
                <TextField id="outlined-basic" placeholder="Vaccine Name" variant="outlined" onChange={(e) => setname(e.target.value)} required />
              </div>

              <div style={{ marginBottom: '3%' }}>
                <FormLabel>Category</FormLabel>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={handleChangeCategory}
                    label="Pet Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Cat</MenuItem>
                    <MenuItem value={20}>Dog</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={{ marginTop: '20px' }} className="form-label">
                <FormLabel>Time Period (After) - Months</FormLabel>
                <TextField id="outlined-basic" placeholder="" variant="outlined" onChange={(e) => settime(e.target.value)} required />
              </div>

              <Button variant="contained" type="submit" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }} onClick={() => submitNewVaccine()}>Add Vaccine</Button>
            </div>

            {error && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{message}</Alert>
              </Stack>
            )}
          </FormControl>
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

              <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button onClick={deleteVaccine} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {update && (
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
            marginLeft: '8%',
            borderRadius: '10px',
            marginTop: '25%',
            width: '700px',
            padding: '20px',
            backgroundColor: '#F0F0F5',
            position: 'relative',
            zIndex: 1001
          }}>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
              <div>
                <IconButton onClick={cancelUpdating} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
              </div>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Update Vaccine
              </Typography>
              <hr />

              {details && details.map((menu, index) => (
                <>
                  <div className="form-label">
                    <FormLabel>Vaccine:  </FormLabel>
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
                          defaultValue={menu.vaccine_id + " - " + menu.name}
                        /></div>
                    </Box>
                  </div>

                  <div style={{ marginTop: '20px' }} className="form-label">
                    <FormLabel>Time Period (After) - Months</FormLabel>
                    <TextField
                      id="outlined-basic"
                      placeholder=""
                      variant="outlined"
                      defaultValue={menu.period}
                      onChange={(e) => setnewtime(e.target.value)}
                      required />
                  </div>

                  <Button variant="contained" type="submit" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }} onClick={() => updateVaccine(menu.vaccine_id)}>Update</Button>
                </>
              ))}
            </div>




            {error && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{message}</Alert>
              </Stack>
            )}
          </FormControl>

        </div>
      )}



    </div>
  )
}

export default AddVaccine