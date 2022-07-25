import React, { useState, useEffect } from 'react';
import { pipe, concat } from 'ramda';
import { SGameContainer, SImg, STitle } from '../utils/style';

const CARDS = [

	{
		name: 'fries',
		img: '/images/fries.png',
		selected: false
	},
	{
		name: 'cheeseburger',
		img: '/images/cheeseburger.png',
		selected: false
	},
	{
		name: 'hot-dog',
		img: '/images/hot-dog.png',
		selected: false
	},
	{
		name: 'ice-cream',
		img: '/images/ice-cream.png',
		selected: false
	},
	{
		name: 'milkshake',
		img: '/images/milkshake.png',
		selected: false
	},
	{
		name: 'pizza',
		img: '/images/pizza.png',
		selected: false
	},
	{
		name: 'fries',
		img: '/images/fries.png',
		selected: false
	},
	{
		name: 'cheeseburger',
		img: '/images/cheeseburger.png',
		selected: false
	},
	{
		name: 'hot-dog',
		img: '/images/hot-dog.png',
		selected: false
	},
	{
		name: 'ice-cream',
		img: '/images/ice-cream.png',
		selected: false
	},
	{
		name: 'milkshake',
		img: '/images/milkshake.png',
		selected: false
	},
	{
		name: 'pizza',
		img: '/images/pizza.png',
		selected: false
	}
];

const VICTORY = '/images/steve.png';


const Game = props => {

	/**
	 * Returns an array of jsx elements
	 *
	 * @param      Array  of objects
	 * @return     JSX element  Images of the cards
	 */
	const displayCards = arr => {
		return arr.map(
			(card, i) => (
				<SImg 
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

	const [ hardWonCard, setHardWonCard ] = useState( [] );

	useEffect(
		() => {
			
			const saveWonToken = async () => {
				await props.token.methods
				.mint(props.account, setURI( selectedCards[0] ))
				.send( {from: props.account} )
				.on(
					'transactionHash', hash => {
						const success = updateAllStates(selectedCards);
						console.log(success);
					}
				)
			}

			//Leaves if only 1 card is selected
			if ( selectedCards.length !== 2 ) return;

			//If a match, save Token, if not a match, flip them after 1s
			isMatch() ? saveWonToken() : setTimeout( () => handleWrongMatchup(selectedCards), 1000 );

		}, [selectedCards]
	)

	const showHiddenFace = arr => arr.forEach( id => cards[id].selected = false );

	const isMatch = () => cards[ selectedCards[0] ].name === cards[ selectedCards[1] ].name;

	const setURI = id => `${window.location.origin}${cards[id].img}`;

	const saveWonCardIds = arr => {
		setHardWonCard(concat( hardWonCard, arr ));
		return arr;
	}

	const displayWonToken = arr => {
		props.displayNewToken( [...props.tokenURIs, setURI(arr[0])] );
		return arr;
	}

	const displayWonFace = arr => arr.forEach( id => cards[id].img = VICTORY );

	const emptySelectedCards = arr => {
		setSelectedCards( [] );
		return 'New Token successfully saved';
	}

	const handleWrongMatchup = pipe( showHiddenFace, emptySelectedCards );
	
	const updateAllStates = pipe(
		saveWonCardIds,
		displayWonToken,
		displayWonFace,
		emptySelectedCards
	);
	
	return (
		<SGameContainer className="mx-auto">
			<STitle className="text-center mb-5">Challenge Your Memory</STitle>
			{displayCards(cards)}
		</SGameContainer>
	)
}

export default Game;