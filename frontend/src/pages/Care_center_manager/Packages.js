import React, { useState } from "react";
import "../../styles/Care_center_manager/Packages.css";

import dog from "../../assests/dog_bath.jpg";
import groom from "../../assests/dog_groom.jpg";
import trim from "../../assests/dog_trim.jpg";
import bath from "../../assests/cat_bath.jpg";
import cgroom from "../../assests/cat_groom.jpg";
import ctrim from "../../assests/cat_trim.jpg";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import SpaIcon from "@mui/icons-material/Spa";
import AddPackage from "./AddPackage";
import EditPackage from "./EditPackage";
import { Typography, Avatar, Stack, Grid, Box, Tab, Tabs } from "@mui/material";
import profile from "../../assests/profile.jpg";


function Packages() {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);

  const input = new Date();
  const date = input.toDateString();

  const [value, setvalue] = React.useState(0);
  const handleChange = (event, newvalue) => {
    setvalue(newvalue);
  }

  return (
    <>
    
      <div className="full-page">
      <div style={{ display: "flex" }}>
            <div
              style={{ display: "inline", marginTop: "30px", marginLeft: "2%",width:"33.3%"}}
            >
              <Typography>Online Store Manager</Typography>
              <Typography>Today</Typography>
              <Typography>{date}</Typography>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "30px",
                width: "33.3%",
                justifyContent:"center"
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: "24px",
                  fontFamily: "fantasy",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Packages
              </Typography>
            </div>
            <div style={{ display: "flex",width:"33.3%" }}>
              <Stack direction="row" spacing={2} width={300}>
                <Avatar
                  alt="Travis Howard"
                  src={profile}
                  sx={{ width: 100, height: 100, marginLeft:"100%"}}
                />
              </Stack>
            </div>
          </div>

          <Grid>
            <Box
              sx={{
                width: "100%",
                marginTop: "15px",
                marginBottom: "2%",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="Tab Component"
                indicatorColor="transparent"
                sx={{ borderRadius: "10px" }}
              >
                <Tab
                  sx={{
                    backgroundColor: value === 0 ? "orange" : "white",
                    color: value === 0 ? "white" : "black",
                  }}
                  label="Dogs"
                />
                <Tab
                  sx={{
                    backgroundColor: value === 1 ? "orange" : "white",
                    color: value === 1 ? "white" : "black",
                  }}
                  label="Cats"
                />
              </Tabs>
            </Box>
          </Grid>
        {value === 0 && (
          (
            <div className="container1">
            <div className="maintopic1">
              <span className="topicfont"> SELECT A SERVICE</span>
              <button className="mainbutton" onClick={() => setModelOpen(true)}>
                ADD NEW PACKAGE
                <AddIcon style={{ fontSize: "20px" }} className="icon-plus" />
              </button>
            </div>
    
            <div className="row">
              <div className="column">
                <div className="cards" style={{ width: "18rem" }}>
                  <img src={dog} className="card-img-top" alt="image" />
                  <div className="card-body">
                    <h5 className="card-title">BAth</h5>
                    <p className="card-price">rs.3000</p>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Deep cleansing shampoo
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Blow dry
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Nail trim
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Ear cleaning
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      15-min brushout
                    </li>
                  </ul>
                  <p className="card-text">
                    <SpaIcon style={{ fontSize: "25px" }} className="icon-leaf" />
                    Clean grooming service without parabens, phthalates and chemical
                    dyes.
                  </p>
                  <a href="#">
                    <button className="editbtn" onClick={() => setModelOpen2(true)}>
                      Edit
                    </button>
                  </a>
                  <a href="#">
                    <button className="delbtn">Delete</button>
                  </a>
                </div>
              </div>
    
              <div className="column">
                <div className="cards" style={{ width: "18rem" }}>
                  <img src={groom} className="card-img-top" alt="image" />
                  <div className="card-body">
                    <h5 className="card-title">Bath & HAIR</h5>
                    <p className="card-price">Rs.4000</p>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Deep cleansing shampoo
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Hair cutting and styling
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Blow dry
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Nail trim
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Ear cleaning
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      15-min brushout
                    </li>
                  </ul>
                  <p className="card-text">
                    <SpaIcon style={{ fontSize: "25px" }} className="icon-leaf" />
                    Clean grooming service without parabens, phthalates and chemical
                    dyes.
                  </p>
                  <a href="#">
                    <button className="editbtn">Edit</button>
                  </a>
                  <a href="#">
                    <button className="delbtn">Delete</button>
                  </a>
                </div>
              </div>
    
              <div class="column">
                <div className="cards" style={{ width: "18rem" }}>
                  <img src={trim} className="card-img-top" alt="image" />
                  <div className="card-body">
                    <h5 className="card-title">MINI GROOM</h5>
                    <p className="card-price">Rs.4500</p>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Hair styling
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Sanitary trim
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Body massage
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      De-shedding treatment
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Ear cleaning
                    </li>
                    <li className="list-group-item">
                      <CheckIcon
                        style={{ fontSize: "15px" }}
                        className="icon-check"
                      />
                      Nail trim
                    </li>
                  </ul>
                  <p className="card-text">
                    <SpaIcon style={{ fontSize: "25px" }} className="icon-leaf" />
                    Clean grooming service without parabens, phthalates and chemical
                    dyes.
                  </p>
                  <a href="#">
                    <button className="editbtn">Edit</button>
                  </a>
                  <a href="#">
                    <button className="delbtn">Delete</button>
                  </a>
                </div>
              </div>
            </div>
            {modelOpen && <AddPackage />}
            {modelOpen2 && <EditPackage />}
           </div> /*first end container 1 */
            )
        )}
        {value === 1 && (
              <div className="container1">
              <div className="maintopic1">
                <span className="topicfont"> SELECT A SERVICE</span>
                <button className="mainbutton" onClick={() => setModelOpen(true)}>
                  ADD NEW PACKAGE
                  <AddIcon style={{ fontSize: "20px" }} className="icon-plus" />
                </button>
              </div>
              <div class="row">
                <div class="column">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={ctrim} className="card-img-top" alt="image" />
                    <div className="card-body">
                      <h5 className="card-title">MANI & PEDI</h5>
                      <p className="card-price">Rs.3000</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Nail trim
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Ear cleaning
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Anal gland expression
                      </li>
                    </ul>
                    <p className="card-text">
                      <SpaIcon style={{ fontSize: "25px" }} className="icon-leaf" />
                      We will neatly trim all toenails. Vinyl nail cap application is
                      also available.
                    </p>
                    <a href="#">
                      <button className="editbtn">Edit</button>
                    </a>
                    <a href="#">
                      <button className="delbtn">Delete</button>
                    </a>
                  </div>
                </div>
                <div class="column">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={bath} className="card-img-top" alt="image" />
                    <h5 className="card-title">PAMPERED BATHS</h5>
                    <p className="card-price">Rs.4000</p>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Medicated bath with shampoo
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Blow dry
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Nail trim
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Ear cleaning
                      </li>
                    </ul>
                    <p className="card-text">
                      <SpaIcon style={{ fontSize: "25px" }} className="icon-leaf" />
                      Gentle, low-stress feline bathing and medicated baths.
                    </p>
                    <a href="#">
                      <button className="editbtn">Edit</button>
                    </a>
                    <a href="#">
                      <button className="delbtn">Delete</button>
                    </a>
                  </div>
                </div>
        
                <div class="column">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={cgroom} className="card-img-top" alt="image" />
                    <div className="card-body">
                      <h5 className="card-title">STYLISH CUTS</h5>
                      <p className="card-price">Rs.4500</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Lion Shave (Lion Cut){" "}
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Partial Shaves (Sanitary Clip)
                      </li>
                      <li className="list-group-item">
                        <CheckIcon
                          style={{ fontSize: "15px" }}
                          className="icon-check"
                        />
                        Custom Shaves
                      </li>
                    </ul>
                    <p className="card-text">
                      <SpaIcon style={{ fontSize: "25px" }} className="icon-leaf" />
                      Our groomers specialize in comb outs, sanitary clip, and partial
                      and full body shaves.
                    </p>
                    <a href="#">
                      <button className="editbtn">Edit</button>
                    </a>
                    <a href="#">
                      <button className="delbtn">Delete</button>
                    </a>
                  </div>
                </div>
              </div>
              {modelOpen && <AddPackage />}
            </div>
        )}
        </div>
    </>
  );
}

export default Packages;
