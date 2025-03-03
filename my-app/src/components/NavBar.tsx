"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggle

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "" },
    { name: "Marketplace", path: "/explore" },
    { name: "Create", path: "/create" },
    { name: "Community", path: "" },
  ];

  return (
    <nav className="relative w-full h-[80px] px-6 sm:px-10 md:px-14 flex items-center justify-between bg-[#29203B] text-white">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">T_Cred</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`text-lg hover:text-[#7879F1] transition ${
              pathname === item.path ? "underline font-semibold text-[#7879F1]" : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Connect Button */}
      <div className="hidden md:flex">
        <ConnectButton />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-[#000000] flex flex-col items-center py-4 space-y-4 md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.path);
                setIsOpen(false); // Close menu on click
              }}
              className={`text-lg hover:text-[#7879F1] transition ${
                pathname === item.path ? "underline font-semibold text-[#7879F1]" : ""
              }`}
            >
              {item.name}
            </button>
          ))}
          <ConnectButton />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
