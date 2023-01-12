import React, {useState, useEffect} from 'react';
import './App.css';
import {Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import Select from './components/Select/Select';
import Players from './components/Players/Players';
import Player from './components/Player/Player';
import Teams from './components/Teams/Teams';
import Team from './components/Team/Team';
import Games from './components/Games/Games';
import Game from './components/Game/Game';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';


function App() {
  const [offline, setoffline] = React.useState(navigator.onLine)

  const handleOffline = () => {
    setoffline(navigator.onLine)
  }
  
  React.useEffect(() => {
    window.addEventListener("online", handleOffline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener('online', handleOffline);
      window.removeEventListener('offline', handleOffline);
    };
  },[])


  useEffect(() => {
    if (! offline) navigate('/nimp');
  }, [offline])




  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];

  const navigate = useNavigate();

  function navigateToPlayers () {navigate('/players');}
  function navigateToTeams () {navigate('/teams');}
  function navigateToGames () {navigate('/games');}

  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        if (! suggestionsDisplayed) setSuggestionsDisplayed(true);
        console.log('appel API');
      }
      else collapseSuggestions();
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
    setFiltersDisplayed(! filtersDisplayed);
  }

  const [suggestionsDisplayed, setSuggestionsDisplayed] = useState(false);
  function collapseSuggestions() {if (suggestionsDisplayed) setSuggestionsDisplayed(false);}

  function hidePanels() {
    collapseFilters();
    collapseSuggestions();
  }
  
  const [season, setSeason] = useState({value: 'a', label: 'A'});
  function sendSeason(s) {
    setSeason(s);
    setSeasonSelectState(false);
  }
  const [seasonSelectState, setSeasonSelectState] = useState(false);
  function switchSeasonSelectState() {setSeasonSelectState(! seasonSelectState)}

  const [team, setTeam] = useState({value: 'all', label: 'TOUTES'});
  function sendTeam(t) {
    setTeam(t);
    setTeamSelectState(false);
  }
  const [teamSelectState, setTeamSelectState] = useState(false);
  function switchTeamSelectState() {setTeamSelectState(! teamSelectState)}

  function collapseDropdowns() {
    if (seasonSelectState) setSeasonSelectState(false);
    if (teamSelectState) setTeamSelectState(false);
  }

  const seasonOptions = [
    {value: 'a', label: 'A'},
    {value: 'b', label: 'B'},
    {value: 'c', label: 'C'}
  ]; // à virer
  const teamOptions = [
    {value: 'a', label: 'A'},
    {value: 'b', label: 'B'},
    {value: 'c', label: 'C'}
  ]; // à virer


  return (
    <div className="App" onClick={hidePanels}>
      <aside id="searchBar">
        <div id="searchAndfilters">
          <input
            type="text"
            placeholder="Chercher..."
            value={inputValue}
            title="Chercher dans l'application"
            onChange={e => setInputValue(e.target.value)}
          />
          <button onClick={switchFilters} title="Afficher / Masquer les filtres"></button>
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

            </div>
          }
        </div>
        <img src="./nbawiki-logo.png" alt="Logo de NBAwiki" title="Logo de NBAwiki" onClick={navigateToPlayers} />
      </aside>
      <Routes>
        <Route path="/players" element={<Players />} />
        <Route path="/" element={<Navigate to="/players" />} />
        <Route path="/players/:playerId" element={<Player />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<Team />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:gameId" element={<Game />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <nav id="navBar" className={currentPage}>
        <button id="playersButton" title="Naviguer versl la page Joueurs" onClick={navigateToPlayers}>JOUEURS</button>
        <button id="teamsButton" title="Naviguer versl la page Equipes" onClick={navigateToTeams}>EQUIPES</button>
        <button id="gamesButton" title="Naviguer versl la page Matchs" onClick={navigateToGames}>MATCHS</button>
      </nav>
    </div>
  );
}

export default App;
