import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import ProfilePicture from '../../assests/profile-picture.png';
// import PetImage from '../../assests/blog-1.png';
// import OwnerImage from '../../assests/profile-picture.png';
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
import { IconButton, Tab, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import { FormLabel, TextField } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
// import Slip from '../../assests/bankslip1.png';
import axios from "axios";
// import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PetsIcon from '@mui/icons-material/Pets';
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

const Clients = () => {
    // drop down
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
    };

    const [showRequests, setShowRequests] = useState(0);
    const handleForm = (event, existing_value) => {
        setShowRequests(existing_value)
    };

    // boarding requests viewing
    const [request, setrequest] = useState([]) //boarding request array
    const view_requests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/view_requests')
            const data = await res.data
            return data
        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        view_requests()
            .then((data) => setrequest(data.data))
            .catch((err) => console.log(err))
    })

    //all clients - get services from boarding house
    const [allclient, setallclient] = useState([])
    const view_allclients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/view_allclients')
            const data = await res.data
            return data
        } catch (err) {
            console.log("There is an internal error")
        }
    }
    useEffect(() => {
        view_allclients()
            .then((data) => setallclient(data.data))
            .catch((err) => console.log(err))
    })

    // view requests for refund
    const [refund, setrefund] = useState([])
    const refund_requests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/refund_requests')
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        refund_requests()
            .then((data) => setrefund(data.data))
            .catch((err) => console.log(err))
    })


    const input = new Date();
    const date = input.toDateString();

    const [pet, setPet] = useState(false);
    const [addRefund, setaddRefund] = useState(false);
    const [viewRefund, setviewRefund] = useState(false);
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    // click on view pet details button
    const [petdetails, setpetdetails] = useState([])
    const viewPetDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/viewPetDetails/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1("There is an internal error")
            } else {
                setPet(true)
                setpetdetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // get image of pet
    const getPetImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // after viewing  pet details 
    const backpetview = () => {
        setPet(false);
        setShowRequests(2);
    }

    // after click on  refund (for pending refunds)
    const [details1, setdetails1] = useState([])
    const [error2, seterror2] = useState(false)
    const [message2, setmessage2] = useState("")

    const toRefund = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/toRefund/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror2(true)
                setmessage2("There is an internal error")
            } else {
                // console.log(details1)
                setaddRefund(true)
                setdetails1(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // get details from post method - add refund
    const [amount, setamount] = useState("")
    const handleAmount = (event) => {
        setamount(event.target.value)
    }
    const refundAdding = async (id) => {
        setaddRefund(false)
        showRequests(1)

        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/refundAdding`, {
                id,
                amount
            })
        } catch (err) {
            console.log(err)
        }
    }

    // add refund - cancelling
    const addrefundback = () => {
        setaddRefund(false);
        setShowRequests(1)
    }

    // click on view refund details (completed refunds)
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const [details, setdetails] = useState([])

    const ViewRefundDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/view_refundDetails/${id}`)
            if (res.data.message === "There is an internal error") {
                seterror(true)
                setmessage("There is an internal error")
            } else {
                setviewRefund(true);
                setdetails(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // get image 
    const getSlipSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // after viewing the refund details
    const back = () => {
        setviewRefund(false);
        setShowRequests(1)
    }

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

    // clients' boarding requests - from accepted to arrived
    const [error3, seterror3] = useState(false)
    const [message3, setmessage3] = useState("")

    const AcceptedtoArrived = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/AcceptedtoArrived`, {
                id
            })
            if (res.data.message === 'There is an internal error') {
                setmessage3('There is an internal error')
                seterror3(true)
            } else if (res.data.message === 'arrived') {
                setShowRequests(0)
            }

        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // clients' boarding requests - from arrvied to completed
    const [error4, seterror4] = useState(false)
    const [message4, setmessage4] = useState("")

    const ArrviedtoCompleted = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/ArrviedtoCompleted`, {
                id
            })
            if (res.data.message === 'There is an internal error') {
                setmessage4('There is an internal error')
                seterror4(true)
            } else if (res.data.message === 'completed') {
                setShowRequests(0)
            }

        } catch (err) {
            console.log('There is an internal error')
        }
    }


    return (
        <div className="home-container" style={{ marginTop: '5%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" /></Button>
                </div>
            </div>

            <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    value={showRequests}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    onChange={handleForm}
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: showRequests === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients' Boarding Request" ></Tab>
                    <Tab sx={{ backgroundColor: showRequests === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Refund Requests"></Tab>
                    <Tab sx={{ backgroundColor: showRequests === 2 ? 'orange' : '#F0F0F5', color: 'black' }} label="Clients"></Tab>

                </Tabs>
            </Box>

            {/* clients */}
            {showRequests === 2 && (
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
                                        <StyledTableCell align="center">Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allclient && allclient.map((client, index) => (
                                        <StyledTableRow key={client.client_id}>
                                            <StyledTableCell align="center">{client.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{client.name}</StyledTableCell>
                                            <StyledTableCell align="center">{client.address}</StyledTableCell>
                                            <StyledTableCell align="center">{client.contact_number}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {client.status === "premium" ? <><StarIcon sx={{ color: 'orange' }} /> premium</> : "regular"}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button onClick={() => viewPetDetails(client.client_id)} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Pets Details</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* clients requests */}
            {showRequests === 0 && (
                <div>
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
                                    <MenuItem value={3}>Accepted</MenuItem>
                                    <MenuItem value={4}>Arrived</MenuItem>
                                    <MenuItem value={5}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="form-content">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Request ID</StyledTableCell>
                                        <StyledTableCell align="center">Client ID</StyledTableCell>
                                        <StyledTableCell align="center">Pet ID</StyledTableCell>
                                        <StyledTableCell align="center">Package</StyledTableCell>
                                        <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                        <StyledTableCell align="center">Carry Date</StyledTableCell>
                                        <StyledTableCell align="center">Request Status</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {request && request.map((requestrow, index) => (
                                        <StyledTableRow key={requestrow.id}>
                                            <StyledTableCell align="center">{requestrow.request_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.pet_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.package_name}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_arrival_date}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_carry_date}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.request_status}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {requestrow.request_status === 'Accepted'
                                                    ? (<Button onClick={() => AcceptedtoArrived(requestrow.request_id)} sx={{ color: 'white', width: '150px', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Arrived</Button>) :
                                                    requestrow.request_status === 'Arrived'
                                                        ? (<Button onClick={() => ArrviedtoCompleted(requestrow.request_id)} sx={{ color: 'white', width: '150px', backgroundColor: '#000000', ':hover': { backgroundColor: '#000000' } }}>Completed</Button>)
                                                        : ""}

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}

            {/* refund requests */}
            {showRequests === 1 && (
                <div>
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
                                    <MenuItem value={2}>Cancelled</MenuItem>
                                    <MenuItem value={3}>Incompleted</MenuItem>
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
                                        <StyledTableCell align="center">Cancelled Date / Incompleted  </StyledTableCell>
                                        <StyledTableCell align="center">Payment (Rs.)</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        <StyledTableCell align="center">Admin Verification</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {refund && refund.map((refundrow, index) => (
                                        <StyledTableRow key={refundrow.refund_id}>
                                            <StyledTableCell align="center">{refundrow.refund_id}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.request_id}</StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.cancelled_date === "" ? "Incompleted Request" : refundrow.cancelled_date}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{refundrow.price}.00</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.refund_status === 'completed'
                                                    ? <Button onClick={() => ViewRefundDetails(refundrow.refund_id)} sx={{ color: 'white', width: '80%', backgroundColor: '#000000', ':hover': { backgroundColor: '#555555' } }}>Refund Details</Button>
                                                    : <Button onClick={() => toRefund(refundrow.refund_id)} sx={{ color: 'white', width: '80%', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>Refund </Button>}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {refundrow.admin_verification === 'rejected' && refundrow.refund_status === 'completed'
                                                    ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }}>Rejected</Button>)
                                                    : refundrow.admin_verification === 'verified' && refundrow.refund_status === 'completed'
                                                        ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'blue', ':hover': { backgroundColor: 'blue' } }}>Verified</Button>)
                                                        : refundrow.admin_verification === 'pending' && refundrow.refund_status === 'completed'
                                                            ? (<Button sx={{ color: 'white', width: '60%', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>Pending</Button>)
                                                            : ""
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

            {/* pet details viewing */}
            {pet && (
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
                    <FormControl sx={{
                        marginLeft: '5%',
                        marginTop: '40%',
                        borderRadius: '10px',
                        width: '500px',
                        padding: '20px',
                        position: 'relative',
                        zIndex: 1001,
                        backgroundColor: 'black'
                    }}>
                        <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={backpetview}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '300px' }} /></IconButton>
                            </div>
                            <div className="form-topic">
                                Pet Details
                                <hr />
                            </div>

                            {petdetails && petdetails.map((petrow, index) => (
                                <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{ minHeight: "100px" }}
                                            component={"img"}
                                            src={petrow.image === "" ? getPetImageSrc("noimage.png") : getPetImageSrc(petrow.image)}
                                            alt={petrow.name} />

                                        <CardContent>
                                            <Stack sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}>Pet ID  </Typography>
                                                <Typography sx={{marginLeft:'5%', fontWeight:'bold'}}>: {petrow.pet_id}</Typography>
                                            </Stack>

                                            <Stack sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}> Name  </Typography>
                                                <Typography sx={{marginLeft:'5%', fontWeight:'bold'}}>: {petrow.name}</Typography>
                                            </Stack>

                                            <Stack sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}>Category  </Typography>
                                                <Typography sx={{marginLeft:'5%'}}>: {petrow.category}</Typography>
                                            </Stack>

                                            <Stack sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}>Breed  </Typography>
                                                <Typography sx={{marginLeft:'5%', color:'red'}}>: {petrow.breed}</Typography>
                                            </Stack>

                                            <Stack sx={{display:'flex', flexDirection:'row'}}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}> Sex  </Typography>
                                                <Typography sx={{marginLeft:'5%'}}>: {petrow.sex}</Typography>
                                            </Stack>

                                            {/* <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}><PetsIcon sx={{ color: 'orange' }} />
                                                {petrow.name}
                                            </Typography>

                                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{petrow.sex}</Typography><br />
                                            <Typography variant="h6" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{petrow.breed}</Typography> */}

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                    </FormControl>
                </div>
            )}

            {/* {pet && (
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
                    {petdetails && petdetails.map((petrow, index) => (
                        <FormControl sx={{
                            marginLeft: '5%',
                            marginTop: '30%',
                            borderRadius: '10px',
                            width: '700px',
                            padding: '20px',
                            position: 'relative',
                            zIndex: 1001,
                            backgroundColor: 'black'
                        }}>
                            <div style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px', paddingRight: '60px', paddingLeft: '60px', borderRadius: '10px' }}>
                                <div>
                                    <IconButton onClick={backpetview}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '500px' }} /></IconButton>
                                </div>
                                <div className="form-topic">
                                    Pet Details
                                    <hr />
                                </div>

                                <div className="form-label" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div>
                                        <img
                                            style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
                                            component={"img"}
                                            src={petrow.image === "" ? getPetImageSrc("noimage.png") : getPetImageSrc(petrow.image) }
                                            alt={petrow.name}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>  Pet ID  </FormLabel>
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
                                                    defaultValue={petrow.pet_id}
                                                /></div>

                                        </Box>
                                    </div>
                                </div>

                                <div className="form-label" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div>
                                        <FormLabel>  Pet Name  </FormLabel>
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
                                                    defaultValue={petrow.name}
                                                /></div>

                                        </Box>
                                    </div>

                                    <div>
                                        <FormLabel>  Pet Breed  </FormLabel>
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
                                                    defaultValue={petrow.breed}
                                                /></div>

                                        </Box>
                                    </div>
                                </div>
                                <div className="form-label" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div>
                                        <FormLabel>Category</FormLabel>
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
                                                    defaultValue={petrow.category}
                                                /></div>

                                        </Box>
                                    </div>

                                    <div>
                                        <FormLabel>  Sex  </FormLabel>
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
                                                    defaultValue={petrow.sex}
                                                /></div>

                                        </Box>
                                    </div>
                                </div>

                            </div>

                        </FormControl>
                    ))}
                </div>
            )} */}

            {/* place refund */}
            {addRefund && (
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
                    {details1 && details1.map((drow1, index) => (
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
                                    <IconButton onClick={addrefundback}  ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '800px' }} /></IconButton>
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
                                                    defaultValue={drow1.request_id}
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
                                                    defaultValue={drow1.acc_no}
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
                                                    defaultValue={drow1.bank}
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
                                                    defaultValue={drow1.branch}
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
                                    {/* <TextField
                                        sx={{ marginRight: '20px', marginLeft: '10px' }}
                                        type="file"
                                        variant="outlined"
                                        placeholder="Choose a file"
                                        inputProps={{ accept: 'image/*' }} 
                                    /> */}
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
                                    <Button variant="contained" onClick={() => refundAdding(drow1.request_id)} sx={{ background: 'orange', width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Place Refund</Button>
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

            {/* view refund details */}
            {viewRefund && (
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
                                                    defaultValue={drow.request_id}
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
                                        src={drow.refund_slip === "" ? getSlipSrc("noimage.png") : getSlipSrc(drow.refund_slip)}
                                        alt="bank slip"
                                        style={{ width: '50%', height: 'auto', borderRadius: '10px' }} />
                                </div>
                            </div>
                        </FormControl>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Clients;
