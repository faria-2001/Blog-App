import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../../../context/BlogContext';
import BlogLayout from '../../../components/layouts/BlogLayout/BlogLayout';
import { LuCalendar, LuClock, LuTag, LuArrowLeft } from 'react-icons/lu';
import { formatDate } from '../../../utils/helpers';

const PostByTags = () => {
  const { tagName } = useParams();
  const { getPostsByTag, loading } = useBlog();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const tagPosts = await getPostsByTag(tagName);
      setPosts(tagPosts);
    };
    loadPosts();
  }, [tagName, getPostsByTag]);

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
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <LuArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-4">
            <LuTag className="h-4 w-4 mr-2" />
            {tagName}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Posts tagged "{tagName}"
          </h1>
          <p className="text-xl text-gray-600">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Link
                          key={index}
                          to={`/tag/${tag}`}
                          className={`inline-flex items-center px-2 py-1 rounded text-xs transition-colors ${
                            tag === tagName
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </Link>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{post.tags.length - 3} more
                        </span>
                      )}
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
              <LuTag className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 mb-6">
              There are no published articles with the tag "{tagName}".
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <LuArrowLeft className="mr-2 h-4 w-4" />
              Browse All Articles
            </Link>
          </div>
        )}

        {/* Related Tags */}
        {posts.length > 0 && (
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tags</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.flatMap(post => post.tags)))
                .filter(tag => tag !== tagName)
                .slice(0, 10)
                .map((tag, index) => (
                  <Link
                    key={index}
                    to={`/tag/${tag}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors border"
                  >
                    <LuTag className="h-3 w-3 mr-1" />
                    {tag}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default PostByTags;
