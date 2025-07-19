import {BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { Toaster } from "react-hot-toast";
import BlogLadingPage from "./Pages/Blog/components/BlogLandingPage";
import BlogPostView from "./Pages/Blog/components/BlogPostView";
import PostByTags from "./Pages/Blog/components/PostByTags";
import SearchPosts from "./Pages/Blog/components/SearchPosts";
import AdminLogin from "./Pages/Admin/components/AdminLogin";

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<BlogLadingPage />}/>
          <Route path="/:slug" element={<BlogPostView />}/>
          <Route path="/tag/:tagName" element={<PostByTags />}/>
          <Route path="/search" element={<SearchPosts />} />


          <Route path="/admin-login" element={<AdminLogin/>}/>



        </Routes>

      </Router>


    </div>
  )
}

export default App
