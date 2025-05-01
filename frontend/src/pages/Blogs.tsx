// src/pages/BlogsPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  author: Author;
  date: string;
  memberOnly: boolean;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  thumbnail: string;
}

const BlogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs?tab=${activeTab}`);
        setBlogPosts(response.data.posts);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Blogs page</h1>

      <div className="bg-white text-black rounded-lg overflow-hidden">
        <div className="border-b p-4">
          <div className="flex items-center gap-6">
            <Link to="/create-blog">
              <button className="p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </Link>
            <div className="flex border-b border-transparent">
              <button
                className={`px-4 py-2 ${activeTab === "for-you" ? "border-b-2 border-black" : ""}`}
                onClick={() => setActiveTab("for-you")}
              >
                For you
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "following" ? "border-b-2 border-black" : ""}`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="border-b pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{post.author.name}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500">{post.date}</span>
                    {post.memberOnly && (
                      <>
                        <span className="text-gray-500">·</span>
                        <span className="text-amber-600 flex items-center gap-1">
                          <span className="text-xs">✦</span> Member-only
                        </span>
                      </>
                    )}
                  </div
