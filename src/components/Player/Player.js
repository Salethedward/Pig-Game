import React from 'react'
import './Player.css'

const player = (props) => (
    <div>
        <div className={`player-panel ${props.activated}`}>
            <div 
                className="player-name" 
                style={props.player === 'Winner!' ? {color: 'red'} : null}>{props.player}</div>
            <div className="player-score">{props.score}</div>
            <div className="player-current-box">
                <div className="player-current-label">Current</div>
                <div className="player-current-score">{props.current}</div>
            </div>
            <div className="button">
                <button 
                    className="btn" 
                    onClick={props.rollClicked} 
                    disabled={props.disabled}>Roll Dice</button>
                <button 
                    className="btn" 
                    onClick={props.holdClicked} 
                    disabled={props.disabled}>Hold</button>
            </div>
        </div>
    </div>
)

    


export default player