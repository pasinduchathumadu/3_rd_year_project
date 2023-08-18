import React, { useState } from "react";
import "../../styles/Boarding_house_manager/Home.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InventoryIcon from "@mui/icons-material/Inventory";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import ProfilePicture from "../../assests/profile-picture.png";
import Box from "@mui/material/Box";
import PetsIcon from "@mui/icons-material/Pets";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import TableViewIcon from "@mui/icons-material/TableView";

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

const Home = () => {
  // drop down
  const [time, setTime] = React.useState("1");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const [main, setmain] = useState(true);
  const [tables, setTables] = useState(false);
  // click on particualar request box
  const ClickRequest = () => {
    setmain(false);
    // setTables(true);
  };

  // finish viewing the details
  const FinishViewing = () => {
    setTables(false);
    setmain(true);
  };

  const input = new Date();
  const date = input.toDateString();


    return (
        <div className="home-container" style={{ marginTop: '6%' }}>
            <div className="top">
                <div className="top-line">
                    <p>Boarding House Manager</p>
                    <p className="top-line-text">Today</p>
                    <p class="top-line-text">{date}</p>
                </div>
                <div className="top-line">
                    <p style={{ fontSize: '20px', fontWeight: 1000, color: 'black' }}>DashBoard</p>
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

      <div className="boarding-wrapper-main">
        <div
          className="boarding-wrapper"
          style={{ backgroundColor: "orange", height: "250px" }}
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
                  onChange={handleChange}
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
                Completed Boarded Pets
              </p>
              <h1
                style={{
                  fontWeight: "1000",
                  textAlign: "center",
                  fontSize: "40px",
                  color: "orange",
                }}
              >
                04
              </h1>
            </div>
          </div>
        </div>

        <div
          className="boarding-wrapper"
          style={{ backgroundColor: "orange", height: "250px" }}
        >
          <div className="boarding-box-header">
            <AssignmentLateIcon
              sx={{ marginRight: "10px", marginTop: "2px", color: "black" }}
            />
            <h3>Pending Boarding Requests</h3>
          </div>
          {main && (
            <>
              <div>
                <div>
                  <Typography
                    sx={{
                      backgroundColor: "#F0F0F5",
                      borderRadius: "10px",
                      padding: "10px",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  >
                    Request ID: 1{" "}
                    <TableViewIcon
                      onClick={() => ClickRequest()}
                      sx={{ marginLeft: "500px" }}
                    />
                  </Typography>
                </div>

                <div>
                  <Typography
                    sx={{
                      backgroundColor: "#F0F0F5",
                      borderRadius: "10px",
                      padding: "10px",
                      width: "100%",
                      marginBottom: "5px",
                    }}
                  >
                    Request ID: 2{" "}
                    <TableViewIcon
                      onClick={() => ClickRequest()}
                      sx={{ marginLeft: "500px" }}
                    />
                  </Typography>
                </div>

            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper" style={{ backgroundColor: '#F0F0F5', height: '310px' }}>
                    <div className="boarding-box-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <AssessmentIcon sx={{ marginRight: '10px', marginTop: '2px', color: 'black' }} />
                            <h3 style={{ color: 'black' }}>Pets Cages Usage</h3>
                        </div>

                        <Box sx={{ minWidth: 120, marginLeft: '400px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div>
                    <PieChart
                            // colors={['#FBBD08', '#A6A6A6', '#55555C']}
                            colors={['#FBBD08', '#55555C']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 15, label: 'Reserved' },
                                        { id: 1, value: 25, label: 'Free' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={200}
                        />
                    </div>
                </div>


            <Box sx={{ minWidth: 120, marginLeft: "400px" }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  variant="filled"
                  label="Time"
                  onChange={handleChange}
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
          <div>
            <BarChart
              colors={["black"]}
              sx={{ marginBottom: "3%", backgroundColor: "#f0f0f5" }}
              xAxis={[
                {
                  id: "barCategories",
                  data: ["Cats", "Dogs"],


                        <Box sx={{ minWidth: 120, marginLeft: '400px' }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={time}
                                    variant='filled'
                                    label="Time"
                                    onChange={handleChange}
                                    l
                                    sx={{ fontSize: '12px' }}>
                                    <MenuItem value={1}>Today</MenuItem>
                                    <MenuItem value={2}>Last 7 days</MenuItem>
                                    <MenuItem value={3}>Last Months</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div>
                        <PieChart
                            colors={['#FBBD08', '#A6A6A6', '#55555C']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 15, label: 'Gold' },
                                        { id: 1, value: 20, label: 'Silver' },
                                        { id: 2, value: 10, label: 'Platinum' },
                                    ],
                                },
                            ]}
                            width={600}
                            height={200}
                        />
                    </div>
                    
                </div>

            </div>

            <Box sx={{ minWidth: 120, marginLeft: "400px" }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  variant="filled"
                  label="Time"
                  onChange={handleChange}
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
          <div>
            <PieChart
              colors={["#FBBD08", "#A6A6A6", "#55555C"]}
              series={[
                {
                  data: [
                    { id: 0, value: 15, label: "Gold" },
                    { id: 1, value: 20, label: "Silver" },
                    { id: 2, value: 10, label: "Platinum" },
                  ],
                },
              ]}
              width={600}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
