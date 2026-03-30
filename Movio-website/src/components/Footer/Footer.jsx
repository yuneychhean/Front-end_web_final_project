

import BrandSection from "./BrandSection";
import FooterColumn from "./FooterColumn";

export default function Footer(){
    const FOOTER_LINKS = [
    {
        title: "Site Map",
        links: ["Homepage", "Technology", "Ataraxis Breast", "Resources & news", "Careers", "Contact Us", "Portal"]
    },
    {
        title: "Legal",
        links: ["Privacy Policy", "Terms of Services", "Lawyer's Corners"]
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
          {FOOTER_LINKS.map((f, index) => (
            <FooterColumn key={index} title={f.title} links={f.links} />
          ))}
        </div>
      </div>

      {/* Bottom Bar matching your Gold/Teal pattern */}
      <div className="bg-[#00e6b6] py-3 text-center">
        <p className="text-[#0f1418] text-[10px] font-bold uppercase tracking-widest">
          Copyright © 2026, Movio. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}