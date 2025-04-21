import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFileUpload, FaHistory, FaPrint, 
  FaFilePdf, FaFileImage, FaFileWord,
  FaSearch, FaBell, FaUserCircle
} from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStat, setActiveStat] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Données des statistiques avec tendances
  const stats = [
    { 
      title: "Total Commandes", 
      value: 15,
      change: +2,
      icon: <FaPrint className="stat-icon" />,
      color: "#4361ee",
      shortTitle: "Total"
    },
    { 
      title: "Commandes en Cours", 
      value: 3,
      change: -1,
      icon: <FaHistory className="stat-icon" />,
      color: "#f8961e",
      shortTitle: "En Cours"
    },
    { 
      title: "Commandes Validées", 
      value: 12,
      change: +3,
      icon: <FaFilePdf className="stat-icon" />,
      color: "#4cc9f0",
      shortTitle: "Validées"
    }
  ];

  // Historique des activités avec statut plus détaillé
  const historyEntries = [
    { 
      id: 1,
      date: '12/04/2025', 
      shortDate: '12/04',
      file: 'rapport_stage.pdf', 
      shortFile: 'rapport.pdf',
      status: 'Validé',
      progress: 100,
      icon: <FaFilePdf className="file-icon" />,
      details: "Impression couleur, 20 pages, reliure spirale",
      price: "24,50 €"
    },
    { 
      id: 2,
      date: '10/04/2025',
      shortDate: '10/04', 
      file: 'affiche.png',
      shortFile: 'affiche.png',
      status: 'En cours',
      progress: 65,
      icon: <FaFileImage className="file-icon" />,
      details: "Format A2, impression sur papier brillant",
      price: "12,00 €"
    },
    { 
      id: 3,
      date: '02/04/2025',
      shortDate: '02/04',
      file: 'cv.docx',
      shortFile: 'cv.docx',
      status: 'En attente',
      progress: 0,
      icon: <FaFileWord className="file-icon" />,
      details: "10 exemplaires sur papier premium 120g",
      price: "15,75 €"
    },
  ];

  // Actions rapides améliorées
  const quickActions = [
    { 
      title: "Nouvelle Impression", 
      icon: <FaFileUpload />, 
      link: "/nouvelle-commande",
      description: "Démarrer une nouvelle commande d'impression"
    },
    { 
      title: "Mes Fichiers", 
      icon: <FaFilePdf />, 
      link: "/fichier",
      description: "Gérer vos fichiers sauvegardés"
    },
    { 
      title: "Historique", 
      icon: <FaHistory />, 
      link: "/historique",
      description: "Voir l'historique complet de vos commandes"
    }
  ];

  // Filtrer les activités si recherche activée
  const filteredActivities = searchQuery
    ? historyEntries.filter(entry => 
        entry.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchQuery.toLowerCase()))
    : historyEntries;

  return (
    <div className={`dashboard-container ${isMobile ? 'mobile' : ''}`}>
      {/* Header amélioré avec recherche et notifications */}
      <header className="dashboard-header">
        <div className="header-top">
          <h1>{isMobile ? 'Dashboard' : 'Tableau de Bord'}</h1>
          <div className="header-actions">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <FaUserCircle />
              <span>Jean Dupont</span>
            </div>
          </div>
        </div>
        
        {!isMobile && (
          <p className="welcome-message">Bon retour, qu'aimeriez-vous faire aujourd'hui ?</p>
        )}
      </header>

      {/* Actions rapides avec descriptions */}
      <section className="quick-actions-section">
        <h2>Actions Rapides</h2>
        <div className={`quick-actions ${isMobile ? 'mobile' : ''}`}>
          {quickActions.map((action, index) => (
            <Link to={action.link} key={index} className="action-card">
              <div className="action-icon-wrapper">
                <div className="action-icon">{action.icon}</div>
              </div>
              <div className="action-content">
                <h3>{isMobile ? action.title.split(' ')[0] : action.title}</h3>
                {!isMobile && <p>{action.description}</p>}
              </div>
              {!isMobile && <FiChevronRight className="action-arrow" />}
            </Link>
          ))}
        </div>
      </section>

      {/* Section Statistiques interactive */}
      <section className="stats-section">
        <div className="section-header">
          <h2>Vos Statistiques</h2>
          <div className="time-filters">
            <button className={activeStat === 'week' ? 'active' : ''}>7j</button>
            <button className={activeStat === 'month' ? 'active' : ''}>30j</button>
            <button className={activeStat === 'year' ? 'active' : ''}>1an</button>
          </div>
        </div>
        
        <div className={`stats-grid ${isMobile ? 'mobile' : ''}`}>
          {stats.map((stat, index) => (
            <div 
              className={`stat-card ${activeStat === stat.title.toLowerCase() ? 'active' : ''}`}
              key={index}
              style={{ borderBottomColor: stat.color }}
              onClick={() => setActiveStat(stat.title.toLowerCase())}
            >
              <div className="stat-header">
                <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20` }}>
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>
                <div>
                  <h3>{isMobile ? stat.shortTitle : stat.title}</h3>
                  <p className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </p>
                </div>
              </div>
              <div className="stat-value-wrapper">
                <p className="stat-value">{stat.value}</p>
                <div className="stat-trend">
                  {/* Icône de tendance pourrait être ajoutée ici */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activité récente améliorée */}
      <section className="activity-section">
        <div className="section-header">
          <h2>Activité Récente</h2>
          <div className="activity-controls">
            <Link to="/historique" className="view-all">
              {isMobile ? 'Tout voir' : 'Voir tout l\'historique'}
            </Link>
          </div>
        </div>
        
        <div className="activity-list">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((entry) => (
              <div className={`activity-card ${isMobile ? 'mobile' : ''}`} key={entry.id}>
                <div className="activity-icon">{entry.icon}</div>
                <div className="activity-details">
                  <div className="activity-header">
                    <div>
                      <span className="activity-date">
                        {isMobile ? entry.shortDate : entry.date}
                      </span>
                      <h4 className="activity-title">
                        {isMobile ? entry.shortFile : entry.file}
                      </h4>
                    </div>
                    <span className={`status-badge ${entry.status.replace(' ', '-').toLowerCase()}`}>
                      {isMobile ? entry.status.split(' ')[0] : entry.status}
                    </span>
                  </div>
                  
                  {!isMobile && (
                    <>
                      <p className="activity-description">{entry.details}</p>
                      <div className="activity-meta">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${entry.progress}%`,
                              backgroundColor: entry.progress === 100 ? '#2ecc71' : 
                                            entry.progress > 50 ? '#4cc9f0' : '#f8961e'
                            }}
                          ></div>
                        </div>
                        <span className="activity-price">{entry.price}</span>
                      </div>
                    </>
                  )}
                </div>
                <button className="action-btn">
                  {isMobile ? '...' : 'Détails'}
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              Aucun résultat trouvé pour "{searchQuery}"
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;