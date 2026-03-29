// sections/WishList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Film } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';

const WishList = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#252527] dark:bg-[#0f1418] pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <Heart size={80} className="text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
            <p className="text-white/60 mb-8">
              Start adding movies and series you want to watch!
            </p>
            <Link to="/movies">
              <Button className="bg-[#18E3B4] hover:bg-[#18E3B4]/80 text-white px-8 py-3 rounded-xl font-semibold">
                Browse Movies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#252527] dark:bg-[#0f1418] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            <p className="text-white/60 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'movie' : 'movies'} saved
            </p>
          </div>
          <Button
            onClick={clearWishlist}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Trash2 size={16} />
            Clear All
          </Button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlist.map((movie) => (
            <div key={movie.id} className="group relative">
              <Link to={`/${movie.id}`} state={{ movie }}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-black/70 rounded-full px-2 py-1 text-sm font-bold text-yellow-400">
                    ★ {movie.rating.toFixed(1)}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlist(movie.id);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#18E3B5] transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{movie.year}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;