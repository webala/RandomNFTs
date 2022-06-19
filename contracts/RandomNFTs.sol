//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract RandomNFTs is ERC721URIStorage {

    //Keep track of token IDs
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; //Will be initialized to 0


    
    uint256 public tokenCount = 0;

    //Call ERC721 constructor with name and symbol of NFT contract
    constructor() ERC721("RandomNFTs", "RAN") {
        console.log("Random NFTs contract created");
    }

    

    //Mints NFTS
    function mintRandomNFT(string memory _tokenURI) public {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, _tokenURI);

        console.log(
            "An NFT with ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        _tokenIds.increment();
        tokenCount++;
    }

}
