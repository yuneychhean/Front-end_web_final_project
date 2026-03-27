import React, { useState } from "react";
import MovioLogo from "../assets/MovioLogo.png";
import { Menu, X, Search, Heart, Sun, Moon } from "lucide-react";
import Button from "../components/Button.jsx";
import SearchDropdown from "../components/SearchDropdown.jsx";

export const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#movies", label: "Movies" },
    { href: "#series", label: "Series" },
    { href: "#popular", label: "Popular" },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 bg-[#252527] dark:bg-transparent py-3 border-b-3  border-b-[#18E3B5] z-50 transition-colors duration-300">
      <nav className="container mx-auto px-3 flex items-center justify-between">
        {/* Logo */}
        <img src={MovioLogo} alt="Movio Logo" className="w-32" />

        {/* Links */}
        <ul className="hidden md:flex gap-3 items-center">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-sm text-[#f5f5f5] dark:text-[#F5F5F5] hover:text-[#18E3B4] rounded-full hover:bg-[#2f6078]/30 font-semibold px-4 py-2"
            >
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex justify-center items-center gap-4">
          <span className="flex items-center justify-center gap-2 text-[#f5f5f5] dark:text-[#f0f2f5]">
             <SearchDropdown />
            <Heart className="cursor-pointer hover:text-[#18E3B4] transition-colors" />
          </span>

          <Button size="md">Login</Button>
        </div>

        {/* Mobile right side */}
        <div className="flex justify-center items-center md:hidden gap-2 text-[#f5f5f5] dark:text-[#f0f2f5]">
          <SearchDropdown/>
          <button>

            <Heart
              size={20}
              className="cursor-pointer hover:text-[#18E3B4] transition-colors"
            />
          </button>

          <button
            className="cursor-pointer"
            onClick={() => setIsMobileMenu((prev) => !prev)}
          >
            {isMobileMenu ? <X className="hover:text-[#18E3B4]" size={24} /> : <Menu className="hover:text-[#18E3B4]" size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 h-screen w-1/2 bg-[#252527] dark:bg-[#0f1418] border-[#18E3B5]/30 p-3 pt-10 transform transition-transform duration-500 ease-in-out ${
          isMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link, index) => (
          <div
            key={index}
            className="py-3 container mx-auto px-6 flex flex-col gap-3 hover:glass-strong hover:bg-[#2f6078]/30 rounded-3xl"
          >
            <a
              href={link.href}
              className="text-[#f5f5f5] dark:text-[#f0f2f5] hover:text-[#18E3B4] font-semibold text-lg"
              onClick={() => setIsMobileMenu(false)}
            >
              {link.label}
            </a>
          </div>
        ))}
        <Button size="md" className="w-full mt-4">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Navbar;