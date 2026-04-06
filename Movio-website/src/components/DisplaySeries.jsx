import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const DisplaySeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/data/movie.json')
      .then(res => {
        const filtered = res.data.filter(item => item.type === "Series");
        setSeries(filtered);
        setLoading(false);
      })
      .catch(e => {
        console.error("Error fetching series:", e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 py-10 animate-pulse">Loading Series...</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {series.length > 0 ? (
        series.map((item) => (
          <MovieCard key={item.id} {...item} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          No series found.
        </div>
      )}
    </div>
  );
};

export default DisplaySeries;