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
                props.state &&
                <div className="selectDropdown">
                    {
                        props.options.map(option => {
                            let selectedClass = (option.value === props.selected.value) ? 'selected' : '';
                            return <p key={option.value} className={selectedClass} onClick={e => props.sendSelected(option)}>{option.label}</p>
                        })
                    }
                </div>
            }
        </div>
    )
}