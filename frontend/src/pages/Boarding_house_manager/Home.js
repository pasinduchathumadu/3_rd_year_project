import React from "react";
import BoardingStyles from '../../styles/Boarding_house_manager/Home.css';
import HomeHeader from "../../components/Layout/Header" 

const Home = () => {
    return (
        <div className="home-container">
            <HomeHeader />

            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <h3>Analytical Overview</h3>
                    <div className="boarding-wrapper-box-mian">
                        <div className="boarding-wrapper-box">
                            <h1>10</h1>
                            <p>Current Boarding Pets</p>
                        </div>
                        <div className="boarding-wrapper-box">
                            <h1>06</h1>
                            <p>Completed Requests</p>
                        </div>
                    </div>
                </div>

                <div className="boarding-wrapper">
                    <h3>Pending Boarding Requests</h3>
                    <div className="bording-pending-box">
                        <p>Request ID : 02</p>
                    </div>
                    <div className="bording-pending-box">
                        <p>Request ID : 03</p>
                    </div>
                    <div className="bording-pending-box">
                        <p>Request ID : 04</p>
                    </div>
                </div>
            </div>

            
            <div className="boarding-wrapper-main">
                <div className="boarding-wrapper">
                    <h3>Pet Analyze</h3>
                </div>


                <div className="boarding-wrapper">
                    <h3>Packages</h3>
                   
                    
                </div>
            </div>
           
        </div>
    )
}

export default Home