import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Select from './components/Select/Select';
import Players from './components/Players/Players';
import Player from './components/Player/Player';
import Teams from './components/Teams/Teams';
import Team from './components/Team/Team';
import Games from './components/Games/Games';
import Game from './components/Game/Game';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import logo from './images/nbawiki-logo.png';


function App() {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];

  const navigate = useNavigate();

  function navigateToPlayers() { navigate('/players'); }
  function navigateToPlayer(playerId) { navigate(`/players/${playerId}`); }
  function navigateToTeams() { navigate('/teams'); }
  function navigateToTeam(teamId) { navigate(`/teams/${teamId}`); }
  function navigateToGames() { navigate('/games'); }
  function navigateToGame(gameId) { navigate(`/games/${gameId}`); }


  const [inputValue, setInputValue] = useState('');
  const [searchedPlayers, setSearchedPlayers] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        if (!suggestionsDisplayed) setSuggestionsDisplayed(true);
        fetch(`https://nba-wiki-back.herokuapp.com/players/search?name=${inputValue}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setSearchedPlayers(data));
      }
      else {
        collapseSuggestions();
        setSearchedPlayers([]);
      }
    }, 500)
    return () => clearTimeout(timer);
  }, [inputValue])

  const [filtersDisplayed, setFiltersDisplayed] = useState(false);
  function collapseFilters() {
    if (filtersDisplayed) setFiltersDisplayed(false);
    collapseDropdowns();
  }
  function switchFilters() {
    collapseFilters();
    setFiltersDisplayed(!filtersDisplayed);
  }

  const [suggestionsDisplayed, setSuggestionsDisplayed] = useState(false);
  function collapseSuggestions() { if (suggestionsDisplayed) setSuggestionsDisplayed(false); }

  function hidePanels() {
    collapseFilters();
    collapseSuggestions();
  }

  const [season, setSeason] = useState({ value: 2022, label: 2022 });
  function sendSeason(s) {
    setSeason(s);
    setSeasonSelectState(false);
  }
  const [seasonSelectState, setSeasonSelectState] = useState(false);
  function switchSeasonSelectState() { setSeasonSelectState(!seasonSelectState) }

  const [team, setTeam] = useState({ value: 'all', label: 'TOUTES' });
  function sendTeam(t) {
    setTeam(t);
    setTeamSelectState(false);
  }
  const [teamSelectState, setTeamSelectState] = useState(false);
  function switchTeamSelectState() { setTeamSelectState(!teamSelectState) }

  function collapseDropdowns() {
    if (seasonSelectState) setSeasonSelectState(false);
    if (teamSelectState) setTeamSelectState(false);
  }

  // Hardcode des saisons
  let seasonOptions = [];
  for (let s = 2022; s >= 1995; s--) { seasonOptions.push({ value: s, label: s }) }

  const [teamOptions, setTeamOptions] = useState([]);

  useEffect(() => {
    fetch('https://nba-wiki-back.herokuapp.com/teams')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTeamOptions([{value: 'all', label: 'TOUTES'}].concat(
          data.map(t => {
            return {value: t.id, label: t.full_name};
          })
        ));
      });
  }, []);


  return (
    <div className="App" onClick={hidePanels}>
      <aside id="searchBar">
        <div id="searchAndfilters">
          <input
            type="text"
            placeholder="Chercher..."
            value={inputValue}
            title="Chercher dans l'application"
            className="mainInteraction hoverable"
            onChange={e => setInputValue(e.target.value)}
          />
          <button className="mainInteraction hoverable" onClick={switchFilters} title="Afficher / Masquer les filtres"></button>
          {
            filtersDisplayed &&
            <div id="filterPanel" onClick={e => {
              e.stopPropagation();
              collapseDropdowns();
            }}>
              <h2>FILTRER</h2>
              <Select
                label="SAISON"
                selected={season}
                state={seasonSelectState}
                options={seasonOptions}
                sendState={switchSeasonSelectState}
                sendSelected={sendSeason}
                title="Filtrer sur une saison"
              />
              <Select
                label="EQUIPE"
                selected={team}
                state={teamSelectState}
                options={teamOptions}
                sendState={switchTeamSelectState}
                sendSelected={sendTeam}
                title="Filtrer sur une équipe"
              />
            </div>
          }
          {
            suggestionsDisplayed &&
            <div id="suggestions" onClick={e => e.stopPropagation()}>
              {
                searchedPlayers.map(player => {
                  return <p
                    key={player.id}
                    className="hoverable"
                    onClick={() => {
                      hidePanels();
                      navigateToPlayer(player.id);
                    }}
                  >
                    <span>{`${player.first_name} ${player.last_name}`}</span>
                    <span>{player.team.abbreviation}</span>
                  </p>
                })
              }
            </div>
          }
        </div>
        <img src={logo} alt="Logo de NBAwiki" title="Logo de NBAwiki" onClick={navigateToPlayers} />
      </aside>
      <Routes>
        <Route path="/players" element={<Players teamId={team.value} navigateToPlayer={navigateToPlayer} />} />
        <Route path="/" element={<Navigate to="/players" />} />
        <Route path="/players/:playerId" element={<Player season={season.value} navigateToTeam={navigateToTeam} navigateToPlayers={navigateToPlayers} />} />
        <Route path="/teams" element={<Teams navigateToTeam={navigateToTeam} />} />
        <Route path="/teams/:teamId" element={<Team navigateToTeams={navigateToTeams} />} />
        <Route path="/games" element={<Games season={season.value} navigateToGame={navigateToGame} />} />
        <Route path="/games/:gameId" element={<Game navigateToTeam={navigateToTeam} navigateToGames={navigateToGames} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <nav id="navBar" className={currentPage}>
        <button id="playersButton" title="Naviguer vers la page Joueurs" onClick={navigateToPlayers}>JOUEURS</button>
        <button id="teamsButton" title="Naviguer vers la page Equipes" onClick={navigateToTeams}>EQUIPES</button>
        <button id="gamesButton" title="Naviguer vers la page Matchs" onClick={navigateToGames}>MATCHS</button>
      </nav>
    </div>
  );
}

export default App;
