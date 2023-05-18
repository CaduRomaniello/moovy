import React, { useEffect } from 'react';
import './styles.css';
import MovieItem from '../../components/MovieItem/MovieItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import axios from '../../api/axios';

const SEARCH_MOVIE_BY_TITLE = '/omdb-api/title';

const Search = () =>{
  const [inputValue, setInputValue] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleFoundMoviesChange = (movies) => {
    setFoundMovies(movies);
  };

  const fetchData = async () => {
    // console.log(foundMovies);
    try {
      // console.log(inputValue);
      const response = await axios.post(SEARCH_MOVIE_BY_TITLE, JSON.stringify({title: inputValue}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });
      await handleFoundMoviesChange(response.data.Search);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  },[inputValue]);

  const _handleKeyDown = async (e) => {
    if (e.key === 'Enter') {

      // console.log(foundMovies);

      await handleFoundMoviesChange(foundMovies);
    }
  }

  return (
    <div className="box">
      <div className="row header">
        <div className="row header">
          <div id='header-container'>
            <h1 id='header-logo'>Moovy</h1>
            <span className='clicked'>Search</span>
            <span className='no-clicked'><Link className='no-clicked' to="/mylibrary">My Library</Link></span>
          </div>
        </div>
        <div id='search-bar-container'>
          <input placeholder='Type movie name' type="text" id="searchInput" value={inputValue} onChange={handleInputValueChange} onKeyDown={_handleKeyDown}/>
        </div>
      </div>
      <div className="row content">
        {foundMovies? (
          <div id='grid-container'>
            {foundMovies.map((movie, key) => (
              <MovieItem movies={movie} btnText='Adicionar na biblioteca' btnType='add'/>
            ))}
          </div>
        ) : (
        <div className='warning-container'>
          <p className='warning-404'>Sorry we couldn't find your movies :(</p>
        </div>)}
      </div>
    </div>
  );
}

export default Search;