import { useEffect, useState } from "react";
import Title from "../components/Title";
import Carousel from "../components/Carousel";
import MovieCard from '../components/MovieCard';
import MovieGrid from "../components/MovieGrid";
import axios from "axios";
import DisplayAllMovie from "../components/DisplayAllMovie";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [anime , setAnime] = useState([])
  
  useEffect(() => {
    axios.get('/data/movie.json')
       .then(res => {
        const filtered = res.data.filter(item => item.rating >= 8.5);
        setPopularMovies(filtered);
        const filterAnime = res.data.filter(items=> items.genre.includes("Animation"))
        setAnime(filterAnime)
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  return (
    <div className="px-2 sm:px-4">
      <Carousel />
      <Title title={"What's Popular"}/>
      <MovieGrid movies={popularMovies} />
      <Title title={"Animation"}/>
      <MovieGrid movies={anime} />
      
    </div>
  );
};

export default Home;