import React from "react";

function Container({ children, className = "" }) {
  return (
    <div
      className={`
        w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 
        transition-all duration-300 
        
        bg-[#05070d]/60 
        border border-cyan-800 
        shadow-[0_0_25px_#00eaff55] 
        backdrop-blur-xl 
        rounded-2xl 
        
        hover:shadow-[0_0_40px_#00eaffaa] 
        hover:border-cyan-400 
        hover:-translate-y-1

        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
