import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Game.css';
import '../page.css';

export default function Game(props) {
    const params = useParams();
    const [calledApi, setCalledApi] = useState(false);
    const [game, setGame] = useState({});
    const [homeTeam, setHomeTeam] = useState({});
    const [visitorTeam, setVisitorTeam] = useState({});
    useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/games/id?id=' + params.gameId)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.id) {
                    let g = data;
                    g.date = g.date.substring(0, 10);
                    setGame(g);
                    setHomeTeam(data.home_team);
                    setVisitorTeam(data.visitor_team);
                }
                setCalledApi(true);
            });
    }, [params.gameId]);
    return (
        <main id="game" className="page">
            <button className="mainInteraction hoverable" onClick={props.navigateToGames}></button>
            {
                calledApi && (! game.id) && 
                <h1>Ce match n'existe pas</h1>
            }
            {
                game.id && 
                <h1>{`${homeTeam.name} VS ${visitorTeam.name}`}</h1>
            }
            {
                game.id && 
                <p>{game.date}&emsp;{game.status}</p>
            }
            {
                game.id && 
                <div id="gameTeams">
                    <div>
                        <h3 onClick={() => props.navigateToTeam(homeTeam.id)}>{homeTeam.full_name}</h3>
                        <p>{game.home_team_score}</p>
                        <p>Domicile</p>
                    </div>
                    <div>
                        <h3 onClick={() => props.navigateToTeam(visitorTeam.id)}>{visitorTeam.full_name}</h3>
                        <p>{game.visitor_team_score}</p>
                        <p>Visiteur</p>
                    </div>
                </div>
            }
        </main>
    )
}