import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { AiOutlineArrowUp } from "react-icons/ai"; // Optional: adding an arrow icon
import MovioLogo from "../../assets/MovioLogo.png";

export default function BrandSection() {
  const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // or "auto" for instant scroll
        });
    };
  return (
    <div className="flex flex-col items-start max-w-sm">
      <img src={MovioLogo} alt="Movio Logo" className="w-32 mb-6" />
      <p className="text-gray-400 text-sm leading-relaxed mb-8">
        Curating the world’s finest cinema through intelligent filtering to bring the theater experience directly to your screen.
      </p>
      
      <div className="flex gap-6 mb-10">
        <FaXTwitter size={20} className="text-white hover:text-[#00e6b6] cursor-pointer transition-colors" />
        <FaLinkedinIn size={20} className="text-white hover:text-[#00e6b6] cursor-pointer transition-colors" />
        <FaInstagram size={20} className="text-white hover:text-[#00e6b6] cursor-pointer transition-colors" />
        <FaFacebookF size={20} className="text-white hover:text-[#00e6b6] cursor-pointer transition-colors" />
      </div>

      <button onClick={handleScrollToTop} className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
        <AiOutlineArrowUp /> Back To Top
      </button>
    </div>
  );
}