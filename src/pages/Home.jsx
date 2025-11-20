import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                const sortedPosts = posts.documents
                    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                    .slice(0, 2);
                setPosts(sortedPosts);
            }
            setLoading(false);
        });
    }, []);

    /* --------------------------------------------------------
       ⚡ LOADING (Cyberpunk Version)
    -------------------------------------------------------- */
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">

                {/* Neon Grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.30) 1px, transparent 0)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                </div>

                <div className="relative text-center">
                    {/* Neon Glow Icon */}
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 opacity-60 animate-pulse" />
                        <div className="relative h-16 w-16 rounded-2xl bg-slate-900 border border-slate-700 shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full animate-spin border-4 border-slate-800 border-t-cyan-400 border-r-fuchsia-500" />
                        </div>
                    </div>

                    <p className="text-cyan-300 font-mono text-xs uppercase tracking-[0.3em]">
                        Loading Feed
                    </p>
                </div>
            </div>
        );
    }

    /* --------------------------------------------------------
       ⚡ NO POSTS (Cyberpunk Version)
    -------------------------------------------------------- */
    if (posts.length === 0) {
        return (
            <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-slate-950 via-slate-900 to-black py-20 flex items-center justify-center relative overflow-hidden">

                {/* Neon Grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.30) 1px, transparent 0)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                </div>

                <Container>
                    <div className="relative text-center max-w-xl mx-auto animate-fadeInUp">
                        {/* Neon Icon */}
                        <div className="relative mb-10">
                            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 opacity-40 animate-pulse"></div>
                            <div className="relative w-32 h-32 mx-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_40px_rgba(56,189,248,0.8)] flex items-center justify-center">
                                <svg
                                    className="w-20 h-20 text-slate-400 animate-bounce"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Text */}
                        <h1 className="text-slate-50 text-4xl font-bold mb-3">No Posts Yet</h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Be the first operator to activate the feed.<br />
                            <span className="text-cyan-300 font-semibold">Login</span> to deploy your first post.
                        </p>

                        {/* CTA */}
                        <Link to="/login">
                            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 rounded-xl text-slate-900 font-bold shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:shadow-[0_0_40px_rgba(236,72,153,0.9)] hover:scale-105 transition-all duration-300">
                                Get Started →
                            </button>
                        </Link>

                        {/* Dots */}
                        <div className="mt-10 flex justify-center gap-2 opacity-50">
                            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-fuchsia-300 rounded-full animate-bounce animation-delay-200"></span>
                            <span className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce animation-delay-400"></span>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    /* --------------------------------------------------------
       ⚡ HOME PAGE — LATEST POSTS (Cyberpunk Edition)
    -------------------------------------------------------- */
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black py-14 relative overflow-hidden">

            {/* Background Grid */}
            <div className="pointer-events-none fixed inset-0 opacity-40">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.30) 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                    }}
                />
            </div>

            <Container>
                {/* HERO (desktop) */}
                <div className="hidden sm:block mb-14 animate-fadeIn">
                    <div className="flex items-center gap-4 mb-3">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-50 tracking-tight">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400">Posts</span>
                        </h1>
                        <span className="px-4 py-1 rounded-full text-sm font-semibold bg-slate-900 border border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.6)] animate-pulse font-mono tracking-widest">
                            Top 2
                        </span>
                    </div>
                    <p className="text-slate-400 text-lg">Hand-picked from the neon grid.</p>

                    {/* underline */}
                    <div className="mt-4 h-[2px] w-40 bg-gradient-to-r from-transparent via-cyan-400 to-transparent relative">
                        <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
                    </div>
                </div>

                {/* MOBILE title */}
                <div className="sm:hidden mb-8 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-slate-50">Latest Posts</h1>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-cyan-300 border border-cyan-400/60 animate-pulse">
                            Top 2
                        </span>
                    </div>
                </div>

                {/* POSTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {posts.map((post, index) => (
                        <div
                            key={post.$id}
                            className="animate-fadeInUp transform transition-all duration-300 hover:scale-105"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* VIEW ALL BUTTON */}
                <div className="mt-16 text-center animate-fadeIn animation-delay-600">
                    <Link to="/all-posts">
                        <button className="group relative px-10 py-4 rounded-xl bg-slate-900 text-slate-50 border border-cyan-400/60 font-semibold shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] hover:scale-105 transition-all duration-300">
                            <span className="flex items-center gap-3 font-mono tracking-[0.2em] uppercase">
                                View All Posts
                                <svg
                                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>
                    </Link>
                </div>
            </Container>

            {/* ANIMATIONS */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
                .animate-fadeInUp { animation: fadeInUp 0.7s ease-out both; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-600 { animation-delay: 0.6s; }
            `}</style>
        </div>
    );
}

export default Home;
