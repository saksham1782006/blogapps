import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Like from "../components/Like";
import Comment from "../components/Comment";

export default function Post() {
    const [post, setPost] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchUserId = async () => {
            if (userData && userData.$id) {
                setCurrentUserId(userData.$id);
            } else {
                const user = await authService.getCurrentUser();
                if (user && user.$id) {
                    setCurrentUserId(user.$id);
                }
            }
        };
        fetchUserId();
    }, [userData]);

    const isAuthor = post && currentUserId ? post.userId === currentUserId : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((p) => {
                if (p) setPost(p);
                else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const handleDeleteClick = () => setShowDeleteModal(true);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleCancelDelete = () => setShowDeleteModal(false);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
                {/* Grid / noise background */}
                <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.4) 1px, transparent 0)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                </div>

                <div className="relative text-center">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 opacity-60 animate-pulse" />
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-slate-700/80 bg-slate-900 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.6)]">
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-fuchsia-500 animate-spin" />
                        </div>
                    </div>
                    <p className="text-cyan-300 text-xs font-mono uppercase tracking-[0.3em] mb-3">
                        Synchronizing
                    </p>
                    <p className="text-slate-50 text-xl sm:text-2xl font-semibold tracking-tight">
                        Loading post...
                    </p>
                    <p className="text-slate-400 text-sm mt-2 font-mono uppercase tracking-[0.2em]">
                        Please stand by, operator
                    </p>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="py-6 sm:py-8 md:py-12 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
            {/* Cyber grid background */}
            <div className="pointer-events-none fixed inset-0 opacity-40 mix-blend-screen">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.35) 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                    }}
                />
            </div>

            <Container>
                {/* Back Button */}
                <div className="relative mb-6 md:mb-8 animate-fadeIn">
                    <Link
                        to="/"
                        className="group inline-flex items-center text-slate-300 hover:text-cyan-300 transition-all duration-200 text-sm md:text-base"
                    >
                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-slate-700/80 bg-slate-900/80 mr-2 group-hover:border-cyan-400 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.8)]">
                            <svg
                                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </span>
                        <span className="font-mono uppercase tracking-[0.25em] text-[11px]">
                            Back to Feed
                        </span>
                    </Link>
                </div>

                {/* Main Post Card */}
                <article className="relative max-w-6xl mx-auto bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-800/90 shadow-[0_20px_45px_rgba(15,23,42,0.95)] overflow-hidden animate-fadeInUp backdrop-blur">
                    {/* Glow border */}
                    <div className="pointer-events-none absolute inset-0 opacity-70">
                        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-400/10 blur-xl" />
                    </div>

                    <div className="relative flex flex-col md:flex-row md:max-h-[640px]">
                        {/* Image Container */}
                        <div className="md:w-[38%] flex-shrink-0 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-emerald-400/10" />
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="relative w-full h-56 sm:h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[0.7deg]"
                                onError={(e) => {
                                    e.target.src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%230b1120" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 border border-cyan-400/70 backdrop-blur">
                                <span className="text-[10px] font-mono text-cyan-300 tracking-[0.25em] uppercase">
                                    Featured
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-mono text-slate-200">
                                <span className="inline-flex items-center gap-1 px-2 py-[2px] rounded-md bg-black/60 border border-fuchsia-500/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
                                    Live
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-[62%] p-5 sm:p-6 md:p-8 flex flex-col overflow-hidden">
                            {/* Header Tag */}
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-300">
                                        Story Entry
                                    </span>
                                </div>
                                {post.category && (
                                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700/80">
                                        {post.category}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 mb-3 sm:mb-4 leading-tight break-words animate-fadeIn animation-delay-200">
                                {post.title}
                            </h1>

                            {/* Metadata & Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-slate-800 gap-3 animate-fadeIn animation-delay-400">
                                {/* Date */}
                                <div className="inline-flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/80">
                                    <svg
                                        className="w-4 h-4 flex-shrink-0 text-cyan-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.8}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-[11px] font-mono text-slate-300 uppercase tracking-[0.18em]">
                                        {new Date(post.$createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                {/* Author Controls */}
                                {isAuthor && (
                                    <div className="flex flex-wrap gap-2 animate-fadeIn animation-delay-600">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold border border-emerald-300/60 shadow-[0_0_18px_rgba(45,212,191,0.7)] text-xs sm:text-sm px-4 py-2 rounded-lg">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            className="bg-gradient-to-r from-red-600 to-fuchsia-600 hover:from-red-500 hover:to-fuchsia-500 text-white font-semibold border border-red-400/70 shadow-[0_0_18px_rgba(248,113,113,0.8)] text-xs sm:text-sm px-4 py-2 rounded-lg"
                                            onClick={handleDeleteClick}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? "Deleting..." : "Delete"}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Post Content */}
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar animate-fadeIn animation-delay-800">
                                <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                                    <div className="text-slate-200 leading-relaxed break-words text-sm sm:text-base prose-headings:text-slate-50 prose-p:text-slate-200 prose-strong:text-slate-50 prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal">
                                        {parse(post.content)}
                                    </div>
                                </div>
                            </div>

                            {/* Like */}
                            <div className="mt-6 border-t border-slate-800 pt-3 flex justify-end">
                                <Like postId={post.$id} userId={currentUserId} />
                            </div>
                        </div>
                    </div>
                </article>

                {/* Comments */}
                <div className="relative max-w-6xl mx-auto mt-8 p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.95)] animate-fadeInUp">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-fuchsia-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,1)]" />
                            <h2 className="text-slate-50 text-lg font-semibold tracking-tight">
                                Comments
                            </h2>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.22em]">
                            Social Feed
                        </span>
                    </div>

                    <div className="mt-4">
                        <Comment postId={post.$id} userId={currentUserId} />
                    </div>
                </div>
            </Container>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={handleCancelDelete}
                >
                    <div
                        className="relative bg-slate-900/95 border border-red-500/50 rounded-2xl shadow-[0_0_40px_rgba(248,113,113,0.7)] max-w-md w-full p-6 animate-bounceIn backdrop-blur"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glow */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 via-fuchsia-500/15 to-cyan-500/10 blur-xl" />

                        {/* Warning Icon */}
                        <div className="relative flex items-center justify-center w-16 h-16 mx-auto bg-red-950/70 border border-red-500/70 rounded-2xl mb-4 shadow-[0_0_25px_rgba(248,113,113,0.9)]">
                            <svg
                                className="w-8 h-8 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 className="relative text-xl font-bold text-slate-50 text-center mb-2">
                            Delete Post?
                        </h3>

                        {/* Message */}
                        <p className="relative text-slate-300 text-center mb-6 text-sm">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-red-300">
                                "{post.title}"
                            </span>
                            ? This action cannot be undone.
                        </p>

                        {/* Buttons */}
                        <div className="relative flex gap-3">
                            <button
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 border border-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-fuchsia-600 hover:from-red-500 hover:to-fuchsia-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center border border-red-400/70 shadow-[0_0_20px_rgba(248,113,113,0.8)]"
                            >
                                {isDeleting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations & Custom Scrollbar */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }

                .animate-bounceIn {
                    animation: bounceIn 0.4s ease-out;
                }

                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animation-delay-800 { animation-delay: 0.8s; }

                /* Dark Custom Scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #020617;
                    border-radius: 9999px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #22d3ee, #e879f9);
                    border-radius: 9999px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #06b6d4, #db2777);
                }
            `}</style>
        </div>
    ) : null;
}

