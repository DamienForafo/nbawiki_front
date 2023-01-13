import React from 'react';
import './TeamCard.css';

export default function TeamCard(props) {
    return (
        <div className="teamCard hoverable">
        <h3>{props.name}</h3>
        <p>{props.division}</p>
        </div>
    )
}