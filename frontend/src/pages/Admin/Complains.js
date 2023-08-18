import React, { useState } from 'react';
import ProfilePicture from '../../assests/profile-picture.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import { FormLabel, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';


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

// data for magaers complains
function createData1(com_id, user_id, text, date, status) {
    return { com_id, user_id, text, date, status };
}

const managerows = [
    createData1(1, 1, "Complain text 1", '2023-07-12', 'pending'),
    createData1(2, 1, "Complain text 2", '2023-07-13', 'pending'),
    createData1(3, 3, "Complain text 3", '2023-07-14', 'pending'),
    createData1(4, 4, "Complain text 4", '2023-07-15', 'completed'),
    createData1(5, 6, "Complain text 5", '2023-07-16', 'completed'),
];
// data for clients complains
function createData2(com_id, user_id, text, date, status) {
    return { com_id, user_id, text, date, status };
}

const clientrows = [
    createData2(1, 1, "Complain text 1", '2023-07-12', 'pending'),
    createData2(2, 1, "Complain text 2", '2023-07-13', 'pending'),
    createData2(3, 3, "Complain text 3", '2023-07-14', 'pending'),
    createData2(4, 4, "Complain text 4", '2023-07-15', 'completed'),
    createData2(5, 6, "Complain text 5", '2023-07-16', 'completed'),
];

const Complains = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [complain, setComplain] = useState(0);
    const handleForm = (event, existing_value) => {
        setComplain(existing_value)
    };

    const [addResponce, setaddResponce] = useState(false);
    const [viewResponce, setviewResponce] = useState(false);

    // click on add response button
    const addResponse = () => {
        // check
        setComplain(false);
        setaddResponce(true);

    }
    // after click on submit button of add response 
    const afterAddingResponse = () => {
        setComplain(0);
        setaddResponce(false);
    }

    // cancel adding responce
    const cancelResponse = () => {
        setaddResponce(false);
        setComplain(0);
    }

    // after click on view response
    const viewResponse = () => {
        setComplain(false);
        setviewResponce(true);
    }

    // after viewing the response
    const afterViewingResponse = () => {
        setComplain(0);
        setviewResponce(false);
    }

    const input = new Date();
    const date = input.toDateString();

    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Administrator</p>
                    <p className="top-line-text">Today</p>
                    {/* <p class="top-line-text">18 June 2023</p> */}
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={complain}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: complain === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients' Complains" ></Tab>
                    <Tab sx={{ backgroundColor: complain === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Managers' Complains"></Tab>
                </Tabs>
            </Box>

            {/* client complains */}
            {complain === 0 && (
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
                                    <MenuItem value={3}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {clientrows.map((clientrow) => (
                                        <StyledTableRow key={clientrow.com_id}>
                                            <StyledTableCell align="center">{clientrow.com_id}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.user_id}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.text}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.date}</StyledTableCell>
                                            <StyledTableCell align="center">{clientrow.status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {clientrow.status === "pending" ?
                                                    <Button onClick={() => addResponse()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Add Response</Button>
                                                    : <Button onClick={() => viewResponse()} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>View Response</Button>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* managers complains */}
            {complain === 1 && (
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
                                    <MenuItem value={3}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell align="center">Complain ID</StyledTableCell>
                                        <StyledTableCell align="center">Manager ID</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {managerows.map((managerow) => (
                                        <StyledTableRow key={managerow.com_id}>
                                            <StyledTableCell align="center">{managerow.com_id}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.user_id}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.text}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.date}</StyledTableCell>
                                            <StyledTableCell align="center">{managerow.status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {managerow.status === "pending" ?
                                                    <Button onClick={() => addResponse()} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Add Response</Button> :
                                                    <Button onClick={() => viewResponse()} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>View Response</Button>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* add response */}
            {addResponce && (
                <div>
                    <FormControl sx={{ marginLeft: '35%', borderRadius: '10px', width: '600px', padding: '20px', backgroundColor: '#F0F0F5' }}>
                        <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                            <div className="form-topic">
                                Adding Response
                            </div>
                            <div className="form-label">
                                <FormLabel>Complain ID </FormLabel>
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
                                            defaultValue="05"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Complain  </FormLabel>
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
                                            defaultValue="Card payment error"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Enter the Response  </FormLabel>
                                <TextField id="outlined-basic" placeholder=" response" variant="outlined" sx={{ marginLeft: '10px', marginRight: '20px' }} />
                            </div>

                            <div className="form-label">
                                <FormLabel>Upload an Image (if need): </FormLabel>
                                {/* <input type="file" placeholder=" Choose a file" variant="outlined" /> */}
                                <TextField
                                    sx={{ marginRight: '20px', marginLeft: '10px' }}
                                    type="file"
                                    variant="outlined"
                                    placeholder="Choose a file"
                                    inputProps={{ accept: 'image/*' }} // Add the accepted file types if needed
                                // onChange={handleFileChange}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button variant="contained" onClick={() => afterAddingResponse()} sx={{ background: "orange", marginRight: '10px', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Response</Button>
                                <Button variant="contained" onClick={() => cancelResponse()} sx={{ background: "red", width: '100%', marginLeft: '10px', marginTop: '10px', ':hover': { backgroundColor: "red" } }}>Cancel</Button>
                            </div>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* view response */}
            {viewResponce && (
                <div>
                    <FormControl sx={{ marginLeft: '35%', borderRadius: '10px', width: '600px', padding: '20px', backgroundColor: '#F0F0F5', fontFamily: 'osnovapro,sans-serif' }}>
                        <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}>
                            <div className="form-topic">
                                Viewing Response
                            </div>
                            <div className="form-label">
                                <FormLabel>Complain ID  </FormLabel>
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
                                            defaultValue="04"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Complain </FormLabel>
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
                                            defaultValue="Card payment error"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Response   </FormLabel>
                                {/* <p style={{ paddingRight: '20px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px', borderStyle: 'solid', borderColor: 'black', borderRadius: '10px' }} >This is the response for your complain</p> */}
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
                                            defaultValue="It may be a connection issue"
                                        /></div>
                                </Box>
                            </div>

                            <Button variant="contained" onClick={() => afterViewingResponse()} sx={{ background: "#fe9e0d", width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>OK</Button>
                        </div>
                    </FormControl>
                </div>
            )}

        </div>
    )
}

export default Complains;