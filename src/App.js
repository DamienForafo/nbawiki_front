import React, { useState } from 'react';
import logo from './logo.svg';
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
  const navigateToRanking = () => {navigate('/ranking');}
  const navigateToProfile = () => {navigate('/profile');}


  const [getSuggestion, switchSuggestion] = useState(false);


  return (
    <div className="App">
      <aside id="searchBar">
        <input></input>
          <button onClick={() => switchSuggestion(! getSuggestion)}></button>
        <img src="" alt="Logo de NBAwiki" />
        {
          getSuggestion &&
            <div id="searchSuggestion">
              
            </div>
        }
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
        <button id="rankingButton" onClick={navigateToRanking}>CLASSEMENT</button>
        <button id="profileButton" onClick={navigateToProfile}>PROFIL</button>
      </nav>
    </div>
  );
}

export default App;
