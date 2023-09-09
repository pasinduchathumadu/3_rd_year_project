

import dog_training from "../../assests/dog-training.png";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Alert, Button, Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../../components/LoadingIndicator";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
const Training_Pets = () => {
    const current = new Date()
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('1');
    const [shedule, setshedule] = useState([]);
    const [age, setAge] = React.useState('');
    const [breed, setbreed] = useState([])
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState('')
    const email = localStorage.getItem('client_email')
    const handleChange1 = (event) => {
        setAge(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState(false);


    // Step 1: State for storing selected date
    const [selectedDate, setSelectedDate] = useState("");

    // Step 2: Function to open the popup
    const handleOpen = () => {
        seterror(false)
        setmessage('')
        setSelectedDate('')
        setAge('')
        setOpen(true);
    };

    // Step 2: Function to close the popup
    const handleClose = () => {
        setOpen(false);
    };

    // Step 2: Function to handle date selection
    const handleDateSelect = (event) => {
        const selectedDateValue = event.target.value;
        setSelectedDate(selectedDateValue);
    };

    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    };
    const get_shedule = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/user/pet_trainning')
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internel error')
        }
    }

    const get_breed = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/user/get_breed')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internel error")
        }
    }
    useEffect(() => {
        // Fetch schedule data
        get_shedule()
            .then((data) => { setshedule(data.data); setLoading(false) })
            .catch((err) => console.log(err));

        // Fetch breed data
        get_breed()
            .then((data) => { setbreed(data.data); setLoading(false) })
            .catch((err) => console.log(err));
    }, []);
    const submit = async () => {
        if (selectedDate === '') {
            seterror(true)
            setmessage("Please Select Date")
            return;
        }
        const selectedDateObj = new Date(selectedDate);

        const currentDateMinusOneDay = new Date(current);
        currentDateMinusOneDay.setDate(current.getDate() - 1);

        if (selectedDateObj <= currentDateMinusOneDay) {
            seterror(true);
            setmessage("Can't Pick Previous Days!!");
            return;
        }
        const cancel_date = new Date(selectedDate);
        cancel_date.setDate(cancel_date.getDate() + 2);
        const new_cancel_date = cancel_date.toISOString().substr(0, 10);

        try {
            const res = await axios.post('http://localhost:5000/pet_care/user/pet_booking', {
                selectedDate,
                email,
                age,
                value,
                new_cancel_date
            })
            if (res.data.message === 'added') {
                seterror(true)
                setmessage("Successfully Placed")


            }
            if (res.data.message === "employee is not free") {
                seterror(true)
                setmessage("Session is not conducted!!")

            }
            if (res.data.message === "No more appointments are available") {
                seterror(true)
                setmessage("No more appointments are available")

            }


        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="fullPage">
            {loading ? (
                <LoadingIndicator />
            ) : (
                <><div style={{ width: "100%", height: "60vh", backgroundColor: "#121334", marginTop: "8vh", color: "white" }}>
                    <div style={{ width: '50%', float: 'left', marginTop: "10vh" }}>
                        <h2 style={{ fontSize: "50px", marginLeft: "50px", marginTop: "20px" }}>Dog Training</h2>
                        <h2 style={{ fontSize: "20px", marginLeft: "50px" }}>We take care your dogs with experts</h2>
                    </div>
                    <div style={{ width: '50%', float: 'right', marginTop: "-5vh" }}>
                        <img src={dog_training} alt="pic" style={{ width: "500px", height: "400px", float: 'right' }} />
                    </div>
                </div><h2 style={{ fontSize: "40px", marginLeft: "500px", marginTop: "20px" }}>Choose Your Session</h2><Box sx={{ width: '100%', typography: 'body1', marginLeft: '40px', marginRight: '40px' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Monday" value="1" />
                                    <Tab label="Friday" value="2" />
                                    <Tab label="Sunday" value="3" />
                                </TabList>
                            </Box>


                            <TabPanel value="1">

                                <TableContainer component={Paper}>
                                    <Table sx={{ width: '75%', marginLeft: '5%', marginRight: '5%', marginTop: "2%", marginBottom: '2%' }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Trainner</StyledTableCell>
                                                <StyledTableCell align="left">Start</StyledTableCell>
                                                <StyledTableCell align="left">End</StyledTableCell>
                                                <StyledTableCell align="left">Day</StyledTableCell>
                                                <StyledTableCell align="left">Fee</StyledTableCell>
                                                <StyledTableCell align="left"></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {shedule.filter((menu, index) => menu.day === "Monday").map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.first_name + " " + row.last_name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">{row.start}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.end}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.day}</StyledTableCell>
                                                    <StyledTableCell align="left">Rs. {row.price}</StyledTableCell>
                                                    <StyledTableCell align="left"> <Button
                                                        sx={{ backgroundColor: "orange", color: "black", ":hover": { backgroundColor: "orange" } }}
                                                        onClick={handleOpen}
                                                    >
                                                        Pick Your Date
                                                    </Button></StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>

                            <TabPanel value="2">

                                <TableContainer component={Paper}>
                                    <Table sx={{ width: '75%', marginLeft: '5%', marginRight: '5%', marginTop: "2%", marginBottom: '2%' }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Trainner</StyledTableCell>
                                                <StyledTableCell align="left">Start</StyledTableCell>
                                                <StyledTableCell align="left">End</StyledTableCell>
                                                <StyledTableCell align="left">Day</StyledTableCell>
                                                <StyledTableCell align="left">Fee</StyledTableCell>
                                                <StyledTableCell align="left"></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {shedule.filter((menu, index) => menu.day === 'Friday').map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.first_name + " " + row.last_name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">{row.start}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.end}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.day}</StyledTableCell>
                                                    <StyledTableCell align="left">Rs. {row.price}</StyledTableCell>
                                                    <StyledTableCell align="left"> <Button
                                                        sx={{ backgroundColor: "orange", color: "black", ":hover": { backgroundColor: "orange" } }}
                                                        onClick={handleOpen}
                                                    >
                                                        Pick Your Date
                                                    </Button></StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>

                            <TabPanel value="3">

                                <TableContainer component={Paper}>
                                    <Table sx={{ width: '75%', marginLeft: '5%', marginRight: '5%', marginTop: "2%", marginBottom: '2%' }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Trainner</StyledTableCell>
                                                <StyledTableCell align="left">Start</StyledTableCell>
                                                <StyledTableCell align="left">End</StyledTableCell>
                                                <StyledTableCell align="left">Day</StyledTableCell>
                                                <StyledTableCell align="left">Price</StyledTableCell>
                                                <StyledTableCell align="left"></StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {shedule.filter((menu, index) => menu.day === "Sunday").map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.first_name + " " + row.last_name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">{row.start}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.end}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.day}</StyledTableCell>
                                                    <StyledTableCell align="left">Rs. {row.price}</StyledTableCell>
                                                    <StyledTableCell align="left"> <Button
                                                        sx={{ backgroundColor: "orange", color: "black", ":hover": { backgroundColor: "orange" } }}
                                                        onClick={handleOpen}
                                                    >
                                                        Pick Your Date
                                                    </Button></StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>
                        </TabContext>
                    </Box><Stack

                        direction={"row"}
                        spacing={2}
                        mt={4}
                        mb={4}
                        justifyContent={"center"}
                        alignItems="center"
                    >

                        {shedule &&
                            shedule.map((menu, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        backgroundColor: "black",
                                        width: 250,
                                        margin: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >

                                    <CardMedia>
                                        <Stack mt={4}>
                                            <img
                                                component="img"
                                                src={getImageSrc(menu.img)}
                                                alt="Down Arrow"
                                                style={{
                                                    width: 200,
                                                    height: 200,
                                                    cursor: "pointer",
                                                    borderRadius: "50%",
                                                }} />
                                        </Stack>
                                    </CardMedia>

                                    <CardContent>
                                        <Box>
                                            <Stack justifyContent={"center"} alignItems={"center"} mb={2}>
                                                <Typography
                                                    variant="h6"
                                                    data-aos="fade-right"
                                                    sx={{ color: "white" }}

                                                >
                                                    {menu.first_name + " " + menu.last_name}
                                                </Typography>
                                            </Stack>

                                            <Stack sx={{ color: "white" }}>
                                                <Stack direction={"row"} alignItems={"center"}>
                                                    <Stack direction={"row"} alignItems={"center"} data-aos="fade-left">
                                                        <Typography variant="h6" marginRight={1} marginLeft={3}>
                                                            Trainner - {menu.day}
                                                        </Typography>
                                                        <FontAwesomeIcon icon={faStarHalfAlt} color="orange" size="1x" />

                                                    </Stack>
                                                </Stack>

                                                <Stack alignItems={"center"} justifyContent={"center"}>
                                                    <Typography variant="h6" data-aos="fade-left">
                                                        {menu.email}
                                                    </Typography>
                                                    <Typography variant="h6" data-aos="fade-right">
                                                        {menu.contact_number}
                                                    </Typography>
                                                    <Stack alignItems={"center"} justifyContent={"center"} mt={2} p={1}>
                                                        <Typography
                                                            variant="h3"
                                                            p={1}
                                                            data-aos="fade-right"
                                                            sx={{
                                                                color: "black",
                                                                backgroundColor: "white",
                                                                borderRadius: 10,
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <span style={{ color: "orange", fontSize: "20px" }}> Pet Trainner</span>
                                                        </Typography>
                                                    </Stack>
                                                </Stack>

                                            </Stack>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                    </Stack><Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Select a Date</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ marginBottom: '4%' }}>
                                Choose a date for your training session:
                            </DialogContentText>
                            {/* Replace with your actual date picker component */}
                            <TextField sx={{ width: '100%' }} type="date" value={selectedDate} onChange={handleDateSelect} />
                            <DialogContentText sx={{ marginBottom: '4%', marginTop: '2%' }}>
                                Dog Breed
                            </DialogContentText>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Breed</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Breed"
                                        onChange={handleChange1}
                                    >
                                        {breed && breed.map((menu, index) => <MenuItem value={menu.breed}>{menu.breed}</MenuItem>)}
                                    </Select>


                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ display: 'inline' }}>
                            <Stack sx={{ marginLeft: '1%', marginRight: '1%' }}>
                                {error && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity={message === "Successfully Placed" ? "success" : "warning"}>{message}</Alert>
                                    </Stack>
                                )}

                            </Stack>
                            <Stack sx={{ marginTop: '1%', display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={submit} color="primary">
                                    OK
                                </Button>

                            </Stack>



                        </DialogActions>


                    </Dialog></>
            )}
        </div>
    );
};
export default Training_Pets

