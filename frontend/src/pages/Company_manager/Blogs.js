import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    TextField,
    Paper,
    Box,
    Tab,
    Tabs,
    List,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import ThumbUpIcon from "@mui/icons-material/ThumbUpAltOutlined";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import SendIcon from "@mui/icons-material/Send";
  import { ListItem } from "@mui/material";
  import TodayIcon from "@mui/icons-material/Today";
  import AlarmIcon from "@mui/icons-material/Alarm";
  import NotificationsIcon from "@mui/icons-material/Notifications";
  import ProfilePicture from "../../assests/profile-picture.png";
  
  import Avatar from "@mui/material/Avatar";
  import Stack from "@mui/material/Stack";
  import dog from "../../assests/blog1.jpg";
  import dog1 from "../../assests/blog2.jpg";
  import dog2 from "../../assests/blog3.jpg";
  import logo from "../../assests/logo.png";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
  import axios from "axios";
  import { useNavigate } from "react-router";
  
  
  const Company_Blog = () => {
    const navigate = useNavigate("")
    // connect profile
    const profile = () => {
      navigate("/profile")
  }
  
    // get profile picture
    const getProfilepicturepath = (imageName) => {
      return require(`../../../../backend/images/store/${imageName}`)
  }
    const [blog, setblog] = useState("");
    const [id1 , setid1] = useState("");
    const [id ,setid] = useState("");
  
    const [formIndex, setFormIndex] = useState(null);
    const [show, setShow] = useState(false);
  
    const getImageSrc = (imageName) => {
      return require(`../../assests/${imageName}`);
    };
  
    const sendrequest = async () => {
      const res = await axios
        .get("http://localhost:5000/pet_care/company_manager/blog")
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
  
    useEffect(() => {
      sendrequest()
        .then((data) => setblog(data.data))
        .catch((err) => console.log(err));
    }, []);
  
    const update_blog = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/pet_care/company_manager/update_blog",
          {
            id,
          }
        );
        if (res.data.message === "Updated") {
          setOpen(false);
          sendrequest();
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const update_blog_reject = async () => {
     
      try {
        const res = await axios.post(
          "http://localhost:5000/pet_care/company_manager/update_blog_reject",
          {
            id1,
          }
        );
        if (res.data.message === "Rejected") {
          setOpen(false);
          sendrequest();
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };
    const date = new Date();
    const dateJoined = date.toDateString();
  
    const [open, setOpen] = React.useState(false);
    const [openReject, setOpenReject] = React.useState(false);
  
    const handleClickOpen = (update_id) => {
      setid(update_id)
      setOpen(true);
    };
  
    const handleClickOpenReject = (delete_id) => {
      setid1(delete_id)
      setOpenReject(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setOpenReject(false);
    };
  
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          padding={1}
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
              08 August 2023
            </Typography>
          </Box>
          <Stack justifyContent="center" alignItems="center">
            <Typography color="textPrimary" fontWeight="bold" fontSize={"25px"}>
              Blog Posts
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <NotificationsIcon className="bell-icon" />
            <Button onClick={profile}><img src={getProfilepicturepath("company_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
            {/* <img
              src={ProfilePicture}
              alt="profilepicture"
              className="boarding-profile-picture"
            /> */}
          </Stack>
        </Stack>
        <Grid>
          {blog &&
            blog.map((menu, index) => (
              <Card
                sx={{
                  marginRight: "30%",
                  marginLeft: "30%",
                  maxWidth: "100%",
                  border: "10px",
                  borderRadius: "10px",
                  marginTop: "35px",
                }}
              >
                <CardActionArea>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: show && formIndex === index ? "60%" : "100%",
                      }}
                    >
                      <CardMedia
                        sx={{ height: "300px" }}
                        component={"img"}
                        src={getImageSrc(menu.image)}
                        alt={menu.description}
                      />
                    </div>
                  </div>
                  <CardContent>
                    <Typography
                      variant="h4"
                      gutterBottom
                      component={"div"}
                      sx={{ color: "black" }}
                    >
                      {menu.name}
                    </Typography>
  
                    <Stack direction="row" justifyContent="space-between">
                      <div style={{ display: "flex" }}>
                        <TodayIcon />
                        <Typography sx={{ paddingLeft: "5px" }}>
                          {menu.posted_date}
                        </Typography>
                      </div>
                      <div style={{ display: "flex" }}>
                        <AlarmIcon />
  
                        <Typography sx={{ paddingLeft: "5px" }}>
                          {menu.posted_time}
                        </Typography>
                      </div>
                    </Stack>
                    <ListItem></ListItem>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component={"div"}
                      sx={{ color: "#949494", fontSize: "15px" }}
                    >
                      {menu.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center", marginTop: "auto" }}>
                  <Button
                    onClick={()=>handleClickOpenReject(menu.post_id)}
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                  >
                    Reject
                  </Button>
  
                  <Button
                    onClick={()=>handleClickOpen(menu.post_id)}
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }}
                  >
                    Accept
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Please Confirm ?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Note: Confirm to update the post status
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancle</Button>
                      <Button onClick={() => update_blog()}>
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
  
                  <Dialog
                    open={openReject}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Please Confirm ?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Note: Confirm to Reject the post status
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancle</Button>
                      <Button onClick={() => update_blog_reject()}>
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </>
    );
  };
  
  export default Company_Blog;