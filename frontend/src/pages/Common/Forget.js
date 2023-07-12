import React, { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cover from '../../assests/cover.png'

const Forgot = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const submit = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post("http://localhost:5000/pet_care/user/forget", {
                email
            })

            if (res.data.message === "Not in system") {

            }
            else {


            }




        } catch (err) {
            console.log("There ia an internal error")
        }
    }
    return (
        <Grid sx={{ display: "flex", borderRadius: "100px" }}>
            <Grid sx={{ backgroundImage: `url(${cover})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "50%", height: "100vh" }}>


            </Grid>
            <Paper onSubmit={submit}
                elevation={4}
                sx={{
                    padding: "20px",
                    height: "50vh",
                    width: "300px",
                    marginTop: "150px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "auto"
                    , borderRadius: "10px"
                }}
            >
                <Grid align="center" sx={{marginTop:'10px'}}>
                    <h2 >Enter your Email:</h2>
                </Grid>
                <Grid sx={{marginTop:'50px'}}>
                <div className="input-group" style={{
                    display: "flex",
                    width: "100%",
                    position: "relative",
                    margin: "1rem 0",
                
                }} >
                    <i className="bx bxs-lock-alt"></i>
                    <input type="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} required />
                </div>

                </Grid>

                <Typography sx={{textAlign:'center',marginTop:'10px',fontSize:'12px'}}>
                   Please Enter Your Login Email
                </Typography>
              

                <Grid sx={{ marginTop: "40px", fontSize: "12px", textAlign: "center" }}></Grid>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: "20px", backgroundColor: "orange", '&:hover': { backgroundColor: 'orange' } }}
                >
                    Submit
                </Button>


            </Paper>
        </Grid>
    )

}

export default Forgot