import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Icônes pour notifications et utilisateur
import { useNavigate } from 'react-router-dom'; // Pour gérer les redirections
import '../styles/NavBar.css';

const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // État pour le menu utilisateur
  const [notifications] = useState([
    'Nouvelle commande reçue',
    'Votre facture est prête',
    'Mise à jour des paramètres',
  ]);

  const navigate = useNavigate();

  const toggleNotificationMenu = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('Déconnexion...');
    // Logique de déconnexion ici
    localStorage.removeItem('userToken'); // Exemple de suppression d'un token
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
        {/* Icône de notification */}
        <div className="navbar-notification" onClick={toggleNotificationMenu}>
          <FaBell className="navbar-icon" />
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </div>

        {/* Menu notifications */}
        {isNotificationOpen && (
          <div className="notification-menu">
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Icône utilisateur */}
        <div className="navbar-user" onClick={toggleUserMenu}>
          <FaUserCircle className="navbar-icon" />
        </div>

        {/* Menu utilisateur */}
        {isUserMenuOpen && (
          <div className="user-menu">
            <button onClick={() => navigate('/parametres')}>Paramètres</button>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
