import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Suppression du token
    localStorage.removeItem('token');
    
    // Redirection vers la page de connexion
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}>
      Déconnexion
    </button>
  );
};

export default Logout;
