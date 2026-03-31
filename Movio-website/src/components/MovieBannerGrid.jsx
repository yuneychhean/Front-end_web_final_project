import React from 'react'
import { useEffect, useState, useRef } from "react";
import MovieBanner from '../components/MovieBanner';

function MovieBannerGrid({ movies, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) { // 2xl
        setItemsPerPage(7);
      } else if (window.innerWidth >= 1280) { // xl
        setItemsPerPage(6);
      } else if (window.innerWidth >= 1024) { // lg
        setItemsPerPage(5);
      } else if (window.innerWidth >= 768) { // md
        setItemsPerPage(4);
      } else if (window.innerWidth >= 640) { // sm
        setItemsPerPage(3);
      } else {
        setItemsPerPage(2);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Reset current index when movies or itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0);
    // Scroll to top when items per page changes
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "auto"
      });
    }
  }, [movies, itemsPerPage]);

  const handleNext = () => {
    if (isAnimating) return;
    
    const maxIndex = Math.ceil(movies.length / itemsPerPage) - 1;
    if (currentIndex < maxIndex) {
      setIsAnimating(true);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      
      // Wait for animation to complete
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    if (currentIndex > 0) {
      setIsAnimating(true);
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      
      // Wait for animation to complete
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Update scroll position whenever currentIndex or itemsPerPage changes
  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      // Get the first child to calculate width
      const firstChild = carouselRef.current.children[0];
      if (firstChild) {
        const cardWidth = firstChild.offsetWidth;
        const computedStyle = window.getComputedStyle(carouselRef.current);
        const gap = parseInt(computedStyle.gap) || 16;
        const scrollPosition = (cardWidth + gap) * itemsPerPage * currentIndex;
        
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      }
    }
  }, [currentIndex, itemsPerPage]);

  // Touch events for swipe
  const handleTouchStart = (e) => {
    if (isAnimating) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isAnimating) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    
    if (isRightSwipe) {
      handlePrev();
    }
    
    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle window resize to ensure scroll position stays correct
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current && carouselRef.current.children.length > 0) {
        const firstChild = carouselRef.current.children[0];
        if (firstChild) {
          const cardWidth = firstChild.offsetWidth;
          const computedStyle = window.getComputedStyle(carouselRef.current);
          const gap = parseInt(computedStyle.gap) || 16;
          const scrollPosition = (cardWidth + gap) * itemsPerPage * currentIndex;
          
          carouselRef.current.scrollTo({
            left: scrollPosition,
            behavior: "auto"
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, itemsPerPage]);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Don't render if no movies
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Optional: Add title if provided */}
      {title && (
        <h2 className="text-2xl font-bold mb-4 animate-fade-in">{title}</h2>
      )}
      
      {/* Carousel Buttons */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0 || isAnimating}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 md:w-12 md:h-12
          flex items-center justify-center
          bg-gradient-to-r from-black/80 to-black/40
          backdrop-blur-sm
          text-white text-2xl md:text-3xl
          rounded-full
          transition-all duration-300
          hover:scale-110 hover:bg-black/90 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-white/50
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
          shadow-lg
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
        aria-label="Previous movies"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex >= totalPages - 1 || isAnimating}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-20
          w-10 h-10 md:w-12 md:h-12
          flex items-center justify-center
          bg-gradient-to-l from-black/80 to-black/40
          backdrop-blur-sm
          text-white text-2xl md:text-3xl
          rounded-full
          transition-all duration-300
          hover:scale-110 hover:bg-black/90 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-white/50
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
          shadow-lg
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
        aria-label="Next movies"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Swipeable Movie Grid */}
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden overflow-y-hidden gap-4 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch' // Better touch scrolling on iOS
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id || index}
            className="flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-10 w-60"
            
          >
            <MovieBanner {...movie} />
          </div>
        ))}
      </div>

      {/* Optional: Page indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isAnimating && idx !== currentIndex) {
                  setIsAnimating(true);
                  setCurrentIndex(idx);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 w-2 hover:bg-white/70'
              }`}
              aria-label={`Go to page ${idx + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieBannerGrid;