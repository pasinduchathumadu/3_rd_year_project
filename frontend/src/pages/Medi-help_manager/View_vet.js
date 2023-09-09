import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/caregiverlist.css";


import StarRateIcon from '@mui/icons-material/StarRate';
import {
    Typography, Stack, Card, CardActionArea, CardMedia, CardContent, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Alert
} from "@mui/material";

import { Grid, Box, Tab, Tabs, Button } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";



function Viw_vet() {

    const [menu, setemp] = useState([])
    const [id, setid] = useState("")
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [count , setcount ] = useState("")
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const[ price ,setprice1] = useState("")


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

    const set_count = async()=>{
        if(count <1){
            seterror(true)
            setmessage("Please Fill the Positive Number")
            return
        }
        const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/setcount',{
            count,
            id
        })
        if(res.data.message === "updated"){
            closePopup()
        }
    }
    const price_change = async()=>{
        if(price <0){
            seterror(true)
            setmessage("Please Fill the Positive Number")
            return
        }
        const res = await axios.post('http://localhost:5000/pet_care/medi_help_manager/setprice',{
            price,
            id
        })
        if(res.data.message === "updated"){
            closePopup()
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
                    <Typography>Medi Center Manager</Typography>
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
                        Medi Care Center
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
                        sx={{ borderRadius: "10px" }}
                    >
                        <Tab sx={{ backgroundColor: value === 0 ? "orange" : "white", color: value === 0 ? "white" : "black" }} label="Weekend Days" />
                        <Tab sx={{ backgroundColor: value === 1 ? "orange" : "white", color: value === 1 ? "white" : "black", }} label="Week Days" />
                    </Tabs>
                </Box>
            </Grid>

            {/* pet grooming  */}
            {value === 0 && (
                <div className="full-page">
                    <div className="maintopic">

                    </div>

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
                                        <Typography variant="body2" sx={{ color: 'red', fontSize: '20px',marginBottom:'2%' }}>Chanelling Fee - RS.{menu.fee}</Typography>
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
                                        <Typography variant="body2" sx={{ color: 'red', fontSize: '20px',marginBottom:'2%' }}>Chanelling Fee - RS.{menu.fee}</Typography>
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
        </>
    );
}

export default Viw_vet;
