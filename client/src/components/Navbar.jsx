import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { logout as logoutAPI } from '../services/authService.js';
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (e) {}
    logout();
    showToast('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">⚡ NxtBuild</Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          My Projects
        </Link>
        {user && (
          <div className="navbar-user">
            <div className="navbar-avatar">{user.name?.[0]?.toUpperCase()}</div>
            <span className="navbar-username">{user.name}</span>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;