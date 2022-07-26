const MemoryToken = artifacts.require('./MemoryToken.sol');

require('chai')
.use( require('chai-as-promised') )
.should()

contract(
	'Memory Token', accounts => {

		let token;	

		before ( 
			async () => {
				token = await MemoryToken.deployed();
			}
		)

		describe('deployment', 
			async () => {
				it ('deploys successfully', 
					async () => {
						const address = token.address;
						assert.notEqual(address, 0x0);
						assert.notEqual(address, null);
						assert.notEqual(address, undefined);
						assert.notEqual(address, '');
					}
				)

				it ('has a name',
					async () => {
						const name = await token.name();
						assert.equal(name, 'Memory Token');
					}
				)

				it ('has a symbol',
					async () => {
						const symbol = await token.symbol();
						assert.equal(symbol, 'MEMORY');
					}
				)
			}
		)

		describe('Minting',
			async () => {
				it ('mints correctly fresh token',
					async () => {
						await token.mint(accounts[0], 'https://www.token-url.com/nft');

						//It should increase the totalSupply
						const totalSupply = await token.totalSupply();
						assert.equal(totalSupply.toString(), '1', 'total supply is correct');

						//It should incrememnt owner balance
						const ownerBalance = await token.balanceOf(accounts[0]);
						assert.equal(ownerBalance.toString(), '1', 'balance of owner is correct');

						//It should belog to the correct owner
						const owner = await token.ownerOf('1');
						assert.equal(owner.toString(), accounts[0].toString(), 'It is the right owner')

						//Token URI are correct
						let tokenURI = await token.tokenURI('1');
						assert.equal(tokenURI, 'https://www.token-url.com/nft');

						//Get all tokens of the owner
						let tokenIds = [];
						for (let i = 0; i < ownerBalance; i++) {
							const tokenId = await token.tokenOfOwnerByIndex(accounts[0], i);
							tokenIds.push(tokenId);
						}
						const expected = ['1'];
						assert.equal(tokenIds.toString(), expected.toString(), 'tokens are Oll korrect');
					}
				)
			}
		)
	}
);