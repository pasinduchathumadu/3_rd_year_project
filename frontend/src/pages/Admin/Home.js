import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { PieChart } from '@mui/x-charts/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousIcon from '@mui/icons-material/Dangerous';
import axios from "axios";
import PetsIcon from '@mui/icons-material/Pets';
import { Typography, Box } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Home = () => {

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

    // boarding revenue
    const [brev, setbrev] = useState("")
    const BoardingRevenue = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/BoardingRevenue')
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        BoardingRevenue()
            .then((data) => setbrev(data.data))
            .catch((err) => console.log(err))
    })

    // medi revenue
    const [medirev, setmedirev] = useState("")
    const MediRevenue = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/admin/MediRevenue')
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        MediRevenue()
            .then((data) => setmedirev(data.data))
            .catch((err) => console.log(err))
    })

    // other revenue
    const [otherrev, setotherrev] = useState("")
    const OtherRevenue = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/OtherRevenue`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        OtherRevenue()
            .then((data) => setotherrev(data.data))
            .catch((err) => console.log(err))
    })

    // store revenue
    const [storerev, setstorerev] = useState("")
    const StoreRevenue = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/StoreRevenue`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        StoreRevenue()
            .then((data) => setstorerev(data.data))
            .catch((err) => console.log(err))
    })

    // care center revenue
    const [care, setcare] = useState("")
    const CareCenterRevenue = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/CareCenterRevenue`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        CareCenterRevenue()
            .then((data) => setcare(data.data))
            .catch((err) => console.log(err))
    })
    // system pets count
    const [pets, setpets] = useState("")
    const systemPetsCount = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/admin/systemPetsCount`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        systemPetsCount()
            .then((data) => setpets(data.data))
            .catch((err) => console.log(err))
    })


    // get admin profile photo
    const getProfileImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

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
                    <img
                        src={getProfileImageSrc("admin.jpg")}
                        alt="profilepicture"
                        className="boarding-profile-picture" />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ padding: '1%', backgroundColor: '#F0F0F5', margin: '1%', borderRadius: '10px', width: '55%', height: '100vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'orange' }} />
                            <h3>Analytical Overview</h3>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '30%', height: '10%', marginRight: '1%' }}>
                            <p style={{ fontWeight: 'bold', marginLeft: '10px' }}><PeopleIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} /> Clients</p>
                            {clientcount && clientcount.length > 0 ? (clientcount.map((crow, next) => (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{crow.count}</p>
                            ))
                            ) : (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                            )}
                        </div>

                        <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '30%', height: '10%', marginRight: '1%' }}>
                            <p style={{ fontWeight: 'bold' }}><AccountCircleIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} />Managers</p>
                            {managercount && managercount.length > 0 ? (managercount.map((mrow, next) => (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{mrow.count}</p>
                            ))
                            ) : (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                            )}
                        </div>

                        <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '30%', height: '10%', marginRight: '1%' }}>
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} /> System Pets</p>
                            {pets && pets.length > 0 ? (pets.map((prow, next) => (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{prow.count}</p>
                            ))
                            ) : (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                            )}
                        </div>

                        <div style={{ backgroundColor: 'orange', padding: '10px', borderRadius: '20px', width: '30%', height: '10%', marginRight: '1%' }}>
                            <p style={{ fontWeight: 'bold' }}><PetsIcon sx={{ color: 'black', marginRight: '6px', marginLeft: '5px' }} /> Clients Pets</p>
                            {pending && pending.length > 0 ? (pending.map((prow, next) => (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>{prow.count}</p>
                            ))
                            ) : (
                                <p style={{ fontWeight: 'bolder', fontSize: '60px', textAlign: 'center', color: 'white' }}>0</p>
                            )}
                        </div>
                    </div>

                    {/* user 2 boxes */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2%', backgroundColor: 'white', borderRadius: '10px', padding: '1%', marginLeft: '2%', marginRight: '2%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AnalyticsIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'orange' }} />
                            <h3>Revenue Analyse</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%', marginBottom: '1%' }}>
                            <Box sx={{ backgroundColor: '#A0A0A5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold', textAlign:'center' }}>Revenue Center</Typography>
                            </Box>
                            <Box sx={{ backgroundColor: '#A0A0A5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Revenue</Typography>
                            </Box>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%', marginBottom: '1%' }}>
                            <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold' }}><AutoAwesomeIcon sx={{color:'orange', marginRight:'3%'}} />Boarding House</Typography>
                            </Box>
                            {brev && brev.map((menu, index) => (
                                <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                    {/* <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Rs. {menu.boarding}</Typography> */}
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Rs. {parseFloat(menu.boarding).toFixed(2)}</Typography>
                                </Box>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '1%', marginBottom: '1%' }}>
                            <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold' }}><AutoAwesomeIcon sx={{color:'orange', marginRight:'3%'}} />Online Store</Typography>
                            </Box>
                            {storerev && storerev.map((menu, index) => (
                                <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Rs.{parseFloat(menu.store).toFixed(2)} </Typography>
                                </Box>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '1%', marginBottom: '1%' }}>
                            <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold' }}><AutoAwesomeIcon sx={{color:'orange', marginRight:'3%'}} />Care Center</Typography>
                            </Box>
                            {care && care.map((menu, index) => (
                                <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Rs.{parseFloat(menu.training + menu.grooming + menu.mindrelaxing).toFixed(2)}</Typography>
                                </Box>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '1%', marginBottom: '1%' }}>
                            <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold' }}><AutoAwesomeIcon sx={{color:'orange', marginRight:'3%'}} />Medi House</Typography>
                            </Box>
                            {medirev && medirev.map((menu, index) => (
                                <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Rs.{parseFloat(menu.medi).toFixed(2)}</Typography>
                                </Box>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '1%', marginBottom: '2%' }}>
                            <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                <Typography sx={{ fontWeight: 'bold' }}><AutoAwesomeIcon sx={{color:'orange', marginRight:'3%'}} />Other</Typography>
                            </Box>
                            {otherrev && otherrev.map((menu, index) => (
                                <Box sx={{ backgroundColor: '#F0F0F5', borderRadius: '10px', padding: '2%', width: '30%' }}>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Rs. {parseFloat(menu.pending + menu.sold + menu.competition).toFixed(2)}</Typography>
                                </Box>
                            ))}
                        </div>

                    </div>
                </div>

                <div style={{ padding: '1%', backgroundColor: '#F0F0F5', margin: '1%', borderRadius: '10px', width: '45%', height: '100vh' }}>
                    {/* rigth side */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%' }}>
                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', width: '95%', height: '100%', marginRight: '1%', marginBottom: '5%', marginTop: '1%' }}>
                            <p style={{ marginBottom: '30px', fontWeight: 'bold' }}><VerifiedIcon sx={{ color: 'orange', marginRight: '1%', marginLeft: '1%' }} /> Verified Refund Slips </p>
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

                        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', width: '95%', height: '100%', marginLeft: '1%', marginBottom: '5%', marginTop: '1%' }}>
                            <p style={{ marginBottom: '30px', fontWeight: 'bold' }}><DangerousIcon sx={{ color: 'orange', marginRight: '1%', marginLeft: '1%' }} />Managers' Complains Analyse </p>
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
        </div>
    )
}

export default Home;