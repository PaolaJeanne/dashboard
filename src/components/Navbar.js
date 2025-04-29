import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Icônes pour notifications et utilisateur
import { useNavigate } from 'react-router-dom'; // Pour gérer les redirections
import '../styles/NavBar.css';

const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // État pour le menu utilisateur
  const [notifications] = useState([
    { id: 1, message: 'Nouvelle commande reçue', details: 'Commande #1234 est prête.' },
    { id: 2, message: 'Votre facture est prête', details: 'Facture #5678 est disponible.' },
    { id: 3, message: 'Mise à jour des paramètres', details: 'Vos paramètres ont été mis à jour.' },
  ]);

  const navigate = useNavigate();

  const toggleNotificationMenu = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsUserMenuOpen(false); // Ferme le menu utilisateur si ouvert
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
    setIsNotificationOpen(false); // Ferme le menu des notifications si ouvert
  };

  const handleNotificationClick = (notification) => {
    navigate('/chat', { state: { notification } }); // Passe les détails de la notification à la page Chat
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
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)} // Passe la notification à la page Chat
                  className="notification-item"
                >
                  {notification.message.length > 30
                    ? `${notification.message.substring(0, 30)}...`
                    : notification.message}
                </li>
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
