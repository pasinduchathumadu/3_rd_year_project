import React from "react";
import Competition1 from '../../assests/com-1-image.png';
import Competition2 from '../../assests/com-2-image.png';
import Competition3 from '../../assests/com-3-image.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ComContent = () => {
    const workInfoData =  [
        {
            image: Competition1,
        }, 
        {
            image: Competition2,
        }, 
        {
            image: Competition3,
        },  
    ]
    return (
    <div className="work-section-wrapper">
        <h2>Our Competition Notices</h2>
        <div className="work-section-bottom">
            {workInfoData.map((data) => (
                <div className="work-section-info">
                    <div className="info-boxes-img-container">
                        <img src={data.image} alt="images" />
                    </div>
                </div>
            ))}
            <button className="secondary-button">Explore More <ArrowForwardIcon /> </button>
        </div>
    </div>
    );
};

export default ComContent;