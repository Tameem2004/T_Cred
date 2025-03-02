// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./nft_mint.sol";

contract NFTFactory {
    event CollectionCreated(address indexed owner, address collectionAddress, string name, string symbol);
    
    address[] public collections;

    function createCollection(
        string memory name,
        string memory symbol,
        string memory collectionImg,
        string memory collectionDescription,
        uint256 mintPrice,
        uint256 maxSupply,
        uint256 mintLimitPerWallet,
        uint256 mintStartTime
    ) external {
        // Deploy new collection
        NFTCollection newCollection = new NFTCollection(name, symbol, msg.sender);
        collections.push(address(newCollection));

        // Call mintNFT using the new collection instance
        newCollection.mintNFT(
            collectionImg,
            collectionDescription,
            mintPrice,
            maxSupply,
            mintLimitPerWallet,
            mintStartTime
        );

        emit CollectionCreated(msg.sender, address(newCollection), name, symbol);
    }

    function getCollections() external view returns (address[] memory) {
        return collections;
    }

    function getAllCollectionsDetails() external view returns (
        address[] memory,
        string[] memory,
        string[] memory,
        uint256[] memory,
        uint256[] memory,
        uint256[] memory,
        uint256[] memory
    ) {
        uint256 length = collections.length;
        
        address[] memory addrs = new address[](length);
        string[] memory imgs = new string[](length);
        string[] memory descriptions = new string[](length);
        uint256[] memory prices = new uint256[](length);
        uint256[] memory supplies = new uint256[](length);
        uint256[] memory limits = new uint256[](length);
        uint256[] memory startTimes = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            NFTCollection collection = NFTCollection(collections[i]);
            (
                string memory img,
                string memory desc,
                uint256 price,
                uint256 supply,
                uint256 limit,
                uint256 startTime
            ) = collection.getCollectionDetails();

            addrs[i] = collections[i];
            imgs[i] = img;
            descriptions[i] = desc;
            prices[i] = price;
            supplies[i] = supply;
            limits[i] = limit;
            startTimes[i] = startTime;
        }

        return (addrs, imgs, descriptions, prices, supplies, limits, startTimes);
    }

    function mintFromCollection(address collectionAddress, uint256 amount, address receiver) external payable {
    NFTCollection collection = NFTCollection(collectionAddress);

    // Correcting the parameter order
    collection.mint(amount, receiver);
}
}
