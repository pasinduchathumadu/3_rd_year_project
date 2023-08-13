import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1581753418434-51c11169a3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            sx={{ width: 220, height: 320, backgroundSize: "cover" }}
            variant="rounded"
          />

          <Box>
            <Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Competition ID"
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
                  label="Competition Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={"Boley"}
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
                  label="Date"
                  onChange={(e) => setLastName(e.target.value)}
                  value={"22/08/2023"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Time"
                  onChange={(e) => setLastName(e.target.value)}
                  value={"10.30 a.m."}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>

              <Stack sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Organized by"
                  onChange={(e) => setLastName(e.target.value)}
                  value={"VA Group"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
              <Stack>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Venue"
                  onChange={(e) => setLastName(e.target.value)}
                  value={"Kolonnawa, Colombo"}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </>
  );
};

export default RegisterForm;

// import React from "react";
// import { TextField, Container, Stack } from "@mui/material";

// const RegisterForm = ({ userData }) => {
//   return (
//     <>
//       <form>
//         <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
//           <TextField
//             variant="outlined"
//             color="secondary"
//             label="First Name"
//             value={userData.firstName}
//             fullWidth
//             readOnly
//           />
//           <TextField
//             variant="outlined"
//             color="secondary"
//             label="Last Name"
//             value={userData.lastName}
//             fullWidth
//             readOnly
//           />
//         </Stack>
//         <TextField
//           variant="outlined"
//           color="secondary"
//           label="Email"
//           value={userData.email}
//           fullWidth
//           readOnly
//           sx={{ mb: 4 }}
//         />
//       </form>
//     </>
//   );
// };

// export default RegisterForm;
