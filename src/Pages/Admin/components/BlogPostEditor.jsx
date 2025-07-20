import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBlog } from '../../../context/BlogContext';
import { useAuth } from '../../../context/AuthContext';
import Input from '../../../components/Inputs/Input';
import TextArea from '../../../components/Inputs/TextArea';
import Button from '../../../components/Inputs/Button';
import { generateSlug, calculateReadingTime } from '../../../utils/helpers';
import AdminLayout from '../../../components/layouts/AdminLayout/AdminLayout';

const BlogPostEditor = ({ isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    featuredImage: '',
    status: 'draft'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const { createPost, updatePost, fetchPostBySlug } = useBlog();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { postSlug } = useParams();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Load post data if editing
  useEffect(() => {
    if (isEdit && postSlug) {
      loadPost();
    }
  }, [isEdit, postSlug]);

  const loadPost = async () => {
    const post = await fetchPostBySlug(postSlug);
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        tags: post.tags.join(', '),
        featuredImage: post.featuredImage || '',
        status: post.status
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, status = formData.status) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    const postData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      featuredImage: formData.featuredImage.trim(),
      status,
      slug: generateSlug(formData.title),
      readingTime: calculateReadingTime(formData.content)
    };

    let result;
    if (isEdit) {
      result = await updatePost(postSlug, postData);
    } else {
      result = await createPost(postData);
    }

    setLoading(false);

    if (result.success) {
      navigate('/admin/posts');
    }
  };

  const handleSaveDraft = (e) => {
    handleSubmit(e, 'draft');
  };

  const handlePublish = (e) => {
    handleSubmit(e, 'published');
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

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Update your blog post' : 'Write and publish a new blog post'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setPreviewMode(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    !previewMode
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    previewMode
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Preview
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {formData.content && `${calculateReadingTime(formData.content)} min read`}
              </div>
            </div>
          </div>

          <div className="p-6">
            {!previewMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Input
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter post title"
                      error={errors.title}
                      required
                    />

                    <TextArea
                      label="Content (Markdown)"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your post content in Markdown..."
                      error={errors.content}
                      rows={20}
                      required
                    />
                  </div>

                  <div className="space-y-6">
                    <TextArea
                      label="Excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      placeholder="Brief description of the post"
                      error={errors.excerpt}
                      rows={4}
                      required
                    />

                    <Input
                      label="Tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="tag1, tag2, tag3"
                    />

                    <Input
                      label="Featured Image URL"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/posts')}
                  >
                    Cancel
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleSaveDraft}
                      loading={loading}
                    >
                      Save Draft
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handlePublish}
                      loading={loading}
                    >
                      {isEdit ? 'Update Post' : 'Publish Post'}
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="prose max-w-none">
                <h1>{formData.title || 'Untitled Post'}</h1>
                {formData.excerpt && (
                  <p className="text-lg text-gray-600 italic">{formData.excerpt}</p>
                )}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={components}
                >
                  {formData.content || 'No content yet...'}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogPostEditor;
