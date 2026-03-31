import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'
import MovioLogo from "../assets/MovioLogo.png";
import { Menu, X, Search, Heart, Home, Film, Tv, TrendingUp, User, LogIn } from "lucide-react";
import Button from "../components/Button.jsx";
import SearchDropdown from "../components/SearchDropdown.jsx";

export const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenu(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/series", label: "Series", icon: Tv },
    { href: "/popular", label: "Popular", icon: TrendingUp },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenu(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-[#252527] dark:bg-[#0f1418] py-4 border-b-3 border-b-[#18E3B5] z-50 transition-colors duration-300">
      <nav className="container mx-auto px-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu}>
          <img src={MovioLogo} alt="Movio Logo" className="w-32 cursor-pointer" />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex gap-3 items-center">
          {navLinks.map((link, index) => (
            <Link to={link.href} key={index}>
              <li
                className={`text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300
                  ${isActive(link.href) 
                    ? 'text-[#18E3B4] bg-[#18E3B4]/10' 
                    : 'text-[#F5F5F5] dark:text-[#F5F5F5] hover:text-[#18E3B4] hover:bg-[#2f6078]/30'
                  }
                `}
              >
                {link.label}
              </li>
            </Link>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex justify-center items-center gap-4">
          <span className="flex items-center justify-center gap-2 text-[#f5f5f5] dark:text-[#f0f2f5]">
             <SearchDropdown />
             <Link to='/wishlist' onClick={closeMobileMenu}>
                <Heart className="cursor-pointer hover:text-[#18E3B4] transition-colors" />
             </Link>
          </span>

            <Link to='/login' onClick={closeMobileMenu}>
              <Button size="md">
                  Login
              </Button>
            </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex justify-center items-center md:hidden gap-2 text-[#f5f5f5] dark:text-[#f0f2f5]">
          <SearchDropdown/>
          
          <Link to='/wishlist' onClick={closeMobileMenu}>
            <Heart
              size={20}
              className="cursor-pointer hover:text-[#18E3B4] transition-colors"
            />
          </Link>
          
          <button
            className="cursor-pointer"
            onClick={() => setIsMobileMenu((prev) => !prev)}
          >
            {isMobileMenu ? <X className="hover:text-[#18E3B4]" size={24} /> : <Menu className="hover:text-[#18E3B4]" size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Icons */}
      <div
        className={`md:hidden fixed top-16 right-0 min-h-screen w-2/3 bg-[#252527] dark:bg-[#0f1418] border-l border-[#18E3B5]/30 pt-6 transform transition-transform duration-500 ease-in-out ${
          isMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* User Info Section */}
        <div className="px-4 py-3 mb-4 border-b border-[#18E3B5]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#18E3B5]/20 flex items-center justify-center">
              <User size={20} className="text-[#18E3B5]" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Guest User</p>
              <Link to='/login' className="text-[#18E3B5] text-xs" onClick={closeMobileMenu}>
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Links with Icons */}
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <div
              key={index}
              className="py-2 container mx-auto px-4"
            >
              <Link
                to={link.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base
                  transition-all duration-300
                  ${active 
                    ? 'text-[#18E3B4] bg-[#18E3B4]/10' 
                    : 'text-[#f5f5f5] dark:text-[#f0f2f5] hover:text-[#18E3B4] hover:bg-[#2f6078]/30'
                  }
                `}
                onClick={closeMobileMenu}
              >
                <Icon size={20} className={active ? 'text-[#18E3B4]' : 'text-gray-400'} />
                <span>{link.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#18E3B4]" />
                )}
              </Link>
            </div>
          );
        })}

        {/* Login Button at Bottom */}
        <div className="absolute bottom-18 left-0 right-0 px-2 min-w-full">
          <Link to='/login' onClick={closeMobileMenu}>
            <Button size="md" className="w-full flex items-center justify-center gap-2">
              <LogIn size={18} />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;