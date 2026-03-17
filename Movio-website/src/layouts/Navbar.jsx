import React, { useState } from "react";
import MovioLogo from "../assets/MovioLogo.png";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#movies", label: "Movies" },
    { href: "#series", label: "Series" },
    { href: "#popular", label: "Popular" },
  ];

  return (
    <header>
      <nav className="flex items-center justify-between p-4">
        {/* Logo */}
        <img src={MovioLogo} alt="Movio Logo" className="w-32" />

        {/* Links */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 text-[#f0f2f5] cursor-pointer"
          onClick={() => setIsMobileMenu((prev) => !prev)}
        >
          {isMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
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
