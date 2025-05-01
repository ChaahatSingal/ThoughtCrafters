import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BlogApp
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/blogs" className="hover:text-gray-300">
                Blogs
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/create-blog" className="hover:text-gray-300">
                    Create Post
                  </Link>
                </li>
                <li className="flex items-center">
                  <div className="relative group">
                    <button className="flex items-center space-x-1 hover:text-gray-300">
                      <div className="h-8 w-8 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                        {user?.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.username} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>{user?.username?.charAt(0).toUpperCase() || "U"}</span>
                        )}
                      </div>
                      <span>{user?.username || "User"}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                      <div className="py-1">
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;