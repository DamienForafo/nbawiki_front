import React from 'react';
import './Select.css';

export default function Select(props) {
    return (
        <div className="select">
            <label>{props.label}</label>
            <p className="selectButton" onClick={props.sendState} title={props.title}>
                {props.selected.label}
            </p>
            {
                props.state && // Mettre .active sur le p déjà choisi
                <div className="selectDropdown">
                    <p onClick={e => props.sendSelected(props.options[0])}>{props.options[0].label}</p>
                    <p onClick={e => props.sendSelected(props.options[1])}>{props.options[1].label}</p>
                    <p onClick={e => props.sendSelected(props.options[2])}>{props.options[2].label}</p>
                </div>
            }
        </div>
    )
}