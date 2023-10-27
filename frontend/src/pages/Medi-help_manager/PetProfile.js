import React, { useEffect, useState } from "react";
import '../../styles/Medi-help_manager/PetProfile.css';
// import DeletePet from "./DeletePet";
// import AddPet from "./AddPet";
// import AddVaccine from "./AddVaccine";
// import ViewVaccine from "./ViewVaccine";
// import ViewProfile from "./ViewProfile";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography, MenuItem, Select, InputLabel, IconButton, FormLabel, Box, TextField, Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import { FormControl } from "@mui/base";
import CloseIcon from '@mui/icons-material/Close';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import pdficon from '../../assests/pdficon.png'
import axios from "axios";
import { format } from 'date-fns';



const PetProfile = () => {
  const navigate = useNavigate("")
  // const [show, setShow] = useState(false);
  // const [model2Open, setModel2Open] = useState(false);
  // const [model3Open, setModel3Open] = useState(false);
  // const [model4Open, setModel4Open] = useState(false);
  // const [modelOpen, setModelOpen] = useState(false);

  const input = new Date();
  const date = input.toDateString();

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

  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }

  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  // connect profile 
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  const [main, setmain] = useState(true)
  const [add, setadd] = useState(false)
  const [nextVaccine, setnextVaccine] = useState(false)
  const [pastVaccine, setpastVaccine] = useState(false)
  const [other, setother] = useState(false)

  // get details for main page
  const [maindata, setmaindata] =useState("")
  const getDetails = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/getDetails`)
      const data = await res.data
      return data

    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getDetails()
    .then((data) =>setmaindata(data.data))
    .catch((err) => console.log(err))
  })

  //get pet ids from medi appointments
  const [addmedical, setaddmedical] = useState("")
  const addMedical = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/addMedical`)
      setaddmedical(res.data.data)
      setmain(false)
      setadd(true)
      seterror(false)
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // get vaccine details
  const [vacc, setvacc] = useState("")
  const getVaccineDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/getVaccineDetails`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    getVaccineDetails()
      .then((data) => setvacc(data.data))
      .catch((err) => console.log(err))
  })


  // submit add vaccine
  const [selectpetid, setselectpetid] = useState("")
  const [selectvaccine, setselectvaccine] = useState("")
  const [vaccinedate, setvaccinedate] = useState("")
  const [message, setmessage] = useState("")
  const [error, seterror] = useState(false)
  const date_today = format(input, 'yyy-MM-dd')

  const handlePet = (event) => {
    setselectpetid(event.target.value)
  }
  const handleVaccine = (event) => {
    setselectvaccine(event.target.value)
  }

  // submit add vaccine form 
  const submitAddMedical = async () => {
    if (selectpetid === "" || selectvaccine === "" || vaccinedate === "") {
      seterror(true)
      setmessage("Please enter all required fields")
      return;
    }
    if (vaccinedate > date_today) {
      seterror(true)
      setmessage("Please enter a valid date")
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/medi_help_manager/submitAddMedical`, {
        selectpetid,
        selectvaccine,
        vaccinedate,
      })
      if (res.data.message === 'There is an internal error') {
        setmessage('Internal error')
        seterror(true)
      } else if (res.data.message === 'success') {
        setmain(true)
        setadd(false)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // cancel adding vaccine records
  const cancelAdding = () => {
    setadd(false)
    setmain(true)
  }

  // view next vaccine details
  const nextVaccineDetails = (id) => {
    setnextVaccine(true)
    setmain(false)
  }

  // close next vaccination details box
  const closeNextVaccine = () => {
    setnextVaccine(false)
    setmain(true)
  }

  // view past vaccine details
  // const [id, setid] = useState("")
  // const [error1, seterror1] = useState(false)
  // const [message1, setmessage1] = useState("")
  // const [past,setpast] = useState("")

  const pastVaccinationDetails = async (id) => {
    //   try {
    //     const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/pastVaccinationDetails/${id}`)
    //     setpast(res.data.data)
    //     setid(id)
    //     setmain(false)
    //     /// seterror1(false)
    //     setpastVaccine(true)      
    //   } catch (err) {
    //     console.log(err)
    //   }
  }

  // close past vaccination details box
  const closePastVaccination = () => {
    setpastVaccine(false)
    setmain(true)
  }

  // navigate to vaccine shedule page
  const vaccineShedule = () => {
    navigate("/vaccine")
  }




  return (
    <div className="home-container" style={{ marginTop: '4%' }}>
      <div className="top">
        <div className="top-line">
          <p>Medi Help Center Manager</p>
          <p className="top-line-text">Today</p>
          <p class="top-line-text">{date}</p>
        </div>
        <div className="top-line">
          <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Pet Profiles</p>
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

      {main && (
        <>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
            <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={vaccineShedule} >Vaccination Shedule</Button>
            <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={addMedical}>Add Vaccine Records </Button>
          </div>

          <div style={{ padding: '2%' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                    {/* <StyledTableCell align="center">Client Email Address </StyledTableCell> */}
                    <StyledTableCell align="center">Next Vaccination</StyledTableCell>
                    <StyledTableCell align="center">Past Vaccinations</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {maindata && maindata.map((menu, index) => (
                    <StyledTableRow>
                      <StyledTableCell align="center">{menu.pet_id}</StyledTableCell>
                      {/* <StyledTableCell align="center">"clientrow.client_id"</StyledTableCell> */}
                      <StyledTableCell align="center">
                        <Button onClick={() => nextVaccineDetails(menu.pet_id)} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, width: '40%' }}>View</Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button onClick={pastVaccinationDetails} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, width: '40%' }}>View</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}

      {/* add new vaccine record */}
      {add && (
        <div style={{
          backgroundColor: '#f0f0f5',
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
          paddingBottom: '2%',
          marginLeft: '22%',
          marginRight: '3%',
          marginTop: '0%',
          width: '50%',
          borderRadius: '2%'
        }}
        >

          <div style={{ marginLeft: '94%' }}>
            <IconButton onClick={cancelAdding}><CloseIcon sx={{
              backgroundColor: 'red',
              color: 'white',
              marginLeft: '80%'
            }} /></IconButton>
          </div>

          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Add New Vaccine Records</Typography>
          <hr />
          <InputLabel sx={{ textAlign: 'center' }}><span style={{ color: 'red' }}>**</span>Here display only pet ids from medi appointments</InputLabel>

          <div style={{ marginBottom: '1%', marginTop: '1%' }}>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Typography>Select Pet ID</Typography>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectpetid}
                onChange={handlePet}
                label="Pet Category"
                sx={{ width: '50%' }}
              >
                {addmedical && addmedical.map((menu, index) => (
                  <MenuItem key={index} value={menu.pet_id}>
                    {menu.pet_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ marginBottom: '1%', marginTop: '1%' }}>
            <FormControl sx={{ minWidth: 120, width: '100%' }}>
              <Typography>Vaccine</Typography>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectvaccine}
                onChange={handleVaccine}
                label="Vaccine"
                sx={{ width: '50%' }}
              >
                {vacc && vacc.map((menu, index) => (
                  <MenuItem key={index} value={menu.vaccine_id}>
                    {menu.vaccine_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <Typography>Vaccined Date</Typography>
            <TextField type="date" sx={{ width: '50%' }} onChange={(e) => setvaccinedate(e.target.value)} />
          </div>


          {error && (
            <Stack sx={{ width: '100%', marginTop: '1%', marginBottom: '1%' }} spacing={2}>
              <Alert severity="error">{message}</Alert>
            </Stack>
          )}

          <div style={{ marginTop: '3%', }}>
            <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, width: '30%', marginLeft: '35%' }} onClick={submitAddMedical}>Submit</Button>
          </div>
        </div>
      )}

      {/* viewing next vaccination records details */}
      {nextVaccine && (
        <div style={{
          backgroundColor: '#f0f0f5',
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
          paddingBottom: '2%',
          marginLeft: '22%',
          marginRight: '3%',
          marginTop: '2%',
          width: '40%',
          borderRadius: '2%'
        }}
        >
          <div style={{ marginLeft: '94%' }}>
            <IconButton onClick={closeNextVaccine}><CloseIcon sx={{
              backgroundColor: 'red',
              color: 'white',
              marginLeft: '80%'
            }} /></IconButton>
          </div>

          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Next Vaccination Details</Typography>
          <hr />

          <div style={{ marginBottom: '1%', marginTop: '1%', display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ fontWeight: 'bold', marginRight: '1%' }}>Pet ID:  </Typography>
            <Typography sx={{ fontWeight: 'bold', marginLeft: '1%' }}>34  </Typography>
          </div>
          <hr />

          <div style={{ marginBottom: '1%', marginTop: '2%', marginLeft: '22%' }}>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" sx={{ width: '60%' }}>Vaccination ID</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: '60%' }}>2</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ width: '60%' }}>Vaccine Name</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: '60%' }}>XXX Vaccine</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left" sx={{ width: '60%' }}>Date</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: '60%' }}>2023-11-01</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </div>
        </div>
      )}

      {/* past vaccination records viewing */}
      {pastVaccine && (
        <div style={{
          backgroundColor: '#f0f0f5',
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
          paddingBottom: '2%',
          marginLeft: '28%',
          marginRight: '3%',
          marginTop: '2%',
          width: '40%',
          borderRadius: '2%'
        }}
        >
          <div style={{ marginLeft: '94%' }}>
            <IconButton onClick={closePastVaccination}><CloseIcon sx={{
              backgroundColor: 'red',
              color: 'white',
              marginLeft: '80%'
            }} /></IconButton>
          </div>

          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Past Vaccination Records</Typography>
          <hr />

          <div style={{ marginBottom: '1%', marginTop: '1%', display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ fontWeight: 'bold', marginRight: '1%' }}>Pet ID:  </Typography>
            <Typography sx={{ fontWeight: 'bold', marginLeft: '1%' }}>34  </Typography>
          </div>
          <hr />

          <div style={{ marginBottom: '1%', marginTop: '2%', marginLeft: '5%' }}>
            <Table sx={{ width: '60%' }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Vaccine ID</StyledTableCell>
                  <StyledTableCell align="center">Vaccine </StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center">clientrow.complain_id</StyledTableCell>
                  <StyledTableCell align="center">"clientrow.client_id"</StyledTableCell>
                  <StyledTableCell align="center">"clientrow.client_id"</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center">clientrow.complain_id</StyledTableCell>
                  <StyledTableCell align="center">"clientrow.client_id"</StyledTableCell>
                  <StyledTableCell align="center">"clientrow.client_id"</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PetProfile