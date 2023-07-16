import React from "react";

const Contact = () => {
    
    return (
        <div className="contact-page-wrapper">
            <h2>Have You Questions?</h2>

            <h2>Let Us Help You</h2>

            <div className="contact-form-container">
                <input type="email" placeholder="youremial@gmail.com" />
            </div> 
            <div className="contact-form-container">
                <input type="text" placeholder="Enter your problem" />
                <button className="secondary-button">Submit</button>
            </div> 
        </div>
    );
};

export default Contact;