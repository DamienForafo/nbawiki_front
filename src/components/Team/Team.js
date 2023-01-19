import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Team.css';
import '../page.css';

export default function Team(props) {
    const params = useParams();
    const [calledApi, setCalledApi] = useState(false);
    const [team, setTeam] = useState({});
    useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/teams/id?id=' + params.teamId)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTeam(data);
                setCalledApi(true);
            ;
        });
    }, [params.teamId]);
    return (
        <main id="team" className="page">
            <button className="mainInteraction hoverable" onClick={props.navigateToTeams}></button>
            {
                calledApi && (! team.id) && 
                <h1>Cette équipe n'existe pas</h1>
            }
            {
                team.id &&
                <h1>{`${team.full_name} (${team.abbreviation})`}</h1>
            }
            {
                team.id &&
                <div id="teamInfos">
                    <div>
                        <p>{team.city}</p>
                        <p>Ville</p>
                    </div>
                    <div>
                        <p>{team.conference}</p>
                        <p>Conférence</p>
                    </div>
                    <div>
                        <p>{team.division}</p>
                        <p>Division</p>
                    </div>
                </div>
            }
        </main>
    )
}