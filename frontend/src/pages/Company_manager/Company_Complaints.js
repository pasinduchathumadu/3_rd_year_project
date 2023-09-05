import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfilePicture from "../../assests/profile-picture.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import axios from "axios";

function Company_Complaints() {
  const [compDes, setDescription] = useState("");
  const [compDate, setDate] = useState("");
  const [compTime, setTime] = useState("");
  const [com, setCom] = useState([]);

  const [error, seterror] = useState(false);
  const email = localStorage.getItem("store_email");
  const submit = async () => {
    if (compDes === null || compDate === null || compTime === null) {
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/pet_care/company_manager/add_complaint",
        {
          compDes,
          compDate,
          compTime,
          email,
        }
      );
      if (res.message === "successfully added") {
        seterror(true);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const date = new Date();
  const currentdate = date.toDateString();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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

  function createData(id, name, date) {
    return { id, name, date };
  }

  //new
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //get complaints
  const getComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/pet_care/company_manager/get_complaints"
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComplaints()
      .then((data) => setCom(data.data))
      .catch((err) => console.log(err));
  }, []);

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
            {currentdate}
          </Typography>
        </Box>
        <Stack justifyContent="center" alignItems="center">
          <Typography color="textPrimary" fontWeight="bold" fontSize={"25px"}>
            Complaints
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

      <Box padding={2}>
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
          <Tab label="Client's Complaints" />
          <Tab label="My Complaints" />
        </Tabs>
        {selectedTab === 0 && (
          <Box padding={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Complaint ID </StyledTableCell>
                    <StyledTableCell>Client ID </StyledTableCell>
                    <StyledTableCell>Complaint</StyledTableCell>
                    <StyledTableCell>Placed Date</StyledTableCell>
                    <StyledTableCell>Response</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {com &&
                    com.map((row) => (
                      <StyledTableRow key={row.complain_id}>
                        <StyledTableCell component="th" scope="row">
                          {row.complain_id}
                        </StyledTableCell>
                        <StyledTableCell>{row.complain_txt}</StyledTableCell>
                        <StyledTableCell>{row.complain_txt}</StyledTableCell>
                        <StyledTableCell>{row.com_date}</StyledTableCell>
                        <StyledTableCell>
                          <Button>Response</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {selectedTab === 1 && (
          <Box padding={2}>
            <Button
              onClick={handleClickOpen}
              sx={{
                color: "white",
                backgroundColor: "black",
                marginBottom: "10px",
                ":hover": { backgroundColor: "black" },
              }}
            >
              <AddIcon />
              Add New Complaint
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Complaint ID </StyledTableCell>
                    <StyledTableCell>Complaint</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {com &&
                    com.map((row) => (
                      <StyledTableRow key={row.complain_id}>
                        <StyledTableCell component="th" scope="row">
                          {row.complain_id}
                        </StyledTableCell>
                        <StyledTableCell>{row.complain_txt}</StyledTableCell>
                        <StyledTableCell>{row.com_date}</StyledTableCell>
                        <StyledTableCell>
                          <Button>View</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Complaint Form"}
        </DialogTitle>
        <DialogContent>
          <form action="">
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={compDes}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                // label="Date"
                onChange={(e) => setDate(e.target.value)}
                value={compDate}
                fullWidth
                required
              />
              <TextField
                type="time"
                variant="outlined"
                color="secondary"
                // label="Time"
                onChange={(e) => setTime(e.target.value)}
                value={compTime}
                fullWidth
                required
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={submit}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Company_Complaints;
