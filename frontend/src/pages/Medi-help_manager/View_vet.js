import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/caregiverlist.css";


import StarRateIcon from '@mui/icons-material/StarRate';
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
    MenuItem
} from "@mui/material";

import { Grid, Box, Tab, Tabs, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';



function Viw_vet() {
    const [menu, setemp] = useState([])
    const [id, setid] = useState("")
    const [success, setsuccess] = useState("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [isPopupOpen3, setIsPopupOpen3] = useState(false)
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [count, setcount] = useState("")
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const [price, setprice1] = useState("")

    const [image, setimage] = useState("")
    const [first, setfirst] = useState("")
    const [second, setsecond] = useState("")
    const [fee, setfee] = useState("")
    const [starttime, settime] = useState("")
    const [contact, setcontact] = useState("")
    const [countnew, setcountnew] = useState("")
    const [working, setworking] = useState(0)
    const [selectfile, setfile] = useState(null)
    const handleChangeworking = (event) => {
        setworking(event.target.value)
    }
    const handlefilechange = async (event) => {
        const file = event.target.files[0]
        setfile(file)
        setimage(file.name)
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
    };

    const input = new Date();
    const date = input.toDateString();

    const [value, setvalue] = React.useState(0);
    const handleChange = (event, newvalue) => {
        setvalue(newvalue);
    };

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
        setIsPopupOpen3(true)
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


    const addvet = async()=>{
        if(first === "" || second ==="" || starttime ==="" || fee === "" || contact === "" ||countnew ==="" || image ==="" || working === ""){
            seterror(true)
            setmessage("Please fill all the required!!")
            return
        }
        try{
            const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/add_vet',{
                first,
                second,
                starttime,
                fee,
                contact,
                countnew,
                image,
                working
            })
            if(res.data.message === "Added"){
                seterror(false)
                setmessage("There is no error")
            }
            else{
                seterror(true)
                setmessage("Cannot be Added")
            }

        }catch(err){
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

    return (
        <>
            <div className="home-container" style={{ marginTop: '4%'}}>
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
                        <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black" }} label="Weekend Days" />
                        <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black", }} label="Week Days" />
                    </Tabs>
                </Box>
                <Button onClick={() => switchtoadd()} sx={{ backgroundColor: 'black', color: 'white', width: '10%', borderRadius: '5%', marginLeft: '0%' ,':hover':{backgroundColor:'black'}}}>Add Vet</Button>
            </Grid>

            {/* pet grooming  */}
            {value === 0 && (
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
                                            {menu.first_name + " " + menu.last_name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'black', fontSize: '20px' }}>{menu.contact_number}</Typography><br />
                                        <Typography variant="body2" sx={{ display: 'inline-flex', alignItems: 'center', color: 'black', fontSize: '18px' }}>
                                            {menu.rate}
                                            <span style={{ marginRight: '4px', color: 'orange' }}></span>
                                            <StarRateIcon style={{ color: 'orange' }} />
                                            <StarRateIcon style={{ color: 'orange' }} />
                                        </Typography>


                                        <Typography variant="body2" sx={{ color: "black", marginBottom: '9px', fontSize: '14px' }}>Working - {menu.working}</Typography>
                                        <Typography variant="body2" sx={{ color: 'red', fontSize: '20px', marginBottom: '2%' }}>Chanelling Fee - RS.{menu.fee}</Typography>
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

            {value === 1 && (
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
                                            {menu.first_name + " " + menu.last_name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'black', fontSize: '20px' }}>{menu.contact_number}</Typography><br />
                                        <Typography variant="body2" sx={{ display: 'inline-flex', alignItems: 'center', color: 'black', fontSize: '18px' }}>
                                            {menu.rate}
                                            <span style={{ marginRight: '4px', color: 'orange' }}></span>
                                            <StarRateIcon style={{ color: 'orange' }} />
                                            <StarRateIcon style={{ color: 'orange' }} />
                                        </Typography>


                                        <Typography variant="body2" sx={{ color: "black", marginBottom: '9px', fontSize: '14px' }}>Working - {menu.working}</Typography>
                                        <Typography variant="body2" sx={{ color: 'red', fontSize: '20px', marginBottom: '2%' }}>Chanelling Fee - RS.{menu.fee}</Typography>
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
            <Dialog open={isPopupOpen3} onClose={closePopup} fullWidth>
                <DialogTitle>Add Vet</DialogTitle>
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
                        <Stack sx={{color:"red" }}>
                        
                            {selectfile && (

                                <Typography>{selectfile.name}</Typography>

                            )}
                        </Stack>
                    </Stack>
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
                        handleFileUpload()

                    }}
                    sx={{ margin: '16px' }}
                >
                    Submit
                </Button>
            </Dialog>
        </>
    );
}

export default Viw_vet;
