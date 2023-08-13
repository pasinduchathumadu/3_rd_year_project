import React from "react";
import { TextField, Stack, Avatar, Box } from "@mui/material";

const RegisterForm = () => {
  return (
    <>
      <form>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 145, height: 145 }}
            variant="rounded"
          />
          <Box>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Client ID"
                value={"01"}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Status"
                value={"Premium"}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Client Name"
                value={"Sandaru Dissanayake"}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Contact Number"
                value={"0701260649"}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
          </Box>
        </Stack>

        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Address"
          value={"278/A, Ihalagama , Gampaha"}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </form>
    </>
  );
};

export default RegisterForm;
