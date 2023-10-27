import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, TextField, Paper, Box, Tab, Tabs, List, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { ListItem } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import AlarmIcon from '@mui/icons-material/Alarm';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import dog from '../../assests/blog1.jpg';
import dog1 from '../../assests/blog2.jpg';
import dog2 from '../../assests/blog3.jpg';
import logo from '../../assests/logo.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import { da } from "date-fns/locale";

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [events_company , setevent] = useState([])
    const [oldComments, setOldComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hearts, setHearts] = useState([]);
    const [id, setId] = useState(null);
    const [comments, setComments] = useState(null);
    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(10);
    const [formIndex, setFormIndex] = useState(null);
    const [show, setShow] = useState(false);
    const [icon, setIcon] = useState([]);
    const [icon1, setIcon1] = useState([]);
    const [clickButton, setClickButton] = useState([]);
    const [clickButton1, setClickButton1] = useState([]);
    const [dogBackground, setDogBackground] = useState(dog);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange1 = (event) => {
        setValue1(event.target.value);
    };

    var filterCondition = "";

    if (value1 === 10) {
        filterCondition = "Health of Pets";
    } else if (value1 === 20) {
        filterCondition = "Harassment of Pets";
    } else if (value1 === 30) {
        filterCondition = "Charitable Posts";
    }

    const getImageSrc = (imageName) => {
        return require(`../../assests/${imageName}`);
    };

    const handleIncrease = (index) => {
        const newLikes = [...likes];
        newLikes[index] += 1;
        setLikes(newLikes);
        likefunc(newLikes[index], index + 1);
    };

    const handleIncrease1 = (index) => {
        const newHearts = [...hearts];
        newHearts[index] += 1;
        setHearts(newHearts);
        heartfunc(newHearts[index], index + 1);
    };

    const handleDecrease1 = (index) => {
        const newHearts = [...hearts];
        newHearts[index] -= 1;
        setHearts(newHearts);
        heartfunc(newHearts[index], index + 1);

    };

    const handleDecrease = (index) => {
        const newLikes = [...likes];
        newLikes[index] -= 1;
        setLikes(newLikes);
        likefunc(newLikes[index], index + 1);
    };
    const events = async()=>{
        try{
            const res = await axios.get('http://localhost:5000/pet_care/common/event')
            const data = await res.data
            return data;

        }catch(err){
            console.log(err);
        }
    }
    const heartfunc = async (hearts, index) => {
        try {
            const res = await axios.post('http://localhost:5000/pet_care/common/heartfunc', {
                hearts,
                index
            });
        } catch (err) {
            console.log(err);
        }
    };

    const likefunc = async (likes, index) => {
        try {
            const res = await axios.post('http://localhost:5000/pet_care/common/likefunc', {
                likes,
                index
            });
        } catch (err) {
            console.log(err);
        }
    };

    const Submit = async (id, postIndex) => {
        try {
            const res = await axios.post("http://localhost:5000/pet_care/common/comment", {
                id,
                comments
            });

            if (res.data.message !== 'There is an internal error') {
                getrequest(id, postIndex);
            }
        } catch (err) {
            console.log("There is an internal error");
        }
    };

    const sendrequest = async () => {
        const res = await axios.get("http://localhost:5000/pet_care/common/blog").catch((err) => console.log(err));

        const data = await res.data;

        return data;
    };

    const getrequest = async (id, postIndex) => {
        const res = await axios.get(`http://localhost:5000/pet_care/common/comment/${id}`).catch((err) => console.log(err));
        const data = await res.data;
        const newComments = [...oldComments];
        newComments[postIndex] = data.data;
        setOldComments(newComments);
    };
    useEffect(() => {
        events().then((data)=>{
            setevent(data.data)

        }).catch((err)=>console.log(err))

    })
    useEffect(() => {
        sendrequest().then((data) => {
            const initialLikes = data.data.map((post) => post.likes); // Initialize with likes data from API
            const initialHearts = data.data.map((post) => post.heart); // Initialize with hearts data from API
            const initialIcon = Array(data.data.length).fill(false);
            const initialIcon1 = Array(data.data.length).fill(false);
            const initialClickButton = Array(data.data.length).fill(true);
            const initialClickButton1 = Array(data.data.length).fill(true);

            console.log(initialLikes);

            setBlog(data.data);
            setLikes(initialLikes); // Set the likes state with the initialLikes array
            setHearts(initialHearts); // Set the hearts state with the initialHearts array
            setIcon(initialIcon);
            setIcon1(initialIcon1);
            setClickButton(initialClickButton);
            setClickButton1(initialClickButton1);
        }).catch((err) => console.log(err));
    }, []);

    useEffect(() => {
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
        }, 1200);

        return () => {
            clearInterval(interval); // Cleanup the interval on component unmount
        };
    }, []);

    const all_function = (index, postIndex) => {
        if (clickButton[postIndex]) {
            handleIncrease(index);
            const newIcon = [...icon];
            newIcon[postIndex] = index;
            const newClickButton = [...clickButton];
            newClickButton[postIndex] = false;
            setIcon(newIcon);
            setClickButton(newClickButton);
        } else {
            handleDecrease(index);
            const newIcon = [...icon];
            newIcon[postIndex] = index;
            const newClickButton = [...clickButton];
            newClickButton[postIndex] = true;
            setIcon(newIcon);
            setClickButton(newClickButton);
        }
    };

    const all_function1 = (index, postIndex) => {
        if (clickButton1[postIndex]) {
            handleIncrease1(index);
            const newIcon1 = [...icon1];
            newIcon1[postIndex] = index;
            const newClickButton1 = [...clickButton1];
            newClickButton1[postIndex] = false;
            setIcon1(newIcon1);
            setClickButton1(newClickButton1);
        } else {
            handleDecrease1(index);
            const newIcon1 = [...icon1];
            newIcon1[postIndex] = index;
            const newClickButton1 = [...clickButton1];
            newClickButton1[postIndex] = true;
            setIcon1(newIcon1);
            setClickButton1(newClickButton1);
        }
    };

    const showForm = (index, id, postIndex) => {
        setId(id);
        Submit(id, postIndex);
        setFormIndex(index);
        setShow(true);
    };

    const closeApp = (index, postIndex) => {
        setComments("");
        setFormIndex(index);
        setShow(false);
    };

    const date = new Date();
    const dateJoined = date.toDateString();

    return (
        <>
       
            <Box sx={{ width: '100%', height: '80vh', backgroundImage: `url(${dogBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.7s ease-in-out' }} />
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
                    <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="Competitions" />
                </Tabs>
            </Box>
            {value === 0 &&(
                 <Grid sx={{ marginTop: '4%', marginBottom: '10%' }}>
                 <Box sx={{ minWidth: 100 }}>
                     <FormControl sx={{ width: '30%', marginLeft: '10%' }} >
                         <InputLabel id="demo-simple-select-label">Content</InputLabel>
                         <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={value1}
                             onChange={handleChange1}
                         >
                             <MenuItem value={10}>Health of Pets</MenuItem>
                             <MenuItem value={20}>Harassment of Pets</MenuItem>
                             <MenuItem value={30}>Charitable Posts</MenuItem>
                         </Select>
                     </FormControl>
                 </Box>
                 {blog.filter((menu, index) => menu.content === filterCondition).map((menu, index) => (
                     <React.Fragment key={menu.post_id}>
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
                                             <Paper>
                                                 <Typography>
                                                     <Stack direction="row" spacing={2}>
                                                         <Typography sx={{ paddingTop: '10px', paddingBottom: '5px' }}>
                                                             {oldComments[index] && oldComments[index].map((com, comIndex) => (
                                                                 <div style={{ display: 'flex' }} key={comIndex}>
                                                                     <div style={{ display: 'inline', marginBottom: '5px' }}>
                                                                         <Avatar>H</Avatar>
                                                                     </div>
                                                                     <div style={{ display: 'inline', marginTop: '6px', marginLeft: '5px' }}>
                                                                         <Typography>{com.comments}</Typography>
                                                                     </div>
                                                                 </div>
                                                             ))}
                                                         </Typography>
                                                     </Stack>
                                                 </Typography>
                                             </Paper>
                                         </div>
                                     )}
                                 </div>
                                 <CardContent>
                                     <Typography variant="h4" gutterBottom component={"div"} sx={{ color: 'black' }}>
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
                                     <Typography variant="h6" gutterBottom component={"div"} sx={{ color: "#949494", fontSize: "15px" }}>
                                         {menu.description}
                                     </Typography>
                                 </CardContent>
                             </CardActionArea>
                            
                             <CardActions sx={{ marginTop: 'auto' }}>
                         
 
                                 {clickButton[index] && (
                                     <IconButton color="primary" onClick={() => all_function(index, index)}>
                                         <ThumbUpIcon />
                                     </IconButton>
                                     
                                    
                                 )}
                                 
                               
                                 {!clickButton[index] && (
                                     <IconButton color="primary" onClick={() => all_function(index, index)}>
                                         <ThumbUpIcon />
                                     </IconButton>
                                 )}
                                   {likes[index]}
                                 {clickButton1[index] && (
                                     <IconButton color="primary" onClick={() => all_function1(index, index)}>
                                         <FavoriteIcon sx={{ color: 'red' }} />
                                        
                                     </IconButton>
                                 )}
                                 {!clickButton1[index] && (
                                     <IconButton color="primary" onClick={() => all_function1(index, index)}>
                                         <FavoriteIcon sx={{ color: 'red' }} />
                                        
                                     </IconButton>
                                 )}
                               
                                             {hearts[index]}
                                      
                                 <TextField
                                     id="outlined-basic"
                                     placeholder="Comment here......."
                                     variant="outlined"
                                     size="small"
                                     onChange={(e) => setComments(e.target.value)}
                                     sx={{ width: '35%', marginLeft: '25px', borderRadius: '90px' }}
                                 />
                                 <IconButton onClick={() => showForm(index, menu.post_id, index)}>
                                     <SendIcon sx={{ color: 'black' }} />
                                 </IconButton>
                                 <IconButton onClick={() => closeApp(index, index)}>
                                     <ArrowBackIosIcon sx={{ color: 'black' }} />
                                 </IconButton>
                                 <Grid sx={{ paddingLeft: '10%' }}>{dateJoined}</Grid>
                             </CardActions>
                         </Card>
                     </React.Fragment>
                 ))}
             </Grid>

            )}
            {value === 1 &&(
                  <Grid sx={{ marginTop: '150px' }}>
                  {events_company && events_company.map((menu, index) => (
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
                                          src={getImageSrc(menu.file)}
                                          alt={menu.description}
                                      />
                                  </div>
                                  {show && formIndex === index && (
                                      <div style={{ width: '50%', marginTop: '5px', marginLeft: '3px', marginRight: '3px', height: 'auto' }}>
                                          <Paper >
                                              <Typography>

                                                  <Stack direction="row" spacing={2}>
                                                    
                                                      </Stack>
                                              </Typography>
                                          </Paper>
                                      </div>
                                  )}
                              </div>
                              <CardContent>
                                  <Typography variant="h4" gutterBottom component={"div"} sx={{ color: 'black' }} >
                                      {menu.name}
                                  </Typography>
                                  <List>
                                      <ListItem sx={{ display: 'inline' }}>

                                          <div style={{ display: 'flex' }}>
                                              <TodayIcon />
                                              <Typography sx={{ paddingLeft: '5px' }}>
                                                Posted Date :  {menu.date}
                                              </Typography>

                                          </div>

                                          <div style={{ display: 'flex', marginTop: '15px' }}>
                                              <AlarmIcon />


                                              <Typography sx={{ paddingLeft: '5px' }}>
                                                Posted Time :  {menu.time}
                                              </Typography>


                                          </div>
                                          <div style={{ display: 'flex' }}>
                                           
                                              <Typography sx={{ paddingLeft: '5px',fontSize:'24px' }}>
                                                Entry Fee :  Rs.{menu.pay}
                                              </Typography>

                                          </div>

                                      </ListItem>

                                  </List>
                                  <ListItem>

                                  </ListItem>
                                  <Typography variant="h6" gutterBottom component={"div"} sx={{ color: "#949494", fontSize: "15px" }} >
                                      {menu.description}
                                  </Typography>
                              </CardContent>
                          </CardActionArea>

                      </Card>
                  ))}
              </Grid>
            )}
           
        </>
    );
};

export default Blog;
