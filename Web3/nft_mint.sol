// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";

contract NFTCollection is ERC721Enumerable, Ownable {
    uint256 public collectibleId;
    string public collectionImg;  // URL for collection image
    string public collectionDescription;

    uint256 public mintPrice;
    uint256 public maxSupply;
    uint256 public mintLimitPerWallet;
    uint256 public mintStartTime;

    mapping(address => uint256) public mintedCount;
    mapping(uint256 => bool) public locked;

    constructor(
        string memory _name, 
        string memory _symbol, 
        address _owner
        ) ERC721(_name, _symbol) {
        transferOwnership(_owner);
    }

    function mintNFT(
        string memory _collectionImg,
        string memory _collectionDescription,
        uint256 _mintPrice,
        uint256 _maxSupply,
        uint256 _mintLimitPerWallet,
        uint256 _mintStartTime
    ) public {
        collectionImg = _collectionImg;
        collectionDescription = _collectionDescription;
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
        mintLimitPerWallet = _mintLimitPerWallet;
        mintStartTime = _mintStartTime;
    }

    function getCollectionDetails() public view returns (
        string memory, string memory, uint256, uint256, uint256, uint256
    ) {
        return (collectionImg, collectionDescription, mintPrice, maxSupply, mintLimitPerWallet, mintStartTime);
    }

    function mint(uint256 _amount, address to) public payable {
        require(block.timestamp >= mintStartTime, "Minting has not started yet");
        require(totalSupply() + _amount <= maxSupply, "Exceeds max supply");
        require(mintedCount[to] + _amount <= mintLimitPerWallet, "Mint limit per wallet exceeded");

        for (uint256 i = 0; i < _amount; i++) {
            _safeMint(to, collectibleId);
            collectibleId++;
        }
        mintedCount[to] += _amount;
    }

    function updateCollectionImage(string memory _newCollectionImg) external onlyOwner {
        collectionImg = _newCollectionImg;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setLocked(uint256 _tokenId) external {
        locked[_tokenId] = true;
    }

    function setUnLocked(uint256 _tokenId) external {
        locked[_tokenId] = false;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) 
        internal override(ERC721Enumerable) 
    {
        super._beforeTokenTransfer(from, to, tokenId);
        require(!locked[tokenId], "Cannot transfer - currently locked");
    }
}
