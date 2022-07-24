import React from 'react';
import { SGallery } from '../utils/style';

const Gallery = (props) => {

	const displayWonTokens = () => {
		return props.tokenURIs.map( 
			(tokenURI, i) => (
				<img key={i} style={{maxWidth: '90px'}} src={tokenURI} alt="token won" className="img-fluid" />
			) 
		);
	}

	return (
		<SGallery className="my-4 mx-auto">{displayWonTokens()}</SGallery>
	);
}

export default Gallery;