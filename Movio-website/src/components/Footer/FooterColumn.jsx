// FooterColumn.jsx
import { Link } from "react-router-dom";

export default function FooterColumn({ title, links }) {
  const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // or "auto" for instant scroll
        });
    };
    return (
        <div>
            <h3 className="text-white font-semibold mb-4">{title}</h3>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link 
                        onClick={handleScrollToTop}
                            to={link.path}
                            className="text-gray-400 hover:text-[#00e6b6] transition-colors duration-300 text-sm"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}