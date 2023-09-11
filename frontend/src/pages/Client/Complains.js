import { Typography, Grid, IconButton, InputLabel,Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import CoverImage from "../../assests/complaincover.jpg";
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { FormLabel, TextField } from "@mui/material";
import { Stack } from "@mui/system";


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

const Complains = () => {
    const email = localStorage.getItem("client_email")

    const [main, setmain] = useState(true)

    // VIEW COMPLAINS
    const [clients, setClients] = React.useState(1);
    const [mycomplain, setmycomplain] = useState([]);

    const handleChange = (event) => {
        setClients(event.target.value);

        viewmyComplains()
    };

    const viewmyComplains = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/user/viewmyComplains/`, {
                email,
                clients
            })
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        viewmyComplains()
            .then((data) => setmycomplain(data.data))
            .catch((err) => console.log(err))
    })

    // ADD NEW COMPLAIN
    const [error, seterror]  = useState(false)
    const [message, setmessage] = useState("")
    const [form, setform] = useState(false)
    // display add complains form
    const addComplainForm = () => {
        setform(true)
        setmain(false)
    }
    // cancel without adding
    const cancelAddingComplain = () => {
        setform(false)
        setmain(true)
        seterror(false)
    }
    //  adding new complain
    const [role,setrole] = useState("")
    const [text, settext] = useState("")

    const handleRole = (event) => {
        setrole(event.target.value)
    }

    const addNewComplain = async () => {
        if(role === '' || text === '') {
            seterror(true)
            setmessage('Please fill all the fields')
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/user/addNewComplain`, {
                email,
                role,
                text
            })
            if(res.data.message === 'There is an internal error') {
                setmessage('Cannot add the complain')
                seterror(true)
            }else if(res.data.message === 'success') {
                setmain(true)
                setform(false)
            }

        }catch(err){
            console.log('There is an internal error')
        }
    }

    // DELETE PENDING COMPLAIN
    const [warn, setwarn] = useState(false)
    const [id, setid] = useState("")
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")
    // display warning box
    const displayWarnBox = (id) => {
        setwarn(true)
        setmain(false)
        setid(id)
    }

    // cancel deleting
    const cancelDelete = () => {
        setwarn(false)
        setmain(true)
       
    }

    const deleteMyComplain = async() => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/deleteMyComplain/${id}`)
            if(res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1('There is an internal error')
            }else {
                setmain(true)
                setwarn(false)
            }

        }catch(err){
            console.log(err)
        }
    }


    return (
        <div style={{ marginTop: '4%' }}>
            <Grid sx={{ marginBottom: '2%' }}>
                <div style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${CoverImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: "180px",
                    width: "100%",
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white'
                }}>
                    <Typography sx={{ color: 'white', fontSize: '45px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        Add Your Complains Here
                    </Typography>
                </div>
            </Grid>

            {/* display your complains */}
            {main && (
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                        <div >
                            <Button onClick={addComplainForm} variant="contained" sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>Add New Complain <AddIcon sx={{ marginLeft: '10px' }} /></Button>
                        </div>
                        <Box sx={{ width: '10%' }} >
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    variant='filled'

                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
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
                                        <StyledTableCell align="center">Complained Section</StyledTableCell>
                                        <StyledTableCell align="center">Complain</StyledTableCell>
                                        <StyledTableCell align="center">Placed Date</StyledTableCell>
                                        <StyledTableCell align="center">Response</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mycomplain && mycomplain.map((row, next) => (
                                        <StyledTableRow key={row.complain_id} >

                                            <StyledTableCell align="center">{row.complain_id}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {(() => {
                                                    switch (row.manager_role) {
                                                        case "boarding_house_manager": return "Boarding House";
                                                        case "care_center_manager": return "Care Center";
                                                        case "online_store_manager": return "Online Store ";
                                                        case "company_manager": return "Company ";
                                                        case "medi_help_manager": return "Medi Help Center";
                                                        default: return "";
                                                    }
                                                })()}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.complain_txt}</StyledTableCell>
                                            <StyledTableCell align="center">{row.com_date}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.complain_status === "pending" ? (
                                                    <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} > Pending</Button>
                                                ) : (
                                                    row.response_txt
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {row.complain_status === "pending" ? (
                                                    <IconButton onClick={() => displayWarnBox(row.complain_id)}><DeleteIcon sx={{ color: 'orange' }} /></IconButton>

                                                ) : (
                                                    ""
                                                )}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* add new complains form */}
            {form && (
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
                    <FormControl sx={{
                        marginLeft: '5%',
                        marginTop: '20%',
                        borderRadius: '10px',
                        width: '700px',
                        padding: '20px',
                        position: 'relative',
                        zIndex: 1001,
                        backgroundColor: 'black'
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={cancelAddingComplain}><CloseIcon sx={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    marginLeft: '600px'
                                }} /></IconButton>
                            </div>

                            <div className="form-topic">
                                Add New Complain
                                <hr />
                            </div>
                            <FormControl sx={{ minWidth: 120, width: '100%', marginBottom:'2%', marginTop:'1%' }}>
                                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={role}
                                    onChange={handleRole}
                                    label="Manager Role"

                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Boarding House</MenuItem>
                                    <MenuItem value={20}>Medi Help Center</MenuItem>
                                    <MenuItem value={30}>Online Store</MenuItem>
                                    <MenuItem value={40}>Care Center</MenuItem>
                                    <MenuItem value={50}>Company</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                id="outlined-multiline-flexible"
                                label="Enter your Complain"
                                multiline
                                maxRows={4}
                                required
                                sx={{ width: '100%' }}
                                onChange = {(e) => settext(e.target.value)}
                            />
                            {
                                error && (
                                    <Stack sx={{ width: '100%' , marginTop:'2%', marginBottom:'1%'}} spacing={2}>
                                        <Alert severity="warning">{message}</Alert>
                                    </Stack>
                                )
                            }
                            <Button  onClick= {() => addNewComplain()}variant="contained" sx={{ background: 'orange', width: '100%', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Add Complain</Button>
                        </div>
                    </FormControl>
                </div>
            )}

            {/* WARN BOX FOR DELETING */}
            {warn && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    padding: '5px',
                    width: '100%',
                    height:'100vh',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                    
                }}>
                    <div style={{ backgroundColor: 'black', padding: '10px' }}>
                        <div style={{
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f0f0f5',
                            width: '500px',
                            position: 'relative',
                            zIndex: 1001
                        }}>
                            <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
                            <hr /><br />

                            <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button onClick={deleteMyComplain} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                                <Button onClick={cancelDelete} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Complains