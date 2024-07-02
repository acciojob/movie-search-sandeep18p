import React, { useRef, useState } from "react";
import './App.css'; // Import your CSS file for styling

const API_KEY = '99eb9fd1';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const ref = useRef();
  
  const call = async (value) => {
    try {
      let res = await fetch(`${API_URL}s=${value}`);
      let data = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search); // Update state with all movies from search results
        setError('');
      } else {
        setMovies([]); // Reset state if no movie found
        setError('No movies found. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data. Please try again later.');
    }
  }

  const bhandler = () => {
    setError(''); // Clear previous error message
    let value = ref.current.value.trim(); // Get input value and trim whitespace
    if (value) {
      call(value); // Call function to fetch data with value
    } else {
      setError('Please enter a movie name.'); // Handle empty input case
    }
  }

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <div className="search-container">
        <input ref={ref} className="search-input" placeholder="Search for a movie..." />
        <button onClick={bhandler} className="search-button">Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-details">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <div className="movie-info">
                <h2 className="movie-title">{movie.Title}</h2>
                <p className="movie-year">{movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
