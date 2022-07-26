import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MemoryToken from '../abis/MemoryToken.json';
import Navbar from './Navbar';
import Game from './Game';
import Gallery from './Gallery';
import CallToAction from './CallToAction';
import { GlobalStyle, SBigTitle, SCard } from '../utils/style';


const App = () => {

	useEffect(
		() => {
			const init = async () => {
				const web3 = await loadWeb3();
				await getBlockchainDatas(web3);
			}
			init()
		}, []
	)

	const [ account, setAccount ] = useState( '0x0' );
	const [ token, setToken ] = useState( {} );
	const [ tokenURIs, setTokenURIs ] = useState( [] );


	/**
	 * Loads web3.
	 *
	 * @return     object   
	 * Web3js is a collection of libraries 
	 * that allow you to interact with a local or remote ethereum node 
	 * using HTTP, IPC or WebSocket.
	 */
	const loadWeb3 = async () => {
		const errorMsg = 'Non-ethereum browser detected. You should consider using Metamask';
		return window.ethereum ? await enableMetamask() : ( window.web3 ? new Web3(window.web3.currentProvider) : alert(errorMsg) );
	}

	/**
	 * Gets the blockchain datas.
	 *
	 * @param      object  web3js
	 */
	const getBlockchainDatas = async web3 => {

		//Get current account
		const [ accounts, error ] = await web3.eth.getAccounts();
		if (error) alert('no accounts detected');
		setAccount(accounts);

		//Get the contract
		const currentAddress = await getCurrentAddress(web3);
		const myContract = await new web3.eth.Contract(MemoryToken.abi, currentAddress);
		setToken(myContract);

		//Get all tokens
		const tokens = await getAllTokens(myContract, accounts);
		setTokenURIs(tokens);
	}

	/**
	 * Enables Metamask.
	 *
	 * @return     object   
	 * Web3js is a collection of libraries 
	 * that allow you to interact with a local or remote ethereum node 
	 * using HTTP, IPC or WebSocket.
	 */
	const enableMetamask = async () => {
		await window.ethereum.request( {method: 'eth_requestAccounts'} )
		return new Web3(window.ethereum);
	}

	/**
	 * Gets the current address.
	 *
	 * @param      object  web3    The web 3
	 * @return     address  The current address.
	 */
	const getCurrentAddress = async web3 => {
		const networkId = await web3.eth.net.getId();
		return networkId ? MemoryToken.networks[networkId].address : alert('MemoryToken contract is not deployed.')
	}

	/**
	 * Gets all tokens.
	 *
	 * @return     {Array}  All tokenURIs.
	 */
	const getAllTokens = async (contract, owner) => {
		const balance = await contract.methods.balanceOf(owner.toString()).call();
		let tokens = [];
		for (let i = 0; i < balance; i++) {
			const id = await contract.methods.tokenOfOwnerByIndex(owner, i).call();
			const tokenURI = await contract.methods.tokenURI(id).call();
			tokens.push(tokenURI);
		}
		return tokens;
	}

  	return (
    	<div className="App">
    		<GlobalStyle />
    		{/*<Navbar account={account}/>*/}
    		<div className="container-fluid">
    			<SBigTitle className="text-center py-5">
    				INSANE <span style={{color: '#4e4fa5'}}>IN</span> THE <span style={{color: '#f1b74f'}}>BRAINCHAIN</span>
    			</SBigTitle>
    			
    			<div className="row">

    				<div className="col-lg-6">
    					<CallToAction />
    				</div>

    				<div className="col-lg-6">
						<Game
						account={account}
						tokenURIs={tokenURIs}
						displayNewToken={setTokenURIs}
						token={token} />
					</div>

    			</div>
    			
    			<div className="row">
    				<div className="col-lg-6">
    					<Gallery tokenURIs={tokenURIs} />
    				</div>
    				<div className="col-lg-6">
    					<SCard className="card border-light mb-5 text-center">
    						<img className="img-fluid" src="/images/puzzle-face.png" alt="sitting robot" />
    					</SCard>
    				</div>
    			</div>

    		</div>
    	</div>
  	);
}

export default App;
