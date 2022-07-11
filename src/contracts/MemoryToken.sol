// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MemoryToken is ERC721Enumerable, ERC721URIStorage {

	constructor() ERC721('Memory Token', 'MEMORY') ERC721URIStorage() ERC721Enumerable() {

	}

	function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(_from, _to, _tokenId);
	}

	function supportsInterface(bytes4 _interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
	    return super.supportsInterface(_interfaceId);
	}

	function _burn(uint256 _tokenId) internal virtual override(ERC721, ERC721URIStorage) {
		super._burn(_tokenId);
	}

	function tokenURI( uint _tokenId ) public view virtual override(ERC721, ERC721URIStorage) returns(string memory) {
		return super.tokenURI(_tokenId);
	}

	function mint ( address _to, string memory _tokenURI ) public returns(bool) {
		uint _tokenId = totalSupply() + 1;
		_mint(_to, _tokenId);
		_setTokenURI(_tokenId, _tokenURI);
		return true;
	}
}
