import React, { useState, useEffect } from 'react';
import "../../styles/Client/Bording.css"

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
    { name: 'Avengers: Endgame', price: 10 },
    { name: 'Joker', price: 12 },
    { name: 'Toy Story 4', price: 8 },
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
    <div className='main'>
      <div className="movie-con">
        <label>Pick a movie:</label>
        <select id="movie" onChange={handleMovieChange} value={selectedMovieIndex}>
          {movies.map((movie, index) => (
            <option key={index} value={index}>
              {movie.name} (${movie.price})
            </option>
          ))}
        </select>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>

        <li>
          <div className="seat selected"></div>
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
                  className={`seat ${
                    seat
                      ? "occupied"
                      : selectedSeats.includes(seatKey)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text">
        You have selected <span id="count">{count}</span> seats for a price of ${' '}
        <span id="total">{total}</span>
      </p>
    </div>
  );
};

export default Bording;
