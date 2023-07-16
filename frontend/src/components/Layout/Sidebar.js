

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "../../styles/Common/Sidebar.css"
import logoImage from "../../assests/cover.png"; // Import the image



export default function TemporaryDrawer({ state, setState, toggleDrawer }) {
  const list = (anchor) => (
   
    <Box  className="sidebar" 
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "black",
        color: "white",
        height:"100vh"
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    ><div className="bottm">
     

     <img src={logoImage} alt="Logo" className="logo" />
     <div className="brand"> <h2>Happy <span className="tails">tails</span></h2></div>


     
      <List sx={{ backgroundColor: "black", color: "white" }}>
        {["Dashboard", "Analytics", "Reports", "News"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.toLowerCase()}`}>
              <ListItemIcon sx={{ color: "white" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          
        ))}
      </List>
      </div>
      <Divider/>
      <div className="list">
      <List sx={{ backgroundColor: "black", color: "white" }}>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.toLocaleLowerCase()}`}>
              <ListItemIcon sx={{ color: "white" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </div>
    </Box>
    
  );

  return (
    <div className="sidebar">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
