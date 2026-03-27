import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./sections/Home";
import Navbar from "./layouts/Navbar";
import Movies from "./sections/Movies"
import Popular from "./layouts/Navbar"
import Series from './sections/Series'
import SearchDropdown from "./components/SearchDropdown";
import MovieCard from "./components/MovieCard";




function App() {

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
      
      
      


    </div>
  );
}

export default App;
