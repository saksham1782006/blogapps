
import React, { useState, useEffect } from "react";
import { Container } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                const sortedPosts = posts.documents.sort(
                    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
                );
                setPosts(sortedPosts);
            }
            setLoading(false);
        });
    }, []);

    /* --------------------------------------------------------
       ⚡ CYBERPUNK LOADING SCREEN
    -------------------------------------------------------- */
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
                {/* Grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.30) 1px, transparent 0)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                </div>

                {/* Spinner */}
                <div className="relative flex flex-col items-center text-center">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 opacity-60 animate-pulse" />
                        <div className="relative h-16 w-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.7)]">
                            <div className="w-10 h-10 rounded-full animate-spin border-4 border-slate-800 border-t-cyan-400 border-r-fuchsia-500" />
                        </div>
                    </div>

                    <p className="text-cyan-300 font-mono text-xs uppercase tracking-[0.25em]">
                        Initializing Feed
                    </p>
                </div>
            </div>
        );
    }

    /* --------------------------------------------------------
       ⚡ EMPTY STATE (NO POSTS)
    -------------------------------------------------------- */
    if (posts.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-14 flex items-center justify-center relative overflow-hidden">

                {/* Grid */}
                <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
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
                    <div className="text-center relative max-w-xl mx-auto animate-fadeIn">
                        <div className="relative mb-10 flex justify-center">
                            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 opacity-40 animate-pulse" />
                            <div className="relative w-32 h-32 rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.7)]">
                                <svg
                                    className="w-20 h-20 text-slate-500 animate-bounce"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-slate-50 text-4xl font-bold mb-3">
                            No Posts Found
                        </h1>

                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Looks like the grid is quiet...{" "}
                            <span className="text-cyan-300 font-semibold">be the first</span>{" "}
                            to upload something.
                        </p>

                        <div className="flex justify-center gap-2 opacity-50">
                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-fuchsia-300 rounded-full animate-bounce animation-delay-200"></div>
                            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    /* --------------------------------------------------------
       ⚡ MAIN PAGE — ALL POSTS GRID
    -------------------------------------------------------- */
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-10 sm:py-14 relative overflow-hidden">

            {/* Cyber Grid */}
            <div className="pointer-events-none fixed inset-0 opacity-40 mix-blend-screen">
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
                {/* HERO */}
                <div className="mb-10 animate-slideInLeft relative">
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-50 tracking-tight">
                            All{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400">
                                Posts
                            </span>
                        </h1>

                        {/* Counter (glowing badge) */}
                        <span className="inline-flex items-center px-4 py-1 rounded-full text-lg font-semibold bg-slate-900 border border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.7)] animate-pulse font-mono tracking-widest">
                            {posts.length}
                        </span>
                    </div>

                    <p className="text-slate-400 text-lg mt-3">
                        Explore the latest uploads from the neon grid.
                    </p>

                    {/* Cyber underline */}
                    <div className="mt-4 h-[2px] w-40 bg-gradient-to-r from-transparent via-cyan-400 to-transparent relative">
                        <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)]" />
                    </div>
                </div>

                {/* MOBILE LIST */}
                <div className="block md:hidden space-y-4">
                    {posts.map((post) => (
                        <Link
                            key={post.$id}
                            to={`/post/${post.$id}`}
                            className="relative flex bg-slate-900/80 border border-slate-700/70 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(15,23,42,0.9)] active:scale-[0.98] transition-all"
                        >
                            {/* Image */}
                            <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden">
                                <img
                                    src={appwriteService.getFileView(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-3 flex flex-col justify-between">
                                <h3 className="text-slate-50 font-semibold text-sm line-clamp-2 mb-1">
                                    {post.title}
                                </h3>
                                <p className="text-[11px] text-slate-400 font-mono">
                                    {new Date(post.$createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>

                                <div className="flex justify-end mt-2 text-cyan-300 text-xs font-mono tracking-wide">
                                    Enter →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* DESKTOP GRID */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {posts.map((post, index) => (
                        <Link
                            key={post.$id}
                            to={`/post/${post.$id}`}
                            className="group relative animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-[0_18px_40px_rgba(15,23,42,0.95)] overflow-hidden group-hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300">

                                {/* Image */}
                                <div className="w-full aspect-video relative overflow-hidden">
                                    <img
                                        src={appwriteService.getFileView(post.featuredImage)}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[0.7deg]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h2 className="text-slate-50 text-lg font-semibold line-clamp-2 mb-3 group-hover:text-cyan-300 transition-colors">
                                        {post.title}
                                    </h2>

                                    <div className="flex justify-end text-cyan-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono uppercase tracking-[0.2em]">
                                        Enter →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>

            {/* Animation Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeInUp { animation: fadeInUp 0.7s ease both; }
                .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
                .animate-fadeIn { animation: fadeIn 0.8s ease-out; }

                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-600 { animation-delay: 0.6s; }
            `}</style>
        </div>
    );
}

export default AllPosts;
