import React, { useState, useEffect } from 'react'
import Cards from './Cards/Cards';
import { BsSuitDiamond } from 'react-icons/bs';

const Board = () => {

    const [cardsData, setCardsData] = useState(Cards)
    const [cards, setCards] = useState([])
    const [board, setBoard] = useState([])
    // const randomCard = Math.floor(Math.random() * 12 + 1)
    // console.log(randomCard)

    
    let i = 0

    const randomCard = () => {
        for (i = 0; i < 5; i++){
            const randomIndex = Math.floor(Math.random() * cardsData.length);
            const item = cardsData[randomIndex]
            randomHand.push(item)
        }
    }
    let randomHand = [

    ]

    console.log(randomHand)
    useEffect(() => {
        randomCard()
    }, [])


    return (<div className='Board'>
        {randomHand.map((card) =>
            <div key={card.title} onClick={() => handleCard(card.value)} className="Board-Cards">
                <span className="card-title-top">{card.value}</span>
                <span className="card-icon" ><BsSuitDiamond /></span>
                <span className="card-title-bottom">{card.value}</span>
            </div>
        )}
    </div>)

}
export default Board;


