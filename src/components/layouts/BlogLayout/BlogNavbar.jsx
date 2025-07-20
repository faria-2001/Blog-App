import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuSearch, LuUser, LuSettings } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const BlogNavbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setOpenSearchBar(false);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
  ];

  return (
    <div className="bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-5">
          <button
            className="lg:hidden text-black"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-2">
              B
            </div>
            <span className="text-xl font-bold text-gray-900">Blog</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                activeMenu === item.label ? 'text-blue-600' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search and User Actions */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setOpenSearchBar(!openSearchBar)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <LuSearch className="text-xl" />
          </button>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <LuSettings className="text-lg" />
                <span className="font-medium">Admin</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="hidden sm:block text-gray-600 hover:text-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/admin-login"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LuUser className="text-lg" />
              <span className="font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {openSideMenu && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
          <nav className="flex flex-col gap-4 mt-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                  activeMenu === item.label ? 'text-blue-600' : ''
                }`}
                onClick={() => setOpenSideMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setOpenSideMenu(false)}
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpenSideMenu(false);
                  }}
                  className="text-left text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Search Bar */}
      {openSearchBar && (
        <div className="mt-4 pb-4 border-t border-gray-200">
          <form onSubmit={handleSearch} className="mt-4">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogNavbar;
