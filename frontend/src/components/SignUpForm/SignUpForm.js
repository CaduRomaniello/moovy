import React, { useState } from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";

import axios from '../../api/axios';

const PWD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const SignUpForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    //SignUp code
    event.preventDefault();

    if (username.length < 4 || username.length > 20){
      alert("Username must be between 4 and 20 characters long and cannot be empty")
      return;
    }
    if (!PWD_REGEX.test(password) || password.length < 8 || password.length > 32){
      alert("Password must be between 8 and 32 characters long, cannot be empty, must have an uppercase letter, a lowercase letter, a number and a special character")
      return 
    }

    try{
      const response = await axios.post('/auth', JSON.stringify({username, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      })
      // console.log(response.data);
      // console.log(response.accessToken);
      // console.log(JSON.stringify(response));
      navigate("/");
    } catch(err) {
      console.log(err);
    }
    
  };

  return (
    <>
    <div id='container'>
      <h1 className='sign-up-title'>Moovy</h1>
      <h3>Sign up</h3>
      <div id='username-input'>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div id='password-input'>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div id='form-buttons'>
        <button type="signup" onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
    </>
  );
};

export default SignUpForm;