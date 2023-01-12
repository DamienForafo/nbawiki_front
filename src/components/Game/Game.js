import React from 'react';
import {useParams} from 'react-router-dom';
import './Game.css';
import '../page.css';

export default function Game() {
    const params = useParams();
    return (
        <main id="game" className="page">
            Game Id : {params.gameId}
        </main>
    )
}