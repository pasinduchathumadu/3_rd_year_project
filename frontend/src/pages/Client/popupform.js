import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react";

const Modalpopup = () => {
    const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }
    return (
        <div style={{ textAlign: 'center' }}>
    <h1>MUI - DIALOG</h1>
    <Button onClick={functionopenpopup} color="primary" variant="contained">
      Open Popup
    </Button>
    {open && (
      <div className="popup-container">
        <div className="popup-content">
          <DialogTitle>
            User Registration
            <IconButton onClick={closepopup} style={{ float: 'right' }}>
              <CloseIcon color="primary" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {/* Your dialog content goes here */}
            <Stack spacing={2} margin={2}>
              <TextField variant="outlined" label="Username" />
              <TextField variant="outlined" label="Password" />
              <TextField variant="outlined" label="Email" />
              <TextField variant="outlined" label="Phone" />
              <FormControlLabel control={<Checkbox defaultChecked color="primary" />} label="Agree terms & conditions" />
              <Button color="primary" variant="contained">
                Submit
              </Button>
            </Stack>
          </DialogContent>
        </div>
      </div>
    )}
  </div>
    );
}

export default Modalpopup;