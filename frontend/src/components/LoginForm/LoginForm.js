import React, { useState, useContext } from 'react';
import './styles.css';
import {
  Link,
  useNavigate
} from "react-router-dom";
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';

const LOGIN_URL = '/auth/signin';

const LoginForm = () => {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (username ==='') {
      alert("Username is empty");
      return;
    }
    if (password ==='') {
      alert("Password is empty");
      return;
    }

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({username, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      });

      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({username, password, accessToken});
      // console.log('a')
      navigate("/search");
      // console.log('b')
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <>
    <div id='container'>
      <h1 id='signin-title'>Moovy</h1>
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
        <button type="signin" onClick={handleSubmit}>Sign In</button>
        <button type="signup" onClick={signUp}><Link to="/signup">Sign Up</Link></button>
      </div>
    </div>
    </>
  );
};

export default LoginForm;