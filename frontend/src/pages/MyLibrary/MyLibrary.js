import {React, useState, useEffect, useContext} from 'react';
import './styles.css';
import MovieItem from '../../components/MovieItem/MovieItem';
import { Link } from 'react-router-dom';

import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';

const SEARCH_USER_MOVIES = '/movie/all';
 

const MyLibrary = () =>{

  const { auth } = useContext(AuthContext);
  const [foundMovies, setFoundMovies] = useState([]);
  const [render, setRender] = useState(true);

  const handleFoundMoviesChange = (movies) => {
    setFoundMovies(movies);
  };
  const handleRenderChange = (value) => {
    setRender(value);
  };

  const fetchData = async () => {
    console.log("auth: ", auth);
    const myMovies = [];
    try {
      const response = await axios.post(SEARCH_USER_MOVIES, {}, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      }).then((response) => {
        response.data.forEach((element) => {
          myMovies.push({
            Poster: element.posterUrl,
            Title: element.title,
            imdbID: element.imdbId,
            imdbRating: element.imdbRating,
            userRating: element.userRating
          });
        })

        handleFoundMoviesChange(myMovies);
      })
    } catch (error) {
      console.log('erro');
      console.log(error);
    }
  }

  useEffect(() => {
    async function callFetch() {
      await fetchData()
    }

    callFetch();

    console.log('found movies ', foundMovies);
  },[]);

  return (
    <div className="box">
      <div className="row header">
        <div id='header-container'>
          <h1 id='header-logo'>Moovy</h1>
          <span className='no-clicked'><Link className='no-clicked' to="/search">Search</Link></span>
          <span className='clicked'>My Library</span>
        </div>
      </div>
      <div className="row content">
        {foundMovies? (
          <div id='grid-container'>
            {foundMovies.map((movie, key) => (
              <MovieItem movies={movie} btnText='Remover da biblioteca' btnType='remove' callbackFunction={handleRenderChange}/>
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

export default MyLibrary;