import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import pay from "../../assests/pay1.jpg"
import { Button } from "@mui/material";
import StripeCheckout from "react-stripe-checkout"

const Blogs = () => {
  const navigate = useNavigate();
  const [product] = useState({
    name: "React from FB",
    price: 100,
    productBy: "facebook"
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    try {
      const res = await axios.post("http://localhost:5000/pet_care/payment/card", {
        body,
        headers
      })
      if (res.data.message === "success") {
        navigate('/login')
      }
      else {
        navigate('/login')
      }
    } catch (err) {
      console.log("faild")

    }

  }
  return (
    <div style={{ backgroundImage: `url(${pay})` ,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center',width:'100%',height:'100vh'}}>
      <StripeCheckout stripeKey="pk_test_51NGJbtSDLfwYkCbGu6RR8Pf0Pj8KoKTEdIogc7wKKhMBsoEzaoLuwmukYs8Tc6GF8YqvdXJ7AYzk5ktxfByXN1Wk00elCyMdCm"
        token={makePayment}
        name="Buy React"
        amount={product.price}
        shippingAddress
      >
        <Button variant="contained" sx={{ width:"300px",height:"50px",backgroundColor: 'black', marginTop:'20%',marginLeft:'43%', paddingLeft: '15px', paddingRight: '15px', minWidth: '80px', minHeight: '20px', fontSize: '16px', '&:hover': { backgroundColor: 'black' } }} >Confirm The Payment</Button>

      </StripeCheckout>

      <label id="hh"></label>

    </div>
  )
};
export default Blogs;