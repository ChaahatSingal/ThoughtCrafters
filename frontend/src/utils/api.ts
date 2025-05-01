import axios from "axios";
import {config} from "./config";

axios.defaults.baseURL=config.apiUrl;

axios.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");
        if(token){
            config.headers.Authorization=`Bearer ${token}`;

        }
        return config;
    },
    (error)=> Promise.reject(error)
);

export const authApi={
    signup: async(userData:{username:string;email:string; password:string})=>{
        const response=await axios.post("/api/auth/signup",userData);
        return response.data;
    },
    login:async(credentials:{email:string; password:string})=>{
        const response=await axios.post("/api/auth/login",credentials);
        return response.data;
    },
    getCurrentUser:async()=>{
        const response=await axios.get("/api/auth/me");
        return response.data;
    }
};

export const blogapi={
    getBlogs:async(tab:string="for-you")=>{
        const response=await axios.get(`/api/blogs?tab=${tab}`);
        return response.data;
    },
    getBlogsById:async(id:string)=>{
        const response=await axios.get(`/api/blogs/${id}`);
        return response.data;
    },
    createBlog:async(blogData:any)=>{
        const response=await axios.post("/api/blogs",blogData)
        return response.data;
    },
    updateBlog:async(id:string, blogData:any)=>{
        const response=await axios.put(`/api/blogs${id}`,blogData)
        return response.data;
    },
    deleteBlog:async(id:string)=>{
        const response=await axios.delete(`/api/blogs/${id}`);
        return response.data;
    }
}
export const userApi={
    updateProfile:async(userData:any)=>{
        const response=await axios.put("/api/users/profile",userData);
        return response.data;
    },
    getUser:async(id:string)=>{
        const response=await axios.get(`/api/users/${id}`);
        return response.data;
    }
};



