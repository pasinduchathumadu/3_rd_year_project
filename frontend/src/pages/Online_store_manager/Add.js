import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import { Grid, Typography, Avatar, Tab, Tabs, Box, TextField, Button, Select, MenuItem, Alert, AlertTitle,CardMedia, IconButton } from "@mui/material";
import Stack from '@mui/material/Stack';
import profile from "../../assests/profile.jpg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { MenuList } from "../../components/data/data";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Add = () => {
  const input = new Date();
  const date = input.toDateString();
  const [item, setitem] = useState("")
  const [update,setupdate] =useState(false)
  const [success, setsuccess] = useState(false)
  const [error, seterror] = useState(false)
  const [Categories, setcategories] = useState("")
  const [selectfile, setfile] = useState(null)
  const [value, setValue] = useState(0);
  const [editvalue, seteditvalue] = useState(0)
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState("")
  const [quantity, setquantity] = useState("")
  const [image, setimage] = useState("")


  const first = (event) => {
    setitem(event.target.value)
  }
  const second = (event) => {
    setcategories(event.target.value)
  }

  const updatecart = ()=>{
    setupdate(true)

  }
  const Submit = async () => {


    try {
      const res = await axios.post("http://localhost:5000/pet_care/online_store_manager/add", {
        name,
        price,
        description,
        quantity,
        item,
        Categories,
        image
      })

      if (res.data.message === "added successfully") {
        setsuccess(true)
      }
      else {
        seterror(true)
      }

    } catch (err) {
      console.log("There is an internel error")
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const editchange = (event, newValue) => {
    seteditvalue(newValue)
  }

  const handlefilechange = async (event) => {
    const file = event.target.files[0]
    setfile(file)
    setimage(file.name)


  }
  const handleFileUpload = async () => {
    seterror(false)
    setsuccess(false)
    if (!name || !description || !price || !quantity || !item || !Categories || !selectfile) {
      seterror(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectfile);

      const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.message === "File uploaded successfully") {
        Submit()
      }

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
      {value === 0 && (
        <>
          {success && (
            <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>YOU HAVE BEEN SUCCESSFULLY ADDED</strong>
              </Alert>
            </Stack>
          )}
          {error && (
            <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>check it out!</strong>
              </Alert>
            </Stack>

          )}
          <div style={{ marginTop: '5%', marginLeft: '8%', marginRight: '12%', marginBottom: '5%', backgroundColor: '#FEEED7', height: '700px' }}>
            <div style={{ paddingLeft: '28%', paddingTop: '5%' }}>
              <div style={{

                height: "75vh",
                width: "500px",
                paddingLeft: '4%',
                borderRadius: "10px",
                backgroundColor: '#D4D4D4'
              }}>
                <Grid container direction="column" component="form" >
                  <Grid item sx={{ paddingTop: '29px' }}>
                    <Typography>Product Name:</Typography>
                    <TextField variant="outlined" placeholder="product name" size="small" onChange={(e) => setname(e.target.value)} sx={{ width: '80%' }} required></TextField>
                  </Grid>
                  <Grid item sx={{ paddingTop: '20px' }}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'inline', width: '40%' }}>
                        <Typography>Product ITEM:</Typography>
                        <Select
                          labelId="demo-select-error-label"
                          id="demo-select-small"
                          size="small"
                          label="Product Item"
                          value={Categories}
                          sx={{ width: '100%' }}
                          onChange={second}
                          required
                        >
                          <MenuItem value={10}>DOGS</MenuItem>
                          <MenuItem value={20}>CATS</MenuItem>
                        </Select>
                      </div>
                      <div style={{ display: 'inline', width: '40%', paddingLeft: '4%' }}>
                        <Typography>Product Categories:</Typography>
                        <Select
                          labelId="demo-select-error-label"
                          id="demo-select-small"
                          size="small"
                          value={item}
                          label="Product Item"
                          onChange={first}
                          sx={{ width: '100%' }}
                          required
                        >
                          <MenuItem value={10}>FOOD ITEM</MenuItem>
                          <MenuItem value={20}>TOYS ITEM</MenuItem>
                          <MenuItem value={30}>OTHERS</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </Grid>

                  <Grid item sx={{ paddingTop: '1px' }}>
                    <Typography>Description:</Typography>
                    <TextField variant="outlined" placeholder="description" onChange={(e) => setdescription(e.target.value)} size="small" sx={{ width: '80%' }} required></TextField>
                  </Grid>

                  <Grid item sx={{ paddingTop: '20px' }}>
                    <Typography>Price:</Typography>
                    <TextField variant="outlined" type="number" placeholder="price" onChange={(e) => setprice(e.target.value)} size="small" sx={{ width: '80%' }} required></TextField>
                  </Grid>

                  <Grid item sx={{ paddingTop: '20px' }}>
                    <Typography>Quantity:</Typography>
                    <TextField variant="outlined" type="number" placeholder="quantity" onChange={(e) => setquantity(e.target.value)} size="small" sx={{ width: '80%' }} required></TextField>
                  </Grid>


                </Grid>
                <Grid item sx={{ paddingTop: '20px' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ display: 'inline' }}>
                      <Button
                        variant="contained"
                        component="label"

                        startIcon={<CloudUploadIcon />}
                      >
                        Upload File
                        <input type="file" hidden onChange={handlefilechange} required />

                      </Button>


                    </div>
                    <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                      {selectfile && (
                        <Typography>{selectfile.name}</Typography>

                      )}
                    </div>
                  </div>

                </Grid>
                <Grid item sx={{ paddingTop: '15px' }}>
                  <Button sx={{ width: '80%', color: 'black', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={handleFileUpload} >Submit</Button>

                </Grid>

              </div>

            </div>


          </div>
        </>
      )}

      {value === 1 && (
        <>
          <Grid>
            <Box sx={{ width: "60%", marginTop: '15px', marginLeft: '20%' }}>
              <Tabs
                value={editvalue}
                onChange={editchange}
                variant="fullWidth"
                aria-label="Tab Component"
                indicatorColor='transparent'
                sx={{ borderRadius: '10px' }}

              >
                <Tab sx={{ backgroundColor: editvalue === 0 ? '#EB996E' : 'white', color: "black" }} label="Pet Food" />
                <Tab sx={{ backgroundColor: editvalue === 1 ? '#EB996E' : 'white', color: "black" }} label="pet accessories" />
                <Tab sx={{ backgroundColor: editvalue === 2 ? '#EB996E' : 'white', color: "black" }} label="others" />
              </Tabs>

            </Box>
          </Grid>
          <div style={{ marginTop: '5%', marginLeft: '8%', marginRight: '12%', marginBottom: '5%', backgroundColor: '#FEEED7', display: "flex", flexWrap: "wrap",width:'80%',height:'auto' }}>
          {MenuList.map((menu)=>(
          
             <Box
          sx={{
            width: "320px",
            m: 2,
            border: "10px",
            borderRadius: "10px",
            marginTop: "35px",
            height:'250px',
            backgroundColor:'#D9D9D9',
            marginLeft:'50px'
          }}
        >
          <Box sx={{margin:'5%',backgroundColor:'#FFFFFF',display:'flex',height:'40px',padding:'2%',borderRadius:'10px'}}>
            Product ID:
            <IconButton sx={{marginLeft:'40%'}} onClick={updatecart}>
            <EditIcon color="primary"/>

            </IconButton>
            <IconButton sx={{marginLeft:'auto'}}>
            <DeleteIcon alignItems="center" sx={{color:'red',display:'inline'}}/>

            </IconButton>
            
          </Box>
          <Box sx={{backgroundColor:'#FFFFFF',margin:'4%',height:'150px',display:'flex'}}>
            <Box sx={{border:'1px',borderColor:'gray',borderStyle:'solid',width:'50%',height:'150px',display:'inline'}}>
            <img
            style={{ minHeight: "100px",width:'130px',marginLeft:'5%',marginTop:'10%' }}
            component={"img"}
            src={menu.image}
            alt={menu.name}
          />
       
            </Box>
            <Box sx={{marginLeft:'1%',border:'1px',borderColor:'gray',borderStyle:'solid',width:'50%',height:'150px',display:'inline'}}>
            <div style={{marginTop:'25px',marginLeft:'5px'}}>
            <Typography>Name:</Typography>
            <Typography>Price:</Typography>
            <Typography>Quantity:</Typography>


            </div>
            
          
            </Box>
          </Box>
         
        </Box>

         
         
          
          )) }


          </div>

        </>
      )}



    </div>


  );
}

export default Add;
