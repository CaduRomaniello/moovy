import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Search from './pages/Search/Search';
import MyLibrary from './pages/MyLibrary/MyLibrary';
 
class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
 
export default App;