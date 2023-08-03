import React, { Component ,useState}  from "react";
import Header from '../../components/Layout/Header';
import '../../styles/Care_center_manager/CaregiverProfile.css';
import care from "../../assests/caregiver.jpg";
import care2 from "../../assests/caregiver2.jpg";
import StarIcon from '@mui/icons-material/Star';

function CaregiverProfile(){
    return(
        <div className="container-profile">
            <div class="card-profile">
                <img src={care} alt="John" className="top-img" />
                <span  className="tops-name">John Doe</span>
                <p class="titles">Professional</p>
                <p className="review"><StarIcon className="icon-star"/>5.0(20 Reviews)</p>


                <div className="profrom">
                <form className="profile-form">
                    <div className="field">
                    <label className="profile-label">Name</label>
                    <input type="text" className="profile-input" placeholder="John"></input>
                    <label className="profile-label">Address</label>
                    <input type="text" className="profile-input2" placeholder="Colombo"></input>
                    
                    </div>
                    <div className="field">
                    <label className="profile-label">Age</label>
                    <input type="text" className="profile-input" placeholder="25Yrs"></input>
                    <label className="profile-label">Working</label>
                    <input type="text" className="profile-input2" placeholder="1PM - 10PM"></input>
                    </div>
                 </form> 
                </div>

            </div>
        </div>
    )
}
export default CaregiverProfile