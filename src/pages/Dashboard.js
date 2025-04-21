import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileUpload, FaHistory, FaPrint, FaFilePdf, FaFileImage, FaFileWord } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // Sample statistics data
  const stats = [
    { 
      title: "Total Commandes", 
      value: 15,
      icon: <FaPrint className="stat-icon" />,
      color: "#4361ee"
    },
    { 
      title: "Commandes en Cours", 
      value: 3,
      icon: <FaHistory className="stat-icon" />,
      color: "#f8961e"
    },
    { 
      title: "Commandes Validées", 
      value: 12,
      icon: <FaFilePdf className="stat-icon" />,
      color: "#4cc9f0"
    }
  ];

  // Sample historical entries
  const historyEntries = [
    { 
      date: '12/04/2025', 
      file: 'rapport_stage.pdf', 
      status: 'Validé',
      icon: <FaFilePdf className="file-icon" />,
      details: "Impression couleur, 20 pages, reliure spirale"
    },
    { 
      date: '10/04/2025', 
      file: 'affiche.png', 
      status: 'En cours',
      icon: <FaFileImage className="file-icon" />,
      details: "Format A2, impression sur papier brillant"
    },
    { 
      date: '02/04/2025', 
      file: 'cv.docx', 
      status: 'En attente',
      icon: <FaFileWord className="file-icon" />,
      details: "10 exemplaires sur papier premium 120g"
    },
  ];

  // Quick actions
  const quickActions = [
    { title: "Nouvelle Impression", icon: <FaFileUpload />, link: "/nouvelle-commande" },
    { title: "Mes Fichiers", icon: <FaFilePdf />, link: "/fichier" },
    { title: "Historique", icon: <FaHistory />, link: "/historique" }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Tableau de Bord</h1>
        <p className="welcome-message">Bon retour, Jean Dupont</p>
      </header>

      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <Link to={action.link} key={index} className="action-card">
            <div className="action-icon">{action.icon}</div>
            <span>{action.title}</span>
          </Link>
        ))}
      </div>

      {/* Statistics Section */}
      <section className="stats-section">
        <h2>Vos Statistiques</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              className="stat-card" 
              key={index}
              style={{ borderBottom: `4px solid ${stat.color}` }}
            >
              <div className="stat-header">
                {stat.icon}
                <h3>{stat.title}</h3>
              </div>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section">
        <div className="section-header">
          <h2>Activité Récente</h2>
          <Link to="/historique" className="view-all">Voir tout</Link>
        </div>
        
        <div className="activity-list">
          {historyEntries.map((entry, index) => (
            <div className="activity-card" key={index}>
              <div className="activity-icon">{entry.icon}</div>
              <div className="activity-details">
                <div className="activity-header">
                  <span className="activity-date">{entry.date}</span>
                  <span className={`status-badge ${entry.status.replace(' ', '-').toLowerCase()}`}>
                    {entry.status}
                  </span>
                </div>
                <h4 className="activity-title">{entry.file}</h4>
                <p className="activity-description">{entry.details}</p>
              </div>
              <button className="action-btn">Détails</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;