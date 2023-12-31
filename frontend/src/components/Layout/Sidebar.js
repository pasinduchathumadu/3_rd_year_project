import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import "../../styles/Common/Sidebar.css";
import logoImage from "../../assests/cover.png"; // Import the image

export default function TemporaryDrawer({
  state,
  setState,
  toggleDrawer,
  userType,
}) {
  let data, data_link;
  if (userType === "online_store_manager") {
    data = ["Dashboard", "Product", "Client Orders", "Complains"];
    data_link = [
      "online_home",
      "online_add",
      "online_client",
      "handling_complain",
    ];
  } else if (userType === "boarding_house_manager") {
    data = [
      "Dashboard",
      "Packages",
      "Boarding Requests",
      "Cage Structure",
      "Complains",
    ];
    data_link = [
      "boarding_dashboard",
      "boarding_packages",
      "boarding_clients",
      "cages",
      "boarding_complains",
    ];
  } else if (userType === "admin") {
    data = ["Dashboard", "Users", "Refund Verifications", "Complains"];

    data_link = ["admin_dashboard", "admin_users", "admin_refund", "admin_complains"];
  }
  else if(userType === 'client'){
    data = ["Dashboard","Add Pets", "Pets Shop", "Reports","Add Blog","Complains"];
    data_link = ["dashboard","addpet","shop","reports","addblog", "complains"]
  }
  else if(userType === 'care_center_manager'){
    data = ["Appointments","Packages","Cargivers","Mind Relaxing Pets","Refund","Complains"];
    data_link =["appointments","packages","caregiverlist","mindrelaxing","refund","complaints"]
  }

   else if (userType === "company_manager") {
    data = ["Dashboard","Pet Shop", "Clients Categorization", "Competitions","Blog","Complaints"];

    data_link = [
      "company_dashboard",
      "petshop",
      "company_clients",
      "company_competitions",
      "company_blog",
      "company_complains"
    ];
  }
  else if (userType === "medi_help_manager") {
    data = [
      "Dashbord",
      "Appointments",
      "Doctors",
      "Pet Profiles",
      "Complaints"
    ];
    data_link = [
      "medi_dashboard",
      "viewAppointments",
      "view_vet",
      "PetProfiles",
      "medi_complaints",
    ];
  } else {
    // Default values if userType doesn't match any of the conditions
    data = [];
    data_link = [];
  }

  const list = (anchor) => (
    <Box
      className="sidebar"
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "black",
        color: "white",
        height: "100vh",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="bottm">
        <img src={logoImage} alt="Logo" className="logo" />
        <div className="brand">
          {" "}
          <h2>
            Happy <span className="tails">tails</span>
          </h2>
        </div>

        <List sx={{ backgroundColor: "black", color: "white" }}>
          {data.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{ ":hover": { color: "orange" } }}
                href={`/${data_link[index].toLowerCase()}`}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
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