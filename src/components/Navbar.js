import React, { useState } from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import '../styles/NavBar.css';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState([
    'Nouvelle commande reçue',
    'Votre facture est prête',
    'Mise à jour des paramètres',
  ]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('Déconnexion...');
    // Ajoutez ici la logique de déconnexion
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
        {/* Icône de notification */}
        <div className="navbar-notification">
          <FaBell className="navbar-icon" />
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </div>

        {/* Icône utilisateur */}
        <div className="navbar-user">
          <FaUserCircle className="navbar-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="user-menu">
              <button onClick={() => console.log('Accéder aux paramètres')}>
                Paramètres
              </button>
              <button onClick={handleLogout}>Deconnexion</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;