import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MemoryToken from '../abis/MemoryToken.json';
import Navbar from './Navbar';
import Game from './Game';
import Gallery from './Gallery';


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
	const [ totalSupply, setTotalSupply ] = useState( 0 );
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

		//Get totalSupply
		const supply = await myContract.methods.totalSupply().call();
		setTotalSupply(supply);

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
    		<Navbar account={account}/>
    		<div className="container-fluid">
    			<div className="row">
    				<div className="col-lg">
						<Game
						account={account}
						tokenURIs={tokenURIs}
						displayNewToken={setTokenURIs}
						token={token}
						totalSupply={totalSupply} />
					</div>
    				<div className="col-lg">
	    				<Gallery tokenURIs={tokenURIs} />
    				</div>
    			</div>
    		</div>
    	</div>
  	);
}

export default App;
