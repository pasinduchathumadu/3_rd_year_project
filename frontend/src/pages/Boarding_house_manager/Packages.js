import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormLabel, TextField, Typography, IconButton, InputLabel, MenuItem, Select, DialogContent, Dialog, DialogTitle, DialogActions, DialogContentText } from "@mui/material";
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Packages = () => {
    const [new1, setNew] = useState(true);  //package cards
    const [addform, setaddform] = useState(false); //add new package form
    const [addfacility, setaddfacility] = useState(false); //add  package facilities
    const [openfacility, setopenfacility] = useState(false); //view package facilities
    const [updateprice, setupdateprice] = useState(false); //update price
    const [warn, setwarn] = useState(false)
    const [selectfile, setfile] = useState(null)
    const [image, setimage] = useState("") //warning


    const input = new Date();
    const date = input.toDateString();

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

    // get images from backend
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // ADD NEW PACKAGE
    // CLOSE
    const backfromadding = () => {
        setNew(true)
        setaddform(false)
        setaddfacility(false)
        setopenfacility(false)
        setupdateprice(false)
        setwarn(false)
    }
    // open add new package - basic details
    const openForm = () => {
        setNew(false)
        setaddform(true)
        seterror(false)
        setopenfacility(false)
        setupdateprice(false)
        setaddfacility(false)
        setwarn(false)
        
    }
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [color, setcolor] = useState("")
    // add basic details
    const submitBasicDetails = async () => {
        if (name === "" || price === "" || color === "") {
            setmessage('Please fill all fields')
            seterror(true)
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/submitBasicDetails`, {
                name,
                price,
                color,
                image
            })
            if (res.data.message === 'There is an internal error') {
                seterror(true)
                setmessage('Internal error')
            } else if (res.data.message === 'Cannot be added. Already has 3 packages') {
                seterror(true)
                setmessage('Cannot be added. Already has 3 packages')
            } else if (res.data.message === 'success') {
                setaddform(false)
                setNew(true)
                setaddfacility(false)
                setupdateprice(false)
                setwarn(false)
            }
        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // display package basic details
    const [details, setdetails] = useState("")
    const getBasicDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/getBasicDetails`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        getBasicDetails()
            .then((data) => setdetails(data.data))
            .catch((err) => console.log(err))
    })

    // open facilities form
    const openFacilityForm = () => {
        setNew(false)
        setaddform(false)
        setaddfacility(true)
        seterror1(false)
        setopenfacility(false)
        setupdateprice(false)
        setwarn(false)
    }

    // add facilities
    const [newfacility, setnewfacility] = useState("")
    const [bpckg, setbpckg] = useState("")
    const handlebpckg = (event) => {
        setbpckg(event.target.value)
    }
    const [error1, seterror1] = useState(false)
    const [message1, setmessage1] = useState("")

    // submit facility form
    const submitFacilityForm = async () => {
        if (newfacility === "" || bpckg === "") {
            setmessage1('Please fill all required fields')
            seterror1(true)
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/submitFacilityForm`, {
                bpckg,
                newfacility
            })
            if (res.data.message === 'There is an internal error') {
                setmessage1('There is an internal error')
                seterror1(true)
            } else if (res.data.message === 'success') {
                setNew(true)
                setaddfacility(false)
                setaddform(false)
                setupdateprice(false)
                setwarn(false)
                setopenfacility(false)
            }

        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // view facilities
    const [fac, setfac] = useState("")
    const viewFacilities = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/viewFacilities/${id}`)
            setfac(res.data.data)
            setopenfacility(true)
            setNew(false)
            setaddform(false)
            setaddfacility(false)
            setupdateprice(false)
            setwarn(false)

        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // change price of package
    // open form
    const [id, setid] = useState("")
    const openChangePrice = (id) => {
        setupdateprice(true)
        setopenfacility(false)
        setaddform(false)
        setNew(false)
        setaddfacility(false)
        setid(id)
        setwarn(false)
    }
    // get price for update form
    const [getprice, setgetprice] = useState("")
    const getPrice = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/getPrice/${id}`)
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

    // submit
    const [newprice, setnewprice] = useState("")
    const [error2, seterror2] = useState(false)
    const [message2, setmessage2] = useState("")

    const SubmitNewPrice = async (id) => {
        if (newprice === "") {
            seterror2(true)
            setmessage2('Please fill all the fields')
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/SubmitNewPrice`, {
                id,
                newprice,
            })
            if (res.data.message === 'There is an internal error') {
                seterror2(true)
                setmessage2('There is an internal error')
            } else if (res.data.message === 'updated') {
                setNew(true)
                setaddfacility(false)
                setaddform(false)
                setupdateprice(false)
                setopenfacility(false)
                setwarn(false)
            }

        } catch (err) {
            console.log('There is an internal error')
        }
    }

    // DELETE PACKAGE
    // display warning
    const [id1, setid1] = useState("")
    const displayWarn = (id1) => {
        setwarn(true)
        setopenfacility(false)
        setNew(false)
        setaddfacility(false)
        setaddform(false)
        setupdateprice(false)
        setid1(id1)
    }
    const [error3, seterror3] = useState(false)
    const [message3, setmessage3] = useState("")
    const deletePackage = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/deletePackage/${id1}`)
            if(res.data.message === 'There is an internal error') {
                seterror3(true)
                setmessage3('There is an internal error')
            }else {
                setNew(true)
                setwarn(false)
                setopenfacility(false)
                setaddfacility(false)
                setaddform(false)
                setupdateprice(false)
            }
        }catch(err) {
            console.log(err)
        }

    }
    
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
            submitBasicDetails()
          }
    
          console.log("File uploaded successfully!");
          // Add any further handling of the response from the backend if needed.
    
        } catch (err) {
          console.log("There is an internal error", err);
        }
      }







    return (
        <div className="home-container" style={{ marginTop: '5%' }} >
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>

                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>Boarding Packages</p>
                </div>

                <div className="top-line">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={getProfilepicturepath("boarding_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
                </div>
            </div>

            <Box sx={{ width: '95%', marginTop: '10px', marginBottom: '10px', marginLeft: '35px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                <Tabs
                    variant="fullWidth"
                    aria-label="Tab Component"
                    indicatorColor="transparent"
                    sx={{ borderRadius: '10px' }}
                >
                    <Tab sx={{ backgroundColor: 'orange', color: 'white' }} label="Boarding House Packages" ></Tab>
                </Tabs>
            </Box>

            <div className="top-button-header">
                <Button variant="contained" sx={{ background: "black", ':hover': { backgroundColor: "black" } }} onClick={openForm}>Add New Package <AddIcon sx={{ marginLeft: '10px' }} /></Button>
                <Button variant="contained" sx={{ background: "black", ':hover': { backgroundColor: "black" } }} onClick={openFacilityForm}><AddIcon sx={{ marginRight: '10px' }} />Add Package Facilities</Button>
            </div>

            {new1 && (
                <div className="boarding-card-line" style={{ display: 'flex', flexDirection: 'column', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {details && details.map((menu, index) => (
                            <div className="boarding-card" style={{ backgroundColor: menu.color, marginRight: '1%' }}>

                                <div className="boarding-two-icon">
                                    <IconButton onClick={() => displayWarn(menu.package_id)}><DeleteIcon sx={{ color: 'red' }} /></IconButton>
                                </div>

                                <div>
                                    <Typography sx={{ color: 'white', fontSize: '35px', fontWeight: 'bold', position: 'absolute' }}>{menu.package_name}</Typography>
                                    <img
                                        src={menu.symbol === "" ? getProfilepicturepath("noimage.png") : getProfilepicturepath(menu.symbol)}
                                        alt={menu.package_name}
                                        style={{ height: '200px', width: 'auto' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '60px' }}>
                                    <Typography sx={{ color: 'black', fontSize: '55px', fontWeight: 'bold' }}>Rs. {menu.price} </Typography>
                                    <Typography sx={{ color: 'white', fontSize: '25px', fontWeight: 'bold', marginTop: '30px' }}>/ day</Typography>
                                </div>

                                <div>
                                    <Button sx={{ color: 'black', backgroundColor: 'white', ':hover': { backgroundColor: 'white' } }} onClick={() => viewFacilities(menu.package_id)}>View Facilities</Button>
                                </div>

                                <div style={{ marginTop: '3%', marginBottom: '1%' }}>
                                    <Button sx={{ color: 'white', backgroundColor: 'black', ':hover': { backgroundColor: 'black' } }} onClick={() => openChangePrice(menu.package_id)}>Change Price<EditIcon /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* add new packages - basic details */}
            {addform && (
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
                            <IconButton onClick={backfromadding}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '590px' }} /></IconButton>
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
                                label="Price (per day)"
                                placeholder="price"
                                type="number"
                                multiline
                                onChange={(e) => setprice(e.target.value)}
                                sx={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField
                                id="outlined-textarea"
                                label="Color (#hexa value)"
                                placeholder="color"
                                multiline
                                onChange={(e) => setcolor(e.target.value)}
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
                                <Typography sx={{color:'black'}}>{selectfile.name}</Typography>

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

            {/* add packages facilities */}
            {addfacility && (
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
                            <IconButton onClick={backfromadding}><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '590px' }} /></IconButton>
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

            {/*  view package facilities */}
            {openfacility && (
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
                            <IconButton onClick={backfromadding}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
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

            {/* update price form */}
            {updateprice && (
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
                            <IconButton onClick={backfromadding}><CloseIcon sx={{ color: 'white', backgroundColor: 'red' }} /></IconButton>
                        </div>

                        <div style={{ marginBottom: '2%' }}>

                            <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'black' }}> Update Package Price</Typography>
                            <hr />
                        </div>

                        {getprice && getprice.map((menu, index) => (
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

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                                    <Button variant="contained" sx={{ background: "orange", marginTop: '1%', marginLeft: '30%', ':hover': { backgroundColor: "#fe9e0d" }, width: '40%' }} onClick={() => SubmitNewPrice(menu.package_id)}>Submit</Button>
                                </div>
                            </>
                        ))}
                    </FormControl>
                </div>
            )}

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
                                <Button onClick={backfromadding} sx={{ backgroundColor: 'red', color: 'white', margin: '10px', ':hover': { backgroundColor: 'red' } }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div >
    )
}

export default Packages
