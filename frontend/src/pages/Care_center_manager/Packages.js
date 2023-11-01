import React, { useEffect, useState } from "react";
import "../../styles/Care_center_manager/Packages.css";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Avatar, Stack, Grid, Box, Tab, Tabs, Button, FormControl, TextField, IconButton, Alert, InputLabel, Select, MenuItem, TableRow } from "@mui/material";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Packages() {
  const input = new Date();
  const date = input.toDateString();

  const [value, setvalue] = useState(true)
  const [newp, setnewp] = useState(false)
  const [newf, setnewf] = useState(false)
  const [view, setview] = useState(false)
  const [updatep, setupdatep] = useState(false)
  const [warn, setwarn] = useState(false)

  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }
  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  // ADD NEW PACKAGE
  // open new package form
  const openAddPackage = () => {
    setnewp(true)
    setvalue(false)
    setnewf(false)
    setupdatep(false)
    setview(false)
    seterror(false)
    setwarn(false)
    setfile("")
  }
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [error, seterror] = useState(false)
  const [message, setmessage] = useState("")

  const SubmitAddPackage = async () => {
    if (name === "" || price === "") {
      seterror(true)
      setmessage('Please fill all the fields')
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/SubmitAddPackage`, {
        name,
        price,
        image

      })
      if (res.data.message === 'There is an internal error') {
        seterror(true)
        setmessage('There is an internal error')
      } else if (res.data.message === 'Already have 3 packages') {
        seterror(true)
        setmessage('Already have 3 packages')
      } else if (res.data.message === 'success') {
        setvalue(true)
        seterror(false)
        setnewp(false)
        setnewf(false)
        setupdatep(false)
        setview(true)
        setwarn(false)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // open add facility form
  const openAddFacilityForm = () => {
    setvalue(false)
    setnewf(true)
    setnewp(false)
    setupdatep(false)
    setview(false)
    setwarn(false)
    seterror1(false)
    setbpckg("")
    setnewfacility("")

  }

  // get package details 
  const [details, setdetails] = useState("")
  const getDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/getDetails`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    getDetails()
      .then((data) => setdetails(data.data))
      .catch((err) => console.log('There is an internal error'))
  })

  // add package facilities
  const [error1, seterror1] = useState(false)
  const [message1, setmessage1] = useState("")
  const [bpckg, setbpckg] = useState("")
  const [newfacility, setnewfacility] = useState("")

  const handlebpckg = (event) => {
    setbpckg(event.target.value)
  }
  // submit package facility form
  const submitFacilityForm = async () => {
    if (bpckg === "" || newfacility === "") {
      seterror1(true)
      setmessage1('Please fill all fields')
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/submitFacilityForm`, {
        bpckg,
        newfacility
      })
      if (res.data.message === 'There is an internal error') {
        seterror1(true)
        setmessage1('There is an internal error')
      } else if (res.data.message === 'success') {
        setvalue(true)
        setnewf(false)
        setnewp(false)
        setupdatep(false)
        setview(false)
        setwarn(false)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // view package facilities
  // view facilities
  const [fac, setfac] = useState("")
  const viewFacilities = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/viewFacilities/${id}`)
      setfac(res.data.data)
      setvalue(false)
      setnewf(false)
      setnewp(false)
      setupdatep(false)
      setview(true)
      setwarn(false)
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // open update price 
  const [id, setid] = useState("")
  const openUpdatePrice = (id) => {
    setnewf(false)
    setnewp(false)
    setupdatep(true)
    setview(false)
    setid(id)
    setvalue(false)
    setwarn(false)
    setnewprice("")
    seterror2(false)
  }

  // get price for update form
  const [getprice, setgetprice] = useState([])
  const getPrice = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/getPrice/${id}`)
      const data = await res.data
      return data
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getPrice()
      .then((data) => setgetprice(data.data))
      .catch((err) => console.log(err))
  })

  // update price
  const [newprice, setnewprice] = useState("")
  const [error2, seterror2] = useState(false)
  const [message2, setmessage2] = useState("")

  // update form submit
  const SubmitNewPrice = async () => {
    if (newprice === "") {
      seterror2(true)
      setmessage2('Please fill all the fields')
      return
    }
    try {
      const res = await axios.post(`http://localhost:5000/pet_care/care_center_manager/SubmitNewPrice`, {
        id,
        newprice,
      })
      if (res.data.message === 'There is an internal error') {
        seterror2(true)
        setmessage2('There is an internal error')
      } else if (res.data.message === 'updated') {
        setvalue(true)
        setnewp(false)
        setnewf(false)
        setview(false)
        setupdatep(false)
        setwarn(false)
      }
    } catch (err) {
      console.log('There is an internal error')
    }
  }

  // DELETE
  // display warning
  const [id1, setid1] = useState("")
  const displayWarn = (id1) => {
    setwarn(true)
    setvalue(false)
    setnewf(false)
    setnewp(false)
    setview(false)
    setupdatep(false)
    setid1(id1)
  }

  const [error3, seterror3] = useState(false)
  const [message3, setmessage3] = useState("")
  // delete package
  const deletePackage = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/care_center_manager/deletePackage/${id1}`)
      if (res.data.message === 'There is an internal error') {
        seterror3(true)
        setmessage3('There is an internal error')
      } else {
        setvalue(true)
        setnewp(false)
        setnewf(false)
        setview(false)
        setwarn(false)
        setupdatep(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // back
  const back = () => {
    setvalue(true)
    setnewp(false)
    setnewf(false)
    setview(false)
    setupdatep(false)
    setwarn(false)
  }
  const [selectfile, setfile] = useState(null)
  const [image, setimage] = useState("")
  const handlefilechange = async (event) => {
    const file = event.target.files[0]
    setfile(file)
    setimage(file.name)
  }
  const handleFileUpload = async () => {
    seterror(false)

  
    try {
      const formData = new FormData();
      formData.append("image", selectfile);

      const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.message === "File uploaded successfully") {
        SubmitAddPackage()
       
      }

      console.log("File uploaded successfully!");
      // Add any further handling of the response from the backend if needed.

    } catch (err) {
      console.log("There is an internal error", err);
    }
  }


  return (
    <>

      <div className="full-page" style={{ marginTop: '4%' }}>
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "inline", marginTop: "30px", marginLeft: "2%", width: "33.3%" }}
          >
            <Typography>Care Center Manager</Typography>
            <Typography>Today</Typography>
            <Typography>{date}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              width: "33.3%",
              justifyContent: "center"
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: "24px",
                fontFamily: "fantasy",
                display: "flex",
                alignItems: "center",
              }}
            >
              Grooming Packages
            </Typography>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginLeft: '150%' }}><Stack direction="row" spacing={2} width={300}>
              <NotificationsIcon />
              <Button onClick={profile}>
                <img
                  alt="profilepicture"
                  src={getProfilepicturepath("carecenter_profile.png")}
                  style={{ width: 'auto', height: '60px' }}
                />
              </Button>
            </Stack>
            </div>
          </div>
        </div>



        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2%', marginTop: '1%', marginLeft: '3%', marginRight: '3%' }}>
          <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={openAddPackage}>ADD NEW PACKAGE<AddIcon style={{ fontSize: "20px" }} /></Button>
          <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={openAddFacilityForm}>ADD NEW PACKAGE FACILITY<AddIcon style={{ fontSize: "20px" }} /></Button>
        </div>

        {value && (
          (
            <div className="container1">
              <div className="row">

                {details && details.map((row, index) => (
                  <div className="column">
                    <div className="cards" style={{ width: '100%', height: '70%' }}>
                      <img
                        src={row.symbol === "" ? getProfilepicturepath("noimage.png") : getProfilepicturepath(row.symbol)}
                        alt={row.package_name}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <div style={{ marginLeft: '78%' }}>
                          <IconButton onClick={() => displayWarn(row.package_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1%', marginBottom: '2%' }}>
                          <Typography className="card-title" sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>{row.package_name}</Typography>
                          <Typography className="card-price" sx={{ textAlign: 'center', fontSize: '23px', fontWeight: 'bold', color: 'orange' }}>Rs.{row.price}</Typography>
                        </div>
                        <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                          <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={() => viewFacilities(row.package_id)}>VIEW FACILITIES</Button>
                        </div>
                        <div style={{ marginTop: '4%', marginBottom: '2%' }}>
                          <Button sx={{ color: 'white', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={() => openUpdatePrice(row.package_id)}><EditIcon />UPDATE PRICE</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* add new package */}
        {newp && (
          <div style={{
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10%'
          }}>
            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%' }}>

              <div style={{ marginLeft: '88%' }}>
                <IconButton onClick={back}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Add New Package</Typography>
                <hr />
              </div>

              <div style={{ marginBottom: '3%' }}>
                <TextField
                  id="outlined-textarea"
                  label="Package Name"
                  placeholder="name"
                  multiline
                  onChange={(e) => setname(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '3%' }}>
                <TextField
                  id="outlined-textarea"
                  label="Price"
                  placeholder="price"
                  type="number"
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
                  <input type="file" hidden onChange={handlefilechange} required />
                </Button>
                <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                  {selectfile && (
                    <Typography sx={{ color: 'black' }}>{selectfile.name}</Typography>

                  )}
                </div>
              </div>

              {error && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">{message}</Alert>
                </Stack>
              )}

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={()=>handleFileUpload()}>Submit</Button>
              </div>

            </FormControl>
          </div>

        )}

        {/* add new facility */}
        {newf && (
          <div style={{
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10%'
          }}>
            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%' }}>

              <div>
                <IconButton onClick={back}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '590px' }} /></IconButton>
              </div>

              <div style={{ marginBottom: '2%' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>Add Package Facilities</Typography>
                <hr />
              </div>

              <div style={{ marginBottom: '3%' }}>
                <FormControl sx={{ minWidth: 120, width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Package</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={bpckg}
                    onChange={handlebpckg}
                    label="Pet Category"

                  >
                    {details && details.map((menu, index) => (
                      <MenuItem key={index} value={menu.package_id}>
                        {menu.package_id + " - " + menu.package_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{ marginBottom: '3%' }}>
                <TextField
                  id="outlined-textarea"
                  label="Facility"
                  placeholder="facility"
                  multiline
                  onChange={(e) => setnewfacility(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </div>

              {error1 && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">{message1}</Alert>
                </Stack>
              )}

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={() => submitFacilityForm()}>Submit</Button>
              </div>

            </FormControl>
          </div>


        )}

        {/* view facilities */}
        {view && (
          <div style={{
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10%'
          }}>
            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%' }}>

              <div style={{ marginLeft: '95%' }}>
                <IconButton onClick={back}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
              </div>

              <div style={{ marginBottom: '2%' }}>

                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}> Package Facilities</Typography>
                <hr />
              </div>

              <div className="form-label">
                {fac && fac.length > 0 && (
                  <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
                    Package : {fac[0].package_id}
                  </Typography>
                )}

                <Typography sx={{ fontWeight: 'bold' }}> Facilities :  </Typography>
                <hr />
                <div>
                  {fac && fac.map((menu, index) => (
                    <Typography sx={{ marginTop: '1%', marginBottom: '1%' }}>
                      <CheckCircleIcon sx={{ marginRight: '1%', color: 'green' }} />
                      {menu.facility}
                    </Typography>
                  ))}
                </div>
              </div>
            </FormControl>
          </div>
        )}

        {/* update price */}
        {updatep && (
          <div style={{
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10%'
          }}>
            <FormControl sx={{ padding: '2%', backgroundColor: '#f0f0f5', borderRadius: '10px', width: '50%' }}>

              <div style={{ marginLeft: '95%' }}>
                <IconButton onClick={back}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
              </div>

              <div style={{ marginBottom: '2%' }}>

                <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}> Update Package Price</Typography>
                <hr />
              </div>

              {getprice.filter((menu,index)=>menu.package_id === id).map((menu, index) => (
                <>
                  <div className="form-label">
                    <div style={{ marginBottom: '3%', display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ marginRight: '10%' }}>Price</Typography>
                      <TextField
                        type="number"
                        id="outlined-helperText"
                        defaultValue={menu.price}
                        onChange={(e) => setnewprice(e.target.value)}
                      />
                    </div>
                  </div>
                  {error2 && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">{message2}</Alert>
                </Stack>
              )}

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                    <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={() => SubmitNewPrice(menu.package_id)}>Submit</Button>
                  </div>
                </>
              ))}
            </FormControl>
          </div>
        )}

        {/* deletion for warning  */}
        {warn && (
          <div style={{
            backdropFilter: 'blur(4px)',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '5px',
            width: '100%',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '300px',
            zIndex: 1001,
            marginTop: '12%'
          }}>
            <div style={{ backgroundColor: 'black', padding: '10px' }}>
              <div style={{
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#f0f0f5',
                width: '500px',
                position: 'relative',
                zIndex: 1001
              }}>
                <Typography sx={{ textAlign: 'center' }}>Confirm Remove? </Typography>
                <hr /><br />

                <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Button onClick={deletePackage} sx={{ backgroundColor: 'orange', color: 'white', margin: '10px', ':hover': { backgroundColor: 'orange' } }}>Confirm</Button>
                  <Button onClick={back} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        )}








      </div>
    </>
  );
}

export default Packages;
