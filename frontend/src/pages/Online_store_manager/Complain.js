import React, { useState, useEffect } from "react";
import { Tabs, Typography, Grid, Stack, Avatar, Box, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton , AlertTitle ,Alert } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import profile from "../../assests/profile.jpg";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

import axios from "axios";

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Complain = () => {
  const input = new Date();
  const date = input.toDateString();
  const [id,setid] = useState("")
  const [value, setvalue] = useState(0);
  const [Complain, setcomplain] = useState("");
  const [getform, setform] = useState(false);
  const [response , setresponse] = useState("")
  const [givendate , setdate] = useState("")
  const [success,setsuccess] = useState(false)
  const [error, seterror] = useState(false)
  const [getsecondform , setsecondform] = useState(false)
  const [complain_message, setmessage] = useState("")
  const [addsubject,setsubject] = useState("")
  const [selectfile, setfile] = useState(null)
  const [image,setimage] = useState("")
  const [viewresponse,setviewresponse] = useState("")
  const handlefilechange = async (event) => {
    const file = event.target.files[0]
    setfile(file)
    setimage(file.name)
  }

  const add_complain = async() =>{
    try{

      const res = await axios.post("http://localhost:5000/pet_care/online_store_manager/add_complain",{
        addsubject,
        complain_message,
        image
      })

      if(res.data.message === ""){

      }

    }catch(err){
      console.log("There is an internel error")
    }

  }
  const handleFileUpload = async () => {
    seterror(false)
    setsuccess(false)
    try {
      const formData = new FormData();
      formData.append("image", selectfile);

      const res = await axios.post("http://localhost:5000/pet_care/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.message === "File uploaded successfully") {
        add_complain()
       
      }
      console.log("File uploaded successfully!");
      // Add any further handling of the response from the backend if needed.
    } catch (err) {
      console.log("There is an internal error", err);
    }
  }
  
  const submit = async() => {
      if(givendate && response){
        try{
          const formattedDate  =givendate.toString()
          console.log(formattedDate)
          const res = await axios.post("http://localhost:5000/pet_care/online_store_manager/add_response",{
            id,
            response,
            newdate:formattedDate,
         
          })
          if (res.data.message === "Added") {
            seterror(false)
            setsuccess(true)
          }
          else{
            seterror(true)
            setsuccess(false)
          }
        }
        catch(err){
          console.log("there is an internel error")
        }
      }
      else{
        seterror("Please Filled the Required Fields")
      }
  }

  const Response = (value1) => {
    setid(value1)
    setform(true);
    seterror(false)
    setsuccess(false)
  };

  const secondclose = () =>{
    seterror(false)
    setsuccess(false)
    setsecondform(false)
    setvalue(1)

  }

  const view = (value2) =>{
    setid(value2)
    setsecondform(true)
    seterror(false)
    setsuccess(false)
    get_view()
  }
 const closeform = () => {
  seterror(false)
  setsuccess(false)
  setform(false)
  setvalue(1)
 }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const get_complain = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/view/${value}`);
      const data = await res.data;
      return data;
    } catch (err) {
      console.log("There is an internal error");
    }
  };

  const get_view = async()=>{
    const res = await axios.get(`http://localhost:5000/pet_care/online_store_manager/view_response/${id}`)
    const data = await res.data;
    setviewresponse(data.data)
  }

  useEffect(() => {
    get_complain()
      .then((data) => setcomplain(data.data))
      .catch((err) => console.log(err));
  }, [get_complain, value]);

  const handleChange = (event, new_value) => {
    setvalue(new_value);
  };

  


  return (
    <>
   
      <div>
        <Grid sx={{ marginTop: '2%', marginRight: '2%', marginLeft: '2%', marginBottom: '2%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'inline', marginTop: '30px', marginLeft: '2%' }}>
              <Typography>
                Online Store Manager
              </Typography>
              <Typography>
                Today
              </Typography>
              <Typography>
                {date}
              </Typography>
            </div>
            <div style={{ display: 'inline', marginTop: '30px', paddingLeft: '450px' }}>
              <Typography sx={{ color: 'black', fontSize: '24px', fontFamily: 'fantasy', display: 'flex', alignItems: 'center' }}>
                Complain Section
              </Typography>
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <Stack direction="row" spacing={2}>
                <Avatar alt="Travis Howard" src={profile} sx={{ width: 140, height: 140 }} />
              </Stack>
            </div>
          </div>
          <Grid>
            <Box sx={{ width: "90%", marginTop: '15px', marginLeft: '3%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="Tab Component"
                indicatorColor='transparent'
                sx={{ borderRadius: '10px' }}
              >
                <Tab sx={{ backgroundColor: value === 0 ? 'orange' : 'white', color: "black" }} label="Pending Client's Complain" />
                <Tab sx={{ backgroundColor: value === 1 ? 'orange' : 'white', color: "black" }} label="Responded Client's Complain" />
                <Tab sx={{ backgroundColor: value === 2 ? 'orange' : 'white', color: "black" }} label="Add Complain" />
              </Tabs>
            </Box>
          </Grid>
          {value === 0 && (
            <div>
              <Grid sx={{ marginTop: '3%', marginLeft: '3%', marginRight: '7%' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left" sx={{ width: '15%' }}>Complain ID:</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: '15%' }}>Client</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: '20%' }}>Complain Date</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: '35%' }}>Complain</StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: '25%' }}>View</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Complain && Complain.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            COM  {row.complain_id}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.email}</StyledTableCell>
                          <StyledTableCell align="left">{row.date}</StyledTableCell>
                          <StyledTableCell align="left">
                            <textarea style={{ color: 'black', width: '100%', paddingLeft: '2%', paddingTop: '1%', paddingBottom: '5%' }}>
                              {row.complain_txt}
                            </textarea>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Button onClick={() => Response(row.complain_id)} sx={{ backgroundColor: 'orange', width: '75%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>
                              Response
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          )}
          {value === 2 && (
              <div style={{ marginTop: '5%', marginLeft: '8%', marginRight: '12%', marginBottom: '5%', backgroundColor:'#f0f0f5', height: '700px' }}>
              <div style={{ paddingLeft: '28%', paddingTop: '5%' }}>
                <div style={{
  
                  height: "75vh",
                  width: "500px",
                  paddingLeft: '4%',
                  borderRadius: "10px",
                  backgroundColor: 'white'
                }}>
                  <Grid container direction="column" component="form" >
                    <Grid item sx={{ paddingTop: '29px' }}>
                      <Typography sx={{paddingBottom:'10px'}}>Complain Subject:</Typography>
                      <TextField onChange={(e)=>setsubject(e.target.value)} variant="outlined" placeholder="Concern area"  sx={{ width: '80%'}} required></TextField>
                    </Grid>
                   
                  
  
                    <Grid item sx={{ paddingTop: '30px' }}>
                      <Typography onChange={(e)=>setmessage(e.target.value)} sx={{paddingBottom:'10px'}}>Message:</Typography>
                      <TextField
                placeholder="message"
                multiline
                rows={6}
               
                sx={{ backgroundColor: '#ffffff',width:'80%' }}
              
              />
                    </Grid>
  
                  
                  </Grid>
                  <Grid item sx={{ paddingTop: '20px' }}>
                  <Typography sx={{paddingBottom:'10px'}}>Upload Image (if needed):</Typography>
                    <div style={{ display: 'flex' }}>
                      <div style={{ display: 'inline' }}>
                        <Button
                          variant="contained"
                          component="label"
  
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload File
                          <input type="file" hidden onChange={handlefilechange} required />
  
                        </Button>
                      </div>
                      <div style={{ display: 'inline', paddingTop: '6px', paddingLeft: '7px' }}>
                        {selectfile && (
                          <Typography>{selectfile.name}</Typography>
  
                        )}
                      </div>
                    </div>
  
                  </Grid>
                  <Grid item sx={{ paddingTop: '25px' }}>
                    <Button sx={{ width: '80%', color: 'black', backgroundColor: 'orange', ':hover': { backgroundColor: 'orange' } }} onClick={handleFileUpload} >Submit</Button>
                  </Grid>
                </div>
                </div>
                </div>

          )}
          {value === 1 &&(
            <div>
            <Grid sx={{ marginTop: '3%', marginLeft: '3%', marginRight: '7%' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left" sx={{ width: '15%' }}>Complain ID:</StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: '15%' }}>Client</StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: '20%' }}>Complain Date</StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: '35%' }}>Response Date & Time</StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: '25%' }}>View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Complain && Complain.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          COM  {row.complain_id}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.email}</StyledTableCell>
                        <StyledTableCell align="left">{row.date}</StyledTableCell>
                        <StyledTableCell align="left">
                         {row.response_date}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Button onClick={() => view(row.complain_id)} sx={{ backgroundColor: 'orange', width: '75%', color: 'white', ':hover': { backgroundColor: 'orange' } }}>
                            View
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </div>

          )}

        </Grid>
      </div>
      {getform && (
        <div style={{ backdropFilter: 'blur(4px)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
          <Box sx={{ backgroundColor: '#f0f0f5', width: '70%', height: '80vh' }}>
            <div style={{marginLeft:'95%',marginTop:'1%',fontSize:"24px"}}>
              
              <IconButton onClick={()=>closeform()}> <CloseIcon  sx={{color:'red'}}/></IconButton>
            

            </div>
            {success && (
            <Stack sx={{ width: '40%', marginLeft: '25%' }} spacing={2}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>YOU HAVE BEEN SUCCESSFULLY RESPONDED</strong>
              </Alert>
            </Stack>
          )}
           {error && (
            <Stack sx={{ width: '50%', marginLeft: '25%' }} spacing={2}>
              <Alert severity="error">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>check it out!</strong>
              </Alert>
            </Stack>

          )}
          
            <div style={{ padding: '4%' }}>
              <Typography sx={{ fontSize: '18px', paddingBottom: '15px' }}>Response Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                value={givendate}
                onChange={(newValue)=>setdate(newValue)}
             
              sx={{ backgroundColor: 'white', color: 'black' }} />
              </LocalizationProvider>
              <Typography sx={{ paddingTop: '15px', paddingBottom: '30px' }}>
                Enter the Response
              </Typography>
              <TextField
                placeholder="Enter the Response here ......"
                multiline
                rows={6}
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                onChange={(e)=>setresponse(e.target.value)}
              />
              <Button onClick={submit} fullWidth sx={{ backgroundColor: 'orange', marginTop: '30px', ':hover': { backgroundColor: 'orange' }, color: 'black' }}>
                Submit
              </Button>
            </div>
          </Box>
        </div>
      )}
      {getsecondform && (
        <div style={{ backdropFilter: 'blur(4px)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
          <Box sx={{ backgroundColor: '#f0f0f5', width: '70%', height: '80vh' }}>
            <div style={{marginLeft:'95%',marginTop:'1%',fontSize:"24px"}}>
              
              <IconButton onClick={()=>secondclose()}> <CloseIcon  sx={{color:'red'}}/></IconButton>
            

            </div>
          
          
            <div style={{ padding: '3%' }}>
              {viewresponse && viewresponse.map((menu,index) => (
                  <><Typography sx={{ paddingTop: '15px', paddingBottom: '30px',fontSize:'20px',textAlign:'center'}}>
                  Complain
                </Typography><TextField
                    value={menu.complain_txt}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ backgroundColor: '#ffffff' }}
                    />
                    <Typography sx={{ paddingTop: '15px', paddingBottom: '30px',fontSize:'20px',textAlign:'center' }}>
                    Response
                  </Typography><TextField
                    value={menu.response_txt}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ backgroundColor: '#ffffff' }}
                    /></>
                

              ))}
             
            
           
            </div>
          </Box>
        </div>
      )}

    </>
  );
};

export default Complain;
