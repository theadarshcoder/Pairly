import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Clock,
  User,
  Share2,
  FolderKanban,
  FileText,
  Sparkles,
  Sliders,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  Trash2,
  ExternalLink,
  MessageCircle,
  X,
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
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

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
    <div className="menti-shell">
      {/* ── Left Sidebar ────────────────────────────────────────────────── */}
      <aside className="menti-sidebar" aria-label="Main sidebar navigation">
        <div className="menti-sidebar-inner">
          {/* Logo */}
          <div className="menti-brand-row">
            <Link to="/" className="menti-brand" title="Pairly Home">
              {/* Colorful geometric logo mark matching Mentimeter/Pairly aesthetic */}
              <div className="menti-logo-icon" aria-hidden="true">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                  <rect x="2" y="10" width="6" height="14" rx="2" fill="#3B82F6" />
                  <rect x="11" y="4" width="6" height="20" rx="2" fill="#EC4899" />
                  <rect x="20" y="0" width="6" height="24" rx="2" fill="#6366F1" />
                </svg>
              </div>
              <span className="menti-brand-name">Pairly</span>
            </Link>
          </div>

          {/* New Pairly Button (Black pill with + on the right) */}
          <button
            type="button"
            className="menti-new-btn"
            onClick={onOpenCreateModal}
          >
            <span>New Pairly</span>
            <span className="menti-plus-sign">+</span>
          </button>

          {/* Primary Nav Section */}
          <nav className="menti-nav" aria-label="Personal navigation">
            <Link
              to="/dashboard"
              className={`menti-nav-link ${activeNav === 'home' ? 'is-active' : ''}`}
            >
              <Home size={18} strokeWidth={1.8} className="menti-link-icon" />
              <span>Home</span>
            </Link>

            <Link
              to="/dashboard?filter=recents"
              className={`menti-nav-link ${activeNav === 'recents' ? 'is-active' : ''}`}
            >
              <Clock size={18} strokeWidth={1.8} className="menti-link-icon" />
              <span>Recents</span>
            </Link>

            <Link
              to="/dashboard?filter=sessions"
              className={`menti-nav-link ${activeNav === 'sessions' ? 'is-active' : ''}`}
            >
              <User size={18} strokeWidth={1.8} className="menti-link-icon" />
              <span>My Pairlys</span>
            </Link>

            <Link
              to="/dashboard?filter=shared"
              className={`menti-nav-link ${activeNav === 'shared' ? 'is-active' : ''}`}
            >
              <Share2 size={18} strokeWidth={1.8} className="menti-link-icon" />
              <span>Shared with me</span>
            </Link>
          </nav>

          {/* Team Section */}
          <div className="menti-team-group">
            <div className="menti-group-title">Adarsh Pratap's team</div>

            <nav className="menti-nav" aria-label="Team navigation">
              <Link
                to="/dashboard?filter=workspace"
                className={`menti-nav-link ${location.search.includes('workspace') ? 'is-active' : ''}`}
              >
                <FolderKanban size={18} strokeWidth={1.8} className="menti-link-icon" />
                <span>Workspace Pairlys</span>
              </Link>

              <Link
                to="/dashboard?filter=templates"
                className={`menti-nav-link ${location.search.includes('templates') ? 'is-active' : ''}`}
              >
                <FileText size={18} strokeWidth={1.8} className="menti-link-icon" />
                <span>Shared templates</span>
              </Link>
            </nav>
          </div>

          {/* Deep Features Shortcut */}
          <div className="menti-team-group">
            <div className="menti-group-title">Features</div>

            <nav className="menti-nav" aria-label="Features navigation">
              <Link
                to="/dashboard/syllabus"
                className={`menti-nav-link ${activeNav === 'syllabus' ? 'is-active' : ''}`}
              >
                <Sparkles size={18} strokeWidth={1.8} className="menti-link-icon" />
                <span>Slide Synthesizer</span>
              </Link>

              <Link
                to="/dashboard/decay"
                className={`menti-nav-link ${activeNav === 'decay' ? 'is-active' : ''}`}
              >
                <Sliders size={18} strokeWidth={1.8} className="menti-link-icon" />
                <span>Concept Decay</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Utility Links */}
          <div className="menti-bottom-nav">
            <Link to="/templates" className="menti-sub-link">Templates</Link>
            <Link to="/integrations" className="menti-sub-link">Integrations</Link>
            <Link to="/tutorials" className="menti-sub-link">Tutorials</Link>
            <button type="button" className="menti-sub-link text-btn" onClick={() => setShowHelpModal(true)}>Help</button>
            <Link to="/trash" className="menti-sub-link">Trash</Link>
          </div>
        </div>
      </aside>

      {/* ── Main Content Stage ─────────────────────────────────────────── */}
      <div className="menti-main">
        {/* Top Header Bar */}
        <header className="menti-header">
          {/* Search Bar matching screenshot */}
          <div className="menti-search-box">
            <Search size={16} className="menti-search-icon" />
            <input
              type="text"
              className="menti-search-input"
              placeholder="Search Pairlys, folders, and pages"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              aria-label="Search Pairlys"
            />
          </div>

          {/* Top Right Actions */}
          <div className="menti-header-actions">
            {/* Theme Toggle */}
            <button
              type="button"
              className="menti-icon-btn"
              onClick={toggleTheme}
              title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notification Bell */}
            <div className="menti-relative">
              <button
                type="button"
                className="menti-icon-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell size={18} strokeWidth={1.9} />
                {unreadCount > 0 && <span className="menti-bell-dot" />}
              </button>

              {showNotifications && (
                <div className="menti-dropdown notifs-dropdown">
                  <div className="notif-head">
                    <span className="notif-title">Notifications</span>
                    <button
                      type="button"
                      className="notif-clear"
                      onClick={() => setUnreadCount(0)}
                    >
                      Mark as read
                    </button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item">
                      <div className="notif-indicator" />
                      <div className="notif-body">
                        <p className="notif-text"><strong>142 students</strong> completed DSA Contest: Binary Trees</p>
                        <span className="notif-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notif-item">
                      <div className="notif-body">
                        <p className="notif-text">Concept decay alert for Week 3 Recursion milestone</p>
                        <span className="notif-time">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar Circle matching screenshot (Pinkish pastel with dark AP) */}
            <div className="menti-relative">
              <button
                type="button"
                className="menti-avatar-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title="Adarsh Pratap singh"
                aria-label="Open profile menu"
              >
                <span>AP</span>
              </button>

              {showProfileMenu && (
                <div className="menti-dropdown profile-dropdown">
                  <div className="profile-card">
                    <div className="profile-avatar-large">AP</div>
                    <div className="profile-details">
                      <span className="profile-name">Adarsh Pratap singh</span>
                      <span className="profile-email">adarsh@pairly.internal</span>
                      <span className="profile-org">Stanford University</span>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-section">
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/dashboard');
                      }}
                    >
                      <Home size={15} />
                      <span>Dashboard</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/dashboard/decay');
                      }}
                    >
                      <Sliders size={15} />
                      <span>Concept Decay Matrix</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/dashboard/syllabus');
                      }}
                    >
                      <Sparkles size={15} />
                      <span>AI Slide Synthesizer</span>
                    </button>
                  </div>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="menti-content">
          {children}
        </main>
      </div>

      {/* ── Floating Help/Feedback Widget (Bottom Right with Smile & Red Dot) ── */}
      <button
        type="button"
        className="menti-floating-widget"
        onClick={() => setShowHelpModal(!showHelpModal)}
        title="Pairly Support & Quick Help"
        aria-label="Support and feedback"
      >
        {/* Smiling speech bubble icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0034 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
            fill="currentColor"
          />
          {/* Smile arc */}
          <path
            d="M8.5 13C9.5 15 13.5 15 15.5 13"
            stroke="#1B2234"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="floating-red-dot" />
      </button>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="help-modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="help-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="help-modal-header">
              <h3>Pairly Help & Quick Start</h3>
              <button type="button" className="close-help-btn" onClick={() => setShowHelpModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="help-modal-body">
              <p className="help-p">
                Welcome to Pairly! Here are three quick ways to get started in your classroom:
              </p>
              <div className="help-item">
                <span className="help-num">1</span>
                <div>
                  <strong>Start with AI:</strong> Pick any verb card above (Brainstorm, Make decisions, Check-in) to instantly generate an interactive lecture slide.
                </div>
              </div>
              <div className="help-item">
                <span className="help-num">2</span>
                <div>
                  <strong>Import Presentation:</strong> Click the import pill with the green star to bring in your PDF or PPTX slides.
                </div>
              </div>
              <div className="help-item">
                <span className="help-num">3</span>
                <div>
                  <strong>Launch Live Studio:</strong> Click "Present" on any deck to open the interactive student audience view on your projector.
                </div>
              </div>
            </div>
            <div className="help-modal-footer">
              <button type="button" className="help-primary-btn" onClick={() => setShowHelpModal(false)}>
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Global Styles ─────────────────────────────────────────────── */}
      <style>{`
        /* Reset & Layout Shell */
        .menti-shell {
          display: flex;
          min-height: 100vh;
          min-height: 100dvh;
          background: #FFFFFF;
          color: #111827;
          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif);
        }

        /* ── Sidebar ── */
        .menti-sidebar {
          width: 236px;
          min-width: 236px;
          background: #FFFFFF;
          border-right: 1px solid #EFEFEF;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100dvh;
          z-index: 20;
          user-select: none;
        }

        .menti-sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px 16px;
          overflow-y: auto;
        }

        /* Brand Row */
        .menti-brand-row {
          margin-bottom: 24px;
        }

        .menti-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #111827;
        }

        .menti-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menti-brand-name {
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #111827;
        }

        /* New Pairly Button (Black pill with + on right) */
        .menti-new-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 42px;
          background: #19191D;
          color: #FFFFFF;
          border: none;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 28px;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .menti-new-btn:hover {
          background: #2D2D34;
        }

        .menti-new-btn:active {
          transform: scale(0.98);
        }

        .menti-plus-sign {
          font-size: 16px;
          font-weight: 400;
        }

        /* Nav List */
        .menti-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .menti-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 38px;
          padding: 0 12px;
          border-radius: 6px;
          color: #374151;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          transition: background 0.12s ease, color 0.12s ease;
        }

        .menti-nav-link:hover {
          background: #F4F4F5;
          color: #111827;
        }

        /* Active Item with blue bar on the left edge */
        .menti-nav-link.is-active {
          color: #111827;
          font-weight: 600;
          background: #F4F4F5;
        }

        .menti-nav-link.is-active::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 4px;
          bottom: 4px;
          width: 3.5px;
          background: #2563EB;
          border-radius: 0 3px 3px 0;
        }

        .menti-link-icon {
          color: #6B7280;
          flex-shrink: 0;
        }

        .menti-nav-link.is-active .menti-link-icon {
          color: #111827;
        }

        /* Team & Groups */
        .menti-team-group {
          margin-top: 24px;
        }

        .menti-group-title {
          font-size: 12px;
          font-weight: 500;
          color: #9CA3AF;
          padding: 0 12px 6px 12px;
        }

        /* Bottom Utility Links */
        .menti-bottom-nav {
          margin-top: auto;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menti-sub-link {
          font-size: 13px;
          color: #6B7280;
          text-decoration: none;
          padding: 4px 12px;
          border-radius: 4px;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .menti-sub-link:hover {
          color: #111827;
          background: #F4F4F5;
        }

        /* ── Main Area ── */
        .menti-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          background: #FFFFFF;
        }

        /* Top Header */
        .menti-header {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 36px;
          background: #FFFFFF;
        }

        /* Search Box */
        .menti-search-box {
          position: relative;
          width: 380px;
          max-width: 100%;
        }

        .menti-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          pointer-events: none;
        }

        .menti-search-input {
          width: 100%;
          height: 38px;
          padding: 0 16px 0 38px;
          border-radius: 8px;
          border: none;
          background: #F3F4F6;
          color: #111827;
          font-size: 13.5px;
          font-family: inherit;
          outline: none;
          transition: background 0.15s ease, box-shadow 0.15s ease;
        }

        .menti-search-input::placeholder {
          color: #9CA3AF;
        }

        .menti-search-input:focus {
          background: #FFFFFF;
          box-shadow: 0 0 0 2px #E5E7EB;
        }

        /* Header Actions */
        .menti-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .menti-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #F3F4F6;
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .menti-icon-btn:hover {
          background: #E5E7EB;
          color: #111827;
        }

        .menti-bell-dot {
          position: absolute;
          top: 8px;
          right: 9px;
          width: 6px;
          height: 6px;
          background: #EF4444;
          border-radius: 50%;
        }

        /* Avatar Circle (Pastel pink with dark AP) */
        .menti-avatar-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #FCE7F3;
          color: #BE185D;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease, filter 0.15s ease;
        }

        .menti-avatar-btn:hover {
          filter: brightness(0.96);
          transform: scale(1.04);
        }

        .menti-relative {
          position: relative;
        }

        /* Dropdowns */
        .menti-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          z-index: 100;
          overflow: hidden;
          animation: dropFade 0.15s ease-out;
        }

        @keyframes dropFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .profile-dropdown {
          width: 250px;
          padding: 8px;
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
        }

        .profile-avatar-large {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FCE7F3;
          color: #BE185D;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .profile-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .profile-email {
          font-size: 12px;
          color: #6B7280;
        }

        .profile-org {
          font-size: 11px;
          color: #2563EB;
          font-weight: 500;
          margin-top: 2px;
        }

        .dropdown-divider {
          height: 1px;
          background: #F3F4F6;
          margin: 6px 0;
        }

        .dropdown-section {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          height: 36px;
          padding: 0 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #374151;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: background 0.12s ease;
        }

        .dropdown-item:hover {
          background: #F4F4F5;
          color: #111827;
        }

        .dropdown-item.logout {
          color: #EF4444;
        }

        .dropdown-item.logout:hover {
          background: #FEF2F2;
          color: #DC2626;
        }

        /* Notifications Dropdown */
        .notifs-dropdown {
          width: 320px;
          padding: 12px;
        }

        .notif-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid #F3F4F6;
        }

        .notif-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #111827;
        }

        .notif-clear {
          background: none;
          border: none;
          font-size: 12px;
          color: #2563EB;
          cursor: pointer;
        }

        .notif-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .notif-item {
          display: flex;
          gap: 10px;
          font-size: 12.5px;
          line-height: 1.4;
        }

        .notif-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563EB;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .notif-text {
          color: #374151;
          margin: 0;
        }

        .notif-time {
          font-size: 11px;
          color: #9CA3AF;
        }

        /* Page Content */
        .menti-content {
          padding: 16px 36px 60px 36px;
          max-width: 1280px;
          width: 100%;
        }

        /* ── Floating Support Widget (Bottom Right) ── */
        .menti-floating-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #1B2234;
          color: #FFFFFF;
          border: none;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .menti-floating-widget:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
        }

        .floating-red-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 9px;
          height: 9px;
          background: #EF4444;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
        }

        /* Help Modal */
        .help-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          backdrop-filter: blur(2px);
        }

        .help-modal-card {
          width: 460px;
          max-width: 92vw;
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          animation: popIn 0.2s ease-out;
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .help-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #F3F4F6;
        }

        .help-modal-header h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 600;
          color: #111827;
        }

        .close-help-btn {
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .close-help-btn:hover {
          color: #111827;
        }

        .help-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .help-p {
          font-size: 14px;
          color: #4B5563;
          margin: 0;
        }

        .help-item {
          display: flex;
          gap: 12px;
          font-size: 13.5px;
          color: #374151;
          line-height: 1.45;
        }

        .help-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #EFF6FF;
          color: #2563EB;
          font-weight: 700;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .help-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #F3F4F6;
          display: flex;
          justify-content: flex-end;
        }

        .help-primary-btn {
          height: 38px;
          padding: 0 20px;
          background: #19191D;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
        }

        .help-primary-btn:hover {
          background: #2D2D34;
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .menti-shell,
        [data-theme="dark"] .menti-main {
          background: #0E1015;
          color: #F3F4F6;
        }

        [data-theme="dark"] .menti-sidebar {
          background: #0E1015;
          border-right-color: #1F242E;
        }

        [data-theme="dark"] .menti-brand-name {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-new-btn {
          background: #F3F4F6;
          color: #111827;
        }

        [data-theme="dark"] .menti-new-btn:hover {
          background: #FFFFFF;
        }

        [data-theme="dark"] .menti-nav-link {
          color: #9CA3AF;
        }

        [data-theme="dark"] .menti-nav-link:hover {
          background: #181C24;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-nav-link.is-active {
          background: #181C24;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-nav-link.is-active .menti-link-icon {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-sub-link:hover {
          background: #181C24;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-header {
          background: #0E1015;
        }

        [data-theme="dark"] .menti-search-input {
          background: #181C24;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-search-input:focus {
          background: #1C212B;
          box-shadow: 0 0 0 2px #374151;
        }

        [data-theme="dark"] .menti-icon-btn {
          background: #181C24;
          color: #9CA3AF;
        }

        [data-theme="dark"] .menti-icon-btn:hover {
          background: #232936;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-dropdown {
          background: #151820;
          border-color: #272E3B;
        }

        [data-theme="dark"] .profile-name {
          color: #F9FAFB;
        }

        [data-theme="dark"] .dropdown-divider {
          background: #1F242E;
        }

        [data-theme="dark"] .dropdown-item {
          color: #D1D5DB;
        }

        [data-theme="dark"] .dropdown-item:hover {
          background: #1F242E;
          color: #FFFFFF;
        }

        [data-theme="dark"] .help-modal-card {
          background: #151820;
          border: 1px solid #272E3B;
        }

        [data-theme="dark"] .help-modal-header {
          border-bottom-color: #1F242E;
        }

        [data-theme="dark"] .help-modal-header h3 {
          color: #F9FAFB;
        }

        [data-theme="dark"] .help-modal-footer {
          border-top-color: #1F242E;
        }

        [data-theme="dark"] .help-primary-btn {
          background: #F3F4F6;
          color: #111827;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .menti-sidebar {
            width: 72px;
            min-width: 72px;
          }
          .menti-brand-name,
          .menti-new-btn span:first-child,
          .menti-nav-link span,
          .menti-group-title,
          .menti-bottom-nav {
            display: none;
          }
          .menti-new-btn {
            width: 42px;
            height: 42px;
            padding: 0;
            margin: 0 auto 24px auto;
          }
          .menti-nav-link {
            justify-content: center;
            padding: 0;
          }
          .menti-nav-link.is-active::before {
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}
