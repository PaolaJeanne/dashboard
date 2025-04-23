import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // Statistiques client
  const stats = [
    { label: "Commandes ce mois", value: 8, trend: "up" },
    { label: "En production", value: 2 },
    { label: "Prêtes à retirer", value: 1 },
    { label: "Dépenses mensuelles", value: "247,50 FCFA", trend: "down" },
  ];

  // Dernières commandes
  const recentOrders = [
    { 
      id: 'CMD-4251', 
      date: '18/04/2025', 
      type: 'Flyers 300g brillant', 
      status: 'Terminé',
      details: '500 ex. A4 recto/verso'
    },
    { 
      id: 'CMD-4250', 
      date: '17/04/2025', 
      type: 'Brochures A5', 
      status: 'En production',
      details: '100 ex. 16 pages, reliure spirale'
    },
    { 
      id: 'CMD-4248', 
      date: '15/04/2025', 
      type: 'Cartes de visite', 
      status: 'En attente',
      details: '200 ex. vernis sélectif'
    },
  ];

  // État des fichiers récents
  const fileStatus = [
    { name: 'menu-restaurant.pdf', uploaded: '18/04 10:30', status: 'Validé' },
    { name: 'catalogue-2025.indd', uploaded: '17/04 15:12', status: 'En vérification' },
    { name: 'logo-entreprise.ai', uploaded: '16/04 09:45', status: 'Rejeté', issue: 'Problème de fond perdu' },
  ];

  return (
    <div className="dashboard printing-dashboard">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Mon espace imprimerie</h2>
        <p className="welcome-message">Bonjour Jean Dupont | Votre solde: 247,50 FCFA</p>
      </header>

      {/* KPI pour l'imprimerie */}
      <div className="stats-grid printing-stats">
        {stats.map((stat, i) => (
          <div className={`stat-card ${stat.trend ? 'with-trend' : ''}`} key={i}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
            {stat.trend && <span className={`trend-${stat.trend}`} aria-label={stat.trend === 'up' ? 'Augmentation' : 'Diminution'}></span>}
          </div>
        ))}
      </div>

      {/* Section commandes */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3 className="section-title">Vos commandes en cours</h3>
        </div>
        
        <div className="orders-list">
          {recentOrders.map((order, i) => (
            <div className={`order-card status-${order.status.replace(' ', '-').toLowerCase()}`} key={i}>
              <div className="order-main">
                <span className="order-id">{order.id}</span>
                <span className="order-date">{order.date}</span>
                <span className="order-type">{order.type}</span>
                <span className="order-status">{order.status}</span>
              </div>
              <div className="order-details">
                <p>{order.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="columns-container">
        {/* Colonne fichiers */}
        <div className="dashboard-column files-column">
          <h3 className="section-title">Vos fichiers récents</h3>
          <ul className="files-list">
            {fileStatus.map((file, i) => (
              <li key={i} className={`file-item status-${file.status.replace(' ', '-').toLowerCase()}`}>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-uploaded">Déposé le {file.uploaded}</span>
                </div>
                <div className="file-status">
                  {file.status}
                  {file.issue && <span className="file-issue">{file.issue}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne infos imprimerie */}
        <div className="dashboard-column info-column">
          <h3 className="section-title">Informations de votre imprimerie</h3>
          <div className="info-card">
            <h4>Prochains retraits</h4>
            <p className="next-pickup">CMD-4251 - Flyers - <strong>Prêt depuis le 18/04</strong></p>
          </div>
          
          <div className="info-card">
            <h4>Délais moyens</h4>
            <ul className="delays-list">
              <li>Cartes de visite: <strong>2-3 jours</strong></li>
              <li>Flyers: <strong>3-5 jours</strong></li>
              <li>Brochures: <strong>5-7 jours</strong></li>
            </ul>
          </div>
          
          <div className="info-card alert">
            <h4>Maintenance prévue</h4>
            <p>Le système sera indisponible le 25/04 de 20h à 22h pour maintenance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;