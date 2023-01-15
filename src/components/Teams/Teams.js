import React, { useState } from 'react';
import './Teams.css';
import '../page.css';
import TeamCard from './TeamCard';

export default function Teams(props) {
    const [teams, setTeams] = useState([]);
    React.useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/teams')
            .then((res) => {
                return res.json();
            })
            .then((data) => setTeams(data));
    }, []);
    return (
        <main id="teams" className="page">
            <h1>EQUIPES</h1>
            <div id="teamsList">
                {
                    teams.map(t => {
                        return <TeamCard
                            key={t.id}
                            name={t.full_name}
                            division={t.division}
                            nav={() => props.navigateToTeam(t.id)}
                        />
                    })
                }
            </div>
        </main>
    )
}