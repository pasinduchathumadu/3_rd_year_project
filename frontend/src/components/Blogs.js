import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
    <div>
      <StripeCheckout stripeKey="pk_test_51NGJbtSDLfwYkCbGu6RR8Pf0Pj8KoKTEdIogc7wKKhMBsoEzaoLuwmukYs8Tc6GF8YqvdXJ7AYzk5ktxfByXN1Wk00elCyMdCm"
        token={makePayment}
        name="Buy React"
        amount={product.price}
        shippingAddress
      >
        <button className="btn-large blue">PAY NOW {product.price} $</button>

      </StripeCheckout>

      <label id="hh"></label>

    </div>
  )
};
export default Blogs;