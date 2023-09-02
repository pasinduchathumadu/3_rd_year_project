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
import { FormLabel, IconButton, Tab, TextField, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';


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

    // click on view bank slip - cc
    // const ViewBankSlip = () => {
    //     setrefund(false);
    //     setverify(true)
    // }
    //reject or verify - 
    // const AfterVerify = () => {
    //     setverify(false);
    //     setrefund(0);
    // }

    // click on view verified details - cc
    // const ViewVerified = () => {
    //     setrefund(false);
    //     setviewVerify(true);
    // }

    const input = new Date();
    const date = input.toDateString();

    // BOARDING HOUSE

    // view boarding house refundd details
    const [boardingrf, setboardingrf] = useState("");
    const boardingRefund = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/boardingRefund')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        boardingRefund()
            .then((data) => setboardingrf(data.data))
            .catch((err) => console.log(err))
    })

    // view refunded verification done details
    const [redetails, setredetails] = useState([])
    const [error, seterror] = useState(false)
    const [messsage, setmessage] = useState("")

    const viewRefundDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/viewRefundDetails/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage('There is an internal error')
            } else {
                setviewVerify(true)
                setredetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // get the bank slip image
    const getImageSrc1 = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }
    // after viewing of refunded details- close
    const AfterViewing = () => {
        setviewVerify(false);
        setrefund(0);
    }

    // view bank slip & details for verify
    const [verifydetails, setverifydetails] = useState([])
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    const viewSlipDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/viewSlipDetails/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1('There is an internal error')
            } else {
                setverify(true)
                setverifydetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // get bank slip image from db
    const getImageSrc2 = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // cancel without verifying  - close
    const CancelVerify = () => {
        setverify(false);
        setrefund(0);
    }

    // get admin verification status =>  rejected
    const [error2, seterror2] = useState(false)
    const [message2, setmessage2] = useState("")

    const AdminVerify = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/admin/AdminVerify`, {
                id
            })
            if (res.data.message === 'There is an internal error') {
                setmessage2('There is an internal error')
                seterror2(true)
            } else if (res.data.message === 'verified') {
                setrefund(0)
                setverify(false)
            }
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    // get admin verification status => rejected
    const [error3, seterror3] = useState(false)
    const [message3, setmessage3] = useState("")

    const AdminRejected = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/admin/AdminRejected`, {
                id
            })
            if (res.data.message === 'There is an internal error') {
                setmessage3('There is an internal error')
                seterror3(true)
            } else if (res.data.message === 'rejected') {
                setrefund(0)
                setverify(false)
            }
        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // CARE CENTER
    // view carecenter  refundd details
    const [carerf, setcarerf] = useState("");
    const carecenterRefund = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/carecenterRefund')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        carecenterRefund()
            .then((data) => setcarerf(data.data))
            .catch((err) => console.log(err))
    })

    const [ccverify, setccverify] = useState() // form for verify
    // view bank slip & details for verify
    const [ccverifydetails, setccverifydetails] = useState([])
    const [error4, seterror4] = useState(false)
    const [message4, setmessage4] = useState("")

    const viewSlipDetailscc = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/viewSlipDetailscc/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror4(true)
                setmessage4('There is an internal error')
            } else {
                setccverify(true)
                setccverifydetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // get bank slip image from db
    // const getImageSrc3 = (imageName) => {
    //     return require(`../../../../backend/images/store/${imageName}`)
    // }

    // cancel without verifying  - close
    const CancelccVerify = () => {
        setccverify(false);
        setrefund(1);
    }

    // get admin verification status =>  rejected
    const [error5, seterror5] = useState(false)
    const [message5, setmessage5] = useState("")

    const AdminVerifycc = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/admin/AdminVerifycc`, {
                id
            })
            if (res.data.message === 'There is an internal error') {
                setmessage5('There is an internal error')
                seterror5(true)
            } else if (res.data.message === 'verified') {
                setrefund(1)
                setccverify(false)
            }
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    // get admin verification status => rejected
    const [error6, seterror6] = useState(false)
    const [message6, setmessage6] = useState("")

    const AdminRejectedcc = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/admin/AdminRejectedcc`, {
                id
            })
            if (res.data.message === 'There is an internal error') {
                setmessage6('There is an internal error')
                seterror6(true)
            } else if (res.data.message === 'rejected') {
                setrefund(1)
                setccverify(false)
            }
        } catch (err) {
            console.log('There is an internal error')
        }
    }

     // view refunded verification done details
     const [redetailscc, setredetailscc] = useState([])
     const [error7, seterror7] = useState(false)
     const [messsage7, setmessage7] = useState("")
     const [viewccVerify, setviewccVerify] =useState(false)
 
     const viewRefundccDetails = async (id) => {
         try {
             const res = await axios.get(`http://localhost:5000/pet_care/admin/viewRefundccDetails/${id}`)
             if (res.data.message === 'There is an internal error') {
                 seterror7(true)
                 setmessage7('There is an internal error')
             } else {
                setviewccVerify(true)
                setredetailscc(res.data.data)
             }
         } catch (err) {
             console.log(err)
         }
     }
     // get the bank slip image
     const getImageSrc4 = (imageName) => {
         return require(`../../../../backend/images/store/${imageName}`)
     }
     // after viewing of refunded details- close
     const AfterccViewing = () => {
        setviewccVerify(false);
         setrefund(1);
     }

    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
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

            {/* BOARDING HOUSE */}
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
                                            <StyledTableCell align="center">{firstrow.refund_mny}.00</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {firstrow.admin_verification === 'pending' ?
                                                    <Button onClick={() => viewSlipDetails(firstrow.refund_id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, width: '200px' }}> View Bank Slip Details</Button> :
                                                    <Button onClick={() => viewRefundDetails(firstrow.refund_id)} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, width: '200px' }}> View Verified Details</Button>
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


            {/*   CARE CENTER */}
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
                                        <StyledTableCell align="center">Refunded Amount (Rs)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {carerf && carerf.map((menurow, index) => (
                                        <StyledTableRow key={menurow.refund_id}>
                                            <StyledTableCell align="center">{menurow.refund_id}</StyledTableCell>
                                            <StyledTableCell align="center">{menurow.appointment_id}</StyledTableCell>
                                            <StyledTableCell align="center">{menurow.date}</StyledTableCell>
                                            <StyledTableCell align="center">{menurow.refund_mny}.00</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {menurow.admin_verification === 'pending' ?
                                                    <Button onClick={() => viewSlipDetailscc(menurow.refund_id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, width: '200px' }}> View Bank Slip Details</Button> :
                                                    <Button onClick={() => viewRefundccDetails(menurow.refund_id)} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' }, width: '200px' }}> View Verified Details</Button>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* view to verify bank slip - boarding house */}
            {verify && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    margin: '20px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1001
                }}>
                    {verifydetails && verifydetails.map((verimenu, index) => (
                        <FormControl style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            borderRadius: '10px',
                            backgroundColor: '#F0F0F5',
                            marginLeft: '5%',
                            marginTop: '5%',
                            width: '550px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                        }}>
                            <div>
                                <IconButton onClick={CancelVerify}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '470px' }} /></IconButton>
                            </div>
                            <div>
                                <div className="form-topic">
                                    Bank Slip
                                </div>

                                <img
                                    src={getImageSrc2(verimenu.refund_slip)}
                                    alt="bank slip"
                                    style={{ width: '500px' }} />

                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '10px', width: '500px' }}>
                                    <div className="form-topic">
                                        Bank Details
                                    </div>

                                    <div className="form-label" style={{ marginLeft: '100px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel>Account Number </FormLabel>
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
                                                        defaultValue={verimenu.acc_no}
                                                    /></div>
                                            </Box>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel>Bank </FormLabel>
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
                                                        defaultValue={verimenu.bank}
                                                    /></div>
                                            </Box>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel>Branch </FormLabel>
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
                                                        defaultValue={verimenu.branch}
                                                    /></div>
                                            </Box>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button onClick={() => AdminVerify(verimenu.refund_id)} sx={{ background: "orange", color: 'white', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "orange" }, marginRight: '10px' }}>Verify</Button>
                                    <Button onClick={() => AdminRejected(verimenu.refund_id)} sx={{ background: "red", color: 'white', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px' }}>Reject</Button>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/*view verified bank details - boaridng house */}
            {viewVerify && (
                <div style={{
                    margin: '20px',
                    width: '100%',
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1001,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {redetails && redetails.map((menuview, index) => (
                        <FormControl sx={{
                            backgroundColor: '#F0F0F5',
                            borderRadius: '10px',
                            marginLeft: '5%',
                            marginTop: '5%',
                            width: '700px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                        }}>
                            <div>
                                <IconButton onClick={AfterViewing}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderRadius: '10px' }}>
                                <div>
                                    <div className="form-topic">
                                        Bank Slip
                                    </div>

                                    <Typography>
                                        {menuview.admin_verification === 'verified' ?
                                            <Button sx={{ background: "blue", width: '100%', marginTop: '10px', marginBottom: '20px', ':hover': { backgroundColor: "blue" }, marginRight: '10px', color: 'white' }}>Verified</Button> :
                                            menuview.admin_verification === 'rejected' ?
                                                <Button sx={{ background: "red", width: '100%', marginTop: '10px', marginBottom: '20px', ':hover': { backgroundColor: "red" }, marginRight: '10px', color: 'white' }}>Rejected</Button> :
                                                ""}
                                    </Typography>

                                    <img
                                        src={getImageSrc1(menuview.refund_slip)}
                                        alt="bank slip"
                                        style={{ width: '500px', marginLeft: '50px' }} />

                                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                                        <div className="form-topic">
                                            Bank Details
                                        </div>

                                        <div className="form-label">
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <FormLabel>Account Number</FormLabel>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                    sx={{ marginLeft: '30px' }}
                                                >
                                                    <div>
                                                        <TextField
                                                            disabled
                                                            id="outlined-disabled"
                                                            label=""
                                                            defaultValue={menuview.acc_no}
                                                            sx={{ width: '430px' }}
                                                        /></div>
                                                </Box>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <FormLabel>Bank </FormLabel>
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
                                                                defaultValue={menuview.bank}
                                                            /></div>

                                                    </Box>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <FormLabel>Branch </FormLabel>
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
                                                                defaultValue={menuview.branch}
                                                            /></div>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* CARE CENTER - form with bank slip details */}
            {ccverify && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    margin: '20px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1001
                }}>
                    {ccverifydetails && ccverifydetails.map((verimenu, index) => (
                        <FormControl style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            borderRadius: '10px',
                            backgroundColor: '#F0F0F5',
                            marginLeft: '5%',
                            marginTop: '5%',
                            width: '550px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                        }}>
                            <div>
                                <IconButton onClick={CancelccVerify}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '470px' }} /></IconButton>
                            </div>
                            <div>
                                <div className="form-topic">
                                    Bank Slip
                                </div>

                                <img
                                    src={Slip}
                                    alt="bank slip"
                                    style={{ width: '500px' }} />
                                {/* <img
                                    src={getImageSrc3(verimenu.refund_slip)}
                                    alt="bank slip"
                                    style={{ width: '500px' }} /> */}

                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', marginTop: '10px', width: '500px' }}>
                                    <div className="form-topic">
                                        Bank Details
                                    </div>

                                    <div className="form-label" style={{ marginLeft: '100px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel>Account Number </FormLabel>
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
                                                        defaultValue={verimenu.acc_no}
                                                    /></div>
                                            </Box>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel>Bank </FormLabel>
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
                                                        defaultValue={verimenu.bank}
                                                    /></div>
                                            </Box>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormLabel>Branch </FormLabel>
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
                                                        defaultValue={verimenu.branch}
                                                    /></div>
                                            </Box>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button onClick={() => AdminVerifycc(verimenu.refund_id)} sx={{ background: "orange", color: 'white', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "orange" }, marginRight: '10px' }}>Verify</Button>
                                    <Button onClick={() => AdminRejectedcc(verimenu.refund_id)} sx={{ background: "red", color: 'white', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "red" }, marginLeft: '10px' }}>Reject</Button>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* CARE CENTER - verified bank details viewing */}
            {viewccVerify && (
                <div style={{
                    margin: '20px',
                    width: '100%',
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1001,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {redetailscc && redetailscc.map((menuview, index) => (
                        <FormControl sx={{
                            backgroundColor: '#F0F0F5',
                            borderRadius: '10px',
                            marginLeft: '5%',
                            marginTop: '5%',
                            width: '700px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                        }}>
                            <div>
                                <IconButton onClick={AfterccViewing}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', borderRadius: '10px' }}>
                                <div>
                                    <div className="form-topic">
                                        Bank Slip
                                    </div>

                                    <Typography>
                                        {menuview.admin_verification === 'verified' ?
                                            <Button sx={{ background: "blue", width: '100%', marginTop: '10px', marginBottom: '20px', ':hover': { backgroundColor: "blue" }, marginRight: '10px', color: 'white' }}>Verified</Button> :
                                            menuview.admin_verification === 'rejected' ?
                                                <Button sx={{ background: "red", width: '100%', marginTop: '10px', marginBottom: '20px', ':hover': { backgroundColor: "red" }, marginRight: '10px', color: 'white' }}>Rejected</Button> :
                                                ""}
                                    </Typography>

                                    <img
                                        // src={getImageSrc4(menuview.refund_slip)}
                                        src={Slip}
                                        alt="bank slip"
                                        style={{ width: '500px', marginLeft: '50px' }} />

                                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                                        <div className="form-topic">
                                            Bank Details
                                        </div>

                                        <div className="form-label">
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <FormLabel>Account Number</FormLabel>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                    sx={{ marginLeft: '30px' }}
                                                >
                                                    <div>
                                                        <TextField
                                                            disabled
                                                            id="outlined-disabled"
                                                            label=""
                                                            defaultValue={menuview.acc_no}
                                                            sx={{ width: '430px' }}
                                                        /></div>
                                                </Box>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <FormLabel>Bank </FormLabel>
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
                                                                defaultValue={menuview.bank}
                                                            /></div>

                                                    </Box>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <FormLabel>Branch </FormLabel>
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
                                                                defaultValue={menuview.branch}
                                                            /></div>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Refund;