"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, ABI } from "../contract/contract";
import { useRouter } from "next/navigation";

const NFTMarketplace = () => {
  const router = useRouter();
  const [nftContract, setNftContract] = useState<string>("");
  const [nftId, setNftId] = useState<string>("");
  const [nftImage, setNftImage] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const { data, isPending, isSuccess, writeContract } = useWriteContract();

  const handleListNFT = async () => {
    if (!nftContract || !nftId || !nftImage || !price) {
      alert("Please fill all fields");
      return;
    }

    writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS as `0x${string}`,
      functionName: "listNFT",
      args: [nftContract, BigInt(nftId), nftImage, parseEther(price)],
    });
  };

  return (
    <div className="min-h-screen bg-[#13082A] text-white flex justify-center items-center">
      <div className="bg-[#1D1F37] p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl text-center mb-6">List Your NFT</h1>

        <input
          type="text"
          placeholder="NFT Contract Address"
          value={nftContract}
          onChange={(e) => setNftContract(e.target.value)}
          className="w-full mb-4 p-3 bg-[#2A2B4C] rounded-md text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="number"
          placeholder="NFT ID"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          className="w-full mb-4 p-3 bg-[#2A2B4C] rounded-md text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="text"
          placeholder="NFT Image URL"
          value={nftImage}
          onChange={(e) => setNftImage(e.target.value)}
          className="w-full mb-4 p-3 bg-[#2A2B4C] rounded-md text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-6 p-3 bg-[#2A2B4C] rounded-md text-white placeholder-gray-300 focus:outline-none"
        />
        <button
          disabled={!writeContract || isPending}
          onClick={handleListNFT}
          className="w-full p-3 bg-[#3E4B9E] rounded-md text-white font-bold hover:bg-[#2F3A73] focus:outline-none"
        >
          {isPending ? "Listing..." : "List NFT"}
        </button>
        {isSuccess && <p className="mt-4 text-center text-green-500">NFT Listed Successfully!</p>}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/unlist")}
            className="text-blue-400 hover:text-blue-500"
          >
            Unlist NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;
