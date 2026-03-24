function Button({ className = "", size = "dafault", children }) {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#20b2a6] border border-[#18E3B5] text-[#18E3B5] hover:bg-[#18E3B5] hover:text-black shadow-lg";
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${sizeClasses[size] || ""} ${className || "" }`;
  
  return (
  <button className={classes}>
    <span className=" relative flex items-center justify-center gap-2">
      {children}
    </span>
  </button>);
}

export default Button;
