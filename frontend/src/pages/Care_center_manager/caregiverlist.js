import React from "react";
import '../../styles/Care_center_manager/caregiverlist.css';
import care from "../../assests/caregiver.jpg"
import care2 from "../../assests/caregiver2.jpg"



function Caregiverlist(){

    return(
        <div className="container">
            <div className="maintopic">
                <span className="topicfont">AVAILABLE CARE-GIVERS</span>
                <button className="mainbutton">ADD NEW CAREGIVER<FaPlus className="icon-plus"/></button>
            </div>

            <div className="row">
                <div className="column">
            <div class="card">
                <img src={care} alt="John" className="top-img" />
                <span  className="top-name">John Doe</span>
                <p class="title">Professional</p>
                <p>5.0(20 Reviews)</p>
                <p><button className="assignbtn">Assign</button></p>
            
                </div>
                </div>

                <div className="column">
            <div class="card">
                <img src={care2} alt="John" className="top-img" />
                <span  className="top-name">John Doe</span>
                <p class="title">Trainee</p>
                <p>5.0(20 Reviews)</p>
                <p><button className="assignbtn">Assign</button></p>
            
                </div>
                </div>

                <div className="column">
            <div class="card">
                <img src={care} alt="John" className="top-img" />
                <span  className="top-name">John Doe</span>
                <p class="title">Professional</p>
                <p>5.0(20 Reviews)</p>
                <p><button className="assignbtn">Assign</button></p>
            
                </div>
                </div>

                <div className="column">
            <div class="card">
                <img src={care2} alt="John" className="top-img" />
                <span  className="top-name">John Doe</span>
                <p class="title">Trainee</p>
                <p>5.0(20 Reviews)</p>
                <p><button className="assignbtn">Assign</button></p>
            
                </div>
                </div>

                <div className="column">
            <div class="card">
                <img src={care} alt="John" className="top-img" />
                <span  className="top-name">John Doe</span>
                <p class="title">Professional</p>
                <p>5.0(20 Reviews)</p>
                <p><button className="assignbtn">Assign</button></p>
            
                </div>
                </div>

                <div className="column">
            <div class="card">
                <img src={care2} alt="John" className="top-img" />
                <span  className="top-name">John Doe</span>
                <p class="title">Professional</p>
                <p>5.0(20 Reviews)</p>
                <p><button className="assignbtn">Assign</button></p>
            
                </div>
                </div>

            </div>
            </div>
        
            )
    }

    export default Caregiverlist;