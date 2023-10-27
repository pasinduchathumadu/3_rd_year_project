import { Box, Grid, Typography, TextField, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';

const Bill = () => {
    const navigate = useNavigate("")
    const currentDate = new Date()
    const date = format(currentDate, 'yyy-MM-dd')
    const time = currentDate.toLocaleTimeString()
    const [delivery, setdelivery] = useState("")
    const [card, setcard] = useState("")
    const [shipping, setshipping] = useState("")
    const [contact, setcontact] = useState("")
    const [error, seterror] = useState(false)

    const [error_message, setmessage] = useState("")
    const email = localStorage.getItem("store_email")

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const back = () => {
        navigate('/menu')
    }

    const changedelivery = (event, newValue) => {
        setdelivery(event.target.value)
    }
    const cardpayment = (event, newValue) => {
        setcard(event.target.value)
    }
    const final_payment = async (payment) => {
        console.log(payment)
        if (!shipping || !card || !contact || !delivery) {
            seterror(true)
            setmessage("Please Fill Out All The Fields")
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/pet_care/user/final_payment", {
                date,
                time,
                shipping,
                contact,
                delivery,
                card,
                email,
                payment

            })
            if (res.data.messsage === "There is an internel error") {
                seterror(true)
            }
            else {
                navigate('/payment')
            }

        } catch (err) {
            console.log(err);
        }
    }

    function FormRow() {
        return (
            <React.Fragment>
                <Grid sx={{ marginLeft: '1%', marginBottom: '1%' }} item xs={2}>
                    <Item>Name</Item>
                </Grid>
                <Grid sx={{ marginLeft: '8%', marginBottom: '1%' }} item xs={2}>
                    <Item>Unit Price</Item>
                </Grid>
                <Grid sx={{ marginLeft: '8%', marginBottom: '1%' }} item xs={2}>
                    <Item>Quantity</Item>
                </Grid>
                <Grid sx={{ marginLeft: '8%', marginBottom: '1%' }} item xs={2}>
                    <Item>Total (Rs.)</Item>
                </Grid>
            </React.Fragment>
        );
    }
    const [redeempoints, setreedeem] = useState(false)
    const [payment, setpayment] = useState([])
    const [total1, settotal] = useState("")
    const [clientcategory, setclient] = useState([])
 
    const id = localStorage.getItem("store_email")
    const load_payement = async () => {
        const res = await axios.get(`http://localhost:5000/pet_care/user/load_payment/${id}`)
        const data = await res.data
        return data
    }
    const redeem = () => {
        setreedeem(true)
    }
    const load_total = async () => {
        const res = await axios.get(`http://localhost:5000/pet_care/user/load_total/${id}`)
        const data = await res.data
        return data
    }
    const getclientcategory = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/getclientcategory/${id}`)
            setclient(res.data.data)
           


        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getclientcategory()
        load_total()
            .then((data) => settotal(data.data))
            .catch((err) => console.log(err))
    })
    useEffect(() => {
        load_payement()
            .then((data) => setpayment(data.data))
            .catch((err) => console.log(err))
    })





    return (
        <div style={{ marginTop: '7%', marginBottom: '2%' }}>
            <Grid sx={{ marginLeft: '45%', fontSize: '24px', fontWeight: '600' }}>
                Happy Tails
            </Grid>
            <Grid sx={{ marginLeft: '40%', fontSize: '18px', fontWeight: '300', alignItems: 'center', display: 'flex', marginTop: '1%' }}>
                <EmailIcon sx={{ marginRight: '1%' }} />Happytails.pethub123@gmail.com
            </Grid>
            <Grid sx={{ marginLeft: '40%', fontSize: '18px', fontWeight: '300', alignItems: 'center', display: 'flex', marginTop: '1%' }}>
                <LocalPhoneIcon sx={{ marginRight: '1%' }} />+94 704122822
            </Grid>

            {error && (
                <Stack sx={{ width: '50%', marginLeft: '25%', marginTop: '2%' }} spacing={2}>
                    <Alert severity="warning">{error_message}</Alert>
                </Stack>

            )}

            <div style={{ display: 'flex' }}>
                <Box sx={{ width: '50%', marginTop: '5%', marginLeft: '3%', border: '1px', borderRadius: '10px', borderStyle: "double", height: 'auto' }}>
                    <Typography sx={{ marginLeft: '40%', marginTop: '1%', marginBottom: '2%', fontSize: '24px', fontWeight: '600' }}>Shipping Details</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid container item spacing={3}>
                                <FormRow />
                            </Grid>

                        </Grid>
                    </Box>
                    <div style={{ marginTop: '1%', marginLeft: '1%' }}>
                        {payment && payment.map((menu, index) => (

                            <div style={{ display: 'flex', flex: 3 }}>
                                <div style={{ flex: 3, marginLeft: '1%', marginBottom: '1%' }}>{menu.name}</div>
                                <div style={{ flex: 3, marginBottom: '1%' }}>{menu.unit_price}</div>
                                <div style={{ flex: 3, marginBottom: '1%' }}>{menu.quantity}</div>
                                <div style={{ flex: 2, marginBottom: '1%', alignItems: 'left' }}>{menu.total}</div>
                            </div>
                        ))}



                    </div>


                    <div style={{ border: '3px', borderRadius: '2px', borderStyle: 'groove', marginLeft: '55%', marginRight: '5%', marginTop: '3%' }}>

                        <Typography sx={{ marginLeft: '4%', display: 'flex' }}>Total<div style={{ marginLeft: '53%', display: "flex" }}>
                            {total1 && total1.map((row, index) => (
                                row.new2))}
                        </div>
                        </Typography>
                    </div>
                    <div style={{ display: 'inline', float: 'right', marginRight: '5%', marginTop: '2%' }}>
                       
                        {clientcategory.filter((menu, index) => menu.status === "premium").map((menu, index) => (
                            
                            <><Typography sx={{ fontFamily: 'inherit', fontSize: '20px' }}>You can get your Premium Offer:Rs.{total1 && total1.map((row, index) => (
                                (menu.offer*row.new2)/100))}</Typography><Button onClick={redeem} sx={{ backgroundColor: 'black', color: 'white', width: '25%', marginBottom: '2%', marginTop: '2%' ,'&:hover': { backgroundColor: 'black' } }}>Redeem</Button><div style={{ border: '3px', borderRadius: '2px', borderStyle: 'groove', marginLeft: '5%', marginRight: '5%', marginTop: '3%' }}>
                                {redeempoints && (
                                    <Typography sx={{ marginLeft: '4%', display: 'flex' }}>Sub Total<div style={{ marginLeft: '50%', display: "flex" }}>
                                        {total1 && total1.map((row, index) => (
                                            row.new2-(menu.offer*row.new2)/100))}
                                    </div>
                                    </Typography>

                                )}

                            </div></>

                        ))}

                    </div>


                </Box>

                <Box sx={{ marginTop: '5%', marginLeft: '3%', border: '1px', borderRadius: '10px', borderStyle: "double", height: 'auto', width: '40%', backgroundColor: '#f0f0f5' }}>
                    <div style={{ margin: '1%' }}>
                        <TextField id="outlined-basic" onChange={(e) => setshipping(e.target.value)} placeholder="Shipping Address" variant="outlined" sx={{ width: '100%', backgroundColor: 'white' }} required />
                    </div>
                    <div style={{ margin: '1%' }}>
                        <TextField id="outlined-basic" onChange={(e) => setcontact(e.target.value)} placeholder="Contact Number" variant="outlined" sx={{ width: '100%', backgroundColor: 'white' }} required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <CalendarMonthIcon sx={{ marginLeft: '1%', marginRight: '1%' }} />{date}
                        <HistoryToggleOffIcon sx={{ marginLeft: '10%', marginRight: '1%' }} />{time}
                    </div>
                    <div style={{ margin: '1%', marginTop: '2%' }}>
                        <FormControl>
                            <FormLabel sx={{ color: 'black', fontSize: '20px' }} id="demo-row-radio-buttons-group-label">Deliver on</FormLabel>
                            <RadioGroup
                                value={delivery}
                                onChange={changedelivery}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                required
                            >
                                <FormControlLabel value={10} control={<Radio />} label="Currier" />
                                <FormControlLabel value={20} control={<Radio />} label="Physically" />


                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div style={{ margin: '1%', marginTop: '2%' }}>
                        <FormControl>
                            <FormLabel sx={{ color: 'black', fontSize: '20px' }} id="demo-row-radio-buttons-group-label">Payment Method</FormLabel>
                            <RadioGroup
                                value={card}
                                onChange={cardpayment}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                required
                            >
                                <FormControlLabel value={30} control={<Radio />} label="Credit" />
                                <FormControlLabel value={40} control={<Radio />} label="Debit" />


                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div>
                        <Button onClick={back} sx={{ width: '30%', backgroundColor: 'red', color: 'black', margin: '2%', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                        {redeempoints &&   clientcategory.filter((menu, index) => menu.status === "premium").map((row, index) =>  (
                            <Button onClick={() => final_payment(total1 && total1.map((menu, index) => menu.new2-(row.offer*menu.new2)/100))} sx={{ width: '50%', backgroundColor: 'orange', color: 'black', ':hover': { backgroundColor: 'orange' } }}>Buy Now (RS.{total1 && total1.map((menu, index) => menu.new2-(row.offer*menu.new2)/100)})</Button>

                        ))}
                        {!redeempoints && (
                             <Button onClick={() => final_payment(total1 && total1.map((menu, index) => menu.new2))} sx={{ width: '50%', backgroundColor: 'orange', color: 'black', ':hover': { backgroundColor: 'orange' } }}>Buy Now (RS.{total1 && total1.map((menu, index) => menu.new2)})</Button>

                        )}
                       

                    </div>


                </Box>


            </div>



        </div>
    )
}

export default Bill