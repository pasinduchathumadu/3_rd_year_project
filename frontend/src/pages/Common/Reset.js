import { Grid,Paper,Button } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import cover from "../../assests/pic3.jpg"
import '../../styles/Common/Forget.css'
import axios from "axios";
const Reset = ()=>{
    const [new_password,setnew]=useState("")
    const [old_password,setold]=useState("")


    const submit = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:5000/pet_care/user/reset",{
                new_password,
                old_password
            })

        }catch(err){

        }
    }
    return(
            <><Header />
            <Grid sx={{ display: "flex", borderRadius: "100px" }}>
                <Grid>
                <Paper 
                elevation={4}
                sx={{
                  padding: "20px",
                  height: "50vh",
                  width: "600px",
                  marginTop: "130px",
                  marginLeft: "20px",
                  marginRight: "auto",
                  marginBottom: "auto",
                  borderRadius: "10px"
                }}
              >
                <Grid align="center">
                  <h2>Rset The Password</h2>
                </Grid>
                
        
                <Grid sx={{ marginTop: "40px", fontSize: "12px", textAlign: "center" }}>
                <div className="input-group" sx={{width:'30%'}}>
                 
                  <input type="password" placeholder="Current Password"  required />
                </div>
                <div className="input-group" sx={{width:'30%'}}>
                  
                  <input type="password" placeholder="New Password" onChange={(e)=>setnew(e.target.value)} required />
                </div>
                <div className="input-group" sx={{width:'30%'}}>
                
                  <input type="password" placeholder="Confirm Password" onChange={(e)=>setold(e.target.value)}  required />
                </div>
               
                </Grid>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                
                  sx={{ textAlign:'center',marginTop: "10px",marginLeft:'27%', backgroundColor: "orange",'&:hover':{backgroundColor:'orange'},width:'40%' }}
                >
                  Reset
                </Button>
        
        
              </Paper>

                </Grid>
              <Grid sx={{ backgroundImage: `url(${cover})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "50%", height: "90vh",marginLeft:'100px' }}>
        
        
              </Grid>
             
            </Grid></>
          );
        };
        
       
        
   


export default Reset