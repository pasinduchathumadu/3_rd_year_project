import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import Header from "../../components/Layout/Header";
import  ProfilePicture  from '../../assests/profile-picture.png';

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
// import CircleIcon from '@mui/icons-material/Circle';


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

  function createData(id, name, address, contact, usability, status) {
    return { id, name, address, contact, usability, status };
  }
  
  const rows = [
    createData(1, 'John Deo' ,'No:23, Main Road, Colombo', '0778912212', 3, 'regular'),
    createData(2, 'John Perera' ,'No:50, Second Road, Nugegoda', '0778022212', 5, 'premium'),
    createData(3, 'John Nikil' ,'No:30, Temple Road, Maharagama', '0770011112', 6, 'premium'),
    createData(4, 'John Wistle' ,'No:24, Katuwana Road, Homagama', '0746614212', 2, 'regular'),
    createData(5, 'John Bye' ,'No:2, Down Street, Kottawa', '0703332212', 2, 'regular'),
    
  ];

const Clients = () => {
    const [clients, setClients] = React.useState('1');

      const handleChange = (event) => {
        setClients(event.target.value);
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
                   <p style={{fontSize: '18px', fontWeight: 1000}}>Clients</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon"/>
                    <img src= { ProfilePicture } alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <div>
                <Box sx={{ width: '150px', marginLeft:'1360px',}}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={clients}
                            variant='filled'
                            label="clients"
                            onChange={handleChange}
                            l
                            sx={{fontSize:'12px'}}>
                            <MenuItem value={1}>All</MenuItem>
                            <MenuItem value={2}>Premium</MenuItem>
                            <MenuItem value={3}>Regular</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="form-content">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Client ID</StyledTableCell>
                        <StyledTableCell align="center">Client Name</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Contact Number</StyledTableCell>
                        <StyledTableCell align="center">Usability</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                        {/* <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell> */}
                        <StyledTableCell align="center">{row.id}</StyledTableCell>
                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                        <StyledTableCell align="center">{row.address}</StyledTableCell>
                        <StyledTableCell align="center">{row.contact}</StyledTableCell>
                        <StyledTableCell align="center">{row.usability}</StyledTableCell>
                        <StyledTableCell align="center">{row.status}</StyledTableCell>
                        <StyledTableCell align="center"><Button sx={{color:'white', backgroundColor:'#fe9e0d', ':hover':{backgroundColor: "#fe9e0d"}}}>Pets Details</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
                

            </div>





        </div>
    )
}

export default Clients
