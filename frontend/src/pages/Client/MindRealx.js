import React from 'react';
import PrimarySearchAppBar from "../../components/Layout/Header";
import petImage from '../../assests/black2.jpg'; // Replace 'path/to/your/image.png' with the actual path to your image



function MindRealx() {
  return (
    <div>
      <PrimarySearchAppBar />
      <div style={{
        width: "90%",
        height: "90vh",
        backgroundColor: "black",
        color: "white",
        marginTop: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        textAlign: "center"
      }}>
        <div>
          <p style={{ fontSize: "20px", fontWeight: "10", marginTop: "10px", marginBottom: "-20px" }}>
            You can spend time with our pets
          </p>
          <p style={{ fontSize: "80px", fontWeight: "10", marginBottom: "-40px" }}>
            Cats &amp; <span style={{ color: "orange" }}>Dogs</span>
          </p>
          <p style={{ fontSize: "20px", fontWeight: "10", marginBottom: "0" }}>
            The most valuable pet care center in the world
          </p>
        </div>
        <img
          src={petImage}
          alt="Pet"
          style={{
            width: "auto",
            height: "auto",
            marginTop: "20px",
          }}
        /><br/>
         <p style={{ fontSize: "20px", fontWeight: "10",marginBottom:"0px" }}>
            Up to 1500 LKR  
          </p>
      </div>
    </div>
  );
}

export default MindRealx;
