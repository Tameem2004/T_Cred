// pages/unlistNFT.tsx
"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, ABI } from "../contract/contract";
import { useRouter } from "next/navigation";

const UnlistNFT = () => {
  const router = useRouter();
  const [listingId, setListingId] = useState<string>("");

  const { data, isPending, isSuccess, writeContract } = useWriteContract();
    
  const handleUnlistNFT = async () => {
    if (!listingId) {
      alert("Please provide a Listing ID");
      return;
    }

    writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS as `0x${string}`,
      functionName: "unlistNFT",
      args: [BigInt(listingId)], // Providing the Listing ID
    });
  };

  return (
    <div>
      <h1>Unlist Your NFT</h1>
      <input
        type="text"
        placeholder="Listing ID"
        value={listingId}
        onChange={(e) => setListingId(e.target.value)}
      />
      <button disabled={!writeContract || isPending} onClick={handleUnlistNFT}>
        {isPending ? "Unlisting..." : "Unlist NFT"}
      </button>
      {isSuccess && <p>NFT Unlisted Successfully!</p>}
      <div>
        <button onClick={() => router.push("/create")}>Back to Marketplace</button>
      </div>
    </div>
  );
};

export default UnlistNFT;
