import { useEffect, useState } from "react";
import Title from "../components/Title";
import Carousel from "../components/Carousel";
import MovieCard from '../components/MovieCard';
import MovieGrid from "../components/MovieGrid";
import axios from "axios";
import DisplayAllMovie from "../components/DisplayAllMovie";

const Home = () => {
  const [popular, setPopular] = useState([]);
  
  useEffect(() => {
    axios.get('/data/popular.json')
      .then(res => setPopular(res.data))
      .catch(e => console.log(e))
  }, []);

  return (
    <div className="px-2 sm:px-4">
      <Carousel />
      <Title title={"What's Popular"}/>
      <MovieGrid movies={popular} />
      <Title title={"Dong Hua"}/>
      <MovieGrid movies={popular} />
      
    </div>
  );
};

export default Home;