import React, { useState } from 'react';
import logo from './nbawiki-logo.png';
import './App.css';
import {Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import Players from './components/Players/Players';
import Player from './components/Player/Player';
import Teams from './components/Teams/Teams';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];

  const navigate = useNavigate();

  const navigateToPlayers = () => {navigate('/players');}
  const navigateToTeams = () => {navigate('/teams');}
  const navigateToGames = () => {navigate('/games');}


  const [getSuggestion, setSuggestion] = useState(false);
  function switchSuggestion() {setSuggestion(! getSuggestion);}


  return (
    <div className="App">
      <aside id="searchBar">
        <div id="filters">
          <input></input>
          <button onClick={switchSuggestion}></button>
          {
            getSuggestion &&
            <div id="searchSuggestion">
              
            </div>
          }
        </div>
        <img src={logo} alt="Logo de NBAwiki" />
      </aside>
      <Routes>
        <Route path="/players" element={<Players />} />
        <Route path="/" element={<Navigate to="/players" />} />
        <Route path="/players/:playerId" element={<Player />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <nav id="navBar" className={currentPage}>
        <button id="playersButton" onClick={navigateToPlayers}>JOUEURS</button>
        <button id="teamsButton" onClick={navigateToTeams}>EQUIPES</button>
        <button id="gamesButton" onClick={navigateToGames}>MATCHS</button>
      </nav>
    </div>
  );
}

export default App;
