// sections/MovieDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Star, Play, Clock, Calendar,
  Film, Plus, Check, Award, TrendingUp, Users,
  User, BookOpen, CalendarDays, Clock3, Tag, Info,
  Building2, Languages, Globe, X
} from "lucide-react";
import Button from "../components/Button";
import movieData from "../../public/data/movie.json";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const movieFromState = location.state?.movie;
  const fetchMovieFromJSON = () => {
    try {
      setLoading(true);
      const foundMovie = movieData.find(m => String(m.id) === String(id));

      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        setMovie(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading movie data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
      window.scrollTo(0, 0);

      if (movieFromState) {
        setMovie(movieFromState);
      }

      fetchMovieFromJSON(); // always ensure full data
  }, [id]);

  

  const handleOpenTrailer = (e) => {
    // Prevent any event bubbling
    if (e) {
      e.stopPropagation();
    }
    console.log("Opening trailer for:", movie?.title);
    setShowTrailer(true);
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const getImagePath = (imgPath) => {
    if (!imgPath) return null;

    if (imgPath.startsWith('http')) {
      return imgPath;
    }

    if (imgPath.startsWith('/')) {
      return imgPath;
    }

    let cleanPath = imgPath;
    if (cleanPath.startsWith('../')) {
      cleanPath = cleanPath.replace('../', '/');
    }

    return cleanPath;
  };

  const getRatingBgColor = () => {
    return "bg-[#18E3B4]/20 border-[#18E3B4]/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#252527] dark:bg-[#0f1418] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#18E3B4]/30 border-t-[#18E3B4] rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Film size={24} className="text-[#18E3B4] animate-pulse" />
            </div>
          </div>
          <p className="text-white/60 mt-4">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#252527] dark:bg-[#0f1418] flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Film size={40} className="text-white/40" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
          <p className="text-white/60 mb-6">
            The movie you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/movies')}
            className="bg-[#18E3B4] hover:bg-[#18E3B4]/80 text-white px-6 py-2 rounded-xl font-semibold"
          >
            Browse Movies
          </Button>
        </div>
      </div>
    );
  }

  const heroImageUrl = movie?.banner && movie.banner.startsWith("http")
  ? movie.banner
  : getImagePath(movie.banner);
  const ratingBgColor = getRatingBgColor();

  return (
    <div className="min-h-screen bg-[#252527] dark:bg-[#0f1418] pt-16 md:pt-20">
      {/* Hero Section with Hover Effect */}
      <div 
        className="relative h-[60vh] lg:h-[70vh] overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenTrailer}
      >
        {/* Background Image with Scale Effect */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          {heroImageUrl && !imageError ? (
            <img
              src={heroImageUrl}
              alt={movie.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-700 transform ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#18E3B4]/20 to-[#252527] flex items-center justify-center">
              <Film size={80} className="text-white/20" />
            </div>
          )}

          {/* Dark Overlay on Hover */}
          <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />

          {/* Play Button in the Middle */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenTrailer(e);
            }}
          >
            <div className="bg-[#18E3B4] rounded-full p-5 md:p-6 shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-[#18E3B4]/50 cursor-pointer">
              <Play size={32} className="text-white fill-current md:w-10 md:h-10" />
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#252527] dark:from-[#0f1418] via-[#252527]/30 dark:via-[#0f1418]/30 via-20% to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    onClick={() => setShowTrailer(false)}
  >
    <div
      className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowTrailer(false)}
        className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 hover:bg-[#18E3B4] transition-colors"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Video Wrapper */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div>
)}

      {/* Content Section - Moved outside hero */}
      <div className="container mx-auto px-4 md:px-8 -mt-20 md:-mt-24 relative z-20">
        <div className="bg-[#252527]/80 dark:bg-[#0f1418]/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10">
          {/* Title and Rating */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
              {movie.title}
            </h1>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-sm ${ratingBgColor} shrink-0`}>
              <Star size={18} className="text-[#18E3B4] fill-current" />
              <span className="font-semibold text-lg text-[#18E3B4]">{movie.rating}</span>
              <span className="text-white/60 text-sm">/ 10</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-5">
            <div className="flex items-center gap-2 text-white/80">
              <CalendarDays size={16} className="text-[#18E3B4]" />
              <span className="text-sm">{movie.year}</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock3 size={16} className="text-[#18E3B4]" />
              <span className="text-sm">{movie.duration}</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-2 text-white/80">
              <Tag size={16} className="text-[#18E3B4]" />
              <span className="text-sm">{movie.type}</span>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre?.map((g, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-xl text-white/90 text-sm font-medium border border-white/20 hover:border-[#18E3B4]/50 transition-colors">
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            {movie.description}
          </p>

          {/* Studio Info - if available */}
          {movie.studio && (
            <div className="flex items-center gap-2 mb-6 text-white/60 text-sm">
              <Building2 size={14} className="text-[#18E3B4]" />
              <span>{movie.studio}</span>
            </div>
          )}

          
          {/* Action Buttons */}
<div className="flex flex-wrap gap-4">
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowTrailer(true);
    }}
    className="bg-[#18E3B4] hover:bg-[#18E3B4]/80 text-white px-8 md:px-10 py-3 md:py-3.5 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#18E3B4]/25 font-semibold cursor-pointer"
  >
    <Play size={20} className="fill-current" />
    Watch Now
  </button>
  <Button
    onClick={handleAddToWishlist}
    className={`backdrop-blur-sm px-6 md:px-8 py-3 md:py-3.5 rounded-xl flex items-center gap-2 transition-all duration-300 border font-semibold ${isInWishlist
      ? "bg-[#18E3B4]/20 border-[#18E3B4] text-[#18E3B4]"
      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
      }`}
  >
    {isInWishlist ? <Check size={18} /> : <Plus size={18} />}
    {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
  </Button>
</div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
          {[
            { id: "overview", label: "Overview", icon: BookOpen },
            { id: "details", label: "Details", icon: Info },
            { id: "cast", label: "Cast & Crew", icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-2 pb-3 px-3 md:px-4 capitalize transition-all duration-300 relative ${activeTab === tab.id
                ? "text-[#18E3B4]"
                : "text-white/60 hover:text-white"
                }`}
            >
              <tab.icon size={16} />
              <span className="text-sm md:text-base font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#18E3B4] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Synopsis Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#18E3B4]" />
                Synopsis
              </h3>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                {movie.description}
              </p>
            </div>

            {/* Quick Stats - 4 key stats in a row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                <Star size={24} className="text-[#18E3B4] mx-auto mb-2" />
                <p className="text-white font-bold text-2xl">{movie.rating}</p>
                <p className="text-white/60 text-xs">IMDb Rating</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                <CalendarDays size={24} className="text-[#18E3B4] mx-auto mb-2" />
                <p className="text-white font-bold text-2xl">{movie.year}</p>
                <p className="text-white/60 text-xs">Release Year</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                <Clock3 size={24} className="text-[#18E3B4] mx-auto mb-2" />
                <p className="text-white font-bold text-xl">{movie.duration}</p>
                <p className="text-white/60 text-xs">Duration</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                <Film size={24} className="text-[#18E3B4] mx-auto mb-2" />
                <p className="text-white font-bold text-xl">{movie.type}</p>
                <p className="text-white/60 text-xs">Type</p>
              </div>
            </div>

            {/* Genre Tags */}
            <div>
              <h4 className="text-white/60 text-sm mb-3">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {movie.genre?.map((g, idx) => (
                  <span key={idx} className="px-4 py-2 bg-[#18E3B4]/10 rounded-full text-[#18E3B4] text-sm font-medium border border-[#18E3B4]/30">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Production Details */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-[#18E3B4] font-semibold mb-4 flex items-center gap-2">
                <Film size={18} />
                Production
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Director</span>
                  <span className="text-white font-medium">{movie.director.name || "TBA"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Release Year</span>
                  <span className="text-white font-medium">{movie.year}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Duration</span>
                  <span className="text-white font-medium">{movie.duration}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/60">Type</span>
                  <span className="text-white font-medium">{movie.type}</span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-[#18E3B4] font-semibold mb-4 flex items-center gap-2">
                <Info size={18} />
                Additional Info
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Rating</span>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-[#18E3B4] fill-current" />
                    <span className="text-white font-medium">{movie.rating}</span>
                    <span className="text-white/40 text-sm">/ 10</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Popularity</span>
                  <span className="text-white font-medium">High</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Language</span>
                  <span className="text-white font-medium">{movie.language || "Original"}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-white/60">Country</span>
                  <span className="text-white font-medium">{movie.country || "International"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cast" && (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Cast & Crew</h3>
            {movie.cast && movie.cast.length > 0 ? (
              <>
                <h4 className="text-[#18E3B4] font-semibold mb-4">Main Cast</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.cast.map((actor, idx) => (
                    <div key={idx} className="text-center group cursor-pointer p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                      <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#18E3B4]/20 to-transparent flex items-center justify-center mb-3 overflow-hidden group-hover:scale-105 transition-all duration-300">
                        {
                          actor.img == '' ? <User/> : <img src={actor.img} alt={actor.img} />

                        }
                      </div>
                      <p className="text-white font-semibold text-sm group-hover:text-[#18E3B4] transition-colors truncate">
                        {actor.name}
                      </p>
                      <p className="text-white/40 text-xs">Actor</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white/5 rounded-2xl">
                <Users size={48} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/60">Cast information coming soon...</p>
              </div>
            )}

            {movie.director && (
              <div className="mt-8">
                <h4 className="text-[#18E3B4] font-semibold mb-4">Director</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div className="text-center group cursor-pointer p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#18E3B4]/20 to-transparent flex items-center justify-center mb-3 overflow-hidden group-hover:scale-105 transition-all duration-300">
                      {
                        movie.director.name == "Unknow" ? <User/> : <img src={movie.director.img} alt={movie.director.img} />
                      }
                    </div>
                    <p className="text-white font-semibold text-sm group-hover:text-[#18E3B4] transition-colors truncate">
                      {movie.director.name}
                    </p>
                    <p className="text-white/40 text-xs">Director</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MovieDetail;