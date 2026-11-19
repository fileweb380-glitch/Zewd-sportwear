
import React, { useState } from 'react';
import {
  Outlet,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  LayoutDashboard,
  Package,
  Plus,
  Globe,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';


const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    );

    if (!confirmed) return;

    localStorage.removeItem('zewd_admin_token');
    localStorage.removeItem('zewd_admin_user');

    navigate('/admin/login');
  };

  const navItems = [
    {
      title: 'Dashboard Overview',
      path: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Manage Products',
      path: '/admin/products',
      icon: Package
    },
    {
      title: 'Add New Product',
      path: '/admin/products/new',
      icon: Plus
    }
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }

    if (path === '/admin/products') {
      return (
        location.pathname === '/admin/products' ||
        /^\/admin\/products\/[^/]+$/.test(location.pathname)
      );
    }

    return location.pathname === path;
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? 'sidebar-open' : ''
        }`}
      >

        <div className="admin-brand">
          <div className="admin-brand-icon">Z</div>

          <div className="admin-brand-text">
            <h2>ZEWD<span>.</span></h2>
            <p>SPORTWEAR ADMIN</p>
          </div>

          <button
            className="sidebar-close-btn"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <div className="admin-nav-label">
          MAIN MENU
        </div>

        <nav className="admin-nav">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`admin-nav-link ${
                  isActive(item.path) ? 'active-nav-item' : ''
                }`}
              >
                <Icon size={19} strokeWidth={2} />

                <span>{item.title}</span>

                {isActive(item.path) && (
                  <ChevronRight size={17} className="nav-chevron" />
                )}
              </Link>
            );
          })}

          <div className="admin-nav-divider" />

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-link"
          >
            <Globe size={19} />
            <span>View Live Website</span>
          </a>

        </nav>

        {/* Sidebar Bottom */}
        <div className="admin-sidebar-footer">

          <div className="admin-security-card">
            <ShieldCheck size={20} />
            <div>
              <strong>Secure Session</strong>
              <span>Admin access active</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

          <p className="admin-sidebar-copyright">
            © {new Date().getFullYear()} Zewd Sportwear
          </p>

        </div>

      </aside>

      {/* Main Content */}
      <main className="admin-main-content">

        {/* Topbar */}
        <header className="admin-topbar">

          <div className="admin-topbar-left">

            <button
              className="admin-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={23} />
            </button>

            <div>
              <p className="admin-topbar-subtitle">
                ADMINISTRATION
              </p>

              <h1>Zewd Management</h1>
            </div>

          </div>

          <div className="admin-user-badge">
            <div className="admin-user-icon">
              <ShieldCheck size={19} />
            </div>

            <div className="admin-user-info">
              <strong>Administrator</strong>
              <span>Management Panel</span>
            </div>
          </div>

        </header>

        {/* Page Content */}
        <div className="admin-page-container">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;
