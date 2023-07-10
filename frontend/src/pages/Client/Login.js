import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Checkbox, FormControlLabel, Button, Typography,Box,CssBaseline } from "@mui/material"
import { Link } from "react-router-dom";
import './../../styles/Client/Login.css'


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Change primary color to black
    },
  },
});



// TODO remove, this demo shouldn't need to reset the theme.


const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/pet_care/user/login",{
        email,
        password
    })
    if(res.data.message==="User not found"|| res.data.message==="Password didn't Matched"){
      document.getElementById('error').innerHTML="Username or Password is incorrect"
    }
    else{
     
      onLogin();
      setEmail("");
      setPassword("");
      navigate(`/blogs`);
    }

    }catch(err){
      console.log("There is an error")

    }
    // Perform login logic here, e.g., send login request to the server

    // Reset form fields
   
  };


  return (
    // <div className='img'>
    <div className='body'>
      <ThemeProvider theme={theme}>
        <h3>Welcome</h3>
        <Container component="main" maxWidth="xs" sx={{ marginLeft: 100 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className='form'>
              <Box component="form" onSubmit = {handleSubmit} noValidate sx={{ mt: 1 }} >
                <Typography component="h1" variant="h5"  >
                  Sign in
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"


                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <p id='error'></p>
                <Button
                  
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: "white" }}
                >
                  Sign In
                </Button>

               
                  <Typography sx={{marginBottom:'2px'}}>
                    <Link to="#">
                      Forgot password?
                    </Link>

                  </Typography>
                  <Typography>
                    Don't you have an acount ?
                    <Link to="#">
                      SignUp
                    </Link>

                  </Typography>
          </Box>
        </div>
      </Box>

    </Container>
    </ThemeProvider >
  </div >
  
  );
}
export default Login;