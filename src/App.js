import React, { useEffect, useState } from 'react';

import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=fa8a7d2e'

const App = () =>{
    const [searchTerm, setsearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        searchMovies('');
    }, []);

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    } 

    return(
        <div className="app">
      <h1>Movies</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
    );
}

export default App;