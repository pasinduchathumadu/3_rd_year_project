import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Verify = ()=>{
    const navigate = useNavigate()

    const [entered_no,setotp]= useState("")

    const submit = async(e)=>{
        e.preventDefault()

        try{
            const res = await axios.post("http://localhost:5000/pet_care/email/verify",{
                entered_no
            })
            if(res.data.message === 'Registration Failed'|| res.data.message === 'There is an Enternal error'){
                document.getElementById('error').innerHTML = 'Registration Failed'

            }
            else if(res.data.message === 'Registered Succeed'){
                navigate('/login')
            }

        }catch(err){
            document.getElementById('error').innerHTML = 'Registration Failed'
          
        }
    }
    return (
        <div>
            <h2>Verification</h2>
            <form action="" method="post">
                <label>Enter the OTP:</label>
                <input
                 type="number"
                 onChange={(e)=>setotp(e.target.value)}
                 required
                />
                <p id="error"></p>
                <button onClick={submit}>submit</button>

            </form>
        </div>
    )
}
export default Verify;