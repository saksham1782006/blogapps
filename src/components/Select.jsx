import React, { useId } from "react";

function Select(
  {
    options,
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-xs sm:text-sm font-medium text-cyan-300 drop-shadow-[0_0_6px_#00eaff] block mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Select Input */}
        <select
          {...props}
          id={id}
          ref={ref}
          className={`
            px-4 py-2.5 rounded-lg w-full text-sm cursor-pointer
            bg-[#05131A] text-cyan-200 
            border border-cyan-800
            shadow-[inset_0_0_12px_#00eaff33]

            focus:border-cyan-400 
            focus:ring-2 focus:ring-cyan-600/40
            hover:border-cyan-500

            disabled:bg-gray-800 disabled:cursor-not-allowed disabled:border-gray-700

            transition-all duration-300 appearance-none pr-12
            ${className}
          `}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' stroke='%2300eaff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.2rem",
          }}
        >
          {options?.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#041018] text-cyan-300"
            >
              {option}
            </option>
          ))}
        </select>

        {/* Alternative arrow — glowing neon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_#00eaff] transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(Select);
