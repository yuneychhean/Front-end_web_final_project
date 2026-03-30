import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const DisplayPopularMovie = () => {
  const [PopularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('/data/movie.json')
       .then(res => {
        const filtered = res.data.filter(item => item.rating >= 8.5);
        setPopularMovies(filtered);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 py-8">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {PopularMovies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default DisplayPopularMovie;