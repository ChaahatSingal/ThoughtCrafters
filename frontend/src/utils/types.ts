// User related types
export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    createdAt: string;
  }
  
  // Auth related types
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface SignupData {
    username: string;
    email: string;
    password: string;
  }
  
  // Blog related types
  export interface Author {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
  }
  
  export interface BlogPost {
    id: number;
    author: Author;
    date: string;
    memberOnly: boolean;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    thumbnail?: string;
    content?: string[];
  }
  
  export interface BlogListResponse {
    posts: BlogPost[];
    totalCount: number;
    hasMore: boolean;
  }
  
  export interface CreateBlogData {
    title: string;
    category: string;
    excerpt: string;
    content: string[] | string;
    memberOnly: boolean;
  }
  
  // Comment related types
  export interface Comment {
    id: string;
    author: Author;
    content: string;
    createdAt: string;
    replies?: Comment[];
  }
  
  // API response types
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
  }