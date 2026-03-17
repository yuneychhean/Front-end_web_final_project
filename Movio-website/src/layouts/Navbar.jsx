import React, { useState } from "react";
import MovioLogo from "../assets/MovioLogo.png";
import { Menu, X, Search, Heart } from "lucide-react";
import Button from "../components/Button.jsx"

export const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#movies", label: "Movies" },
    { href: "#series", label: "Series" },
    { href: "#popular", label: "Popular" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 bg-transparent py-3 border border-b-[#18E3B5]">
      <nav className="container mx-auto px-3 flex items-center justify-between">
        {/* Logo */}
        <img src={MovioLogo} alt="Movio Logo" className="w-32" />

        {/* Links */}
        <ul className="hidden md:flex gap-3 items-center">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-sm text-[#F5F5F5] hover:text-[#18E3B4] rounded-full hover:bg-[#2f6078]/30 font-bold px-3 py-2"
            >
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex justify-center items-center gap-4 ">
          <span className=" flex items-center justify-center gap-2">
            <Search />
            <Heart />
          </span>
          <div className="hidden md:block ">
            <Button size="sm">Login</Button>
          </div>
        </div>
        {/* Mobile Button */}
        <div className=" flex justify-center items-center md:hidden gap-2">
          <Search />
          <Heart />
          <button
            className="md:hidden p-2 text-[#f0f2f5] cursor-pointer"
            onClick={() => setIsMobileMenu((prev) => !prev)}
          >
            {isMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenu && (
        <ul className="md:hidden p-4">
          {navLinks.map((link, index) => (
            <li key={index} className="py-2">
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
