import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, CardMedia, Typography, Grid } from "@mui/material";
import Header from "../components/Layout/Header";


const CartTable = () => {
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const getImageSrc = (imageName) => {
    return require(`../images/${imageName}`)
  };
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Banner", image: 'chhola.jpg', price: 10, quantity: 2 },
    { id: 2, name: "Chhola", image: 'dosa.jpg', price: 15, quantity: 1 },
    { id: 3, name: "Dosa", image: 'dosa.jpg', price: 20, quantity: 3 },
  ]);

  const handleIncreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  return (
    <><Header />
      <Table sx={{ width: "100%", marginTop: "50px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold",textAlign:'center'}}>Item</TableCell>
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
              <TableCell sx={{textAlign:'center'}}>{item.name}</TableCell>
              <TableCell> <CardMedia
                sx={{ minHeight: "35px", width: '50%', height: '18vh',marginLeft:'25%',marginRight:'25%'}}
                component={"img"}
                src={getImageSrc(item.image)}
                alt={item.name}
              /></TableCell>
              <TableCell>RS.{item.price}</TableCell>
              <TableCell sx={{textAlign:'center'}}>
                <Button variant="contained" sx={{ backgroundColor: 'black', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '20px', minHeight: '20px', fontSize: '12px', '&:hover': { backgroundColor: 'black' } }} onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                {item.quantity}
                <Button variant="contained" sx={{ backgroundColor: 'black', margin: '10px', paddingLeft: '15px', paddingRight: '15px', minWidth: '20px', minHeight: '20px', fontSize: '12px', '&:hover': { backgroundColor: 'black' } }} onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
              </TableCell>
              <TableCell>RS.{item.price * item.quantity}</TableCell>

              <TableCell><Button variant="contained" sx={{ backgroundColor: 'black' }}>Remove Item</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid>
        <Typography sx={{ float:'right', marginRight: '120px', marginTop: '20px', fontSize: '18px', marginBottom: '20px' }}>Total Price : RS.{calculateTotalAmount()}</Typography>
      </Grid>
      <Grid sx={{ display: 'flex', justifyContent: 'flex-end',marginTop:'80px',marginRight:'80px'}}>
        <Button sx={{ backgroundColor: 'orange', color: 'black', textAlign: 'center', width: '150px','&:hover':{backgroundColor:'orange'} }}>Check out</Button>
        <Button sx={{ backgroundColor: 'red', marginLeft: '10px', color: 'black', '&:hover': { backgroundColor: 'red' } }}>Clear all items</Button>
      </Grid>
 



    </>
  );
};

export default CartTable;


