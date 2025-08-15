# Blog Application - Sprint 1 & 2 Complete

A modern, feature-rich blog application built with React, Node.js, Express, and MongoDB. Features include authentication, AI-powered content generation, advanced analytics, tag filtering, and comprehensive blog management.

## Features Implemented

### ✅ Sprint 1 - Core Featuress

#### Authentication & Security
- **Secure Sign Up & Login** using JWT and bcrypt
- **Role-based Access Control** (Admin/User separation)
- **Post Ownership Security** (Users can only manage their own posts)
- Password validation with strength requirements
- Protected admin routes with proper authorization

#### Blog CRUD Operations
- **Create** new blog posts with rich markdown editor
- **Edit** existing posts with live preview
- **Delete** posts with confirmation
- **View** all posts with advanced filtering and search

#### Markdown Support
- Full markdown editor with live preview toggle
- Syntax highlighting for code blocks
- Support for GitHub Flavored Markdown (GFM)
- Real-time preview with proper styling

#### Draft & Publish Workflow
- Save posts as drafts for later editing
- Publish posts when ready for public viewing
- Status management in admin panel
- Draft-only visibility for post authors

### ✅ Sprint 2 - Advanced Features

#### 🤖 AI Blog Generator
- **Smart Content Generation** based on user prompts
- **Topic-Specific Templates** (React, JavaScript, Web Development)
- **Complete Post Creation** (title, content, excerpt, tags)
- **One-Click Integration** into blog editor
- **Copy & Use Functionality** for generated content

#### 📊 Enhanced Admin Dashboard
- **Visual Analytics Charts** showing post trends over time
- **Status Distribution Charts** (Published vs Draft posts)
- **Statistics Cards** (Total Posts, Published, Drafts, Views)
- **Recent Posts Management** with quick actions
- **Monthly Post Creation Trends** (last 6 months)

#### 🏷️ Advanced Tag Filtering
- **Tag-based Post Filtering** with dedicated pages
- **Related Tags Suggestions** on tag pages
- **Tag Navigation** throughout the application
- **Post Count Display** for each tag
- **SEO-friendly Tag URLs**

#### 📈 Post Analytics & Engagement
- **View Counter** with automatic tracking
- **Reading Time Calculation** based on content length
- **Post Performance Metrics** in dashboard
- **Engagement Statistics** aggregation

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

### 2. 🤖 AI Blog Generator (NEW!)
1. Click "Create New Post" from the dashboard
2. Use the **AI Blog Generator** at the top of the page:
   - Enter a topic like "React hooks", "JavaScript tips", or "web development"
   - Click "Generate Blog Post" and wait 2 seconds
   - Review the generated content with title, excerpt, tags, and full markdown content
   - Click "Use This Content" to populate the form automatically
3. Customize the generated content as needed
4. Save as "Draft" or "Publish" immediately

### 3. 📊 Enhanced Dashboard Analytics
1. Visit the admin dashboard to see:
   - **Statistics Cards**: Total posts, published count, drafts, and total views
   - **Posts Over Time Chart**: Visual representation of your posting activity
   - **Status Distribution Chart**: Pie chart showing published vs draft ratio
   - **Recent Posts**: Quick access to your latest posts with edit/view actions

### 4. 🏷️ Tag-Based Navigation
1. Create posts with various tags
2. Visit the public blog and click on any tag
3. See filtered posts by that specific tag
4. Explore related tags suggestions
5. Navigate between different tag categories

### 5. Traditional Blog Management
1. Go to "All Posts" to see your posts (now filtered by ownership)
2. Use the search and filter functionality
3. Edit posts by clicking the edit icon
4. Delete posts with confirmation
5. View published posts by clicking the eye icon

### 6. 📈 Post Analytics
1. Publish a post and visit it on the public blog
2. Notice the view counter incrementing
3. Check the dashboard to see total views across all posts
4. Reading time is automatically calculated and displayed

### 7. Security Features Demo
1. Create a second user account
2. Notice that each user only sees their own posts in the admin panel
3. Regular users don't see admin navigation links
4. Try accessing admin routes directly - you'll be redirected appropriately

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