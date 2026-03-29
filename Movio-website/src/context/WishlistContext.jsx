// src/context/WishlistContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on initial load
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add movie to wishlist
  const addToWishlist = (movie) => {
    setWishlist((prev) => {
      // Check if movie already exists
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  // Remove movie from wishlist
  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Check if movie is in wishlist
  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  // Toggle wishlist (add if not exists, remove if exists)
  const toggleWishlist = (movie) => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};