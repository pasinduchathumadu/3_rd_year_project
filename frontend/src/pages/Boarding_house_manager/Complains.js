
import React, { useState } from "react";

import '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import NotificationsIcon from '@mui/icons-material/Notifications';

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

function createData1(com_id, cl_id, text, date, time, status) {
    return {com_id, cl_id, text, date, time, status};
}

const rows = [
    createData1(1,1,"Complain text 1", '2023-07-12', '14:00:00', 'pending' ),
    createData1(2,1,"Complain text 2", '2023-07-13', '12:00:00', 'pending' ),
    createData1(3,3,"Complain text 3", '2023-07-14', '13:10:00', 'pending' ),
    createData1(4,4,"Complain text 4", '2023-07-15', '17:30:00', 'completed' ),
    createData1(5,6,"Complain text 5", '2023-07-16', '18:00:00', 'completed' ),
];
function createData2(id, text, date, time, status) {
    return {id,text, date, time, status};
}

const datarows = [
    createData2(1,"Complain text 1", '2023-07-12', '14:00:00', 'pending' ),
    createData2(2,"Complain text 2", '2023-07-13', '12:00:00', 'pending' ),
    createData2(3,"Complain text 3", '2023-07-14', '13:10:00', 'pending' ),
    createData2(4,"Complain text 4", '2023-07-15', '17:30:00', 'completed' ),
    createData2(5,"Complain text 5", '2023-07-16', '18:00:00', 'completed' ),
];



const Complains = () => {
    const [clients, setClients] = React.useState('1');
  
    const [own, setOwn] = useState(0);

    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const handleForm = (event,existing_value) => {
        setOwn(existing_value)
    };

    return (
        <div className="home-container">
            <Header />
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">18 June 2023</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon"/>
                    <img src= { ProfilePicture } alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <Box sx={{width:'98%', marginTop:'10px', marginBottom:'10px', marginLeft:'20px', marginRight:'10px', paddingRight:'10px', paddingLeft:'10px'}}>
                <Tabs
                value={own}
                variant="fullWidth"
                aria-label="Tab Component"
                onChange={handleForm}
                indicatorColor="transparent"
                sx={{borderRadius:'10px'}}
                >
                    <Tab sx={{backgroundColor:own === 0 ? 'orange':'white',color:'black'}} label="Clients' Complains" ></Tab>
                    <Tab sx={{backgroundColor:own === 1 ? 'orange':'white',color:'black'}} label="My Complains"></Tab>
                </Tabs>
            </Box>

            {/* Clients Complains */}
            {own === 0 && (
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
                                        <TableRow>
                                            <StyledTableCell align="center">Complain ID</StyledTableCell>
                                            <StyledTableCell align="center">Client ID</StyledTableCell>
                                            <StyledTableCell align="center">Complain</StyledTableCell>
                                            <StyledTableCell align="center">Placed Date</StyledTableCell>
                                            <StyledTableCell align="center">Placed Time</StyledTableCell>
                                            <StyledTableCell align="center">Status</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.com_id}>
                                                <StyledTableCell align="center">{row.com_id}</StyledTableCell>
                                                <StyledTableCell align="center">{row.cl_id}</StyledTableCell>
                                                <StyledTableCell align="center">{row.text}</StyledTableCell>
                                                <StyledTableCell align="center">{row.date}</StyledTableCell>
                                                <StyledTableCell align="center">{row.time}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.status === "pending" ? <Button sx={{color:'white', backgroundColor:'#fe9e0d', ':hover': { backgroundColor: '#fe9e0d' } }}>Add Response</Button> : "Completed" } 
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                </div>
            )}

            {/* Your Complains */}
            {own === 1 && (
                <div>
                    <div className="drop-down-box">
                                <Box sx={{ width: '150px', marginLeft: '1350px' }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={own}
                                            variant='filled'
                                            label="clients"
                                            onChange={handleChange}
                                            l
                                            sx={{ fontSize: '11px' }}
                                        >
                                            <MenuItem value={1}>All</MenuItem>
                                            <MenuItem value={2}>Pending</MenuItem>
                                            <MenuItem value={2}>Completed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                        </div>
                    <div className="form-content">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Complain ID</StyledTableCell>
                                            <StyledTableCell align="center">Complain</StyledTableCell>
                                            <StyledTableCell align="center">Placed Date</StyledTableCell>
                                            <StyledTableCell align="center">Placed Time</StyledTableCell>
                                            <StyledTableCell align="center">Status</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {datarows.map((datarow) => (
                                            <StyledTableRow key={datarow.id}>
                                                <StyledTableCell align="center">{datarow.id}</StyledTableCell>
                                                <StyledTableCell align="center">{datarow.text}</StyledTableCell>
                                                <StyledTableCell align="center">{datarow.date}</StyledTableCell>
                                                <StyledTableCell align="center">{datarow.time}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {datarow.status === "completed" ? <Button sx={{color:'white', backgroundColor:'#fe9e0d', ':hover': { backgroundColor: '#fe9e0d' } }}>View Response</Button> : "Pending" } 
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                </div>
            )}
        </div>
    )
}

export default Complains