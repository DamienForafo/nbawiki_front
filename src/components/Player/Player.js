import React from 'react';
import {useParams} from 'react-router-dom';
import './Player.css';
import '../page.css';

export default function Player(props) {
    const params = useParams();
    return (
        <main id="player" className="page">
            <button className="mainInteraction hoverable" onClick={props.navigateToPlayers}></button>
            <h1>coucou</h1>
            Player Id : {params.playerId}
        </main>
    )
}