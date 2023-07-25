import React from "react";
import { FormLabel, TextField } from "@mui/material";
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';


const Test = () => {
    return (
    <div>
        Test
{/* add new complain */}
        <div>
            <FormControl  sx={{marginLeft:'35%', borderRadius: '10px', width:'500px', border: '1px', borderStyle:'solid', padding:'20px',backgroundColor:'#E3E3E3', fontFamily:'osnovapro,sans-serif'}}>
                    <div className="form-topic">
                        Add New Complain
                    </div>
                    <div className="form-label">
                        <FormLabel>Enter your complain: </FormLabel>
                        <TextField id="outlined-basic" placeholder="Complain" variant="outlined" />
                    </div>

                    <div className="form-label">
                        <FormLabel>Upload an Image (if need): </FormLabel>
                        <input type="file" placeholder=" Choose a file" variant="outlined" />
                    </div>
                    <Button variant="contained" sx={{background:"#fe9e0d", marginTop:'10px', ':hover':{backgroundColor: "#ED5C01"}}}>Add Package</Button>
                </FormControl>
            </div>

{/* add response */}
        <div>
            <FormControl  sx={{marginLeft:'35%', borderRadius: '10px', width:'500px', border: '1px', borderStyle:'solid', padding:'20px',backgroundColor:'#E3E3E3', fontFamily:'osnovapro,sans-serif'}}>
                    <div className="form-topic">
                        Add New Complain
                    </div>
                    <div className="form-label">
                        <FormLabel>Complain ID : 05 </FormLabel>
                    </div>

                    <div className="form-label">
                        <FormLabel>Enter the Response  </FormLabel>
                        <TextField id="outlined-basic" placeholder=" response" variant="outlined"  />
                    </div>

                    <div className="form-label">
                        <FormLabel>Upload an Image (if need): </FormLabel>
                        <input type="file" placeholder=" Choose a file" variant="outlined" />
                    </div>
                    <Button variant="contained" sx={{background:"#fe9e0d", marginTop:'10px', ':hover':{backgroundColor: "#ED5C01"}}}>Add Package</Button>
                </FormControl>
            </div>
        
     
    </div>)
}
export default Test;
