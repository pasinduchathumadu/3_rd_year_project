import React from "react";
import Logo from '../../assests/logo.png';
import { BsYoutube } from "react-icons/bs";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-logo-container">
                    <img src={ Logo } alt="logo" />
                </div>

                <div className="footer-icons">
                    <WhatsAppIcon />
                    <InstagramIcon />
                    <BsYoutube />
                    <FacebookIcon />
                </div>
            </div>

            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>Quality</span>
                    <span>Help</span>
                    <span>Share</span>
                    <span>Carrers</span>
                    <span>Work</span>
                </div>

                <div className="footer-section-columns">
                    <span>244-5333-7783</span>
                    <span>help@happytails.com</span>
                    <span>press@happytails.com</span>
                    <span>contact@happytails.com</span>
                    <span>services@happytails.com</span>
                </div>

                <div className="footer-section-columns">
                    <span>Terms and Conditions</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;