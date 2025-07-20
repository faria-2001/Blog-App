import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../../context/BlogContext';
import BlogLayout from '../../../components/layouts/BlogLayout/BlogLayout';
import { LuCalendar, LuClock, LuTag, LuArrowRight, LuSearch } from 'react-icons/lu';
import { formatDate, calculateReadingTime } from '../../../utils/helpers';

const BlogLandingPage = () => {
  const { posts, fetchPosts, loading } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchTerm]);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  if (loading) {
    return (
      <BlogLayout>
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tutorials, and stories from our community. 
            Stay updated with the latest trends and best practices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto relative">
            <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && !searchTerm && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {featuredPost.featuredImage && (
                <div className="h-64 md:h-96 bg-gray-200">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <LuCalendar className="h-4 w-4 mr-1" />
                    {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <LuClock className="h-4 w-4 mr-1" />
                    {featuredPost.readingTime} min read
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.slice(0, 3).map((tag, index) => (
                      <Link
                        key={index}
                        to={`/tag/${tag}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                      >
                        <LuTag className="h-3 w-3 mr-1" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <Link
                    to={`/${featuredPost.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                    <LuArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchTerm ? `Search Results (${filteredPosts.length})` : 'Recent Articles'}
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchTerm ? filteredPosts : recentPosts).map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featuredImage && (
                    <div className="h-48 bg-gray-200">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <LuCalendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <LuClock className="h-4 w-4 mr-1" />
                        {post.readingTime} min read
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Link
                            key={index}
                            to={`/tag/${tag}`}
                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                      <Link
                        to={`/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <LuSearch className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No articles found' : 'No articles yet'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search terms or browse all articles.'
                  : 'Check back soon for new content!'
                }
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest articles and updates delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogLandingPage;
