import { Typography, Button, Link } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import BackgroundImage from '../../assests/boarding_cover.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cages = () => {
    return (
        <div style={{ marginTop: '4%' }}>
            <div style={{ position: 'absolute' }}>
                <Typography sx={{ color: 'white', fontSize: '40px', marginLeft: '500px', marginTop: '50px', fontWeight: 'bold' }}>Boarding House - Cage Structure</Typography>
                <Link to="/boarding_dashboard"><Button sx={{ color: 'white', width: '150px', backgroundColor: 'orange', borderRadius: '10px', ':hover': { backgroundColor: 'orange' }, marginLeft: '1300px' }}><ArrowBackIcon sx={{ marginRight: '20px' }} />Back</Button></Link>
            </div>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "200px",
                width: "1700px",
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
                <div style={{ marginLeft: '40px' }}>
                    <Typography sx={{ marginLeft: '180px', fontWeight: 'bold' }}>Air Conditional</Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Typography>A</Typography>
                        <Box sx={{ backgroundColor: 'brown', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Typography>B</Typography>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'brown', height: '80px', width: '80px', marginLeft: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Typography>C</Typography>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Typography>D</Typography>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Typography>E</Typography>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                    </div>
                </div>
                <div style={{ marginRight: '20px' }}>
                    <Typography sx={{ marginLeft: '220px', fontWeight: 'bold' }}>Non - Air Conditional</Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'brown', height: '80px', width: '80px', marginLeft: '10px', marginRight: '10px' }} />
                        <Typography>A</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px', marginRight: '10px' }} />
                        <Typography>B</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px', marginRight: '10px' }} />
                        <Typography>C</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'brown', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'brown', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px', marginRight: '10px' }} />
                        <Typography>D</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px' }} />
                        <Box sx={{ backgroundColor: 'gray', height: '80px', width: '80px', marginLeft: '10px', marginRight: '10px' }} />
                        <Typography>E</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cages;