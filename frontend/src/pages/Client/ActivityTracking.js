import React, { useState } from 'react';
import BackgroundImage from '../../assests/act.png';
import VideoImage from '../../assests/video-1.jpg';
import { Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AOS from 'aos';
import 'aos/dist/aos.css';


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

// const [table, settable] = useState(true);
// const [video, setvideo] = useState(false);

// // click on view button
// const viewActivities = () => {
//     settable(false);
//     setvideo(true);
// }

// // finish view
// const CloseBox = () => {
//     settable(true);
//     setvideo(false);
// }


const ActivityTracking = () => {
    const [table, settable] = useState(true);
    const [video, setvideo] = useState(false);

    // click on view button
    const viewActivities = () => {
        settable(false);
        setvideo(true);
    }

    // finish view
    const CloseBox = () => {
        settable(true);
        setvideo(false);
    }
    return (
        <div style={{ marginTop: '4%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '20%', marginRight: '5%' }}>
                <img src={BackgroundImage} alt="background image" style={{ height: '600px' }} />
            </div>

            <div style={{ width: '80%', marginLeft: '3%', marginTop: '7%', marginRight: '3%' }}>
            <Typography sx={{  fontSize: '50px', fontWeight: '',textAlign:"center", marginBottom: '90px' }}>Boarding Pets Activity Tracking</Typography>

                <div>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Typography sx={{ fontSize: '25px', marginLeft: '450px', fontWeight: 'bold' }}>Your Pets</Typography>
                        <Link to="/bording"><Button sx={{ backgroundColor: 'orange', width: '150px', color: 'white', ':hover': { backgroundColor: 'orange' }, fontWeight: 'bold' }}><ArrowBackIcon sx={{marginRight:'20px'}}/>Back</Button></Link>
                    </div>
                    <Typography sx={{ fontSize: '15px', marginLeft: '330px' }}>< StarIcon sx={{ color: 'red' }} />Your pets video clips will removed after 30 days. </Typography>
                </div>

                {table && (
                    <div style={{width:"100vh",marginLeft:"170px",marginTop:"30px"}}>
                        <TableContainer component={Paper}>
                            <Table sx={{width:"100vh"}} aria-label="customized table">
                                <TableHead>
                                    <TableRow sx={{height:"20px"}}>
                                        <StyledTableCell align="left">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Boarded Time Period  (From - To)</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow key="">
                                        <StyledTableCell align="left">14</StyledTableCell>
                                        <StyledTableCell align="center">2023/08/05 - 2023/08/08</StyledTableCell>
                                        <StyledTableCell align="center"><Button onClick={() => viewActivities()} sx={{ backgroundColor: 'black', width: '150px', color: 'white', ':hover': { backgroundColor: 'black' } }}>View Activities</Button></StyledTableCell>
                                    </StyledTableRow>

                                </TableBody>
                                <TableBody>
                                    <StyledTableRow key="">
                                        <StyledTableCell align="left">16</StyledTableCell>
                                        <StyledTableCell align="center">2023/08/10 - 2023/08/13</StyledTableCell>
                                        <StyledTableCell align="center"><Button sx={{ backgroundColor: 'black', width: '150px', color: 'white', ':hover': { backgroundColor: 'black' } }}>View Activities</Button></StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                                {/* <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody> */}
                            </Table>
                        </TableContainer>

                    </div>
                )}
                {/* <div style={{ backgroundColor: '#f0f0f5', borderRadius: '10px', padding: '10px', margin: '10px' }}>
                    <Typography>Pet ID </Typography>
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
                                defaultValue="02"
                            /></div>
                    </Box>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <Typography sx={{marginRight:'20px'}}>Board Time Period :</Typography>
                        <div style={{ display: 'flex', flexDirection: "row" }}>
                            <Typography>From</Typography>
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
                                        type="date"
                                        defaultValue="08/10/2023"
                                    /></div>
                            </Box>
                            <Typography>To</Typography>
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
                                        type="date"
                                        defaultValue="08/13/2023"
                                    /></div>
                            </Box>
                        </div>
                    </div> */}

                {/* <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Video Clips :</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white', borderRadius: '10px', padding: '20px' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                                    <Typography>2023-08-12</Typography>
                                    <Button>Play</Button>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                                    <Typography>2023-08-13</Typography>
                                    <Button>Play</Button>
                                </div>
                                <div style={{ marginRight: '10px' }}>
                                    <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                                    <Typography>2023-08-14</Typography>
                                    <Button>Play</Button>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion> */}

                {/* <div style={{ display: 'flex', flexDirection: 'row', backgroundColor:'white', borderRadius:'10px', padding:'20px'}}>
                        <div style={{ marginRight: '10px' }}>
                            <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                            <Typography>2023-08-12</Typography>
                            <Button>Play</Button>
                        </div>
                        <div style={{ marginRight: '10px' }}>
                            <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                            <Typography>2023-08-13</Typography>
                            <Button>Play</Button>
                        </div>
                        <div style={{ marginRight: '10px' }}>
                            <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                            <Typography>2023-08-14</Typography>
                            <Button>Play</Button>
                        </div>
                    </div> */}
                {/* </div> */}

                {/* view video clips */}
                {video && (
                    <div style={{ backgroundColor: 'rgb(247 247 247)', borderRadius: '10px', padding: '20px', marginTop: '10px',marginLeft:"150px" }} >
                        <div>
                            <Typography>Video Clips : </Typography>
                        </div>
                        <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '10px', backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                            <Typography>2023-08-12</Typography>
                            <PlayArrowIcon sx={{ color: 'orange', marginTop: '40px' }} />
                        </div>
                        <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '10px', backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                            <Typography>2023-08-13</Typography>
                            <PlayArrowIcon sx={{ color: 'orange', marginTop: '40px' }} />
                        </div>
                        <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '10px', backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <img src={VideoImage} alt="video image" style={{ height: '100px', width: 'auto' }} />
                            <Typography>2023-08-14</Typography>
                            <PlayArrowIcon sx={{ color: 'orange', marginTop: '40px' }} />
                        </div>
                        <div>
                            <Button onClick={() => CloseBox()} sx={{ backgroundColor: 'orange', width: '100%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>Done</Button>
                        </div>
                    </div>
                )}




            </div>
        </div>



    )
}

export default ActivityTracking;