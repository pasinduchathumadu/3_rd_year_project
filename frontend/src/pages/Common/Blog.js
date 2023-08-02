import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, TextField, Paper, Box, Tab, Tabs, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { ListItem } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import AlarmIcon from '@mui/icons-material/Alarm';
import Header from "../../components/Layout/Header";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import dog from '../../assests/dog3.jpg'
import dog1 from '../../assests/pic59.jpg'
import dog2 from '../../assests/pic56.webp'
import logo from '../../assests/logo.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios"
const Blog = () => {
    const [blog, setblog] = useState("")
    const [old_comments, get_comment] = useState("")
    const [like, setLike] = useState(0)
    const [id, setid] = useState(null)
    const [comments, setcomment] = useState(null)
    const [value, setValue] = useState(0);
    const [formIndex, setFormIndex] = useState(null);
    const [show, setShow] = useState(false)
    const [icon, seticon] = useState(false)
    const [dogBackground, setDogBackground] = useState(dog)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getImageSrc = (imageName) => {
        return require(`../../assests/${imageName}`)
    };
    const handleIncrease = () => {
        setLike((prevLikes) => prevLikes + 1);
    };

    const Submit = async (id) => {

        try {
            const res = await axios.post("http://localhost:5000/pet_care/common/comment", {
                id,
                comments
            })
            if (res.data.message !== 'There is an internel error') {
                getrequest(id)
            }
        } catch (err) {
            console.log("There is an internal error")
        }
    }

    const sendrequest = async () => {
        const res = await axios.get("http://localhost:5000/pet_care/common/blog").catch((err) => console.log(err))
        const data = await res.data;
        return data;

    }

    const getrequest = async (id) => {
        const res = await axios.get(`http://localhost:5000/pet_care/common/comment/${id}`).catch((err) => console.log(err))
        const data = await res.data;
        get_comment(data.data)

    }

    useEffect(() => {

        sendrequest().then((data) => setblog(data.data)).catch((err) => console.log(err));

    }, [])


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

    const showForm = (index, id) => {
        setid(id)
        Submit(id)

        setFormIndex(index);
        setShow(true);
    };

    const closeapp = (index) => {
        setcomment("")
        setFormIndex(index)
        setShow(false)

    }

    const date = new Date();
    const dateJoined = date.toDateString();

    return (
        <>
            <Header />
            <Box sx={{ width: '100%', height: '80vh', backgroundImage: `url(${dogBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '35%', paddingTop: '4%' }}>
                <img
                    style={{ width: '100px', height: '100px', display: 'inline', }}
                    src={`${logo}`}

                    alt={"logo"}
                    loading="lazy"
                />
                <Typography sx={{ display: 'inline', fontSize: '36px', fontFamily: 'inherit', fontWeight: 'bold' }}>Happy Tails Blog Area</Typography>
            </div>
            <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="Tab Component"
                    indicatorColor='transparent'
                    sx={{ borderRadius: '10px' }}

                >
                    <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Posts" />
                    <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="Company Notices" />
                </Tabs>

            </Box>
            <Grid sx={{ marginTop: '150px' }}>
                {blog && blog.map((menu, index) => (
                    <Card


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
                                <div style={{ width: show && formIndex === index ? '60%' : '100%' }}>
                                    <CardMedia
                                        sx={{ height: "400px" }}
                                        component={"img"}
                                        src={getImageSrc(menu.image)}
                                        alt={menu.description}
                                    />
                                </div>
                                {show && formIndex === index && (
                                    <div style={{ width: '50%', marginTop: '5px', marginLeft: '3px', marginRight: '3px', height: 'auto' }}>
                                        <Paper >
                                            <Typography>

                                                <Stack direction="row" spacing={2}>
                                                    <Typography sx={{ paddingTop: '10px', paddingBottom: '5px' }}>{old_comments && old_comments.map((com, index) => (
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ display: 'inline',marginBottom:'5px' }}>
                                                                <Avatar>H</Avatar>
                                                            </div>
                                                            <div style={{ display: 'inline', marginTop: '6px', marginLeft: '5px' }}>
                                                                <Typography>{com.comments}</Typography>
                                                            </div>
                                                        </div>

                                                    ))}</Typography></Stack>
                                            </Typography>
                                        </Paper>
                                    </div>
                                )}
                            </div>
                            <CardContent>
                                <Typography variant="h4" gutterBottom component={"div"} sx={{ color: 'red' }} >
                                    {menu.name}
                                </Typography>
                                <List>
                                    <ListItem sx={{ display: 'inline' }}>

                                        <div style={{ display: 'flex' }}>
                                            <TodayIcon />
                                            <Typography sx={{ paddingLeft: '5px' }}>
                                                {menu.posted_date}
                                            </Typography>

                                        </div>

                                        <div style={{ display: 'flex', marginTop: '15px' }}>
                                            <AlarmIcon />


                                            <Typography sx={{ paddingLeft: '5px' }}>
                                                {menu.posted_time}
                                            </Typography>


                                        </div>

                                    </ListItem>

                                </List>
                                <ListItem>

                                </ListItem>
                                <Typography variant="h6" gutterBottom component={"div"} >
                                    {menu.description}
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
                                <FavoriteIcon sx={{ color: 'red' }} />
                            </IconButton>
                            <TextField
                                id="outlined-basic"
                                placeholder="Comment here......."
                                variant="outlined"
                                size="small"
                                onChange={(e) => setcomment(e.target.value)}

                                sx={{ width: '35%', marginLeft: '25px', borderRadius: '90px' }}
                            />
                            <IconButton onClick={() => showForm(index, menu.post_id)}>
                                <SendIcon sx={{ color: 'black' }} />
                            </IconButton>
                            <IconButton onClick={() => closeapp(index)}>
                                <ArrowBackIosIcon sx={{ color: 'black' }} />
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
