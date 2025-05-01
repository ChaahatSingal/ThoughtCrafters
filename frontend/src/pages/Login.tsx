import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage:React.FC=()=>{
    const navigate=useNavigate();
    const {login}=useAuth();
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })
    const[isLoading,setIsloading]=useState(false);
    const[error,setError]=useState<string|null>();

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {id,value}=e.target;
        setFormData(prev=>({
            ...prev,
            [id]:value
        }));
    }
    const handleSumbeit=async(e:React.FormEvent)=>{
     e.preventDefault();
     setIsloading(true);
     setError(null);
        try{
            const response=axios.post("/api/auth/login",formData);
            const token=response.data.token;
            login(token);
            navigate("/blogs");

        }catch (err:any){
            setError(err.response?.data?.message|| "Login failed");
        } finally{
            setIsloading(false);
        }
    };
    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-8"> Login pages</h1>
            <div className=" bg-white text-black rounded-md p-8 max-w-4">
                <div className="space-y-6">
                      <div className="space-y-2">
                         <h2 className="text-2xl font-bold">Welcome back</h2>
                         <p className="text-sm text-gray-600">
                         Don't have an account?{" "}
                          <a href="/signup" className="text-blue-600 hover:underline">
                           Sign up
                            </a>
                               </p>
                     </div>
                     <form onSubmit={handleSumbeit} className="space-y-4">
                     {error && <div className="text-red-500">{error}</div>}
                     <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded"
                        required
                      />

                     </div>
                     <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Your password"
                        className="w-full p-2 border rounded"
                        required
                        />

                     </div>
                     <div className="flex items-center justify-between">
                     <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                     </a>
                     </div>
                     <button
                       type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white p-2 rounded"
                       disabled={isLoading}
                        >
                       {isLoading ? "Logging in..." : "Login"}
                     </button>
                     </form>
                </div>
                <div className="flex items-center">
                      <blockquote className="italic text-gray-700">
              <p className="text-lg font-medium">
              "The content on this platform is amazing. I've learned so much and found a great community of like-minded people."
              </p>
              <footer className="mt-2">
              <p className="font-semibold">Mia Wallace</p>
              <p className="text-sm text-gray-600">Writer, Pulp Fiction Magazine</p>
              </footer>
             </blockquote>
             </div>
            </div>
        </div>
    )

   
}
export default LoginPage;