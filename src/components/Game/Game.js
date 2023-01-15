import React from 'react';
import {useParams} from 'react-router-dom';
import './Game.css';
import '../page.css';

export default function Game(props) {
    const params = useParams();
    return (
        <main id="game" className="page">
            <button className="mainInteraction hoverable" onClick={props.navigateToGames}></button>
            <h1>coucou</h1>
            Game Id : {params.gameId}
        </main>
    )
}