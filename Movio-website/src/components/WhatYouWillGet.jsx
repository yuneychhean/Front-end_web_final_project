import React from 'react';
// Assuming you have lucide-react installed for icons
// If not, you can replace with your preferred icon library or SVGs
import { 
  Smartphone, 
  Moon, 
  Ruler, 
  Globe, 
  Layers,
  Heart, 
  Sliders , 
  FileJson
} from 'lucide-react';

const features = [
  {
    title: "Responsive Design",
    description: "Available for mobile and web",
    icon: Smartphone,
  },
  {
    title: "JSON Data Fetching",
    description: "Load movie data directly from local JSON files",
    icon: FileJson,
  },
  {
    title: "Watchlist",
    description: "Save movies to watch later ",
    icon: Heart,
  }
];

const WhatYouWillGet = () => {
  // Accent color as defined
  const accentColor = "#18E3B5";

  return (
    <section className="py-16 px-4 md:py-24 bg-[#252527]  transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold  text-white mb-4">
            Key Features 
          </h2>
          
          <div className="w-24 h-1 rounded-full mx-auto" style={{ backgroundColor: accentColor }}></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-[#252527] dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-[#18E3B4] hover:border-transparent items-center flex flex-col text-center"
            >
              {/* Icon Container */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${accentColor}15` }} // 15% opacity background
              >
                <feature.icon 
                  size={28} 
                  style={{ color: accentColor }}
                  strokeWidth={1.75}
                />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional: Decorative element matching design style */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Modern, functional and flexible Movie Website
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatYouWillGet;