import React, { useState } from "react";
import { Button, Grid, Typography, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import cover from "../../assests/pic2.jpg"
import Header from "../../components/Layout/Header";
import '../../styles/Common/Forget.css'
import { MuiOtpInput } from "mui-one-time-password-input";

const Forgot = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState("");
    const [error1, seterror1] = useState(false)
    const [error, seterror] = useState(false)
    const [start,setstart] = useState(false)
    const [normal, setnormal] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [email, setemail] = useState("");
    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    const handle_verify = async (e) => {
        e.preventDefault()
        if (otp === '') {
            seterror(false)
        }
        else {
            try {
                const res = await axios.post("http://localhost:5000/pet_care/user/verify", {
                    otp
                })
                if (res.data.message === "Valid Number") {

                    navigate('/login')
                }
                else {
                    setnormal(true)
                    seterror(true)
                }

            } catch (err) {
                console.log("there is an internel error")

            }

        }


    }
    const back = () => {
        setAnchorEl(null)
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/pet_care/user/forget", {
                email
            });

            if (res.data.message === "Not in system") {
                setstart(true)
                seterror1(true)


            }
            else {
                setAnchorEl(true)

            }
        } catch (err) {
            console.log("There is an internal error");
        }
    };

    return (
        <div className="body">
        <>
            <Header />
            <Grid sx={{ display: "flex", borderRadius: "100px" }}>
                <Grid
                    sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "50%",
                        height: "90vh",
                        marginTop: '20px',
                        marginLeft: '25px'
                    }}
                ></Grid>


                <Paper
                    component="form"
                    onSubmit={submit}
                    elevation={4}
                    sx={{
                        padding: "20px",
                        height: "50vh",
                        width: "300px",
                        marginTop: "150px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "auto",
                        borderRadius: "10px"
                    }}
                >
                    <Grid align="center" sx={{ marginTop: '10px' }}>
                        <h2>Enter your Email:</h2>
                    </Grid>
                    <Grid sx={{ marginTop: '50px' }}>
                        <div className="text-group" style={{
                            display: "flex",
                            width: "100%",
                            position: "relative",
                            fontSize: "0.7rem",
                            margin: "1rem 0",
                        }}>
                            <i className="bx bxs-lock-alt"></i>
                            <input type="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} required />
                        </div>
                    </Grid>

                    <Typography sx={{ textAlign: 'center', marginTop: '10px', fontSize: '12px' }} required>
                        Please Enter Your Login Email
                    </Typography>
                    {error1 && (
                        <Alert severity="error" sx={{ marginTop: '7px', marginLeft: '15px', marginRight: '15px' }}>
                            <AlertTitle></AlertTitle>
                            <strong>This Email is in Invalid</strong>
                        </Alert>


                    )}

                    <Grid sx={{ marginTop: "40px", fontSize: "12px", textAlign: "center" }}></Grid>
                    {start && (
                        <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: "0px", backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' } }}

                    >
                        Submit
                    </Button>

                    )}
                    {!start && (
                        <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: "20px", backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' } }}

                    >
                        Submit
                    </Button>

                    )}
                    
                    
                </Paper>
                <div id="error">
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        placement="auto"
                        transition

                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        width: '400px',
                                        height: '350px',
                                        backgroundColor: "grey",
                                        marginTop: '225px',
                                        marginLeft: '240%',
                                        marginBottom: '180px' // Adjust the margin top value as per your requirement
                                    }}
                                >
                                    {<><Grid sx={{ marginTop: '10px' }}>
                                        <Grid align="center" sx={{ color: 'white', marginTop: '10px' }}>
                                            <h2 className="header1" >Enter the OTP</h2>
                                        </Grid>
                                        <MuiOtpInput value={otp} onChange={handleChange} sx={{ color: 'white', marginTop: '50px' }} required />

                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            onClick={handle_verify}
                                            sx={{ marginTop: "40px", backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' }, width: '250px', marginLeft: '18%' }}
                                        >
                                            Verify
                                        </Button>
                                    </Grid></>}
                                    {error && (
                                        <Alert severity="error" sx={{ marginTop: '20px', marginLeft: '15px', marginRight: '15px' }}>
                                            <AlertTitle></AlertTitle>
                                            <strong>Invalid Number Check it again</strong>
                                        </Alert>


                                    )}
                                    {normal && (
                                        <Button onClick={back} sx={{ backgroundColor: 'black', color: 'white', marginTop: '10px', marginLeft: '10px', '&:hover': { backgroundColor: 'black' } }}>Back</Button>

                                    )}
                                    {!normal && (
                                        <Button onClick={back} sx={{ backgroundColor: 'black', color: 'white', marginTop: '70px', marginLeft: '10px', '&:hover': { backgroundColor: 'black' } }}>Back</Button>
                                    )}
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>

            </Grid>
        </>
        </div>
    );
};

export default Forgot;
