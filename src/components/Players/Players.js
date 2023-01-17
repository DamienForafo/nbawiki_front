import React, { useEffect, useState } from 'react';
import './Players.css';
import '../page.css';
import PlayerCard from './PlayerCard';

export default function Players(props) {
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        const urlSuffix = (props.teamId === 'all') ? '' : `/team?teamid=${props.teamId}`;
        const url = 'https://nba-wiki-back.herokuapp.com/players' + urlSuffix;
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {if (! Object.keys(data).includes('message')) setPlayers(data)});
    }, [props.teamId]);
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