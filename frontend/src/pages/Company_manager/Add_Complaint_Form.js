import React, { useState } from "react";
import { TextField, Button, Stack, Box } from "@mui/material";

const Add_Competition_Form = () => {
  const [compDes, setDescription] = useState("");
  const [compFile, setFile] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(compDes, compFile);
  }

  return (
    <>
      <form onSubmit={handleSubmit} action={"#"}>
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
          <Button variant="outlined" color="secondary" type="submit">
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Add_Competition_Form;
