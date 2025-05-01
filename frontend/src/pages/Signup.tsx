<<<<<<< HEAD
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage:React.FC=()=>{
const navigate=useNavigate();
const [formData,setFormData]=useState({
  username:"",
  email:"",
  password:""
});
const [isLoading,setIsLoadinf]=useState(false);
const[error,setError]=useState<string|null>(null);
const handleChange=(e :React.ChangeEvent<HTMLInputElement>)=>{
  const{id,value}=e.target
  setFormData(prev=>({
    ...prev,
    [id]:value
  }));
};
const handlesumbit= async(e:React.FormEvent)=>{
  e.preventDefault();
  setIsLoadinf(true);
  setError(null);
  try{
    const response= await axios.post("api/auth/signup",formData);
    localStorage.setItem("token",response.data.token);
    navigate("/blogs");
  }catch(err:any){
    setError(err.response?.data?.message||"Signup failed");
  }finally{
    setIsLoadinf(false)
  }
};
return(
  <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Signup page</h1>
      <div className="bg-white text-black rounded-md p-8 grid md:grid-cols-2 gap-2">
        <div className="bg-white text-black rounded-md p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
             <h2 className="text-2xl font-bold">Create an account</h2>
              <p className="text-sm text-gray-600">
              Already have an account?{""}
              <a href="/login" className="text-blue-600 hover:underline">
              Login
              </a>
             </p>
            </div>
            <form onSubmit={handlesumbit} className="space-y-4">
              {error && <div className="text-red-500">{error}</div>}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input 
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-2 border rounded"
                required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                id="email"
                value={formData.email}
                placeholder="@gmail.com"
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                />
              </div>
              <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white p-2 rounded"
              disabled={isLoading}
              >
                {isLoading ? "Singining up...":"sign up"}

              </button>
              
            </form>
          </div>
         <div className="flex items-center">
          <blockquote className="italic text-gray-700">
            <p className="text-lg font-medium">
              "The customer service I received was exceptional. The support team went above and beyond to address my
              concerns."
            </p>
             <footer className="mt-2">
              <p className="font-semibold">Jules Winfield</p>
              <p className="text-sm text-gray-600">CEO, Acme Inc.</p>
            </footer>
          </blockquote>
        </div>  
        </div>
      </div>
  </div>
);
};
export default SignupPage
=======

export const Signup = () => {
    return (
        <div>
        <h1>Signup</h1>
        </div>
    )
}
>>>>>>> 315af2e5e90167a6397f20e1630c7e247c3a1ade
