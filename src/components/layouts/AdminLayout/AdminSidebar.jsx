import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuFileText, 
  LuPlus, 
  LuMessageSquare 
} from 'react-icons/lu';
import clsx from 'clsx';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LuLayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      id: 'posts',
      label: 'All Posts',
      icon: LuFileText,
      path: '/admin/posts'
    },
    {
      id: 'create',
      label: 'Create Post',
      icon: LuPlus,
      path: '/admin/create'
    },
    {
      id: 'comments',
      label: 'Comments',
      icon: LuMessageSquare,
      path: '/admin/comments'
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.id}
                to={item.path}
                className={clsx(
                  'flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-md transition-colors duration-200',
                  {
                    'bg-blue-100 text-blue-700': isActive,
                    'text-gray-600 hover:bg-gray-100 hover:text-gray-900': !isActive
                  }
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;