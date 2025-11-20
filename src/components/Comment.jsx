import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import conf from "../conf/conf";

function Comment({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  async function fetchComments() {
    const res = await service.getComments(postId);
    setComments(res.documents);
  }

  useEffect(() => {
    fetchComments();
  }, [postId]);

  async function addComment(e) {
    e.preventDefault();
    if (!input.trim()) return;

    await service.createComment(postId, userId, input.trim());
    setInput("");
    fetchComments();

    setToastMessage("Comment added!");
    setTimeout(() => setToastMessage(null), 2000);
  }

  async function confirmDeleteComment() {
    if (!commentToDelete) return;

    await service.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCommentsCollectionId,
      commentToDelete
    );
    setCommentToDelete(null);
    fetchComments();

    setToastMessage("Comment deleted!");
    setTimeout(() => setToastMessage(null), 2000);
  }

  function requestDelete(id) {
    setCommentToDelete(id);
  }

  function cancelDelete() {
    setCommentToDelete(null);
  }

  function startEditing(id, content) {
    setEditingCommentId(id);
    setEditingText(content);
  }

  async function saveEdit(id) {
    if (!editingText.trim()) return;

    await service.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCommentsCollectionId,
      id,
      { content: editingText.trim() }
    );

    setEditingCommentId(null);
    setEditingText("");
    fetchComments();

    setToastMessage("Comment updated!");
    setTimeout(() => setToastMessage(null), 2000);
  }

  function cancelEdit() {
    setEditingCommentId(null);
    setEditingText("");
  }

  return (
    <>
      {/* TOAST */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-[#041018] text-cyan-300 px-5 py-2 rounded-lg border border-cyan-700 shadow-[0_0_15px_#00eaff77] animate-fadeInDown z-50">
          {toastMessage}
        </div>
      )}

      <section className="mt-6">
        {/* Add Comment */}
        <form
          onSubmit={addComment}
          className="flex gap-3 mb-4 bg-[#05070d] p-3 rounded-xl border border-cyan-800 shadow-[0_0_20px_#00eaff33]"
        >
          <input
            type="text"
            className="flex-1 bg-[#0a0f16] text-cyan-300 border border-cyan-800 px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-400 shadow-[0_0_10px_#00eaff33]"
            placeholder="Add a futuristic comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-semibold
                       hover:bg-cyan-400 hover:shadow-[0_0_15px_#00eaff] 
                       transition-all"
          >
            Post
          </button>
        </form>

        {/* Delete Confirmation */}
        {commentToDelete && (
          <div className="mb-4 p-4 bg-[#041018] border border-red-500 rounded-lg shadow-[0_0_20px_#ff003355]">
            <p className="mb-3 text-cyan-300 font-semibold">
              ⚠ Delete this comment?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDeleteComment}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 shadow-[0_0_10px_#ff2222aa]"
              >
                Yes, delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-1 bg-cyan-900 text-cyan-300 rounded hover:bg-cyan-800 border border-cyan-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.$id}
              className="p-4 rounded-xl bg-[#06090f] border border-cyan-800 
                         shadow-[0_0_15px_#00eaff22]"
            >
              {editingCommentId === c.$id ? (
                <>
                  <textarea
                    className="w-full bg-[#0b1018] text-cyan-300 border border-cyan-700 p-2 rounded"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => saveEdit(c.$id)}
                      className="px-4 py-1 bg-cyan-500 text-black rounded hover:bg-cyan-400 shadow-[0_0_10px_#00eaff]"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-1 bg-cyan-900 text-cyan-300 rounded border border-cyan-600 hover:bg-cyan-800"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-cyan-200">{c.content}</p>

                  {c.userId === userId && !commentToDelete && (
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => startEditing(c.$id, c.content)}
                        className="text-sm text-cyan-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => requestDelete(c.$id)}
                        className="text-sm text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown .3s ease-out; }
      `}</style>
    </>
  );
}

export default Comment;

