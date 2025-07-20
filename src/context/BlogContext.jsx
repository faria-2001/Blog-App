import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // Fetch all published posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/posts');
      setPosts(response.data.posts);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all posts (including drafts) for admin
  const fetchAllPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/posts/all');
      setPosts(response.data.posts);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single post by slug
  const fetchPostBySlug = useCallback(async (slug) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/posts/${slug}`);
      setCurrentPost(response.data.post);
      return response.data.post;
    } catch (error) {
      toast.error('Post not found');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new post
  const createPost = useCallback(async (postData) => {
    try {
      const response = await api.post('/api/posts', postData);
      toast.success('Post created successfully!');
      return { success: true, post: response.data.post };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create post';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // Update post
  const updatePost = useCallback(async (slug, postData) => {
    try {
      const response = await api.put(`/api/posts/${slug}`, postData);
      toast.success('Post updated successfully!');
      return { success: true, post: response.data.post };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post';
      toast.error(message);
      return { success: false, error: message };
    }
  }, []);

  // Delete post
  const deletePost = useCallback(async (slug) => {
    try {
      await api.delete(`/api/posts/${slug}`);
      setPosts(posts.filter(post => post.slug !== slug));
      toast.success('Post deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete post';
      toast.error(message);
      return { success: false, error: message };
    }
  }, [posts]);

  // Search posts
  const searchPosts = useCallback(async (query) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/posts/search?q=${encodeURIComponent(query)}`);
      return response.data.posts;
    } catch (error) {
      toast.error('Search failed');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get posts by tag
  const getPostsByTag = useCallback(async (tag) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/posts/tag/${tag}`);
      return response.data.posts;
    } catch (error) {
      toast.error('Failed to fetch posts by tag');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    posts,
    currentPost,
    loading,
    fetchPosts,
    fetchAllPosts,
    fetchPostBySlug,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    getPostsByTag,
    setCurrentPost
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};