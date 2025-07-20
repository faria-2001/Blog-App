# Demo Setup Guide

## Quick Demo Setup (5 minutes)

### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### 2. Start Services

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 3. Demo Flow

1. **Registration** (http://localhost:5173)
   - Click "Sign In" → "Create a new account"
   - Use: demo@example.com / Demo123!@#

2. **Create First Post**
   - Dashboard → "Create New Post"
   - Title: "My First Blog Post"
   - Use sample markdown content
   - Save as Draft → then Publish

3. **Show Features**
   - Markdown preview toggle
   - Draft/Publish workflow
   - Post management (edit, delete)
   - Search and filtering

### 4. Sample Blog Post Content

```markdown
# Welcome to My Blog

This is my **first blog post** showcasing the amazing features of our blog platform!

## What's Special?

- ✨ **Markdown Support** - Write in markdown with live preview
- 🔒 **Secure Authentication** - JWT-based login system
- 📝 **Draft System** - Save drafts and publish when ready
- 🎨 **Beautiful UI** - Clean, responsive design

## Code Example

Here's a simple JavaScript function:

```javascript
function greetBlogReaders() {
    console.log("Welcome to our amazing blog platform!");
    return "Happy reading! 📚";
}
```

## Features Demonstrated

> This post demonstrates all the key features implemented in Sprint 1

### Authentication ✅
- Secure registration and login
- Password validation
- Protected admin routes

### Blog CRUD ✅
- Create, edit, delete posts
- Rich markdown editor
- Post management dashboard

### Markdown Support ✅
- Full markdown rendering
- Code syntax highlighting
- Live preview mode

### Draft/Publish ✅
- Save as draft
- Publish when ready
- Status management

---

*This blog post was created using our markdown editor with live preview!*
```

### 5. Demo Script

**"Let me show you our Sprint 1 blog application..."**

1. **"First, let's register a new user"**
   - Show registration form
   - Highlight password validation
   - Automatic login after registration

2. **"Now we're in the admin dashboard"**
   - Show statistics
   - Point out clean UI
   - Click "Create New Post"

3. **"Here's our markdown editor"**
   - Paste sample content
   - Toggle between Edit/Preview
   - Show live rendering
   - Point out reading time calculation

4. **"Let's save this as a draft first"**
   - Save as draft
   - Show it appears in dashboard
   - Edit the post
   - Change to published

5. **"Now let's manage our posts"**
   - Go to "All Posts"
   - Show search functionality
   - Filter by status
   - Edit/delete actions

6. **"Finally, let's see the public view"**
   - View published post
   - Show markdown rendering
   - Highlight responsive design

### 6. Key Points to Emphasize

- **Security**: JWT authentication, password hashing
- **User Experience**: Clean UI, live preview, responsive
- **Functionality**: Full CRUD, markdown support, draft system
- **Code Quality**: Proper error handling, validation, structure
- **Ready for Production**: Environment configs, proper setup

### 7. Troubleshooting

**If MongoDB connection fails:**
```bash
# Start MongoDB service
mongod

# Or use MongoDB Atlas cloud connection
# Update MONGODB_URI in server/.env
```

**If ports are in use:**
- Frontend: Change port in vite.config.js
- Backend: Change PORT in server/.env

**If API calls fail:**
- Check VITE_API_URL in .env
- Ensure backend is running on correct port
- Check browser console for errors

---

**Demo Duration: ~10 minutes**
**Setup Time: ~5 minutes**
**Total: ~15 minutes**