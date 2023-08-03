import React, { useState, useEffect } from 'react';
import "../../styles/Client/Bording.css";
import PrimarySearchAppBar from "../../components/Layout/Header";
import PetsIcon from '@mui/icons-material/Pets';
import cage from "../../assests/2.png";



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

  return (
    <><PrimarySearchAppBar />

      <div className='header' style={{textAlign:"center",width:"100%",height:"60vh",marginTop:"auto",marginBottom:"auto",fontWeight:"1"}}><h2 style={{fontSize:"80px",marginTop:"90px"}}>Book your's <span style={{color:"orange"}}>pet</span> seet now</h2>
      <h1 style={{marginTop:"20px",fontFamily:"sans-serif"}}>we protect and care yout pet</h1>
      <h1 style={{fontSize:"20px",fontWeight:"1"}}>24 x 7 service</h1>
      {/* {PetsIcon} */}
      {/* <PetsIcon  sx={{fontSize:"45px"}}/> */}
      <img src={cage} alt="Cage" style={{fontSize:"20px",width:"80px",height:"80px"}}/>

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
          <div className="seat"> <PetsIcon  sx={{fontSize:"20px",textAlign:"center",marginLeft:"30%",marginTop:"20%",color:"white"}}/></div>
          <small>N/A</small>
        </li>

        <li>
          <div className="seat selected"> <PetsIcon  sx={{fontSize:"20px",textAlign:"center",marginLeft:"30%",marginTop:"20%",color:"white"}}/></div>
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
                >      <PetsIcon  sx={{fontSize:"20px",textAlign:"center",marginLeft:"30%",marginTop:"20%"}}/>
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
    </div></>
  );
};

export default Bording;
