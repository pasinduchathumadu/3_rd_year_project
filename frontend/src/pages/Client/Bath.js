import React from 'react';
import PrimarySearchAppBar from '../../components/Layout/Header';
import BathImage from '../../assests/bath2.jpg'; // Import the background image

function Bath() {
  return (
    <div>
      <PrimarySearchAppBar />

      <div style={{ display: 'flex' }}>
        <div
          style={{
            backgroundImage: `url(${BathImage})`, // Set the background image
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '70%',
            height: '91.05vh',
          }}
        ></div>

        <div style={{ backgroundColor: 'white', width: '50%', height: '80vh' }}>

            <div>
                <h1 style={{textAlign:"center"}}>Pet Bathing</h1>
                <h2 style={{fontSize:"15px",fontWeight:"1",padding:"15px",marginLeft:"10px"}}>Our pet bathing service provides a relaxing and thorough bath for your furry companions, leaving them clean, fresh, and happy.</h2>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Bath;
