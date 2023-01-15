import React from 'react';
import {useParams} from 'react-router-dom';
import './Team.css';
import '../page.css';

export default function Team(props) {
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
            <button className="mainInteraction hoverable" onClick={props.navigateToTeams}></button>
            <h1>coucou</h1>
            Team Id : {params.teamId}
        </main>
    )
}