import React, { useState } from 'react';
import './Players.css';
import '../page.css';
import PlayerCard from './PlayerCard';

export default function Players(props) {
    const [players, setPlayers] = useState([]);
    React.useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/players')
            .then((res) => {
                return res.json();
            })
            .then((data) => setPlayers(data));
    }, []);
    return (
        <main id="players" className="page">
            <h1>JOUEURS</h1>
            <div id="playersList">
                {
                    players.map(p => {
                        return <PlayerCard
                            key={p.id}
                            name={p.first_name + ' ' + p.last_name}
                            team={p.team.abbreviation}
                            nav={() => props.navigateToPlayer(p.id)}
                        />
                    })
                }
            </div>
        </main>
    )
}