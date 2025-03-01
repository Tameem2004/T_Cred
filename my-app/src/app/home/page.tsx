"use client";

import React from "react";
import Image from "next/image";
import img1 from "../public/character-with-bicycle-that-has-word-monster-it.jpg"
import sandwichImg from "../public/sandwichImg.jpg"
import img3 from "../public/img3.jpg"

import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter();

  return (
    <div className="w-full h-screen bg-[#13082A]">
    <div className="absolute left-[64px] top-[140px] w-[820px] h-[527px]  flex flex-col items-start gap-[80px] p-[24px_0] isolation-isolate">
      {/* Main Text */}
      <div className="w-[820px] h-[340px] flex flex-col items-start gap-[16px]">
        <h1 className="w-[820px] h-[288px] text-white font-[Radio Canada] font-bold text-[96px] leading-[100%] tracking-[0.03em] capitalize">
          Order NFTs Now & Pay Later Using T_Cred
        </h1>
        <p className="w-[738px] h-[36px] text-[#9F8FC1] font-[Poppins] font-normal text-[24px] leading-[36px] tracking-[0.03em]">
          Discover the power of NFTs for a unique digital experience.
        </p>
      </div>
      {/* Buttons */}
      <div className="flex flex-row items-start gap-[16px] w-[412px] h-[59px]">
        <button onClick={()=>{router.push("/explore")}} className="w-[198px] h-[59px] flex justify-center items-center bg-[#7879F1] text-white font-[Poppins] font-semibold text-[18px] leading-[27px] tracking-[0.03em] rounded-[32px] p-[16px_32px]">
          Explore
        </button>
        <button onClick={()=>{router.push("/create")}} className="w-[198px] h-[59px] flex justify-center items-center border border-[#7879F1] text-[#7879F1] font-[Poppins] font-semibold text-[18px] leading-[27px] tracking-[0.03em] rounded-[32px] p-[16px_32px]">
          Create
        </button>
      </div>
      {/*stats*/}
      <div className="absolute top-[550px] w-[418.46px] h-[85px] backdrop-blur-md rounded-[34.8718px] flex justify-between items-center px-4 bg-opacity-50">
      <StatItem number="10K" label="Artwork" />
      <div className="w-px h-[68.65px] bg-white opacity-40"></div>
      <StatItem number="32K" label="BNPL" />
      <div className="w-px h-[68.65px] bg-white opacity-40"></div>
      <StatItem number="42K" label="Artist" />
      </div>
     </div>

    <div className= "flex w-[580] h-[547]">
        <Image
            src={img1} // Adjust the path as needed
            alt="image1"
            className="relative w-[420px] h-[340px] left-[1000px] top-[98.37px] bg-cover bg-center bg-no-repeat shadow-lg rounded-[17.34px] rotate-[-6.38deg] overflow-hidden border border-transparent"
        />
        <Image
        src={sandwichImg}
        alt="Monstrous Sandwich"
        className="relative w-[450px] h-[350px] left-[940px] top-[78.37px] bg-cover bg-center bg-no-repeat shadow-lg rounded-[17.34px] rotate-[+6.38deg] overflow-hidden border border-transparent"
        />
        <Image
        src={img3}
        alt="Monstrous Sandwich"
        className="relative w-[450px] h-[350px] left-[900px] top-[110.37px] bg-cover bg-center bg-no-repeat shadow-lg rounded-[17.34px] rotate-[+15.38deg] overflow-hidden border border-transparent"
        />
    </div>
    </div>
  );
};

const StatItem = ({ number, label }: { number: string; label: string }) => {
    return (
      <div className="flex flex-col items-center gap-[8.72px] w-[104.62px] h-[71.72px]">
        <span className="text-[#A5A6F6] text-[52.3077px] font-semibold leading-[78px] tracking-[0.01em]">
          {number}
        </span>
        <span className="text-white text-[17.4359px] font-normal leading-[26px] tracking-[0.01em]">
          {label}
        </span>
      </div>

        );
    };

export default HeroSection;
