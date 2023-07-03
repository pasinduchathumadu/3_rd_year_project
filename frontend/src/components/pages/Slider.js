import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slider1 from '../../components/assests/Slider1.jpeg';
import Slider2 from '../../components/assests/Slider2.jpeg';
import Slider3 from '../../components/assests/Slider3.jpg';
import Slider4 from '../../components/assests/Slider4.jpg';
import Port1 from  '../../components/assests/port1.jpg';
import Port2 from  '../../components/assests/port2.jpg';
import Port3 from  '../../components/assests/port3.jpg';
import Port4 from  '../../components/assests/port4.jpg';
import Port5 from  '../../components/assests/port5.jpg';
import Port6 from  '../../components/assests/port6.jpg';
import Button from 'react-bootstrap/Button';
import '../styles/Slider.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Card1 from '../assests/Card1.jpeg'
// Import the useEffect hook

// Rest of your code...


function Slider() {
  

  return (
    <div>

      <h2 className='blog_title'>Updates From Blog</h2>
     
    <div class="container">
     <div class="row">
         <div class="col-md-4">
             <div class="content"> <a href="#">
                     <div class="content-overlay"></div> <img class="content-image" src={Port6}/>
                     <div class="content-details fadeIn-bottom">
                         <h3 class="content-title">Geysers Valley Hotel</h3>
                         <p class="content-text"><i class="fa fa-map-marker"></i> Russia</p>
                     </div>
                 </a> </div>
         </div>
         <div class="col-md-4">
             <div class="content"> <a href="#">
                     <div class="content-overlay"></div> <img class="content-image" src={Port1}/>
                     <div class="content-details fadeIn-bottom">
                         <h3 class="content-title">Khumbu Valley Hotel</h3>
                         <p class="content-text"><i class="fa fa-map-marker"></i> Nepal</p>
                     </div>
                 </a> </div>
         </div>
         <div class="col-md-4">
             <div class="content"> <a href="#">
                     <div class="content-overlay"></div> <img class="content-image" src={Port2}/>
                     <div class="content-details fadeIn-bottom">
                         <h3 class="content-title">Waipi&rsquo;o Valley Hotel</h3>
                         <p class="content-text"><i class="fa fa-map-marker"></i> Hawaii</p>
                     </div>
                 </a> </div>
         </div>
         <div class=" col-md-4">
             <div class="content"> <a href="#">
                     <div class="content-overlay"></div> <img class="content-image" src={Port3}/>
                     <div class="content-details fadeIn-bottom">
                         <h3 class="content-title">Geysers Valley Hotel</h3>
                         <p class="content-text"><i class="fa fa-map-marker"></i> Russia</p>
                     </div>
                 </a> </div>
         </div>

         <div class=" col-md-4">
             <div class="content"> <a href="#">
                     <div class="content-overlay"></div> <img class="content-image" src={Port4}/>
                     <div class="content-details fadeIn-bottom">
                         <h3 class="content-title">Geysers Valley Hotel</h3>
                         <p class="content-text"><i class="fa fa-map-marker"></i> Russia</p>
                     </div>
                 </a> </div>
         </div>

         <div class=" col-md-4">
             <div class="content"> <a href="#">
                     <div class="content-overlay"></div> <img class="content-image" src={Port5}/>
                     <div class="content-details fadeIn-bottom">
                         <h3 class="content-title">Geysers Valley Hotel</h3>
                         <p class="content-text"><i class="fa fa-map-marker"></i> Russia</p>
                     </div>
                 </a> </div>
         </div>
     </div>
 </div>

    </div>
  );
}

export default Slider;
