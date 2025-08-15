import React from 'react';

const StatsChart = ({ posts }) => {
  const stats = {
    published: posts.filter(post => post.status === 'published').length,
    draft: posts.filter(post => post.status === 'draft').length,
  };

  const total = stats.published + stats.draft;
  const publishedPercentage = total > 0 ? (stats.published / total) * 100 : 0;
  const draftPercentage = total > 0 ? (stats.draft / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Status Distribution</h3>
      
      {total > 0 ? (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
              <div className="flex h-full">
                <div
                  className="bg-green-500 transition-all duration-300"
                  style={{ width: `${publishedPercentage}%` }}
                />
                <div
                  className="bg-yellow-500 transition-all duration-300"
                  style={{ width: `${draftPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              <span className="text-gray-600">Published ({stats.published})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
              <span className="text-gray-600">Drafts ({stats.draft})</span>
            </div>
          </div>

          {/* Percentages */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {publishedPercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {draftPercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500">Drafts</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No posts yet. Create your first post to see the distribution!</p>
        </div>
      )}
    </div>
  );
};

export default StatsChart;