/* eslint-disable no-mixed-operators */
import React, { useState } from "react";

import { Grid, Typography, Avatar, Tab, Tabs, Box, TextField, Button, Select, MenuItem, Alert, AlertTitle, IconButton, CardMedia, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router";
import Stack from '@mui/material/Stack';
import profile from "../../assests/pic12.jfif";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Add = () => {
  const input = new Date();
  const date = input.toDateString();
  const [update_message, setupdate_message] = useState(false)
  const [update_error, setupdate_error] = useState(false)
  const [item, setitem] = useState("")
  const [update, setupdate] = useState(false)
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
  const [cart, setgetitem] = useState([])
  const [update_cart, setupdatecart] = useState("")
  const [updatedescription, setupdatedescription] = useState("")
  const [updateavailibility, setupdateavailibility] = useState("")
  const [updateprice, setupdateprice] = useState("")
  const [open, setOpen] = useState(false)
  const [deleteid, setdelete] = useState(false)

  const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

      // get profile picture
      const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }


  const handleClickOpen = (id) => {

    setdelete(id)
    setOpen(true);

  };
  const handledelete = async () => {
    const res = await axios.post('http://localhost:5000/pet_care/online_store_manager/delete', {
      deleteid
    })
    if (res.data.message === 'deleted succcessfully') {
      setOpen(false)
      setValue(0)
      setupdate(false)

    }

  }
  const handleClose = () => {
    setOpen(false);
  };
  const first = (event) => {
    setitem(event.target.value)
  }
  const second = (event) => {
    setcategories(event.target.value)
  }

  const updatecart = (id) => {
    setupdate(true)
    seteditvalue(false)
    updateitem(id)
    setupdate_message(false)

  }
  const updatestore = async (id) => {

    try {
      const res = await axios.post('http://localhost:5000/pet_care/online_store_manager/update', {
        id,
        updatedescription,
        updateavailibility,
        updateprice

      })
      if (res.data.message === "update successfully") {
        getitem()
        setValue(0)
        setupdate(false)
        setupdate_message(true)
      }
      else {
        setValue(0)
        setupdate(false)
        setupdate_error(true)
      }

    } catch (err) {
      console.log("There is an internel error")
    }

  }

  const getitem = async () => {


    try {
      const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/get_item`)
      const data = await res.data
      setgetitem(data.data)
    } catch (err) {
      console.log("There is an error")
    }
  }


  const updateitem = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/update_cart_load/${id}`)
      const data = await res.data
      setupdatecart(data.data)

    } catch (err) {
      console.log("There is an internel error")
    }

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
    setupdate(false)
    seteditvalue(0)
    getitem()
    setupdate_message(false)
    setupdate_error(false)

  };
  const editchange = (event, newValue) => {
    seteditvalue(newValue)
    getitem()
    setupdate(false)
    setupdate_message(false)
    setupdate_error(false)
  }
  const handlefilechange = async (event) => {
    const file = event.target.files[0]
    setfile(file)
    setimage(file.name)
  }
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  };
  const handleFileUpload = async () => {
    seterror(false)
    setsuccess(false)
    if (!name && !description && !price && !quantity && !item && !Categories && !selectfile) {
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

      <Grid sx={{ marginTop: '4%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
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

          <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <NotificationsIcon sx={{ marginTop: '1%' }} />
            </div>
            <div style={{ marginLeft: '1%' }}>
              <Stack direction="row" spacing={2}>
                {/* <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} /> */}
                <Button onClick={profile}><img src={getProfilepicturepath("onlinestore_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
              </Stack>

            </div>

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
          {update_message && (
            <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>YOU HAVE BEEN SUCCESSFULLY UPDATED</strong>
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
          {update_error && (
            <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Warning</AlertTitle>
                Cannot Updated — <strong>check it out!</strong>
              </Alert>
            </Stack>

          )}
          <div style={{ marginTop: '5%', marginLeft: '8%', marginRight: '12%', marginBottom: '5%', backgroundColor: '#f0f0f5', height: '700px' }}>
            <div style={{ paddingLeft: '28%', paddingTop: '5%' }}>
              <div style={{

                height: "75vh",
                width: "500px",
                paddingLeft: '4%',
                borderRadius: "10px",
                backgroundColor: 'white'
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
                <Tab sx={{ backgroundColor: editvalue === 0 ? 'orange' : 'white', color: "black" }} label="Pet Food" />
                <Tab sx={{ backgroundColor: editvalue === 1 ? 'orange' : 'white', color: "black" }} label="pet accessories" />
                <Tab sx={{ backgroundColor: editvalue === 2 ? 'orange' : 'white', color: "black" }} label="Pet Toys" />
              </Tabs>

            </Box>
          </Grid>
          {editvalue === 0 && (
            <div style={{ marginTop: '3%', marginLeft: '5%', marginRight: '12%', marginBottom: '5%', backgroundColor: 'white', display: "flex", flexWrap: "wrap", width: '90%', height: 'auto' }}>
              {cart.filter((menu, index) => menu.catogories === 'foods').map((menu, index) => (
                <Box
                  sx={{
                    width: "380px",
                    m: 2,
                    border: "10px",
                    borderRadius: "10px",
                    marginTop: "35px",
                    height: '330px',
                    backgroundColor: '#D9D9D9',
                    marginLeft: '50px'
                  }}
                >
                  <Box sx={{ margin: '5%', backgroundColor: '#FFFFFF', display: 'flex', height: '40px', padding: '2%', borderRadius: '10px' }}>
                    Product ID:{menu.item_id}
                    <IconButton sx={{ marginLeft: '36%' }} onClick={() => updatecart(menu.item_id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleClickOpen(menu.item_id)}>
                      <DeleteIcon alignItems="center" sx={{ color: 'red', display: 'inline' }} />
                    </IconButton>

                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', margin: '4%', height: '230px', display: 'flex' }}>
                    <Box sx={{ border: '1px', borderColor: 'gray', borderStyle: 'solid', width: '75%', height: '200px', display: 'inline', marginTop: '6px' }}>
                      <Card sx={{ maxWidth: "140px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '11px' }}>
                        <CardActionArea>
                          <CardMedia
                            sx={{ minHeight: "150px" }}
                            component={"img"}
                            src={getImageSrc(menu.image)}
                            alt={menu.name} />

                        </CardActionArea>
                      </Card>
                    </Box>
                    <Box sx={{ marginLeft: '1%', border: '1px', borderColor: 'gray', borderStyle: 'solid', width: '50%', height: '200px', display: 'inline', marginTop: '6px' }}>
                      <div style={{ marginTop: '25px', marginLeft: '5px' }}>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '20px', fontStyle: 'bold', paddingBottom: '5px' }}>Name:{menu.name}</Typography>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '18px', fontStyle: 'bold' }}>Price:{menu.unit_price}</Typography>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '18px', fontStyle: 'bold' }}>Quantity:{menu.quantity}</Typography>
                      </div>
                    </Box>
                  </Box>
                  <div style={{ width: '50%', marginTop: '100px', backgroundColor: 'red' }}>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Online Store Manager
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are You Sure Do you want to Delete this Produt Permenatly?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Back</Button>
                        <Button onClick={handledelete} autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

                </Box>
              ))}
            </div>
          )}
          {!update && editvalue === 1 && (
            <div style={{ marginTop: '3%', marginLeft: '5%', marginRight: '12%', marginBottom: '5%', backgroundColor: 'white', display: "flex", flexWrap: "wrap", width: '90%', height: 'auto' }}>
              {cart.filter((menu) => menu.catogories === 'accessories').map((menu, index) => (
                <Box
                  sx={{
                    width: "380px",
                    m: 2,
                    border: "10px",
                    borderRadius: "10px",
                    marginTop: "35px",
                    height: '330px',
                    backgroundColor: '#D9D9D9',
                    marginLeft: '50px'
                  }}
                >
                  <Box sx={{ margin: '5%', backgroundColor: '#FFFFFF', display: 'flex', height: '40px', padding: '2%', borderRadius: '10px' }}>
                    Product ID:{menu.item_id}
                    <IconButton sx={{ marginLeft: '36%' }} onClick={() => updatecart(menu.item_id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleClickOpen(menu.item_id)}>
                      <DeleteIcon alignItems="center" sx={{ color: 'red', display: 'inline' }} />
                    </IconButton>

                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', margin: '4%', height: '230px', display: 'flex' }}>
                    <Box sx={{ border: '1px', borderColor: 'gray', borderStyle: 'solid', width: '75%', height: '200px', display: 'inline', marginTop: '6px' }}>
                      <Card sx={{ maxWidth: "140px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '11px' }}>
                        <CardActionArea>
                          <CardMedia
                            sx={{ minHeight: "150px" }}
                            component={"img"}
                            src={getImageSrc(menu.image)}
                            alt={menu.name} />

                        </CardActionArea>
                      </Card>
                    </Box>
                    <Box sx={{ marginLeft: '1%', border: '1px', borderColor: 'gray', borderStyle: 'solid', width: '50%', height: '200px', display: 'inline', marginTop: '6px' }}>
                      <div style={{ marginTop: '25px', marginLeft: '5px' }}>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '20px', fontStyle: 'bold', paddingBottom: '5px' }}>Name:{menu.name}</Typography>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '18px', fontStyle: 'bold' }}>Price:{menu.unit_price}</Typography>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '18px', fontStyle: 'bold' }}>Quantity:{menu.quantity}</Typography>
                      </div>
                    </Box>
                  </Box>
                  <div style={{ width: '50%', marginTop: '100px', backgroundColor: 'red' }}>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Online Store Manager
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are You Sure Do you want to Delete this Produt Permenatly?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Back</Button>
                        <Button onClick={handledelete} autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

                </Box>
              ))}
            </div>
          )}
          {!update && editvalue === 2 && (
            <div style={{ marginTop: '3%', marginLeft: '5%', marginRight: '12%', marginBottom: '5%', backgroundColor: 'white', display: "flex", flexWrap: "wrap", width: '90%', height: 'auto' }}>
              {cart.filter((menu) => menu.catogories === 'toys').map((menu, index) => (
                <Box
                  sx={{
                    width: "380px",
                    m: 2,
                    border: "10px",
                    borderRadius: "10px",
                    marginTop: "35px",
                    height: '330px',
                    backgroundColor: '#D9D9D9',
                    marginLeft: '50px'
                  }}
                >
                  <Box sx={{ margin: '5%', backgroundColor: '#FFFFFF', display: 'flex', height: '40px', padding: '2%', borderRadius: '10px' }}>
                    Product ID:{menu.item_id}
                    <IconButton sx={{ marginLeft: '36%' }} onClick={() => updatecart(menu.item_id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleClickOpen(menu.item_id)}>
                      <DeleteIcon alignItems="center" sx={{ color: 'red', display: 'inline' }} />
                    </IconButton>

                  </Box>
                  
                  <Box sx={{ backgroundColor: '#FFFFFF', margin: '4%', height: '230px', display: 'flex' }}>
                    <Box sx={{ border: '1px', borderColor: 'gray', borderStyle: 'solid', width: '75%', height: '200px', display: 'inline', marginTop: '6px' }}>
                      <Card sx={{ maxWidth: "140px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '11px' }}>
                        <CardActionArea>
                          <CardMedia
                            sx={{ minHeight: "150px" }}
                            component={"img"}
                            src={getImageSrc(menu.image)}
                            alt={menu.name} />

                        </CardActionArea>
                      </Card>
                    </Box>
                    <Box sx={{ marginLeft: '1%', border: '1px', borderColor: 'gray', borderStyle: 'solid', width: '50%', height: '200px', display: 'inline', marginTop: '6px' }}>
                      <div style={{ marginTop: '25px', marginLeft: '5px' }}>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '20px', fontStyle: 'bold', paddingBottom: '5px' }}>Name:{menu.name}</Typography>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '18px', fontStyle: 'bold' }}>Price:{menu.unit_price}</Typography>
                        <Typography sx={{ fontFamily: 'Time New Roman', fontSize: '18px', fontStyle: 'bold' }}>Quantity:{menu.quantity}</Typography>
                      </div>
                    </Box>
                  </Box>
                  <div style={{ width: '50%', marginTop: '100px', backgroundColor: 'red' }}>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        Online Store Manager
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are You Sure Do you want to Delete this Produt Permenatly?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Back</Button>
                        <Button onClick={handledelete} autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

                </Box>
              ))}
            </div>
          )}

          <div>
          </div>
        </>
      )}

      {update && (
        <div>
          {update_cart && update_cart.map((menu, index) => (
            <><Box sx={{ backgroundColor: 'orange', width: '13%', border: '10px', borderRadius: '10px', textAlign: 'center', marginLeft: '20%', marginTop: '2%' }}>
              <Typography>Update Product</Typography>
            </Box><div style={{ marginTop: '2%', marginLeft: '20%', marginBottom: '5%', backgroundColor: 'white', width: '60%', height: '80vh', display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ width: '100%', backgroundColor: '#f0f0f5', margin: '2%' }}>
                  <div style={{ height: '250px', width: '100%', backgroundColor: '#f0f0f5', display: 'flex' }}>
                    <div style={{ height: '220px', width: '40%', marginTop: '3%', marginLeft: '2%', display: 'inline', backgroundColor: '#F9F8F8' }}>



                      <Card sx={{ maxWidth: "200px", display: "flex", m: 2, border: "10px", borderRadius: '10px', marginTop: '8px', height: '200px', marginLeft: '14%' }}>
                        <CardActionArea>
                          <CardMedia
                            sx={{ minHeight: "10px" }}
                            component={"img"}
                            src={getImageSrc(menu.image)}
                            alt={menu.name} />

                        </CardActionArea>
                      </Card>
                    </div>

                    <div style={{ height: '200px', width: '60%', display: 'inline', marginTop: '3%', marginLeft: '10%' }}>
                      <Box sx={{ height: '100px', width: '90%', backgroundColor: '#f0f0f5' }}>
                        <Typography sx={{ paddingLeft: '2%', paddingTop: '2%' }}>{menu.name}</Typography>
                        <Typography sx={{ paddingTop: '2%', paddingLeft: '2%' }}>{menu.description}</Typography>
                        <Typography sx={{ paddingTop: '15%' }}>Update Price :</Typography>
                        <TextField onChange={(e) => setupdateprice(e.target.value)} size="small" placeholder="price:RS.xxxx" sx={{ marginTop: '15px', backgroundColor: '#F9F8F8', width: '100%' }}></TextField>
                      </Box>


                    </div>

                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    <Typography sx={{ backgroundColor: '#f0f0f5' }}>Upadate Description:</Typography>
                    <TextField onChange={(e) => setupdatedescription(e.target.value)} size="small" placeholder="description" sx={{ width: '95%', marginTop: '10px', backgroundColor: '#f0f0f5' }}></TextField>
                    <Typography sx={{ backgroundColor: '#f0f0f5', marginTop: '15px' }}>Upadate Avalibility:</Typography>
                    <TextField onChange={(e) => setupdateavailibility(e.target.value)} size="small" placeholder="quantity" sx={{ width: '45%', marginTop: '10px', backgroundColor: '#f0f0f5' }}></TextField>

                    <Button onClick={() => updatestore(menu.item_id)} sx={{ backgroundColor: 'orange', width: '95%', marginTop: '30px', height: '5vh', ':hover': { backgroundColor: '#ED5C01' }, textAlign: 'center', color: 'white' }}>update</Button>

                  </div>
                </div>


              </div>
            </>

          ))}




        </div>
      )}

    </div>


  );
}

export default Add;
