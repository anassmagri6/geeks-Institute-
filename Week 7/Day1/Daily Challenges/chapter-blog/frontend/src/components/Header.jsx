import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try { await logout(); } catch { /* The local session still clears in the provider. */ }
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Chapter home" onClick={() => setMenuOpen(false)}><span className="brand-mark">▣</span><span>chapter.</span></Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <Link to="/" onClick={() => setMenuOpen(false)}>The journal</Link>
        <a href="/#design" onClick={() => setMenuOpen(false)}>Design</a>
        <a href="/#culture" onClick={() => setMenuOpen(false)}>Culture</a>
        <a href="/#travel" onClick={() => setMenuOpen(false)}>Travel</a>
      </nav>
      <div className="header-actions">
        {user ? <><span className="user-name">{user.name || user.email || 'Reader'}</span><span className="role-pill">{user.role || 'Reader'}</span>{user.role === 'admin' && <Link className="text-link" to="/admin/articles/new/edit">Write a story</Link>}<button className="icon-button" type="button" onClick={handleLogout} aria-label="Sign out">↪</button></> : <Link className="button button-primary button-small" to="/login">Sign in <span>↗</span></Link>}
      </div>
    </header>
  );
}
