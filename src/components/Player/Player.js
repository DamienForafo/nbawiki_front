import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Player.css';
import '../page.css';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

export default function Player(props) {
    const params = useParams();
    const [calledApi, setCalledApi] = useState(false);
    const [player, setPlayer] = useState({});
    useEffect(() => {
        fetch('https://nba-wiki-back.herokuapp.com/players/id?id=' + params.playerId)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.id) {
                    let p = data;
                    p.teamId = p.team.id;
                    p.team = p.team.abbreviation;
                    setPlayer(p);
                }
                setCalledApi(true);
            });
    }, [params.playerId]);
    const [playerStats, setPlayerStats] = useState({});
    useEffect(() => {
        fetch(`https://nba-wiki-back.herokuapp.com/players/stats?playerid=${params.playerId}&season=${props.season}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {if (data.length > 0) setPlayerStats(data[0])});
    }, [props.season]);
    return (
        <main id="player" className="page">
            <button className="mainInteraction hoverable" onClick={props.navigateToPlayers}></button>
            {
                calledApi && (! player.id) &&
                <h1>Ce joueur n'existe pas</h1>
            }
            {
                player.id &&
                <h1>{`${player.first_name} ${player.last_name}`}</h1>
            }
            {
                player.id &&
                <div id="playerInfos">
                    <div>
                        <p onClick={() => props.navigateToTeam(player.teamId)}>{player.team}</p>
                        <p>Equipe</p>
                    </div>
                    <div>
                        <p>{player.position}</p>
                        <p>Position</p>
                    </div>
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.ast}</p>
                            <p>Passes décisives</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.fg_pct}</p>
                            <p>Pourcentage au tir</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.fg3_pct}</p>
                            <p>Pourcentage à 3 points</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.games_played}</p>
                            <p>Matchs joués</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.min}</p>
                            <p>Minutes jouées par match</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.pts}</p>
                            <p>Points par match</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.reb}</p>
                            <p>Rebonds</p>
                        </div>
                    }
                    {
                        playerStats.player_id &&
                        <div>
                            <p>{playerStats.turnover}</p>
                            <p>Ballons perdus</p>
                        </div>
                    }
                </div>
            }
            {
                (! playerStats.player_id) &&
                <p>Pas de statistiques sur cette saison</p>
            }
        </main>
    )
}