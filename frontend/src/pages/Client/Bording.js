import React, { useState, useEffect } from 'react';
import "../../styles/Client/Bording.css";
import PrimarySearchAppBar from "../../components/Layout/Header";
import PetsIcon from '@mui/icons-material/Pets';
import cage from "../../assests/2.png";
import "../../styles/Client/Shop.css"
import AOS from 'aos';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import platinum from "../../assests/platinum.png"
import gold from "../../assests/gold.png"
import silver from "../../assests/silver.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';




const Bording = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const seats = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, false, false, true, true, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, true, true, false, false, false],
    [false, false, false, true, true, true, true, false],
  ];

  const movies = [
    { name: 'Dogs', price: 1000 },
    { name: 'Cats', price: 800 },
    { name: 'Birds', price: 500 },
    { name: 'The Lion King', price: 9 },
  ];

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatKey = `${rowIndex}-${seatIndex}`;
    if (!seats[rowIndex][seatIndex]) {
      const updatedSeats = [...selectedSeats, seatKey];
      setSelectedSeats(updatedSeats);
    } else {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatKey);
      setSelectedSeats(updatedSeats);
    }
  };

  const handleMovieChange = (event) => {
    setSelectedMovieIndex(event.target.value);
  };

  useEffect(() => {
    const selectedMoviePrice = movies[selectedMovieIndex].price;
    const selectedSeatsCount = selectedSeats.length;
    setCount(selectedSeatsCount);
    setTotal(selectedSeatsCount * selectedMoviePrice);
  }, [selectedSeats, selectedMovieIndex, movies]);


  useEffect(() => {
    AOS.init({duration:500});
  }, []); 


  return (
    <><PrimarySearchAppBar />

      <div className='smooth-scroll' style={{textAlign:"center",width:"100%",height:"75vh",marginTop:"auto",marginBottom:"auto",fontWeight:"1"}}><h2 style={{fontSize:"80px",marginTop:"90px"}}>Book your's <span style={{color:"orange"}}>pet</span> seet now</h2>
      <h1 style={{marginTop:"20px",fontFamily:"sans-serif"}}>we protect and care yout pet</h1>
      <h1 style={{fontSize:"20px",fontWeight:"1"}}>24 x 7 service</h1>
      {/* {PetsIcon} */}
      {/* <PetsIcon  sx={{fontSize:"45px"}}/> */}
      <img  className="smooth-scroll" src={cage} alt="Cage" style={{fontSize:"20px",width:"80px",height:"80px"}}/>
      <h1 style={{marginTop:"20px",fontFamily:"sans-serif"}}>Bording packages</h1>


      </div>



      <div style={{width:"100%",height:"80vh",backgroundColor:"",display:"flex",padding:"13px"}} >


        <div style={{width:"33%",       backgroundImage: "linear-gradient(to left, #5d5d5d, #797979, #959595, #b3b3b3, #d2d2d2, #d2d2d2, #d1d1d1, #d1d1d1, #b1b1b1, #939292, #757475, #595858)",
marginRight:"auto",marginLeft:"auto", borderRadius:"8px"}}data-aos="flip-left">
          <img  className="smooth-scroll" src={silver} alt="Cage" style={{fontSize:"20px",width:"150px",height:"150px",marginLeft:"34%",marginTop:"-50px"}}/>
          <h1 style={{color:"black",textAlign:"center",fontWeight:"1"}}>Rs.1000</h1>
          <ol style={{ listStyleType: 'none', padding: 0 ,textAlign:"center",marginTop:"20px",color:"black",fontSize:"20px"}}>
              <li className="tick-icon">With foods</li>
              <li className="tick-icon">Free washing</li>
              <li className="tick-icon">Third item</li>
          </ol>
         



        </div>


        <div 
        style={{
          width:"33%", height:"85vh", marginTop:"-30px",  
          backgroundImage: "linear-gradient(to left, #000000, #1b1b1b, #2e2e2e, #444444, #5a5a5a, #5a5a5a, #5a5a5a, #5a5a5a, #444444, #2e2e2e, #1b1b1b, #000000)"
          ,marginRight:"auto",marginLeft:"auto",
          borderRadius:"8px"
          }}data-aos="fade-up">
        <img  className="smooth-scroll" src={platinum} alt="Cage" style={{fontSize:"20px",width:"150px",height:"150px",marginLeft:"34%",marginTop:"-50px"}}/>
        <h1 style={{color:"white",textAlign:"center",fontWeight:"1"}}>Rs.3500</h1>
        <ol style={{ listStyleType: 'none', padding: 0 ,textAlign:"center",marginTop:"20px",color:"white",fontSize:"20px"}}>
              <li className="tick-icon">With premium foods</li>
              <li className="tick-icon">Confotable cages</li>
              <li className="tick-icon">AC Cages</li>
              <li className="tick-icon">Free washing</li>
              <li className="tick-icon">Free Clinic</li>
              <li className="tick-icon">Free spa</li>



          </ol>
         
            
        </div>


        <div style={{width:"33%",        backgroundImage: "linear-gradient(to left, #cb8700, #d5941f, #dea133, #e8ae45, #f1bb56, #f1bb56, #f1bb56, #f1bb56, #e8ae45, #dea133, #d5941f, #cb8700)",
marginRight:"auto",marginLeft:"auto", borderRadius:"8px"}}data-aos="flip-right">
          <img  className="smooth-scroll" src={gold} alt="Cage" style={{fontSize:"20px",width:"150px",height:"150px",marginLeft:"34%",marginTop:"-50px"}}/>
          <h1 style={{color:"black",textAlign:"center",fontWeight:"1"}}>Rs.2000</h1>
          <ol style={{ listStyleType: 'none', padding: 0 ,textAlign:"center",marginTop:"20px",color:"black",fontSize:"20px"}}>
              <li className="tick-icon">With foods</li>
              <li className="tick-icon">AC cages</li>
              <li className="tick-icon">Free washing</li>
          </ol>
         


        </div>


      </div>



    <div className='main'>
      <div className="movie-con">
        <label>Pick a Cage:</label>
        <select id="movie" onChange={handleMovieChange} value={selectedMovieIndex}>
          {movies.map((movie, index) => (
            <option key={index} value={index}>
              {movie.name} (Rs.{movie.price}-UP)
            </option>
          ))}
        </select>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat"> </div>
          <small>N/A</small>
        </li>

        <li>
          <div className="seat selected"> </div>
          <small>Selected</small>
        </li>

        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="con">
        <div className="screen"></div>
        {seats.map((row, rowIndex) => (
          <div className="ro" key={rowIndex}>
            {row.map((seat, seatIndex) => {
              const seatKey = `${rowIndex}-${seatIndex}`;
              return (
                <div
                
                  key={seatKey}
                  className={`seat ${seat
                      ? "occupied"
                      : selectedSeats.includes(seatKey)
                        ? "selected"
                        : ""}`}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                >      
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text">
        You have selected <span id="count">{count}</span> seats for a price of ${' '}
        <span id="total">{total}</span>
      </p>
      <p style={{color:"black",marginTop:"30px"}}>Select your time slot</p>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{color:"white"}}>
            <DemoContainer components={['DateTimePicker']} sx={{ width: "500px", marginLeft: "45px", marginTop: "10px" }}>
              <DateTimePicker label="Book your time" sx={{color:"black",backgroundColor:"white",borderRadius:"10px"}} />
            </DemoContainer>
       </LocalizationProvider>

       <Button sx={{backgroundColor:"black", width: "500px", marginLeft: "45px", marginTop: "10px",'&:hover': { backgroundColor: 'black' }}} variant="contained">Submit</Button>


    </div>
    </>
  );
};

export default Bording;