// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Full.sol';

contract MemoryToken is ERC721Full {

	constructor() ERC721Full('Memory Token', 'MEMORY') {

	}

	function mint ( address _to, string memory _tokenURI ) public returns(bool) {
		uint _tokenId = totalSupply() + 1;
		_mint(_to, _tokenId);
		_setTokenURI(_tokenId, _tokenURI);
		return true;
	}
}
