import React from 'react';

const PostsChart = ({ posts }) => {
  // Group posts by month for the last 6 months
  const getPostsByMonth = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear();
      
      const postsInMonth = posts.filter(post => {
        const postDate = new Date(post.createdAt);
        return postDate.getMonth() === date.getMonth() && 
               postDate.getFullYear() === date.getFullYear();
      }).length;
      
      months.push({
        month: `${monthName} ${year}`,
        count: postsInMonth
      });
    }
    
    return months;
  };

  const monthlyData = getPostsByMonth();
  const maxCount = Math.max(...monthlyData.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts Over Time</h3>
      
      <div className="space-y-4">
        {monthlyData.map((data, index) => (
          <div key={index} className="flex items-center">
            <div className="w-16 text-sm text-gray-600 font-medium">
              {data.month.split(' ')[0]}
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-4 relative">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${(data.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-8 text-sm text-gray-900 font-medium text-right">
              {data.count}
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No posts yet. Create your first post to see the chart!</p>
        </div>
      )}
    </div>
  );
};

export default PostsChart;