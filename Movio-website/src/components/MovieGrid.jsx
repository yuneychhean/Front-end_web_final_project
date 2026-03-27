import React from 'react'
import { useEffect, useState, useRef } from "react";
import MovieCard from '../components/MovieCard';

function MovieGrid({ movies, title }) {
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

  // Reset current index when movies change
  useEffect(() => {
    setCurrentIndex(0);
  }, [movies]);

  const handleNext = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    const maxIndex = Math.ceil(movies.length / itemsPerPage) - 1;
    if (currentIndex < maxIndex) {
      setIsAnimating(true);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateScrollPosition(newIndex);
      
      // Reset animation lock after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    if (currentIndex > 0) {
      setIsAnimating(true);
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      updateScrollPosition(newIndex);
      
      // Reset animation lock after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const updateScrollPosition = (index) => {
    if (carouselRef.current && carouselRef.current.children[0]) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      const gap = 16;
      const scrollPosition = (cardWidth + gap) * itemsPerPage * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  };

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

  const getVisibleMovies = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return movies.slice(start, end);
  };

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
      
      {/* Redesigned Carousel Buttons with hover animations */}
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
        <svg className="w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Swipeable Movie Grid - Hide scrollbar */}
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden gap-4 cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getVisibleMovies().map((movie, index) => (
          <div
            key={movie.id || index}
            className="flex-shrink-0 transition-all duration-500 hover:scale-105 hover:z-10"
            style={{
              width: `calc(${100 / itemsPerPage}% - ${(itemsPerPage - 1) * 16 / itemsPerPage}px)`,
              minWidth: '120px',
              animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
            }}
          >
            <MovieCard {...movie} />
          </div>
        ))}
      </div>

      {/* Page Indicators with animated transitions */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isAnimating && idx !== currentIndex) {
                  setIsAnimating(true);
                  setCurrentIndex(idx);
                  updateScrollPosition(idx);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 500);
                }
              }}
              disabled={isAnimating}
              className={`
                transition-all duration-500 rounded-full
                focus:outline-none focus:ring-2 focus:ring-blue-400
                ${currentIndex === idx 
                  ? 'w-6 md:w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'w-2 h-2 bg-gray-400 hover:bg-gray-500 hover:scale-125'
                }
                ${isAnimating ? 'pointer-events-none' : ''}
              `}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Optional: Page Counter with animation */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-gray-500 mt-2 transition-all duration-300">
          Page {currentIndex + 1} of {totalPages}
        </div>
      )}
    </div>
  )
}

export default MovieGrid;