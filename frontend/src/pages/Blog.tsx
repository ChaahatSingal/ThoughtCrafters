<<<<<<< HEAD
// src/pages/BlogPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface BlogPost {
  title: string;
  date: string;
  content: string[];
  author: Author;
}

const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black text-white p-6">Loading blog post...</div>;
  if (error) return <div className="min-h-screen bg-black text-white p-6">Error: {error}</div>;
  if (!blog) return <div className="min-h-screen bg-black text-white p-6">Blog post not found</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Blogs page</h1>

      <div className="bg-white text-black rounded-md p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-3xl font-bold">{blog.title}</h2>
              <p className="text-sm text-gray-500">Posted on {blog.date}</p>

              <div className="space-y-4 text-gray-700">
                {blog.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-500">Author</h3>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{blog.author.name}</h4>
                    <p className="text-sm text-gray-600">{blog.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
=======

export const Blog = () => {
    return (
        <div>
        <h1>Blog</h1>
        </div>
    )
}
>>>>>>> 315af2e5e90167a6397f20e1630c7e247c3a1ade
