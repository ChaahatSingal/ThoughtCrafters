import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;