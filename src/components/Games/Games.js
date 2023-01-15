import React , { useState } from 'react';
import './Games.css';
import '../page.css';
import GameCard from './GameCard';

export default function Games(props) {
    const [games, setGames] = useState([]);
    React.useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/games?date=2018-10-16')
            .then((res) => {
                return res.json();
            })
            .then((data) => setGames(data));
    }, []);
    return (
        <main id="games" className="page">
            <h1>MATCHS</h1>
            <div id="gamesList">
                {
                    games.map(g => {
                        return <GameCard
                            key={g.id}
                            teams={`${g.home_team.abbreviation} vs ${g.visitor_team.abbreviation}`}
                            date={g.date}
                            nav={() => props.navigateToGame(g.id)}
                        />
                    })
                }
            </div>
        </main>
    )
}