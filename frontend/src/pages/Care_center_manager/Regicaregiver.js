import React, { useState } from "react";
import '../../styles/Care_center_manager/Regicaregiver.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from "axios";
import { Alert, Button, Stack } from "@mui/material";

function Regicaregiver(){
   const [first ,setfirst] = useState("")
   const [last , setlast] = useState("")
   const [email , setemail] = useState("")
   const [number , setnumber] = useState("")
   const [address , setaddress] = useState("")
   const [grooming , setgrooming] = useState("")
   const [image , setimage] = useState("")



   const [sucess , setsuccess] = useState(false)
  
   const caregiver_reg = async()=>{
  
    try{
        const res = await axios.post('http://localhost:5000/pet_care/care_center_manager/caregiver_reg',{
            first,
            last,
            email,
            number,
            address,
            grooming,
            image
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
            <label for="inputEmail4" className="form-label1">Contact Number</label>
                <input type="text" className="form-control1"onChange={(e)=>setnumber(e.target.value)}  placeholder="" aria-label="Last name"></input>
            </div>
            </div>

            <div  className="col1">
            <div className="col1-mid-1">
                <label for="inputAddress" className="form-label1">Address</label>
                <input type="text" className="form-control1"  id="inputAddress" placeholder="" onChange={(e)=>setaddress(e.target.value)}></input>
            </div>
            <div className="col1-mid-2">
                <label for="grooming" className="form-label1">Grooming Type</label>
                <select id="grooming" className="form-select"  onChange={(e)=>setgrooming(e.target.value)}>
                <option selected>Bath</option>
                <option>Bath and Haircut</option>
                </select>
                </div>
            </div>

            <div  className="col1">
            <div className="col1-mid-1">
                <label for="inputCity" className="form-label1">Image</label>
                <input type="text" className="form-control1" id="inputCity" onChange={(e)=>setimage(e.target.value)}></input>
            </div>
            <div className="col1-mid-2">
                </div>
                </div>
                {sucess &&(
                     <Stack sx={{ width: '100%' }} spacing={2}>
                     
                     <Alert  severity="success">This is a success alert — check it out!</Alert>
                   </Stack>

                )}
            <div className="submitbtn">
            <Button  onClick={caregiver_reg} className="registerbtn">REGISTER</Button>
            </div>

        </form>

        </div>
        </div>
    )
}
export default Regicaregiver;