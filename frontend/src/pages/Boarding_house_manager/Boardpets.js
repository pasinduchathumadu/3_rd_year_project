import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import ProfilePicture from '../../assests/profile-picture.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Tab, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoClip from '../../assests/video-1.jpg';
import axios from "axios";
import {  useNavigate } from "react-router";

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

const BoardPets = () => {
    const [present, setPresent] = useState(0);
    const handleForm = (event, existing_value) => {
        setPresent(existing_value);
    };
    // drop down
    // const [clients, setClients] = React.useState('1');
    // const handleChange = (event) => {
    //     setClients(event.target.value);

    // };

    const [currentvideo, setcurrentvideo] = useState(false);
    const [pastvideo, setpastvideo] = useState(false);

    // click on view live video button (current board pets)
    const viewLive = () => {
        setPresent(false);
        setcurrentvideo(true);
    }
    // after finishing view
    const finishviewLive = () => {
        setcurrentvideo(false);
        setPresent(0);
    }

    // click on video clips button (past boarded pets)
    const viewPastVideo = () => {
        setPresent(false);
        setpastvideo(true);
    }
    // after finishing view
    const finishviewPastVideo = () => {
        setpastvideo(false);
        setPresent(2);
    }

    const input = new Date();
    const date = input.toDateString();

    // view current pets
    const [currentpet, setcurrentpet] = useState("");
    const viewCurrent = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/viewCurrent')
            const data = await res.data
            return data

        }catch(err) {
            console.log("There is an internal error");
        }
    }
    useEffect(() => {
        viewCurrent()
        .then((data) => setcurrentpet(data.data))
        .catch((err) => console.log(err))
    })

    // view requested pets (pending & accepted)
    const [clients, setClients] = React.useState('1');
    const [count1, setcount1] = useState([])

    const handleChange = (event) => {
        setClients(event.target.value);

        viewRequested()  
    };
    //  FILTERING 
    const viewRequested = async() => {
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/viewRequested/${clients}`)
            setcount1(res.data.data)
            setClients('')
        }catch(err) {
            console.log(clients)
            console.log(err)
        }
    }

    useEffect(() => {
        viewRequested()
    },[clients, viewRequested]);

    // view past boarded pets
    const [boarded, setboarded] = useState("")
    const viewBoarded = async() => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/viewBoarded')
            const data = await res.data
            return data

        }catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        viewBoarded()
        .then((data) =>setboarded(data.data))
        .catch((err) => console.log(err))
    })

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

     // get profile picture
     const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)

    }

    return (
        <div className="home-container" style={{ marginTop: '5%'}}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={getProfilepicturepath("boarding_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={present}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: present === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Current Boarding Pets" ></Tab>
                    <Tab sx={{ backgroundColor: present === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Requested Pets"></Tab>
                    <Tab sx={{ backgroundColor: present === 2 ? 'orange' : '#F0F0F5', color: 'black' }} label="Past Boarded Pets"></Tab>
                </Tabs>
            </Box>

            {/* current boarding pets */}
            {present === 0 && (
                <div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Category</StyledTableCell>
                                        <StyledTableCell align="center">Package</StyledTableCell>
                                        <StyledTableCell align="center">Boarded Date</StyledTableCell>
                                        <StyledTableCell align="center">Carrying Date</StyledTableCell>
                                        <StyledTableCell align="center">Boarded Time</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentpet && currentpet.map((current,next) => (
                                        <StyledTableRow key={current.id}>
                                            <StyledTableCell align="center">{current.pet_id}</StyledTableCell>
                                            <StyledTableCell align="center">{current.category}</StyledTableCell>
                                            <StyledTableCell align="center">{current.package_id}</StyledTableCell>
                                            <StyledTableCell align="center">{current.board_arrival_date}</StyledTableCell>
                                            <StyledTableCell align="center">{current.board_carry_date}</StyledTableCell>
                                            <StyledTableCell align="center">{current.board_time}</StyledTableCell>
                                            <StyledTableCell align="center">{current.client_id}</StyledTableCell>
                                            <StyledTableCell align="center"><Button onClick={()=> viewLive()} sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }}>Watch Live</Button></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* requested pets (pending and accepted) */}
            {present === 1 && (
                <div>
                    <div className="drop-down-box">
                        <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                   
                                    variant='filled'
                                    label="Clients"
                                    
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Pending</MenuItem>
                                    <MenuItem value={3}>Accepted</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Category</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Package ID</StyledTableCell>
                                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                        <StyledTableCell align="center">Carry Date</StyledTableCell>
                                        <StyledTableCell align="center">Board Time</StyledTableCell>
                                        {/* <StyledTableCell align="center">Payment (Rs.)</StyledTableCell> */}
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {count1 && count1.map((request,next) => (
                                        <StyledTableRow key={request.pet_id}>
                                            <StyledTableCell align="center">{request.pet_id}</StyledTableCell>
                                            <StyledTableCell align="center">{request.category}</StyledTableCell>
                                            <StyledTableCell align="center">{request.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{request.package_id}</StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                                {request.p_ckage === "gold" ? (<> <CircleIcon sx={{ color: '#FBBD08', marginRight: '5px' }} /> Gold </>)
                                                    : request.p_ckage === "silver" ? (<>  <CircleIcon sx={{ color: '#A6A6A6', marginRight: '5px' }} />Silver </>)
                                                        : (<><CircleIcon sx={{ color: '#55555C', marginRight: '5px' }} />Platinum</>)
                                                }
                                            </StyledTableCell> */}
                                            <StyledTableCell align="center">{request.board_arrival_date}</StyledTableCell>
                                            <StyledTableCell align="center">{request.board_carry_date}</StyledTableCell>
                                            <StyledTableCell align="center">{request.board_time}</StyledTableCell>
                                            {/* <StyledTableCell align="center">{request.payment}</StyledTableCell> */}
                                            <StyledTableCell align="center">{request.request_status}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* past boarded pets */}
            {present === 2 && (
                <div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Category</StyledTableCell>
                                        <StyledTableCell align="center">Package</StyledTableCell>
                                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                        <StyledTableCell align="center">Carry Date</StyledTableCell>
                                        <StyledTableCell align="center">Return Time</StyledTableCell>
                                        {/* <StyledTableCell align="center">Payment (Rs.)</StyledTableCell> */}
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {boarded && boarded.map((complete, next) => (
                                        <StyledTableRow key={complete.pet_id}>
                                            <StyledTableCell align="center">{complete.pet_id}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.category}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.package_id}</StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                                {complete.p_ckage === "gold" ? (<> <CircleIcon sx={{ color: '#FBBD08', marginRight: '5px' }} /> Gold </>)
                                                    : complete.p_ckage === "silver" ? (<>  <CircleIcon sx={{ color: '#A6A6A6', marginRight: '5px' }} />Silver </>)
                                                        : (<><CircleIcon sx={{ color: '#55555C', marginRight: '5px' }} />Platinum</>)
                                                }
                                            </StyledTableCell> */}
                                            <StyledTableCell align="center">{complete.board_arrival_date}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.board_carry_date}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.board_time}</StyledTableCell>
                                            {/* <StyledTableCell align="center">{complete.payment}</StyledTableCell> */}
                                            <StyledTableCell align="center"><Button onClick={()=> viewPastVideo()} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }}>Video Clips</Button></StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button sx={{ color: 'white', backgroundColor: '#fe9e0d', ':hover': { backgroundColor: '#fe9e0d' } }}>Generate Report</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* view current video clips */}
            {currentvideo && (
                <div style={{ backgroundColor: '#f0f0f5', borderRadius: '10px', marginRight: '20px', marginLeft: '100px', padding: '30px', width: '85%', marginBottom: '10px' }}>
                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', textAlign: 'center', width: '100%', marginBottom: '10px' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Pet ID : 02</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ marginRight: '30px' }}>
                            {/* <p>Today : 8/3/2023 </p> */}
                            <p><CircleIcon sx={{ color: 'red', height: '10px' }} />Live</p>
                            <img src={VideoClip} alt="live vide" style={{ width: '80%', height: 'auto' }} />
                            <p>Today : 8/3/2023 </p>
                            <p>Pet Name : Jimmy Boy</p>
                        </div>
                        {/* list */}
                        <div style={{ marginLeft: '10px' }}>
                            <div>
                                <h4>Video Clips : </h4>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                                <img src={VideoClip} alt="video" style={{ width: '20%', height: 'auto' }} />
                                <p style={{ marginLeft: '20px' }}>8/2/2023 - Video Clip</p>
                                <PlayArrowIcon sx={{ marginTop: '20px', color: 'orange', marginLeft: '280px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                                <img src={VideoClip} alt="video" style={{ width: '20%', height: 'auto' }} />
                                <p style={{ marginLeft: '20px' }}>8/1/2023 - Video Clip</p>
                                <PlayArrowIcon sx={{ marginTop: '20px', color: 'orange', marginLeft: '280px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                                <img src={VideoClip} alt="video" style={{ width: '20%', height: 'auto' }} />
                                <p style={{ marginLeft: '20px' }}>7/31/2023 - Video Clip</p>
                                <PlayArrowIcon sx={{ marginTop: '20px', color: 'orange', marginLeft: '270px' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                                <img src={VideoClip} alt="video" style={{ width: '20%', height: 'auto' }} />
                                <p style={{ marginLeft: '20px' }}>7/30/2023 - Video Clip</p>
                                <PlayArrowIcon sx={{ marginTop: '20px', color: 'orange', marginLeft: '270px' }} />
                            </div>
                            <ExpandMoreIcon sx={{ color: 'orange', marginLeft: '45%' }} />

                        </div>
                    </div>
                    <Button onClick={()=> finishviewLive() } sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' }, width: '100%' }}>Done</Button>
                </div>
            )}

            {/* past boarded pets - video clips */}
            {pastvideo && (
                <div style={{ backgroundColor: '#f0f0f5', borderRadius: '10px', marginRight: '20px', marginLeft: '100px', padding: '30px', width: '85%' }}>
                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', textAlign: 'center', width: '100%', marginBottom: '10px' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Pet ID : 02</Typography>
                    </div>
                    <div style={{ marginLeft: '50px' }}>
                        <div>
                            <h4>Video Clips : </h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                            <img src={VideoClip} alt="video" style={{ width: '15%', height: 'auto' }} />
                            <p style={{ marginLeft: '20px' }}>8/2/2023 - Video Clip</p>
                            <PlayArrowIcon sx={{ marginTop: '40px', color: 'orange', marginLeft: '600px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                            <img src={VideoClip} alt="video" style={{ width: '15%', height: 'auto' }} />
                            <p style={{ marginLeft: '20px' }}>8/1/2023 - Video Clip</p>
                            <PlayArrowIcon sx={{ marginTop: '40px', color: 'orange', marginLeft: '605px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                            <img src={VideoClip} alt="video" style={{ width: '15%', height: 'auto' }} />
                            <p style={{ marginLeft: '20px' }}>7/31/2023 - Video Clip</p>
                            <PlayArrowIcon sx={{ marginTop: '40px', color: 'orange', marginLeft: '600px' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '10px', width: '90%', marginBottom: '10px' }}>
                            <img src={VideoClip} alt="video" style={{ width: '15%', height: 'auto' }} />
                            <p style={{ marginLeft: '20px' }}>7/30/2023 - Video Clip</p>
                            <PlayArrowIcon sx={{ marginTop: '40px', color: 'orange', marginLeft: '600px' }} />
                        </div>
                        <ExpandMoreIcon sx={{ color: 'orange', marginLeft: '45%' }} />

                    </div>
                    <Button onClick={() => finishviewPastVideo()} sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' }, width: '100%' }}>Done</Button>
                </div>
            )}
        </div>
    )
}

export default BoardPets;