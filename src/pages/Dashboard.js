import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiPrinter, 
  FiClock, FiCheckCircle, FiTruck, FiPackage, 
  FiUpload, FiCalendar, FiAlertCircle, FiDownload 
} from 'react-icons/fi';
import '../styles/Dashboard.css';

const DashboardClient = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Données du client particulier
  const clientInfo = {
    name: "M. Ernest Hans",
    type: "Client",
    email: "ernest@email.com",
    phone: "676 543 210",
    address: "Rue Joss, Bonapriso",
    joinDate: "Membre depuis mars 2023",
    ordersCompleted: 5,
    favoriteProduct: "Cartes de visite"
  };

  // Commandes en cours
  const currentOrders = [
    {
      id: 'CMD-2023-0515',
      date: '15/05/2023',
      product: "Cartes de visite premium",
      files: [
        { name: 'carte-visite-v2.pdf', type: 'PDF', size: '1.8 MB' }
      ],
      specifications: {
        format: '85x55mm',
        quantity: '200 ex.',
        paper: 'Carton 300g',
        finish: 'Vernis sélectif logo'
      },
      status: 'En impression',
      progress: 45,
      delivery: {
        type: 'Retrait en magasin',
        location: 'Agence Dakar Plateau',
        estimatedDate: '18/05/2023',
        hours: '9h-17h'
      }
    },
    {
      id: 'CMD-2023-0510',
      date: '10/05/2023',
      product: "Flyers promotionnels",
      files: [
        { name: 'flyer-ete.psd', type: 'PSD', size: '8.4 MB' }
      ],
      specifications: {
        format: 'A5',
        quantity: '500 ex.',
        paper: 'Brillant 135g',
        finish: 'Pelliculage recto'
      },
      status: 'En préparation',
      progress: 20,
      delivery: {
        type: 'Livraison à domicile',
        address: clientInfo.address,
        estimatedDate: '20/05/2023'
      },
      alerts: ['Vérification des couleurs nécessaire']
    }
  ];

  // Historique des commandes
  const orderHistory = [
    {
      id: 'CMD-2023-0410',
      date: '10/04/2023',
      product: 'Cartes de visite',
      files: [
        { name: 'cartes-visite.pdf', type: 'PDF', size: '1.2 MB' }
      ],
      status: 'Livrée',
      deliveryDate: '12/04/2023',
      rating: 4,
      feedback: 'Très satisfait de la qualité'
    },
    {
      id: 'CMD-2023-0328',
      date: '28/03/2023',
      product: 'Brochures A5',
      files: [
        { name: 'brochure.psd', type: 'PSD', size: '15.4 MB' }
      ],
      status: 'Annulée',
      reason: 'Fichier non conforme',
      refund: 'Remboursement effectué'
    }
  ];

  // Fichiers récents
  const recentFiles = [
    {
      name: 'menu-restaurant.pdf',
      type: 'PDF',
      uploaded: '24/04/2023 14:30',
      status: 'Validé',
      size: '4.2 MB',
      orderRef: 'CMD-2023-0425',
      preview: '#'
    },
    {
      name: 'presentation.psd',
      type: 'PSD',
      uploaded: '23/04/2023 09:15',
      status: 'En vérification',
      size: '18.7 MB',
      issues: 'Résolution insuffisante (72dpi)',
      action: 'Modification requise'
    }
  ];

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="printing-dashboard night-blue">
      {/* Header */}
      <header className="dashboard-header">
        <div className="client-profile">
          <div className="avatar">
            <FiUser size={25} />
          </div>
          <div className="client-info">
            <h1>{clientInfo.name}</h1>
            <div className="client-meta">
              <span className="account-type">{clientInfo.type}</span>
              <span className="favorite-product">
                <FiCheckCircle /> Produit préféré: {clientInfo.favoriteProduct}
              </span>
            </div>
          </div>
        </div>
        <div className="client-contact">
          <p><FiMail /> {clientInfo.email}</p>
          <p><FiPhone /> {clientInfo.phone}</p>
          <p><FiMapPin /> {clientInfo.address}</p>
        </div>
      </header>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiClock size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{currentOrders.length}</span>
            <span className="stat-label">En cours</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiCheckCircle size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{clientInfo.ordersCompleted}</span>
            <span className="stat-label">Terminées</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiAlertCircle size={22} />
          </div>
          <div className="stat-content">
            <span className="stat-value">1</span>
            <span className="stat-label">Alertes</span>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          <FiPrinter /> Commandes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FiCheckCircle /> Historique
        </button>
        <button 
          className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          <FiUpload /> Fichiers
        </button>
      </div>

      {/* Contenu principal */}
      <main className="dashboard-main">
        {activeTab === 'current' && (
          <section className="current-orders">
            <h2>
              <FiClock /> Mes commandes en cours
              <span className="badge">{currentOrders.length}</span>
            </h2>
            <div className="orders-list">
              {currentOrders.map((order) => (
                <div
                  className={`order-card ${order.status.toLowerCase().replace(' ', '-')} ${
                    expandedOrder === order.id ? 'expanded' : ''
                  }`}
                  key={order.id}
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div className="order-summary">
                    <div className="order-header">
                      <div className="order-info">
                        <span className="order-id">{order.id}</span>
                        <h3 className="order-product">{order.product}</h3>
                      </div>
                      <span className="order-status">{order.status}</span>
                    </div>
                    <div className="order-meta">
                      <p className="order-date">
                        <FiCalendar /> Commandé le {order.date}
                      </p>
                      <div className="progress-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                        <span className="progress-text">{order.progress}%</span>
                      </div>
                    </div>
                  </div>
                  {expandedOrder === order.id && (
                    <div className="order-details">
                      <div className="details-section">
                        <h4>Détails techniques</h4>
                        <div className="specs-grid">
                          {Object.entries(order.specifications).map(([key, value]) => (
                            <div className="spec-item" key={key}>
                              <span className="spec-label">{key}</span>
                              <span className="spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="details-section">
                        <h4>Fichiers associés</h4>
                        <div className="files-list">
                          {order.files.map((file, idx) => (
                            <div className="file-item" key={idx}>
                              <div className="file-icon">
                                <FiPackage />
                              </div>
                              <div className="file-info">
                                <p className="file-name">{file.name}</p>
                                <p className="file-meta">
                                  {file.type} • {file.size}
                                </p>
                              </div>
                              <button className="download-btn">
                                <FiDownload size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="details-section">
                        <h4>
                          <FiTruck /> Livraison
                        </h4>
                        <div className="delivery-info">
                          <p>
                            <strong>Mode:</strong> {order.delivery.type}
                          </p>
                          {order.delivery.address && (
                            <p>
                              <strong>Adresse:</strong> {order.delivery.address}
                            </p>
                          )}
                          {order.delivery.location && (
                            <p>
                              <strong>Point de retrait:</strong> {order.delivery.location}
                            </p>
                          )}
                          <p>
                            <strong>Date estimée:</strong> {order.delivery.estimatedDate}
                          </p>
                          {order.delivery.hours && (
                            <p>
                              <strong>Heures d'ouverture:</strong> {order.delivery.hours}
                            </p>
                          )}
                        </div>
                      </div>
                      {order.alerts && (
                        <div className="alert-message">
                          <FiAlertCircle size={20} />
                          <p>{order.alerts[0]}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'history' && (
          <section className="order-history">
            <h2>
              <FiCheckCircle /> Historique des commandes
              <span className="badge">{orderHistory.length}</span>
            </h2>
            <div className="history-list">
              {orderHistory.map((order) => (
                <div className="history-card" key={order.id}>
                  <div className="history-header">
                    <span className="order-id">{order.id}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="history-body">
                    <h3 className="order-product">{order.product}</h3>
                    <p className="order-date">
                      <FiCalendar /> Commandé le {order.date}
                    </p>
                    {order.deliveryDate && (
                      <p className="delivery-date">
                        <FiTruck /> Livrée le {order.deliveryDate}
                      </p>
                    )}
                    {order.rating && (
                      <div className="order-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < order.rating ? 'filled' : ''}`} />
                        ))}
                      </div>
                    )}
                    {order.feedback && <p className="feedback">" {order.feedback} "</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'files' && (
          <section className="recent-files">
            <h2>
              <FiUpload /> Fichiers récents
            </h2>
            <div className="files-list">
              {recentFiles.map((file, idx) => (
                <div className="file-item" key={idx}>
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-meta">
                      {file.type} • {file.size}
                    </p>
                    <p className="file-uploaded">
                      <FiClock /> {file.uploaded}
                    </p>
                    {file.status && (
                      <span className={`status ${file.status.toLowerCase()}`}>
                        {file.status}
                      </span>
                    )}
                    {file.issues && (
                      <p className="file-issues">
                        <FiAlertCircle /> {file.issues}
                      </p>
                    )}
                    {file.action && (
                      <p className="file-action">
                        <FiAlertCircle /> {file.action}
                      </p>
                    )}
                  </div>
                  <button className="download-btn">
                    <FiDownload size={16} />
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default DashboardClient;
