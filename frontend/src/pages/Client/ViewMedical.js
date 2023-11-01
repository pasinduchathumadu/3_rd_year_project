import { FormControl, Typography, TextField, Avatar, Card, CardContent, CardActionArea, CardMedia, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BackgroundImage from '../../assests/medical-reports.jpeg';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ViewMedical = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const email = localStorage.getItem("client_email")
    const [main, setmain] = useState(true)
    const [open, setopen] = useState(false)

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

    // open vaccination records form
    const [id, setid] = useState("")

    const openVaccination = (id) => {
        setmain(false)
        setopen(true)
        setid(id)
        console.log(id)
    }
    // display records
    const [details, setdetails] = useState("")
    const displayRecords = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/pet_care/user/displayRecords/${id}`)
            const data = await res.data
            return data
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        displayRecords()
            .then((data) => setdetails(data.data))
            .catch((err) => console.log(err))
    })

    // close 
    const closeForm = () => {
        setmain(true)
        setopen(false)
    }

    return (
        <>
            {main && (
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
                                                    <Button sx={{ backgroundColor: 'black', color: 'white', ':hover': { backgroundColor: 'black' }, marginLeft: '25%' }} onClick={() => openVaccination(menu.pet_id)}>Past Records</Button>
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
            )}

            {open && (
                <div style={{
                    backgroundColor: '#f0f0f5',
                    paddingLeft: '2%',
                    paddingRight: '2%',
                    paddingTop: '1%',
                    paddingBottom: '2%',
                    marginLeft: '28%',
                    marginRight: '3%',
                    marginTop: '8%',
                    width: '40%',
                    borderRadius: '2%'
                }}
                >
                    <div style={{ marginLeft: '94%' }}>
                        <IconButton onClick={closeForm}><CloseIcon sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            marginLeft: '80%'
                        }} /></IconButton>
                    </div>

                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>Past Vaccination Records</Typography>
                    <hr />

                    <div style={{ marginBottom: '1%', marginTop: '1%', display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontWeight: 'bold', marginRight: '1%' }}>Pet ID: {id}  </Typography>
                    </div>
                    <hr />

                    <div style={{ marginBottom: '1%', marginTop: '2%', marginLeft: '5%' }}>
                        <Table sx={{ width: '100%' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Vaccine ID</StyledTableCell>
                                    <StyledTableCell align="center">Vaccine </StyledTableCell>
                                    <StyledTableCell align="center">Date</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {details && details.map((menu, index) => (
                                    <StyledTableRow>
                                        <StyledTableCell align="center">{menu.vaccine_id}</StyledTableCell>
                                        <StyledTableCell align="center">{menu.name}</StyledTableCell>
                                        <StyledTableCell align="center">{menu.vaccined_date}</StyledTableCell>
                                    </StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

        </>
    )

}

export default ViewMedical;