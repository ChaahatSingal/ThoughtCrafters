<<<<<<< HEAD
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
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
>>>>>>> 315af2e5e90167a6397f20e1630c7e247c3a1ade
