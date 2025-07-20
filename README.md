# Blog Application - Sprint 1

A modern blog application built with React, Node.js, Express, and MongoDB featuring authentication, blog CRUD operations, markdown support, and draft/publish functionality.

## Features Implemented (Sprint 1)

### ✅ Authentication
- **Secure Sign Up & Login** using JWT and bcrypt
- Password validation with strength requirements
- Protected admin routes
- Automatic token refresh and logout

### ✅ Blog CRUD Operations
- **Create** new blog posts with rich editor
- **Edit** existing posts
- **Delete** posts with confirmation
- **View** all posts with filtering and search

### ✅ Markdown Support
- Full markdown editor with live preview
- Syntax highlighting for code blocks
- Support for GitHub Flavored Markdown (GFM)
- Real-time preview toggle

### ✅ Draft & Publish Toggle
- Save posts as drafts
- Publish posts when ready
- Status management in admin panel
- Draft-only visibility for admins

## Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Markdown** for content rendering
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-App
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**
   
   **Frontend (.env in root directory):**
   ```
   VITE_API_URL=http://localhost:5000
   ```
   
   **Backend (server/.env):**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   # In the root directory
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

## Demo Instructions

### 1. User Registration & Authentication
1. Navigate to http://localhost:5173
2. Click "Sign In" → "Create a new account"
3. Register with:
   - Name: Demo User
   - Email: demo@example.com
   - Password: Demo123!@# (meets all requirements)
4. You'll be automatically logged in and redirected to the admin dashboard

### 2. Create Your First Blog Post
1. Click "Create New Post" from the dashboard
2. Fill in the form:
   - **Title**: "Welcome to My Blog"
   - **Content** (Markdown):
     ```markdown
     # Welcome to My Blog
     
     This is my **first blog post** written in *Markdown*!
     
     ## Features
     - Markdown support
     - Code highlighting
     - Draft/Publish workflow
     
     ```javascript
     console.log("Hello, World!");
     ```
     
     > This is a blockquote example
     ```
   - **Excerpt**: "My first blog post showcasing markdown features"
   - **Tags**: "welcome, markdown, demo"
3. Click "Preview" to see the rendered markdown
4. Save as "Draft" first, then "Publish" when ready

### 3. Blog Management
1. Go to "All Posts" to see your posts
2. Use the search and filter functionality
3. Edit posts by clicking the edit icon
4. Delete posts with confirmation
5. View published posts by clicking the eye icon

### 4. Draft/Publish Workflow
1. Create a post and save as "Draft"
2. Drafts are only visible in the admin panel
3. Edit the draft and change status to "Published"
4. Published posts appear on the public blog

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Blog Posts
- `GET /api/posts` - Get published posts
- `GET /api/posts/all` - Get all posts (admin)
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create post (admin)
- `PUT /api/posts/:slug` - Update post (admin)
- `DELETE /api/posts/:slug` - Delete post (admin)
- `GET /api/posts/search?q=query` - Search posts
- `GET /api/posts/tag/:tag` - Get posts by tag

## Project Structure

```
Blog-App/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Inputs/
│   │   └── layouts/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BlogContext.jsx
│   ├── Pages/
│   │   ├── Admin/
│   │   └── Blog/
│   ├─��� routes/
│   ├── utils/
│   └── App.jsx
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── README.md
```

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Protected admin routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## Development Notes

- All users are automatically assigned "admin" role for demo purposes
- MongoDB connection uses local database by default
- Hot reload enabled for both frontend and backend
- Error handling with user-friendly messages
- Responsive design for mobile and desktop

## Next Steps (Future Sprints)

- Comments system
- User roles and permissions
- Image upload functionality
- SEO optimization
- Email notifications
- Social media integration
- Analytics dashboard

---

**Ready for Demo!** 🚀

The application is fully functional with all Sprint 1 features implemented and ready for demonstration.