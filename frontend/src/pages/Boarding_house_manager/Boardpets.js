import React, { useState } from "react";
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

function createCurrentData(id, category, p_ckage, aDate, rDate, payment) {
    return { id, category, p_ckage, aDate, rDate, payment };
}

const currents = [
    createCurrentData(1, 'cat', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCurrentData(2, 'dog', 'gold', '2023-07-26', '2023-07-30', '1200.00'),
    createCurrentData(3, 'dog', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCurrentData(4, 'cat', 'platinum', '2023-07-26', '2023-07-30', '1200.00'),
];

function createRequestedData(id, category, p_ckage, aDate, rDate, payment, status) {
    return { id, category, p_ckage, aDate, rDate, payment, status };
}

const requests = [
    createRequestedData(1, 'cat', 'silver', '2023-07-26', '2023-07-30', '1200.00', 'pending'),
    createRequestedData(2, 'dog', 'gold', '2023-07-26', '2023-07-30', '1200.00', 'pending'),
    createRequestedData(3, 'dog', 'silver', '2023-07-26', '2023-07-30', '1200.00', 'accepted'),
    createRequestedData(4, 'cat', 'platinum', '2023-07-26', '2023-07-30', '1200.00', 'accepted'),
];

function createCompletedData(id, category, p_ckage, aDate, rDate, payment) {
    return { id, category, p_ckage, aDate, rDate, payment };
}

const completes = [
    createCompletedData(1, 'cat', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCompletedData(2, 'dog', 'gold', '2023-07-26', '2023-07-30', '1200.00'),
    createCompletedData(3, 'dog', 'silver', '2023-07-26', '2023-07-30', '1200.00'),
    createCompletedData(4, 'cat', 'platinum', '2023-07-26', '2023-07-30', '1200.00'),
];

const BoardPets = () => {
    const [present, setPresent] = useState(0);
    const handleForm = (event, existing_value) => {
        setPresent(existing_value);
    };
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

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

    return (
        <div className="home-container" style={{ marginTop: '4%'}}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
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
                                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                        <StyledTableCell align="center">Return Time</StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currents.map((current) => (
                                        <StyledTableRow key={current.id}>
                                            <StyledTableCell align="center">{current.id}</StyledTableCell>
                                            <StyledTableCell align="center">{current.category}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {current.p_ckage === "gold" ? (<> <CircleIcon sx={{ color: '#FBBD08', marginRight: '5px' }} /> Gold </>)
                                                    : current.p_ckage === "silver" ? (<>  <CircleIcon sx={{ color: '#A6A6A6', marginRight: '5px' }} />Silver </>)
                                                        : (<><CircleIcon sx={{ color: '#55555C', marginRight: '5px' }} />Platinum</>)
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{current.aDate}</StyledTableCell>
                                            <StyledTableCell align="center">{current.rDate}</StyledTableCell>
                                            <StyledTableCell align="center">{current.payment}</StyledTableCell>
                                            <StyledTableCell align="center"><Button onClick={()=> viewLive()} sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }}>Watch Live</Button></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* requested pets */}
            {present === 1 && (
                <div>
                    <div className="drop-down-box">
                        <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clients}
                                    variant='filled'
                                    label="clients"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '11px' }}>
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
                                        <StyledTableCell align="center">Package</StyledTableCell>
                                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                        <StyledTableCell align="center">Return Time</StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.map((request) => (
                                        <StyledTableRow key={request.id}>
                                            <StyledTableCell align="center">{request.id}</StyledTableCell>
                                            <StyledTableCell align="center">{request.category}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {request.p_ckage === "gold" ? (<> <CircleIcon sx={{ color: '#FBBD08', marginRight: '5px' }} /> Gold </>)
                                                    : request.p_ckage === "silver" ? (<>  <CircleIcon sx={{ color: '#A6A6A6', marginRight: '5px' }} />Silver </>)
                                                        : (<><CircleIcon sx={{ color: '#55555C', marginRight: '5px' }} />Platinum</>)
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{request.aDate}</StyledTableCell>
                                            <StyledTableCell align="center">{request.rDate}</StyledTableCell>
                                            <StyledTableCell align="center">{request.payment}</StyledTableCell>
                                            <StyledTableCell align="center">{request.status}</StyledTableCell>
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
                                        <StyledTableCell align="center">Return Time</StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {completes.map((complete) => (
                                        <StyledTableRow key={complete.id}>
                                            <StyledTableCell align="center">{complete.id}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.category}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {complete.p_ckage === "gold" ? (<> <CircleIcon sx={{ color: '#FBBD08', marginRight: '5px' }} /> Gold </>)
                                                    : complete.p_ckage === "silver" ? (<>  <CircleIcon sx={{ color: '#A6A6A6', marginRight: '5px' }} />Silver </>)
                                                        : (<><CircleIcon sx={{ color: '#55555C', marginRight: '5px' }} />Platinum</>)
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{complete.aDate}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.rDate}</StyledTableCell>
                                            <StyledTableCell align="center">{complete.payment}</StyledTableCell>
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