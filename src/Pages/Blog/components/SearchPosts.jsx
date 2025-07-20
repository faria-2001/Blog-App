import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useBlog } from '../../../context/BlogContext';
import BlogLayout from '../../../components/layouts/BlogLayout/BlogLayout';
import { LuCalendar, LuClock, LuTag, LuArrowLeft, LuSearch } from 'react-icons/lu';
import { formatDate, debounce } from '../../../utils/helpers';

const SearchPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchPosts, loading } = useBlog();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce(async (query) => {
    if (query.trim()) {
      setIsSearching(true);
      const results = await searchPosts(query);
      setPosts(results);
      setIsSearching(false);
    } else {
      setPosts([]);
    }
  }, 500);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      debouncedSearch(query);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      setSearchParams({ q: value });
      debouncedSearch(value);
    } else {
      setSearchParams({});
      setPosts([]);
    }
  };

  const currentQuery = searchParams.get('q') || '';

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

        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Search Articles
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find articles, tutorials, and insights
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Search Results */}
        {currentQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isSearching ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                  Searching...
                </span>
              ) : (
                `Search results for "${currentQuery}" (${posts.length})`
              )}
            </h2>

            {!isSearching && posts.length > 0 && (
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
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <Link
                              key={index}
                              to={`/tag/${tag}`}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 2} more
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
            )}

            {!isSearching && currentQuery && posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <LuSearch className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching "{currentQuery}". Try different keywords or browse all articles.
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
          </div>
        )}

        {/* Search Tips */}
        {!currentQuery && (
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What you can search for:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Article titles and content</li>
                  <li>• Author names</li>
                  <li>• Tags and categories</li>
                  <li>• Keywords and phrases</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Search examples:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• "React hooks"</li>
                  <li>• "JavaScript tutorial"</li>
                  <li>• "web development"</li>
                  <li>• "best practices"</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Popular Tags */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML', 'Web Development', 'Tutorial', 'Best Practices', 'Performance'].map((tag, index) => (
              <Link
                key={index}
                to={`/tag/${tag.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors border"
              >
                <LuTag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default SearchPosts;
