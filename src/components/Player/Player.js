import React from 'react';
import {useParams} from 'react-router-dom';
import './Player.css';
import '../page.css';

export default function Player() {
    const params = useParams();
    return (
        <main id="player" className="page">
            Player Id : {params.playerId}
        </main>
    )
}