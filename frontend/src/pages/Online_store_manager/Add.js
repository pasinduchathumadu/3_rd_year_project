import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import { Grid, Typography, Avatar, Tab, Tabs, Box,TextField,Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import profile from "../../assests/profile.jpg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const input = new Date();
  const date = input.toDateString();
  const [selectfile , setfile] = useState(null)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlefilechange = async(event)=>{
    const file = event.target.files[0]
    setfile(file)
  }
  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectfile);

      const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully!");
      // Add any further handling of the response from the backend if needed.

    } catch (err) {
      console.log("There is an internal error", err);
    }
}

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
        <div style={{paddingLeft:'28%',paddingTop:'5%'}}>
        <div  style={{
           
            height: "75vh",
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
            <div style={{display:'flex'}}>
            <div style={{display:'inline'}}>
            <Button
                variant="contained"
                component="label"
                
                startIcon={<CloudUploadIcon />}
              >
                Upload File
                <input type="file" hidden onChange={handlefilechange}/>
               
              </Button>
             

            </div>
            <div style={{display:'inline',paddingTop:'6px',paddingLeft:'7px'}}>
            {selectfile &&(
                 <Typography>{selectfile.name}</Typography>

              )}
            

            </div>
             

            </div>
           
             
             
            </Grid>
            <Grid item sx={{paddingTop:'15px'}}>
                <Button sx={{width:'80%',color:'black',    backgroundColor:'orange',':hover':{backgroundColor:'orange'}}} onClick={handleFileUpload}>Submit</Button>

            </Grid>
            

          </div>

        </div>
         

        </div>

      </div>

    
  );
}

export default Add;
