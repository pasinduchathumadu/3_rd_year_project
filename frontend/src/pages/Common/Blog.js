import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, TextField, Paper, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { MenuList } from "../../components/data/data";
import Header from "../../components/Layout/Header";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import dog from '../../assests/dog3.jpg'
import dog1 from '../../assests/pic.jpg'
import dog2 from '../../assests/dog.jpg'
import logo from '../../assests/logo.png'
const Blog = () => {
    const [like, setLike] = useState(0);
    const [formIndex, setFormIndex] = useState(null);
    const [show, setShow] = useState(false);
    const [icon, seticon] = useState(false)
    const [dogBackground, setDogBackground] = useState(dog)

    const handleIncrease = () => {
        setLike((prevLikes) => prevLikes + 1);
    };
    useEffect(() => {
        // Change the background image every 2 minutes
        const interval = setInterval(() => {
            setDogBackground((prevBackground) => {
                if (prevBackground === dog) {
                    return dog1;
                } else if (prevBackground === dog1) {
                    return dog2;
                } else {
                    return dog;
                }
            });
        }, 1200); // 2 minutes in milliseconds

        return () => {
            clearInterval(interval); // Cleanup the interval on component unmount
        };
    }, []);

    const all_function = (index) => {
        handleIncrease()
        seticon(index)
    }

    const showForm = (index) => {
        setFormIndex(index);
        setShow(true);
    };

    const date = new Date();
    const dateJoined = date.toDateString();

    return (
        <>
            <Header />
            <Box sx={{ width: '100%', height: '70vh', backgroundImage: `url(${dogBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ display: 'flex', alignItems: 'center',paddingLeft:'30%',paddingTop:'4%' }}>
            <img
                style={{ width: '100px', height: '100px',display:'inline',}}
                src={`${logo}`}

                alt={"logo"}
                loading="lazy"
            />
            <Typography sx={{ display:'inline',  fontSize: '36px', fontFamily: 'inherit', fontWeight: 'bold' }}>Happy Tails Blog Area</Typography>
            </div>
            <Grid sx={{ marginTop: '150px' }}>
                {MenuList.map((menu, index) => (
                    <Card

                        key={menu.id}
                        sx={{
                            marginRight: '25%',
                            marginLeft: '25%',
                            maxWidth: "100%",
                            border: "10px",
                            borderRadius: '10px',
                            marginTop: '35px',
                        }}
                    >
                        <CardActionArea>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: show && formIndex === index ? '70%' : '100%' }}>
                                    <CardMedia
                                        sx={{ height: "400px" }}
                                        component={"img"}
                                        src={menu.image}
                                        alt={menu.name}
                                    />
                                </div>
                                {show && formIndex === index && (
                                    <div style={{ width: '50%', marginTop: '5px', marginLeft: '3px', marginRight: '3px', height: 'auto' }}>
                                        <Paper >
                                            <Typography>

                                                <Stack direction="row" spacing={2}>
                                                    <Avatar>H</Avatar><Typography sx={{ paddingTop: '10px' }}>HHHHH</Typography></Stack>
                                            </Typography>
                                        </Paper>
                                    </div>
                                )}
                            </div>
                            <CardContent>
                                <Typography variant="h5" gutterBottom component={"div"}>
                                    {menu.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ marginTop: 'auto' }}>
                            <IconButton color="primary" onClick={() => all_function(index)}>
                                <ThumbUpIcon />
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '10px' }}>
                                    {icon === index && (
                                        like
                                    )}

                                </Typography>
                            </IconButton>
                            <IconButton color="primary">
                                <FavoriteIcon />
                            </IconButton>
                            <TextField
                                id="outlined-basic"
                                placeholder="Comment here......."
                                variant="outlined"
                                size="small"
                                sx={{ width: '35%', marginLeft: '25px', borderRadius: '90px' }}
                            />
                            <IconButton onClick={() => showForm(index)}>
                                <SendIcon />
                            </IconButton>
                            <Grid sx={{ paddingLeft: '10%' }}>{dateJoined}</Grid>
                        </CardActions>
                    </Card>
                ))}
            </Grid>
        </>
    );
};

export default Blog;
