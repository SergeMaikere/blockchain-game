import React from 'react';

const Gallery = (props) => {

	const displayWonTokens = () => {
		return props.tokenURIs.map( 
			(tokenURI, i) => (
				<img key={i} style={{maxWidth: '90px'}} src={tokenURI} alt="token won" className="img-thumbnails" />
			) 
		);
	}

	return (
		<div style={{maxWidth: '600px'}} className="my-4 mx-auto">{displayWonTokens()}</div>
	);
}

export default Gallery;