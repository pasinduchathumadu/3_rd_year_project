import React, { useEffect, useState } from 'react';
import { Grid, Paper, Box, Tab, Tabs  ,Typography, Button,TableBody,TableRow,TableContainer,TableHead,Table  } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StateNode = () => {
    const [payment , setpayment] = useState([])
    const [full , setfull] = useState(null)
    const [oid,setid] = useState(null)
    const [value, setvalue] = useState(0)
    const [state , setstate ] = useState([])
    const [ Client ,setclient ] = useState([])

    const id = localStorage.getItem('store_email')
    const circleStyle = {
        width: 100,
        height: 100,
        borderRadius: '50%', // Make it circular
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const handleChange = (event, newValue) => {
        setvalue(newValue)

    }
    const groupedData = payment.reduce((acc, item) => {
        const poId = item.po_id;
        if (!acc[poId]) {
            acc[poId] = [];
        }
        acc[poId].push(item);
        return acc;
    }, {});

 
  
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    function FormRow() {
        return (
            <React.Fragment>
                <Grid sx={{marginLeft:'1%',marginBottom:'1%'}} item xs={2}>
                    <Item>Name</Item>
                </Grid>
                <Grid sx={{marginLeft:'8%',marginBottom:'1%'}}item xs={2}>
                    <Item>Unit Price</Item>
                </Grid>
                <Grid sx={{marginLeft:'8%',marginBottom:'1%'}} item xs={2}>
                    <Item>Quantity</Item>
                </Grid>
                <Grid sx={{marginLeft:'8%',marginBottom:'1%'}} item xs={2}>
                    <Item>Total (Rs.)</Item>
                </Grid>
            </React.Fragment>
        );
    }

    const submit = async()=>{
        const res = await axios.get(`http://localhost:5000/pet_care/user/generate/${id}`)
        const data = await res.data
        const statusMap = {}; // Map to store po_status for each po_id

        // Loop through data and store po_status for each po_id
        data.data.forEach(item => {
            statusMap[item.po_id] = item.po_status;
        });
        setstate(statusMap);
        return data
    }

    const client_load = async()=>{
        const res = await axios.get(`http://localhost:5000/pet_care/user/client_load/${id}`)
        const data = await res.data
        return data
    }


    useEffect(()=>{
        client_load()
        .then((data)=>setclient(data.data))
        .catch((err)=>console.log(err))
    })



 

    useEffect (()=>{
        submit()
        .then((data)=>{setpayment(data.data);
        setid(data.data[0].po_id);
    setfull(data.data[0].payment)})
        .catch((err)=>console.log(err))
    })
  

    return (
        <div style={{ marginTop: '8%',marginBottom:'2%' }}>
            <Grid>
                <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        aria-label="Tab Component"
                        indicatorColor='transparent'
                        sx={{ borderRadius: '10px' }}

                    >
                        <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Order Status" />
                        <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="View the orders" />
                    </Tabs>

                </Box>
            </Grid>
            {value === 0 && (
                <><div style={{ display: 'inline' }}>
                {Object.keys(groupedData).map((poId) => (
                      <><Grid container spacing={2} sx={{ marginTop: '3%', marginLeft: '38%', alignItems: 'center' }}>
                        <Grid item>
                            <Paper elevation={3} style={circleStyle} sx={{ backgroundColor: state[poId] === 'waitting' ? 'red' : 'white' }}>
                                {/* Content for State 1 */}
                                Waitting
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper elevation={3} style={circleStyle} sx={{ backgroundColor: state[poId] === 'accept' ? 'orange' : 'white' }}>
                                {/* Content for State 2 */}
                                Accept
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper elevation={3} style={circleStyle} sx={{ backgroundColor: state[poId] === 'handed' ? '#00c71e' : 'white' }}>
                                {/* Content for State 3 */}
                                Hand Over
                            </Paper>
                        </Grid>

                    </Grid><Box key={poId} sx={{ width: '50%', marginTop: '5%', marginLeft: '25%', border: '1px', borderRadius: '10px', borderStyle: "double", height: 'auto' }}>
                            <Typography sx={{ marginLeft: '40%', marginTop: '1%', marginBottom: '2%', fontSize: '24px', fontWeight: '600' }}>Order ID #{poId}</Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid container item spacing={3}>
                                        <FormRow />
                                    </Grid>

                                </Grid>
                            </Box>


                            <><div style={{ marginTop: '1%', marginLeft: '1%' }}>


                                {groupedData[poId].map((item, index) => (


                                    <div style={{ display: 'flex', flex: 3 }}>
                                        <div style={{ flex: 3, marginLeft: '1%', marginBottom: '1%' }}>{item.name}</div>
                                        <div style={{ flex: 3, marginBottom: '1%' }}>{item.unit_price}</div>
                                        <div style={{ flex: 3, marginBottom: '1%' }}>{item.quantity}</div>
                                        <div style={{ flex: 2, marginBottom: '1%', alignItems: 'left' }}>{item.total}</div>
                                    </div>


                                ))}


                            </div><div style={{ border: '3px', borderRadius: '2px', borderStyle: 'groove', marginLeft: '55%', marginRight: '5%', marginTop: '3%', marginBottom: '2%' }}>

                                    <Typography sx={{ marginLeft: '4%', display: 'flex' }}>Total<div style={{ marginLeft: '53%', display: "flex" }}>
                                        {full}
                                    </div>
                                    </Typography>

                                </div></>

                        </Box></>
                            ))}
                      
                      


                    </div></>

            )}
            {value === 1 &&(
                 <Grid sx={{ marginTop: '3%', marginLeft: '3%', marginRight: '7%', marginBottom: '5%' }}>
                 <TableContainer component={Paper}>
                     <Table sx={{ minWidth: 700 }} aria-label="customized table">
                         <TableHead>
                             <TableRow>
                                 <StyledTableCell align="left" sx={{ width: '15%' }}>Order ID</StyledTableCell>
                                 <StyledTableCell align="left" sx={{ width: '15%' }}>Placed Date</StyledTableCell>
                                 <StyledTableCell align="left" sx={{ width: '20%' }}>HandOver Date</StyledTableCell>
                                 <StyledTableCell align="left" sx={{ width: '30%' }}>Payment</StyledTableCell>
                                 <StyledTableCell align="left" sx={{ width: '20%' }}>Collecting Method</StyledTableCell>
                             </TableRow>
                         </TableHead>
                         <TableBody>
                             {Client && Client.map((row, index) => (
                                 <StyledTableRow key={index}>
                                     <StyledTableCell component="th" scope="row">
                                         ID  {row.po_id}
                                     </StyledTableCell>
                                     <StyledTableCell align="left">{row.placed_time}</StyledTableCell>
                                     <StyledTableCell align="left">{row.handover_date}</StyledTableCell>
                                     <StyledTableCell align="left">

                                         {row.payment}

                                     </StyledTableCell>
                                     <StyledTableCell align="left">{row.collecting_method}
                                     </StyledTableCell>
                                 </StyledTableRow>
                             ))}
                         </TableBody>
                     </Table>
                 </TableContainer>
             </Grid>
            )}


        </div>

    );
};

export default StateNode;