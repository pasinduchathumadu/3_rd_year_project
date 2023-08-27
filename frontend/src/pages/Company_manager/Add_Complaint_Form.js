import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const Add_Complaint_Form = () => {
  const [compDes, setDescription] = useState("");
  const [compFile, setFile] = useState("");

  const [error, seterror] = useState(false);

  const submit = async () => {
    if (compDes === null || compFile === null) {
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/pet_care/company_manager/add_complaint",
        {
          compDes,
          compFile
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
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={compDes}
          fullWidth
          required
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

export default Add_Complaint_Form;
