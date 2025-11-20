import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        relative px-6 py-2.5 rounded-lg font-semibold 
        transition-all duration-300 ease-out 
        
        /* Gamer Mode Base */
        bg-[#041018] text-cyan-300 
        border border-cyan-700 
        shadow-[0_0_12px_#00eaff55] 
        
        /* Hover Effects */
        hover:bg-[#07202d] 
        hover:text-cyan-200
        hover:border-cyan-400 
        hover:shadow-[0_0_20px_#00eaffaa]
        hover:-translate-y-0.5

        /* Press Effect */
        active:scale-95 
        
        /* Disabled */
        disabled:opacity-50 disabled:cursor-not-allowed

        /* Custom classes */
        ${className}
      `}
      {...props}
    >
      {/* Neon Shine Overlay */}
      <span
        className="
          pointer-events-none absolute inset-0 opacity-0 
          bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent 
          blur-xl transition-opacity duration-500
          hover:opacity-100
        "
      ></span>

      {/* Button Text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default Button;


