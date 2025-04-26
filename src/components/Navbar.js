import React, { useState} from 'react';
import { Link, useLocation} from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = () => {
  const location = useLocation();
  const [user] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Met à jour le user à chaque changement de route
  

  const avatarUrl = user?.profile_picture 
    ? user.profile_picture 
    : '/default-avatar.png';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-bus"></i>
          BlogApp
        </Link>

        <button 
          className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>

        <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`} to="/">
              ACCUEIL
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/posts' ? 'active-link' : ''}`} to="/posts">
              POSTS
            </Link>
          </li>

          {/* Afficher DASHBOARD si l'utilisateur est admin */}
          {user?.is_staff && (
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`} to="/dashboard">
                DASHBOARD
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className="nav-item avatar-dropdown">
                <div className="avatar-wrapper">
                  <img 
                    src={avatarUrl}
                    alt="User Avatar" 
                    className="avatar"
                  />
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      <i className="fas fa-cog"></i>
                      Paramètres
                    </Link>
                  </li>
                  <li className="dropdown-divider"></li>
                  
                </ul>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/login' ? 'active-link' : ''}`} to="/login">
                  CONNEXION
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/register' ? 'active-link' : ''}`} to="/register">
                  INSCRIPTION
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
