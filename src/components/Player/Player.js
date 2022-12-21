import React from 'react';
import {useParams} from 'react-router-dom';
import './Player.css';
import '../page.css';

export default function Player() {
    const params = useParams();
    return (
        <div id="Player" className="page">
            PLayer Id : {params.playerId}
        </div>
    )
}