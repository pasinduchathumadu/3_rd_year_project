import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfilePicture from "../../assests/profile-picture.png";
import { Stack, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Blogs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                padding={2}
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
                        Clients Blogs
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

            <Box sx={{marginLeft:'20px', marginRight:'20px'}}>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                variant="fullWidth"
                sx={{
                    "& .MuiTab-root": {
                        fontSize: "16px",
                        color: "black",
                        borderRadius: "10px",
                        "&:hover": {
                            backgroundColor: "#FFD580",
                        },
                    },
                    "& .Mui-selected": {
                        backgroundColor: "orange", // Change background color for selected tab
                        color: "black", // Change text color for selected tab
                        "&:hover": {
                            backgroundColor: "orange",
                        },
                    },
                }}
            >
                <Tab label="Pending Blogs" />
                <Tab label="Verified  Blogs" />
                <Tab label="Rejected  Blogs" />
            </Tabs>
            </Box>


        </>
    )
}

export default Blogs;