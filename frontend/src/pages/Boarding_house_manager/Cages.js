import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import BackgroundImage from '../../assests/boarding_cover.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router';
import axios from "axios";

const Cages = () => {
    const input = new Date()
    const date = input.toDateString()

    const navigate = useNavigate("")

    // back to dashboard
    const backto = () => {
        navigate("/boarding_dashboard")
    }
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }
    const [cages, setcages] = useState([])
    const getCages = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/getCages`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }

    }

    useEffect(() => {
        getCages()
            .then((data) => setcages(data.data))
            .catch((err) => console.log(err))
    })

    return (
        <div className="home-container" style={{ marginTop: '4%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>

                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Boarding Cage Structure</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={getProfilepicturepath("boarding_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
                </div>
            </div>

            <div style={{ position: 'absolute' }}>
                <Typography sx={{ color: 'white', fontSize: '40px', marginLeft: '500px', marginTop: '50px', fontWeight: 'bold' }}>Boarding House - Cage Structure</Typography>
                <Button onClick={backto} sx={{ color: 'white', width: '150px', backgroundColor: 'orange', borderRadius: '10px', ':hover': { backgroundColor: 'orange' }, marginLeft: '1300px' }}><ArrowBackIcon sx={{ marginRight: '20px' }} />Back</Button>
            </div>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${BackgroundImage})`,
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
            }}></div>

            <div style={{ padding: '10px', marginLeft: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ backgroundColor: 'brown', height: '30px', width: '30px', marginRight: '10px' }} />
                    <Typography>Reserved</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ backgroundColor: 'gray', height: '30px', width: '30px', marginRight: '10px' }} />
                    <Typography>Free</Typography>
                </div>
            </div>
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                    <Typography sx={{ marginLeft: '20%', fontWeight: 'bold' }}>Silver Package Cages</Typography>
                    <Typography sx={{ marginLeft: '20%', fontWeight: 'bold' }}>(Non Air Conditional)</Typography>
                    {cages && (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '375px' }}>
                            {cages.filter((menu, index) => menu.package_id === 1).map((cage, index) => (
                                <div
                                    style={{
                                        flexBasis: '20%',
                                        flexGrow: 0,
                                        flexShrink: 0,
                                        marginBottom: '10px',
                                        marginLeft: '10px',
                                    }}
                                    key={index}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: cage.status === 'reserved' ? 'brown' : 'gray',
                                            height: '65px',
                                            width: '65px',
                                            textAlign: 'center'
                                        }}>
                                        <span style={{ color: 'white', }}>{cage.cage_id}</span>
                                    </Box>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <Typography sx={{ marginLeft: '20%', fontWeight: 'bold' }}>Platinum Package Cages </Typography>
                    <Typography sx={{ marginLeft: '20%', fontWeight: 'bold' }}> (Air Conditional)</Typography>
                    {cages && (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '375px' }}>
                            {cages.filter((menu, index) => menu.package_id === 2).map((cage, index) => (
                                <div
                                    style={{
                                        flexBasis: '20%',
                                        flexGrow: 0,
                                        flexShrink: 0,
                                        marginBottom: '10px',
                                        marginLeft: '10px',
                                    }}
                                    key={index}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: cage.status === 'reserved' ? 'brown' : 'gray', // Change colors based on status
                                            height: '65px',
                                            width: '65px',
                                            textAlign: 'center'
                                        }}>
                                        <span style={{ color: 'white', }}>{cage.cage_id}</span>
                                    </Box>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <Typography sx={{ marginLeft: '20%', fontWeight: 'bold' }}>Gold Package Cages </Typography>
                    <Typography sx={{ marginLeft: '20%', fontWeight: 'bold' }}> (Air Conditional)</Typography>
                    {cages && (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '375px' }}>
                            {cages.filter((menu, index) => menu.package_id === 3).map((cage, index) => (
                                <div
                                    style={{
                                        flexBasis: '20%',
                                        flexGrow: 0,
                                        flexShrink: 0,
                                        marginBottom: '10px',
                                        marginLeft: '10px',
                                    }}
                                    key={index}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: cage.status === 'reserved' ? 'brown' : 'gray', // Change colors based on status
                                            height: '65px',
                                            width: '65px',
                                            textAlign: 'center'
                                        }}>
                                        <span style={{ color: 'white', }}>{cage.cage_id}</span>
                                    </Box>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Cages;