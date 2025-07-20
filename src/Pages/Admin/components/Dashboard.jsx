

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useBlog } from '../../../context/BlogContext';
import AdminLayout from '../../../components/layouts/AdminLayout/AdminLayout';
import Button from '../../../components/Inputs/Button';
import { LuFileText, LuEye, LuClock, LuPlus } from 'react-icons/lu';

const Dashboard = () => {
  const { user } = useAuth();
  const { posts, fetchAllPosts } = useBlog();
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  });

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const published = posts.filter(post => post.status === 'published').length;
      const drafts = posts.filter(post => post.status === 'draft').length;
      const views = posts.reduce((total, post) => total + (post.views || 0), 0);

      setStats({
        totalPosts: posts.length,
        publishedPosts: published,
        draftPosts: drafts,
        totalViews: views
      });
    }
  }, [posts]);

  const recentPosts = posts.slice(0, 5);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: LuFileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Published',
      value: stats.publishedPosts,
      icon: LuEye,
      color: 'bg-green-500'
    },
    {
      title: 'Drafts',
      value: stats.draftPosts,
      icon: LuClock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: LuEye,
      color: 'bg-purple-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
          </div>
          <Link to="/admin/create">
            <Button variant="primary">
              <LuPlus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
              <Link to="/admin/posts" className="text-blue-600 hover:text-blue-500 text-sm">
                View all
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post._id || post.slug || post.title} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/admin/edit/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      {post.status === 'published' && (
                        <Link to={`/${post.slug}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <LuFileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
                <div className="mt-6">
                  <Link to="/admin/create">
                    <Button variant="primary">
                      <LuPlus className="mr-2 h-4 w-4" />
                      Create New Post
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
