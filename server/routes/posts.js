const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all published posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query;
    const query = { status: 'published' };

    // Add tag filter
    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] };
    }

    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }

    const posts = await Post.find(query)
      .populate('author', 'name email avatar')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/all
// @desc    Get user's posts (including drafts)
// @access  Private (Authenticated)
router.get('/all', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const query = { author: req.user._id }; // Only show user's own posts

    // Add status filter
    if (status && status !== 'all') {
      query.status = status;
    }

    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }

    const posts = await Post.find(query)
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/search
// @desc    Search posts
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const query = {
      status: 'published',
      $text: { $search: q }
    };

    const posts = await Post.find(query)
      .populate('author', 'name email avatar')
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      query: q
    });
  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/tag/:tag
// @desc    Get posts by tag
// @access  Public
router.get('/tag/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const query = {
      status: 'published',
      tags: { $in: [tag.toLowerCase()] }
    };

    const posts = await Post.find(query)
      .populate('author', 'name email avatar')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      tag
    });
  } catch (error) {
    console.error('Get posts by tag error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/:slug
// @desc    Get single post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name email avatar bio');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views for published posts
    if (post.status === 'published') {
      post.views += 1;
      await post.save();
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private (Authenticated)
router.post('/', [
  auth,
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('status')
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, content, excerpt, tags, featuredImage, status, readingTime } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ message: 'A post with this title already exists' });
    }

    const post = new Post({
      title,
      slug,
      content,
      excerpt,
      tags: tags || [],
      featuredImage: featuredImage || '',
      status: status || 'draft',
      author: req.user._id,
      readingTime: readingTime || 1
    });

    await post.save();
    await post.populate('author', 'name email avatar');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/posts/:slug
// @desc    Update a post
// @access  Private (Authenticated)
router.put('/:slug', [
  auth,
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty'),
  body('excerpt')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Excerpt cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns this post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only edit your own posts.' });
    }

    const { title, content, excerpt, tags, featuredImage, status, readingTime } = req.body;

    // Update fields
    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;
    if (tags) post.tags = tags;
    if (featuredImage !== undefined) post.featuredImage = featuredImage;
    if (status) post.status = status;
    if (readingTime) post.readingTime = readingTime;

    // Update slug if title changed
    if (title) {
      const newSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      if (newSlug !== post.slug) {
        const existingPost = await Post.findOne({ slug: newSlug });
        if (existingPost) {
          return res.status(400).json({ message: 'A post with this title already exists' });
        }
        post.slug = newSlug;
      }
    }

    await post.save();
    await post.populate('author', 'name email avatar');

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/posts/:slug
// @desc    Delete a post
// @access  Private (Authenticated)
router.delete('/:slug', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns this post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only delete your own posts.' });
    }

    await Post.deleteOne({ slug: req.params.slug });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;