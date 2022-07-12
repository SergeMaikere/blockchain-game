import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import MemoryToken from '../abis/MemoryToken.json';
import Navbar from './Navbar';


const App = () => {

	const [ account, setAccount ] = useState('0x0');
	const [ contract, setContract ] = useState();

	useEffect(
		() => {
			const init = async () => {
				const web3 = await loadWeb3();
				await getBlockchainDatas(web3);
			}
			init()
		}, []
	)

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
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);

		//Get the contract
		const myContract = await new web3.eth.Contract(MemoryToken.abi);
		setContract(myContract);
	}

	/**
	 * Enables metamask.
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

  	return (
    	<div className="App">
    		<Navbar account={account}/>
    		<h1>Hello Worlds</h1>
    	</div>
  	);
}

export default App;
