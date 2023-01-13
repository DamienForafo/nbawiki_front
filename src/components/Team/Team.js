import React from 'react';
import {useParams} from 'react-router-dom';
import './Team.css';
import '../page.css';

export default function Team() {
    React.useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/teams/id')
            .then((res) => {
                return res.json();
            })
            .then((data) => console.log(data));
    }, []);
    const params = useParams();
    return (
        <main id="team" className="page">
            Team Id : {params.teamId}
        </main>
    )
}