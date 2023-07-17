// import React, { useState } from 'react';
// import MainHome from '../../styles/Common/MainHome.css';
// import Logo from '../../assests/logo.png';
// import { HiOutlineBars3 } from 'react-icons/hi2';
// import {
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
// import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
// import BookIcon from '@mui/icons-material/Book';

// const HomeHeader = () => {

//     const [openMenu, setOpenMenu]  = useState(false);
//     const menuOptions = [
//         {
//             text:"Home",
//             icon: <HomeIcon/>
//         },
//         {
//             text:"About",
//             icon: <InfoIcon/>
//         },
//         {
//             text:"Services",
//             icon: <CommentRoundedIcon/>
//         },
//         {
//             text:"Blog",
//             icon: <BookIcon/>
//         },
//         {
//             text:"Contact",
//             icon: <PhoneRoundedIcon/>
//         },
       
//     ];

//     return (
//     <nav className="nav-container-nav">
//         <div className="nav-logo-container">
//             <img src={ Logo } alt="logo" className="navbar-logo" />
//         </div>

//         <div className="navbar-links-container">
//             <a href="">Home</a>
//             <a href="">About</a>
//             <a href="">Services</a>
//             <a href="">Blog</a>
//             <a href="">Contact</a>
//         </div>
//         <div className="navbar-menu-container">
//             <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
//         </div>

//         <Drawer open= { openMenu } onClose={() => setOpenMenu(false)} 
//         anchor="right">
//             <Box sx={{width: 250}}
//             onClick={() => setOpenMenu(false)}
//             onKeyDown={() => setOpenMenu(false)} >
//                 <List>
//                     {menuOptions.map((item) => (
//                         <ListItem key ={item.text} disablePadding>
//                             <ListItemButton>
//                                 <ListItemIcon>{item.icon}</ListItemIcon>
//                                 <ListItemText primary={item.text} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Box>
//         </Drawer>
//     </nav> );
// };

// export default HomeHeader;