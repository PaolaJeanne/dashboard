import React, { useState, useEffect } from 'react';
import '../styles/Parametres.css';
import Logout from '../components/Logout';
import { FaUser, FaMapMarkerAlt, FaLock, FaPalette, FaSignOutAlt } from 'react-icons/fa';

const Parametres = () => {
  // États initiaux avec localStorage pour persistance
  const [username, setUsername] = useState(() => localStorage.getItem('username') || 'John Doe');
  const [email, setEmail] = useState(() => localStorage.getItem('email') || 'johndoe@example.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState(() => localStorage.getItem('address') || '123 Rue de Paris, Lyon');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : { email: true, sms: false, push: true };
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Persister les changements dans localStorage
  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Appliquer le thème au body
    document.body.className = theme;
  }, [username, email, address, theme, notifications]);

  // Valider le formulaire
  const validateForm = (type) => {
    const newErrors = {};
    
    if (type === 'password') {
      if (!oldPassword) newErrors.oldPassword = 'Ancien mot de passe requis';
      if (!newPassword) newErrors.newPassword = 'Nouveau mot de passe requis';
      if (newPassword.length < 8) newErrors.newPassword = 'Minimum 8 caractères';
      if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (type === 'profile' && !username) newErrors.username = 'Nom requis';
    if (type === 'profile' && !email.includes('@')) newErrors.email = 'Email invalide';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la mise à jour du profil
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!validateForm('profile')) return;
    
    console.log('Profil mis à jour :', { username, email });
    showSuccess('Profil mis à jour avec succès');
  };

  // Gestion de la mise à jour de l'adresse
  const handleAddressUpdate = (e) => {
    e.preventDefault();
    if (!address) {
      setErrors({...errors, address: 'Adresse requise'});
      return;
    }
    
    console.log('Adresse mise à jour :', address);
    showSuccess('Adresse mise à jour avec succès');
  };

  // Gestion de la mise à jour du mot de passe
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!validateForm('password')) return;
    
    console.log('Mot de passe mis à jour');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showSuccess('Mot de passe mis à jour avec succès');
  };

  // Gestion du changement de thème
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    console.log('Thème sélectionné :', newTheme);
    showSuccess(`Thème ${newTheme} appliqué`);
  };

  // Gestion des notifications
  const handleNotificationChange = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  // Afficher un message de succès temporaire
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className={`settings-page ${theme}`}>
      <h1 className="settings-title">
        <FaUser className="icon" /> Paramètres du compte
      </h1>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Section Profil */}
      <section className="settings-section">
        <h2>
          <FaUser className="section-icon" /> Profil
        </h2>
        <form onSubmit={handleProfileUpdate}>
          <div className={`form-group ${errors.username ? 'error' : ''}`}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre e-mail"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <button type="submit" className="primary-btn">
            Mettre à jour le profil
          </button>
        </form>
      </section>

      {/* Section Adresse */}
      <section className="settings-section">
        <h2>
          <FaMapMarkerAlt className="section-icon" /> Adresse
        </h2>
        <form onSubmit={handleAddressUpdate}>
          <div className={`form-group ${errors.address ? 'error' : ''}`}>
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Entrez votre adresse complète"
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <button type="submit" className="primary-btn">
            Mettre à jour l'adresse
          </button>
        </form>
      </section>

      {/* Section Sécurité */}
      <section className="settings-section">
        <h2>
          <FaLock className="section-icon" /> Sécurité
        </h2>
        <form onSubmit={handlePasswordUpdate}>
          <div className={`form-group ${errors.oldPassword ? 'error' : ''}`}>
            <label htmlFor="old-password">Ancien mot de passe</label>
            <input
              type="password"
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Entrez votre ancien mot de passe"
            />
            {errors.oldPassword && <span className="error-message">{errors.oldPassword}</span>}
          </div>
          <div className={`form-group ${errors.newPassword ? 'error' : ''}`}>
            <label htmlFor="new-password">Nouveau mot de passe</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 caractères"
            />
            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
          </div>
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Retapez votre nouveau mot de passe"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="primary-btn">
            Mettre à jour le mot de passe
          </button>
        </form>
      </section>

      {/* Section Préférences */}
      <section className="settings-section">
        <h2>
          <FaPalette className="section-icon" /> Préférences
        </h2>
        <div className="form-group">
          <label htmlFor="theme">Thème de l'application</label>
          <select 
            id="theme" 
            value={theme} 
            onChange={handleThemeChange}
            className="theme-selector"
          >
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
            <option value="system">Système</option>
          </select>
        </div>
        
        <div className="notifications-group">
          <label>Notifications</label>
          <div className="notification-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              <span>Email</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => handleNotificationChange('sms')}
              />
              <span>SMS</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              <span>Notifications push</span>
            </label>
          </div>
        </div>
      </section>

      {/* Section Déconnexion */}
      <section className="settings-section logout-section">
        <h2>
          <FaSignOutAlt className="section-icon" /> Déconnexion
        </h2>
        <div className="logout-button">
          <Logout />
        </div>
      </section>
    </div>
  );
};

export default Parametres;