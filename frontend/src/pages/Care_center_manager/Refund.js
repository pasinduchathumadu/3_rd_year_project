import { Avatar, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
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

    // place refund form open
    const [refund, setrefund] = useState(false)
    const PlaceRefund = () => {
        setrefund(true)
        setClients(false)

    }

    // get details from post method - add refund
    const [amount, setamount] = useState("")
    const handleAmount = (event) => {
        setamount(event.target.value)
    }

    // close without refunding
    const BackFromRefund = () => {
        setrefund(false)
        setClients(true)
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
                    <div style={{ marginLeft: '150%' }}><Stack direction="row" spacing={2} width={300}>
                        <Avatar
                            alt="Travis Howard"
                            src={profile}
                            sx={{ width: 60, height: 60 }}
                        />
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
                                            <StyledTableCell align="center">Boarding Request ID</StyledTableCell>
                                            <StyledTableCell align="center">Client ID</StyledTableCell>
                                            {/* <StyledTableCell align="center">Cancelled Date / Incompleted  </StyledTableCell> */}
                                            <StyledTableCell align="center">Completed Payment(Rs.)</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                            <StyledTableCell align="center">Admin Verification</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {refund && refund.map((refundrow, index) => ( */}
                                        <StyledTableRow>
                                            <StyledTableCell align="center">01</StyledTableCell>
                                            <StyledTableCell align="center">01</StyledTableCell>
                                            <StyledTableCell align="center">02</StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                            {refundrow.cancelled_date === "" ? "Incompleted Request" : refundrow.cancelled_date}
                                        </StyledTableCell> */}
                                            <StyledTableCell align="center">1200.00</StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                            {refundrow.refund_status === 'completed'
                                                ? <Button onClick={() => ViewRefundDetails(refundrow.refund_id)} sx={{ color: 'white', width: '80%', backgroundColor: '#000000', ':hover': { backgroundColor: '#555555' } }}>Refund Details</Button>
                                                : <Button onClick={() => toRefund(refundrow.refund_id)} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>}
                                        </StyledTableCell> */}
                                            <StyledTableCell align="center">
                                                {/* {refundrow.refund_status === 'completed' */}
                                                <Button onClick={PlaceRefund} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>
                                            </StyledTableCell>
                                            {/* <StyledTableCell align="center">
                                            {refundrow.admin_verification === 'rejected'
                                                ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }}>Rejected</Button>)
                                                : refundrow.admin_verification === 'verified'
                                                    ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}>Verified</Button>)
                                                    : (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>Pending</Button>)
                                            }
                                        </StyledTableCell> */}
                                            <StyledTableCell align="center">
                                                <Button sx={{ color: 'white', width: '60%', backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }}>Rejected</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        {/* ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div></>
                )}
            </div>


            {/* place refund form */}
            {refund && (
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
                    // Adjust as needed
                    marginRight: '300px', // Adjust as needed
                    zIndex: 1001, // Ensure the content is above the overlay
                }}>
                    {/* {details1 && details1.map((drow1, index) => ( */}
                    <FormControl sx={{
                        marginLeft: '5%',
                        marginTop: '30%',
                        borderRadius: '10px',
                        width: '1000px',
                        padding: '20px',
                        position: 'relative', // Add this to ensure content appears on top of the overlay
                        zIndex: 1001,
                        backgroundColor: 'black'
                    }}>
                        <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={BackFromRefund}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '800px' }} /></IconButton>
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
                                                defaultValue="{drow1.refund_id}"
                                            /></div>
                                    </Box>

                                </div>

                                <div className="form-label" style={{ marginLeft: '290px' }}>
                                    <FormLabel>Request ID  </FormLabel>
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
                                                defaultValue="{drow1.request_id}"
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
                                                defaultValue="{drow1.acc_no}"
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
                                                defaultValue="{drow1.bank}"
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
                                                defaultValue="{drow1.branch}"
                                            /></div>

                                    </Box>
                                </div>
                            </div>

                            <div className="form-label">
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
                                            onChange={handleAmount}
                                        // defaultValue={drow1.refund_mny}
                                        /></div>
                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Upload Bank Slip : </FormLabel>
                                <TextField
                                    sx={{ marginRight: '20px', marginLeft: '10px' }}
                                    type="file"
                                    variant="outlined"
                                    placeholder="Choose a file"
                                    inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                                // onChange={handleFileChange}
                                />
                            </div>

                            <div>
                                <Button variant="contained" sx={{ background: 'orange', width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Place Refund</Button>
                            </div>
                        </div>
                    </FormControl>
                    {/* ))} */}
                </div>
            )}

            {/* view refuned details */}



        </div>
    )
}

export default Refund