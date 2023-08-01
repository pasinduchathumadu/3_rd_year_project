import React, { useState,useEffect } from "react";

import {
    Tabs, Typography, Grid, Stack, Avatar, Box, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button
    , FormControl, InputLabel, MenuItem, Select, TextField, IconButton
} from '@mui/material'
import profile from "../../assests/profile.jpg"
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import GradeIcon from '@mui/icons-material/Grade';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const Complain = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Client_orders = () => {

    const input = new Date()

    const date = input.toDateString();

    const [value, setvalue] = useState(0)
    const [Client , setclients] =useState("")
    const [refund, setrefund] = useState(false)
    const [age, setAge] = useState("")
    const [selectfile, setfile] = useState(null)
    const [image, setimage] = useState("")
    const [orders , setorders] = useState("")

    const handleChange = (event, newValue) => {
        setvalue(newValue)
    }

    const handlechange1 = (event) => {
        setAge(event.target.value)
    }

    const firstorder = () => {
        setrefund(true)
        setvalue(false)
    }


    const secondclose = () => {
        setrefund(false)
        setvalue(0)

    }

    const handlefilechange = async (event) => {
        const file = event.target.files[0]
        setfile(file)
        setimage(file.name)
    }

    const handleFileUpload = async () => {

        try {
            const formData = new FormData();
            formData.append("image", selectfile);

            const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.message === "File uploaded successfully") {

            }
            console.log("File uploaded successfully!");
            // Add any further handling of the response from the backend if needed.
        } catch (err) {
            console.log("There is an internal error", err);
        }
    }

    const get_orders = async()=>{
        try{
            const res = await axios.get("http://localhost:5000/pet_care/online_store_manager/view_orders")
            const data = await res.data
            return data
        }
        catch(err){
            console.log('There is an error')
        }
    }

    const get_clients = async() =>{
        try{
            const res = await axios.get("http://localhost:5000/pet_care/online_store_manager/get_clients")
            const data = await res.data
            return data
        }catch(err){
            console.log('There is an error')
        }
    }
    useEffect(() => {
        get_clients()
          .then((data) => setclients(data.data))
          .catch((err) => console.log(err));
      }, []);

    useEffect(()=>{
        get_orders()
        .then((data)=>setorders(data.data))
        .catch((err)=>console.log(err))
    })

    return (
        <>
            <div>
                <Grid sx={{ marginTop: '2%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
                            <Typography>
                                Online Store Manager
                            </Typography>
                            <Typography>
                                Today
                            </Typography>

                            <Typography>
                                {date}
                            </Typography>

                        </div>
                        <div style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}>
                            <Typography sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
                                Clients Orders

                            </Typography>
                        </div>

                        <div style={{ display: 'flex', marginLeft: 'auto' }}>
                            <Stack direction="row" spacing={2}>

                                <Avatar alt="Travis Howard" src={profile} sx={{ width: 140, height: 140 }} />

                            </Stack>

                        </div>
                    </div>



                    <Grid>
                        <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                aria-label="Tab Component"
                                indicatorColor='transparent'
                                sx={{ borderRadius: '10px' }}

                            >
                                <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Client's Orders" />
                                <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="Clients" />
                            </Tabs>

                        </Box>
                    </Grid>
                </Grid>

                <div>
                    {value === 1 && (
                        <Grid sx={{ marginTop: '3%', marginLeft: '3%', marginRight: '7%', marginBottom: '5%' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Client ID</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Client Name</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '20%' }}>Client Email</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '30%' }}>Address</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '20%' }}>Status</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Client && Client.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">
                                                    ID  {row.client_id}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                                <StyledTableCell align="left">

                                                    {row.address}

                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.status === 'premium' && (
                                                         <div style={{ alignItems: 'center', justifyContent: 'start', display: 'flex' }}>
                                                         <div>
                                                             <GradeIcon sx={{ color: 'orange' }} />  <GradeIcon sx={{ color: 'orange' }} />
                                                         </div>
                                                         <div>
                                                             <Typography>Premium</Typography>
                                                         </div>
                                                     </div>

                                                    )}
                                                    {row.status === 'regular' && (
                                                         <Typography>Regular</Typography>

                                                    )}
                                                   
                                                   


                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    )}

                    {value === 0 && (
                        <Grid sx={{ marginTop: '1%', marginLeft: '3%', marginRight: '7%', marginBottom: '5%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '1%' }}>
                                <div>
                                    <FormControl sx={{ minWidth: 200, backgroundColor: 'white' }}>
                                        <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                        <Select

                                            id="demo-select-small"
                                            value={age}
                                            variant='outlined'
                                            placeholder='AGE'
                                            onChange={handlechange1}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={30}>Today</MenuItem>
                                            <MenuItem value={10}>Last 7 Days</MenuItem>
                                            <MenuItem value={20}>Last Month</MenuItem>

                                        </Select>
                                    </FormControl>

                                </div>
                                <div style={{ marginLeft: '71%' }}>
                                    <Button width="50%" sx={{ backgroundColor: 'black', color: 'white', height: '60px', marginBottom: '2%', padding: '24px', ':hover': { backgroundColor: 'black' } }}>Refund Orders</Button>

                                </div>
                            </div>



                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Client ID</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Client Email</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Placed Date</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Payment (RS)</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}>Order Status</StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '15%' }}></StyledTableCell>
                                            <StyledTableCell align="left" sx={{ width: '10%' }}></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders && orders.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">
                                                    ID  {row.client_id}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                                <StyledTableCell align="left">{row.placed_date}</StyledTableCell>
                                                <StyledTableCell align="left">

                                                    {row.payment}

                                                </StyledTableCell>
                                                <StyledTableCell align="left">

                                                    <Typography>{row.po_status}</Typography>



                                                </StyledTableCell>
                                                <StyledTableCell align="left"><Button  sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' } }}>Order Details</Button></StyledTableCell>
                                                {row.po_status === 'pending' &&(
                                                     <StyledTableCell align="left"><Button onClick={() => firstorder()} sx={{ backgroundColor: 'red', color: 'white', ':hover': { backgroundColor: 'red' } }}>Accept</Button></StyledTableCell>

                                                )}
                                                {row.po_status === 'cancelled' &&(
                                                    <StyledTableCell align="left"><Button onClick={() => firstorder()} sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' } }}>refund</Button></StyledTableCell>

                                                )}
                                                
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    )}

                </div>
                {refund && (

                    <div style={{ backdropFilter: 'blur(2px)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Box sx={{ backgroundColor: '#ffffff', width: '70%', height: '90vh' }}>
                            <div style={{ marginLeft: '95%', marginTop: '4%', fontSize: "24px" }}>

                                <IconButton onClick={() => secondclose()}> <CloseIcon sx={{ color: 'red' }} /></IconButton>


                            </div>


                            <div style={{ marginLeft: '5%' }}>
                                {/* {Complain && Complain.map((menu,index) => ( */}
                                <><Typography sx={{ paddingTop: '15px', paddingBottom: '30px', fontSize: '20px', marginLeft: '2%' }}>
                                    Account Number
                                </Typography><TextField

                                        sx={{ backgroundColor: '#f0f0f5', width: '80%', marginLeft: '2%' }}
                                    />

                                    <div style={{ display: 'flex', flex: 1, marginLeft: '2%', marginTop: '2%' }}>
                                        <div style={{ flex: 1 }}>
                                            <Typography sx={{ fontSize: '20px' }}>
                                                Bank Name
                                            </Typography>
                                            <TextField
                                                sx={{ backgroundColor: '#f0f0f5', width: '64%', marginTop: '2%' }}
                                            />

                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <Typography sx={{ fontSize: '20px' }}>
                                                Branch Name
                                            </Typography>
                                            <TextField
                                                sx={{ backgroundColor: '#f0f0f5', width: '64%', marginTop: '2%' }}
                                            />


                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2%' }}>
                                        <Typography sx={{ fontSize: '20px', marginLeft: '2%' }}>Refund Payment (Rs.)</Typography>
                                        <TextField
                                            sx={{ backgroundColor: '#f0f0f5', width: '80%', marginTop: '2%', marginLeft: '2%' }}
                                        />

                                    </div>
                                    <div style={{ marginTop: '2%' }}>
                                        <Typography sx={{ fontSize: '20px', marginLeft: '2%' }}>Refund Payment Slip</Typography>


                                    </div>
                                    <Grid item sx={{ paddingTop: '20px' }}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ display: 'inline',marginLeft:'2%' }}>
                                                <Button
                                                    variant="contained"
                                                    component="label"

                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload File
                                                    <input type="file" hidden onChange={handlefilechange} required />

                                                </Button>
                                            </div>
                                            <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                                                {selectfile && (
                                                    <Typography>{selectfile.name}</Typography>

                                                )}
                                            </div>
                                        </div>

                                    </Grid>
                                    <Button  sx={{marginTop:'2%',marginLeft:'2%',backgroundColor:'orange',':hover':{backgroundColor:'orange'},color:'white',width:'80%'}}>Proceed</Button>
                                </>


                                {/* ))}
                              */}


                            </div>
                        </Box>
                    </div>

                )}




            </div>
        </>
    )
}

export default Client_orders