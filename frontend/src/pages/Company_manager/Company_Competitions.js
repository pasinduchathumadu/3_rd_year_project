import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogForm from "./Dialog";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfilePicture from "../../assests/profile-picture.png";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Competition_Form from "./Competition_Form";
import Add_Competition_Form from "./Add_Competition_Form";
import axios from "axios";

function Company_Competitions() {
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

  const [com, setcom] = useState([]);

  const get_competitions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/pet_care/company_manager/get_competitions"
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get_competitions()
      .then((data) => setcom(data.data))
      .catch((err) => console.log(err));
  });
  //modal

  const handleclick = () => {
    <DialogForm title="Competition Details">
      <Competition_Form />
    </DialogForm>;
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
            Company Competitions
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
        <Box padding={2}>
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <DialogForm
              title="Add Competition Details"
              btn_name="Add Competitions"
            >
              <Add_Competition_Form />
            </DialogForm>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Competition ID </StyledTableCell>
                  <StyledTableCell>Competition Name</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>View Competition</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {com.map((row) => (
                  <StyledTableRow key={row.notice_id}>
                    <StyledTableCell component="th" scope="row">
                      {row.notice_id}
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={handleclick}>View</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default Company_Competitions;
