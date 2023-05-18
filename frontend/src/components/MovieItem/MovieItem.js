import {React, useState, useContext, useEffect} from 'react';
import './styles.css';

import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';

const SEARCH_MOVIE_BY_ID = '/omdb-api/imdb-id';
const ADD_MOVIE = '/movie'
const DELETE_MOVIE = '/movie/delete'

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

const MovieItem = (props) => {
  // console.log('props: ', props)

  const { auth } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [movieData, setMovieData] = useState({});
  const [render, setRender] = useState(true);

  const handleRatingChange = (movieRating) => {
    setRating(movieRating);
  };
  const handleMovieDataChange = (data) => {
    setMovieData(data);
  };
  const handleRenderChange = (value) => {
    setRender(value);
  };

  const addMovie = async (event) => {
    // console.log('props imdbID add movie: ', props.movies.imdbID);

    const response = await axios.post(ADD_MOVIE, JSON.stringify({imdbId: props.movies.imdbID, userRating: getRandomFloat(0.0, 10.0, 2)}), {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${auth.accessToken}`
      },
      withCredentials: true
    }).then((response) => {
      // console.log('response add movie: ', response);
      alert(`${response.data.title} added to your library`)
    }).catch((error) => {
      console.log(error);
      console.log(error.response);
      if (error.response.status === 409){
        alert(`${props.movies.Title} is already in your library`)
      }
    });
  }
  const removeMovie = async (event) => {
    // console.log('props imdbID remove movie: ', props.movies.imdbID);
    const title = props.movies.Title;

    const response = await axios.post(DELETE_MOVIE, JSON.stringify({imdbId: props.movies.imdbID}), {
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${auth.accessToken}`
      },
      withCredentials: true
    }).then(async (response) => {
      // console.log('response remove movie: ', response);
      await handleRenderChange(false);
      props.callbackFunction(false);
      alert(`${props.movies.Title} removed from your library`)
    }).catch((error) => {
      console.log(error);
    });
  }

  const fetchData = async () => {
    try {
      const response = await axios.post(SEARCH_MOVIE_BY_ID, JSON.stringify({imdbId: props.movies.imdbID}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      }).then((response) => {
        // console.log('response: ', response);
        handleRenderChange(true);
        handleMovieDataChange(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  },[]);

  useEffect(() => {
    if (props.btnType === 'remove'){
      handleRatingChange(props.movies.userRating);
    } else {
      handleRatingChange(movieData.imdbRating);
    }
  },[movieData]);

  return (
    <>
    {render?(
      <>
      <div key={props.movies.imdbID.toString()} className="grid-item">
      <div className='movie-item-container'>
        <div className='poster-container'><img src={props.movies.Poster} alt={props.movies.Title}></img></div>
        <div className='info-row'>
          <p>{props.movies.Title}</p>
          <p>⭐ {rating}</p>
        </div>
        {props.btnType==='add'?(
          <button className='add-movie-btn' onClick={addMovie}>{props.btnText}</button>
        ):(
          <button className='remove-movie-btn' onClick={removeMovie}>{props.btnText}</button>
        )}
      </div>
      </div>
      </>
    ):(
      <div></div>
    )}
    </>
  );
};

export default MovieItem;