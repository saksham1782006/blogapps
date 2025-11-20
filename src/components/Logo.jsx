import React from "react";

function Logo({ width = "140px" }) {
  return (
    <div
      style={{ width }}
      className="
        flex items-center gap-3 cursor-pointer 
        group select-none
      "
    >
      {/* NEON ICON */}
      <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          w-10 h-10 sm:w-12 sm:h-12 
          transform transition-all duration-300 
          group-hover:scale-125 group-hover:rotate-6
          drop-shadow-[0_0_10px_#00eaffaa]
        "
      >
        {/* Neon Gradient */}
        <defs>
          <linearGradient id="neonBook" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="50%" stopColor="#7b2ff7" />
            <stop offset="100%" stopColor="#ff00ea" />
          </linearGradient>
        </defs>

        {/* Cyber Book */}
        <rect
          x="10"
          y="8"
          width="30"
          height="34"
          rx="3"
          fill="url(#neonBook)"
          className="shadow-[0_0_15px_#00eaff88] group-hover:shadow-[0_0_20px_#00eaff]"
        />

        {/* Glow Spine */}
        <rect
          x="10"
          y="8"
          width="4"
          height="34"
          rx="2"
          fill="#00eaff"
          opacity="0.35"
        />

        {/* CYBER TEXT LINES */}
        <rect
          x="16"
          y="14"
          width="16"
          height="2"
          rx="1"
          className="neon-line animation-delay-0"
        />
        <rect
          x="16"
          y="19"
          width="20"
          height="2"
          rx="1"
          className="neon-line animation-delay-1"
        />
        <rect
          x="16"
          y="24"
          width="18"
          height="2"
          rx="1"
          className="neon-line animation-delay-2"
        />
        <rect
          x="16"
          y="29"
          width="14"
          height="2"
          rx="1"
          className="neon-line animation-delay-3"
        />
      </svg>

      {/* GAMER TEXT */}
      <span
        className="
          text-2xl sm:text-3xl font-extrabold 
          bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 
          bg-clip-text text-transparent 
          drop-shadow-[0_0_10px_#00eaff]
          tracking-wide
          transition-all duration-300 
          group-hover:from-pink-400 group-hover:to-cyan-300
          group-hover:drop-shadow-[0_0_15px_#00eaff]
        "
      >
        Blogs
      </span>

      {/* Additional Holographic Scanline + Neon Animations */}
      <style>{`
        /* Neon flicker animation */
        @keyframes neonGlow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; filter: drop-shadow(0 0 12px #00eaff); }
        }

        /* Cyber line reveal */
        @keyframes cyberLine {
          from {
            opacity: 0;
            transform: translateX(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(0px);
          }
        }

        .neon-line {
          fill: #e0faff;
          filter: drop-shadow(0 0 6px #00eaffaa);
          animation: cyberLine 0.5s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-1 { animation-delay: 0.1s; }
        .animation-delay-2 { animation-delay: 0.2s; }
        .animation-delay-3 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}

export default Logo;
