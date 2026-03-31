// components/MovieCard.jsx
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';
import { useWishlist } from "../context/WishlistContext";

function MovieBanner(props) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(props.id);

  return (
    <Link to={`/${props.id}`} state={{ movie: props }}>
      <div className="group relative h-full cursor-pointer">
        
        {/* Image Container */}
        <div className="relative w-full h-34 rounded-lg overflow-hidden bg-gray-800">
          
          {/* Poster */}
          <img
            src={props.banner}
            alt={props.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Gradient Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />



          {/* Favorite Button */}
          <button
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 ${
              inWishlist 
                ? 'bg-[#18E3B5] text-white' 
                : 'bg-gray-800/80 hover:bg-[#18E3B5] text-gray-400 hover:text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(props);
            }}
          >
            <Heart size={16} className={inWishlist ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Movie Info */}
        <div className="mt-3">
          <h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#18E3B5] transition-colors">
            {props.title}
          </h3>  
        </div>

      </div>
    </Link>
  );
};

export default MovieBanner;