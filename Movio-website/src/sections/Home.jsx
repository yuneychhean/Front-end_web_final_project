import React, { useState , useEffect} from "react";
import Hero1 from "../assets/Hero1.png";
import Hero2 from "../assets/Hero2.png";
import Hero3 from "../assets/Hero3.png";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";


const Home = () => {
  const info = [
    {
      img: Hero1,
      title: "Spider-Man Homecoming",
      description:
        "Peter Parker tries to stop Vulture from selling dangerous Chitauri weapons while balancing life as a high school student.",
      rating: "4.5",
      year: "2020",
      time: "140min",
      type: "Action",
      genre: "Aventure",
    },
    {
      img: Hero2,
      title: "Renagade Immortal",
      description:
        "Wang Lin uses a mysterious bead and his ruthless will to become a powerful cultivator and challenge the heavens.",
      rating: "4.9",
      year: "2023",
      time: "133 episode",
      type: "Action",
      genre: "Dong Hua",
    },
    {
      img: Hero3,
      title: "Soul Land II",
      description:
        "The story follows Huo Yuhao, an underdog with the rare martial soul, who becomes the host for a million-year-old soul beast named the Daydream Ice Worm.",
      rating: "4.8",
      year: "2023",
      time: "145 episode",
      type: "Action",
      genre: "Dong Hua",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === info.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [info.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? info.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === info.length - 1 ? 0 : prev + 1));
  };

  const currentMovie = info[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-10">
        {info.map((img, index) => (
          <img
            key={index}
            src={img.img}
            alt={`Hero ${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-700
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#18E3B4]/40 via-black/40 to-[#f5f5f5]/30"></div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute w-full flex justify-between px-6 z-20">
        <button
          onClick={prevSlide}
          className="glass bg-[#ffffff00] p-3 rounded-full hover:scale-110 transition border-none hover:bg-[#18E3B4]/40"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={nextSlide}
          className="glass bg-[#ffffff00] p-3 rounded-full hover:scale-110 transition border-none hover:bg-[#18E3B4]/40"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* content */}

      <div className=" container mx-auto px-6 relative z-10">
        
          <div className=" grid md:grid-cols-2 gap-12 items-center">
            {/* leftt content */}
            <div className=" space-y-8">
              <div>
                <span className=" inline-flex font-bold text-2xl items-center uppercase text-[#EAB92C]">
                  Feature
                </span>
              </div>

              {/* Headline */}
              <div className=" space-y-4">
                <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                  {currentMovie.title}
                </h1>
              </div>
              {/* rating and description */}
              <div>
                <div className=" flex flex-row gap-4 font-semibold text-white">
                  <div className=" flex flex-row gap-2 text-white">
                    <Star className=" w-6 h-6 text-[#EAB92C]" />
                    {currentMovie.rating}
                  </div>
                  <div>{currentMovie.year}</div>
                  <div> {currentMovie.time}</div>
                </div>
                <div>
                  <p className=" text-white">
                    {currentMovie.description}
                  </p>
                </div>

                <div className=" w-fit">
                  <div className=" flex flex-row pt-4 gap-4 ">
                    <div className=" glass py-1 px-3 rounded-2xl bg-[#A37D12] text-white/60 font-semibold border-none">
                      {currentMovie.type}
                    </div>
                    <div className=" glass py-1 px-3 rounded-2xl bg-[#A37D12] text-white/60 font-semibold border-none">
                      {currentMovie.genre}
                    </div>
                  </div>
                  <div className=" flex pt-3 ">
                    <Button className=" w-full bg-[#EAB92C] text-white/90 border border-[#EAB92C] px-4 py-2 hover:bg-[#EAB92C]/60">
                      <Play />
                      View Detail
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Home;
