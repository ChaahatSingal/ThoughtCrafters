import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: ""
  });
  const [isMemberOnly, setIsMemberOnly] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Auto-save draft with debounce
  useEffect(() => {
    if (!formData.title && !formData.content) return;
    
    setIsSaved(false);
    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [formData]);

  const saveDraft = async () => {
    if (!formData.title && !formData.content) return;
    
    setIsSaving(true);
    try {
      await axios.post("/api/drafts", 
        { ...formData, memberOnly: isMemberOnly }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save draft:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.content) {
      setError("Please add a title and content before publishing");
      return;
    }
    
    setIsPublishing(true);
    setError(null);
    
    try {
      const blogData = {
        ...formData,
        memberOnly: isMemberOnly,
        content: formData.content.split("\n\n") // Split content into paragraphs
      };
      
      const response = await axios.post("/api/blogs", blogData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      navigate(`/blogs/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to publish blog post");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-sm font-medium">Draft in Krags</span>
              <span className="text-sm text-gray-500">
                {isSaving ? "Saving..." : isSaved ? "Saved" : "Unsaved changes"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full px-4 py-1 text-sm"
                onClick={() => navigate("/blogs")}
              >
                Cancel
              </button>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-1 text-sm"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </button>
              <button className="text-gray-500 h-8 w-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{user?.initials || 'U'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 text-sm">
              {error}
            </div>
          )}
          
          <div className="p-6">
            <textarea
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full resize-none border-none text-3xl font-medium placeholder:text-gray-400 focus:outline-none p-0 mb-6"
              rows={1}
            />

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt/Summary
                </label>
                <input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="A short summary of your blog post"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Tell your story..."
                className="w-full resize-none border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 p-3 min-h-[300px]"
                rows={12}
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate paragraphs with a blank line (double enter)
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="memberOnly"
                type="checkbox"
                checked={isMemberOnly}
                onChange={() => setIsMemberOnly(!isMemberOnly)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="memberOnly" className="ml-2 block text-sm text-gray-700">
                Member-only content
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;