import React, { useState } from "react";
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
import { Button, Stack } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function Company_Clients() {
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

  function createData(name, calories, fat, carbs, protein, price) {
    return { name, calories, fat, carbs, protein, price };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 10),
    createData("Eclair", 262, 16.0, 24, 6.0, 15),
    createData("Cupcake", 305, 3.7, 67, 4.3, 20),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 25),
  ];
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" padding={2}>
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
            Company Clients
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
          <Tab label="Clients" />
          <Tab label="Categorized Customers" />
        </Tabs>
        {selectedTab === 0 && (
          <Box padding={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Client ID </StyledTableCell>
                    <StyledTableCell>Client Name</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Contact Number</StyledTableCell>
                    <StyledTableCell>Refund Payment&nbsp;(Rs)</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>View Usability</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.calories}</StyledTableCell>
                      <StyledTableCell>{row.fat}</StyledTableCell>
                      <StyledTableCell>{row.carbs}</StyledTableCell>
                      <StyledTableCell>{row.protein}</StyledTableCell>
                      <StyledTableCell>{row.price}</StyledTableCell>
                      <StyledTableCell>
                        <Button onClick={handleOpen} variant="contained">
                          View Usability
                        </Button>
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
            2
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Client ID </StyledTableCell>
                    <StyledTableCell>Client Name</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Contact Number</StyledTableCell>
                    <StyledTableCell>Refund Payment&nbsp;(Rs)</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>View Usability</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.calories}</StyledTableCell>
                      <StyledTableCell>{row.fat}</StyledTableCell>
                      <StyledTableCell>{row.carbs}</StyledTableCell>
                      <StyledTableCell>{row.protein}</StyledTableCell>
                      <StyledTableCell>{row.price}</StyledTableCell>
                      <StyledTableCell>
                        <Button onClick={handleOpen} variant="contained">
                          View Usability
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      {/* modal */}
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default Company_Clients;
