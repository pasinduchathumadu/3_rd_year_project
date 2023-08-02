import * as React from 'react';
import logo from '../../assests/2.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HomeHeader({ userRole }) {
  const navigate = useNavigate();
  const login = ()=>{
    navigate('/login')
  }
  const signup = () => {
    navigate('/signup')
  }

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
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, alignItems: 'center', display: 'inline', marginTop: '2%' }}>
              <img src={logo} width="60px" style={{ borderRadius: '100px' }} alt="Logo" />
            </Typography>
            <Typography variant="h5" component="div" sx={{ alignItems: 'center', whiteSpace: 'nowrap', paddingLeft: '5%' }}>
              <Typography variant='h5' sx={{ color: 'orange', display: 'inline' }}>Happy </Typography><Typography variant='h5' sx={{ display: 'inline' }}>Tails</Typography>
            </Typography>
          </div>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: '20%' }}>
            <Button sx={{ color: 'white', textTransform: 'none', fontSize: '18px', ':hover': { color: 'orange' } }}>Home</Button>
            <Button sx={{ color: 'white', textTransform: 'none', marginLeft: '4%', fontSize: '18px', ':hover': { color: 'orange' } }}>About</Button>
            <Button sx={{ color: 'white', textTransform: 'none', marginLeft: '4%', fontSize: '18px', ':hover': { color: 'orange' } }}>Contact</Button>
            
            <Button sx={{ color: 'white', textTransform: 'none', marginLeft: '4%', fontSize: '18px', ':hover': { color: 'orange' } }}>Blog</Button>
            <Button sx={{ color: 'white', textTransform: 'none', marginLeft: '4%', fontSize: '18px', ':hover': { color: 'orange' } }}>Store</Button>
            <ShoppingCartTwoToneIcon sx={{ fontSize: '46px' }} />
          </Box>
          <Box sx={{ marginLeft: '10%', flexGrow: 1, alignItems: 'center', width: '15%' }}>
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
          <Button onClick={login} variant="contained" sx={{ backgroundColor: 'orange', marginRight: '10px', ':hover': { backgroundColor: 'orange' }, width: '6%' }}>
            Login
          </Button>
          <Button onClick={signup} variant="contained" sx={{ backgroundColor: 'orange', marginRight: '10px', ':hover': { backgroundColor: 'orange' }, width: '6%' }}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
