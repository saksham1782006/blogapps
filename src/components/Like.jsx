import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import conf from "../conf/conf";
import { Query } from "appwrite";

function Like({ postId, userId }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeDocId, setLikeDocId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLikes() {
      const res = await service.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteLikesCollectionId,
        [Query.equal("postId", postId)]
      );

      setLikesCount(res.total);
      const userLike = res.documents.find((doc) => doc.userId === userId);
      setLiked(!!userLike);
      setLikeDocId(userLike ? userLike.$id : null);
    }
    fetchLikes();
  }, [postId, userId]);

  async function handleLike() {
    setLoading(true);

    // Optimistic UI update
    if (liked) {
      setLiked(false);
      setLikesCount((c) => Math.max(0, c - 1));
    } else {
      setLiked(true);
      setLikesCount((c) => c + 1);
    }

    try {
      if (liked && likeDocId) {
        await service.deleteLike(likeDocId);
        setLikeDocId(null);
      } else {
        const newLike = await service.createLike(postId, userId);
        setLikeDocId(newLike.$id);
      }
    } catch (error) {
      // rollback
      if (liked) {
        setLiked(true);
        setLikesCount((c) => c + 1);
      } else {
        setLiked(false);
        setLikesCount((c) => Math.max(0, c - 1));
      }
      console.error("Error updating like:", error);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "Unlike post" : "Like post"}
      className={`
        flex items-center gap-3 px-5 py-2 rounded-xl font-semibold
        select-none transition-all duration-300

        /* Gamer Mode Background */
        bg-[#041018] text-cyan-300 border border-cyan-700
        shadow-[0_0_12px_#00eaff55]

        /* Hover Glow */
        hover:border-cyan-400 hover:shadow-[0_0_20px_#00eaffaa]
        hover:-translate-y-0.5

        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {/* Heart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`
          h-6 w-6 transition-all duration-300 
        
          ${liked 
            ? "text-cyan-300 fill-cyan-300 scale-110 drop-shadow-[0_0_10px_#00eaff]" 
            : "text-cyan-900"
          }
        `}
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>

      {/* Count */}
      <span className="text-cyan-300 font-bold drop-shadow-[0_0_6px_#00eaff]">
        {likesCount}
      </span>

      {/* Pulse Animation when Liked */}
      {liked && (
        <span className="absolute inset-0 rounded-xl pointer-events-none animate-likePulse"></span>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes likePulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 238, 255, 0.5); }
          70% { box-shadow: 0 0 20px 10px rgba(0, 238, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 238, 255, 0); }
        }
        .animate-likePulse {
          animation: likePulse 0.6s ease-out;
        }
      `}</style>
    </button>
  );
}

export default Like;

