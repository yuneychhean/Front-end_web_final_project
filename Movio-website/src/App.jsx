import Home from "./sections/Home";
import Navbar from "./layouts/Navbar";
import SearchDropdown from "./components/SearchDropdown";
import MovieCard from "./components/MovieCard";



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
    
      <Navbar  />
      <Home />
      


    </div>
  );
}

export default App;
