import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgUnavailable } from "react-icons/cg";
import MovieCard from './MovieCard';

const DisplayAllMovie = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/data/movie.json')
      .then(res => {
        console.log("Movies loaded:", res.data); // Debug log
        setMovies(res.data);
        setLoading(false);
      })
      .catch(e => {
        console.log("Error loading movies:", e);
        setLoading(false);
      })
  }, []);

  // Filter movies based on genre prop
  const filteredMovies = genre && genre !== "" 
    ? movies.filter(movie => {
        // Your data has genre as an array
        if (movie.genre && Array.isArray(movie.genre)) {
          // Check if the genre array includes the selected genre
          return movie.genre.some(g => g.toLowerCase() === genre.toLowerCase());
        }
        // Fallback if genre is a string
        if (movie.genre && typeof movie.genre === 'string') {
          return movie.genre.toLowerCase() === genre.toLowerCase();
        }
        return false;
      })
    : movies;

  console.log("Selected genre:", genre);
  console.log("Filtered movies count:", filteredMovies.length);

  if (loading) {
    return <div className="text-center text-gray-400 py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      <p className="mt-2">Loading movies...</p>
    </div>;
  }

  // Show no results message if filtered movies is empty
  if (filteredMovies.length === 0 && genre && genre !== "") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4"><CgUnavailable/></div>
        <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
        <p className="text-gray-400">No movies available in the "{genre}" genre</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
        >
          Browse all movies
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-2">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default DisplayAllMovie;