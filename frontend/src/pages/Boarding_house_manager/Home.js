import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
// import ProfilePicture from '../../assests/profile-picture.png';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Table, TableHead, TableRow, TableBody, TableCell, Button, InputLabel } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import TableViewIcon from '@mui/icons-material/TableView';
import axios from "axios";
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


const Home = () => {
    const navigate = useNavigate("")

      // analytical overview filtering
    const [time1, setTime1] = React.useState('1');
    const [count1, setcount1] = useState([])
    const [count2, setcount2] = useState([])

    const handleChange1 = (event) => {
        setTime1(event.target.value);

        filterbox1()
        filterbox2()
    };
    const filterbox1 = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/filterbox1/${time1}`)
            setcount1(res.data.data)
            setTime1('')
        }catch(err) {
            console.log(time1)
            console.log(err)
        }
    }
    const filterbox2 = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/filterbox2/${time1}`)
            setcount2(res.data.data)
            setTime1('')
        }catch(err) {
            console.log(time1)
            console.log(err)
        }
    }
    useEffect(() => {
        filterbox1();
        filterbox2();
    }, [time1, filterbox1, filterbox2]);

    const [main, setmain] = useState(true);

    // click on particualar request box
    const ClickRequest = () => {
        setmain(false);
        // setTables(true);
    }

    // finish viewing the details 
    const FinishViewing = () => {
        // setTables(false);
        setmain(true);
    }

    const input = new Date();
    const date = input.toDateString();

    // count of package usage
    const [pckg, setpckg] = useState("")
    const packageUsage = async () => {
        try {
            const res = await axios.get("http://localhost:5000/pet_care/boarding_house_manager/packageUsage")
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        packageUsage()
            .then((data) => setpckg(data.data))
            .catch((err) => console.log(err))
    })

    // viewing pending boarding requests
    const [pending, setpending] = useState("")
    const pendingRequest = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/boarding_house_manager/pendingRequest')
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        pendingRequest()
            .then((data) => setpending(data.data))
            .catch((err) => console.log(err))
    })

    const cages = () => {
        navigate("/cages");
    }

    // connect profile 
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)

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
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}>
                        <img src={getProfilepicturepath("boarding_profile.jpeg")} 
                            alt="profilepicture" 
                            className="boarding-profile-picture" />
                    </Button>
                </div>
            </div>

            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper" style={{ backgroundColor: 'orange', height: '250px' }}>
                    <div className="boarding-box-header">
                        <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Analytical Overview</h3>
                        <Box sx={{ minWidth: 120, marginLeft: '315px' }}>
                            <FormControl fullWidth>
                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                
                                    variant='outlined'
                                    label="Time"
                                    onChange={handleChange1}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Month</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className="boarding-wrapper-box-mian">
                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }}>
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Completed Boarding Requests</p>
                            {count1 &&  count1.map((prow, index) => (
                                <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>{prow.totalcompleted}</h1>
                            ))}
                          
                        </div>

                        <div className="boarding-wrapper-box" style={{ backgroundColor: 'white' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Cancelled Boarded Requests</p>
                            {count2 && count2.map((prow, index) => (
                                <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>{prow.totalcancelled}</h1>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="boarding-wrapper" style={{ backgroundColor: 'orange', height: '250px' }}>

                    <div className="boarding-box-header">
                        <AssignmentLateIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Pending Boarding Requests</h3>
                    </div>
                    {pending && pending.length > 0 ? (pending.map((pend, next) => (
                        <>
                            <div>
                                {main && (
                                    <><div>
                                        <div>
                                            <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '10px', width: '100%', marginBottom: '5px' }}>Request ID: {pend.request_id} <TableViewIcon onClick={() => ClickRequest()} sx={{ marginLeft: '500px' }} /></Typography>
                                        </div>
                                    </div></>
                                )}

                                {/* view details of pending boarding requests (after click on) */}
                                {!main && (
                                    <div style={{ padding: '10px', margin: '0px', borderRadius: '10px', backgroundColor: '#f0f0f5' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}>Request ID : {pend.request_id} </Typography>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: '#fe9e0d', color: 'blue' }}>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">Client ID</StyledTableCell>
                                                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                                                    <StyledTableCell align="center">Arrival Date</StyledTableCell>
                                                    <StyledTableCell align="center">Time</StyledTableCell>
                                                    <StyledTableCell align="center"></StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead >
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">{pend.client_id}</StyledTableCell>
                                                    <StyledTableCell align="center">{pend.pet_id}</StyledTableCell>
                                                    <StyledTableCell align="center">{pend.board_arrival_date}</StyledTableCell>
                                                    <StyledTableCell align="center">{pend.board_time}</StyledTableCell>
                                                    <StyledTableCell align="center"><Button onClick={() => FinishViewing()} sx={{ backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' }, color: 'white', width: '100px', marginTop: '10px' }}>Done</Button></StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </div>
                        </>
                    ))
                    ) : (
                        <div style={{padding:'10px', borderRadius:'10px', backgroundColor:'#f0f0f5' }}>
                        <Typography sx={{textAlign:'center'}}>No Pending Boarding Requests</Typography>
                        </div>

                    )}
                </div>
            </div>


            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper" style={{ backgroundColor: '#F0F0F5', height: '310px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AssessmentIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black'}}> Cages Current Usage</h3>
                        </div>
                        <Button onClick={cages} sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }}>View Cages Structure</Button>
                    </div>
                    <div>
                        <PieChart
                            colors={['#FBBD08', '#55555C']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 15, label: 'Reserved' },
                                        { id: 1, value: 25, label: 'Free' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={200}
                        />
                    </div>
                </div>

                <div className="boarding-wrapper" style={{ backgroundColor: '#F0F0F5', height: '310px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <InventoryIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>Packages Usage</h3>
                        </div>   
                    </div>

                    {pckg && pckg.map((pkrow, index) => (
                        <div>
                            <PieChart
                                colors={['#FBBD08', '#A6A6A6', '#55555C']}
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: pkrow.gold, label: 'Gold' },
                                            { id: 1, value: pkrow.silver, label: 'Silver' },
                                            { id: 2, value: pkrow.platinum, label: 'Platinum' },
                                        ],
                                    },
                                ]}
                                width={600}
                                height={200}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Home