"use client";

import React from "react";
import Image from "next/image";
import img from "../public/Untitled design (2).png";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#13082A] flex flex-col items-center px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl flex flex-col lg:flex-row items-center justify-between w-full py-12">
        {/* Left Section */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
          <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide capitalize">
            Order NFTs Now & Pay Later Using T_Cred
          </h1>
          <p className="text-[#9F8FC1] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-lg">
            Discover the power of NFTs for a unique digital experience.
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/explore")}
              className="w-full sm:w-auto px-8 py-3 bg-[#7879F1] text-white text-lg font-semibold rounded-full"
            >
              Explore
            </button>
            <button
              onClick={() => router.push("/create")}
              className="w-full sm:w-auto px-8 py-3 border border-[#7879F1] text-[#7879F1] text-lg font-semibold rounded-full"
            >
              Create
            </button>
          </div>
        </div>
        {/* Right Section (Image) */}
        <div className="mt-12 lg:mt-0 w-full lg:w-[50%] flex justify-center">
          <Image src={img} alt="NFT Illustration" className="w-[80%] md:w-[60%] lg:w-[100%]" />
        </div>
      </div>
      {/* Stats Section */}
      <div className="w-full max-w-xl bg-white bg-opacity-10 backdrop-blur-md rounded-2xl flex justify-around items-center p-4 mt-8">
        <StatItem number="10K" label="Artwork" />
        <div className="w-px h-12 bg-white opacity-40"></div>
        <StatItem number="32K" label="BNPL" />
        <div className="w-px h-12 bg-white opacity-40"></div>
        <StatItem number="42K" label="Artist" />
      </div>
    </div>
  );
};

const StatItem = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[#A5A6F6] text-3xl md:text-4xl font-semibold">
        {number}
      </span>
      <span className="text-white text-sm md:text-lg font-normal">
        {label}
      </span>
    </div>
  );
};

export default HeroSection;
