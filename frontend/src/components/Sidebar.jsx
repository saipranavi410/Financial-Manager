import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  PieChart,
  LogOut,
  Wallet,
  Tag,
  Percent,
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Accounts', path: '/accounts', icon: CreditCard },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Budgets', path: '/budgets', icon: PieChart },
    { name: 'Categories', path: '/categories', icon: Tag },
    { name: 'Yield Calculator', path: '/investment-calculator', icon: Percent },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.brand}>
        <Wallet size={32} color="var(--accent-primary)" />

        <span style={styles.brandText}>
          Finance
          <br />
          Manager
        </span>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {}),
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    color={isActive ? '#fff' : 'var(--text-secondary)'}
                    style={styles.icon}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {user && (
        <div style={styles.footer}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div style={styles.userInfo}>
              <span style={styles.username}>{user.username}</span>
              <span style={styles.email}>{user.email}</span>
            </div>
          </div>

          <button onClick={logout} style={styles.logoutBtn}>
            <LogOut size={18} style={styles.icon} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  sidebar: {
    width: '260px',
    height: '100vh',
    overflowY: 'auto',
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(25px)',
    border: '1px solid var(--border-glass)',
    position: 'fixed',
    top: '0',
    left: '0',
    borderRadius: '0 24px 24px 0',
    boxShadow: 'var(--shadow-premium)',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1.5rem',
    zIndex: 100,
  },

  brand: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '3rem',
  },

  brandText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    lineHeight: '1.2',
    display: 'block',
    background:
      'linear-gradient(to right, var(--text-primary), var(--accent-secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  },

  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.85rem 1rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: '0.3s',
  },

  navLinkActive: {
    background: 'linear-gradient(135deg, #10b981, #047857)',
    color: '#fff',
    boxShadow: '0 8px 20px rgba(16,185,129,0.4)',
  },

  icon: {
    transition: '0.3s',
  },

  footer: {
    marginTop: 'auto',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#10b981,#34d399)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: '700',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '150px',
  },

  username: {
    fontWeight: '600',
    fontSize: '0.9rem',
    color: 'var(--text-primary)',
  },

  email: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.7rem',
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#ef4444',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
};

export default Sidebar;