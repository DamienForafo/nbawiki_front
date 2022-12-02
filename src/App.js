import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Players from './components/Players/Players';

function App() {
  return (
    <div className="App">
      <div id="navBar">
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Players />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
