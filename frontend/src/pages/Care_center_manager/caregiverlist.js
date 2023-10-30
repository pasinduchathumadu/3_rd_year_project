import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/caregiverlist.css";
import AddIcon from "@mui/icons-material/Add";

import {
  Typography, Stack, Card, CardActionArea, CardMedia, CardContent, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Alert, FormControl, IconButton, MenuItem, FormLabel, Select, InputLabel, DialogActions
} from "@mui/material";

import { Grid, Box, Tab, Tabs, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';




function Caregiverlist() {
  // const [modelOpen, setModelOpen] = useState(false);
  // const [modelOpen2, setModelOpen2] = useState(false);
  const [menu, setemp] = useState([])
  const [id, setid] = useState("")
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [error, seterror] = useState(false)
  const [message, setmessage] = useState("")

  const openPopup = (id) => {
    setid(id)
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    seterror(false)
    setIsPopupOpen(false);
  };

  const input = new Date();
  const date = input.toDateString();

  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  };
  const [open1 , setopen1 ] = useState(false)
  const reassign = () =>{
    seterror(false);
    setopen1(true);
    
  }
  const handleClose1 = ()=>{
    setopen1(false)
  }

  const leave_submit = async () => {
    const selectedStartDate = new Date(dateStart);
    const selectedEndDate = new Date(dateEnd);
    if (dateStart === "" || dateEnd === "") {
      seterror(true)
      setmessage("Please Filled The Fields!!")
      return
    }
    if (selectedStartDate < input || selectedEndDate < input) {
      seterror(true)
      setmessage("Please Find Future Date!!")
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/pet_care/care_center_manager/leave', {
        id,
        dateStart,
        dateEnd
      })
      if (res.data.message === "updated") {
        closePopup()

      }

    } catch (err) {
      console.log(err)
    }
  }

  const navigate = useNavigate("")

  const profile = () => {
    navigate("/profile")
  }

  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };

  const get_employee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/get_employee`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    get_employee()
      .then((data) => setemp(data.data))
      .catch((err) => console.log(err))
  })

  // ADD NEW CARE GIVER/TRAINER
  const [addnew, setaddnew] = useState(false)

  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")
  const [first, setfirst] = useState("")
  const [last, setlast] = useState("")
  const [contact, setcontact] = useState("")
  const [empemail, setempemail] = useState("")
  const [type, settype] = useState("")

  const handleType = (event) => {
    settype(event.target.value)
  }
  // open add new caregiver form
  const addNewcaregiver = () => {
    seterror1(false)
    setvalue(false)
    setaddnew(true)
  }

  // submit add new employee form
  const submitNewEmployee = async () => {
    if (first === "" || last === "" || contact === "" || empemail === "" || type === "") {
      seterror1(true)
      setmessage1('Please enter all required fileds')
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/submitNewEmployee`, {
        first,
        last,
        contact,
        empemail,
        type,
        image
      })
      if (res.data.message === 'There is an internal error') {
        setmessage1('Internal error')
        seterror1(true)
      } else if (res.data.message === 'success') {
        setvalue(1)
        setaddnew(false)
        // seterror(false)

      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  // cancel adding
  const cancelAdding = () => {
    setvalue(0)
    setaddnew(false)
  }

  // ADD REASON FOR REMOVE AN EMPLOYEE
  const [addReason, setaddReason] = useState(false)
  const [id1, setid1] = useState("")
  // cancel removing 
  const cancelRemoving = () => {
    setaddReason(false)
    setvalue(0)
  }

  // display confirmation box
  const confirmationForm = (id) => {
    setaddReason(true)
    setvalue(false)
    setid1(id)
  }
  const [image, setimage] = useState("")
  const [selectfile, setfile] = useState(null)
  const handlefilechange = async (event) => {
    const file = event.target.files[0]
    setfile(file)
    setimage(file.name)
  }
  // get emplyee id
  const [details, setdetails] = useState("")
  const getEmplyeeID = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/getEmplyeeID/${id1}`)
      const data = await res.data
      return data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getEmplyeeID()
      .then((data) => setdetails(data.data))
      .catch((err) => console.log(err))
  })
const [ assigned , setassign ] = useState("")
  const handleassign = (event)=>{
    setassign(event.target.value)
  }
  const assignemp = async()=>{
    if(assigned===""){
      seterror(true)
      setmessage("Please be selected Employee")
      return
    }
    try{
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/assign/${assigned}`)
      if(res.data.message === "assigned"){
        seterror(true)
        setmessage("Successfully Re-Assigned The Employee")
      }
      if (res.data.message === "exist") {
        seterror(true)
        setmessage("Already In working Can not be re-assigned")
    }

    }catch(err){
      console.log(err)
    }
  }
  const handleFileUpload = async () => {
    seterror(false)


    try {
      const formData = new FormData();
      formData.append("image", selectfile);

      const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.message === "File uploaded successfully") {
        submitNewEmployee()

      }

      console.log("File uploaded successfully!");
      // Add any further handling of the response from the backend if needed.

    } catch (err) {
      console.log("There is an internal error", err);
    }
  }
  const [reason, setreason] = useState("") //reason
  const [error2, seterror2] = useState(false)
  const [message2, setmessage2] = useState("")
  // submit remove confirmation form
  const submitConfirmationForm = async (id) => {
    if (reason === "") {
      seterror2(true)
      setmessage2("Please fill the field")
      return;
    }
    setvalue(0)
    setaddReason(false)
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/submitConfirmationForm`, {
        id,
        reason
      })
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  return (
    <>
      <div style={{ display: "flex", marginTop: '4%' }}>
        <div
          style={{
            display: "inline",
            marginTop: "30px",
            marginLeft: "2%",
            width: "33.3%",
          }}
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
            justifyContent: "center",
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
            CareGivers
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: "33.3%",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
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
      </div>
      <Grid sx={{ marginLeft: '100px' }}>
        <Box
          sx={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "2%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Tab Component"
            indicatorColor="transparent"
            sx={{ borderRadius: "10px", marginRight: '3%' }}
          >
            <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black" }} label="Pet Grooming Care Givers" />
            <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black", }} label=" Trainning & Exercising Employees" />
          </Tabs>
        </Box>
      </Grid>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '7%', marginRight: '7%' }}>

        <Button sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }} onClick={addNewcaregiver}><AddIcon /> ADD NEW CAREGIVER</Button>


        <Button sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }} onClick={reassign}><AddIcon />Re-Assign Caregiver</Button>

      </div>


      {/* pet grooming  */}
      {value === 0 && (
        <div className="full-page">
          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>
            {menu.filter((menu, index) => menu.type !== "TRAINING").map((menu, index) => (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc(menu.img)}
                    alt={menu.first_name} />
                  <CardContent>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography variant="h5" gutterBottom component={"div"}>
                        {menu.first_name + " " + menu.last_name}
                      </Typography>
                      <IconButton onClick={() => confirmationForm(menu.emp_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                    </Stack>
                    <Typography variant="body2">{menu.email}</Typography>
                    <Typography variant="body2">{menu.contact_number}</Typography><br />
                    <Typography variant="body2" sx={{ color: "black", marginBottom: '9px' }}>Grooming Type - {menu.type}</Typography>
                    <Button
                      sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: "black" } }}
                      onClick={() => {
                        openPopup(menu.emp_id);
                      }}
                    >Add Leave</Button>
                  </CardContent>
                </CardActionArea>
              </Card>

            ))}
          </Box>
          {/* {modelOpen && <Regicaregiver />} */}
          {/* {modelOpen2 && <CaregiverProfile />} */}
        </div>
      )}

      {value === 1 && (
        // trianing employees
        <div className="full-page">
          <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>
            {menu.filter((menu, index) => menu.type === "TRAINING").map((menu, index) => (
              <Card sx={{ maxWidth: "300px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "300px" }}
                    component={"img"}
                    src={getImageSrc(menu.img)}
                    alt={menu.first_name} />
                  <CardContent>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography variant="h5" gutterBottom component={"div"}>
                        {menu.first_name + " " + menu.last_name}
                      </Typography>
                      <IconButton onClick={() => confirmationForm(menu.emp_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                    </Stack>
                    <Typography variant="body2">{menu.email}</Typography>
                    <Typography variant="body2">{menu.contact_number}</Typography><br />
                    <Typography variant="body2" sx={{ color: "black", marginBottom: '9px' }}>Grooming Type - {menu.type}</Typography>

                    <Button
                      sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: "black" } }}
                      onClick={() => {
                        openPopup(menu.emp_id);
                      }}
                    >Add Leave</Button>

                  </CardContent>
                </CardActionArea>
              </Card>

            ))}</Box>

          {/* {modelOpen && <Regicaregiver />} */}
          {/* {modelOpen2 && <CaregiverProfile />} */}


        </div>
      )}
      {/* ADDING LEAVE */}
      <Dialog open={isPopupOpen} onClose={closePopup} fullWidth>
        <DialogTitle>Add Leave</DialogTitle>
        <hr />
        <DialogContent >
          <DialogContentText sx={{ paddingBottom: '1%' }}>Enter Leave Details:</DialogContentText>
          <Typography>Start Date</Typography>
          <TextField
            placeholder="Date Start"
            type="date"
            fullWidth

            onChange={(e) => setDateStart(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Typography>End Date</Typography>
          <TextField
            placeholder="Date End"
            type="date"
            fullWidth

            onChange={(e) => setDateEnd(e.target.value)}
          />
        </DialogContent>
        {error && (
          <Stack sx={{ width: '75%', marginLeft: '3%' }} spacing={2}>

            <Alert sx={{ width: '75%' }} severity="warning">{message}</Alert>

          </Stack>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Handle leave submission here
            leave_submit()
          }}
          sx={{ margin: '16px' }}
        >
          Submit
        </Button>
      </Dialog>


      {/* ADD NEW CARE GIVER OR TRAINER */}
      {addnew && (
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
                Add New Care Giver OR Trainer
              </Typography>
              <hr />

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginTop: '20px' }} className="form-label">
                  <FormLabel>First Name</FormLabel>
                  <TextField id="outlined-basic" placeholder="First Name" variant="outlined" onChange={(e) => setfirst(e.target.value)} required />
                </div>

                <div style={{ marginTop: '20px' }} className="form-label">
                  <FormLabel>Last Name</FormLabel>
                  <TextField id="outlined-basic" placeholder="Last Name" variant="outlined" onChange={(e) => setlast(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginTop: '20px' }} className="form-label">
                  <FormLabel> Email Address</FormLabel>
                  <TextField id="outlined-basic" placeholder="Email Address" variant="outlined" onChange={(e) => setempemail(e.target.value)} required />
                </div>

                <div style={{ marginTop: '20px' }} className="form-label">
                  <FormLabel>  Contact Number</FormLabel>
                  <TextField id="outlined-basic" placeholder="Contact Number" variant="outlined" onChange={(e) => setcontact(e.target.value)} required />
                </div>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <FormLabel>Type</FormLabel>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={handleType}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>BATH</MenuItem>
                    <MenuItem value={20}>BATH AND HAIR CUTS</MenuItem>
                    <MenuItem value={30}>MINI GROOMING</MenuItem>
                    <MenuItem value={40}>TRAINING</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Grid item sx={{ paddingTop: '20px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ display: 'inline' }}>
                    <Button
                      variant="contained"
                      component="label"

                      startIcon={<CloudUploadIcon />}
                    >
                      Upload File
                      <input type="file" hidden onChange={handlefilechange} required />

                    </Button>
                  </div>
                  <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                    {selectfile && (
                      <Typography>{selectfile.name}</Typography>

                    )}
                  </div>
                </div>

              </Grid>

              {error1 && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">{message1}</Alert>
                </Stack>
              )}

              <Button variant="contained" type="submit" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }} onClick={() => handleFileUpload()} >Submit</Button>
            </div>
          </FormControl>
        </div>
      )}
      <Dialog
        open={open1}
        onClose={handleClose1}
       
        fullWidth
      >

        <DialogTitle id="alert-dialog-title">
          {"Re - Assigned The Employees"}
          <IconButton
            aria-label="close"
            onClick={handleClose1}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form action="">
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Employee</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assigned}
                  label="Employee ID"
                  onChange={handleassign}
                >
                  {menu.map((row, index) => (
                    <MenuItem value={row.emp_id} key={row.emp_id}>{row.emp_id}-{row.first_name + " "+row.last_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            

          </form>
        </DialogContent>
        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>

            <Alert severity="info">{message}</Alert>
          </Stack>
        )}
        <DialogActions>

          <Button variant="outlined" color="secondary" onClick={handleClose1}>
            Cancel
          </Button>

          <Button
            onClick={assignemp}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* ADD REASON FOR REMOVING */}
      {addReason && (
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
                <IconButton onClick={cancelRemoving} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
              </div>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Confirmation of Removing?
              </Typography>
              <hr />

              {details && details.map((menu, index) => (
                <>
                  <div style={{ marginTop: '20px' }} className="form-label">
                    <Typography sx={{ fontWeight: 'bold' }}>Emplyee ID : {menu.emp_id} </Typography>
                  </div>

                  <div style={{ marginTop: '20px' }} className="form-label">
                    <FormLabel>Enter the Reason</FormLabel>
                    <TextField id="outlined-basic" placeholder="Reason" variant="outlined" onChange={(e) => setreason(e.target.value)} required />
                  </div>

                  {error2 && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">{message2}</Alert>
                    </Stack>
                  )}

                  <Button variant="contained" type="submit" sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }} onClick={() => submitConfirmationForm(menu.emp_id)} >Submit</Button>
                </>
              ))}
            </div>
          </FormControl>
        </div>
      )}



    </>
  );
}

export default Caregiverlist;
