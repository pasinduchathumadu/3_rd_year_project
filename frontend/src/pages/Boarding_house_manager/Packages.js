import React, { useEffect, useState } from "react";
import '../../styles/Boarding_house_manager/Home.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormLabel, TextField, Typography, IconButton } from "@mui/material";
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


const Packages = () => {
    const [new1, setNew] = useState(true);  //package cards
    const [form, setForm] = useState(false); //add new package form
    const [updateform, setUpdateform] = useState(false); //update form
    const [popularity, setPopularity] = useState(false); // popularity
    const [detailsbox, setdetailsbox] = useState(false) //details box of packages

    // view package basic details
    const [details, setdetails] = useState("")
    const BasicPackageDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/BasicPackageDetails`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        BasicPackageDetails()
            .then((data) => setdetails(data.data))
            .catch((err) => console.log(err))
    })

    // get package image 
    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // view package details box
    // const viewDetails = () => {
    //     setdetailsbox(true)
    //     setNew(false)
    // }
    // back from viewing facilities
    const backFromViewing = () => {
        setdetailsbox(false)
        setNew(true)
    }

    // get facilities of packages
    const [facility, setfacility] = useState("")
    const [error1, seterror1] = useState(false)
    const [messsage1, setmessage1] = useState("")

    const PackageFacilities = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/boarding_house_manager/PackageFacilities/${id}`)
            if (res.data.message === 'There is an internal error') {
                seterror1(true)
                setmessage1('There is an internal error')
            } else {
                setdetailsbox(true)
                setfacility(res.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // useEffect(() => {
    //     PackageFacilities()
    //     .then((data) => setfacility(data.data))
    //     .catch((err) => console.log(err))
    // })



    // after click on update icon
    const update = () => {
        setNew(false);
        setUpdateform(true);
    }
    // after click on submit button on update form
    const afterUpdate = () => {
        // check
        setNew(true);
        setUpdateform(false);
    }
    // click on cancel button ofupdate package
    const cancelUpdate = () => {
        setUpdateform(false);
        setNew(true);
    }

    // after click on view popularity
    const clickPopularity = () => {
        setNew(false);
        setPopularity(true);
    }

    // finish the viewing
    const afterview = () => {
        setNew(true);
        setPopularity(false);
    }
    const input = new Date();
    const date = input.toDateString();

    // view packages popularity
    const [pckg, setpckg] = useState("")
    const packageUsage = async () => {
        try {
            const res = await axios.get("http://localhost:5000/pet_care/boarding_house_manager/packageUsage")
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        packageUsage()
            .then((data) => setpckg(data.data))
            .catch((err) => console.log(err))
    })

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // ----- ADD NEW PACKAGES - ADD TEXT FIELDS ONE BY ONE
    const [textFields, setTextFields] = useState(['']); // Initialize with one empty text field

    // Function to add a new text field
    const addTextField = () => {
        setTextFields([...textFields, '']);
    };

    // Function to handle text field value changes
    const handleTextFieldChange = (index, event) => {
        const updatedTextFields = [...textFields];
        updatedTextFields[index] = event.target.value;
        setTextFields(updatedTextFields);
    };

    // Function to submit the form (you can implement your logic here)
    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the text field values
        const facilities = textFields.filter((facility) => facility.trim() !== "");
        console.log(textFields);
    };
    // ----

    // add new pacakge
    const AddPackageForm = () => {
        setNew(false)
        setForm(true)
    }

    // back without adding a package
    const cancelAdding = () => {
        setForm(false);
        setNew(true);
    }

    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [facilities, setfacilites] = useState([])
    const [error, seterror] = useState(false)
    const [message, setmessage] = useState("")

    const AddNewPackage = async () => {
        if (name === '' || price === '' || facilities === '') {
            seterror(true)
            setmessage('Please fill the filed')
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/pet_care/boarding_house_manager/AddNewPackage`, {
                name,
                price,
                facilities
            })
            if (res.data.message === 'There is an internal error') {
                setmessage('You cannot add this package')
                seterror(true)
            } else if (res.data.message === 'success') {
                setNew(true)
                setForm(false)
                seterror(false)
            }
        } catch (err) {
            console.log('There is an internal error')
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
                <Button variant="contained" onClick={AddPackageForm} sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>Add New Package <AddIcon sx={{ marginLeft: '10px' }} /></Button>
                <Button variant="contained" onClick={() => clickPopularity()} sx={{ background: "black", ':hover': { backgroundColor: "black" } }}>View Popularity</Button>
            </div>

            {new1 && (
                <div className="boarding-card-line" style={{ display: 'flex', flexDirection: 'column', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {details && details.map((menu, index) => (
                            <div className="boarding-card" style={{ backgroundColor: menu.color, marginBottom: '1%', marginRight: '1%' }}>
                                <div className="boarding-two-icon">
                                    <EditIcon onClick={() => update()} />
                                    <DeleteIcon color="error" sx={{ marginLeft: '15px' }} />
                                </div>
                                <div>
                                    <Typography sx={{ color: 'white', fontSize: '35px', fontWeight: 'bold', position: 'absolute' }}>{menu.package_name}</Typography>
                                    <img
                                        src={menu.symbol === "" ? getImageSrc("noimage.png") : getImageSrc(menu.symbol)}
                                        alt={menu.package_name}
                                        style={{ height: '200px', width: 'auto' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '60px' }}>
                                    <Typography sx={{ color: 'black', fontSize: '55px', fontWeight: 'bold' }}>Rs. {menu.price} </Typography>
                                    <Typography sx={{ color: 'white', fontSize: '25px', fontWeight: 'bold', marginTop: '30px' }}>/ day</Typography>
                                </div>
                                <div>
                                    <Button onClick={() => PackageFacilities(menu.package_id)} sx={{ color: 'black', backgroundColor: 'white', ':hover': { backgroundColor: 'white' } }}>View Facilities</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="boarding-card" style={{ backgroundColor: '#A6A6A6' }}>
                            <div className="boarding-card-facility">
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /> Foods with <b>normal brands</b> </p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /> Washing only</p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /> <b>No</b> air condition apply  </p>
                            </div>
                        </div>

                        <div className="boarding-card" style={{ backgroundColor: '#55555C' }}>
                            <div className="boarding-card-facility">
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} />Foods with <b>high brands</b></p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /><b>Free</b> washing with <b>high brands</b> ingrediants</p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /><b>Air conditional</b> apply</p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /><b>Free</b> spa</p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /><b>Comforting</b> medicine</p>
                            </div>
                        </div>

                        <div className="boarding-card" style={{ backgroundColor: '#FBBD08' }}>
                            <div className="boarding-card-facility">
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} />Foods  with <b>normal brands</b></p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /><b>Free </b> washing with <b>normal brand</b> ingrediants </p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /><b> Half Air conditional</b> apply</p>
                                <p><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} /> <b>Free</b> spa</p>
                            </div>
                        </div>

                    </div> */}
                </div>
            )}

            {/* add a new package */}
            {form && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                }}>
                    <FormControl sx={{
                        marginLeft: '10%',
                        borderRadius: '10px',
                        marginTop: '30%',
                        width: '700px',
                        padding: '20px',
                        backgroundColor: '#F0F0F5',
                        position: 'relative',
                        zIndex: 1001
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={cancelAdding} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
                            </div>
                            <div className="form-topic">
                                Add New Package
                            </div>
                            <hr />
                            <div style={{ marginTop: '20px' }} className="form-label">
                                <FormLabel>Package Name</FormLabel>
                                <TextField id="outlined-basic" placeholder="Package Name" variant="outlined" onChange={(e) => setname(e.target.value)} required />
                            </div>

                            <div className="form-label">
                                <FormLabel>Price(per day) Rs.</FormLabel>
                                <TextField id="outlined-basic" placeholder="Package Price" variant="outlined" type="number" onChange={(e) => setprice(e.target.value)} required />
                            </div>

                            <div className="form-label">
                                <FormLabel>Upload Bank Slip: </FormLabel>
                                <div style={{ display: 'inline' }}>
                                    <Button
                                        variant="contained"
                                        component="label"

                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Package Symbol
                                        <input type="file" style={{ width: '100%' }} hidden required />

                                    </Button>
                                </div>
                            </div>

                            {/* <div className="form-label">
                                <FormLabel>Facilities</FormLabel>
                                <TextField id="outlined-basic" placeholder="Facility 01" variant="outlined" sx={{ marginBottom: '5px' }} onChange={(e) => setFirst(e.target.value)} required />
                                <TextField id="outlined-basic" placeholder="Facility 02" variant="outlined" sx={{ marginBottom: '5px' }} onChange={(e) => setSecond(e.target.value)} required />
                                <TextField id="outlined-basic" placeholder="Facility 03" variant="outlined" sx={{ marginBottom: '5px' }} onChange={(e) => setThird(e.target.value)} required />
                                <TextField id="outlined-basic" placeholder="Facility 03" variant="outlined" sx={{ marginBottom: '5px' }} onChange={(e) => setFourth(e.target.value)} />
                                <TextField id="outlined-basic" placeholder="Facility 03" variant="outlined" sx={{ marginBottom: '5px' }} onChange={(e) => setFifth(e.target.value)} />
                            </div> */}
                            <div className="form-label">
                                <FormLabel>Facilities</FormLabel>
                                <form onSubmit={handleSubmit}>
                                    {textFields.map((text, index) => (
                                        <div key={index}>
                                            <TextField
                                                label={`Facility ${index + 1}`}
                                                value={text}
                                                onChange={(event) => handleTextFieldChange(index, event)}
                                                sx={{ marginBottom: '5px', width: '100%' }} />
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
                                        <Button sx={{ backgroundColor: 'black', color: 'white', borderRadius: '10px', ':hover': { backgroundColor: 'black' } }} onClick={addTextField}>
                                            <AddCircleIcon sx={{ color: 'white', marginRight: '10px' }} />Add New Facility
                                        </Button>
                                    </div>
                                    {/* <button type="submit">Submit</button> */}
                                </form>
                            </div>

                            <Button variant="contained" type="submit" onClick={() => AddNewPackage()} sx={{ background: "#fe9e0d", marginTop: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Add Package</Button>
                        </div>
                        {/* display error or success message  */}
                        {error && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{message}</Alert>
                            </Stack>
                        )}
                    </FormControl>
                </div>
            )}

            {/* update package */}
            {updateform && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                }}>
                    <FormControl sx={{
                        marginLeft: '10%',
                        borderRadius: '10px',
                        marginTop: '40%',
                        width: '700px',
                        padding: '20px',
                        backgroundColor: '#F0F0F5',
                        position: 'relative',
                        zIndex: 1001
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                            <div>
                                <IconButton onClick={cancelUpdate} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
                            </div>
                            <div className="form-topic">
                                Update Package
                                <hr />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div className="form-label">
                                    <FormLabel>Package ID : </FormLabel>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                disabled
                                                id="outlined-disabled"
                                                label=""
                                                defaultValue="02"
                                            /></div>

                                    </Box>
                                </div>
                                <div className="form-label">
                                    <FormLabel>Package Name : </FormLabel>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label=""
                                                defaultValue="Gold"
                                            /></div>

                                    </Box>
                                </div>
                            </div>

                            <div className="form-label">
                                <FormLabel>Price(per week) Rs.</FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            required
                                            type="number"
                                            id="outlined-required"
                                            label=""
                                            defaultValue="4000.00"
                                        /></div>

                                </Box>
                            </div>

                            <div className="form-label">
                                <FormLabel>Facilities</FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label=""
                                            defaultValue="Facility 01"
                                        /></div>

                                </Box>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label=""
                                            defaultValue="Facility 02"
                                        /></div>

                                </Box>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label=""
                                            defaultValue="Facility 03"
                                        /></div>

                                </Box>
                            </div>
                            <Button variant="contained" onClick={() => afterUpdate()} sx={{ background: "#fe9e0d", marginTop: '10px', marginRight: '10px', ':hover': { backgroundColor: "#fe9e0d" }, width: '100%' }}>Update Package</Button>
                        </div>
                    </FormControl>
                </div>
            )}


            {/* view popularity */}
            {popularity && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,
                }}>
                    <FormControl sx={{
                        marginLeft: '10%',
                        borderRadius: '10px',
                        marginTop: '30%',
                        width: '700px',
                        padding: '20px',
                        backgroundColor: '#F0F0F5',
                        position: 'relative',
                        zIndex: 1001
                    }}>
                        {pckg && pckg.map((pkrow, index) => (
                            <div>
                                <div>
                                    <IconButton onClick={afterview} ><CloseIcon sx={{ color: 'white', backgroundColor: 'red', marginLeft: '600px' }} /></IconButton>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Packages Popularity</Typography>
                                    <hr />
                                </div>

                                <div>
                                    <PieChart
                                        colors={['#FBBD08', '#A6A6A6', '#55555C']}
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: pkrow.gold, label: 'Gold' },
                                                    { id: 1, value: pkrow.silver, label: 'Silver' },
                                                    { id: 2, value: pkrow.platinum, label: 'Platinum' },
                                                ],
                                            },
                                        ]}
                                        width={600}
                                        height={300}
                                    />
                                </div>
                            </div>
                        ))}
                    </FormControl>
                </div>
            )}

            {/*  package details box  */}
            {detailsbox && (
                <div style={{
                    backdropFilter: 'blur(4px)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '300px',
                    zIndex: 1001,

                }}>
                    {facility && facility.map((menu, index) => (

                        <FormControl sx={{
                            marginLeft: '10%',
                            borderRadius: '10px',
                            marginTop: '3%',
                            width: '700px',
                            padding: '20px',
                            backgroundColor: menu.color,
                            position: 'relative',
                            zIndex: 1001
                        }}>
                            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '2%' }}>

                                <div>
                                    <IconButton onClick={backFromViewing}><CloseIcon sx={{ color: 'white', backgroundColor: "red", marginLeft: '590px' }} /></IconButton>
                                </div>
                                <Typography sx={{ marginLeft: '40%', fontWeight: 'bold' }}>{menu.package_name} Package Facilities</Typography>
                                <hr style={{ marginBottom: '1%' }} />
                                {menu.facilities.map((facility, findex) => (
                                    <p key={findex}><CheckCircleIcon sx={{ marginRight: '20px', color: 'green' }} />{facility}</p>
                                ))}
                            </div>
                        </FormControl>
                    ))}
                </div>
            )
            }
        </div >
    )
}

export default Packages
