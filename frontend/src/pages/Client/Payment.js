import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import pay from "../../assests/pay1.jpg"
import { Button,Stack,Typography } from "@mui/material";
import StripeCheckout from "react-stripe-checkout"


const Blogs = () => {
  const navigate = useNavigate();
  const [payment, setpayment] = useState("");
  const [payment_charge, setprice] = useState("");
  const id = localStorage.getItem("store_email");

  const confirm = async () => {
    try {
      await axios.get(`http://localhost:5000/pet_care/user/confirm/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const [product] = useState({
    name: "React from FB",
    price: payment_charge,
    productBy: "facebook",
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/pet_care/payment/card",
        {
          body,
          headers,
        }
      );
      if (res.data.message === "success") {

        console.log("success")
        navigate('/menu')
      }
      else {
       console.log("failed")
      }
    } catch (err) {
      navigate('/menu')
      console.log("failed")

    }

  }
  const back = async()=>{
    try{
      const res = await axios.post('http://localhost:5000/pet_care/user/back',{
        id
      })
      if(res.data.message === "back"){
        navigate('/bill')
      }
      else{
        console.log("There is an internel error")

      }
    } catch (err) {
      console.log(err);
    }
  };
  const load_total = async () => {
    const res = await axios.get(
      `http://localhost:5000/pet_care/user/loadfinal/${id}`
    );
    const data = await res.data;
    const total = data.data.map((menu,index)=>menu.payment);
    setprice(total);
    return data;
  };

  useEffect(() => {
    load_total()
      .then((data) => setpayment(data.data))
      .catch((err) => console.log("There is an internel error"));
  });
  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${pay})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", marginBottom: "20px" }}>
          Are you sure?
        </Typography>
        <StripeCheckout
          stripeKey="pk_test_51NGJbtSDLfwYkCbGu6RR8Pf0Pj8KoKTEdIogc7wKKhMBsoEzaoLuwmukYs8Tc6GF8YqvdXJ7AYzk5ktxfByXN1Wk00elCyMdCm"
          token={makePayment}
          name="Buy React"
          amount={product.price}
          shippingAddress
        >
            <Stack justifyContent={"center"} alignItems={"center" } direction={"row"} spacing={2}>

          <Button
            onClick={confirm}
            variant="contained"
            sx={{
              width: "300px",
              height: "50px",
              backgroundColor: "black",
              marginTop: "10px",
              paddingLeft: "15px",
              marginLeft:'1%',
              fontSize: "16px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Confirm (Rs.{payment_charge})
          </Button>
          <Button
          onClick={back}
          variant="contained"
          sx={{
            width: "300px",
            height: "50px",
            backgroundColor: "red",
         
            fontSize: "16px",
            "&:hover": { backgroundColor: "red" },
            marginTop: "10px",
          }}
        >
          Cancel
        </Button>            </Stack>

        </StripeCheckout>

      </div>
    </div>
  );
};
export default Blogs;
