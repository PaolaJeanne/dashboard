import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Jean Dupont",
    isGuest: false,
    lastLocation: "18 Rue de l'Imprimerie, Lyon"
  });

  // Commandes récentes (simulées)
  const [recentCommands, setRecentCommands] = useState([
    { id: 101, file: "Rapport_2023.pdf", status: "livré", date: "15/10/2023" },
    { id: 102, file: "Flyer_Promo.pdf", status: "en production", date: "18/10/2023" }
  ]);

  const addCommand = () => {
    setRecentCommands(prevCommands => [
      ...prevCommands,
      { id: 103, file: "Nouvelle_Commande.pdf", status: "en attente", date: "21/04/2025" }
    ]);
  };

  // Actions rapides
  const quickActions = [
    { icon: "🖨️", label: "Nouvelle impression", action: () => navigate('/nouvelle-commande') },
    { icon: "📦", label: "Suivi livraison", action: () => navigate('/mes-commandes?filter=shipping') },
    { icon: "📝", label: "Modifier mon profil", action: () => navigate('/parametres') },
    { icon: "🗺️", label: "Changer adresse", action: () => navigate('/profil?tab=location') }
  ];

  return (
    <div className="dashboard-container">
      {/* Header personnalisé */}
      <header className="dashboard-header">
        <div className="user-welcome">
          <h1>Bonjour, {user.name}</h1>
          <p>{user.isGuest ? "Mode invité - " : ""}Dernière livraison : {user.lastLocation}</p>
        </div>
        <div className="user-avatar">👤</div>
      </header>

      {/* Section Actions Rapides */}
      <section className="quick-actions">
        <h2>Actions rapides</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <button 
              key={index} 
              className="action-card"
              onClick={action.action}
            >
              <span className="action-icon">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Section Commandes Récentes */}
      <section className="recent-commands">
        <div className="section-header">
          <h2>Vos commandes récentes</h2>
          <button 
            className="see-all-btn"
            onClick={() => navigate('/mes-commandes')}
          >
            Voir tout →
          </button>
        </div>
        
        <div className="commands-list">
          {recentCommands.map(cmd => (
            <div key={cmd.id} className={`command-card ${cmd.status}`}>
              <div className="file-info">
                <span className="file-icon">📄</span>
                <div>
                  <h3>{cmd.file}</h3>
                  <p>Commande #{cmd.id} • {cmd.date}</p>
                </div>
              </div>
              <div className="command-status">
                <span className="status-badge">{cmd.status}</span>
                <button 
                  className="detail-btn"
                  onClick={() => navigate(`/mes-commandes?command=${cmd.id}`)}
                >
                  Détails
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addCommand}>Ajouter une commande</button>
      </section>

      {/* Section Statistiques */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>Commandes ce mois</h3>
          <p className="stat-value">8</p>
          <p className="stat-comparison">+2 vs mois dernier</p>
        </div>
        <div className="stat-card">
          <h3>Économies</h3>
          <p className="stat-value">24€</p>
          <p className="stat-comparison">Avec votre abonnement</p>
        </div>
        <div className="stat-card">
          <h3>Fidélité</h3>
          <p className="stat-value">Gold</p>
          <p className="stat-comparison">150 points</p>
        </div>
      </section>

      {/* Footer contextuel */}
      <footer className="context-footer">
        <p>Besoin d'aide ? Contactez notre support : <a href="mailto:support@imprimerie.com">support@imprimerie.com</a></p>
      </footer>
    </div>
  );
};

export default Dashboard;