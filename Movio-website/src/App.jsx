import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./sections/Home";
import Navbar from "./layouts/Navbar";
import Movies from "./sections/Movies"
import Popular from "./layouts/Navbar"
import Series from './sections/Series'
import SearchDropdown from "./components/SearchDropdown";
import MovieCard from "./components/MovieCard";
import Footer from "./components/Footer/Footer";





function App() {
  const movie ={
    "id": 1,
    "title": "Spider-Man: Homecoming",
    "year": 2017,
    "type": "Movie",
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "rating": 7.4,
    "duration": "2h 13m",
    "description": "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, finding himself on the trail of a new menace prowling the skies of New York City.",
    "cast": ["Tom Holland", "Michael Keaton", "Robert Downey Jr."],
    "director": "Jon Watts",
    "image": "../poster/1.png",
    "banner": "https://via.placeholder.com/1280x720"
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#252527] text-black dark:bg-[#0f1418] dark:text-[#f0f2f5] transition-colors duration-300">
      
      <BrowserRouter>
        <Navbar  />


        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/movies" element={<Movies/>}></Route>
          <Route path="/popular" element={<Popular/>}></Route>
          <Route path="/series" element={<Series/>}></Route>
          
        </Routes>
      </BrowserRouter>
      
      
      <Footer/>


    </div>
  );
}

export default App;
