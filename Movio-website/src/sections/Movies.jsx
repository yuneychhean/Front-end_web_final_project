import React, { useState } from 'react'
import DisplayAllMovie from '../components/DisplayAllMovie';
import Title from '../components/Title';

const Movies = () => {
  
  const [selectedGenre, setSelectedGenre] = useState("")
  
  // Add "All" to the genres array
  const genres = [
    { name: "All", gradient: "from-gray-500 to-gray-700", hover: "hover:from-gray-600 hover:to-gray-800" },
    { name: "Action", gradient: "from-red-400 to-red-600", hover: "hover:from-red-500 hover:to-red-700" },
    { name: "Adventure", gradient: "from-orange-400 to-orange-600", hover: "hover:from-orange-500 hover:to-orange-700" },
    { name: "Sci-Fi", gradient: "from-fuchsia-500 to-purple-600", hover: "hover:from-fuchsia-600 hover:to-purple-700" },
    { name: "Animation", gradient: "from-pink-400 to-rose-500", hover: "hover:from-pink-500 hover:to-rose-600" },
    { name: "Fantasy", gradient: "from-indigo-400 to-indigo-600", hover: "hover:from-indigo-500 hover:to-indigo-700" },
    { name: "Crime", gradient: "from-gray-500 to-gray-700", hover: "hover:from-gray-600 hover:to-gray-800" },
    { name: "Drama", gradient: "from-yellow-400 to-amber-500", hover: "hover:from-yellow-500 hover:to-amber-600" },
    { name: "Biography", gradient: "from-lime-400 to-green-500", hover: "hover:from-lime-500 hover:to-green-600" },
    { name: "History", gradient: "from-amber-600 to-yellow-700", hover: "hover:from-amber-700 hover:to-yellow-800" },
    { name: "Thriller", gradient: "from-rose-600 to-red-800", hover: "hover:from-rose-700 hover:to-red-900" },
    { name: "Comedy", gradient: "from-green-400 to-emerald-500", hover: "hover:from-green-500 hover:to-emerald-600" },
    { name: "Mystery", gradient: "from-violet-500 to-purple-700", hover: "hover:from-violet-600 hover:to-purple-800" },
    { name: "Horror", gradient: "from-black to-gray-800", hover: "hover:from-gray-900 hover:to-black" },
    { name: "K-Drama", gradient: "from-black to-gray-800", hover: "hover:from-gray-900 hover:to-black" }
  ];
  
  const handleGenreClick = (genreName) => {
    // If "All" is clicked, set to empty string, otherwise set the genre name
    if (genreName === "All") {
      setSelectedGenre("");
    } else {
      setSelectedGenre(genreName);
    }
  };
  
  return (
    <>
    <title>Movies</title>
      <div className='pt-15 pb-5 sm:pt-20 sm:pb-10 px-2 sm:px-4 w-full h-full'>
        <Title title={"Genre"}/>
        <div className='flex flex-row gap-3 h-20 sm:h-20 px-2 font-[Lexend] overflow-x-auto w-full'>
          {genres.map((genre) => (
            <button 
              onClick={() => handleGenreClick(genre.name)}
              key={genre.name}
              className={`
                flex justify-center items-center px-6
                bg-gradient-to-r ${genre.gradient} ${genre.hover}
                rounded-lg text-white font-semibold
                transition-all duration-300 
                hover:scale-105 hover:shadow-lg cursor-pointer
                whitespace-nowrap
                ${(selectedGenre === genre.name) || (genre.name === "All" && selectedGenre === "") 
                  ? 'border border-white' 
                  : ''
                }
              `}
            >
              {genre.name}
            </button>
          ))}
        </div>
        {selectedGenre== "" ? <Title title={"All Movie"}/> : <Title title={selectedGenre}/>}
        <DisplayAllMovie genre={selectedGenre} />
      </div>
    </>
  )
}

export default Movies;