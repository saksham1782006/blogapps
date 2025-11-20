import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    /* ------------------------------------------------------------
       🟣 CYBERPUNK LOADING SCREEN
    ------------------------------------------------------------ */
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
                {/* Neon grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.27) 1px, transparent 0)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                </div>

                <div className="relative text-center">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 opacity-60 animate-pulse" />
                        <div className="relative h-16 w-16 rounded-2xl bg-slate-900 border border-slate-700 shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full animate-spin border-4 border-slate-800 border-t-green-400 border-r-cyan-400" />
                        </div>
                    </div>
                    <p className="text-cyan-300 text-xs font-mono uppercase tracking-[0.3em]">
                        Loading Post
                    </p>
                </div>
            </div>
        );
    }

    /* ------------------------------------------------------------
       🟣 MAIN EDIT PAGE — CYBERPUNK UI
    ------------------------------------------------------------ */
    return post ? (
        <div className="relative py-10 sm:py-14 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">

            {/* Neon cyber grid background */}
            <div className="pointer-events-none fixed inset-0 opacity-40 mix-blend-screen">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.27) 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                    }}
                />
            </div>

            <Container>
                {/* HEADER */}
                <div className="mb-10 text-center animate-fadeInDown relative">

                    {/* Neon Icon */}
                    <div className="relative flex justify-center mb-6">
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-green-400 via-cyan-500 to-emerald-500 opacity-60 animate-pulse" />
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900 border border-slate-700/70 shadow-[0_0_30px_rgba(74,222,128,0.7)] flex items-center justify-center">
                            <svg
                                className="w-10 h-10 sm:w-12 sm:h-12 text-green-300 drop-shadow-[0_0_15px_rgba(74,222,128,0.9)] transform transition-transform duration-300 group-hover:rotate-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-50 tracking-tight animate-fadeIn">
                        Edit{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-cyan-400 to-emerald-300 drop-shadow-[0_0_40px_rgba(74,222,128,0.8)]">
                            Post
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-2 leading-relaxed animate-fadeIn animation-delay-200">
                        Update your content, refine your visuals, or enhance your writing.
                    </p>

                    {/* Cyber underline */}
                    <div className="mt-5 flex justify-center">
                        <div className="h-[2px] w-40 sm:w-64 bg-gradient-to-r from-transparent via-green-400 to-transparent relative">
                            <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,1)]" />
                        </div>
                    </div>
                </div>

                {/* EDIT FORM */}
                <div className="relative max-w-6xl mx-auto animate-fadeInUp animation-delay-400">

                    {/* Neon glow background */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 via-cyan-500/10 to-emerald-400/10 blur-xl" />

                    <div className="relative bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-[0_18px_40px_rgba(15,23,42,0.95)] p-6 sm:p-8 md:p-10 backdrop-blur hover:shadow-[0_0_40px_rgba(74,222,128,0.45)] transition-shadow duration-300">
                        <PostForm post={post} />
                    </div>
                </div>
            </Container>

            {/* ANIMATIONS */}
            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInDown { animation: fadeInDown 0.7s ease-out; }
                .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
                .animate-fadeInUp { animation: fadeInUp 0.7s ease-out; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
            `}</style>
        </div>
    ) : null;
}

export default EditPost;
