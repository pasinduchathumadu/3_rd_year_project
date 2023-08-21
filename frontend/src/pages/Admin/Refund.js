import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import ProfilePicture from '../../assests/profile-picture.png';
import Slip from '../../assests/bankslip2.jpeg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import axios from "axios";

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


// data for care center  refunds
function createData2(rf_id, o_id, date, time, status) {
    return { rf_id, o_id, date, time, status };
}

const secondrows = [
    createData2(1, 4, '2023-06-20', '10:00:00', 'pending'),
    createData2(2, 6, '2023-06-25', '12:00:00', 'pending'),
    createData2(3, 9, '2023-07-12', '10:30:00', 'completed'),
    createData2(4, 12, '2023-07-14', '14:10:00', 'completed'),
];

const Refund = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [refund, setrefund] = useState(0);
    const handleForm = (event, existing_value) => {
        setrefund(existing_value)
    };

    const [verify, setverify] = useState(false);
    const [viewVerify, setviewVerify] = useState(false);

    // click on view bank slip
    const ViewBankSlip = () => {
        setrefund(false);
        setverify(true)
    }
    //reject or verify
    const AfterVerify = () => {
        setverify(false);
        setrefund(0);
    }
    // click on view verified details
    const ViewVerified = () => {
        setrefund(false);
        setviewVerify(true);
    }
    // after viewing
    const AfterViewing = () => {
        setviewVerify(false);
        setrefund(0);
    }
    const input = new Date();
    const date = input.toDateString();

    // view boaridng house refundd details
    const [boardingrf, setboardingrf ] = useState("");
    const boardingRefund = async() => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/boardingRefund')
            const data = await res.data
            return data

        }catch(err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        boardingRefund()
        .then((data) => setboardingrf(data.data))
        .catch((err) => console.log(err))
    })

    return (
        <div className="home-container" style={{ marginTop: '5%'}}>
            <div className="top">
                <div className="top-line">
                    <p>Administrator</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={refund}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >

                    <Tab sx={{ backgroundColor: refund === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Boarding House Refund" ></Tab>
                    <Tab sx={{ backgroundColor: refund === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Care Center Refund"></Tab>
                </Tabs>
            </Box>

            {/* boarding house refund */}
            {refund === 0 && (
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
                                    sx={{ fontSize: '11px' }}
                                >
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Pending</MenuItem>
                                    <MenuItem value={3}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Refund ID</StyledTableCell>
                                        <StyledTableCell align="center">Request ID</StyledTableCell>
                                        <StyledTableCell align="center">Refund Date</StyledTableCell>
                                        {/* <StyledTableCell align="center">Refund Time</StyledTableCell> */}
                                        <StyledTableCell align="center">Refunded Amount (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {boardingrf && boardingrf.map((firstrow, next) => (
                                        <StyledTableRow key={firstrow.refund_id}>
                                            <StyledTableCell align="center">{firstrow.refund_id}</StyledTableCell>
                                            <StyledTableCell align="center">{firstrow.request_id}</StyledTableCell>
                                            <StyledTableCell align="center">{firstrow.date}</StyledTableCell>
                                            {/* <StyledTableCell align="center">{firstrow.time}</StyledTableCell> */}
                                            <StyledTableCell align="center">{firstrow.refund_mny}.00</StyledTableCell>
                                            {/* <StyledTableCell align="center">{firstrow.status}</StyledTableCell> */}
                                            <StyledTableCell align="center">
                                                {firstrow.admin_verification === 'pending' ?
                                                    <Button onClick={() => ViewBankSlip()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, width: '200px' }}> View Bank Slip</Button> :
                                                    <Button onClick={() => ViewVerified()} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, width: '200px' }}> View Verified Details</Button>
                                                }
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}


            {/*  boarding house refund */}
            {refund === 1 && (
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
                                    sx={{ fontSize: '11px' }}
                                >
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Pending</MenuItem>
                                    <MenuItem value={3}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Refund ID</StyledTableCell>
                                        <StyledTableCell align="center">Appointment ID</StyledTableCell>
                                        <StyledTableCell align="center">Refund Date</StyledTableCell>
                                        <StyledTableCell align="center">Refund Time</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {secondrows.map((secondrow) => (
                                        <StyledTableRow key={secondrow.id}>
                                            <StyledTableCell align="center">{secondrow.rf_id}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrow.o_id}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrow.date}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrow.time}</StyledTableCell>
                                            <StyledTableCell align="center">{secondrow.status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {secondrow.status === 'pending' ?
                                                    <Button onClick={() => ViewBankSlip()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, width: '200px' }}> View Bank Slip</Button> :
                                                    <Button onClick={() => ViewVerified()} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, width: '200px' }}> View Verified Details</Button>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* view bank slip */}
            {verify && (
                <div style={{ margin: '20px', width: '60%', marginLeft: '20%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', borderRadius: '10px', backgroundColor: '#F0F0F5' }}>

                        <div>
                            <div className="form-topic">
                                Bank Slip
                            </div>
                            <img src={Slip} alt="bank slip" style={{ width: '500px' }} />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button onClick={() => AfterVerify()} sx={{ background: "orange", color:'white', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "orange" }, marginRight: '10px' }}>Verify</Button>
                                <Button onClick={() => AfterVerify()} sx={{ background: "red", color:'white', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px' }}>Reject</Button>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'white', borderRadius: '10px', marginLeft: '70px', height: '300px', width: '300px', marginTop: '30px',  padding: '20px' }}>
                            <div className="form-topic">
                                Bank Details
                            </div>

                            <div className="form-label">
                                <p>Account Number : <br /> 300-456-90-23</p><br />
                                <p>Bank : <br /> Peoples Bank </p> <br />
                                <p>Branch : <br /> Maharagama </p> <br />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/*view verified bank details  */}
            {viewVerify && (
                <div style={{ margin: '20px', width: '60%', marginLeft: '20%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', borderRadius: '10px', backgroundColor: '#F0F0F5' }}>

                        <div>
                            <div className="form-topic">
                                Bank Slip
                            </div>
                            <Button sx={{ background: "blue", width: '90%', marginTop: '10px', marginBottom: '20px', ':hover': { backgroundColor: "blue" }, marginRight: '10px', color: 'white' }}>Verified</Button>
                            <img src={Slip} alt="bank slip" style={{ width: '500px' }} />
                            <Button onClick={() => AfterViewing()} sx={{ background: "orange", color:'white', width: '90%', marginTop: '10px', ':hover': { backgroundColor: "orange" }, marginRight: '10px' }}>OK</Button>
                        </div>

                        <div style={{ backgroundColor: 'white', borderRadius: '10px', marginLeft: '70px', height: '300px', width: '300px', marginTop: '40px', padding: '20px' }}>
                            <div className="form-topic">
                                Bank Details
                            </div>

                            <div className="form-label">
                                <p>Account Number : <br /> 300-456-90-23</p><br />
                                <p>Bank : <br /> Peoples Bank </p> <br />
                                <p>Branch : <br /> Maharagama </p> <br />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Refund;