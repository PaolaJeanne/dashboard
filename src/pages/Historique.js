import React from 'react';
import { FaSearch, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';
import '../styles/Historique.css';

const Historique = () => {
  const orders = [
    {
      id: '#CMD-2025-001',
      date: '15/04/2025',
      file: 'rapport_final.pdf',
      type: 'PDF',
      pages: 24,
      copies: 2,
      status: 'Terminé',
      amount: '1850 fcfa'
    },
    {
      id: '#CMD-2025-002',
      date: '12/04/2025',
      file: 'affiche_conférence.png',
      type: 'Image',
      pages: 1,
      copies: 50,
      status: 'En production',
      amount: '7500 fcfa'
    },
    {
      id: '#CMD-2025-003',
      date: '10/04/2025',
      file: 'cv_template.docx',
      type: 'Document',
      pages: 3,
      copies: 10,
      status: 'En attente',
      amount: '1200 fcfa'
    },
    {
      id: '#CMD-2025-004',
      date: '05/04/2025',
      file: 'mémoire.pdf',
      type: 'PDF',
      pages: 120,
      copies: 3,
      status: 'Terminé',
      amount: '8950 fcfa'
    },
    {
      id: '#CMD-2025-005',
      date: '01/04/2025',
      file: 'flyer_promo.jpg',
      type: 'Image',
      pages: 1,
      copies: 200,
      status: 'Terminé',
      amount: '15000 fcfa'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Terminé': return <FaCheckCircle className="status-icon completed" />;
      case 'En production': return <FaSpinner className="status-icon in-progress spin" />;
      case 'En attente': return <FaClock className="status-icon pending" />;
      default: return null;
    }
  };

  return (
    <div className="history-container">
      <header className="history-header">
        <h1>Historique des Commandes</h1>
        <p>Retrouvez l'ensemble de vos commandes passées</p>
      </header>

      <div className="history-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher une commande..." 
            className="search-input"
          />
        </div>
        <div className="filters">
          <select className="filter-select">
            <option value="all">Tous les statuts</option>
            <option value="completed">Terminé</option>
            <option value="in-progress">En production</option>
            <option value="pending">En attente</option>
          </select>
          <select className="filter-select">
            <option value="recent">Plus récentes</option>
            <option value="oldest">Plus anciennes</option>
            <option value="amount">Montant</option>
          </select>
        </div>
      </div>

      <div className="orders-list">
        <div className="orders-header">
          <span className="header-item">Commande</span>
          <span className="header-item">Fichier</span>
          <span className="header-item">Détails</span>
          <span className="header-item">Statut</span>
          <span className="header-item">Montant</span>
        </div>

        {orders.map((order, index) => (
          <div className={`order-card ${order.status.toLowerCase().replace(' ', '-')}`} key={index}>
            <div className="order-id">
              <span className="order-id-text">{order.id}</span>
              <span className="order-date">{order.date}</span>
            </div>
            <div className="order-file">
              <span className="file-name">{order.file}</span>
            </div>
            <div className="order-details">
              <span>{order.pages} page{order.pages > 1 ? 's' : ''}</span>
              <span>{order.copies} copie{order.copies > 1 ? 's' : ''}</span>
            </div>
            <div className="order-status">
              {getStatusIcon(order.status)}
              <span>{order.status}</span>
            </div>
            <div className="order-amount">{order.amount}</div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="page-btn disabled">&laquo;</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">&raquo;</button>
      </div>
    </div>
  );
};

export default Historique;
