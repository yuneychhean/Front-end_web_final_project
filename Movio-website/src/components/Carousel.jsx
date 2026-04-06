import React, { useState, useEffect } from "react";
import Hero1 from "../assets/Hero1.png";
import Hero2 from "../assets/Hero2.png";
import Hero3 from "../assets/Hero3.png";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight, Star, Play, Info, X } from "lucide-react";
import { Link } from "react-router-dom";
import movieData from "../../public/data/movie.json";

const Carousel = () => {
  const info = [
    {
      id: 1,
      img: Hero1,
      title: "Spider-Man Homecoming",
      description:
        "Peter Parker tries to stop Vulture from selling dangerous Chitauri weapons while balancing life as a high school student.",
      rating: "7.4",
      year: "2020",
      time: "140min",
      type: "Action",
      genre: "Adventure",
    },
    {
      id: 3,
      img: Hero2,
      title: "Renegade Immortal",
      description:
        "Wang Lin uses a mysterious bead and his ruthless will to become a powerful cultivator and challenge the heavens.",
      rating: "8.8",
      year: "2023",
      time: "133 episodes",
      type: "Action",
      genre: "Dong Hua",
    },
    {
      id: 4,
      img: Hero3,
      title: "Soul Land II",
      description:
        "The story follows Huo Yuhao, an underdog with the rare martial soul, who becomes the host for a million-year-old soul beast named the Daydream Ice Worm.",
      rating: "8.5",
      year: "2023",
      time: "145 episodes",
      type: "Action",
      genre: "Dong Hua",
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  // Find the full movie data including trailer
  const getMovieTrailer = (movieId) => {
    const fullMovie = movieData.find(m => m.id === movieId);
    return fullMovie?.trailer || null;
  };

  const handleWatchNow = () => {
    const currentMovie = info[currentIndex];
    const trailerId = getMovieTrailer(currentMovie.id);
    
    if (trailerId) {
      setCurrentTrailer(trailerId);
      setShowTrailer(true);
    } else {
      // If no trailer, navigate to movie detail
      window.location.href = `/${currentMovie.id}`;
    }
  };

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === info.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [info.length, isAutoPlaying, isHovered]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? info.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === info.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const currentMovie = info[currentIndex];
  const currentMovieTrailer = getMovieTrailer(currentMovie.id);

  return (
    <div className="pt-19 sm:pt-21">
      <section 
        className="relative h-[350px] sm:h-[430px] md:h-[500px] lg:h-screen max-h-[550px] flex items-center overflow-hidden bg-black border-3 border-[#18E3B4] rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Images */}
        <div className="absolute inset-0">
          {info.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent md:via-transparent" />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute w-full justify-between px-3 sm:px-4 md:px-8 z-20 hidden md:flex">
          <button
            onClick={prevSlide}
            className="bg-transparent p-2 sm:p-3 rounded-full hover:bg-[#18E3B4] hover:scale-110 transition-all duration-300 border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-transparent p-2 sm:p-3 rounded-full hover:bg-[#18E3B4] hover:scale-110 transition-all duration-300 border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {info.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#18E3B4]"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-full md:max-w-2xl lg:max-w-4xl">
            {/* Featured Badge */}
            <div className="mb-3 sm:mb-4 md:mb-6 animate-fadeInUp">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#18E3B4]/20 backdrop-blur-sm rounded-full border border-[#18E3B4]/30">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#18E3B4] rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-[#18E3B4] uppercase tracking-wider">
                  Featured Movie
                </span>
              </span>
            </div>

            {/* Title */}
            <div className="mb-3 sm:mb-4 md:mb-6 animate-fadeInUp animation-delay-200">
              <h1 className="text-2xl font-[Lexend] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                {currentMovie.title}
              </h1>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 animate-fadeInUp animation-delay-400">
              <div className="flex items-center gap-1 sm:gap-2 text-white">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAB92C] fill-current" />
                <span className="text-sm sm:text-base font-semibold">{currentMovie.rating}</span>
                
              </div>
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40 rounded-full"></div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">{currentMovie.year}</div>
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40 rounded-full hidden sm:block"></div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">{currentMovie.time}</div>
            </div>

            {/* Description */}
            <div className="hidden sm:block mb-4 md:mb-6 animate-fadeInUp animation-delay-600 sm:w-100">
              <p className="text-xs sm:text-sm md:text-lg text-white/80 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-3">
                {currentMovie.description}
              </p>
            </div>

            {/* Description for mobile */}
            <div className="sm:hidden mb-4 animate-fadeInUp animation-delay-600 w-70">
              <p className="text-sm text-white/80 leading-relaxed line-clamp-2">
                {currentMovie.description.length > 100 
                  ? `${currentMovie.description.substring(0, 100)}...` 
                  : currentMovie.description}
              </p>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8 animate-fadeInUp animation-delay-800">
              <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs sm:text-sm font-medium border border-white/20">
                {currentMovie.type}
              </span>
              <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs sm:text-sm font-medium border border-white/20">
                {currentMovie.genre}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 animate-fadeInUp animation-delay-1000">
              <button
                onClick={handleWatchNow}
                className="bg-[#18E3B4] hover:bg-[#18E3B4]/80 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                <Play size={16} className="sm:w-5 sm:h-5" />
                Watch Now
              </button>
              <Link to={`/${currentMovie.id}`}>
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 border border-white/20 text-sm sm:text-base">
                  <Info size={16} className="sm:w-5 sm:h-5" />
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="hidden lg:flex absolute bottom-24 right-0 gap-3 z-20">
          {info.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative group transition-all duration-300 ${
                index === currentIndex ? "scale-110 ring-2 ring-[#18E3B4]" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors rounded-lg" />
            </button>
          ))}
        </div>
      </section>

      {/* Trailer Modal */}
      {showTrailer && currentTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-[#18E3B4] rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <X size={24} className="text-white" />
            </button>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentTrailer}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Add animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-up {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;