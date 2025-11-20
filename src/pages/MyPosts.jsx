import React, { useEffect, useState } from 'react';

import { Container } from '../components';

import appwriteService from "../appwrite/config";

import authService from "../appwrite/auth";

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';



function MyPosts() {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentUser, setCurrentUser] = useState(null);

    const userData = useSelector((state) => state.auth.userData);



    useEffect(() => {

        const fetchUser = async () => {

            if (userData && userData.$id) {

                setCurrentUser(userData);

            } else {

                const user = await authService.getCurrentUser();

                if (user) {

                    setCurrentUser(user);

                }

            }

        };

        fetchUser();

    }, [userData]);



    useEffect(() => {

        if (currentUser && currentUser.$id) {

            appwriteService.getUserPosts(currentUser.$id)

                .then((response) => {

                    if (response && response.documents) {

                        setPosts(response.documents);

                    } else {

                        setPosts([]);

                    }

                    setLoading(false);

                })

                .catch(error => {

                    console.error("Error fetching posts:", error);

                    setLoading(false);

                });

        } else {

            setLoading(false);

        }

    }, [currentUser]);



    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

                <div className="text-center">

                    <div className="relative inline-block mb-4">

                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-lime-400 opacity-50 animate-pulse"></div>

                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-fuchsia-500"></div>

                    </div>

                    <h1 className="text-lg sm:text-2xl font-semibold text-slate-50 tracking-wide">

                        Loading your arena...

                    </h1>

                    <p className="text-sm text-slate-400 mt-2 uppercase tracking-[0.15em]">

                        Initializing player data

                    </p>

                </div>

            </div>

        );

    }



    return (

        <div className="w-full py-8 sm:py-12 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

            <div className="pointer-events-none fixed inset-0 opacity-40 mix-blend-screen">

                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)" , backgroundSize: "24px 24px" }} />

            </div>



            <Container>

                {/* HEADER */}

                <div className="relative mb-8 sm:mb-12 text-center">

                    {/* Neon ring avatar */}

                    <div className="flex justify-center mb-4">

                        <div className="relative">

                            <div className="absolute inset-0 blur-xl bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-emerald-400 opacity-70 animate-pulse"></div>

                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900 border border-slate-700/70 shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center">

                                <svg

                                    className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]"

                                    fill="none"

                                    viewBox="0 0 24 24"

                                    stroke="currentColor"

                                >

                                    <path

                                        strokeLinecap="round"

                                        strokeLinejoin="round"

                                        strokeWidth={1.8}

                                        d="M5 15l7-12 7 12M6 14h12l-6 8-6-8z"

                                    />

                                </svg>

                            </div>

                        </div>

                    </div>



                    {/* Title and stats */}

                    <div className="relative inline-block px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/70 shadow-[0_0_30px_rgba(15,23,42,0.9)] mb-3">

                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-slate-400">

                            Player Dashboard

                        </span>

                    </div>



                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-50 mb-3 tracking-tight">

                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]">Posts</span>

                    </h1>



                    <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">

                        {posts.length > 0

                            ? `Loadout: ${posts.length} ${posts.length === 1 ? 'post equipped' : 'posts equipped'}`

                            : 'No loadout equipped. Create your first post to enter the arena.'}

                    </p>



                    <div className="mt-4 flex justify-center">

                        <div className="h-[2px] w-40 sm:w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 relative">

                            <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]" />

                        </div>

                    </div>

                </div>



                {posts.length > 0 ? (

                    <>

                        {/* MOBILE: Vertical gamer list */}

                        <div className="relative md:hidden space-y-4">

                            {posts.map((post) => (

                                <Link

                                    key={post.$id}

                                    to={`/post/${post.$id}`}

                                    className="group relative block bg-slate-900/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(15,23,42,0.9)] active:scale-[0.98] transition-transform duration-150"

                                >

                                    {/* Neon border glow */}

                                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/10 via-fuchsia-500/10 to-emerald-400/10 blur" />

                                    </div>



                                    <div className="flex">

                                        {/* Image */}

                                        <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">

                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-black" />

                                            <img

                                                src={appwriteService.getFileView(post.featuredImage)}

                                                alt={post.title}

                                                className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"

                                            />

                                            <div className="absolute top-1 left-1 px-2 py-[2px] rounded-full bg-black/70 border border-cyan-500/60">

                                                <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-[0.18em]">

                                                    New

                                                </span>

                                            </div>

                                        </div>



                                        {/* Content */}

                                        <div className="flex-1 p-3 flex flex-col justify-between">

                                            <div>

                                                <h3 className="font-semibold text-slate-50 text-sm line-clamp-2 mb-1 leading-tight group-hover:text-cyan-300 transition-colors">

                                                    {post.title}

                                                </h3>

                                                <p className="text-[11px] text-slate-400 font-mono flex items-center gap-2">

                                                    <span className="inline-flex items-center gap-1">

                                                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>

                                                        {new Date(post.$createdAt).toLocaleDateString('en-US', {

                                                            month: 'short',

                                                            day: 'numeric',

                                                            year: 'numeric'

                                                        })}

                                                    </span>

                                                </p>

                                            </div>



                                            <div className="flex items-center justify-between mt-2">

                                                <div className="px-2 py-[2px] rounded-md bg-slate-800/80 border border-slate-600/80">

                                                    <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.18em]">

                                                        Story Card

                                                    </span>

                                                </div>

                                                <div className="flex items-center gap-1 text-cyan-300">

                                                    <span className="text-[11px] font-semibold font-mono tracking-[0.15em] uppercase">

                                                        Enter

                                                    </span>

                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />

                                                    </svg>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>



                        {/* DESKTOP: Gamer grid */}

                        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {posts.map((post, index) => (

                                <Link

                                    key={post.$id}

                                    to={`/post/${post.$id}`}

                                    style={{ animationDelay: `${index * 0.06}s` }}

                                    className="group relative"

                                >

                                    {/* Outer glow */}

                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-400/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />



                                    <div className="relative h-full w-full bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-700/80 shadow-[0_18px_40px_rgba(15,23,42,0.95)] group-hover:border-cyan-400/70 transition-all duration-300 group-hover:-translate-y-2">

                                        {/* Header bar */}

                                        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-800/80">

                                            <div className="flex items-center gap-2">

                                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />

                                                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">

                                                    Active Post

                                                </span>

                                            </div>

                                            <span className="text-[10px] font-mono text-slate-500">

                                                {new Date(post.$createdAt).toLocaleDateString('en-US', {

                                                    month: 'short',

                                                    day: 'numeric',

                                                    year: 'numeric'

                                                })}

                                            </span>

                                        </div>



                                        {/* Image */}

                                        <div className="w-full aspect-video overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black relative">

                                            <img

                                                src={appwriteService.getFileView(post.featuredImage)}

                                                alt={post.title}

                                                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-[0.6deg] transition-transform duration-700 ease-out"

                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

                                            <div className="absolute bottom-3 left-3 flex items-center gap-2">

                                                <div className="px-2 py-[2px] rounded-md bg-black/60 border border-cyan-500/70 backdrop-blur">

                                                    <span className="text-[10px] font-mono text-cyan-300 tracking-[0.18em] uppercase">

                                                        Story

                                                    </span>

                                                </div>

                                            </div>

                                        </div>



                                        {/* Content */}

                                        <div className="p-5 flex flex-col h-[160px]">

                                            <h2 className="text-base md:text-lg font-semibold text-slate-50 line-clamp-2 mb-3 group-hover:text-cyan-300 transition-colors">

                                                {post.title}

                                            </h2>



                                            <div className="mt-auto flex items-center justify-between">

                                                <div className="flex flex-col gap-1">

                                                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">

                                                        <span className="inline-flex items-center gap-1">

                                                            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(236,72,153,0.9)]" />

                                                            LVL {String(index + 1).padStart(2, '0')}

                                                        </span>

                                                        <span className="h-[1px] w-6 bg-slate-700" />

                                                        <span>XP {posts.length * 120}</span>

                                                    </div>

                                                </div>



                                                <div className="flex items-center gap-2 text-cyan-300 font-medium text-xs opacity-80 group-hover:opacity-100 transition-all">

                                                    <span className="hidden sm:inline font-mono tracking-[0.22em] uppercase text-[11px]">

                                                        Read More

                                                    </span>

                                                    <svg

                                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"

                                                        fill="none"

                                                        viewBox="0 0 24 24"

                                                        stroke="currentColor"

                                                    >

                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />

                                                    </svg>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    </>

                ) : (

                    <div className="relative text-center py-16 sm:py-20">

                        <div className="flex justify-center mb-8">

                            <div className="relative w-32 h-32 sm:w-40 sm:h-40">

                                <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-slate-700 via-cyan-500/40 to-fuchsia-500/40 opacity-70" />

                                <div className="relative w-full h-full rounded-[2rem] bg-slate-900 border border-dashed border-slate-600/80 flex items-center justify-center">

                                    <svg

                                        className="w-16 h-16 text-slate-500"

                                        fill="none"

                                        viewBox="0 0 24 24"

                                        stroke="currentColor"

                                    >

                                        <path

                                            strokeLinecap="round"

                                            strokeLinejoin="round"

                                            strokeWidth={1.5}

                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"

                                        />

                                    </svg>

                                </div>

                            </div>

                        </div>



                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-3">

                            No Posts in Your Loadout

                        </h2>

                        <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm sm:text-base">

                            You haven’t crafted any content yet. Deploy your first post and start building your legend in the feed.

                        </p>



                        <Link to="/add-post">

                            <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400 text-white font-semibold rounded-full shadow-[0_0_30px_rgba(56,189,248,0.9)] hover:shadow-[0_0_45px_rgba(236,72,153,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-slate-700/80">

                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />

                                </svg>

                                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em]">

                                    Create First Post

                                </span>

                            </button>

                        </Link>

                    </div>

                )}

            </Container>

        </div>
    );
}
export default MyPosts;
