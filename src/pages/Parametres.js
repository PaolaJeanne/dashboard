import React, { useState } from 'react';
import '../styles/Parametres.css';
import Logout from '../components/Logout';

const Parametres = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [address, setAddress] = useState('123 Rue de Paris, Lyon');
  const [theme, setTheme] = useState('light'); // État pour le thème

  // Gestion de la mise à jour du profil
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profil mis à jour :', { username, email });
  };

  // Gestion de la mise à jour de l'adresse
  const handleAddressUpdate = (e) => {
    e.preventDefault();
    console.log('Adresse mise à jour :', address);
  };

  // Gestion de la mise à jour du mot de passe
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    console.log('Mot de passe mis à jour');
  };

  // Gestion du changement de thème
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    console.log('Thème sélectionné :', e.target.value);
  };

  return (
    <div className="settings-page">
      <h1>Paramètres</h1>

      {/* Section Profil */}
      <section className="settings-section">
        <h2>Profil</h2>
        <form onSubmit={handleProfileUpdate}>
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
          <button type="submit" className="primary-btn">Mettre à jour le profil</button>
        </form>
      </section>

      {/* Section Adresse */}
      <section className="settings-section">
        <h2>Adresse</h2>
        <form onSubmit={handleAddressUpdate}>
          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Entrez votre adresse"
            />
          </div>
          <button type="submit" className="primary-btn">Mettre à jour l'adresse</button>
        </form>
      </section>

      {/* Section Sécurité */}
      <section className="settings-section">
        <h2>Sécurité</h2>
        <form onSubmit={handlePasswordUpdate}>
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
          <button type="submit" className="primary-btn">Mettre à jour le mot de passe</button>
        </form>
      </section>

      {/* Section Préférences */}
      <section className="settings-section">
        <h2>Préférences</h2>
        <div className="form-group">
          <label htmlFor="theme">Choisir le thème</label>
          <select id="theme" value={theme} onChange={handleThemeChange}>
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