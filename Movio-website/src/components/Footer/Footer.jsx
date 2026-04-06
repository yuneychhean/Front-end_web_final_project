import { Link } from "react-router-dom";
import BrandSection from "./BrandSection";
import FooterColumn from "./FooterColumn";

function Footer() {
    const FOOTER_LINKS = [
        {
            title: "Explore",
            links: [
                { name: "Home", path: "/" },
                { name: "Movies", path: "/movies" },
                { name: "Series", path: "/series" },
                { name: "Popular", path: "/popular" },
                { name: "Login", path: "/login" },
                { name: "Sign Up", path: "/signup" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Copyright Notice", href: "/copyright" },
            ]
        }
    ];

    return (
        <footer className="bg-[#0f1418] pt-10 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section takes up more space */}
                    <div className="md:col-span-2">
                        <BrandSection />
                    </div>

                    {/* Links Sections */}
                    {FOOTER_LINKS.map((section, index) => (
                        <FooterColumn 
                            key={index} 
                            title={section.title} 
                            links={section.links} 
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#00e6b6] py-3 text-center">
                <p className="text-[#0f1418] text-[10px] font-bold uppercase tracking-widest">
                    Copyright © 2026, Movio. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;