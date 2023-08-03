import React from "react";

const Contact = () => {

    return (
        <div style={{ backgroundColor: '#F0F0F5' }} className="contact-page-wrapper">
            <h2>Have You Questions?  Let Us Help You</h2>
            <p>OR</p>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <p>Shoot us from </p>
                <p style={{ color: 'orange' }}><b> happytails@gmail.com</b></p></div>

            <div className="contact-form-container">
                <label style={{ fontSize: '20px' }}>Your Email Address :</label>
                <input style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', width: '100%' }} type="email" placeholder="youremial@gmail.com" />
            </div>
            <div className="contact-form-container">
                <label style={{ fontSize: '20px' }}>Your Problem :</label>
                <input style={{ backgroundColor: '#F0F0F5', borderRadius: '10px', width: '100%' }} type="text" placeholder="Enter your problem" /><br />
            </div>
            <button className="secondary-button" style={{ marginTop: '10px', width: '250px' }}>Submit</button>
        </div>
    );
};

export default Contact;