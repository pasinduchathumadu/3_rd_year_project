import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ProfilePicture from "../../assests/profile-picture.png";
import PetsIcon from "@mui/icons-material/Pets";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Stack } from "@mui/material";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { PieChart } from '@mui/x-charts/PieChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from "react-router";
import axios from "axios";

const Company_Home = () => {
  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  const date = new Date()
  const currentdate = date.toDateString();
  // drop down
  const [time, setTime] = React.useState("1");

  const handleCardClick = () => {
    // Perform an action when the card is clicked
    console.log("Card clicked!");
  };

  // count of incoming competitions
  const [com, setcom] = useState("")
  const incomingCompetitions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/incomingCompetitions`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    incomingCompetitions()
      .then((data) => setcom(data.data))
      .catch((err) => console.log(err))
  })

  // count of pending complaints
  const [complain, setcomplain] = useState("")
  const pendingComplains = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/pendingComplains`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    pendingComplains()
      .then((data) => setcomplain(data.data))
      .catch((err) => console.log(err))
  })

  // count of pending blogs verifications
  const [blog, setblog] = useState("")
  const pendingBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/pendingBlogs`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    pendingBlogs()
      .then((data) => setblog(data.data))
      .catch((err) => console.log(err))
  })

  // get counts of pet shop - pensing and sold pets
  const [shop, setshop] = useState("")
  const petShopCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/petShopCount`)
      const data = await res.data
      return data
    } catch (err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    petShopCount()
      .then((data) => setshop(data.data))
      .catch((err) => console.log(err))
  })

  // dashboard -  regular and premium counts
  const [clientcount, setclientcount] = useState("")
  const clientCount = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/company_manager/clientCount`)
      const data = await res.data
      return data
    }catch(err) {
      console.log('There is an internal error')
    }
  }
  useEffect(() => {
    clientCount()
    .then((data) => setclientcount(data.data))
    .catch((err) => console.log(err)) 
  })




  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        padding={1}
        sx={{ marginTop: "4%" }}>
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
            Dasboard
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <NotificationsIcon className="bell-icon" />
          <Button onClick={profile}><img src={getProfilepicturepath("company_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
        </Stack>
      </Stack>

      <Box sx={{ backgroundColor: "#f0f0f5", marginBottom: '1%', padding: '2%' }}>
        <Stack
          direction="row"
          spacing={15}
          justifyContent="space-between"
          alignItems="center">
          <Stack direction="row" justifyContent="center" alignItems="center">
            <AnalyticsIcon />
            <Typography variant="h6" ml={2} sx={{ fontWeight: 'bold' }}>
              Analytical Overview
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={15}
          justifyContent="center"
          alignItems="center">
          <Box sx={{ width: "15%", height: '10%' }}>
            <Card variant="outlined" sx={{ backgroundColor: "orange", borderRadius: '10px' }}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center">
                  <PetsIcon sx={{ color: "white", marginRight: "5px" }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary">
                    Incoming Competitions
                  </Typography>
                </Stack>

                {com && com.map((row, index) => (
                  <Typography
                    fontWeight="bold"
                    variant="h3"
                    component="div"
                    align="center">
                    {row.count}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ width: "15%", height: '10%' }}>
            <Card variant="outlined" sx={{ backgroundColor: "orange", borderRadius: '10px' }}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center">
                  <PetsIcon sx={{ color: "white", marginRight: "5px" }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary">
                    Pending Blogs Verifications
                  </Typography>
                </Stack>
                {blog && blog.map((row, index) => (
                  <Typography
                    fontWeight="bold"
                    variant="h3"
                    component="div"
                    align="center">
                    {row.count}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ width: "15%", height: '10%' }}>
            <Card variant="outlined" sx={{ backgroundColor: "orange", borderRadius: '10px' }}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center">
                  <PetsIcon sx={{ color: "white", marginRight: "5px" }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.secondary">
                    Pending Clients Complaints
                  </Typography>
                </Stack>
                {complain && complain.map((row, index) => (
                  <Typography
                    fontWeight="bold"
                    variant="h3"
                    component="div"
                    align="center">
                    {row.count}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>
        </Stack>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div className="boarding-wrapper" style={{ backgroundColor: 'white', height: '300px' }}>
            <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <AssessmentIcon sx={{ marginRight: '10px', color: 'orange' }} />
                <Typography style={{ fontSize: 14, color: "text.secondary", fontWeight: 'bold' }}>Pet Shop - Sold & Buy Pets</Typography>
              </div>
            </div>

            <div>
              {shop && shop.map((row, index) => (
                <PieChart
                  colors={['#FBBD08', '#55555C']}
                  series={[
                    {
                      data: [
                        { id: 0, value: row.pendingcount, label: 'Pending' },
                        { id: 1, value: row.soldcount, label: 'Sold' },
                      ],
                    },
                  ]}
                  width={600}
                  height={200}
                />
              ))}
            </div>
          </div>

          <div className="boarding-wrapper" style={{ backgroundColor: 'white', height: '300px' }}>
            <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <AssessmentIcon sx={{ marginRight: '10px', color: 'orange' }} />
                <Typography style={{ fontSize: 14, color: "text.secondary", fontWeight: 'bold' }}>Online Store - Client Categorization</Typography>
              </div>
            </div>

            <div>
              {clientcount && clientcount.map((menu,index) => (
              <PieChart
                colors={['#FBBD08', '#55555C']}
                series={[
                  {
                    data: [
                      { id: 0, value: menu.premiumCount, label: 'Premium' },
                      { id: 1, value: menu.regularCount, label: 'Regular' },
                    ],
                  },
                ]}
                width={600}
                height={200}
              />
              ))}
            </div>
          </div>
        </div>


      </Box>
    </Box>
  );
};

export default Company_Home;
