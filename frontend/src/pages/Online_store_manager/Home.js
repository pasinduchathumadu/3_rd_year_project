/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Grid, Avatar, Typography, Box, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import profile from "../../assests/pic12.jfif";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import NotificationsIcon from '@mui/icons-material/Notifications';

// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';


const Home = () => {
    const input = new Date();
    const date = input.toDateString();
    const [age, setAge] = useState("")
    const [age1 ,setage1 ] = useState("")
    const [waiting , setwaiting] = useState("")
    const [handed , sethanded ] = useState("")
    const [count1, setcount] = useState([])
    const [count2, setcount1] = useState([])
    const [food, setfoods] = useState("")
    const [accessories, setaccessories] = useState("")
    const [toys, settoys] = useState("")
    const [pending, setpending] = useState("")
  
    const [accept, setaccept] = useState("")


    const handleChange = (event) => {
        setAge(event.target.value);
       
        filtercomplain() //pending
        filtercomplainreply() //completed
    };

    const handleChange1 = (event) =>{
        setage1(event.target.value)
        filtercomplain1()
        filtercomplain2()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filtercomplain = async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filter/${age}`)
            
            setcount(res.data.data)
            setAge('')

           

        }catch(err){
            console.log(age)
            console.log(err)
        }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filtercomplainreply = async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filterreply/${age}`)
            setcount1(res.data.data)
            setAge('')

        }catch(err){
            console.log(err)
        }


    }
    const filtercomplain1 = async() =>{
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filtercomplain1/${age1}`)
            const data = await res.data
            setwaiting(data.data[0].total)
            setage1(" ")

    const data = [
        { id: 0, value: 10, label: 'Income' },
        { id: 1, value: 15, label: 'Discounts' },
        { id: 2, value: 20, label: 'Net Profit' },
    ];


        }catch(err){
            console.log(err)
        }
    }
  
    const filtercomplain2 = async() =>{
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filtercomplain2/${age1}`)
            const data = await res.data
            sethanded(data.data[0].total)
            setage1(" ")
        }catch(err){
            console.log(err)
        }
    }



    const get_count2 = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/online_store_manager/get_count2')
            const data = await res.data
            setfoods(data.data[0].total_item)
            setaccessories(data.data[1].total_item)
            settoys(data.data[2].total_item)
        } catch (err) {
            console.log("There is an internel an error")
        }
    }

    const get_count1 = async () => {
        try {

            const res = await axios.get('http://localhost:5000/pet_care/online_store_manager/get_count1')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an internel error")
        }
    }

    const get_count = async () => {
        try {
            const res = await axios.get('http://localhost:5000/pet_care/online_store_manager/get_count')
            const data = await res.data
            return data

        } catch (err) {
            console.log("There is an email")
        }
    }
  
    useEffect(() => {
        get_count()
            .then((data) => setcount(data.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        get_count2()
    }, []);

    useEffect(() => {
        get_count1()
            .then((data) => setcount1(data.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        filtercomplain();
        filtercomplainreply();
    }, [age, filtercomplain, filtercomplainreply]);
    useEffect(() => {
        filtercomplain1();
        filtercomplain2();
    }, [age1, filtercomplain1, filtercomplain2]);





    return (
        <>

            <div>
                <Grid sx={{ marginTop: '4%', marginRight: '1%', marginLeft: '1%', marginBottom: '1%' }}>
                    {/* Header */}
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%',color:'rgb(139, 139, 139)' }}>
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
                        <div style={{ display: 'flex', marginLeft: 'auto',alignItems:'center',justifyContent:'center' }}>
                            <div>
                            <NotificationsIcon sx={{marginTop:'1%'}}/> 
                            </div>
                            <div style={{marginLeft:'1%'}}>
                            <Stack direction="row" spacing={2}>
                             <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} />
                            </Stack>

                            </div>
                           
                        </div>
                    </div>

                    {/* First Row */}
                    <div style={{ display: 'flex', marginTop: '2%' }}>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '40vh', marginLeft: '2%', display: 'inline' }}>
                            <Box sx={{ backgroundColor: 'orange', height: '100%', padding: '16px', borderRadius:'10px' }}>
                                <div style={{ padding: '2%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '17px' }}><AnalyticsIcon />Analytical Overview</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label"></InputLabel>
                                            <Select

                                               
                                               
                                                variant='outlined'
                                               
                                                onChange={handleChange}
                                            >
                                                   <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Today</MenuItem>
                                                <MenuItem value={2}>Last 7 Days</MenuItem>
                                                <MenuItem value={3}>Last Month</MenuItem>

                                            </Select>
                                        </FormControl>

                                    </div>

                                </div>


                                <div style={{ marginTop: '1%', display: 'flex' }}>
                                    <div style={{ backgroundColor: 'white', flex: 1, marginRight: '5%', height: '25vh' }}>



                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <MoreHorizIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Pending Complains</Typography>

                                            </div>
                                            {count1 && count1.map((menu, index) => (
                                                <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '68px' }}>{menu.total}</Typography>
                                            ))}
                                        </Box>

                                    </div>
                                    <div style={{ backgroundColor: 'white', flex: 1, height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <DoneAllIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Responded Complains</Typography>

                                            </div>
                                            {count2 && count2.map((menu, index) => (
                                                <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '68px' }}>{menu.total}</Typography>

                                            ))}
                                        </Box>

                                    </div>
                                </div>

                            </Box>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '40vh', marginLeft: '1%', display: 'inline' }}>
                            <Box sx={{ backgroundColor: 'orange', height: '100%', padding: '16px', paddingTop: '1%', borderRadius:'10px' }}>

                                <div style={{ margin: '2%' }}></div>
                                <div style={{ padding: '2%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '17px' }}><AccountBalanceWalletIcon />The Income of the Store</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>
                                            {/* <Select

                                                id="demo-select-small"
                                                value={age1}
                                                variant='outlined'
                                                placeholder='AGE'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Today</MenuItem>
                                                <MenuItem value={2}>Last 7 Days</MenuItem>
                                                <MenuItem value={3}>Last Month</MenuItem>

                                            </Select> */}
                                        </FormControl>

                                    </div>

                                </div>
                                <PieChart
                                    colors={['#FBBD08', '#A6A6A6', '#55555C']}
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
                                        textAlign: 'center',

                                    }}
                                    height={200}
                                />
                            </Box>
                        </div>
                    </div>

                    {/* Second Row */}

                    <div style={{ display: 'flex', marginTop: '2%' }}>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '70vh', marginLeft: '2%' }}>

                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '1px', borderRadius:'10px'}}>
                                <div style={{ padding: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '24px', color: 'black' }}>Analyze The Product & Client Order</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                    <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label"></InputLabel>
                                            <Select
                                                variant='outlined'
                                                onChange={handleChange1}
                                            >
                                                  <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                
                                                <MenuItem value={1}>Today</MenuItem>
                                                <MenuItem value={2}>Last 7 Days</MenuItem>
                                                <MenuItem value={3}>Last Month</MenuItem>

                                            </Select>
                                        </FormControl>

                                    </div>

                                </div>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ProductionQuantityLimitsIcon sx={{ marginLeft: '8%' }} />
                                    <Typography style={{ display: 'inline', marginLeft: '1%' }}>Products of The Store</Typography>

                                    <ArchiveOutlinedIcon sx={{ display: 'inline', marginLeft: '20%' }} />
                                    <Typography sx={{ marginLeft: '1%', display: 'inline' }}>Client Orders</Typography>

                                </div>

                                <div style={{ marginLeft: '3%', display: 'flex' }}>

                                    <div style={{ display: 'inline' }}>

                                        <BarChart
                                            colors={['orange']}
                                            sx={{ marginBottom: '3%', backgroundColor: '#f0f0f5' }}
                                            xAxis={[
                                                {
                                                    id: 'barCategories',
                                                    data: ['Foods', 'Accessories', 'Toys'],

                                                    scaleType: 'band',
                                                },
                                            ]}
                                            series={[
                                                {
                                                    data: [`${food}`, `${accessories}`, `${toys}`],


                                                },
                                            ]}

                                            width={340}
                                            height={380}
                                        />

                                    </div>

                                    <div style={{ display: 'inline' }}>
                                        <BarChart
                                            colors={['black']}
                                            sx={{ marginBottom: '1%', backgroundColor: '#f0f0f5' }}
                                            xAxis={[
                                                {
                                                    id: 'barCategories',
                                                    data: ['Pending', 'Completed'],

                                                    scaleType: 'band',
                                                },
                                            ]}
                                            series={[
                                                {
                                                    data: [`${waiting}`, `${handed}`],


                                                },
                                            ]}

                                            width={340}
                                            height={380}
                                        />
                                    </div>

                                </div>
                            </Box>
                        </div>

                        <div style={{ flex: 1, backgroundColor: 'white', height: '70vh', marginLeft: '1%' }}>

                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '16px', borderRadius:'10px' }}>

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

                                <Button sx={{ width: '40%', backgroundColor: 'orange', marginTop: '10%', marginLeft: '4%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>ADD NEW ONE</Button>
                                <Button sx={{ width: '40%', backgroundColor: 'orange', marginTop: '10%', marginLeft: '12%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>FIND MORE</Button>

                            </Box>
                        </div>
                    </div>

                </Grid>
                
               



            </div>
        </>
    );
};

export default Home;
