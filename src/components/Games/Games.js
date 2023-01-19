import React , { useState, useEffect } from 'react';
import './Games.css';
import '../page.css';
import GameCard from './GameCard';

export default function Games(props) {
    const [games, setGames] = useState([]);
    useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/games?season=' + props.season)
            .then((res) => {
                return res.json();
            })
            .then((data) => setGames(data));
    }, [props.season]);
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