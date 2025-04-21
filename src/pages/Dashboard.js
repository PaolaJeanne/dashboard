import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Jean Dupont",
    isGuest: false,
    lastLocation: "18 Rue de l'Imprimerie, Lyon"
  });

  const [recentCommands] = useState([
    { id: 101, file: "Rapport_2023.pdf", status: "livré", date: "15/10/2023" },
    { id: 102, file: "Flyer_Promo.pdf", status: "en production", date: "18/10/2023" },
    { id: 103, file: "Nouvelle_Commande.pdf", status: "en attente", date: "21/04/2025" }
  ]);

  const quickActions = [
    { icon: "🖨️", label: "Nouvelle impression", action: () => navigate('/nouvelle-commande') },
    { icon: "📦", label: "Suivi livraison", action: () => navigate('/mes-commandes?filter=shipping') },
    { icon: "📝", label: "Modifier mon profil", action: () => navigate('/parametres') },
    { icon: "🗺️", label: "Changer adresse", action: () => navigate('/profil?tab=location') }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-welcome">
          <h1>Bonjour, {user.name}</h1>
          <p>{user.isGuest ? "Mode invité - " : ""}Dernière livraison : {user.lastLocation}</p>
        </div>
        <div className="user-avatar">👤</div>
      </header>

      {/* Quick Actions and Stats */}
      <section className="top-section">
        <div className="quick-actions">
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
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <h3>Total des commandes</h3>
            <p className="stat-value">25</p>
            <p className="stat-comparison">Depuis votre inscription</p>
          </div>
          <div className="stat-card">
            <h3>Commandes en cours</h3>
            <p className="stat-value">3</p>
            <p className="stat-comparison">Dont 1 en production</p>
          </div>
          <div className="stat-card">
            <h3>Économies réalisées</h3>
            <p className="stat-value">1200fcfa</p>
            <p className="stat-comparison">Grâce à vos abonnements</p>
          </div>
        </div>
      </section>

      {/* Recent Commands */}
      <section className="recent-commands">
        <div className="section-header">
          <h2>Commandes récentes</h2>
          <a 
            href="/mes-commandes" 
            className="see-all-link"
          >
            Voir tout →
          </a>
        </div>
        
        <table className="commands-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fichier</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentCommands.map(cmd => (
              <tr key={cmd.id}>
                <td>{cmd.id}</td>
                <td>{cmd.file}</td>
                <td>
                  <span className={`status-badge ${cmd.status.replace(' ', '-').toLowerCase()}`}>
                    {cmd.status}
                  </span>
                </td>
                <td>{cmd.date}</td>
                <td>
                  <button 
                    className="detail-btn"
                    onClick={() => navigate(`/mes-commandes?command=${cmd.id}`)}
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="context-footer">
        <p>Besoin d'aide ? Contactez notre support : <a href="mailto:support@imprimerie.com">support@imprimerie.com</a></p>
      </footer>
    </div>
  );
};

export default Dashboard;