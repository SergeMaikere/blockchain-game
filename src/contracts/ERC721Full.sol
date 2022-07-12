// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Full is  ERC721, ERC721Enumerable, ERC721URIStorage {

	constructor (string memory name, string memory symbol) ERC721(name, symbol) ERC721URIStorage() ERC721Enumerable() public {

	}


	/**
	 * @dev        Necessary override of a function present in ERC721 and ERC721Enumerable
	 * @param      _from     address of the contract
	 * @param      _to       address of the token owner
	 * @param      _tokenId  The token identifier
	 */
	function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(_from, _to, _tokenId);
	}

	/**
	 * @dev        Necessary override of a function present in ERC721 and ERC721Enumerable
	 * @param      _interfaceId  The interface identifier
	 */
	function supportsInterface(bytes4 _interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
	    return super.supportsInterface(_interfaceId);
	}

	/**
	 * @dev        Necessary override of a function present in ERC721 and ERC721URIStorage
	 * @param      _tokenId  The token identifier
	 */
	function _burn(uint256 _tokenId) internal virtual override(ERC721, ERC721URIStorage) {
		super._burn(_tokenId);
	}

	/**
	 * @dev        Necessary override of a function present in ERC721 and ERC721URIStorage
	 * @param      _tokenId  The token identifier
	 */
	function tokenURI( uint _tokenId ) public view virtual override(ERC721, ERC721URIStorage) returns(string memory) {
		return super.tokenURI(_tokenId);
	}

}