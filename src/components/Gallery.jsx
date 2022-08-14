import React from 'react';
import { SGalleryContainer, SGallery, STitle } from '../utils/style';

const Gallery = (props) => {

	const displayWonTokens = () => {
		return props.tokenURIs.map( 
			(tokenURI, i) => (
				<img key={i} style={{maxWidth: '90px'}} src={tokenURI} alt="token won" className="img-fluid" />
			) 
		);
	}

	return (
		<SGalleryContainer className="text-center">
			<STitle className="mb-4">Wall of Victory</STitle>
			<SGallery className="mx-auto">{displayWonTokens()}</SGallery>
		</SGalleryContainer>
	);
}

export default Gallery;