import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBlog } from '../../../context/BlogContext';
import BlogLayout from '../../../components/layouts/BlogLayout/BlogLayout';
import { LuCalendar, LuClock, LuTag, LuArrowLeft, LuShare2, LuHeart, LuEye } from 'react-icons/lu';
import { formatDate } from '../../../utils/helpers';

const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { fetchPostBySlug, loading } = useBlog();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      const postData = await fetchPostBySlug(slug);
      if (postData) {
        setPost(postData);
      } else {
        navigate('/');
      }
    };
    loadPost();
  }, [slug, fetchPostBySlug, navigate]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  if (loading) {
    return (
      <BlogLayout>
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </BlogLayout>
    );
  }

  if (!post) {
    return (
      <BlogLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <LuArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <article className="max-w-4xl mx-auto">
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

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <LuCalendar className="h-5 w-5 mr-2" />
              {formatDate(post.publishedAt || post.createdAt)}
            </div>
            <div className="flex items-center">
              <LuClock className="h-5 w-5 mr-2" />
              {post.readingTime} min read
            </div>
            <div className="flex items-center">
              <LuEye className="h-5 w-5 mr-2" />
              {post.views} views
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
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

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  liked 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LuHeart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LuShare2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Author Info */}
          {post.author && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.author.name}
                  </h3>
                  {post.author.bio && (
                    <p className="text-gray-600">{post.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to get more great content delivered to your inbox.
            </p>
            <div className="flex gap-4">
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
        </footer>
      </article>
    </BlogLayout>
  );
};

export default BlogPostView;
