
import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ProfilePicture from '../../assests/profile-picture.png';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableHead, TableRow, TableBody, TableCell, Button, InputLabel, IconButton } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import TableViewIcon from '@mui/icons-material/TableView';
import { ResponsiveChartContainer, LinePlot, useDrawingArea } from '@mui/x-charts';
import { useNavigate } from "react-router";
import axios from "axios";


const StyledPath = styled('path')(({ theme }) => ({
    fill: 'none',
    stroke: theme.palette.text.primary,
    shapeRendering: 'crispEdges',
    strokeWidth: 2,
    pointerEvents: 'none',
}));

const StyledText = styled('text')(({ theme }) => ({
    stroke: 'none',
    fill: theme.palette.text.primary,
    shapeRendering: 'crispEdges',
}));
function DrawingAreaBox() {
    const { left, top, width, height } = useDrawingArea();
    return (
        <React.Fragment>
            <StyledPath
                d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
            />
            <circle cx={left} cy={top} r={3} style={{ fill: 'orange' }} />
            <circle cx={left + width} cy={top + height} r={3} style={{ fill: 'orange' }} />
            <StyledText
                x={left}
                y={top}
                textAnchor="start"
                dominantBaseline="text-after-edge"
            >

            </StyledText>
            <StyledText

                textAnchor="end"
                dominantBaseline="text-before-edge"
            >

            </StyledText>
        </React.Fragment>
    );
}

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


const Dashboard = () => {
    const navigate = useNavigate("")

    const input = new Date();
    const date = input.toDateString();

    // PENDING AND COMPLETED APPOINTMENTS COUNT
    const [count1, setcount1] = useState([]) //pending
    const [count2, setcount2] = useState([]) //completed

    const pendingBox = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/pendingBox`)
            setcount1(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }
    const completedBox = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/completedBox`)
            setcount2(res.data.data)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        pendingBox();
        completedBox();
    }, [pendingBox, completedBox])

    const [main, setmain] = useState(true);
    const [tables, setTables] = useState(false);
    const [id1, setid1] = useState("")
    // click on particualar request box
    const ClickRequest = (id) => {
        setmain(false);
        setTables(true);
        setid1(id)
    }

    // finish viewing the details 
    const FinishViewing = () => {
        // setTables(false);
        setmain(true);
        setid1(null)
    }

    // connect profile 
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // analyse of system doctors
    const [vet, setvet] = useState("")
    const systemDoctors = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/systemDoctors`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        systemDoctors()
            .then((data) => setvet(data.data))
            .catch((err) => console.log(err))
    })

    // viewing pending appointments
    const [pending, setpending] = useState("")
    const pendingRequest = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/medi_help_manager/pendingRequest')
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

    // get counts of pending and completed complains
    const [complain, setcomplain] = useState("")
    const complainsCount = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/medi_help_manager/complainsCount`)
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        complainsCount()
            .then((data) => setcomplain(data.data))
            .catch((err) => console.log(err))
    })


    return (

        <div className="home-container" style={{ marginTop: '4%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Medi Help Center Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}>
                        <img src={getProfilepicturepath("medi_profile.jpg")}
                            alt="profilepicture"
                            className="boarding-profile-picture" />
                    </Button>
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', marginBottom: '1%' }}>
                <div style={{ backgroundColor: 'orange', height: '250px', width: '46%', padding: '1%', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="boarding-box-header">
                            <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>Appointments Analyze</h3>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <div style={{ backgroundColor: 'white', width: '50%', borderRadius: '10px', margin: '1%', padding: '1%' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Pending Appointments</p>
                            {count1 && count1.map((menu, index) => (
                                <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>{menu.totalpending}</h1>
                            ))}
                        </div>
                        <div style={{ backgroundColor: 'white', width: '50%', borderRadius: '10px', margin: '1%', padding: '1%' }} >
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'orange', marginRight: '5px' }} />Completed Appointments</p>
                            {count2 && count2.map((menu, index) => (
                                <h1 style={{ fontWeight: '1000', textAlign: 'center', fontSize: '40px', color: 'orange' }}>{menu.totalcompleted}</h1>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: 'orange', height: '250px', width: '46%', padding: '1%', borderRadius: '10px', marginRight: '4%', overflowY: 'auto' }}>
                    <div className="boarding-box-header">
                        <AssignmentLateIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3>Pending Appointments</h3>
                    </div>
                    {pending && pending.length > 0 ? (pending.map((pend, next) => (
                        <>
                            <div>
                                {main && (
                                    <><div>
                                        <div>
                                            <Typography sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '10px', width: '100%', marginBottom: '5px' }}>Appointment ID: {pend.appointment_id} <IconButton onClick={() => ClickRequest(pend.appointment_id)}><TableViewIcon sx={{ marginLeft: '500px' }} /></IconButton></Typography>
                                        </div>
                                    </div></>
                                )}

                                {/* view details of pending boarding requests (after click on) */}
                                {!main && (
                                    <div style={{ padding: '10px', margin: '0px', borderRadius: '10px', backgroundColor: '#f0f0f5' }}>
                                        <Typography sx={{ fontWeight: 'bold' }}> Appointment ID : {pend.appointment_id} </Typography>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: '#fe9e0d', color: 'blue' }}>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">Client ID</StyledTableCell>
                                                    <StyledTableCell align="center">Pet ID</StyledTableCell>
                                                    <StyledTableCell align="center">Doctor ID</StyledTableCell>
                                                    <StyledTableCell align="center">Date</StyledTableCell>
                                                    <StyledTableCell align="center"></StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead >
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center">{pend.client_email}</StyledTableCell>
                                                    <StyledTableCell align="center">{pend.pet_id}</StyledTableCell>
                                                    <StyledTableCell align="center">{pend.vet_id}</StyledTableCell>
                                                    <StyledTableCell align="center">{pend.placed_date}</StyledTableCell>
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
                        <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#f0f0f5' }}>
                            <Typography sx={{ textAlign: 'center' }}>No Pending Boarding Requests</Typography>
                        </div>

                    )}
                </div>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', marginTop: '1%' }}>
                <div style={{ backgroundColor: '#F0F0F5', height: '310px', width: '46%', padding: '1%', borderRadius: '10px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AssessmentIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>Current System Doctors </h3>
                        </div>
                    </div>
                    {vet && vet.map((vetrow, index) => (
                        <div>
                            <PieChart
                                colors={['#FBBD08', '#55555C']}
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: vetrow.week, label: 'Weekdays' },
                                            { id: 1, value: vetrow.weekend, label: 'Weekend' },
                                        ],
                                    },
                                ]}
                                width={600}
                                height={200}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ backgroundColor: '#F0F0F5', height: '310px', width: '46%', padding: '1%', borderRadius: '10px', marginRight: '4%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AssessmentIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                        <h3 style={{ color: 'black' }}>Clients Complaints </h3>
                    </div>

                    {complain && complain.map((menu, index) => (
                        <PieChart
                            colors={['#FBBD08', '#55555C']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: menu.pendingCount, label: 'Pending' },
                                        { id: 1, value: menu.completedCount, label: 'Completed' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={200}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
