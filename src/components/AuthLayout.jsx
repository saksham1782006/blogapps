import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setTimeout(() => {
      setLoader(false);
      setTimeout(() => setFadeIn(true), 100);
    }, 600);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="relative flex items-center justify-center min-h-screen 
                    bg-[#02040a] text-cyan-300 overflow-hidden">

      {/* Neon Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[url('/grid.svg')] bg-repeat bg-center"></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 
                      bg-cyan-500/20 rounded-full blur-3xl animate-orb"></div>

      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 
                      bg-blue-600/20 rounded-full blur-3xl animate-orb animation-delay-2000"></div>

      {/* Loader */}
      <div className="relative z-10 text-center animate-fadeIn">
        {/* Circular neon spinner */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 h-20 w-20 rounded-full 
                          bg-cyan-400 opacity-20 animate-ping"></div>

          <div className="h-20 w-20 rounded-full border-4 border-cyan-700 
                          border-t-cyan-300 border-b-transparent border-l-transparent
                          animate-spin shadow-[0_0_20px_#00eaff]"></div>

          <div className="absolute top-1/2 left-1/2 h-4 w-4 
                          bg-cyan-400 rounded-full 
                          transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>

        {/* Loading text */}
        <h1 className="text-2xl font-bold tracking-wider mb-2">
          <span className="animate-bounce">L</span>
          <span className="animate-bounce animation-delay-100">o</span>
          <span className="animate-bounce animation-delay-200">a</span>
          <span className="animate-bounce animation-delay-300">d</span>
          <span className="animate-bounce animation-delay-400">i</span>
          <span className="animate-bounce animation-delay-500">n</span>
          <span className="animate-bounce animation-delay-600">g</span>
          <span className="animate-bounce animation-delay-700">.</span>
          <span className="animate-bounce animation-delay-800">.</span>
          <span className="animate-bounce animation-delay-900">.</span>
        </h1>

        <p className="text-cyan-400 text-sm opacity-80 mt-2">
          {authentication ? "Validating access..." : "Loading experience..."}
        </p>

        {/* Neon progress bar */}
        <div className="mt-6 w-64 mx-auto h-1 bg-cyan-900/40 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00eaff] 
                          animate-progress"></div>
        </div>

        {/* Pulsing dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-cyan-200 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-20px) scale(1.1); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-orb { animation: orb 8s ease-in-out infinite; }
        .animate-progress { animation: progress 1.7s infinite linear; }
        .animate-fadeIn { animation: fadeIn .7s ease-out; }
        .animation-delay-100 { animation-delay: .1s; }
        .animation-delay-200 { animation-delay: .2s; }
        .animation-delay-300 { animation-delay: .3s; }
        .animation-delay-400 { animation-delay: .4s; }
        .animation-delay-500 { animation-delay: .5s; }
        .animation-delay-600 { animation-delay: .6s; }
        .animation-delay-700 { animation-delay: .7s; }
        .animation-delay-800 { animation-delay: .8s; }
        .animation-delay-900 { animation-delay: .9s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  ) : (
    <div
      className={`transition-all duration-700 ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}
