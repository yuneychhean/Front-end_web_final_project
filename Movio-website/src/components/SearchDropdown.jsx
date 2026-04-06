import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';

const SearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const [movies, setMovies] = useState([]);

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies...");
        const response = await axios.get('../../public/data/movie.json');
        console.log("Full response:", response);
        console.log("Response data:", response.data);
        
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          console.log("Data is an array with", response.data.length, "items");
          setMovies(response.data);
        } else {
          console.error("Data is not an array:", response.data);
          setMovies([]);
        }
      } catch (error) {
        console.error("Error loading movies:", error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  const openSearch = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  // Close when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    const delayDebounce = setTimeout(() => {
      // Make sure movies is an array
      if (Array.isArray(movies) && movies.length > 0) {
        const results = movies.filter(movie =>
          movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Search results:", results);
        setSearchResults(results);
      } else {
        console.log("Movies array is empty or not an array:", movies);
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, movies]);

  const handleResultClick = (movie) => {
    console.log("Selected:", movie);
    closeSearch();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  // Debug: Log movies when they change
  useEffect(() => {
    console.log("Movies state updated:", movies);
    console.log("Is movies an array?", Array.isArray(movies));
    console.log("Movies length:", movies.length);
  }, [movies]);

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={openSearch}
        className="relative cursor-pointer hover:text-[#18E3B4] transition-all duration-300 transform hover:scale-110"
        aria-label="Search"
      >
        <Search size={20} />
      </button>

      {/* Full Width Search Dropdown from Top */}
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            onClick={closeSearch}
          />
          
          {/* Search Panel */}
          <div 
            ref={searchRef}
            className="fixed top-0 left-0 right-0 bg-gradient-to-b from-[#252527] to-[#1a1a1c] dark:from-[#0f1418] dark:to-[#0a0e12] shadow-2xl z-50"
          >
            <div className="container mx-auto px-4 py-6 md:py-8">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#18E3B4] rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-[#18E3B4] bg-clip-text text-transparent">
                    Search Movies & Series
                  </h2>
                </div>
                <button
                  onClick={closeSearch}
                  className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110 group"
                  aria-label="Close search"
                >
                  <X size={24} className="text-white group-hover:text-[#18E3B4] transition-colors" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-8">
                <Search
                  size={22}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for movies, series, actors..."
                  className="w-full pl-12 pr-12 py-4 bg-[#1a1a1c] dark:bg-black/50 text-white rounded-xl border-2 border-[#18E3B5]/30 focus:outline-none focus:border-[#18E3B4] focus:ring-2 focus:ring-[#18E3B4]/50 transition-all duration-300 text-base md:text-lg"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Search Results */}
              <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                {isLoading ? (
                  <div className="py-16 text-center">
                    <div className="inline-block">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18E3B4] mx-auto"></div>
                      <p className="mt-4 text-gray-400 text-lg">Searching...</p>
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {searchResults.map((result) => (

                      <Link to={`/${result.id}`}> 
                        <button
                        
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="flex items-center gap-4 p-4 bg-[#1a1a1c] dark:bg-black/30 hover:bg-[#2f6078]/40 rounded-xl transition-all duration-300 transform hover:scale-102 hover:shadow-xl group w-full"
                        >
                          <div className="w-12 h-16 bg-gradient-to-br from-[#18E3B4]/20 to-transparent rounded-lg flex items-center justify-center overflow-hidden">
                            {result.image ? (
                              <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                            ) : (
                              <Search size={30} className="text-[#18E3B4]" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-white font-semibold group-hover:text-[#18E3B4] transition-colors text-lg">
                              {result.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-400">{result.year}</span>
                              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                              <span className="text-xs text-[#18E3B4]">{result.type}</span>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                            <Search size={16} className="text-[#18E3B4]" />
                          </div>
                        </button>
                        </Link>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <div className="py-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-4">
                      <Search size={32} className="text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-xl">No results found for "<span className="text-[#18E3B4]">{searchTerm}</span>"</p>
                    <p className="text-sm text-gray-500 mt-2">Try searching with different keywords</p>
                  </div>
                ) : (
                  <div className="py-8">
                    <p className="text-gray-400 text-center mb-6 text-lg">Popular searches</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {Array.isArray(movies) && movies.length > 0 ? (
                        movies.slice(0, 8).map((movie) => (
                          <button
                            key={movie.id}
                            onClick={() => setSearchTerm(movie.title)}
                            className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#2f6078]/20 to-[#18E3B4]/10 hover:from-[#2f6078]/40 hover:to-[#18E3B4]/30 text-gray-300 rounded-full transition-all duration-300 transform hover:scale-105 hover:text-white"
                          >
                            {movie.title?.length > 25 ? movie.title.substring(0, 25) + "..." : movie.title}
                          </button>
                        ))
                      ) : (
                        <div className="py-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18E3B4] mx-auto"></div>
                          <p className="mt-3 text-gray-400">Loading movies...</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchDropdown;