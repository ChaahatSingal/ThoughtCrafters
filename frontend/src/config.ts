// Environment-specific configuration
interface Config {
    apiUrl: string;
    imageUrl: string;
    defaultAvatar: string;
    appName: string;
  }
  
  // Default development environment config
  const devConfig: Config = {
    apiUrl: "http://localhost:5000",
    imageUrl: "http://localhost:5000/uploads",
    defaultAvatar: "/assets/default-avatar.png",
    appName: "BlogApp"
  };
  
  // Production environment config
  const prodConfig: Config = {
    apiUrl: "/api", // Relative URL for production
    imageUrl: "/uploads",
    defaultAvatar: "/assets/default-avatar.png",
    appName: "BlogApp"
  };
  
  // Determine which config to use based on environment
  export const config: Config = 
    process.env.NODE_ENV === "production" ? prodConfig : devConfig;
  
  // Export other constants
  export const PAGINATION_LIMIT = 10;
  export const BLOG_CATEGORIES = [
    "Technology",
    "Travel",
    "Food",
    "Health",
    "Lifestyle",
    "Business",
    "Other"
  ];