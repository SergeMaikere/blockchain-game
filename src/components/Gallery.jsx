import React from 'react';
import { SGallery, STitle } from '../utils/style';

const Gallery = (props) => {

	const displayWonTokens = () => {
		return props.tokenURIs.map( 
			(tokenURI, i) => (
				<img key={i} style={{maxWidth: '90px'}} src={tokenURI} alt="token won" className="img-fluid" />
			) 
		);
	}

	return (
		<div className="text-center my-5">
			<STitle className="mb-5">Wall of Victory</STitle>
			<SGallery className="mx-auto">{displayWonTokens()}</SGallery>
		</div>
	);
}

export default Gallery;