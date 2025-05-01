import React from "react";
import { Link } from "react-router-dom";

interface Author {
  name: string;
  avatar: string;
}

interface BlogCardProps {
  id: number;
  author: Author;
  date: string;
  memberOnly: boolean;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  thumbnail?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  author,
  date,
  memberOnly,
  title,
  excerpt,
  category,
  readTime,
  thumbnail
}) => {
  return (
    <div className="border-b pb-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium">{author.name}</span>
        <span className="text-gray-500">·</span>
        <span className="text-gray-500">{date}</span>
        {memberOnly && (
          <>
            <span className="text-gray-500">·</span>
            <span className="text-amber-600 flex items-center gap-1">
              <span className="text-xs">✦</span> Member-only
            </span>
          </>
        )}
      </div>

      <Link to={`/blogs/${id}`}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-2 hover:underline">{title}</h2>
            <p className="text-gray-700 mb-4">{excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">{category}</span>
              <span>{readTime}</span>
            </div>
          </div>
          
          {thumbnail && (
            <div className="w-full h-32 md:h-auto">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;