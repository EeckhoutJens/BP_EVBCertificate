// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTContractHawaii is ERC721 {
    uint256 private tokenIdCounter;
    mapping(uint256 => string) private tokenURIs;

    modifier doesExist(uint256 tokenId) {
        require(_exists(tokenId), "Token does not exist");
        _;
    }

    modifier isNFTOwner(uint256 tokenId){
        require(ownerOf(tokenId) == msg.sender, "You are not the token owner");
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        tokenIdCounter = 0;
    }

    function create(string memory _tokenURI) external returns (uint256) {
        uint256 tokenId = tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        tokenURIs[tokenId] = _tokenURI;
        tokenIdCounter++;
        return tokenId;
    }

    function update(uint256 tokenId, string memory _tokenURI) doesExist(tokenId) isNFTOwner(tokenId) external {
        tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) doesExist(tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }
}
