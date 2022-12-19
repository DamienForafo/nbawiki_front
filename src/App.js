import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Players from './components/Players/Players';
import Player from './components/Player/Player';

function App() {
  return (
    <div className="App">
      <div id="searchBar">

      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Players />} />
        </Routes>
      </BrowserRouter>
      <div id="navBar">

      </div>
    </div>
  );
}

export default App;
