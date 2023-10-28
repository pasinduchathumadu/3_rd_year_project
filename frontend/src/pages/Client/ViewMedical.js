import { FormControl, Typography, TextField, Avatar, Card, CardContent, CardActionArea, CardMedia, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BackgroundImage from '../../assests/medical-reports.jpeg';
import PDFIcon from '../../assests/pdf.jpeg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProfilePhoto from '../../assests/oip.jpg';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import axios from 'axios';




const ViewMedical = () => {
    const email = localStorage.getItem("client_email")

    // get pet image from db
    const getImageSrc = (imageName) => {
        return require(`../../../../backend/images/store/${imageName}`)
    }

    // viewing pets
    const [viewpet, setviewpet] = useState("")
    const viewPets = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/viewPets/${email}`)
            const data = await res.data
            return data

        } catch (err) {
            console.log('There is an internal error')
        }
    }
    useEffect(() => {
        viewPets()
            .then((data) => setviewpet(data.data))
            .catch((err) => console.log(err))
    })

    return (
        <div style={{ marginTop: '4%' }}>
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "180px",
                width: "100%",
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                color: 'black'
            }}>
                <Typography sx={{ position: 'absolute', fontSize: '50px', fontWeight: 'bold', marginLeft: '10%' }}> Pets <span style={{ color: 'orange' }}> Vaccination </span> Records</Typography>
            </div>

            <div style={{ backgroundColor: '#f0f0f5', borderRadius: '10px', padding: '1%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {viewpet && viewpet.length > 0 ? (
                        viewpet.map((menu, index) => (

                            <Card sx={{ maxWidth: "300px", display: "flex", flexDirection: 'row', m: 2, border: "10px", borderRadius: '10px', marginTop: '35px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ minHeight: "300px" }}
                                        component={"img"}
                                        src={menu.image === "" ? getImageSrc("noimage.png") : getImageSrc(menu.image)}
                                        alt={menu.name} 
                                    />
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom component={"div"} sx={{ textAlign: 'center' }}><PetsIcon sx={{ color: 'orange' }} />
                                            {menu.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ textAlign: 'center' }}>{menu.sex}</Typography>
                                        <Typography variant="body2" sx={{ color: "red", marginBottom: '9px', textAlign: 'center' }}>{menu.breed}</Typography>
                                        <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, marginLeft: '25%' }}>Past Records</Button>
                                        </Stack>
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


           

            

        </div>
    )

}

export default ViewMedical;