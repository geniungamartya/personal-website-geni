import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BlogService } from "../client";
import { slugify } from "../modules/blog-post-preprocess";
import MDEditor from "@uiw/react-md-editor";
import * as Toast from "@radix-ui/react-toast";
import { Plus, Trash, Edit2 } from "lucide-react"; // Lucide Icons

export const Route = createFileRoute("/admin/blog")({
  component: BlogDashboard,
});

export default function BlogDashboard() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editorVisible, setEditorVisible] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => BlogService.getAllBlogPostsBlogGet(),
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: (blogId: string) =>
      BlogService.deleteBlogPostBlogBlogIdDelete({ blogId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast("Post deleted successfully!");
    },
    onError: () => showToast("Failed to delete post.", "error"),
  });

  const resetEditor = () => {
    setNewTitle("");
    setNewContent("");
    setNewDate("");
    setEditorVisible(false);
    setEditingPostId(null);
  };

  const { mutate: savePost } = useMutation({
    mutationFn: () =>
      editingPostId
        ? BlogService.updateBlogPostBlogBlogIdPut({
            blogId: editingPostId,
            requestBody: {
              title: newTitle,
              content: newContent,
              slug: slugify(newTitle),
              date: newDate,
            },
          })
        : BlogService.createBlogPostBlogPost({
            requestBody: {
              title: newTitle,
              content: newContent,
              slug: slugify(newTitle),
              date: newDate,
            },
          }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      resetEditor();
      showToast(
        editingPostId
          ? "Post updated successfully!"
          : "Post published successfully!",
      );
    },
    onError: () => showToast("Failed to save post.", "error"),
  });

  return (
    <div className="w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
        Blog Dashboard
      </h1>

      {/* Add New Post Button */}
      <button
        onClick={() => {
          resetEditor();
          setEditorVisible(true);
        }}
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all"
      >
        <Plus size={16} className="mr-2" />
        Add New Post
      </button>

      {/* Editor Modal */}
      <AnimatePresence>
        {editorVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900"
          >
            <input
              type="text"
              placeholder="Enter title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 text-lg font-medium border-b border-gray-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Enter date..."
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2 text-lg font-medium border-b border-gray-300 focus:outline-none"
            />
            <MDEditor
              value={newContent}
              onChange={(val) => setNewContent(val ?? "")}
              className="mt-4"
            />
            <div className="flex justify-between space-x-2 mt-4">
              <button
                onClick={() => savePost()}
                className="w-full px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-all"
                disabled={!newTitle.trim() || !newContent.trim()}
              >
                {editingPostId ? "Update" : "Publish"}
              </button>
              <button
                onClick={resetEditor}
                className="w-full px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      {isLoading ? (
        <p className="text-gray-600 text-sm text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm text-center">
          Error fetching posts.
        </p>
      ) : (
        <ul className="space-y-4">
          {posts?.map((post) => (
            <motion.li
              key={post.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white dark:bg-gray-900"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <div>
                <h2 className="font-medium text-gray-900 dark:text-white">
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
                    setNewDate(post.date);
                    setEditorVisible(true);
                  }}
                  className="p-2 rounded-md text-yellow-500 hover:text-yellow-600 transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 rounded-md text-red-500 hover:text-red-600 transition-all"
                >
                  <Trash size={16} />
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
          duration={2000}
        >
          <Toast.Title>{toastMessage}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </div>
  );
}
