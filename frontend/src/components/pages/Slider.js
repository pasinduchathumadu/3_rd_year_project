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



import '../../components/styles/Slider.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Card1 from '../assests/Card1.jpeg'
// Import the useEffect hook

// Rest of your code...


function Slider() {
  useEffect(() => {
    const images = [Slider1, Slider2, Slider3, Slider4];
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div>
    <Carousel>

      <Carousel.Item interval={920}>
        <img className="img" src={Slider3} alt="First slide" />

        <Carousel.Caption className="title">
          <h3>Keep Your <span>Pet Happy</span></h3>
          <p>Best Pet Services.</p>
          <Button variant="dark">Dark</Button>
          <Button variant="danger">Danger</Button>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={920}>
        <img className="img" src={Slider2} alt="Second slide" />
        <Carousel.Caption>
          <h3>Pet Spa & Grooming</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button type="button" className="btn btn-outline-light btn-lg">
            Rejister
          </button>
          <button type="button" class="btn btn-dark btn-lg">Book now</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="img" src={Slider1} alt="Third slide" />
        <Carousel.Caption>
          <h3>Book For Your Pet</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <button type="button" className="btn btn-outline-light btn-lg">
            Rejister
          </button>
          <button type="button" class="btn btn-dark btn-lg">Book now</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={920}>
        <img className="img" src={Slider4} alt="Fourth slide" />
        <Carousel.Caption className="Caption">
          <h3>Pet foods</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <button type="button" className="btn btn-outline-light btn-lg">
            Rejister
          </button>
          <button type="button" class="btn btn-dark btn-lg">Book now</button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
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
