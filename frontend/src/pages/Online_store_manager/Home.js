import React, { useState } from 'react';
import Header from "../../components/Layout/Header";
import { Grid, Avatar, Typography, Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import profile from "../../assests/profile.jpg";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';

const Home = () => {
    const input = new Date();
    const date = input.toDateString();
    const [age, setAge] = useState("")

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const data = [
        { id: 0, value: 10, label: 'Income' },
        { id: 1, value: 15, label: 'Discounts' },
        { id: 2, value: 20, label: 'Net Profit' },
    ];


    return (
        <>
            <Header />
            <div>
                <Grid sx={{ marginTop: '2%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
                    {/* Header */}
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
                        <div style={{ display: 'flex', marginLeft: 'auto' }}>
                            <Stack direction="row" spacing={2}>
                                <Avatar alt="Travis Howard" src={profile} sx={{ width: 100, height: 100 }} />
                            </Stack>
                        </div>
                    </div>

                    {/* First Row */}
                    <div style={{ display: 'flex', marginTop: '2%' }}>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '40vh', marginLeft: '2%', display: 'inline' }}>
                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '16px' }}>
                                <div style={{ padding: '2%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '24px' }}>Analytical Overview</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                            <Select

                                                id="demo-select-small"
                                                value={age}
                                                variant='outlined'
                                                placeholder='AGE'
                                                onChange={handleChange}
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

                                </div>
                                <div style={{ marginTop: '1%', display: 'flex' }}>
                                    <div style={{ backgroundColor: 'white', flex: 1, marginRight: '5%', height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <MoreHorizIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Pending Orders</Typography>

                                            </div>

                                            <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '68px' }}>18</Typography>
                                        </Box>

                                    </div>
                                    <div style={{ backgroundColor: 'white', flex: 1, height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <DoneAllIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Complete Orders</Typography>

                                            </div>

                                            <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '68px' }}>8</Typography>

                                        </Box>

                                    </div>
                                </div>
                            </Box>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '40vh', marginLeft: '1%', display: 'inline' }}>
                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '16px',paddingTop:'1%' }}>
                                <div style={{margin:'2%'}}></div>
                            <div style={{ padding: '2%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '24px' }}>Analytical The Income of the Store</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                            <Select

                                                id="demo-select-small"
                                                value={age}
                                                variant='outlined'
                                                placeholder='AGE'
                                                onChange={handleChange}
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

                                </div>
                                <PieChart
                                colors={['black', 'white', 'orange']}
                                    series={[
                                        {
                                            data,
                                            highlightScope: { faded: 'global', highlighted: 'item' },
                                            faded: { innerRadius: 30, additionalRadius: -30 },
                                        },
                                    ]}
                                    sx={{
                                        [`& .${pieArcClasses.faded}`]: {
                                            fill: 'gray',
                                        },
                                        textAlign:'center',
                                        
                                    }}
                                    height={200}
                                />
                            </Box>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div style={{ display: 'flex', marginTop: '2%' }}>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '40vh', marginLeft: '2%' }}>
                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '1px' }}>
                            <div style={{ padding: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '24px' }}>The Products of the Store</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                            <Select

                                                id="demo-select-small"
                                                value={age}
                                                variant='outlined'
                                                placeholder='AGE'
                                                onChange={handleChange}
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

                                </div>
                                <BarChart
                                    colors={['orange']}
                                    sx={{ marginBottom: '3%', backgroundColor: '#f0f0f5' }}
                                    xAxis={[
                                        {
                                            id: 'barCategories',
                                            data: ['Pet Foods', 'Pet Accessories', 'Pet Toys'],
                                            
                                            scaleType: 'band',
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: [2, 5, 3],
                                            

                                        },
                                    ]}

                                    width={700}
                                    height={400}
                                />
                            </Box>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '66vh', marginLeft: '1%' }}>
                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '16px' }}>
                            
                                <div style={{ marginTop: '10%', display: 'flex' }}>
                                    <div style={{ backgroundColor: 'white', flex: 1, marginRight: '5%', height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <MoreHorizIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Promoted Products</Typography>

                                            </div>

                                            <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '68px' }}>18</Typography>
                                        </Box>

                                    </div>
                                   
                                    <div style={{ backgroundColor: 'white', flex: 1, height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <DoneAllIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Remove Items</Typography>

                                            </div>

                                            <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '68px' }}>8</Typography>

                                        </Box>

                                    </div>
                                </div>

                                <Button sx={{width:'40%',backgroundColor:'black',marginTop:'10%',marginLeft:'4%',color:'white'}}>ADD NEW ONE</Button>
                                <Button sx={{width:'40%',backgroundColor:'black',marginTop:'10%',marginLeft:'12%',color:'white'}}>FIND MORE</Button>
                                
                            </Box>
                        </div>
                    </div>
                </Grid>
            </div>
        </>
    );
};

export default Home;
