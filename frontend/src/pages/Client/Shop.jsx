import React, { useEffect, useState } from 'react'
import "../../styles/Client/Shop.css"
import { Alert, IconButton, Tab, Typography, Card, CardActionArea, CardContent, CardMedia, Button, InputLabel, TextField, Select, FormControl, MenuItem, Box } from "@mui/material"
import { Tabs } from "@mui/material"
import ViewBackgroundImage from '../../assests/viewpets.png'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import { Stack } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import AnnouncementIcon from '@mui/icons-material/Announcement';


export const Shop = () => {
  const email = localStorage.getItem("client_email")

  const [page, setpage] = useState(0); //main page
  const handleForm = (event, existing_value) => {
    setpage(existing_value)
  };
  // get pet image from db
  const getImageSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  // VIEW PETS FOR BUYING
  const [buypet, setbuypet] = useState("")
  const viewBuyPets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/viewBuyPets`)
      const data = await res.data
      return data

    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    viewBuyPets()
      .then((data) => setbuypet(data.data))
      .catch((err) => console.log(err))
  })

  // VIEW OWN PETS (SELLING)
  const [sellpet, setsellpet] = useState([])
  // drop down
  const [box, setbox] = useState(1)
  const handleChange = (id) => {
    setbox(id)
    viewOwnPets()
  }

  const viewOwnPets = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/viewOwnPets/${box}`, {
        email,
      })
      if (res.data.message !== "There is an internal error") {
        setsellpet(res.data.data)
      }

    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    viewOwnPets()

  })


  // ADDING PETS FOR SELL
  const [addpet, setaddpets] = useState(false)

  const [error, seterror] = useState(false)
  const [message, setmessage] = useState("")
  const [breed, setbreed] = useState("")
  const [sex, setsex] = useState("")
  const [category, setcategory] = useState("")
  const [price, setprice] = useState("")

  const handleCategory = (event) => {
    setcategory(event.target.value)
  }
  const handleSex = (event) => {
    setsex(event.target.value)
  }
  // open add pets form
  const addnewpets = () => {
    setpage(false)
    setaddpets(true)
    seterror(false)
  }
  // sumit the add pets form
  const submitAddForm = async () => {
    if (breed === "" || sex === "" || category === "" || price === "") {
      seterror(true)
      setmessage("Please fill all the field")
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/submitAddForm`, {
        email,
        breed,
        sex,
        category,
        price
      })
      if (res.data.message === 'There is an internal error') {
        setmessage('Internal error')
        seterror(true)
      } else if (res.data.message === 'success') {
        setpage(1)
        setaddpets(false)
      }

    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // back without adding
  const backfromadding = () => {
    setpage(1)
    setaddpets(false)
  }

  // UPDATE 
  const [update, setupdate] = useState(false)
  const [id, setid] = useState("")
  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")
  // open update form
  const openUpdateForm = (id) => {
    setupdate(true)
    setpage(false)
    setid(id)
    seterror1(false)
  }

  // get details for update form
  const [details, setdetails] = useState("")
  const getDetailsforUpdate = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/user/getDetailsforUpdate/${id}`)
      const data = await res.data
      return data

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getDetailsforUpdate()
      .then((data) => setdetails(data.data))
      .catch((err) => console.log(err))
  })

  // submit update form
  const [newprice, setnewprice] = useState("")
  const submitUpdateForm = async (id1) => {
    if (newprice === "") {
      seterror1(true)
      setmessage1('Please fill the field')
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/pet_care/user/submitUpdateForm`, {
        id1,
        newprice
      })
      if (res.data.message === 'There is an internal error') {
        setmessage1('Internal error')
        seterror1(true)
      } else if (res.data.message === 'success') {
        setpage(1)
        setupdate(false)
      }

    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // back without updating
  const backfromupdate = () => {
    setupdate(false)
    setpage(1)
  }


  return (
    <div style={{ marginTop: '4%' }}>
      <div style={{
        backgroundImage: `url(${ViewBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        color: 'white',
        height: "25vh",
        width: "100%",
        borderRadius: '5px'
      }}>
        <Typography sx={{ position: 'absolute', color: 'white', fontSize: '50px', padding: '20px', borderRadius: '10px', fontWeight: "30", marginBottom: '8%', marginLeft: '30%' }}>Buy and Sell Your Pets</Typography>
      </div>

      <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
        <Tabs
          value={page}
          variant="fullWidth"
          aria-label="Tab Component"
          onChange={handleForm}
          indicatorColor="transparent"
          sx={{ borderRadius: '10px' }}
        >
          <Tab sx={{ backgroundColor: page === 0 ? 'orange' : '#F0F0F5', color: 'black' }} label="Buy Pets" ></Tab>
          <Tab sx={{ backgroundColor: page === 1 ? 'orange' : '#F0F0F5', color: 'black' }} label="Sell Pets"></Tab>
        </Tabs>
      </Box>

      {page === 0 && (
        <div style={{ marginLeft: '3%', marginRight: '3%', backgroundColor: '#f0f0f5', borderRadius: '10px', padding: '1%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {buypet && buypet.length > 0 ? (
              buypet.map((menu, index) => (

                <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ minHeight: "300px" }}
                      component={"img"}
                      src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                      alt={"menu.name"} />
                    <CardContent>
                      <Typography variant="h6" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                        Pet ID : {menu.pet_id}
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>{menu.breed}</Typography><br />
                      <Typography variant="body2" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.sex}</Typography>
                      <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                        Rs. {menu.price}.00
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>Owner: {menu.first_name}{" "}{menu.last_name}</Typography><br />
                      <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, padding: '2%', width: '50%', marginLeft: '23%' }}>Buy</Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            ) : (
              <div style={{ margin: '3%', backgroundColor: 'white', padding: '2%', borderRadius: '10px', width: '100%' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}><AnnouncementIcon sx={{ marginRight: '1%', color: 'orange' }} />No Added Pets</Typography>
                <hr />
                <img
                  src={getImageSrc("nodata.png")}
                  style={{ width: '15%', height: 'auto', marginLeft: '42%' }}
                />
              </div>
            )}
          </div>
        </div>
      )}


      {page === 1 && (
        <>
          <div style={{ marginTop: '1%', marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '3%', marginRight: '3%' }}>
            <Button onClick={addnewpets} sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} >Add New Pets<AddIcon /></Button>
            <Box sx={{ width: '150px' }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant='filled'
                  value={box}
                  onChange={(e) => handleChange(e.target.value)}
                  sx={{ fontSize: '12px' }}>
                  <MenuItem value={1}>All</MenuItem>
                  <MenuItem value={2}>Not Sold</MenuItem>
                  <MenuItem value={3}>Sold</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div style={{ marginLeft: '3%', marginRight: '3%', backgroundColor: '#f0f0f5', borderRadius: '10px', padding: '1%' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {sellpet && sellpet.length > 0 ? (
                sellpet.map((menu, index) => (
                  <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                    <CardActionArea>
                      <CardMedia
                        sx={{ minHeight: "300px" }}
                        component={"img"}
                        src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                        alt={"menu.name"} />
                      <CardContent>
                        <Stack sx={{ display: 'flex', flexDirection: 'row', marginLeft: '70%' }}>
                          {menu.status === 'pending' ?
                            (
                              <>
                                <IconButton onClick={() => openUpdateForm(menu.pet_id)}><EditIcon sx={{ color: 'black' }} /></IconButton>
                                <IconButton ><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                              </>
                            ) :
                            ("")}
                          {/* // <IconButton onClick={() => openUpdateForm(menu.pet_id)}><EditIcon sx={{ color: 'black' }} /></IconButton> */}
                          {/* <IconButton ><DeleteIcon sx={{ color: 'red' }} /></IconButton> */}
                        </Stack>
                        <Typography variant="h6" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                          Pet ID : {menu.pet_id}
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center' }}>{menu.breed}</Typography><br />
                        <Typography variant="body2" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.sex}</Typography>
                        <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                          Rs. {menu.price}.00
                        </Typography>
                        {menu.status === 'pending' ? (
                          <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, padding: '2%', width: '50%', marginLeft: '23%' }}>Pending</Button>) :
                          (
                            <Button sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' }, padding: '2%', width: '50%', marginLeft: '23%' }}>Sold</Button>
                          )
                        }
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              ) : (
                <div style={{ margin: '3%', backgroundColor: 'white', padding: '2%', borderRadius: '10px', width: '100%' }}>
                  <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}><AnnouncementIcon sx={{ marginRight: '1%', color: 'orange' }} />No Added Pets</Typography>
                  <hr />
                  <img
                    src={getImageSrc("nodata.png")}
                    style={{ width: '15%', height: 'auto', marginLeft: '42%' }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {addpet && (
        <>
          <div style={{
            backdropFilter: 'blur(4px)',
            position: 'absolute',
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "10px",
            zIndex: 1001
          }}>
            <FormControl sx={{
              padding: '2%',
              backgroundColor: '#f0f0f5',
              borderRadius: '10px',
              width: '50%',
              position: 'relative',
              zIndex: 1001,
            }}>

              <div style={{ marginLeft: '95%' }}>
                <IconButton onClick={backfromadding}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Add New Pets</Typography>
                <hr />
              </div>

              <div style={{ marginBottom: '3%' }}>
                <TextField
                  id="outlined-textarea"
                  label=" Breed "
                  placeholder="breed"
                  multiline
                  onChange={(e) => setbreed(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '3%' }}>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={handleCategory}
                    label="Pet Category"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Cat</MenuItem>
                    <MenuItem value={20}>Dog</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Sex</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={sex}
                    onChange={handleSex}
                    label="Sex"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <TextField
                  type="number"
                  id="outlined-textarea"
                  label=" Price "
                  placeholder="price"
                  multiline
                  onChange={(e) => setprice(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </div>

              <div>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: '100%' }}
                >
                  Upload File
                  <input type="file" hidden required />
                </Button>

              </div>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                <Button onClick={() => submitAddForm()} variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} >Submit</Button>
              </div>
              {error && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">{message}</Alert>
                </Stack>
              )}

            </FormControl>
          </div>
        </>
      )}

      {update && (
        <>
          <div style={{
            backdropFilter: 'blur(4px)',
            position: 'absolute',
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "10px",
            zIndex: 1001
          }}>
            <FormControl sx={{
              padding: '2%',
              backgroundColor: '#f0f0f5',
              borderRadius: '10px',
              width: '35%',
              position: 'relative',
              zIndex: 1001,
            }}>

              <div style={{ marginLeft: '95%' }}>
                <IconButton onClick={backfromupdate}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Update Price</Typography>
                <hr />
              </div>


              {details && details.map((row, index) => (
                <>
                  <div style={{ marginBottom: '3%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CardMedia
                      sx={{ width: '20%', height: 'auto', borderRadius: '10%' }}
                      component={"img"}
                      src={row.image === "" ? getImageSrc("noimage.png") : getImageSrc(row.image)}
                      alt={"row.pet_id"} />

                    <TextField
                      id="outlined-read-only-input"
                      label="Pet ID"
                      defaultValue={row.pet_id}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '3%', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ marginRight: '10%' }}>Price</Typography>
                    <TextField
                      type="number"
                      id="outlined-helperText"
                      defaultValue={row.price}
                      onChange={(e) => setnewprice(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                    {/* <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={() => addpet()}>Submit</Button> */}
                    <Button onClick={() => submitUpdateForm(row.pet_id)} variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} >Submit</Button>
                  </div>
                  {error1 && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">{message1}</Alert>
                    </Stack>
                  )}
                </>
              ))}

            </FormControl>
          </div>
        </>
      )}

    </div>
  )
}
