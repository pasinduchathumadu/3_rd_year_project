import React, { useState } from "react";
import '../../styles/Care_center_manager/Regicaregiver.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from "axios";
import { Alert, Button, Stack } from "@mui/material";

function Regicaregiver(){
   const [first ,setfirst] = useState("")
   const [last , setlast] = useState("")
   const [email , setemail] = useState("")

   const [sucess , setsuccess] = useState(false)
  
   const submit = async()=>{
  
    try{
        const res = await axios.post('http://localhost:5000/pet_care/care_center_manager/submit',{
            first,
            last,
            email
    })
        if(res.data.message === "insert"){
            setsuccess(true)
        }
    }catch(err){
        console.log("There is an internel error")
    }
   }
   const handleclose = ()=>{
    window.location.reload()

   }

    return(

        <div className="register-container">
        <div className="register-form">
           
            <DisabledByDefaultIcon onClick={handleclose}  className='icon-crossy' />
        
       
        <form className="regform">
            <div  className="col1">
            <div className="col1-mid-1">
                <label for="inputEmail4" className="form-label1">First name</label>
                <input type="text" className="form-control1" onChange={(e)=>setfirst(e.target.value)} placeholder="" aria-label="First name"></input>
            </div>
            <div className="col1-mid-2">
            <label for="inputEmail4" className="form-label1">Last name</label>
                <input type="text" className="form-control1"onChange={(e)=>setlast(e.target.value)}  placeholder="" aria-label="Last name"></input>
            </div>
            </div>

            <div  className="col1">
            <div className="col1-mid-1">
                <label for="inputEmail4" className="form-label1">Email</label>
                <input type="email" className="form-control1" onChange={(e)=>setemail(e.target.value)}  id="inputEmail4"></input>
            </div>
            <div className="col1-mid-2">
                <label for="inputPassword4" className="form-label1">Password</label>
                <input type="password" className="form-control1"   id="inputPassword4"></input>
            </div>
            </div>

            <div  className="col1">
            <div className="col1-mid-1">
                <label for="inputAddress" className="form-label1">Address</label>
                <input type="text" className="form-control1"  id="inputAddress" placeholder=""></input>
            </div>
            <div className="col1-mid-2">
                <label for="inputAddress2" className="form-label1">Address 2</label>
                <input type="text" className="form-control1" id="inputAddress2" placeholder=""></input>
            </div>
            </div>

            <div  className="col1">
            <div className="col1-mid-1">
                <label for="inputCity" className="form-label1">City</label>
                <input type="text" className="form-control1" id="inputCity"></input>
            </div>
            <div className="col1-mid-2">
                <label for="inputState" className="form-label1">Province</label>
                <select id="inputState" className="form-select">
                <option selected>Western Province</option>
                <option>...</option>
                </select>
                </div>
                </div>
                {sucess &&(
                     <Stack sx={{ width: '100%' }} spacing={2}>
                     
                     <Alert  severity="success">This is a success alert — check it out!</Alert>
                   </Stack>

                )}
            <div className="submitbtn">
            <Button  onClick={submit} className="registerbtn">REGISTER</Button>
            </div>

        </form>

        </div>
        </div>
    )
}
export default Regicaregiver;