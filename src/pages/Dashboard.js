import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFileUpload, FaHistory, FaPrint, FaFilePdf, 
  FaFileImage, FaFileWord, FaBars, FaTimes 
} from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Données des statistiques
  const stats = [
    { 
      title: "Total Commandes", 
      value: 15,
      icon: <FaPrint className="stat-icon" />,
      color: "#4361ee",
      shortTitle: "Total"
    },
    { 
      title: "Commandes en Cours", 
      value: 3,
      icon: <FaHistory className="stat-icon" />,
      color: "#f8961e",
      shortTitle: "En Cours"
    },
    { 
      title: "Commandes Validées", 
      value: 12,
      icon: <FaFilePdf className="stat-icon" />,
      color: "#4cc9f0",
      shortTitle: "Validées"
    }
  ];

  // Historique des activités
  const historyEntries = [
    { 
      date: '12/04/2025', 
      shortDate: '12/04',
      file: 'rapport_stage.pdf', 
      shortFile: 'rapport.pdf',
      status: 'Validé',
      icon: <FaFilePdf className="file-icon" />,
      details: "Impression couleur, 20 pages, reliure spirale"
    },
    { 
      date: '10/04/2025',
      shortDate: '10/04', 
      file: 'affiche.png',
      shortFile: 'affiche.png',
      status: 'En cours',
      icon: <FaFileImage className="file-icon" />,
      details: "Format A2, impression sur papier brillant"
    },
    { 
      date: '02/04/2025',
      shortDate: '02/04',
      file: 'cv.docx',
      shortFile: 'cv.docx',
      status: 'En attente',
      icon: <FaFileWord className="file-icon" />,
      details: "10 exemplaires sur papier premium 120g"
    },
  ];

  // Actions rapides
  const quickActions = [
    { title: "Nouvelle Impression", icon: <FaFileUpload />, link: "/nouvelle-commande" },
    { title: "Mes Fichiers", icon: <FaFilePdf />, link: "/fichier" },
    { title: "Historique", icon: <FaHistory />, link: "/historique" }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`dashboard-container ${isMobile ? 'mobile' : ''}`}>
      {/* Bouton toggle pour mobile */}
      {isMobile && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <header className="dashboard-header">
        <h1>{isMobile ? 'Dashboard' : 'Tableau de Bord'}</h1>
        {!isMobile && (
          <p className="welcome-message">Bon retour, Jean Dupont</p>
        )}
      </header>

      {/* Actions rapides - version adaptative */}
      <div className={`quick-actions ${isMobile ? 'mobile' : ''}`}>
        {(isMobile ? quickActions.slice(0, 2) : quickActions).map((action, index) => (
          <Link 
            to={action.link} 
            key={index} 
            className="action-card"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="action-icon">{action.icon}</div>
            <span>{isMobile ? action.title.split(' ')[0] : action.title}</span>
          </Link>
        ))}
      </div>

      {/* Section Statistiques */}
      <section className="stats-section">
        <h2>{isMobile ? 'Stats' : 'Vos Statistiques'}</h2>
        <div className={`stats-grid ${isMobile ? 'mobile' : ''}`}>
          {stats.map((stat, index) => (
            <div 
              className="stat-card" 
              key={index}
              style={{ borderBottomColor: stat.color }}
            >
              <div className="stat-header">
                <div style={{ color: stat.color }}>{stat.icon}</div>
                <h3>{isMobile ? stat.shortTitle : stat.title}</h3>
              </div>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activité récente */}
      <section className="activity-section">
        <div className="section-header">
          <h2>{isMobile ? 'Activité' : 'Activité Récente'}</h2>
          <Link to="/historique" className="view-all">
            {isMobile ? 'Tout' : 'Voir tout'}
          </Link>
        </div>
        
        <div className="activity-list">
          {historyEntries.map((entry, index) => (
            <div className={`activity-card ${isMobile ? 'mobile' : ''}`} key={index}>
              <div className="activity-icon">{entry.icon}</div>
              <div className="activity-details">
                <div className="activity-header">
                  <span className="activity-date">
                    {isMobile ? entry.shortDate : entry.date}
                  </span>
                  <span className={`status-badge ${entry.status.replace(' ', '-').toLowerCase()}`}>
                    {isMobile ? entry.status.split(' ')[0] : entry.status}
                  </span>
                </div>
                <h4 className="activity-title">
                  {isMobile ? entry.shortFile : entry.file}
                </h4>
                {!isMobile && (
                  <p className="activity-description">{entry.details}</p>
                )}
              </div>
              <button className="action-btn">
                {isMobile ? '...' : 'Détails'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;