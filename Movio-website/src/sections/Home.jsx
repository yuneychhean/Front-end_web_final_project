import { useEffect, useState } from "react";
import Title from "../components/Title";
import Carousel from "../components/Carousel";
import MovieCard from '../components/MovieCard';
import MovieGrid from "../components/MovieGrid";
import axios from "axios";
import DisplayAllMovie from "../components/DisplayAllMovie";
import InfiniteSlide from "../components/infiniteSlide";
import MovieBannerGrid from "../components/MovieBannerGrid";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [anime , setAnime] = useState([])
  const [action , setAction] = useState([])
  
  useEffect(() => {
    axios.get('/data/movie.json')
       .then(res => {
        const filtered = res.data.filter(item => item.rating >= 8.5);
        setPopularMovies(filtered);
        const filterAnime = res.data.filter(items=> items.genre.includes("Animation"))
        setAnime(filterAnime)
        const filterAction = res.data.filter(items=> items.genre.includes("Action"))
        setAction(filterAction)
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
      <Title title={"Action"}/>
      <MovieBannerGrid movies={action}/>
      <Title title={"Animation"}/>
      <MovieGrid movies={anime} />
      <div className="flex flex-col justify-center items-center w-full">
        {/* Production Companies Section */}
      <div className="text-center my-10 ">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Featured Production Studios
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Movies from the world's best production companies
        </p>
        <div className="w-12 h-0.5 bg-[#18E3B5] rounded-full mx-auto mt-4"></div>
      </div>

        <InfiniteSlide/>
      </div>
      
      
    </div>
  );
};

export default Home;