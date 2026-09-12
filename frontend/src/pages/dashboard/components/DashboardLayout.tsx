import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  Home,
  Clock,
  Layers,
  Users,
  Share2,
  Folder,
  Sliders,
  HelpCircle,
  Trash2,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Settings,
  BookOpen,
  LayoutGrid,
  Check,
} from 'lucide-react';
import { getStoredTheme, applyTheme } from '../../../shared/lib/theme.js';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNav?: 'home' | 'recents' | 'sessions' | 'shared' | 'syllabus' | 'decay' | 'templates';
  onOpenCreateModal?: () => void;
  onOpenImportModal?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export function DashboardLayout({
  children,
  activeNav = 'home',
  onOpenCreateModal,
  onOpenImportModal,
  searchQuery = '',
  onSearchChange,
}: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(() => getStoredTheme());
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  useEffect(() => {
    const handleStorage = () => {
      setCurrentTheme(getStoredTheme());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dash-container">
      {/* ── Left Sidebar ────────────────────────────────────────────────── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-top">
          {/* Logo */}
          <Link to="/" className="dash-brand-link" title="Pairly Home">
            <div className="dash-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="dash-brand-title">Pairly</span>
          </Link>

          {/* Primary Action Button: + New Session / Presentation */}
          <button
            type="button"
            className="dash-new-btn"
            onClick={onOpenCreateModal}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>New Session</span>
          </button>

          {/* Primary Nav Links */}
          <nav className="dash-nav-section" aria-label="Main Dashboard Navigation">
            <Link
              to="/dashboard"
              className={`dash-nav-item ${activeNav === 'home' ? 'is-active' : ''}`}
            >
              <Home size={18} className="dash-nav-icon" />
              <span>Home</span>
            </Link>

            <Link
              to="/dashboard?filter=recents"
              className={`dash-nav-item ${activeNav === 'recents' ? 'is-active' : ''}`}
            >
              <Clock size={18} className="dash-nav-icon" />
              <span>Recents</span>
            </Link>

            <Link
              to="/dashboard?filter=sessions"
              className={`dash-nav-item ${activeNav === 'sessions' ? 'is-active' : ''}`}
            >
              <Layers size={18} className="dash-nav-icon" />
              <span>My Sessions</span>
            </Link>

            <Link
              to="/dashboard?filter=shared"
              className={`dash-nav-item ${activeNav === 'shared' ? 'is-active' : ''}`}
            >
              <Share2 size={18} className="dash-nav-icon" />
              <span>Shared with me</span>
            </Link>
          </nav>

          {/* Team / Workspace Section */}
          <div className="dash-team-section">
            <div className="dash-section-header">
              <span>Adarsh Pratap's Team</span>
              <span className="dash-team-badge">Stanford</span>
            </div>

            <nav className="dash-nav-section">
              <Link
                to="/dashboard/decay"
                className={`dash-nav-item ${activeNav === 'decay' ? 'is-active' : ''}`}
                title="15-Week Concept Decay Analytics"
              >
                <Sliders size={18} className="dash-nav-icon" />
                <span>Concept Decay</span>
                <span className="dash-item-chip">Live</span>
              </Link>

              <Link
                to="/dashboard/syllabus"
                className={`dash-nav-item ${activeNav === 'syllabus' ? 'is-active' : ''}`}
                title="AI Syllabus & Slide Synthesizer"
              >
                <BookOpen size={18} className="dash-nav-icon" />
                <span>Slide Synthesizer</span>
                <span className="dash-item-chip ai">AI</span>
              </Link>

              <Link
                to="/community"
                className={`dash-nav-item ${activeNav === 'templates' ? 'is-active' : ''}`}
              >
                <LayoutGrid size={18} className="dash-nav-icon" />
                <span>Shared Templates</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer Utility Links */}
        <div className="dash-sidebar-bottom">
          <nav className="dash-nav-section secondary">
            <Link to="/features/engage" className="dash-nav-item small">
              <Folder size={16} className="dash-nav-icon" />
              <span>Question Banks</span>
            </Link>

            <Link to="/download" className="dash-nav-item small">
              <Layers size={16} className="dash-nav-icon" />
              <span>Presenter Client</span>
            </Link>

            <Link to="/about" className="dash-nav-item small">
              <HelpCircle size={16} className="dash-nav-icon" />
              <span>Pedagogy & Help</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* ── Main Workspace Body ─────────────────────────────────────────── */}
      <div className="dash-main-pane">
        {/* Top Header Bar */}
        <header className="dash-topbar">
          {/* Global Search Bar */}
          <div className="dash-search-box">
            <Search size={16} className="dash-search-icon" />
            <input
              type="text"
              className="dash-search-input"
              placeholder="Search sessions, folders, and questions..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          {/* Right Action Icons */}
          <div className="dash-topbar-right">
            {/* Notification Bell */}
            <div className="dash-dropdown-anchor">
              <button
                type="button"
                className="dash-icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && <span className="dash-unread-dot" />}
              </button>

              {showNotifications && (
                <div className="dash-dropdown-panel notifications">
                  <div className="dash-dropdown-head">
                    <h4>Notifications</h4>
                    <button
                      type="button"
                      className="dash-text-link"
                      onClick={() => setUnreadCount(0)}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="dash-notif-list">
                    <div className="dash-notif-item unread">
                      <div className="dash-notif-dot" />
                      <div className="dash-notif-body">
                        <p className="dash-notif-title">DSA Contest session finalized</p>
                        <p className="dash-notif-time">142 students submitted responses · 10m ago</p>
                      </div>
                    </div>
                    <div className="dash-notif-item unread">
                      <div className="dash-notif-dot" />
                      <div className="dash-notif-body">
                        <p className="dash-notif-title">Concept Decay Alert: Binary Trees</p>
                        <p className="dash-notif-time">Retention dropped to 64% · 1h ago</p>
                      </div>
                    </div>
                    <div className="dash-notif-item">
                      <div className="dash-notif-body">
                        <p className="dash-notif-title">Stanford Medical LMS Connected</p>
                        <p className="dash-notif-time">Canvas roster synchronized · Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="dash-icon-btn"
              onClick={toggleTheme}
              title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* User Profile Avatar with Dropdown */}
            <div className="dash-dropdown-anchor">
              <button
                type="button"
                className="dash-user-avatar"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title="Adarsh Pratap Singh (AP)"
                aria-label="User profile menu"
              >
                <span>AP</span>
              </button>

              {showProfileMenu && (
                <div className="dash-dropdown-panel profile">
                  <div className="dash-profile-head">
                    <div className="dash-user-avatar large">
                      <span>AP</span>
                    </div>
                    <div className="dash-profile-details">
                      <p className="dash-user-name">Adarsh Pratap Singh</p>
                      <p className="dash-user-email">vance@stanford.edu</p>
                      <span className="dash-pro-badge">Professor Workspace</span>
                    </div>
                  </div>

                  <div className="dash-dropdown-divider" />

                  <nav className="dash-dropdown-menu">
                    <Link to="/pricing" className="dash-dropdown-item">
                      <Sparkles size={16} />
                      <span>Upgrade Plan (Pro)</span>
                    </Link>
                    <Link to="/download" className="dash-dropdown-item">
                      <Settings size={16} />
                      <span>Desktop & iPad Apps</span>
                    </Link>
                    <button
                      type="button"
                      className="dash-dropdown-item danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content Surface */}
        <main className="dash-content-area">
          {children}
        </main>
      </div>

      {/* ── Component Styling ───────────────────────────────────────────── */}
      <style>{`
        /* ── Layout Framework ── */
        .dash-container {
          display: flex;
          width: 100vw;
          min-height: 100vh;
          background-color: #FAFAFA;
          color: #0F172A;
          font-family: var(--font-body, 'Inter', -apple-system, sans-serif);
          overflow-x: hidden;
        }

        /* ── Left Sidebar ── */
        .dash-sidebar {
          width: 250px;
          flex-shrink: 0;
          background: #FFFFFF;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 16px 20px 16px;
          min-height: 100vh;
          position: sticky;
          top: 0;
          height: 100vh;
          box-sizing: border-box;
          z-index: 40;
        }

        .dash-brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #0F172A;
          padding: 4px 8px;
          margin-bottom: 22px;
        }

        .dash-brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #0F172A;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
        }

        .dash-brand-title {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0F172A;
        }

        /* Prominent New Menti / New Session Button */
        .dash-new-btn {
          width: 100%;
          height: 42px;
          border-radius: 9999px;
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
          margin-bottom: 24px;
        }

        .dash-new-btn:hover {
          background: #1E293B;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
        }

        /* Nav lists */
        .dash-nav-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dash-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 38px;
          padding: 0 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #475569;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.12s ease;
          position: relative;
        }

        .dash-nav-item:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .dash-nav-item.is-active {
          color: #0F172A;
          font-weight: 600;
          background: #F1F5F9;
        }

        /* Active blue indicator bar on left edge matching screenshot */
        .dash-nav-item.is-active::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 8px;
          bottom: 8px;
          width: 4px;
          border-radius: 4px;
          background: #2563EB;
        }

        .dash-nav-icon {
          color: #64748B;
          flex-shrink: 0;
        }

        .dash-nav-item.is-active .dash-nav-icon {
          color: #2563EB;
        }

        .dash-item-chip {
          margin-left: auto;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
          background: #E2E8F0;
          color: #475569;
          letter-spacing: 0.05em;
        }

        .dash-item-chip.ai {
          background: linear-gradient(135deg, #DBEAFE 0%, #EDE9FE 100%);
          color: #4338CA;
        }

        /* Team section */
        .dash-team-section {
          margin-top: 26px;
          padding-top: 18px;
          border-top: 1px solid #F1F5F9;
        }

        .dash-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 10px 8px;
          font-size: 12px;
          font-weight: 600;
          color: #94A3B8;
          text-transform: capitalize;
        }

        .dash-team-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 9999px;
          background: #EFF6FF;
          color: #1D4ED8;
        }

        .dash-nav-item.small {
          height: 32px;
          font-size: 12.5px;
          color: #64748B;
        }

        /* ── Main Workspace Body ── */
        .dash-main-pane {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* Top Header Bar */
        .dash-topbar {
          height: 64px;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 36px;
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .dash-search-box {
          position: relative;
          width: 100%;
          max-width: 480px;
        }

        .dash-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
        }

        .dash-search-input {
          width: 100%;
          height: 40px;
          padding: 0 14px 0 40px;
          border-radius: 9999px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          color: #0F172A;
          outline: none;
          transition: all 0.15s ease;
          box-sizing: border-box;
        }

        .dash-search-input:focus {
          background: #FFFFFF;
          border-color: #0F172A;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .dash-topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dash-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          position: relative;
        }

        .dash-icon-btn:hover {
          background: #F8FAFC;
          color: #0F172A;
          border-color: #CBD5E1;
        }

        .dash-unread-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #EF4444;
          border: 1.5px solid #FFFFFF;
        }

        .dash-user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FED7AA;
          color: #9A3412;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .dash-user-avatar:hover {
          transform: scale(1.05);
        }

        .dash-user-avatar.large {
          width: 46px;
          height: 46px;
          font-size: 16px;
        }

        /* Dropdowns */
        .dash-dropdown-anchor {
          position: relative;
        }

        .dash-dropdown-panel {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
          z-index: 100;
          overflow: hidden;
        }

        .dash-dropdown-panel.profile {
          width: 260px;
          padding: 8px;
        }

        .dash-dropdown-panel.notifications {
          width: 320px;
        }

        .dash-dropdown-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #F1F5F9;
        }

        .dash-dropdown-head h4 {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
        }

        .dash-text-link {
          background: none;
          border: none;
          color: #2563EB;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
        }

        .dash-notif-list {
          max-height: 280px;
          overflow-y: auto;
        }

        .dash-notif-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid #F8FAFC;
          font-size: 12.5px;
        }

        .dash-notif-item.unread {
          background: #F8FAFC;
        }

        .dash-notif-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563EB;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .dash-notif-title {
          margin: 0 0 2px 0;
          font-weight: 600;
          color: #0F172A;
        }

        .dash-notif-time {
          margin: 0;
          font-size: 11px;
          color: #64748B;
        }

        .dash-profile-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 10px 12px 10px;
        }

        .dash-user-name {
          margin: 0 0 2px 0;
          font-size: 13.5px;
          font-weight: 600;
          color: #0F172A;
        }

        .dash-user-email {
          margin: 0 0 4px 0;
          font-size: 11.5px;
          color: #64748B;
        }

        .dash-pro-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          color: #166534;
          background: #DCFCE7;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .dash-dropdown-divider {
          height: 1px;
          background: #F1F5F9;
          margin: 4px 0;
        }

        .dash-dropdown-menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dash-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #334155;
          font-size: 13px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
          box-sizing: border-box;
          transition: background 0.12s ease;
        }

        .dash-dropdown-item:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .dash-dropdown-item.danger:hover {
          background: #FEE2E2;
          color: #DC2626;
        }

        /* ── Content Stage ── */
        .dash-content-area {
          flex: 1;
          padding: 36px 44px 64px 44px;
          max-width: 1440px;
          box-sizing: border-box;
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .dash-container {
          background-color: #0B0E14;
          color: #F8FAFC;
        }

        [data-theme="dark"] .dash-sidebar {
          background: #0F131A;
          border-right-color: rgba(255, 255, 255, 0.07);
        }

        [data-theme="dark"] .dash-brand-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-brand-icon {
          background: #FFFFFF;
          color: #090A0E;
        }

        [data-theme="dark"] .dash-new-btn {
          background: #FFFFFF;
          color: #090A0E;
        }

        [data-theme="dark"] .dash-new-btn:hover {
          background: #F1F5F9;
        }

        [data-theme="dark"] .dash-nav-item {
          color: #94A3B8;
        }

        [data-theme="dark"] .dash-nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-nav-item.is-active {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-team-section {
          border-top-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .dash-topbar {
          background: #0F131A;
          border-bottom-color: rgba(255, 255, 255, 0.07);
        }

        [data-theme="dark"] .dash-search-input {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-search-input:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        [data-theme="dark"] .dash-icon-btn {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
        }

        [data-theme="dark"] .dash-icon-btn:hover {
          background: #1F2633;
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-dropdown-panel {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .dash-dropdown-head {
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .dash-user-name {
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-dropdown-item {
          color: #CBD5E1;
        }

        [data-theme="dark"] .dash-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        /* ── Responsive adjustments ── */
        @media (max-width: 960px) {
          .dash-sidebar {
            width: 72px;
            padding: 16px 8px;
          }
          .dash-brand-title,
          .dash-new-btn span,
          .dash-nav-item span,
          .dash-section-header,
          .dash-item-chip {
            display: none;
          }
          .dash-new-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            margin: 0 auto 20px auto;
          }
          .dash-nav-item {
            justify-content: center;
            padding: 0;
          }
          .dash-content-area {
            padding: 24px 20px 48px 20px;
          }
        }
      `}</style>
    </div>
  );
}
