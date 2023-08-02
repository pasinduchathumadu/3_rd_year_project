/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import logo from '../../assests/2.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import TemporaryDrawer from './Sidebar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  

export default function HomeHeader({userRole}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("userRole");
    localStorage.setItem("isLoggedIn", "false");
    navigate('/')
    
  }
  const home = () =>{
    navigate('/home')
  }
  const about = () =>{
    navigate('/about')
  }
  const blog = () =>{
    navigate('/blog')
  }
  const store = () =>{
    navigate('/menu')
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && (event.type === 'keydown' || event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  </Menu>
  
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'flex', justifyContent: 'center' }}>
  <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignItems: 'center', display: 'inline',marginTop:'2%' }}>
    <img src={logo} width="60px" style={{ borderRadius: '100px' }} />
  </Typography>
  <Typography variant="h5" component="div" sx={{ alignItems: 'center', whiteSpace: 'nowrap', paddingLeft: '5%' }}>
    <Typography variant='h5' sx={{color:'orange',display:'inline'}}>Happy </Typography><Typography variant='h5' sx={{display:'inline'}}>Tails</Typography>
  </Typography>
</div>
        
           
         
          <Box sx={{ display: { xs: 'none', md: 'flex' },marginLeft:'25%'}}>
            <Button onClick={home} sx={{ color: 'white', textTransform: 'none',fontSize:'18px',':hover':{color:'orange'}  }}>Home</Button>
            <Button onClick={about}sx={{ color: 'white', textTransform: 'none',marginLeft:'4%',fontSize:'18px',':hover':{color:'orange'}   }}>About</Button>
            <Button onClick={blog} sx={{ color: 'white', textTransform: 'none',marginLeft:'4%' ,fontSize:'18px',':hover':{color:'orange'}  }}>Blog</Button>
            <Button onnclick={store}sx={{ color: 'white', textTransform: 'none',marginLeft:'4%',fontSize:'18px',':hover':{color:'orange'}   }}>Store</Button>
          
            <ShoppingCartTwoToneIcon sx={{ fontSize:'46px'}}/>
         
            
           
          </Box>
          <Box sx={{  marginLeft: '17%', flexGrow: 1, alignItems: 'center',width:'12%' }}>
  <Search style={{ justifyContent: 'flex-start' }}>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </Search>
</Box>
          
          <Box sx={{ flexGrow: 1 }} />
        
         
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
           
          </Box>
          <Button onClick={logout} variant="contained" sx={{ backgroundColor: 'orange', marginRight: '10px',':hover':{backgroundColor:'orange'},width:'6%' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer} userType={userRole}/>
     
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
