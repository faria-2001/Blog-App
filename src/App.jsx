import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogLadingPage from "./Pages/Blog/components/BlogLandingPage";
import BlogPostView from "./Pages/Blog/components/BlogPostView";
import PostByTags from "./Pages/Blog/components/PostByTags";
import SearchPosts from "./Pages/Blog/components/SearchPosts";
import AdminLogin from "./Pages/Admin/components/AdminLogin";
import PrivateRoute from "./routes/PrivateRoute";
import BlogPostEditor from "./Pages/Admin/components/BlogPostEditor";
import BlogPosts from "./Pages/Admin/components/BlogPosts";
import Comments from "./Pages/Admin/components/Comments";
import Dashboard from "./Pages/Admin/components/Dashboard"

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<BlogLadingPage />} />
          <Route path="/:slug" element={<BlogPostView />} />
          <Route path="/tag/:tagName" element={<PostByTags />} />
          <Route path="/search" element={<SearchPosts />} />

          {/* Admin Route*/}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts" element={<BlogPosts />} />
            <Route path="/admin/create" element={<BlogPostEditor />} />
            <Route
              path="/admin/edit/:postSlug"
              element={<BlogPostEditor isEdit={true} />}
            />
            <Route path="/admin/comments" element={<Comments />} />
          </Route>

          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      
      />
    </div>
  );
};

export default App;
