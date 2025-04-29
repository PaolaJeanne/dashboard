import React, { useState, useEffect } from 'react';
import { 
  FiPrinter, FiClock, FiFileText, FiDownload, FiAlertCircle,
} from 'react-icons/fi';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('commandes'); // 'commandes', 'historique', 'fichiers'

  // Données simulées
  const currentOrders = [
    {
      id: 'CMD-2023-0789',
      product: 'Cartes de visite premium',
      date: '15/05/2023',
      status: 'En production',
      alert: null
    },
    {
      id: 'CMD-2023-0790',
      product: 'Flyers promotionnels',
      date: '16/05/2023',
      status: 'En attente',
      alert: 'Validation requise'
    }
  ];

  const completedOrders = [
    {
      id: 'CMD-2023-0410',
      status: 'Livrée',
      product: 'Cartes de visite',
      orderedDate: '10/04/2023',
      deliveredDate: '12/04/2023',
      rating: 5,
      feedback: 'Très satisfait de la qualité'
    },
    {
      id: 'CMD-2023-0328',
      status: 'Annulée',
      product: 'Brochures A5',
      orderedDate: '28/03/2023',
      deliveredDate: null,
      rating: null,
      feedback: null
    }
  ];

  const files = [
    { name: 'Design_A4.pdf', size: '2.3 MB', date: '20/05/2023' },
    { name: 'Logo_Vector.ai', size: '1.1 MB', date: '18/05/2023' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Chargement de votre espace...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Section Statistiques */}
      <div className="statistics-grid">
        <div className="stat-card">
          <FiPrinter className="stat-icon" />
          <div>
            <h3>{currentOrders.length}</h3>
            <p>Commandes en cours</p>
          </div>
        </div>
        <div className="stat-card">
          <FiClock className="stat-icon" />
          <div>
            <h3>{completedOrders.length}</h3>
            <p>Commandes terminées</p>
          </div>
        </div>
        <div className="stat-card">
          <FiFileText className="stat-icon" />
          <div>
            <h3>{files.length}</h3>
            <p>Fichiers récents</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Onglets de navigation */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'commandes' ? 'active' : ''}`}
            onClick={() => setActiveTab('commandes')}
          >
            <FiPrinter /> Commandes en cours
          </button>
          <button
            className={`tab-btn ${activeTab === 'historique' ? 'active' : ''}`}
            onClick={() => setActiveTab('historique')}
          >
            <FiClock /> Historique
          </button>
          <button
            className={`tab-btn ${activeTab === 'fichiers' ? 'active' : ''}`}
            onClick={() => setActiveTab('fichiers')}
          >
            <FiFileText /> Mes fichiers
          </button>
        </div>

        <div className="dashboard-content">
          {/* Section Historique */}
          {activeTab === 'historique' && (
            <div className="history-section">
              <h2>Historique des commandes</h2>
              <div className="history-grid">
                {completedOrders.map((order) => (
                  <div key={order.id} className="history-card">
                    <h3>{order.id}</h3>
                    <p className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </p>
                    <p>{order.product}</p>
                    <p>Commandé le {order.orderedDate}</p>
                    {order.deliveredDate && <p>Livrée le {order.deliveredDate}</p>}
                    {order.rating && (
                      <div className="order-rating">
                        {'★'.repeat(order.rating)}{'☆'.repeat(5 - order.rating)}
                      </div>
                    )}
                    {order.feedback && <p>"{order.feedback}"</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Commandes en cours */}
          {activeTab === 'commandes' && (
            <div className="orders-section">
              <h2>Vos commandes en cours</h2>
              <div className="orders-grid">
                {currentOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">#{order.id}</span>
                      <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-body">
                      <h3>{order.product}</h3>
                      <p className="order-date">
                        <FiClock /> {order.date}
                      </p>
                    </div>
                    {order.alert && (
                      <div className="order-alert">
                        <FiAlertCircle /> {order.alert}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Mes fichiers */}
          {activeTab === 'fichiers' && (
            <div className="files-section">
              <h2>Mes fichiers</h2>
              <div className="files-list">
                {files.map((file, index) => (
                  <div key={index} className="file-card">
                    <div className="file-info">
                      <h3>{file.name}</h3>
                      <p>{file.size}</p>
                      <p>{file.date}</p>
                    </div>
                    <button className="download-btn">
                      <FiDownload /> Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;