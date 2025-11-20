import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-10 min-h-[calc(100vh-200px)] bg-[#05070d] relative overflow-hidden">

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#0bbbe040_1px,transparent_1px),linear-gradient(90deg,#0bbbe040_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <Container className="relative z-10">

        {/* Hero Section */}
        <div className="text-center mb-10 animate-fadeInDown">

          {/* Neon icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full
          bg-[#0bbbe033] border border-cyan-500 shadow-[0_0_20px_#00eaffaa] mb-4 relative group">

            <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 animate-ping"></div>

            <svg
              className="w-10 h-10 text-cyan-300 group-hover:rotate-90 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_10px_#00eaff] animate-fadeIn">
            Create New Post
          </h1>

          <p className="text-gray-300 mt-3 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
            Share your story with neon energy and futuristic style.
          </p>

          {/* Neon Underline */}
          <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-[0_0_15px_#00eaff] animate-expand"></div>
        </div>

        {/* Form Card */}
        <div className="max-w-5xl mx-auto animate-fadeInUp animation-delay-400">
          <div className="
            bg-[#0c0f17] 
            border border-cyan-700 
            rounded-xl 
            p-6 md:p-10 
            shadow-[0_0_25px_#00eaff55] 
            hover:shadow-[0_0_40px_#00eaffaa] 
            transition-all duration-300
          ">
            <PostForm />
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-5xl mx-auto mt-8 animate-fadeIn animation-delay-600">
          <div className="
            bg-[#0c0f17] 
            border border-purple-700 
            rounded-xl 
            p-5 
            shadow-[0_0_25px_#b400ff55] 
            hover:shadow-[0_0_40px_#b400ffaa] 
            transition-all duration-300
          ">
            <div className="flex items-start gap-3">

              <svg
                className="w-7 h-7 text-purple-400 animate-bounce-slow"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>

              <div>
                <h3 className="text-purple-300 font-semibold mb-1">
                  Writing Tips
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Use short headings, strong visuals, and clean formatting to
                  create a powerful futuristic reading experience.
                </p>
              </div>

            </div>
          </div>
        </div>
      </Container>

      {/* Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-expand { animation: expand 1s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>

    </div>
  );
}

export default AddPost;
