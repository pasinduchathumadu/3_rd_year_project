import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/caregiverlist.css";
import StarRateIcon from '@mui/icons-material/StarRate';
import AddIcon from '@mui/icons-material/Add';
import {
    Typography, Stack, Card, CardActionArea, CardMedia, CardContent, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogActions,
    IconButton
} from "@mui/material";
import { Grid, Box, Tab, Tabs, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

function Viw_vet() {
    const [menu, setemp] = useState([])
    const [id, setid] = useState("")
    const [success, setsuccess] = useState("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [isPopupOpen3, setIsPopupOpen3] = useState(false)
    const [isPopupOpen4, setIsPopupOpen4] = useState(false)
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [count, setcount] = useState("")
    const [qualifications, setqualifications] = useState("")
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const [price, setprice1] = useState("")
    const [vetid, setvetid] = useState([])
    const [image, setimage] = useState("")
    const [first, setfirst] = useState("")
    const [second, setsecond] = useState("")
    const [fee, setfee] = useState("")
    const [reason, setreason] = useState("")
    const [starttime, settime] = useState("")
    const [contact, setcontact] = useState("")
    const [countnew, setcountnew] = useState("")
    const [working, setworking] = useState(0)
    const [selectfile, setfile] = useState(null)
    const [selectedID, setselectID] = useState("")
    const handleChangeworking = (event) => {
        setworking(event.target.value)
    }
    const handlefilechange = async (event) => {
        const file = event.target.files[0]
        setfile(file)
        setimage(file.name)
    }
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState('')

    const handleClose1 = () => {
        setopen1(false)
    }
    const openPopup = (id) => {
        setid(id)
        setIsPopupOpen(true);
    };
    const openPopup1 = (id) => {
        setid(id)
        setIsPopupOpen1(true);
    };
    const openPopup2 = (id) => {
        setid(id)
        setIsPopupOpen2(true);
    };

    const closePopup = () => {
        seterror(false)
        setIsPopupOpen(false);
        setIsPopupOpen1(false)
        setIsPopupOpen2(false)
        setIsPopupOpen3(false)
        setIsPopupOpen4(false)
    };

    const input = new Date();
    const date = input.toDateString();

    const [value, setvalue] = React.useState(0);
    const handleChange = (event, newvalue) => {
        setvalue(newvalue);
    };

    const handleselect = (event) => {
        setselectID(event.target.value)

    }

    const removevet = () => {
        getid()
    }
  
    const getid = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/medi_help_manager/remove')
            setvetid(res.data.data)
            setIsPopupOpen4(true)


        } catch (err) {
            console.log(err);
        }
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
            const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/leave', {
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


    const switchtoadd = () => {
        seterror1(false)
        setmessage1("")
        setIsPopupOpen3(true)
    }

    const removed = async () => {
        if (selectedID === "" || reason === "") {
            seterror(true)
            setmessage("Please be filled the required fields!!")
            return
        }
        try {
            const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/remove_final', {
                selectedID,
                reason
            })
            if (res.data.message === "Deleted") {
                seterror(true)
                setmessage("Successfully Removed!!")
            }

        } catch (err) {
            console.log(err)
        }
    }


    const set_count = async () => {
        if (count < 1) {
            seterror(true)
            setmessage("Please Fill the Positive Number")
            return
        }
        const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/setcount', {
            count,
            id
        })
        if (res.data.message === "updated") {
            closePopup()
        }
    }


    const addvet = async () => {
        if (first === "" || second === "" || starttime === "" || fee === "" || contact === "" || countnew === "" || image === "" || working === "") {
            seterror1(true)
            setmessage1("Please fill all the required!!")
            return
        }
        try {
            const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/add_vet', {
                first,
                second,
                starttime,
                fee,
                contact,
                countnew,
                image,
                working,
                qualifications
            })
            if (res.data.message === "Added") {
                seterror1(true)
                setmessage1("Successfully Added")
            }
            else {
                seterror1(true)
                setmessage1("Cannot be Added")
            }

        } catch (err) {
            console.log(err)
        }
    }
    const handleFileUpload = async () => {
        seterror(false)
        setsuccess(false)


        try {
            const formData = new FormData();
            formData.append("image", selectfile);

            const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.message === "File uploaded successfully") {
                addvet()

            }

            console.log("File uploaded successfully!");
            // Add any further handling of the response from the backend if needed.

        } catch (err) {
            console.log("There is an internal error", err);
        }
    }

    const price_change = async () => {
        if (price < 0) {
            seterror(true)
            setmessage("Please Fill the Positive Number")
            return
        }
        if(price === ""){
            seterror(true)
            setmessage("Please be updated price")
            return

        }
        const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/setprice', {
            price,
            id
        })
        if (res.data.message === "updated") {
            closePopup()
        }
    }

    const navigate = useNavigate("")

    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    };

    const get_employee = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/get_medi`)
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

    // connect profile 
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)

    }
    const [assigned, setassign] = useState("")
    const [open1, setopen1] = useState(false)
    const reassign = () => {
        seterror(false)
        getassign()
    }
    const  getassign = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/medi_help_manager/remove')
            setvetid(res.data.data)
            setopen1(true)


        } catch (err) {
            console.log(err);
        }
    }
    const handleassign = (event) => {
        setassign(event.target.value)
    }
    const assignemp = async () => {
        if (assigned === "") {
            seterror(true)
            setmessage("Please be selected Employee")
            return
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/medi_help_manager/assign`,{
                assigned
            })
            if (res.data.message === "assigned") {
                seterror(true)
                setmessage("Successfully Re-Assigned The Vet")
            }
            if (res.data.message === "exist") {
                seterror(true)
                setmessage("Already In working Can not be re-assigned")
            }


        } catch (err) {
            console.log(err)
        }
    }
    const [emp1 , setemp1 ] = useState([])
    const get_employee1 = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/get_employee1`)
        const data = await res.data
        return data
  
      } catch (err) {
        console.log(err)
      }
    }
  
    useEffect(() => {
      get_employee1()
        .then((data) => setemp1(data.data))
        .catch((err) => console.log(err))
    })

    return (
        <>
            <div className="home-container" style={{ marginTop: '4%' }}>
                <div className="top">
                    <div className="top-line">
                        <p>Medi Help Center Manager</p>
                        <p className="top-line-text">Today</p>
                        <p class="top-line-text">{date}</p>
                    </div>
                    <div className="top-line">
                        <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Doctors</p>
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
                        sx={{ borderRadius: "10px" }}
                    >
                        <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black", }} label="Week Days" />
                        <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black" }} label="Weekend Days" />

                    </Tabs>
                </Box>

                <Button onClick={() => switchtoadd()} sx={{ backgroundColor: 'black', color: 'white', width: '10%', borderRadius: '5%', marginLeft: '0%', ':hover': { backgroundColor: 'black' } }}><AddIcon />Add Vet</Button>
                <Button onClick={() => reassign()} sx={{ backgroundColor: 'black', color: 'white', width: '13%', borderRadius: '5%', marginLeft: '30%', ':hover': { backgroundColor: 'black' } }}><AddIcon />Re - Assign Vet</Button>
                <Button onClick={() => removevet()} sx={{ backgroundColor: 'black', color: 'white', width: '10%', borderRadius: '5%', marginLeft: '0%', ':hover': { backgroundColor: 'black' }, float: 'right', marginRight: '5%' }}><AddIcon />Remove Vet</Button>
            </Grid>


            {value === 1 && (
                <div className="full-page">


                    <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>

                        {menu.filter((menu, index) => menu.working === "weekend").map((menu, index) => (
                            <Card sx={{ maxWidth: "400px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ minHeight: "300px" }}
                                        component={"img"}
                                        src={getImageSrc(menu.img)}
                                        alt={menu.first_name} />
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom component={"div"}>
                                            Dr.{menu.first_name + " " + menu.last_name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'black', fontSize: '20px' }}>{menu.qualifications}</Typography><br />
                                        <Typography variant="body2" sx={{ display: 'inline-flex', alignItems: 'center', color: 'black', fontSize: '18px' }}>
                                            {menu.rate}
                                            <span style={{ marginRight: '4px', color: 'orange' }}></span>
                                            <StarRateIcon style={{ color: 'orange' }} />
                                            <StarRateIcon style={{ color: 'orange' }} />
                                        </Typography>


                                        <Typography variant="body2" sx={{ color: "black", marginBottom: '9px', fontSize: '14px' }}>Working - {menu.working}</Typography>
                                        <Typography variant="body2" sx={{ color: 'red', fontSize: '20px', marginBottom: '2%' }}>Doctor Fee - RS.{menu.fee}</Typography>
                                        <Button
                                            sx={{ backgroundColor: 'black', marginRight: '1%', color: 'white', ':hover': { backgroundColor: "black" } }}
                                            onClick={() => {
                                                openPopup(menu.vet_id);
                                            }}
                                        >Add Leave</Button>
                                        <Button
                                            sx={{ backgroundColor: 'black', marginRight: '2%', color: 'white', ':hover': { backgroundColor: "black" } }}
                                            onClick={() => {
                                                openPopup1(menu.vet_id);
                                            }}
                                        >Count</Button>
                                        <Button
                                            sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: "black" } }}
                                            onClick={() => {
                                                openPopup2(menu.vet_id);
                                            }}
                                        >Change Fee</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        ))}</Box>




                </div>
            )}

            {value === 0 && (
                // trianing employees
                <div className="full-page">
                    <div className="maintopic">

                    </div>

                    <Box sx={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', display: "flex", flexWrap: "wrap", justifyContent: "center", border: '15px', borderRadius: '20px', borderColor: 'white', borderStyle: 'solid' }}>

                        {menu.filter((menu, index) => menu.working === "week").map((menu, index) => (
                            <Card sx={{ maxWidth: "400px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '39px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ minHeight: "300px" }}
                                        component={"img"}
                                        src={getImageSrc(menu.img)}
                                        alt={menu.first_name} />
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom component={"div"}>
                                            Dr.{menu.first_name + " " + menu.last_name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'black', fontSize: '20px' }}>{menu.qualifications}</Typography><br />
                                        <Typography variant="body2" sx={{ display: 'inline-flex', alignItems: 'center', color: 'black', fontSize: '18px' }}>
                                            {menu.rate}
                                            <span style={{ marginRight: '4px', color: 'orange' }}></span>
                                            <StarRateIcon style={{ color: 'orange' }} />
                                            <StarRateIcon style={{ color: 'orange' }} />
                                        </Typography>


                                        <Typography variant="body2" sx={{ color: "black", marginBottom: '9px', fontSize: '14px' }}>Working - {menu.working}</Typography>
                                        <Typography variant="body2" sx={{ color: 'red', fontSize: '20px', marginBottom: '2%' }}>Doctor Fee - RS.{menu.fee}</Typography>
                                        <Button
                                            sx={{ backgroundColor: 'black', marginRight: '1%', color: 'white', ':hover': { backgroundColor: "black" } }}
                                            onClick={() => {
                                                openPopup(menu.vet_id);
                                            }}
                                        >Add Leave</Button>
                                        <Button
                                            sx={{ backgroundColor: 'black', marginRight: '2%', color: 'white', ':hover': { backgroundColor: "black" } }}
                                            onClick={() => {
                                                openPopup1(menu.vet_id);
                                            }}
                                        >Count</Button>
                                        <Button
                                            sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: "black" } }}
                                            onClick={() => {
                                                openPopup2(menu.vet_id);
                                            }}
                                        >Change Fee</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        ))}</Box>



                </div>
            )}

            <Dialog open={isPopupOpen} onClose={closePopup} fullWidth>
                <DialogTitle>Add Leave</DialogTitle>
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
            <Dialog open={isPopupOpen1} onClose={closePopup} fullWidth>
                <DialogTitle>Update The Numeber of Appointments Per Day</DialogTitle>
                <DialogContent >
                    <DialogContentText sx={{ paddingBottom: '1%' }}>Enter New Appointments count:</DialogContentText>

                    <TextField
                        placeholder="Appointment Count"
                        type="number"
                        fullWidth

                        onChange={(e) => setcount(e.target.value)}
                        sx={{ marginBottom: 2 }}
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
                        set_count()
                    }}
                    sx={{ margin: '16px' }}
                >
                    Update
                </Button>
            </Dialog>
            <Dialog open={isPopupOpen2} onClose={closePopup} fullWidth>
                <DialogTitle>Update The Chanelling Fee</DialogTitle>
                <DialogContent >
                    <DialogContentText sx={{ paddingBottom: '1%' }}>Enter New Appointments count:</DialogContentText>

                    <TextField
                        placeholder="Appointment Fee"
                        type="number"
                        fullWidth

                        onChange={(e) => setprice1(e.target.value)}
                        sx={{ marginBottom: 2 }}
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
                        price_change()
                    }}
                    sx={{ margin: '16px' }}
                >
                    Update
                </Button>
            </Dialog>
            <Dialog
                open={open1}
                onClose={handleClose1}

                fullWidth
            >

                <DialogTitle id="alert-dialog-title">
                    {"Re - Assigned The Vet"}
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
                                <InputLabel id="demo-simple-select-label">Select Vet</InputLabel>
                                <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={assigned}
                                      label="Employee ID"
                                      onChange={handleassign}
                                >
                                    {emp1.map((row, index) => (
                                        <MenuItem value={row.vet_id} key={row.vet_id}>Dr.{row.first_name + " " + row.last_name}</MenuItem>
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

            <Dialog open={isPopupOpen3} onClose={closePopup} fullWidth>
                <DialogTitle sx={{ marginLeft: '40%', fontWeight: 'bold' }}>Add Vet</DialogTitle>
                <hr />
                <DialogContent >
                    <DialogContentText sx={{ paddingBottom: '1%' }}>Enter  Details:</DialogContentText>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
                        <Stack sx={{ flex: 1, marginRight: '2%' }}>
                            <Typography>First Name</Typography>
                            <TextField
                                placeholder="First Name"
                                type="text"
                                onChange={(e) => setfirst(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                        </Stack>
                        <Stack sx={{ flex: 1 }}>
                            <Typography>Last Name</Typography>
                            <TextField
                                placeholder="Last Name"
                                type="text"
                                onChange={(e) => setsecond(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                        </Stack>
                    </Stack>
                    <Typography>Contact Number</Typography>
                    <TextField
                        placeholder="Contact me"
                        type="text"
                        fullWidth

                        onChange={(e) => setcontact(e.target.value)}
                    />
                    <Typography sx={{ marginTop: '2%' }}>Chanelling Start</Typography>
                    <TextField
                        placeholder="Chanelling Start Time"
                        type="time"
                        fullWidth

                        onChange={(e) => settime(e.target.value)}
                    />



                    <Stack sx={{ display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
                        <Stack sx={{ flex: 1, marginRight: '2%' }}>
                            <Typography>Appointment Fee</Typography>
                            <TextField
                                placeholder="Chanelling Fee"
                                type="number"
                                onChange={(e) => setfee(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                        </Stack>
                        <Stack sx={{ flex: 1 }}>
                            <Typography>Appointment Count</Typography>
                            <TextField
                                placeholder="Daily Appointment Count"
                                type="number"
                                onChange={(e) => setcountnew(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                        </Stack>
                    </Stack>

                    <Typography>Working Shedule</Typography>
                    <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>

                            <Select
                                placeholder="Working Days"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={working}

                                onChange={handleChangeworking}
                            >
                                <MenuItem value={10}>Week Days</MenuItem>
                                <MenuItem value={20}>Weekend Days</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <Typography sx={{ marginTop: '1%' }}>Degree Qualifications</Typography>
                    <TextField
                        placeholder="Qualifications"
                        type="text"
                        fullWidth

                        onChange={(e) => setqualifications(e.target.value)}
                    />
                    <Stack sx={{ display: 'flex', marginTop: '2%' }}>
                        <Stack sx={{ display: 'inline' }}>
                            <Button
                                variant="contained"
                                component="label"

                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Image
                                <input type="file" hidden onChange={handlefilechange} required />
                            </Button>
                        </Stack>
                        <Stack sx={{ color: "red" }}>

                            {selectfile && (

                                <Typography>{selectfile.name}</Typography>

                            )}
                        </Stack>
                    </Stack>
                </DialogContent>
                {error1 && (
                    <Stack sx={{ width: '75%', marginLeft: '3%', marginTop: '2%' }} spacing={2}>

                        <Alert sx={{ width: '75%' }} severity="warning">{message1}</Alert>

                    </Stack>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        // Handle leave submission here
                        handleFileUpload()

                    }}
                    sx={{ margin: '16px' }}
                >
                    Submit
                </Button>
            </Dialog>
            <Dialog open={isPopupOpen4} onClose={closePopup} fullWidth>
                <DialogTitle sx={{ marginLeft: '40%', fontWeight: 'bold' }}>Remove Vet</DialogTitle>
                <hr />
                <DialogContent >
                    <DialogContentText sx={{ paddingBottom: '1%' }}>Select Vet ID:</DialogContentText>

                    <Box sx={{ minWidth: 120, marginBottom: '2%', marginTop: '2%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">ID</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedID}
                                label="ID"
                                onChange={handleselect}
                            >
                                {vetid.map((menu, index) => (
                                    <MenuItem value={menu.vet_id} key={menu.vet_id}>ID:{menu.vet_id} - Dr.{menu.first_name + " " + menu.last_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography>Reason</Typography>
                    <TextField
                        placeholder="Reason For Remove"
                        type="text"
                        required
                        fullWidth

                        onChange={(e) => setreason(e.target.value)}
                    />






                </DialogContent>
                {error && (
                    <Stack sx={{ width: '75%', marginLeft: '3%' }} spacing={2}>

                        <Alert sx={{ width: '75%' }} severity="info">{message}</Alert>

                    </Stack>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={removed}
                    sx={{ margin: '16px' }}
                >
                    Removed
                </Button>
            </Dialog>
        </>
    );
}

export default Viw_vet;
