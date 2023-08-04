import React from "react";
import "../../styles/Company_manager/Home.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ProfilePicture from "../../assests/profile-picture.png";
import Box from "@mui/material/Box";
import PetsIcon from "@mui/icons-material/Pets";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TableRow, TableCell, Stack } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Company_Home = () => {
  // drop down
  const [time, setTime] = React.useState("1");

  return (
    <div className="home-container">
      <div className="top">
        <div className="top-line">
          <p>Company Manager</p>
          <p className="top-line-text">Today</p>
          <p class="top-line-text">08 August 2023</p>
        </div>
        <div className="top-line">
          <p style={{ fontSize: "20px", fontWeight: 1000, color: "black" }}>
            DashBoard
          </p>
        </div>

        <div className="top-line">
          <NotificationsIcon className="bell-icon" />
          <img
            src={ProfilePicture}
            alt="profilepicture"
            className="boarding-profile-picture"
          />
        </div>
      </div>

      {/* <div className="boarding-wrapper-main">
        <div
          className="boarding-wrapper"
          style={{
            backgroundColor: "orange",
            height: "30rem",
            width: "100%",
          }}
        >
          <div className="boarding-box-header">
            <AnalyticsIcon
              sx={{ marginRight: "10px", marginTop: "2px", color: "black" }}
            />
            <h3>Analytical Overview</h3>
            <Box sx={{ minWidth: 120, marginLeft: "315px" }}>
              <FormControl fullWidth>
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
          </div>

          <div className="boarding-wrapper-box-mian">
            <div
              className="boarding-wrapper-box"
              style={{ backgroundColor: "white" }}
            >
              <p style={{ fontWeight: "bold" }}>
                <PetsIcon sx={{ color: "orange", marginRight: "5px" }} />
                Current Boarding Pets
              </p>
              <h1
                style={{
                  fontWeight: "1000",
                  textAlign: "center",
                  fontSize: "40px",
                  color: "orange",
                }}
              >
                10
              </h1>
            </div>
            <div
              className="boarding-wrapper-box"
              style={{ backgroundColor: "white" }}
            >
              <p style={{ fontWeight: "bold" }}>
                <PetsIcon sx={{ color: "orange", marginRight: "5px" }} />
                Completed Requests
              </p>
              <h1
                style={{
                  fontWeight: "1000",
                  textAlign: "center",
                  fontSize: "40px",
                  color: "orange",
                }}
              >
                06
              </h1>
            </div>
          </div>
        </div>
      </div> */}
      <Stack sx={{ overflow: "auto"}}></Stack>
    </div>
  );
};

export default Company_Home;
