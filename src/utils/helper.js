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
	}
];

export const getCARDS = (level = 2) => {
	let myCards = [];

	for (let i = 0; i < level; i++) {
		myCards = myCards.concat( [...CARDS].map(card => ({...card})) );
	}
	return myCards;
}

