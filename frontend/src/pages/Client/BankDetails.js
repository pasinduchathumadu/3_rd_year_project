import React, { useState, useEffect } from "react";
import { Typography, FormControl, TextField, Button, Alert, Stack, FormLabel} from "@mui/material";
import AddBackgroundImage from '../../assests/pet_add.jpeg';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const BankDetails = () => {
    const email = localStorage.getItem("client_email")
    const navigate = useNavigate();

    const [num, setnum] = useState("")
    const [branch, setbranch] = useState("")
    const [bank, setbank] = useState("")
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    const [message, setmessage] = useState("")

    // submit bank details
    const SubmitBankDetails = async () => {
        if (num === "" || branch === "" || bank === "") {
            seterror(true)
            setmessage('Please fill all the fields')
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/user/SubmitBankDetails`, {
                email,
                num,
                branch,
                bank
            })
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage('There is an internal error')
            } else if (res.data.message === 'Already added bank details') {
                seterror(true)
                setmessage('Already added bank details')
            }
            else if (res.data.message === 'added') {
                setmessage('Successfully Added')
                setsuccess(true)
            }

        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // get bank details to view
    const [details, setdetails] = useState("")
    const getBankDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/getBankDetails/${email}`)
            const data = await res.data
            return data
        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        getBankDetails()
            .then((data) => setdetails(data.data))
            .catch((err) => console.log(err))

    })

    // delete bank details
    const [error1, seterror1] = useState(false)
    const [success1, setsuccess1] = useState(false)
    const [message1, setmessage1] = useState("")
    const deleteBankDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/deleteBankDetails/${email}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1('There is an internal error')
            } else {
                setsuccess1(true)
                setmessage1('Successfully Deleted')
            }
        } catch (err) {
            console.log('There is an internal errror')
        }
    }



    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${AddBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: "100vh",
            width: "100%",
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            borderRadius: "10px",
            padding: '5%',
            marginTop: '2%',
        }}>
            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%', marginRight: '1%' }}>
                <div style={{ marginBottom: '3%' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}><AccountBalanceIcon sx={{ color: 'orange', marginRight: '5%' }} />Add Your Bank Details Here</Typography>
                    <hr />
                </div>

                <div style={{ marginBottom: '3%' }}>
                    <TextField
                        id="outlined-textarea"
                        label="Account Number"
                        placeholder="account number"
                        multiline
                        onChange={(e) => setnum(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '3%' }}>
                    <TextField
                        id="outlined-textarea"
                        label="Bank"
                        placeholder="bank"
                        multiline
                        onChange={(e) => setbank(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '3%' }}>
                    <TextField
                        id="outlined-textarea"
                        label="Branch"
                        placeholder="branch"
                        multiline
                        onChange={(e) => setbranch(e.target.value)}
                        sx={{ width: '100%' }}
                    />
                </div>

                {error && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{message}</Alert>
                    </Stack>
                )}

                {success && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">{message}</Alert>
                    </Stack>
                )}

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                    <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={() => SubmitBankDetails()} >Submit</Button>
                </div>
            </FormControl>

            {/* viewing bank details */}
            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%', marginLeft: '1%' }}>
                <div style={{ marginBottom: '3%' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}><AccountBalanceIcon sx={{ color: 'orange', marginRight: '5%' }} /> Your Bank Details</Typography>
                    <hr />
                </div>

                {details && details.map((menu, index) => (
                    <>
                        <div className="form-label" style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormLabel > Account Number :  </FormLabel>
                            <Typography sx={{ marginLeft: '1%' }}>{menu.acc_no}</Typography>
                        </div>

                        <div className="form-label" style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormLabel > Bank :  </FormLabel>
                            <Typography sx={{ marginLeft: '1%' }}>{menu.bank}</Typography>
                        </div>

                        <div className="form-label" style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormLabel> Branch  :  </FormLabel>
                            <Typography sx={{ marginLeft: '1%' }}>{menu.branch}</Typography>
                        </div>

                        {error1 && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{message1}</Alert>
                            </Stack>
                        )}

                       
                        <div style={{ marginBottom: '3%', marginTop: '2%' }}>
                            <Button sx={{ color: 'white', backgroundColor: 'red', ':hover': { backgroundColor: 'red' } }} onClick={() => deleteBankDetails(menu.email)}><DeleteIcon sx={{ color: 'white' }} />DELETE</Button>
                        </div>
                    </>
                ))}
            </FormControl>
        </div>
    )

}

export default BankDetails


