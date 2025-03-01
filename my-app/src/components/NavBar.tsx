"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from 'react';
import { useRouter, usePathname } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "" },
    { name: "Marketplace", path: "/explore" },
    { name: "Create", path: "/create" },
    { name: "Community", path: "" },
  ];
  return (
    <div className="relative w-[1520px] h-[80px] p-[32px_18.5741px] flex flex-col items-center gap-[7.74px] bg-gradient-to-t from-[#29203B] to-[#29203B] backdrop-blur-sm">
      {/* Navbar */}
      <div className="flex justify-between items-center w-[1400px] h-[25px]">
        {/* T_Cred */}
        <div className="flex justify-start w-[1300px] h-[41px] text-white font-bold text-[27.05px] leading-[41px] tracking-[-0.025em]">
          T_Cred
        </div>
        {/* Navbar Links */}
        <div className="flex justify-center items-center gap-[10px]">
      {menuItems.map((item) => (
        <button
          key={item.name}
          onClick={() => router.push(item.path)}
          className={`w-auto h-[30px] text-white font-normal text-[20px] leading-[30px] 
            ${pathname === item.path ? "underline font-semibold text-[#7879F1]" : ""}`}
        >
          {item.name}
        </button>
      ))}
    </div>
        {/* Button */}
          <div className="flex w-full justify-end items-center p-30">
          <ConnectButton />
        </div> 
      </div>
    </div>
  );
};

export default NavBar;