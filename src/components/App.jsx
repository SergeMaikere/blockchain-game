import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MemoryToken from '../abis/MemoryToken.json';
import Navbar from './Navbar';


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
	const [ tokenURIS, setTokenURIS ] = useState( [] );


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
		setTokenURIS(tokens);
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
	const getAllTokens = async(contract, owner) => {
		const balance = await contract.methods.balanceOf(owner).call();
		let tokens = [];
		for (let i = 0; i < balance; i++) {
			const id = await contract.methods.tokebOfOwnerByIndex(account, i).call();
			const tokenURI = await contract.methods.tokenURI(id).call();
			tokens.push(tokenURI);
		}
		return tokens;
	}

  	return (
    	<div className="App">
    		<Navbar account={account}/>
    		<div className="container-fluid">
    			<p>{tokenURIS}</p>
    		</div>
    	</div>
  	);
}

export default App;
