import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Stack, Button, Card, CardActionArea, CardContent, CardMedia, FormControl, MenuItem, Select } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";

const Company_Shop = () => {
    const date = new Date();
    const currentdate = date.toDateString();

    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
        navigate("/profile")
    }

    // get profile picture
    const getProfilepicturepath = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    const [clients, setClients] = React.useState('1');
    const handleChange = (event) => {
        setClients(event.target.value);

        petsViewing()
    };

    const [details, setdetails] = useState("");
    const petsViewing = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/company_manager/PetsViewing/${clients}`)
            setdetails(res.data.data)
            // return res.data
        } catch (err) {
            console.log(err)
            console.log(clients)
        }
    }
    useEffect(() => {
        petsViewing()        
    }, [clients, petsViewing]);

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                padding={2}
                sx={{ marginTop: "4%" }}
            >
                <Box>
                    <Typography variant="inherit" color="textSecondary">
                        Company Manager
                    </Typography>
                    <Typography variant="inherit" color="textSecondary">
                        Today
                    </Typography>
                    <Typography variant="inherit" color="textSecondary">
                        {currentdate}
                    </Typography>
                </Box>
                <Stack justifyContent="center" alignItems="center">
                    <Typography color="textPrimary" fontWeight="bold" fontSize={"25px"}>
                        Pet Shop
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <NotificationsIcon className="bell-icon" />
                    <Button onClick={profile}><img src={getProfilepicturepath("company_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
                </Stack>
            </Stack>

            <>
                <Box sx={{ width: '12%', marginLeft: '82%' }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            variant='filled'

                            onChange={handleChange}
                            l
                            sx={{ fontSize: '12px' }}>
                            <MenuItem value={1}>All</MenuItem>
                            <MenuItem value={2}>Pending</MenuItem>
                            <MenuItem value={3}>Sold</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ width: '98%', marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '10px', paddingRight: '10px', paddingLeft: '10px' }}>
                    <div style={{ marginLeft: '5%' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {details && details.map((menu, index) => (

                                <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{ minHeight: "300px" }}
                                            component={"img"}
                                            src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                                            alt="petImage" />
                                        <CardContent>
                                            <Typography variant="body2" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                                                Owner: {menu.email}
                                            </Typography>
                                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Rs.{menu.price}.00</Typography>
                                            <Typography variant="body2" sx={{ textAlign: 'center' }}>{menu.sex}</Typography>
                                            <Typography variant="body2" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.breed}</Typography>
                                            {menu.status === "sold" ? (
                                                <>
                                                    <hr />
                                                    <Button sx={{ backgroundColor: 'orange', color: 'white', ':hover': { backgroundColor: 'orange' }, marginTop: '1%', marginBottom: '1%', marginLeft: '30%', width: '40%' }}>Sold</Button>
                                                    <Typography variant="body2" gutterBottom component={"div"} sx={{ textAlign: 'center' }}>
                                                        Bought by: {menu.buy_email}
                                                    </Typography>
                                                </>
                                            ) : ""
                                            }
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Box>
            </>
        </>
    )

}
export default Company_Shop;