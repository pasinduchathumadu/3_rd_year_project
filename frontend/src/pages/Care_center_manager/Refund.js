import { Avatar, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import profile from "../../assests/profile.jpg";
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
import CloseIcon from '@mui/icons-material/Close';
import { FormLabel, TextField } from "@mui/material";
import axios from "axios";
// import Slip from '../../assests/bankslip1.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router";


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

const Refund = () => {
    const input = new Date();
    const date = input.toDateString();

    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    // view appointments has to refund
    const [viewrefund, setviewrefund] = useState([])
    const refund_appointments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/care_center_manager/refund_appointments')
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        refund_appointments()
            .then((data) => setviewrefund(data.data))
            .catch((err) => console.log(err))
    })

    // after click on  refund button (for pending refunds)
    const [addRefund, setaddRefund] = useState(false) //form
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const [details1, setdetails1] = useState([])
    const toRefund = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/toRefund/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage("There is an internal error")
            } else {
                setaddRefund(true)
                setdetails1(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // cancel without refunding
    const addrefundback = () => {
        setaddRefund(false)
        setClients(true)
    }

    // save to db of refund details - post  *************************
    const [amount, setamount] = useState("")
    const handleAmount = (event) => {
        setamount(event.target.value)
    }
    const refundAdding = async (id) => {
        setaddRefund(false)
        setClients(true)

        try {
            const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/refundAdding`, {
                id,
                amount
            })
        } catch (err) {
            console.log(err)
        }
    }

    // click on view refuned details  button
    const [view, setview] = useState(false)
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")
    const [details, setdetails] = useState([])

    const ViewRefundDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/ViewRefundDetails/${id}`)
            if (res.data.message === "There is an internal error") {
                seterror1(true)
                setmessage1("There is an internal error")
            } else {
                setview(true);
                setdetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // back from viewing box
    const back = () => {
        setClients(true)
        setview(false)
    }
    // get bank slip src 
    const getBankSlipSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

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
        <div>
            <div style={{ display: "flex", marginTop: '4%' }}>
                <div style={{ display: "inline", marginTop: "30px", marginLeft: "2%", width: "33.3%" }}>
                    <Typography>Care Center Manager</Typography>
                    <Typography>Today</Typography>
                    <Typography>{date}</Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: "30px",
                        width: "33.3%",
                        justifyContent: "center"
                    }}>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "24px",
                            fontFamily: "fantasy",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Refund for Pet Grooming Appointments
                    </Typography>
                </div>
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

            {/* table */}
            <div>
                {clients && (
                    <>
                        <div className="drop-down-box1">
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
                                            <StyledTableCell align="center"> Appointmnet ID</StyledTableCell>
                                            <StyledTableCell align="center">Client Email</StyledTableCell>
                                            <StyledTableCell align="center">Package ID</StyledTableCell>
                                            <StyledTableCell align="center">Completed Payment(Rs.)</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                            <StyledTableCell align="center">Admin Verification</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {viewrefund && viewrefund.map((menurefund, index) => (
                                            <StyledTableRow key={menurefund.refund_id}>
                                                <StyledTableCell align="center">{menurefund.refund_id}</StyledTableCell>
                                                <StyledTableCell align="center">{menurefund.appointment_id}</StyledTableCell>
                                                <StyledTableCell align="center">{menurefund.email}</StyledTableCell>
                                                <StyledTableCell align="center">{menurefund.package_id}</StyledTableCell>
                                                <StyledTableCell align="center">{menurefund.payment}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {menurefund.refund_status === 'pending'
                                                        ? (<Button onClick={() => toRefund(menurefund.refund_id)} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>)
                                                        : (<Button onClick={() => ViewRefundDetails(menurefund.refund_id)} sx={{ color: 'white', width: '80%', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>Refunded Details </Button>)
                                                    }
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {menurefund.admin_verification === 'rejected' && menurefund.refund_status === 'completed'
                                                        ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }}>Rejected</Button>)
                                                        : menurefund.admin_verification === 'verified' && menurefund.refund_status === 'completed'
                                                            ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}>Verified</Button>)
                                                            : menurefund.admin_verification === 'pending' && menurefund.refund_status === 'completed'
                                                                ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>Pending</Button>)
                                                                : ""
                                                    }
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div></>
                )}
            </div>


            {/* place refund form */}
            {addRefund && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                }}>
                    {details1 && details1.map((drow1, index) => (
                        <FormControl sx={{
                            marginLeft: '5%',
                            marginTop: '5%',
                            borderRadius: '10px',
                            width: '1000px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                            backgroundColor: 'black'
                        }}>

                            <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                                <div>
                                    <IconButton onClick={addrefundback} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '800px' }} /></IconButton>
                                </div>
                                <div className="form-topic">
                                    Place Refund
                                    <hr />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Refund ID  </FormLabel>
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
                                                    defaultValue={drow1.refund_id}
                                                />
                                            </div>
                                        </Box>

                                    </div>

                                    <div className="form-label" style={{ marginLeft: '290px' }}>
                                        <FormLabel>Appointment ID  </FormLabel>
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
                                                    defaultValue={drow1.appointment_id} />
                                            </div>

                                        </Box>
                                    </div>
                                </div><div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Account Number: </FormLabel>
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
                                                    defaultValue={drow1.acc_no} />
                                            </div>
                                        </Box>

                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Bank  </FormLabel>
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
                                                    defaultValue={drow1.bank} />
                                            </div>
                                        </Box>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Branch  </FormLabel>
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
                                                    defaultValue={drow1.branch} />
                                            </div>
                                        </Box>
                                    </div>
                                </div><div className="form-label">
                                    <FormLabel> Refund Amount(Rs.) </FormLabel>
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
                                                id="outlined-disabled"
                                                label=""
                                                defaultValue={drow1.refund_mny}
                                                onChange={handleAmount} />
                                        </div>
                                    </Box>
                                </div>
                                <div className="form-label">
                                    <FormLabel>Upload Bank Slip: </FormLabel>
                                    <div style={{ display: 'inline' }}>
                                        <Button
                                            variant="contained"
                                            component="label"

                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload File
                                            <input type="file" hidden required />

                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="contained" onClick={() => refundAdding(drow1.refund_id)} sx={{ background: 'orange', width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Place Refund</Button>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* view refunded detials */}
            {view && (
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
                    {details && details.map((drow, index) => (
                        <FormControl sx={{
                            marginLeft: '8%',
                            marginTop: '40%',
                            borderRadius: '10px',
                            width: '1000px',
                            padding: '20px',
                            backgroundColor: 'black',
                            position: 'relative',
                            zIndex: 1001,
                        }}>
                            <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                                <div>
                                    <IconButton onClick={back}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '800px' }} /></IconButton>
                                </div>
                                <div className="form-topic">
                                    View Refund Details
                                    <hr />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel> Refund ID :   </FormLabel>
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
                                                    defaultValue={drow.refund_id}
                                                /></div>
                                        </Box>

                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Appointment ID  </FormLabel>
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
                                                    defaultValue={drow.appointment_id}
                                                /></div>

                                        </Box>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Refunded Amount(Rs.) </FormLabel>
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
                                                    defaultValue={drow.refund_mny}
                                                /></div>

                                        </Box>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Account Number :   </FormLabel>
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
                                                    defaultValue={drow.acc_no}
                                                /></div>
                                        </Box>

                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Bank  </FormLabel>
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
                                                    defaultValue={drow.bank}
                                                /></div>

                                        </Box>
                                    </div>

                                    <div className="form-label">
                                        <FormLabel>Branch  </FormLabel>
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
                                                    defaultValue={drow.branch}
                                                /></div>

                                        </Box>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="form-label">
                                        <FormLabel>  Refund Date </FormLabel>
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
                                                    defaultValue={drow.date}
                                                /></div>

                                        </Box>
                                    </div>

                                    <div className="form-label" style={{ marginLeft: '290px' }}>
                                        <FormLabel>Refund Time </FormLabel>
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
                                                    defaultValue={drow.time}
                                                /></div>

                                        </Box>
                                    </div>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Uploaded Bank Slip : </FormLabel>
                                    <img
                                        src={drow.refund_slip === "" ? getBankSlipSrc("noimage.png") : getBankSlipSrc(drow.refund_slip)}
                                        alt="bank slip"
                                        style={{ width: '50%', height: 'auto', borderRadius: '10px' }} />
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}







        </div>
    )
}

export default Refund