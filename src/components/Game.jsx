import React, { useState, useEffect } from 'react';
import { pipe, concat } from 'ramda';
import { getCARDS } from '../utils/helper';
import { SGameContainer, SImg, STitle } from '../utils/style';


const VICTORY = '/images/steve.png';

const SIMILAR_CARD_NUM = 2;

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
		if ( isSelectedCardFull() ) return;
		const myCards = [ ...cards ];
		myCards[e.target.dataset.id].selected = true;
		setCards( myCards );
		setSelectedCards( [...selectedCards, e.target.dataset.id] )
	}

	//Check no more than appropriate number of cards are selected
	const isSelectedCardFull = () => selectedCards.length === SIMILAR_CARD_NUM;

	//Shuffle deck
	const randomSortCards = arr => [ ...arr.sort(() => 0.5 - Math.random()) ]
	
	const [ cards, setCards ] = useState( randomSortCards(getCARDS(SIMILAR_CARD_NUM)) );

	const [ selectedCards, setSelectedCards ] = useState( [] );

	const [ hardWonCard, setHardWonCard ] = useState( [] );

	//Goes into effect each time selectedCards changes
	useEffect(
		() => {
			
			console.log(cards);
			console.log(selectedCards);
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

			//Leaves if not all required card are selected
			if ( selectedCards.length < SIMILAR_CARD_NUM ) return;

			//If a match, save Token, if not a match, flip them after 1s
			isMatch() ? saveWonToken() : setTimeout( () => handleWrongMatchup(selectedCards), 1000 );

		}, [selectedCards]
	)

	const showBlankFace = arr => arr.forEach( id => cards[id].selected = false );

	const isMatch = () => selectedCards.every( id => cards[ selectedCards[0] ].name === cards[ id ].name );

	//Set Token path correctly
	const setURI = id => `${window.location.origin}${cards[id].img}`;

	const saveWonCardIds = arr => {
		setHardWonCard(concat( hardWonCard, arr ));
		return arr;
	}

	const displayWonToken = arr => {
		props.displayNewToken( [...props.tokenURIs, setURI(arr[0])] );
		return arr;
	}

	//Show victory card in place of matched cards
	const displayWonFace = arr => arr.forEach( id => cards[id].img = VICTORY );

	const emptySelectedCards = arr => {
		setSelectedCards( [] );
		return 'New Token successfully saved';
	}
	
	const handleWrongMatchup = pipe( showBlankFace, emptySelectedCards );
	
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