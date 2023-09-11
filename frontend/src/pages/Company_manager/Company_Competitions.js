import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfilePicture from "../../assests/profile-picture.png";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
// import { typography } from "@mui/system";
import BackgroundImage from "../../assests/competitionbckgnd.jpeg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router";


function Company_Competitions() {
  const navigate = useNavigate("")
  // connect profile
  const profile = () => {
    navigate("/profile")
  }

  // get profile picture
  const getProfilepicturepath = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`)
  }

  const [compName, setName] = useState("");
  const [compDes, setDescription] = useState("");
  const [compDate, setDate] = useState("");
  const [compTime, setTime] = useState("");
  const [compVenue, setVenue] = useState("");
  const [compPay, setPayment] = useState("");
  const [compFile, setFile] = useState("");
  const [error, seterror] = useState(false);

  const submit = async () => {
    if (
      compName === null ||
      compDes === null ||
      compDate === null ||
      compTime === null ||
      compVenue === null ||
      compPay === null ||
      compFile === null
    ) {
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/pet_care/company_manager/add_competition",
        {
          compName,
          compDes,
          compDate,
          compTime,
          compVenue,
          compPay,
          compFile,
        }
      );
      if (res.data.message === "successfully added") {
        seterror(true);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const date = new Date();
  const currentdate = date.toDateString();

  const [mainbox, setmainbox] = useState(true);

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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [com, setCom] = useState([]);
  const [second, setSecond] = useState(false);
  const [id, setid] = useState("");

  const getCompetitions = async () => {
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
  const close = () => {
    setSecond(false);
  };
  useEffect(() => {
    getCompetitions()
      .then((data) => setCom(data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (id) => {
    setid(id);

    setSecond(true);
  };

  // get competition post path
  const getPostFileSrc = (imageName) => {
    return require(`../../../../backend/images/store/${imageName}`);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
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
              Company Competitions
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <NotificationsIcon className="bell-icon" />
            <Button onClick={profile}><img src={getProfilepicturepath("company_profile.jpeg")} alt="profilepicture" className="boarding-profile-picture" /></Button>
          </Stack>
        </Stack>

        {mainbox && (
          <Box padding={2}>
            <Box>
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
                Add New Competition
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Competition ID </StyledTableCell>
                    <StyledTableCell>Competition Name</StyledTableCell>
                    <StyledTableCell>Description </StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Start Time</StyledTableCell>
                    <StyledTableCell>Venue</StyledTableCell>
                    <StyledTableCell>Payment(Rs)</StyledTableCell>
                    <StyledTableCell> Competition Post</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {com &&
                    com.map((row) => (
                      <StyledTableRow key={row.notice_id}>
                        <StyledTableCell component="th" scope="row">
                          {row.notice_id}
                        </StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>{row.description}</StyledTableCell>
                        <StyledTableCell>{row.date}</StyledTableCell>
                        <StyledTableCell>{row.time}</StyledTableCell>
                        <StyledTableCell>{row.venue}</StyledTableCell>
                        <StyledTableCell>{row.pay}.00</StyledTableCell>
                        <StyledTableCell align="left">
                          <Button
                            onClick={() => handleClick(row.notice_id)}
                            sx={{
                              backgroundColor: "orange",
                              color: "white",
                              ":hover": { backgroundColor: "orange" },
                            }}
                          >
                            View
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </div>

      {/* view competition post */}
      {second && (
        <div
          style={{
            backdropFilter: "blur(3px)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form style={{ marginTop: "6%" }}>
            <Box sx={{ backgroundColor: "white" }} p={5}>
              <IconButton onClick={close} sx={{ float: "right" }}>
                <CloseIcon sx={{ color: "white", backgroundColor: "red" }} />
              </IconButton>
              <Stack
                spacing={2}
                direction="column"
                sx={{ marginBottom: 4 }}
                mt={5}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Competition Notice :
                </Typography>
                <hr />

                {com
                  .filter((menu, index) => menu.notice_id === id)
                  .map((menu, index) => (
                    <img
                      alt="Remy Sharp"
                      src={
                        menu.file === ""
                          ? getPostFileSrc("noimage.png")
                          : getPostFileSrc(menu.file)
                      }
                      sx={{
                        width: 220,
                        height: 320,
                        backgroundSize: "cover",
                        borderRadius: "10px",
                      }}
                      variant="rounded"
                    />
                  ))}

              </Stack>
            </Box>
          </form>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Competition Form"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form action="">
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Competition Name"
              onChange={(e) => setName(e.target.value)}
              value={compName}
              fullWidth
              required
              sx={{ mb: 2, mt: 1 }}
            />
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

            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Venue"
              onChange={(e) => setVenue(e.target.value)}
              value={compVenue}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Payment"
              onChange={(e) => setPayment(e.target.value)}
              value={compPay}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="file"
              variant="outlined"
              color="secondary"
              onChange={(e) => setFile(e.target.value)}
              value={compFile}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
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

export default Company_Competitions;
