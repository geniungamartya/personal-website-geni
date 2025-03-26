import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BlogService } from "../client";
import { slugify } from "../modules/blog-post-preprocess";
import MDEditor from "@uiw/react-md-editor";
import * as Toast from "@radix-ui/react-toast"; // Import Radix Toast

export const Route = createFileRoute("/blog/dashboard")({
  component: BlogDashboard,
});

export default function BlogDashboard() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editorVisible, setEditorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Toast state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Function to show toast
  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  // Fetch posts
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => BlogService.getAllBlogPostsBlogGet(),
  });

  // Delete post mutation
  const { mutate: deletePost } = useMutation({
    mutationFn: (blogId: string) =>
      BlogService.deleteBlogPostBlogBlogIdDelete({ blogId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast("Post deleted successfully!");
    },
    onError: () => showToast("Failed to delete post.", "error"),
  });

  // Reset editor state
  const resetEditor = () => {
    setNewTitle("");
    setNewContent("");
    setEditorVisible(false);
    setEditingPostId(null);
    setErrorMessage("");
  };

  // Add new post mutation
  const { mutate: addPost } = useMutation({
    mutationFn: () =>
      BlogService.createBlogPostBlogPost({
        requestBody: {
          title: newTitle,
          content: newContent,
          slug: slugify(newTitle),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetEditor();
      showToast("Post published successfully!");
    },
    onError: () => showToast("Failed to publish post.", "error"),
  });

  // Update existing post mutation
  const { mutate: updatePost } = useMutation({
    mutationFn: () =>
      BlogService.updateBlogPostBlogBlogIdPut({
        blogId: editingPostId!,
        requestBody: {
          title: newTitle,
          content: newContent,
          slug: slugify(newTitle),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetEditor();
      showToast("Post updated successfully!");
    },
    onError: () => showToast("Failed to update post.", "error"),
  });

  // Handle Publish or Update Click
  const handleSave = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setErrorMessage("Title and content cannot be empty.");
      return;
    }
    setErrorMessage("");
    if (editingPostId) {
      updatePost();
    } else {
      addPost();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
        Blog Dashboard
      </h1>

      <button
        onClick={() => {
          resetEditor();
          setEditorVisible(true);
        }}
        className="w-full px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add New Post
      </button>

      <AnimatePresence>
        {editorVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden p-4 border rounded-md shadow-md bg-white dark:bg-gray-800"
          >
            <input
              type="text"
              placeholder="Enter title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 mb-2 text-sm border rounded-md"
            />
            <MDEditor
              value={newContent}
              onChange={(val) => setNewContent(val ?? "")}
              className="min-h-[300px]"
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}

            <div className="flex justify-between space-x-1 mt-3">
              <button
                onClick={handleSave}
                className={`w-full px-4 py-2 text-sm font-medium rounded-md transition ${
                  !newTitle.trim() || !newContent.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {editingPostId ? "Update" : "Publish"}
              </button>
              <button
                onClick={resetEditor}
                className="w-full px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <p className="text-gray-600 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-500">Error fetching posts.</p>
      ) : (
        <ul className="space-y-4">
          {posts?.map((post) => (
            <motion.li
              key={post.id}
              className="p-3 border rounded-md shadow-sm flex justify-between items-center bg-white dark:bg-gray-800"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {post.content.substring(0, 50)}...
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingPostId(post.id);
                    setNewTitle(post.title);
                    setNewContent(post.content);
                    setEditorVisible(true);
                  }}
                  className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Radix UI Toast */}
      <Toast.Provider>
        <Toast.Root
          className={`fixed bottom-5 right-5 p-3 rounded-md shadow-md ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          open={toastOpen}
          onOpenChange={setToastOpen}
        >
          <Toast.Title>{toastMessage}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </div>
  );
}
