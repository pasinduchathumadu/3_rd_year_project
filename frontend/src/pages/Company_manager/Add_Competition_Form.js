import React, { useState } from "react";
import { TextField, Button, Stack, Box, Alert } from "@mui/material";
import axios from "axios";

const Add_Competition_Form = () => {
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
      if (res.message === "successfully added") {
        seterror(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            onClick={submit}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Add_Competition_Form;
