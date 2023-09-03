import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ProfilePicture from '../../assests/profile-picture.png';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PieChart } from '@mui/x-charts/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousIcon from '@mui/icons-material/Dangerous';
import axios from "axios";
import PetsIcon from '@mui/icons-material/Pets';

const Home = () => {
    // drop down
    const [time, setTime] = React.useState('1');

    const handleChange = (event) => {
        setTime(event.target.value);
    };
    const input = new Date();
    const date = input.toDateString();

    // get the count of managers
    const countManagers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/countManagers')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    const [managercount, setmanagercount] = useState("")
    useEffect(() => {
        countManagers()
            .then((data) => setmanagercount(data.data))
            .catch((err) => console.log(err))
    })

    // get the count of clients
    const countClients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/countClients')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internal error")
        }
    }
    const [clientcount, setclientcount] = useState("")
    useEffect(() => {
        countClients()
            .then((data) => setclientcount(data.data))
            .catch((err) => console.log(err))
    })

    // get managers complains count separetly
    const countComplains = async () => {
        try {
            const res = await axios.get("http://localhost:5000/pet_care/admin/countComplains")
            const data = await res.data
            return data
        } catch (err) {
            console.log("There is an internal error")
        }
    }
    const [complaincount, setcomplaincount] = useState("")
    useEffect(() => {
        countComplains()
            .then((data) => setcomplaincount(data.data))
            .catch((err) => console.log(err))
    })

    // get count of refund verifications
    const [countr, setcountr] = useState("")
    const countRefund = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/countRefund')
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        countRefund()
            .then((data) => setcountr(data.data))
            .catch((err) => console.log(err))
    })

    // get count of clients added pets
    const [pending, setpending] = useState("")
    const countClientPets = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/countClientPets')
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        countClientPets()
            .then((data) => setpending(data.data))
            .catch((err) => console.log(err))
    })

    return (
        <div className="home-container" style={{ marginTop: '5%' }}>

            <div className="top">
                <div className="top-line">
                    <p>Administrator</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <img src={ProfilePicture} alt="profilepicture" className="boarding-profile-picture" />
                </div>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#F0F0F5', margin: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'orange' }} />
                        <h3>Analytical Overview</h3>
                    </div>
                    <Box sx={{ width: '120px', marginLeft: '70%' }}>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={time}
                                variant='filled'
                                label="Time"
                                onChange={handleChange}
                                l
                                sx={{ fontSize: '12px' }}>
                                <MenuItem value={1}>Today</MenuItem>
                                <MenuItem value={2}>Last 7 days</MenuItem>
                                <MenuItem value={3}>Last Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '300px', height: '180px' }}>
                        <p style={{ fontWeight: 'bold', marginLeft: '10px' }}><PeopleIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} /> Clients</p>
                        {clientcount && clientcount.length > 0 ? (clientcount.map((crow, next) => (
                            <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{crow.count}</p>
                        ))
                        ) : (
                            <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                        )}
                    </div>

                    <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '300px', height: '180px' }}>
                        <p style={{ fontWeight: 'bold' }}><AccountCircleIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} />Managers</p>
                        {managercount && managercount.length > 0 ? (managercount.map((mrow, next) => (
                            <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{mrow.count}</p>
                        ))
                        ) : (
                            <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                        )}
                    </div>

                    <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '300px', height: '180px' }}>
                        <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} /> Clients Added Pets</p>
                        {pending && pending.length > 0 ? ( pending.map((prow, next) => (
                            <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{prow.count}</p>
                        ))
                        ) :(
                            <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                        )}
                    </div>

                </div>

                {/* user 2 boxes */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>
                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', width: '600px', height: '280px' }}>
                        <p style={{ marginBottom: '30px', fontWeight: 'bold' }}><VerifiedIcon sx={{ color: 'orange', marginRight: '6px', marginLeft: '5px' }} /> Verified Refund Slips </p>
                        {countr && countr.map((refund, next) => (
                            <PieChart
                                colors={['orange', 'black']}
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: refund.boarding_pending + refund.carecenter_pending, label: 'Pending' },
                                            { id: 1, value: refund.boarding_completed + refund.carecenter_completed, label: 'Completed' },
                                        ],
                                    },
                                ]}
                                width={500}
                                height={200}
                            />
                        ))}
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', width: '600px', height: '280px' }}>
                        <p style={{ marginBottom: '30px', fontWeight: 'bold' }}><DangerousIcon sx={{ color: 'orange', marginRight: '6px', marginLeft: '5px' }} />Managers' Complains Analyse </p>
                        {complaincount && complaincount.map((comcount, next) => (
                            <PieChart
                                colors={['orange', 'black']}
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: comcount.pending_com, label: 'Pending' },
                                            { id: 1, value: comcount.completed_com, label: 'Responsed' },
                                        ],
                                    },
                                ]}
                                width={500}
                                height={200}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;