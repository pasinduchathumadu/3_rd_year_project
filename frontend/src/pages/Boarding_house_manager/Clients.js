/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
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
import { IconButton, Tab, Card, CardActionArea, CardContent, CardMedia, Typography, Alert, AlertTitle } from "@mui/material";
import { Tabs } from "@mui/material";
import { FormLabel, TextField } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

    const [showRequests, setShowRequests] = useState(0);
    const handleForm = (event, existing_value) => {
        setShowRequests(existing_value)
    };

    // boarding requests viewing - with filter
    const [request, setrequest] = useState([]) //boarding request array

    const [clients1, setclients1] = React.useState('1')
    const handleChange1 = (event) => {
        setclients1(event.target.value)

        view_requests()
    };
    const view_requests = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/view_requests/${clients1}`)
            setrequest(res.data.data)
            setclients1('')
        } catch (err) {
            console.log(clients1)
            console.log(err)
        }
    }
    useEffect(() => {
        view_requests()
    }, [clients1, view_requests])

    //all clients - get services from boarding house - WITH FILTERING
    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);
        view_allclients()
    };

    const [allclient, setallclient] = useState([])
    const view_allclients = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/view_allclients/${clients}`)
            setallclient(res.data.data)
            setClients('')
        } catch (err) {
            console.log(clients)
            console.log(err)
        }
    }
    useEffect(() => {
        view_allclients()
    }, [clients, view_allclients]);

    // view requests for refund
    const [refund, setrefund] = useState([])

    const [clients2, setclients2] = React.useState('1')
    const handleChange2 = (event) => {
        setclients2(event.target.value)

        refund_requests()
    };
    const refund_requests = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/refund_requests/${clients2}`)
            setrefund(res.data.data)
            setclients2('')

        } catch (err) {
            console.log(clients2)
            console.log(err)
        }
    }
    useEffect(() => {
        refund_requests()

    }, [clients2, refund_requests])


    const input = new Date();
    const date = input.toDateString();
    const [refundfinal , setrefundfinal] = useState("")
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
                setrefundfinal(id)
                seterror(false)
                setamount("")
                setimage("")
                setaddRefund(true)
                setdetails1(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // get details from post method - add refund
    const [error5, seterror5] = useState(false)
    const [message5, setmessage5] = useState("")
    const [amount, setamount] = useState("")
    const handleAmount = (event) => {
        setamount(event.target.value)
    }
    const [refundid , setrefundid ] = useState("")
    const handleconfirm = (refund_id)=>{
        setrefundid(refund_id)
        handleFileUpload()
    }
    const refundAdding = async () => {
        if(refundfinal === ""|| amount === ""||image=== ""){
            seterror(true)
            setmessage("Please be filled all the fields!!")
            return
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/refundAdding`, {
                refundfinal,
                amount,
                image
            })
            if(res.data.message === "Refund Added"){
                setaddRefund(false)
                window.location.reload();
            }else if(res.data.message === 'Incorrect amount entered') {
                seterror5(true)
                setmessage5("Incorrect amount entered")
            }
        } catch (err) {
            console.log(err)//this is error
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

     // get profile picture
     const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // clients' boarding requests - from pending to accepted
    const [error3, seterror3] = useState(false)
    const [message3, setmessage3] = useState("")

    const PendingToAccepted = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/PendingToAccepted`, {
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

    // clients' boarding requests - from accepted to completed
    const [error4, seterror4] = useState(false)
    const [message4, setmessage4] = useState("")

    const AcceptedToCompleted = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/AcceptedToCompleted`, {
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
    const [image, setimage] = useState("")
    const [selectfile, setfile] = useState(null)
    const handlefilechange = async (event) => {
        const file = event.target.files[0]
        setfile(file)
        setimage(file.name)
      }
    const handleFileUpload = async () => {
        seterror(false)
      
        try {
          const formData = new FormData();
          formData.append("image", selectfile);
    
          const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.message === "File uploaded successfully") {
            refundAdding()
          
          }
    
          console.log("File uploaded successfully!");
          // Add any further handling of the response from the backend if needed.
    
        } catch (err) {
          console.log("There is an internal error", err);
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
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Boarding Requests</p>
                </div>
                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={getProfilepicturepath("boarding_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
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
                                        {/* <StyledTableCell align="center">Status</StyledTableCell> */}
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
                                            {/* <StyledTableCell align="center">
                                                {client.status === "premium" ? <><StarIcon sx={{ color: 'orange' }} /> premium</> : "regular"}
                                            </StyledTableCell> */}
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

                                    variant='filled'
                                    label="clients"
                                    onChange={handleChange1}
                                    
                                    sx={{ fontSize: '11px' }}
                                >
                                    <MenuItem value={1}>All</MenuItem>
                                    <MenuItem value={2}>Pending</MenuItem>
                                    <MenuItem value={3}>Accepted</MenuItem>
                                    <MenuItem value={4}>Completed</MenuItem>
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
                                        {/* <StyledTableCell align="center">Request Status</StyledTableCell> */}
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {request && request.map((requestrow, index) => (
                                        <StyledTableRow key={requestrow.request_id}>
                                            <StyledTableCell align="center">{requestrow.request_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.client_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.pet_id}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.package_name}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_arrival_date}</StyledTableCell>
                                            <StyledTableCell align="center">{requestrow.board_carry_date}</StyledTableCell>
                                            {/* <StyledTableCell align="center">{requestrow.request_status}</StyledTableCell> */}
                                            <StyledTableCell align="left">
                                                {requestrow.request_status === 'pending'
                                                    ? (<Button onClick={() => PendingToAccepted(requestrow.request_id)} sx={{color:'white', backgroundColor:'orange', ':hover':{backgroundColor:'orange'}}}>Accepted</Button>) :
                                                    requestrow.request_status === 'accepted'
                                                        ? (<Button onClick={() => AcceptedToCompleted(requestrow.request_id)} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }}>Complete</Button>) :
                                                            requestrow.request_status === 'completed' 
                                                            ? "Completed" : ""}

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

                                    variant='filled'
                                    label="clients"
                                    onChange={handleChange2}
                                    
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
                                                {refundrow.early_cancel_date === "" ? "Incompleted Request" : refundrow.early_cancel_date}
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
                                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}>Pet ID  </Typography>
                                                <Typography sx={{ marginLeft: '5%', fontWeight: 'bold' }}>: {petrow.pet_id}</Typography>
                                            </Stack>

                                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}> Name  </Typography>
                                                <Typography sx={{ marginLeft: '5%', fontWeight: 'bold' }}>: {petrow.name}</Typography>
                                            </Stack>

                                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}>Category  </Typography>
                                                <Typography sx={{ marginLeft: '5%' }}>: {petrow.category}</Typography>
                                            </Stack>

                                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}>Breed  </Typography>
                                                <Typography sx={{ marginLeft: '5%', color: 'red' }}>: {petrow.breed}</Typography>
                                            </Stack>

                                            <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <Typography gutterBottom component={"div"} sx={{ textAlign: 'center' }}> Sex  </Typography>
                                                <Typography sx={{ marginLeft: '5%' }}>: {petrow.sex}</Typography>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                    </FormControl>
                </div>
            )}

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
                            position: 'relative',
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
                                            /></div>
                                    </Box>
                                </div>

                                <div className="form-label">
                                    <FormLabel>Upload Bank Slip : </FormLabel>
                                    <div style={{ display: 'inline' }}>
                                        <Button
                                            variant="contained"
                                            component="label"

                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload File
                                            <input type="file" hidden onChange={handlefilechange} required />

                                        </Button>
                                        <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                                        {selectfile && (
                                            <Typography sx={{color:'black'}}>{selectfile.name}</Typography>

                                        )}
                                    </div>        
                                    </div>
                                </div>
                                {error5 && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">
                                           
                                            {message5}
                                        </Alert>
                                    </Stack>

                                )}
                               
                                <div>
                                    <Button variant="contained" onClick={() =>handleconfirm(drow1.refund_id)} sx={{ background: 'orange', width: '100%', marginRight: '10px', marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" } }}>Place Refund</Button>
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
