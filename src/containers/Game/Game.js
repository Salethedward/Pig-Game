import React, { Component } from 'react'
import Player from '../../components/Player/Player'
import Dice from '../../components/Dice/Dice'

import './Game.css'

class Game extends Component {
    state = {
        players: [
            {id: 1, name:'Player 1', score: 0, currentScore: 0, disable: false, activate: 'active'}, 
            {id: 2, name:'Player 2', score: 0, currentScore: 0, disable: true, activate: ''}
        ],
        gamePlaying: false,
        diceRoll: 0,
        finalScore: 20
    }

    /**
     * Enable and disable the Roll dice and hold button of the current player. 
     * placing active lable to the next player
    **/
    buttonDisableEnable(index, player, players) {
        if (index === 0) {
            player.disable = true
            player.activate = ''
            players[1].disable = false
            players[1].activate = 'active'
        } else {
            player.disable = true
            player.activate = ''
            players[0].disable = false
            players[0].activate = 'active'
        }
    }

    // Rolling the dice and updating the current score of the current player
    rollDiceHandler = (index) => {
        const dice = Math.floor(Math.random() * 6)
        const newDice = dice + 1

        const players = [...this.state.players]
        const player = {...this.state.players[index]}

        let score = player.currentScore
        let playing
        if (dice !== 0) {
            score += newDice
            playing = true
        } else {
            score = 0
            playing = false
            // Next player
            this.buttonDisableEnable(index, player, players)
        }

        player.currentScore = score
        players[index] = player

        this.setState({ diceRoll: dice, players: players, gamePlaying: playing })
    }

    // Updating the main score for the current player
    holdButtonHandler = (index) => {
        const players = [...this.state.players]
        const player = {...this.state.players[index]}
        player.score += player.currentScore
        player.currentScore = 0

        // Next player
        this.buttonDisableEnable(index, player, players)

        // Player wins
        if (player.score >= this.state.finalScore) {
            players[0].disable = true
            players[1].disable = true
            players[0].activate = ''
            players[1].activate = ''
            player.name = 'Winner!'
        }

        players[index] = player

        this.setState({ players: players, gamePlaying: false })
    }

    // Setting the final score of the game
    inputChangedHandler = (event) => {
            this.setState({ finalScore: event.target.value })
    }

    // Setting the state to the initial state
    newGameButtonHandler = () => {
        this.setState({
            players: [
                {id: 1, name:'Player 1', score: 0, currentScore: 0, disable: false, activate: 'active'}, 
                {id: 2, name:'Player 2', score: 0, currentScore: 0, disable: true, activate: ''}
            ],
            gamePlaying: false,
            diceRoll: 0,
            finalScore: 20
        })
    }

    render () {
        return (
            <div className="wrapper clearfix">
                {
                    this.state.players.map((player, index) => (
                        <Player 
                            key={player.id} 
                            player={player.name}
                            score={player.score}
                            current={player.currentScore} 
                            disabled={player.disable}
                            activated={player.activate}
                            rollClicked={() => this.rollDiceHandler(index)}
                            holdClicked={() => this.holdButtonHandler(index)} />
                    ))
                }
                <button className="btn-new" onClick={this.newGameButtonHandler}>New game</button>
                <input 
                    type="text" 
                    placeholder="Final score" 
                    className="final-score"
                    onChange={this.inputChangedHandler}
                    value={this.state.finalScore} />
                <Dice 
                    dice={this.state.diceRoll} 
                    playing={this.state.gamePlaying} />
            </div>
        )
    }
}

export default Game