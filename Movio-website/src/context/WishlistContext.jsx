// src/context/WishlistContext.jsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  // Initialize state with localStorage data immediately (not in useEffect)q
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      console.log('Initial load from localStorage:', savedWishlist);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  });

  const isFirstRender = useRef(true);

  // Save to localStorage whenever wishlist changes (but not on first render)
  useEffect(() => {
    // Skip the first render to avoid overwriting
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('First render, skipping save');
      return;
    }
    
    console.log('Saving to localStorage:', wishlist);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    console.log('Adding to wishlist:', movie.title);
    setWishlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        console.log('Movie already in wishlist');
        return prev;
      }
      const newList = [...prev, movie];
      console.log('New wishlist length:', newList.length);
      return newList;
    });
  };

  const removeFromWishlist = (movieId) => {
    console.log('Removing from wishlist:', movieId);
    setWishlist((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId);
  };

  const toggleWishlist = (movie) => {
    console.log('Toggling wishlist for:', movie.title);
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const clearWishlist = () => {
    console.log('Clearing wishlist');
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