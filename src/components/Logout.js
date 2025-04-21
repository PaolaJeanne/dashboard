import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    console.log('Déconnexion...');
    // Future : vider le token, rediriger, etc.
  };

  return (
    <button onClick={handleLogout} style={{
      backgroundColor: '#e74c3c',
      border: 'none',
      color: '#fff',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '4px'
    }}>
      Déconnexion
    </button>
  );
};

export default LogoutButton;
