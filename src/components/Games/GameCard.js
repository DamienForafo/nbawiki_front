import React from 'react';
import './GameCard.css';

export default function GameCard(props) {
    return (
        <div className="gameCard hoverable" onClick={props.nav}>
            <h3>{props.teams}</h3>
            <p>{props.date.substring(0, 10)}</p>
        </div>
    )
}