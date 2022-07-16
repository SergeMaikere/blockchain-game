import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CARDS = [

	{
		name: 'fries',
		img: '/images/fries.jpg',
		selected: false
	},
	{
		name: 'cheeseburger',
		img: '/images/cheeseburger.png',
		selected: false
	},
	{
		name: 'hot-dog',
		img: '/images/hot-dog.jpg',
		selected: false
	},
	{
		name: 'ice-cream',
		img: '/images/ice-cream.jpg',
		selected: false
	},
	{
		name: 'milkshake',
		img: '/images/milkshake.png',
		selected: false
	},
	{
		name: 'pizza',
		img: '/images/pizza.jpg',
		selected: false
	},
	{
		name: 'fries',
		img: '/images/fries.jpg',
		selected: false
	},
	{
		name: 'cheeseburger',
		img: '/images/cheeseburger.png',
		selected: false
	},
	{
		name: 'hot-dog',
		img: '/images/hot-dog.jpg',
		selected: false
	},
	{
		name: 'ice-cream',
		img: '/images/ice-cream.jpg',
		selected: false
	},
	{
		name: 'milkshake',
		img: '/images/milkshake.png',
		selected: false
	},
	{
		name: 'pizza',
		img: '/images/pizza.jpg',
		selected: false
	}
];

const Simg = styled.img`
	max-width: 100px;
	cursor: pointer;
	transition: all .2s ease-in-out;
;	&:hover{ transform: scale(1.1); }
`

const Game = () => {

	/**
	 * Returns an array of jsx elements
	 *
	 * @param      Array  of objects
	 * @return     JSX element  Images of the cards
	 */
	const displayCards = arr => {
		return arr.map(
			(card, i) => (
				<Simg 
				className="img-fluid" 
				key={i} 
				src={setCardFace(card)}
				data-id={i} 
				alt={'card of ' + card.name} 
				onClick={selectCard} />
			)
		)
	}

	/**
	 * Choose the visible face of the card
	 *
	 * @param      object  card    The card
	 * @return     string  address of the image
	 */
	const setCardFace = card => card.selected ? card.img : '/images/blank.png';
	
	const selectCard = e => {
		const myCards = [ ...cards ];
		myCards[e.target.dataset.id].selected = true;
		setCards( myCards );
		setSelectedCards( [...selectedCards, e.target.dataset.id] )
	}

	//Shuffle deck
	const randomSortCards = arr => [ ...arr.sort(() => 0.5 - Math.random()) ]
	
	const [ cards, setCards ] = useState( randomSortCards(CARDS) );

	const [ selectedCards, setSelectedCards ] = useState( [] );

	useEffect(
		() => {
			//Leaves if only 1 card is selected
			if ( selectedCards.length !== 2 ) return;

			//leave if the cards are a match
			if ( isMatch() ) {
				setSelectedCards( [] );
				return;
			}

			//If 2 card are selected and are not a match, flip them after 1s
			setTimeout(
				() => {
					selectedCards.forEach( cardId => cards[cardId].selected = false )
					setSelectedCards( [] );
			    }, 1000
		    )
		}, [selectedCards]
	)

	const isMatch = () => cards[ selectedCards[0] ].name === cards[ selectedCards[1] ].name;
	
	return (
		<div style={{maxWidth: '400px'}} className="my-4 mx-auto">
			{displayCards(cards)}
		</div>
	)
}

export default Game;