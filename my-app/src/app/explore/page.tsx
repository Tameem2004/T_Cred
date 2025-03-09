"use client";

import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, ABI } from "../contract/contract";

const NFTListings = () => {
  const [listingId, setListingId] = useState<string>("1"); // Default ID to auto-fetch
  const [listing, setListing] = useState<any>(null);

  const { data, isLoading, refetch } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getNFTDetails",
    args: listingId ? [BigInt(listingId)] : undefined, // Ensure valid args
  });

  // Automatically fetch NFT details when component mounts
  useEffect(() => {
    refetch();
  }, [listingId]); // Runs when `listingId` changes

  // Process fetched data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 5) {
      const [nftContract, nftId, nftImage, price, isListed] = data;
      setListing({
        nftContract: nftContract as string,
        nftId: Number(nftId),
        nftImage: nftImage as string,
        price: Number(price) / 1e18, // Convert from Wei to ETH
        isListed: isListed as boolean,
      });
    } else {
      setListing(null);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#13082A] text-white flex justify-center items-center py-8">
      <div className="bg-[#1D1F37] p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl text-center mb-6">Fetch NFT Listing</h1>
        
        {/* Input and Button Section */}
        <div className="mb-6">
          <input
            type="number"
            placeholder="Enter Listing ID"
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            className="w-full p-3 mb-4 bg-[#2A2B4C] rounded-md text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            disabled={isLoading}
            onClick={() => refetch()}
            className="w-full p-3 bg-[#3E4B9E] rounded-md text-white font-bold hover:bg-[#2F3A73] focus:outline-none"
          >
            {isLoading ? "Fetching..." : "Fetch NFT"}
          </button>
        </div>

        {/* NFT Listing Details */}
        {listing ? (
          <div>
            <h2 className="text-2xl text-center mb-4">NFT Details</h2>
            <p><strong>Contract:</strong> {listing.nftContract}</p>
            <p><strong>ID:</strong> {listing.nftId}</p>
            <p><strong>Price:</strong> {listing.price} ETH</p>
            <p><strong>Listed:</strong> {listing.isListed ? "Yes" : "No"}</p>
            <div className="flex justify-center mt-4">
              <img
                src={listing.nftImage}
                alt="NFT"
                className="rounded-md shadow-lg"
                style={{ maxWidth: "300px", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">No data available</p>
        )}
      </div>
    </div>
  );
};

export default NFTListings;
