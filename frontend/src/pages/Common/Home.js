
import React from 'react';

import  '../../styles/Common/MainHome.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BannerBackground from '../../assests/home-banner-background.png';
import BannerImage from '../../assests/home-image-1.png';

const Home = () => {
    return( 
        <><div className="home-container">
           

            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="image1" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Happy Tails
                    </h1>
                    <p className="primary-text">
                        Welcome to our Animal Care Center,
                        your one-stop destination for all your pet's needs.
                        From boarding services to veterinary care, grooming, and online consultations,
                        we have everything your furry friend requires for a happy and healthy life.
                    </p>
                    <button className="secondary-button">Explore More  <ArrowForwardIcon /></button>
                </div>

                <div className="home-bannerImage-container">
                    <img src={BannerImage} alt="bannerimage" className="banner-image" />
                </div>


            </div>
        </div></> );
};

export default Home;