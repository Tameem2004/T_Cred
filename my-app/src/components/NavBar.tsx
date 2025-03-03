"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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

  // Close menu when navigation occurs
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <nav className="relative w-full h-[80px] px-6 sm:px-10 md:px-14 flex items-center justify-between bg-[#29203B] text-white">
      {/* Logo */}
      <div
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => router.push("/")}
      >
        T_Cred
      </div>

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

      {/* Connect Button (Desktop) */}
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
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center py-6 space-y-6 z-50">
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.path);
                setIsOpen(false);
              }}
              className="text-lg text-white hover:text-[#7879F1] transition"
            >
              {item.name}
            </button>
          ))}

          {/* Connect Wallet Button */}
          <div>
            <ConnectButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
