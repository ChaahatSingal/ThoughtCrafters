// App.jsx
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider,useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/" element={<BlogsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
