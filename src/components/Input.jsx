import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs sm:text-sm font-semibold text-cyan-300 mb-2 block 
                     tracking-wide drop-shadow-[0_0_5px_#00eaff]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        className={`
          block w-full rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm 
          transition-all duration-300 outline-none

          /* Cyberpunk Base */
          bg-[#05070d] 
          text-cyan-200 
          placeholder-cyan-800

          /* Borders + Glows */
          border border-cyan-800 
          shadow-[0_0_15px_#00eaff33]

          /* Hover */
          hover:border-cyan-500 
          hover:shadow-[0_0_20px_#00eaff55]

          /* Focus Neon Glow */
          focus:border-cyan-300 
          focus:shadow-[0_0_25px_#00eaffaa]

          /* Disabled */
          disabled:bg-[#0a0d14] 
          disabled:border-cyan-900 
          disabled:text-cyan-800 
          disabled:cursor-not-allowed

          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;
