import React from 'react';
import './PlayerCard.css';

export default function PlayerCard(props) {
    return (
        <div className="playerCard hoverable" onClick={props.nav}>
            <h3>{props.name}</h3>
            <p>{props.team}</p>
        </div>
    )
}