
import React, { Component, useState } from "react";

import "../../styles/Care_center_manager/caregiverlist.css";
import care from "../../assests/caregiver.jpg";
import care2 from "../../assests/caregiver2.jpg";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import Regicaregiver from "./Regicaregiver";
import CaregiverProfile from "./CaregiverProfile"
import { Typography, Avatar, Stack } from "@mui/material";
import profile from "../../assests/profile.jpg";

function Caregiverlist() {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);


  const input = new Date();
  const date = input.toDateString();

  return (
    <>
     
      <div style={{ display: "flex",marginTop:'4%' }}>
        <div
          style={{
            display: "inline",
            marginTop: "30px",
            marginLeft: "2%",
            width: "33.3%",
          }}
        >
          <Typography>Care Center Manager</Typography>
          <Typography>Today</Typography>
          <Typography>{date}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            width: "33.3%",
            justifyContent: "center",
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
            CareGivers
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: "33.3%",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
         <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ marginLeft: '130%' }}><Stack direction="row" spacing={2} width={300}>
                <Avatar
                  alt="Travis Howard"
                  src={profile}
                  sx={{  width: 60, height: 60}}
                />
              </Stack>
              </div>
              </div>
        </div>
      </div>
      <div className="full-page">
        <div className="maintopic">
          <span className="topicfont">AVAILABLE CARE-GIVERS</span>
          <button className="mainbutton" onClick={() => setModelOpen(true)}>
            ADD NEW CAREGIVER
            <AddIcon className="icon-plus" />
          </button>
        </div>


        <div className="row">
          <div className="column">

            <div class="card">
              <img src={care} alt="John" className="top-img" />
              <span className="top-name">John Doe</span>
              <p className="title1">Professional</p>
              <p className="reviews">
                <StarIcon className="icon-star" />
                5.0(20 Reviews)
              </p>
              <p>
                <button
                  className="assignbtn"
                  onClick={() => setModelOpen2(true)}
                >
                  VIEW
                </button>
              </p>
            </div>
          </div>

          <div className="column">
            <div class="card">
              <img src={care2} alt="John" className="top-img" />
              <span className="top-name">John Doe</span>
              <p class="title1">Trainee</p>
              <p className="reviews">
                <StarIcon className="icon-star" />
                5.0(20 Reviews)
              </p>
              <p>
                <button
                  className="assignbtn"
                  onClick={() => setModelOpen2(true)}
                >
                  VIEW
                </button>
              </p>
            </div>
          </div>

          <div className="column">
            <div class="card">
              <img src={care} alt="John" className="top-img" />
              <span className="top-name">John Doe</span>
              <p class="title1">Professional</p>
              <p className="reviews">
                <StarIcon className="icon-star" />
                5.0(20 Reviews)
              </p>
              <p>
                <button className="assignbtn">VIEW</button>
              </p>
            </div>
          </div>

          <div className="column">
            <div class="card">
              <img src={care2} alt="John" className="top-img" />
              <span className="top-name">John Doe</span>
              <p class="title1">Trainee</p>
              <p className="reviews">
                <StarIcon className="icon-star" />
                5.0(20 Reviews)
              </p>
              <p>
                <button className="assignbtn">VIEW</button>
              </p>
            </div>
          </div>

          <div className="column">
            <div class="card">
              <img src={care} alt="John" className="top-img" />
              <span className="top-name">John Doe</span>
              <p class="title1">Professional</p>
              <p className="reviews">
                <StarIcon className="icon-star" />
                5.0(20 Reviews)
              </p>
              <p>
                <button className="assignbtn">VIEW</button>
              </p>
            </div>
          </div>

          <div className="column">
            <div class="card">
              <img src={care2} alt="John" className="top-img" />
              <span className="top-name">John Doe</span>
              <p class="title1">Professional</p>
              <p className="reviews">
                <StarIcon className="icon-star" />
                5.0(20 Reviews)
              </p>
              <p>
                <button className="assignbtn">VIEW</button>
              </p>
            </div>
          </div>
        </div>
        {modelOpen && <Regicaregiver />}
        {modelOpen2 && <CaregiverProfile />}
      </div>
    </>
  );
}

export default Caregiverlist;
