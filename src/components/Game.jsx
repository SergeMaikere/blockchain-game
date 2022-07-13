import React, { useState } from 'react';
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

	const randomSortCards = arr => [ ...arr.sort(() => 0.5 - Math.random()) ]
	
	const setCardFace = card => card.selected ? card.img : '/images/blank.png';

	const displayCards = arr => {
		return arr.map(
			(card, i) => (
				<Simg 
				className="img-fluid" 
				key={i} src={setCardFace(card)}
				data-id={i} 
				alt={'card of ' + card.name} 
				onClick={toggleSelected} />
			)
		)
	}

	const toggleSelected = e => {
		const myCards = [ ...cards ];
		myCards[e.target.dataset.id].selected = true;
		setCards( myCards );
	}

	const [ cards, setCards ] = useState( randomSortCards(CARDS) );

	return (
		<div style={{maxWidth: '400px'}} className="my-4 mx-auto">
			{displayCards(cards)}
		</div>
	)
}

export default Game;