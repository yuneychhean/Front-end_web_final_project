import { Link } from "react-router-dom";
import {Heart } from 'lucide-react'

function MovieCard (props) {
  return (
    <a>
      <div className="group relative h-full cursor-pointer">
        
        {/* Image Container */}
        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
          
          {/* Poster */}
          <img
            src={props.image}
            alt={props.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Gradient Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/70 rounded-full px-2 py-1 text-sm font-bold text-yellow-400">
            ★ {props.rating.toFixed(1 , 0)}
          </div>

          {/* Favorite Button */}
          <button
            className="absolute bottom-3 right-3 p-2 bg-[#18E3B5] hover:bg-[#65ffdb] rounded-full transition-colors opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <Heart/>
          </button>
        </div>

        {/* Movie Info */}
        <div className="mt-3">
          <h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#18E3B5] transition-colors">
            {props.title}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            {props.year}
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {props.genre.map(type =>(
                <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded">
                    {type}
                </span>
            ))}
            
            
          </div>
        </div>

      </div>
    </a>
  );
};

export default MovieCard