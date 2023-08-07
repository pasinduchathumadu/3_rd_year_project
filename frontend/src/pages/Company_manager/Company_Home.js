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

const Company_Home = () => {
  // drop down
  const [time, setTime] = React.useState("1");

  const handleCardClick = () => {
    // Perform an action when the card is clicked
    console.log("Card clicked!");
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" padding={2} sx={{marginTop:'4%'}}>
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
            Dasboar
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <NotificationsIcon className="bell-icon" />
          <img
            src={ProfilePicture}
            alt="profilepicture"
            className="boarding-profile-picture"
          />
        </Stack>
      </Stack>

      <div className="boarding-wrapper-main">
        <div
          className="boarding-wrapper"
          style={{
            backgroundColor: "orange",
            height: "100%",
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            spacing={15}
            mb={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <AnalyticsIcon />
              <Typography variant="h5" ml={2}>
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
                  sx={{ fontSize: "12px" }}
                >
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
            mb={5}
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ width: "250px" }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <PetsIcon sx={{ color: "orange", marginRight: "5px" }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Clients
                    </Typography>
                  </Stack>

                  <Typography
                    fontWeight="bold"
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    10
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: "250px" }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <PetsIcon sx={{ color: "orange", marginRight: "5px" }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Incoming Competitions
                    </Typography>
                  </Stack>
                  <Typography
                    fontWeight="bold"
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    10
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ width: "250px" }}>
              <Card variant="outlined">
                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <PetsIcon sx={{ color: "orange", marginRight: "5px" }} />
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      New Complaints
                    </Typography>
                  </Stack>
                  <Typography
                    fontWeight="bold"
                    variant="h3"
                    component="div"
                    align="center"
                  >
                    10
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Stack>

          <Box
            sx={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "20px",
            }}
          >
            <Stack justifyContent="center" mb={2}>
              <Typography variant="h5" ml={2}>
                Recent Competitions
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={15}
              justifyContent="center"
              alignItems="center"
            >
              <Box sx={{ minWidth: 275 }}>
                <Card
                  sx={{
                    maxWidth: 345,
                  }}
                >
                  <CardActionArea onClick={handleCardClick}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image="https://images.unsplash.com/photo-1581753418434-51c11169a3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={handleCardClick}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image="https://images.unsplash.com/photo-1581753418434-51c11169a3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
              <Box sx={{ minWidth: 275 }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={handleCardClick}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image="https://images.unsplash.com/photo-1581753418434-51c11169a3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Stack>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Company_Home;
