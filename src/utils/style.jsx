import styled, { createGlobalStyle } from 'styled-components';

const Colors = {
	primary: '#4e4fa5',
	secondary: '#d62f45',
	triaton: '#f1b74f',
	quadrature: '#f5f1f3'
}

const GlobalStyle = createGlobalStyle`
	@font-face {
	    font-family: 'babaprobold';
	    src: url('${window.location.origin}/fonts/BabaPro/babaprobold-ovgqo-webfont.woff2') format('woff2'),
	         url('${window.location.origin}/fonts/BabaPro/babaprobold-ovgqo-webfont.woff') format('woff');
	    font-weight: normal;
	    font-style: normal;

	}

	* {
      	font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
      	color: ${Colors.primary};
      	border-radius: 0 !important;
   	}

   	html, body {
	  	margin: 0px;
	  	height: 10vh;
	  	background-color: ${Colors.quadrature};
	}
`;

const SBigTitle = styled.h1`
	font-family: babaprobold;
	color: ${Colors.secondary};
	font-size: 4em;
`

const STitle = styled.h2`
	font-family: babaprobold;
	text-decoration: underline ${Colors.triaton} solid;
`;

const SImg = styled.img`
	max-width: 100px;
	cursor: pointer;
	transition: all .2s ease-in-out;
	&:hover{ transform: scale(1.1); }
`;


const SGameContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	max-width: 500px;
	padding: 30px;
	padding-top: 300px;
`;

const SGallery = styled.div`
	margin-top: 60px;
	max-width: 600px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const SCard = styled.div`
	background-color: transparent !important;
`;

const SButton = styled.button`
	background-color: ${Colors.secondary};
	color: ${Colors.quadrature};
`;

export { 
	GlobalStyle, 
	Colors, 
	SBigTitle, 
	STitle, 
	SGameContainer, 
	SImg, 
	SGallery, 
	SButton, 
	SCard 
};