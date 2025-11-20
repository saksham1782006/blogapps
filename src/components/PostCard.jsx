import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage, userId }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData && userId ? userData.$id === userId : false;

  // Open delete modal
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      const status = await appwriteService.deletePost($id);

      if (status) {
        await appwriteService.deleteFile(featuredImage);
        window.location.reload();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {/* MAIN CARD */}
      <Link to={`/post/${$id}`} className="block h-full">
        <div
          className="
          h-full w-full rounded-xl overflow-hidden 
          bg-[#06131a]
          border border-cyan-800 
          shadow-[0_0_15px_#00eaff33]
          hover:shadow-[0_0_25px_#00eaffaa]
          transition-all duration-300 ease-in-out 
          group hover:-translate-y-2 animate-fadeInUp
        "
        >
          {/* DELETE BUTTON — ONLY IF AUTHOR */}
          {isAuthor && (
            <button
              onClick={handleDeleteClick}
              className="
              absolute top-4 left-4 z-20
              bg-red-600 hover:bg-red-700 
              text-white p-2 rounded-full 
              shadow-[0_0_10px_#ff003377]
              opacity-0 group-hover:opacity-100 
              transform -translate-x-3 group-hover:translate-x-0
              transition-all duration-300
            "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                  4v6m4-6v6m1-10V4a1 1 0 
                  00-1-1h-4a1 1 0 00-1 
                  1v3M4 7h16"
                />
              </svg>
            </button>
          )}

          {/* THUMBNAIL */}
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="
              w-full h-full object-cover 
              group-hover:scale-110 
              transition-transform duration-700
            "
            />

            {/* Neon Overlay */}
            <div
              className="
            absolute inset-0
            bg-gradient-to-t from-[#000]/70 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-400
            "
            />

            {/* Badge */}
            <div
              className="
            absolute top-4 right-4 
            bg-[#061922]/90 border border-cyan-700
            text-cyan-300 px-3 py-1 rounded-full
            text-xs font-semibold shadow-[0_0_10px_#00eaff55]
            opacity-0 group-hover:opacity-100 
            translate-x-3 group-hover:translate-x-0
            transition-all duration-300
            "
            >
              Article
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="p-5">
            <h2
              className="
              text-lg font-bold 
              text-cyan-200 
              drop-shadow-[0_0_6px_#00eaff]
              line-clamp-2 
              group-hover:text-white
              transition-all duration-300
            "
            >
              {title}
            </h2>

            <div
              className="
            flex items-center gap-2 
            text-cyan-400 font-medium text-sm
            opacity-0 group-hover:opacity-100 
            translate-y-2 group-hover:translate-y-0
            transition-all duration-300
            
            "
            >
              <span>Read More</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* NEON BOTTOM BAR */}
          <div
            className="
          h-1 bg-gradient-to-r 
          from-cyan-400 to-purple-500 
          w-0 group-hover:w-full 
          transition-all duration-500
        "
          />
        </div>
      </Link>

      {/* DELETE CONFIRM MODAL */}
      {showDeleteModal && (
        <div
          className="
        fixed inset-0 
        bg-black/70 backdrop-blur-sm 
        flex items-center justify-center p-4 
        z-50 animate-fadeBg
        "
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="
          bg-[#0a1a22] border border-cyan-800
          shadow-[0_0_25px_#00eaff77]
          rounded-xl max-w-md w-full p-6 mx-4 
          animate-scaleIn
        "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-600/20 border border-red-700 text-red-400 rounded-full flex items-center justify-center shadow-[0_0_15px_#ff003366]">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M5.938 
                4h12.124c1.54 0 2.502 1.667 
                1.732 3L13.732 20c-.77 1.333-2.694 
                1.333-3.464 0L4.206 7c-.77-1.333.192-3 
                1.732-3z"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-bold text-cyan-300 text-center drop-shadow-[0_0_6px_#00eaff]">
              Delete Post?
            </h3>

            <p className="text-cyan-100 text-center mt-2 mb-6 opacity-80">
              Are you sure you want to delete{" "}
              <span className="text-cyan-300 font-semibold">"{title}"</span>?  
              <br />This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="
              flex-1 px-4 py-2.5 
              bg-gray-700 hover:bg-gray-600 
              text-white rounded-lg 
              transition-all duration-300
              disabled:opacity-50
            "
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="
              flex-1 px-4 py-2.5 
              bg-red-600 hover:bg-red-700 
              text-white rounded-lg flex items-center justify-center 
              shadow-[0_0_12px_#ff003366]
              transition-all duration-300 disabled:opacity-50
            "
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 
                      0 0 5.373 0 12h4zm2 
                      5.291A7.962 7.962 
                      0 014 12H0c0 3.042 
                      1.135 5.824 3 
                      7.938l3-2.647z"
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

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out; }
        .animate-fadeBg { animation: fadeBg 0.4s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
      `}</style>
    </>
  );
}

export default PostCard;

