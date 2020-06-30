import React from 'react'
import './Dice.css'
import dice1 from '../../assets/images/dice-1.png'
import dice2 from '../../assets/images/dice-2.png'
import dice3 from '../../assets/images/dice-3.png'
import dice4 from '../../assets/images/dice-4.png'
import dice5 from '../../assets/images/dice-5.png'
import dice6 from '../../assets/images/dice-6.png'

const dice = (props) => {
    const dice =[dice1, dice2, dice3, dice4, dice5, dice6]

    let image = null
    if (props.playing) image = <img src={dice[props.dice]} alt="Dice" className="dice" id="dice-1" />

    return (
        <div>
            {image}
        </div>
    )
}

export default dice