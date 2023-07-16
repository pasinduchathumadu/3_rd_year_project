import React from "react";
import MediHelp from '../../assests/medi-help-image.png';
import Boarding from '../../assests/boarding-pets-image.png';
import OnlineStore from '../../assests/online-store-image.png';  
import CareCenter from '../../assests/care-center-image.png'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PetAccessories from '../../assests/pet-accessories-image.png';  
import PetFood from '../../assests/pet-foods.png';  
import PetToys from '../../assests/pet-toys.png'; 

const Services = () => {
    const servicesInfoData =  [
        {
            image: MediHelp,
            title: "Medi Help Center Services",
        }, 
        {
            image: Boarding,
            title: "Boarding House Services",
        }, 
        {
            image: OnlineStore,
            title: "Pet Online Store Services",
        }, 
        {
            image: CareCenter,
            title: "Care Center Services",
        }, 
    ]

    const StoreInfoData =  [
        {
            image: PetAccessories,
            title: "Pet Accessories",
        }, 
        {
            image: PetFood,
            title: "Pet Food",
        }, 
        {
            image: PetToys,
            title: "Pet Toys",
        },    
    ]

    return (
    <div className="work-section-wrapper">
        <h2>Our Services</h2>
        <div className="work-section-bottom">
            {servicesInfoData.map((data) => (
                <div className="work-section-info">
                    <div className="info-boxes-img-container">
                        <img src={data.image} alt="images" />
                    </div>
                    <h3>{data.title}</h3>
                </div>
            ))}
            <button className="secondary-button">Explore More <ArrowForwardIcon /> </button>
        </div>

        <h2>Online Store Services</h2>
        <div className="work-section-bottom">
            {StoreInfoData.map((data) => (
                <div className="work-section-info">
                    <div className="info-boxes-img-container">
                        <img src={data.image} alt="images" className="onlinestore-images" />
                    </div>

                    <h3>{data.title}</h3>
                </div>
            ))}
        </div>


    </div>
    );
};

export default Services;