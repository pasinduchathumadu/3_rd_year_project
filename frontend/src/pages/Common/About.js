import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AboutBackground from '../../assests/about-background.png';
import AboutBackgroundImage from '../../assests/home-image-1.png';

const About = () => {
    return (
        <div className="about-section-container">
            <div className="about-background-image-container">
                <img src= { AboutBackground } alt="aboutbackground" /> 
            </div>

            <div className="about-section-image-container">
                <img src={ AboutBackgroundImage } alt="aboutbackgroundimage" />
            </div>

            <div className="about-section-text-container">
                <h1 className="primary-heading">
                    Happy Tails
                </h1>
                <p className="primary-text">
                    Our dedicated and experienced staff are passionate about providing the best care possible for your beloved pets. 
                    With our state-of-the-art facilities and a focus on comfort and security, you can rest assured that your pet will be in safe hands while you're away.
                </p>
                <div className="about-buttons-container">
                    <button className="secondary-button">Explore More <ArrowForwardIcon /></button> 
                </div>
            </div>
        </div>
    )
}

export default About;