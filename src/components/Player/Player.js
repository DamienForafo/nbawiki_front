import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Player.css';
import '../page.css';

export default function Player(props) {
    const params = useParams();
    const [player, setPlayer] = useState({});
    useEffect(() => {
        fetch(`https://nba-wiki-back.herokuapp.com/players/stats?playerid=${params.playerId}&season=2019`)
            .then((res) => {
                return res.json();
            })
            .then((data) => setPlayer(data));
    }, [props.season]);
    console.log(player);//virer
    return (
        <main id="player" className="page">
            <button className="mainInteraction hoverable" onClick={props.navigateToPlayers}></button>
            <h1>coucou</h1>
            Player Id : 
        </main>
    )
}