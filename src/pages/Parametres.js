import React, { useState } from 'react';
import '../styles/Parametres.css';
import Logout from '../components/Logout';

const Parametres = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [oldPassword, setOldPassword] = useState(''); // Ancien mot de passe
  const [newPassword, setNewPassword] = useState(''); // Nouveau mot de passe

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle updating profile
    console.log('Profil mis à jour');
  };

  const handlePasswordChange = () => {
    // Logic to handle password change
    console.log('Mot de passe mis à jour');
  };

  return (
    <div className="settings-page">
      <h1>Paramètres</h1>
      
      {/* Section Profil */}
      <section className="settings-section">
        <h2>Profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre e-mail"
            />
          </div>
          <div className="form-group">
            <button type="submit">Mettre à jour le profil</button>
          </div>
        </form>
      </section>

      {/* Section Sécurité */}
      <section className="settings-section">
        <h2>Sécurité</h2>
        <div className="form-group">
          <label htmlFor="old-password">Ancien mot de passe</label>
          <input
            type="password"
            id="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Entrez votre ancien mot de passe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">Nouveau mot de passe</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Entrez votre nouveau mot de passe"
          />
        </div>
        <div className="form-group">
          <button onClick={handlePasswordChange}>Mettre à jour le mot de passe</button>
        </div>
      </section>

      {/* Section Préférences */}
      <section className="settings-section">
        <h2>Préférences</h2>
        <div className="form-group">
          <label htmlFor="theme">Choisir le thème</label>
          <select id="theme">
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
      </section>

      {/* Section Déconnexion */}
      <section className="settings-section logout-section">
        <h2>Déconnexion</h2>
        <div className="logout-button">
          <Logout />
        </div>
      </section>
    </div>
  );
};

export default Parametres;