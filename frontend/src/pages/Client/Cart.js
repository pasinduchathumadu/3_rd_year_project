import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, CardMedia, Typography, Grid } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartTable = () => {

  const [cartItems,setCartItems] = useState([]) 
  const [total , settotal] = useState("")
  const navigate = useNavigate()
  const email = localStorage.getItem("store_email")
  const calculateTotalAmount = async() => {
    const res = await axios.post("http://localhost:5000/pet_care/user/total",{
      email
    })
    if(res.data.message !== "There is an internel error"){
      settotal(res.data.data[0].total)
    }
   
  };
  const back = () =>{
    navigate('/menu')
  }
  const check = ()=>{
    navigate('/bill')
  }
  const getImageSrc = (imageName) => {
    return require(`../../assests/${imageName}`)
  };


  const removeitem = async(id) =>{
    try{
      const res = await axios.post('http://localhost:5000/pet_care/user/delete_cart',{
        id,
        email
        
      })
      if(res.data.message!== "There is an internel error"){
        calculateTotalAmount()
        load_cart()
      }


    }catch(err){
      console.log(err)
    }

  }
  
  const handleIncreaseQuantity = async(itemId,quantity,price) => {
    try{
   
      const res = await axios.post("http://localhost:5000/pet_care/user/increase",{
        email,
        itemId,
        quantity,
        price
      })
      if(res.data.message === 'updated'){
        calculateTotalAmount()
        load_cart()
      }
    }catch(err){
      console.log("There is an internel error")
    }

   
  };
  
  useEffect(()=>{
    calculateTotalAmount()
    
  })
  const handleDecreaseQuantity = async(itemId,quantity,price) => {
    try{
      const res = await axios.post("http://localhost:5000/pet_care/user/decrease",{
        email,
        itemId,
        quantity,
        price
      })
      if(res.data.message === 'updated'){
        calculateTotalAmount()
        load_cart()
      }
    }catch(err){
      console.log("There is an internel error")
    }

   
  
  };

 const track = () => {
  navigate('/track_order')
 }
 const load_cart = async()=>{
  try{
    const res = await axios.get(`http://localhost:5000/pet_care/user/load_cart/${email}`)
    const data = await res.data
    return data

  }catch(err){
    console.log("There is an internel error")
  }
 }

  useEffect(()=>{
    load_cart()
    .then((data)=>setCartItems(data.data))
  })

  return (
    <div style={{marginTop:'4%'}}>
    <div style={{
      marginLeft:'45%',
      fontWeight: 'bold',
      fontSize:'30px',
      display:'inline'
    }}><ShoppingCartIcon sx={{marginTop:'50px', marginLeft:'50px'}} /> Cart</div>
    <div style={{display:'inline',marginLeft:'25%',alignItems:'center'}}>
      <BorderColorIcon sx={{alignItems:'center',marginLeft:'5%'}}/>
      <Button onClick={track} sx={{backgroundColor:'black',color:'white',marginLeft:'2%',alignItems:'center',':hover':{backgroundColor:'black'}}}>Track Your Order</Button>
    </div>

    <div style={{
      padding:'10px',
      marginLeft: '10px',
      marginRight:'10px',
    }}>
      <Table sx={{ width: "100%", marginTop: "50px",color:"white"}}>
        <TableHead sx={{backgroundColor:"#fe9e0d"}}>
        <TableRow>
            <TableCell sx={{ fontWeight: "bold",textAlign:'center'}}>Item ID</TableCell>
            <TableCell sx={{ fontWeight: "bold",textAlign:'center'}}>Item </TableCell>
            <TableCell sx={{ fontWeight: "bold",textAlign:'center' }}>Product</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "bold",textAlign:'center'}}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
            <TableCell sx={{ fontWeight: "bold", width: '20%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{textAlign:'center'}}>{item.item_id}</TableCell>
              <TableCell sx={{textAlign:'center'}}>{item.name}</TableCell>
              <TableCell> <CardMedia
                sx={{ minHeight: "35px", width: '50%', height: '18vh',marginLeft:'25%',marginRight:'25%'}}
                component={"img"}
                src={getImageSrc(item.image)}
                alt={item.name}
              /></TableCell>
              <TableCell>RS.{item.unit_price - (item.discount * item.unit_price) / 100}</TableCell>
              <TableCell sx={{textAlign:'center'}}>
                <Button variant="contained" sx={{ backgroundColor: 'black', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '20px', minHeight: '20px', fontSize: '12px', '&:hover': { backgroundColor: 'black' } }} onClick={() => handleDecreaseQuantity(item.item_id,item.quantity,item.unit_price - (item.discount * item.unit_price) / 100)}>-</Button>
                {item.quantity}
                <Button variant="contained" sx={{ backgroundColor: 'black', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '20px', minHeight: '20px', fontSize: '12px', '&:hover': { backgroundColor: 'black' } }} onClick={() => handleIncreaseQuantity(item.item_id,item.quantity,item.unit_price - (item.discount * item.unit_price) / 100)}>+</Button>
              </TableCell>
              <TableCell>RS.{(item.quantity,item.unit_price - (item.discount * item.unit_price) / 100) * item.quantity}</TableCell>

              <TableCell><Button onClick={()=>removeitem(item.item_id)} variant="contained" sx={{ backgroundColor: 'black',':hover':{backgroundColor:'black'}, marginLeft: '50px' }}>Remove Item</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid>
        <Typography sx={{ float:'right', marginRight: '120px', marginTop: '20px', fontSize: '18px', marginBottom: '20px' }}>Total Price : RS.{total}</Typography>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'flex-end',marginTop:'80px',marginRight:'90px'}}>
        <Button onClick={check}  sx={{ backgroundColor: 'black', color: 'white', textAlign: 'center', marginLeft:'10px', width: '150px','&:hover':{backgroundColor:'black'} }}>Check out</Button>
        <Button onClick={back} sx={{ backgroundColor: 'red', marginLeft: '10px', color: 'white', '&:hover': { backgroundColor: 'red' } }}>Back to the store</Button>
      </Grid>
    </div>
 



    </div>
  );
};

export default CartTable;


