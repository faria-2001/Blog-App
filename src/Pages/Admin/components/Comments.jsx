import React, { useState } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout/AdminLayout';
import { LuMessageSquare, LuUser, LuCalendar, LuCheck, LuX, LuTrash2 } from 'react-icons/lu';

const Comments = () => {
  // Mock data for demonstration
  const [comments] = useState([
    {
      id: 1,
      author: 'John Doe',
      email: 'john@example.com',
      content: 'Great article! This really helped me understand the concepts better.',
      postTitle: 'Getting Started with React Hooks',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'approved'
    },
    {
      id: 2,
      author: 'Jane Smith',
      email: 'jane@example.com',
      content: 'I have a question about the implementation. Could you provide more details on the useEffect hook?',
      postTitle: 'Advanced React Patterns',
      createdAt: '2024-01-14T15:45:00Z',
      status: 'pending'
    },
    {
      id: 3,
      author: 'Mike Johnson',
      email: 'mike@example.com',
      content: 'This is spam content with promotional links.',
      postTitle: 'JavaScript Best Practices',
      createdAt: '2024-01-13T09:20:00Z',
      status: 'spam'
    }
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'spam':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingComments = comments.filter(comment => comment.status === 'pending');
  const approvedComments = comments.filter(comment => comment.status === 'approved');
  const spamComments = comments.filter(comment => comment.status === 'spam');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
          <p className="text-gray-600 mt-2">Manage and moderate blog comments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <LuMessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <LuMessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingComments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <LuMessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{approvedComments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-red-500 p-3 rounded-lg">
                <LuMessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Spam</p>
                <p className="text-2xl font-bold text-gray-900">{spamComments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Comments</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <LuUser className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{comment.author}</p>
                          <p className="text-sm text-gray-500">{comment.email}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                          {comment.status}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-gray-800 mb-2">{comment.content}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>On: <strong>{comment.postTitle}</strong></span>
                          <div className="flex items-center">
                            <LuCalendar className="h-4 w-4 mr-1" />
                            {formatDate(comment.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {comment.status === 'pending' && (
                        <>
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                            <LuCheck className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                            <LuX className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <LuTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <LuMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No comments yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comments will appear here when readers engage with your posts.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comment Moderation Info */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comment Moderation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Moderation Actions:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Approve:</strong> Make comment visible to all visitors</li>
                <li>• <strong>Reject:</strong> Hide comment from public view</li>
                <li>• <strong>Mark as Spam:</strong> Flag inappropriate content</li>
                <li>• <strong>Delete:</strong> Permanently remove comment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best Practices:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Review comments regularly</li>
                <li>• Respond to legitimate questions</li>
                <li>• Remove spam and inappropriate content</li>
                <li>• Foster positive community discussions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Comments;
