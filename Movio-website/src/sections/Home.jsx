import { useEffect, useState } from "react";
import Title from "../components/Title";
import Carousel from "../components/Carousel";
import MovieCard from '../components/MovieCard';
import MovieGrid from "../components/MovieGrid";
import axios from "axios";
import DisplayAllMovie from "../components/DisplayAllMovie";

const Home = () => {
  const [PopularMovies, setPopularMovies] = useState([]);
  
  useEffect(() => {
    axios.get('/data/movie.json')
       .then(res => {
        const filtered = res.data.filter(item => item.rating >= 8.5);
        setPopularMovies(filtered);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  return (
    <div className="px-2 sm:px-4">
      <Carousel />
      <Title title={"What's Popular"}/>
      <MovieGrid movies={PopularMovies} />
      <Title title={"Dong Hua"}/>
      <MovieGrid movies={PopularMovies} />
      
    </div>
  );
};

export default Home;