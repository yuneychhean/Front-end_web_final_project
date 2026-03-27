import Home from "./sections/Home";
import Navbar from "./layouts/Navbar";
import SearchDropdown from "./components/SearchDropdown";



function App() {

  return (
    <div className="min-h-screen overflow-hidden bg-[#252527] text-black dark:bg-[#0f1418] dark:text-[#f0f2f5] transition-colors duration-300">
    
      <Navbar  />
      <Home />
    </div>
  );
}

export default App;
