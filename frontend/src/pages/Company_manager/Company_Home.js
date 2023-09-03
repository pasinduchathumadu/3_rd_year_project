import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ProfilePicture from "../../assests/profile-picture.png";
import PetsIcon from "@mui/icons-material/Pets";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { PieChart } from '@mui/x-charts/PieChart';
import AssessmentIcon from '@mui/icons-material/Assessment';



const Company_Home = () => {
  // drop down
  const [time, setTime] = React.useState("1");

  const handleCardClick = () => {
    // Perform an action when the card is clicked
    console.log("Card clicked!");
  };

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
            08 August 2023
          </Typography>
        </Box>
        <Stack justifyContent="center" alignItems="center">
          <Typography color="textPrimary" fontWeight="bold" fontSize={"25px"}>
            Dasboard
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <NotificationsIcon className="bell-icon" />
          <img
            src={ProfilePicture}
            alt="profilepicture"
            className="boarding-profile-picture" />
        </Stack>
      </Stack>

      <Box sx={{ backgroundColor: "#f0f0f5", marginBottom: '20px' }}>
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

          <Box sx={{ minWidth: 10 }}>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={time}
                variant="filled"
                label="Time"
                l
                sx={{ fontSize: "12px", marginRight: "50px", width: "150px", marginTop: '20px' }}>
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={2}>Last 7 days</MenuItem>
                <MenuItem value={3}>Last Months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={15}
          justifyContent="center"
          alignItems="center">
          <Box sx={{ width: "200px", height: '150px' }}>
            <Card variant="outlined" sx={{backgroundColor:"orange", borderRadius:'10px'}}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center">
                  <PetsIcon sx={{ color: "white", marginRight: "5px" }} />
                  <Typography sx={{ fontSize: 14, fontWeight:'bold' }} color="text.secondary">
                    Incoming Competitions
                  </Typography>
                </Stack>

                <Typography
                  fontWeight="bold"
                  variant="h3"
                  component="div"
                  align="center">
                  10
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ width: "200px", height: '150px' }}>
            <Card variant="outlined" sx={{backgroundColor:"orange", borderRadius:'10px'}}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center">
                  <PetsIcon sx={{ color: "white", marginRight: "5px" }} />
                  <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary">
                    Pending Blogs Verifications
                  </Typography>
                </Stack>
                <Typography
                  fontWeight="bold"
                  variant="h3"
                  component="div"
                  align="center">
                  4
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ width: "200px", height: '150px' }}>
            <Card variant="outlined" sx={{backgroundColor:"orange", borderRadius:'10px'}}>
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems="center">
                  <PetsIcon sx={{ color: "white", marginRight: "5px" }} />
                  <Typography sx={{ fontSize: 14, fontWeight:'bold' }} color="text.secondary">
                    Pending Clients Complaints
                  </Typography>
                </Stack>
                <Typography
                  fontWeight="bold"
                  variant="h3"
                  component="div"
                  align="center">
                  2
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <div className="boarding-wrapper" style={{ backgroundColor: 'white', height: '300px' }}>
          <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <AssessmentIcon sx={{ marginRight: '10px', color: 'orange' }} />
              <Typography style={{  fontSize: 14, color:"text.secondary"}}>Clients Blogs Verification</Typography>
            </div>
          </div>

          <div>
            <PieChart
              colors={['#FBBD08', '#55555C']}
              series={[
                {
                  data: [
                    { id: 0, value: 15, label: 'Pending' },
                    { id: 1, value: 25, label: 'Completed' },
                  ],
                },
              ]}
              width={600}
              height={200}
            />
          </div>
        </div>

        <div className="boarding-wrapper" style={{ backgroundColor: 'white', height: '300px' }}>
          <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <AssessmentIcon sx={{ marginRight: '10px', color: 'orange' }} />
              <Typography style={{  fontSize: 14, color:"text.secondary"}}> Clients Categorize Analyse</Typography>
            </div>
          </div>

          <div>
            <PieChart
              colors={['#FBBD08', '#55555C']}
              series={[
                {
                  data: [
                    { id: 0, value: 15, label: 'Premium' },
                    { id: 1, value: 25, label: 'Regular' },
                  ],
                },
              ]}
              width={600}
              height={200}
            />
          </div>
        </div>
        </div>


      </Box>
    </Box>
  );
};

export default Company_Home;
