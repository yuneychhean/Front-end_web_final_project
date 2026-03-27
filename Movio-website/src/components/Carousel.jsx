import React, { useState, useEffect } from "react";
import Hero1 from "../assets/Hero1.png";
import Hero2 from "../assets/Hero2.png";
import Hero3 from "../assets/Hero3.png";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight, Star, Play, Info } from "lucide-react";

const Carousel = () => {
  const info = [
    {
      img: Hero1,
      title: "Spider-Man Homecoming",
      description:
        "Peter Parker tries to stop Vulture from selling dangerous Chitauri weapons while balancing life as a high school student.",
      rating: "4.5",
      year: "2020",
      time: "140min",
      type: "Action",
      genre: "Adventure",
    },
    {
      img: Hero2,
      title: "Renegade Immortal",
      description:
        "Wang Lin uses a mysterious bead and his ruthless will to become a powerful cultivator and challenge the heavens.",
      rating: "4.9",
      year: "2023",
      time: "133 episodes",
      type: "Action",
      genre: "Dong Hua",
    },
    {
      img: Hero3,
      title: "Soul Land II",
      description:
        "The story follows Huo Yuhao, an underdog with the rare martial soul, who becomes the host for a million-year-old soul beast named the Daydream Ice Worm.",
      rating: "4.8",
      year: "2023",
      time: "145 episodes",
      type: "Action",
      genre: "Dong Hua",
    },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
  

  return (
    <div className="pt-18 sm:pt-20">

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
          
          {/* Gradient Overlay - Responsive gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent md:via-transparent" />
        </div>

        {/* Navigation Buttons - Smaller on mobile */}

        <div className="absolute w-full  justify-between px-3 sm:px-4 md:px-8 z-20 hidden md:flex">
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

        {/* Content - Responsive spacing and sizing */}
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

            {/* Title - Responsive font sizes */}
            <div className="mb-3 sm:mb-4 md:mb-6 animate-fadeInUp animation-delay-200">
              <h1 className="text-2xl font-[Lexend]  sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                {currentMovie.title}
              </h1>
            </div>

            {/* Meta Info - Responsive layout */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 animate-fadeInUp animation-delay-400">
              <div className="flex items-center gap-1 sm:gap-2 text-white">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAB92C] fill-current" />
                <span className="text-sm sm:text-base font-semibold">{currentMovie.rating}</span>
                <span className="text-xs sm:text-sm text-white/60">/ 5.0</span>
              </div>
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40 rounded-full"></div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">{currentMovie.year}</div>
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40 rounded-full hidden sm:block"></div>
              <div className="text-xs sm:text-sm md:text-base text-white/80">{currentMovie.time}</div>
            </div>

            {/* Description - Hidden on very small screens, visible on sm and up */}
            <div className="hidden sm:block mb-4 md:mb-6 animate-fadeInUp animation-delay-600 sm:w-100 ">
              <p className="text-xs sm:text-sm md:text-lg text-white/80 leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-3">
                {currentMovie.description}
              </p>
            </div>

            {/* Description for mobile - Short version */}
            <div className="sm:hidden mb-4 animate-fadeInUp animation-delay-600 w-70 ">
              <p className="text-sm text-white/80 leading-relaxed line-clamp-2">
                {currentMovie.description.length > 100 
                  ? `${currentMovie.description.substring(0, 100)}...` 
                  : currentMovie.description}
              </p>
            </div>

            {/* Genre Tags - Responsive sizing */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8 animate-fadeInUp animation-delay-800">
              <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs sm:text-sm font-medium border border-white/20">
                {currentMovie.type}
              </span>
              <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs sm:text-sm font-medium border border-white/20">
                {currentMovie.genre}
              </span>
            </div>

            {/* Buttons - Responsive sizing and layout */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 animate-fadeInUp animation-delay-1000">
              <Button className="bg-[#18E3B4] hover:bg-[#18E3B4]/80 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                <Play size={16} className="sm:w-5 sm:h-5" />
                Watch Now
              </Button>
              <Button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-300 border border-white/20 text-sm sm:text-base">
                <Info size={16} className="sm:w-5 sm:h-5" />
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* Thumbnail Strip - Hidden on mobile and tablet */}
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
    </div>
  );
};

export default Carousel;