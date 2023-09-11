import { Alert, AlertTitle, Avatar, Box, Button, Card, CardActionArea,  CardContent, CardMedia, Grid, List, ListItem, MenuItem, Paper, Select, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NotificationsIcon from '@mui/icons-material/Notifications';
import profile from "../../assests/pic12.jfif";
import TodayIcon from '@mui/icons-material/Today';
import AlarmIcon from '@mui/icons-material/Alarm';

import axios from 'axios';

function AddBlog() {
  
   

    const input = new Date();
    const date = input.toDateString();
    const [old_comments, get_comment] = useState("")
    const [value, setValue] = useState(0);
   
    const [blog, setblog] = useState("")
    const [Categories, setcategories] = useState("")
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)
    const [selectfile, setfile] = useState(null)
    const [update_message, setupdate_message] = useState(false)
    const [update_error, setupdate_error] = useState(false)
    const [description ,setdescription ] = useState("")
    const [title , settitle ] = useState("")
  
    const [author , setpublisher] = useState("")
    const [image, setimage] = useState("")
    const [show, setShow] = useState(false)
    const [formIndex, setFormIndex] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    };
    const email = localStorage.getItem('client_email')
    const handlefilechange = async (event) => {
        const file = event.target.files[0]
        setfile(file)
        setimage(file.name)
    }
    const second = (event) => {
        setcategories(event.target.value)
    }
   
   
    const finalfunction = async()=>{
        try{
            const res = await axios.get(`http://localhost:5000/pet_care/common/myblog/${email}`)
            setblog(res.data.data)

        }catch(err){
            console.log(err)

        }
    }

    useEffect(()=>{
        finalfunction()
    })

   
    const submit = async()=>{
        try{
            const res = await axios.post('http://localhost:5000/pet_care/user/blog_post',{
                email,
                description,
                title,
                Categories,
                date,
                image
            })
            if (res.data.message === "Added") {
                setsuccess(true)
              }
              else {
                seterror(true)
              }

        }catch(err){
            console.log(err)
        }
    }
    const getImageSrc = (imageName) => {
        return require(`../../assests/${imageName}`)
    };
    const handleFileUpload = async () => {
        seterror(false)
        setsuccess(false)


        try {
            const formData = new FormData();
            formData.append("image", selectfile);

            const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.message === "File uploaded successfully") {
                submit()

            }

            console.log("File uploaded successfully!");
            // Add any further handling of the response from the backend if needed.

        } catch (err) {
            console.log("There is an internal error", err);
        }
    }

    return (
        <div>

            <Grid sx={{ marginTop: '4%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
                        <Typography>
                           Add Blog
                        </Typography>
                        <Typography>
                            Today
                        </Typography>

                        <Typography>
                            {date}
                        </Typography>

                    </div>
                    <div style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}>
                        <Typography sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
                            Happy Tails Blog Section <ShoppingCartIcon sx={{ fontSize: '48px' }} />
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <NotificationsIcon sx={{ marginTop: '1%' }} />
                        </div>
                        <div style={{ marginLeft: '1%' }}>
                            <Stack direction="row" spacing={2}>
                                <Avatar alt="Travis Howard" src={profile} sx={{ width: 60, height: 60 }} />
                            </Stack>

                        </div>

                    </div>
                </div>

                <Grid>
                    <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="Tab Component"
                            indicatorColor='transparent'
                            sx={{ borderRadius: '10px' }}

                        >
                            <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Add Blog" />
                            <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="My Blogs" />
                        </Tabs>

                    </Box>
                </Grid>
            </Grid>
            {value === 0 && (
                <>
                    {success && (
                        <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                <strong>YOU HAVE BEEN SUCCESSFULLY ADDED</strong>
                            </Alert>
                        </Stack>
                    )}
                    {update_message && (
                        <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                <strong>YOU HAVE BEEN SUCCESSFULLY UPDATED</strong>
                            </Alert>
                        </Stack>
                    )}
                    {error && (
                        <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
                            <Alert severity="error">
                                <AlertTitle>Warning</AlertTitle>
                                This is a warning alert — <strong>check it out!</strong>
                            </Alert>
                        </Stack>

                    )}
                    {update_error && (
                        <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
                            <Alert severity="error">
                                <AlertTitle>Warning</AlertTitle>
                                Cannot Updated — <strong>check it out!</strong>
                            </Alert>
                        </Stack>

                    )}
                    <div style={{ marginTop: '5%', marginLeft: '8%', marginRight: '12%', marginBottom: '5%', backgroundColor: '#f0f0f5', height: '700px' }}>
                        <div style={{ paddingLeft: '28%', paddingTop: '5%' }}>
                            <div style={{

                                height: "75vh",
                                width: "500px",
                                paddingLeft: '4%',
                                borderRadius: "10px",
                                backgroundColor: 'white'
                            }}>
                                <Grid container direction="column" component="form" >
                                    <Grid item sx={{ paddingTop: '29px' }}>
                                        <Typography>Blog Title:</Typography>
                                        <TextField variant="outlined" placeholder="Blog Title" onChange={(e)=>settitle(e.target.value)} size="small" required></TextField>
                                    </Grid>
                                    <Grid item sx={{ paddingTop: '20px' }}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ display: 'inline', width: '40%' }}>
                                                <Typography>Content Category:</Typography>
                                                <Select
                                                    labelId="demo-select-error-label"
                                                    id="demo-select-small"
                                                    size="small"
                                                    label="Product Item"
                                                    value={Categories}
                                                    sx={{ width: '100%' }}
                                                    onChange={second}
                                                    required
                                                >
                                                    <MenuItem value={10}>Health of Pets</MenuItem>
                                                    <MenuItem value={20}>Harassment of Pets</MenuItem>
                                                    <MenuItem value={20}>Charityable Posts</MenuItem>
                                                </Select>
                                            </div>
                                            <div style={{ display: 'inline', width: '40%', paddingLeft: '4%' }}>
                                                <Typography>Publish Date:</Typography>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    value={date}
                                                    InputProps={{ readOnly: true }}
                                                />
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item sx={{ paddingTop: '25px' }}>
                                        <Typography>Description:</Typography>
                                        <TextField variant="outlined" placeholder="Description" onChange={(e)=>setdescription(e.target.value)} size='medium' sx={{ width: '80%' }} required></TextField>
                                    </Grid>

                                    <Grid item sx={{ paddingTop: '25px' }}>
                                        <Typography>Publisher:</Typography>
                                        <TextField variant="outlined" placeholder="Author" size="small" onChange={(e)=>setpublisher(e.target.value)} sx={{ width: '80%' }} required></TextField>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ paddingTop: '20px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ display: 'inline' }}>
                                            <Button
                                                variant="contained"
                                                component="label"

                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload Image
                                                <input type="file" hidden onChange={handlefilechange} required />
                                            </Button>
                                        </div>
                                        <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                                            {selectfile && (
                                                <Typography>{selectfile.name}</Typography>

                                            )}
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item sx={{ paddingTop: '25px' }}>
                                    <Button sx={{ width: '80%', color: 'black', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={handleFileUpload} >Submit</Button>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {value === 1 &&(
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
                                  <Typography variant="h4" gutterBottom component={"div"} sx={{ color: 'black' }} >
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
                                  <Typography variant="h6" gutterBottom component={"div"} sx={{color:"#949494" ,fontSize:"15px"}} >
                                      {menu.description}
                                  </Typography>
                              </CardContent>
                          </CardActionArea>
                         
                      </Card>
                  ))}
              </Grid>
            )}

        </div>
    )
}

export default AddBlog