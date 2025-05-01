import React,{createContext,useContext,useState,useEffect,ReactNode} from "react";
import axios from "axios";

interface AuthContextType{
    isAuthenticated:boolean;
    user:any|null;
    login:(token:string)=>void;
    logout:()=>void;
    isLoading:boolean;
}
const AuthContext=createContext<AuthContextType>({
    isAuthenticated:false,
    user:null,
    login:()=>{},
    logout:()=>{},
    isLoading:true
});
export const useAuth=()=>useContext(AuthContext);
interface AuthProviderProps{
    children:ReactNode;
}

export const AuthProvider:React.FC<AuthProviderProps>=({children})=>{
   const [isAuthenticated,setIsAuthenticated]=useState(false);
   const [user ,setUser]=useState<any|null>(null);
   const [isLoading,setIsloading] =useState(true);
   useEffect(()=>{
    const checkAuth=async()=>{
        const token=localStorage.getItem("token");
        if(token){
            try{
                const response= await axios.get("/api/auth/me",{
                    headers:{Authorization:`Bearer${token}`}
                });
                setUser(response.data);
                setIsAuthenticated(true);
            }catch(error){
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        setIsloading(false)
    };
    checkAuth();
   },[]);
   const login=(token:string)=>{
    localStorage.setItem("token",token);
    setIsAuthenticated(true);
    axios.get("/api/auth/me",{
        headers:{Authorization:`Bearer${token}`}
    }).then(response=>{
        setUser(response.data);
    });
   };
   
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      };
      return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
          {children}
        </AuthContext.Provider>
      );
}