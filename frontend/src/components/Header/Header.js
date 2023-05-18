import React from 'react';
import './styles.css';

const Header = () => {

  return (
    <>
    <div id='header-container'>
      <h1 id='header-logo'>Moovy</h1>
      <span className='clicked'>Search</span>
      <span>My Library</span>
    </div>
    </>
  );
};

export default Header;