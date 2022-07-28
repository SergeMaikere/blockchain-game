import React, { useState, useEffect } from 'react';
import { pipe, concat } from 'ramda';
import { getCARDS } from '../utils/helper';
import { SGameContainer, SCardsContainer, SImg, STitle } from '../utils/style';
import SelectLevel from './SelectLevel';

const Game = props => {

	//Shuffle deck
	const randomSortCards = arr => [ ...arr.sort(() => 0.5 - Math.random()) ];

	const [ numToMatch, setNumToMatch ] = useState( 2 );
	
	const [ cards, setCards ] = useState( randomSortCards(getCARDS()) );

	const [ selectedCards, setSelectedCards ] = useState( [] );

	const [ hardWonCard, setHardWonCard ] = useState( [] );

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
	const isSelectedCardFull = () => selectedCards.length === numToMatch;

	//Goes into effect each time selectedCards changes
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

			//Leaves if not all required card are selected
			if ( selectedCards.length < numToMatch ) return;

			//If a match, save Token, if not a match, flip them after 1s
			isMatch() ? saveWonToken() : setTimeout( () => handleWrongMatchup(selectedCards), 900 );

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
	const displayWonFace = arr => arr.forEach( id => cards[id].img = setVictoryCard() );

	const setVictoryCard = () => {
		if (numToMatch === 2) return '/images/doge.png';
		if (numToMatch === 3) return '/images/dragon-ball.png';
		if (numToMatch === 4) return '/images/steve.png';
	}

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

	const changeLevel = level => {
		setNumToMatch( level );
		setCards( randomSortCards(getCARDS(level)) );
	}
	
	return (
		<SGameContainer>
			<SCardsContainer className="mx-auto">
				<STitle className="text-center mb-1">Challenge Your Memory</STitle>
				{displayCards(cards)}
			</SCardsContainer>
			<SelectLevel level={numToMatch} changeLevel={changeLevel} />
		</SGameContainer>
	)
}

export default Game;