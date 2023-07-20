import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import { Grid, Typography, Avatar, Tab, Tabs, Box, Paper, InputLabel, TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import profile from "../../assests/profile.jpg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Add = () => {
  const input = new Date();
  const date = input.toDateString();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <Grid sx={{ marginTop: '2%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
            <Typography>
              Online Store Manager
            </Typography>
            <Typography>
              Today
            </Typography>

            <Typography>
              {date}
            </Typography>

          </div>
          <div style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}>
            <Typography sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
              Happy Tails Store <ShoppingCartIcon sx={{ fontSize: '48px' }} />

            </Typography>
          </div>

          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <Stack direction="row" spacing={2}>

              <Avatar alt="Travis Howard" src={profile} sx={{ width: 140, height: 140 }} />

            </Stack>

          </div>
        </div>

        <Grid>
          <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="Tab Component"
              indicatorColor='transparent'
              sx={{ borderRadius: '10px' }}

            >
              <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Add Products" />
              <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="Edit Online Store" />
            </Tabs>

          </Box>
        </Grid>
      </Grid>

      <div style={{ marginTop: '5%', marginLeft: '8%', marginRight: '12%',marginBottom:'5%', backgroundColor: '#FEEED7', height: '700px' }}>
        <div style={{paddingLeft:'28%',paddingTop:'6%'}}>
        <div  style={{
           
            height: "70vh",
            width: "500px",
            paddingLeft:'4%',
            borderRadius: "10px",
            backgroundColor:'#D4D4D4'
          }}>
          <Grid container direction="column">
           <Grid item sx={{paddingTop:'29px'}}>
            <Typography>Product ID:</Typography>
            <TextField variant="outlined" placeholder="product id" size="small" sx={{width:'80%'}}></TextField>
           </Grid>

           <Grid item sx={{paddingTop:'20px'}}>
                <Typography>Product Name:</Typography>
                <TextField variant="outlined" placeholder="product name" size="small" sx={{width:'80%'}}></TextField>
           </Grid>

           <Grid item sx={{paddingTop:'20px'}}>
                <Typography>Description:</Typography>
                <TextField variant="outlined" placeholder="description" size="small" sx={{width:'80%'}}></TextField>
           </Grid>

           <Grid item sx={{paddingTop:'20px'}}>
                <Typography>Price:</Typography>
                <TextField variant="outlined" placeholder="price" size="small" sx={{width:'80%'}}></TextField>
           </Grid>

           <Grid item sx={{paddingTop:'20px'}}>
                <Typography>Quantity:</Typography>
                <TextField variant="outlined" placeholder="quantity" size="small" sx={{width:'80%'}}></TextField>
           </Grid>
        

          </Grid>
          <Grid item sx={{paddingTop:'20px'}}>
          <Typography>Upload Image:</Typography>
          <TextField variant="outlined" placeholder="product id" size="small" sx={{width:'80%'}}></TextField>

          </Grid>
            

          </div>

        </div>
         

        </div>

      </div>

    
  );
}

export default Add;
