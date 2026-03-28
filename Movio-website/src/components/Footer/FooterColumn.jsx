export default function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white font-bold text-sm tracking-wide mb-2">{title}</h2>
      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <p 
            key={index} 
            className="text-gray-400 text-sm hover:text-[#00e6b6] cursor-pointer transition-colors"
          >
            {link}
          </p>
        ))}
      </div>
    </div>
  );
}