import React from 'react';
import './GameCard.css';

export default function GameCard(props) {
    return (
        <div className="gameCard hoverable">
            <h3>{props.teams}</h3>
            <p>{props.date}</p>
        </div>
    )
}