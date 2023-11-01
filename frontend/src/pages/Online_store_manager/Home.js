/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Grid, Typography, Box, Button, Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions, Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from '@mui/icons-material/Notifications';

// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { useNavigate } from "react-router";

const Home = () => {
    const input = new Date();
    const date = input.toDateString();
    const [age, setAge] = useState("")
    const [age1, setage1] = useState("")
    const [waiting, setwaiting] = useState("")
    const [handed, sethanded] = useState("")
    const [count1, setcount] = useState([])
    const [count2, setcount1] = useState([])
    const [food, setfoods] = useState("")
    const [accessories, setaccessories] = useState("")
    const [toys, settoys] = useState("")
    const [discountitem , setdiscount] = useState("")
    const [selectedremove , setremoveconfirm] = useState("")
    const [removeid , setremove] = useState([])
    const [error, seterror] = useState(false)
    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        getid();
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
        getid();
    };
    const handleremove = (event) =>{
        setremoveconfirm(event.target.value)
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleChange = (event) => {
        setAge(event.target.value);

        filtercomplain() //pending
        filtercomplainreply() //completed
    };
    const data = [
        { id: 0, value: 10, label: 'Income' },
        { id: 1, value: 15, label: 'Discounts' },
        { id: 2, value: 20, label: 'Net Profit' },
    ];

    const handleChange1 = (event) => {
        setage1(event.target.value)
        filtercomplain1()
        filtercomplain2()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getid = async()=>{
        try{
            const res = await axios.get('http://localhost:5000/pet_care/online_store_manager/removeitem')
            setremove(res.data.data);
            seterror(false)
        }catch(err){
            console.log(err);
        }
    }
    const removefrompermenant = async()=>{
    
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/remove_item_finally/${selectedremove}`)
            if(res.data.message === "Deleted"){
               seterror(true)
            }

        }catch(err){
            console.log(err)
        }

    }
    const filtercomplain = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filter/${age}`)

            setcount(res.data.data)
            setAge('')



        } catch (err) {
            console.log(age)
            console.log(err)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filtercomplainreply = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filterreply/${age}`)
            setcount1(res.data.data)
            setAge('')

        } catch (err) {
            console.log(err)
        }


    }
    const filtercomplain1 = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filtercomplain1/${age1}`)
            const data = await res.data
            setwaiting(data.data[0].total)
            setage1(" ")




        } catch (err) {
            console.log(err)
        }
    }

    const filtercomplain2 = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/filtercomplain2/${age1}`)
            const data = await res.data
            sethanded(data.data[0].total)
            setage1(" ")
        } catch (err) {
            console.log(err)
        }
    }


    const discountrate = async() => {
        try{
            const res = await axios.post('http://localhost:5000/pet_care/online_store_manager/discount',{
                selectedremove,
                discountitem
            })
            if(res.data.message === "updated"){
                seterror(true)
             }

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
                        <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%', color: 'rgb(139, 139, 139)' }}>
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
                        <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <NotificationsIcon sx={{ marginTop: '1%' }} />
                            </div>
                            <div style={{ marginLeft: '1%' }}>
                                <Stack direction="row" spacing={2}>
                                    {/* <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} /> */}
                                    <Button onClick={profile}><img src={getProfilepicturepath("onlinestore_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>

                                </Stack>

                            </div>

                        </div>
                    </div>

                    {/* First Row */}
                    <div style={{ display: 'flex', marginTop: '2%' }}>
                        <div style={{ flex: 1, backgroundColor: 'white', height: '40vh', marginLeft: '2%', display: 'inline' }}>
                            <Box sx={{ backgroundColor: 'orange', height: '100%', padding: '16px', borderRadius: '10px' }}>
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
                            <Box sx={{ backgroundColor: 'orange', height: '100%', padding: '16px', paddingTop: '1%', borderRadius: '10px' }}>

                                <div style={{ margin: '2%' }}></div>
                                <div style={{ padding: '2%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ display: 'inline' }}>
                                        <Typography sx={{ fontSize: '17px' }}><AccountBalanceWalletIcon />The Income of the Store</Typography>

                                    </div>
                                    <div style={{ display: 'inline', alignItems: 'center', marginLeft: 'auto' }}>
                                        <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }} size="small">
                                            <InputLabel disabled={true} displayPrint="none" htmlFor="demo-input" color="warning" variant="outlined" id="demo-select-small-label">Today</InputLabel>

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

                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '1px', borderRadius: '10px' }}>
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

                            <Box sx={{ backgroundColor: '#f0f0f5', height: '100%', padding: '16px', borderRadius: '10px' }}>

                                <div style={{ marginTop: '10%', display: 'flex' }}>
                                    <div style={{ backgroundColor: 'white', flex: 1, marginRight: '5%', height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <MoreHorizIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Promoted Products</Typography>

                                            </div>

                                            <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '25px' }}>Set The Discount</Typography>
                                        </Box>

                                    </div>

                                    <div style={{ backgroundColor: 'white', flex: 1, height: '25vh' }}>
                                        <Box sx={{ padding: '10%', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', paddingLeft: '12%' }}>
                                                <DoneAllIcon sx={{ display: 'inline', alignItems: 'center' }} /><Typography sx={{ display: 'inline', alignItems: 'center', marginLeft: '5%' }}>Remove Items</Typography>
                                            </div>

                                            <Typography sx={{ marginTop: '5%', textAlign: 'center', fontSize: '25px' }}>Online Store</Typography>

                                        </Box>

                                    </div>
                                </div>

                                <Button onClick={handleClickOpen1} sx={{ width: '40%', backgroundColor: 'orange', marginTop: '10%', marginLeft: '4%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>ADD NEW ONE</Button>
                                <Button onClick={handleClickOpen} sx={{ width: '40%', backgroundColor: 'orange', marginTop: '10%', marginLeft: '12%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>FIND MORE</Button>

                            </Box>
                        </div>
                    </div>

                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add Remove Item"}
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form action="">
                            <Box sx={{ minWidth: 120,marginBottom:'2%',marginTop:'2%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedremove}
                                        label="Age"
                                        onChange={handleremove}
                                    >
                                      {removeid.map((menu,index)=>(
                                       <MenuItem value={menu.item_id} key={menu.item_id}>{menu.item_id}-{menu.name}</MenuItem>
                                      ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                label="Reason"

                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />

                            <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                                <TextField
                                    type="date"
                                    variant="outlined"
                                    color="secondary"

                                    fullWidth
                                    required
                                />
                                <TextField
                                    type="time"
                                    variant="outlined"
                                    color="secondary"

                                    fullWidth
                                    required
                                />
                            </Stack>
                        </form>
                    </DialogContent>
                    {error &&(
                             <Stack sx={{ width: '100%' }} spacing={2}>
                             
                             <Alert severity="success">Successfully Deleted</Alert>
                           </Stack>
                        )}
                    <DialogActions>
                     
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button
                            onClick = {removefrompermenant}
                            variant="outlined"
                            color="secondary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add Discount For Products"}
                        <IconButton
                            aria-label="close"
                            onClick={handleClose1}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form action="">
                            <Box sx={{ minWidth: 120,marginBottom:'2%',marginTop:'2%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedremove}
                                        label="Age"
                                        onChange={handleremove}
                                    >
                                      {removeid.map((menu,index)=>(
                                       <MenuItem value={menu.item_id} key={menu.item_id}>{menu.item_id}-{menu.name}</MenuItem>
                                      ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                type="number"
                                variant="outlined"
                                color="secondary"
                                label="Discount Rate"
                                onChange={(e)=>setdiscount(e.target.value)}
                                fullWidth
                                required
                                sx={{ mb: 2 }}
                            />

                          
                        </form>
                    </DialogContent>
                    {error &&(
                             <Stack sx={{ width: '100%' }} spacing={2}>
                             
                             <Alert severity="success">Successfully Deleted</Alert>
                           </Stack>
                        )}
                    <DialogActions>
                     
                        <Button variant="outlined" color="secondary" onClick={handleClose1}>
                            Cancel
                        </Button>

                        <Button
                            onClick = {discountrate}
                            variant="outlined"
                            color="secondary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        </>
    );
};

export default Home;
