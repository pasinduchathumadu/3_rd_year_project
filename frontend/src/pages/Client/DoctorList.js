import React from 'react'
import { DOCTORS } from './AvailableDoctors';
import { MindRelaxDoctors } from './MindRelaxDoctors';
import "../../styles/Client/DoctorList.css"
// Replace 'path/to/your/image.png' with the actual path to your image





export const DoctorList = () => {
  return (
    <>
    <div className='smooth-scroll'>
    <div style={{width:"100%",height:"73vh", backgroundColor: "rgb(18, 19, 52)",marginTop:"auto"}} data-aos="fade-right">

        <h1 style={{color:"blue",fontSize:"80px",marginLeft:"15px"}}>Meet Your Doctor Now</h1>
        <h1 style={{color:"white",fontSize:"20px",fontWeight:"1",marginLeft:"20px"}}>Expert vet doctors dedicated to your pet's well-being </h1>
        <h1 style={{color:"white",fontSize:"20px",fontWeight:"1",marginLeft:"20px"}}> Trust us with their care</h1>

        <h1 style={{color:"#a5a5ac",fontSize:"40px",fontWeight:"1000",marginLeft:"50px",marginTop:"30px"}}>24x7 service </h1>

      </div>
    <div className='shop'>
      <div className='shopTitle'>

        <h2>Happy Tails Veterinarians</h2>

      </div>
      <div className='products'>
        {DOCTORS.map((product) => (
          <MindRelaxDoctors data={product} />))}
      </div>
    </div>
    </div></>
  )
}
