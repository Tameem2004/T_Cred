// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NFTMarketplace {
    struct NFTListing {
        address seller;
        address nftContract;
        uint256 nftId;
        string nftImage; // Image URL
        uint256 price;
        bool isListed;
    }

    mapping(uint256 => NFTListing) public listings;
    uint256 public listingCounter;

    event NFTListed(uint256 indexed listingId, address indexed seller, address nftContract, uint256 nftId, string nftImage, uint256 price);
    event NFTUnlisted(uint256 indexed listingId);

    function listNFT(address _nftContract, uint256 _nftId, string memory _nftImage, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");

        listings[listingCounter] = NFTListing({
            seller: msg.sender,
            nftContract: _nftContract,
            nftId: _nftId,
            nftImage: _nftImage,
            price: _price,
            isListed: true
        });

        emit NFTListed(listingCounter, msg.sender, _nftContract, _nftId, _nftImage, _price);
        listingCounter++;
    }

    function unlistNFT(uint256 _listingId) external {
        NFTListing storage listing = listings[_listingId];
        require(msg.sender == listing.seller, "Only seller can unlist");
        require(listing.isListed, "NFT is not listed");

        listing.isListed = false;

        emit NFTUnlisted(_listingId);
    }

    function getNFTDetails(uint256 _listingId) external view returns (address, uint256, string memory, uint256, bool) {
        NFTListing memory listing = listings[_listingId];
        return (listing.nftContract, listing.nftId, listing.nftImage, listing.price, listing.isListed);
    }
}
