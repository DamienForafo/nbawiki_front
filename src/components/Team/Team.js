import React from 'react';
import {useParams} from 'react-router-dom';
import './Team.css';
import '../page.css';

export default function Team() {
    const params = useParams();
    return (
        <main id="team" className="page">
            Team Id : {params.teamId}
        </main>
    )
}