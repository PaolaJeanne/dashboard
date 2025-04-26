import React, { useState } from 'react';
import { FaSearch, FaSpinner, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/MesCommandes.css';

const MesCommandes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');

  const orders = [
    {
      id: 'CMD-2025-002',
      file: 'affiche_conférence.png',
      pages: 1,
      copies: 50,
      status: 'En production',
      amount: '7 500 FCFA',
    },
    {
      id: 'CMD-2025-003',
      file: 'cv_template.docx',
      pages: 3,
      copies: 10,
      status: 'En attente',
      amount: '1 200 FCFA',
    },
    {
      id: 'CMD-2025-004',
      file: 'rapport_final.pdf',
      pages: 15,
      copies: 5,
      status: 'Terminée',
      amount: '6 500 FCFA',
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'En production':
        return <FaSpinner className="spin" style={{ color: '#e67e22', marginRight: 5 }} />;
      case 'En attente':
        return <FaClock style={{ color: '#7f8c8d', marginRight: 5 }} />;
      case 'Terminée':
        return <FaCheckCircle style={{ color: '#27ae60', marginRight: 5 }} />;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        order.file.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Tous' || order.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="print-easy-container">
      <div className="orders-section">
        <div className="orders-header">
          <h2>📋 Mes Commandes en Cours</h2>
          <p>Consultez les détails de vos commandes récentes et suivez leur statut en temps réel.</p>
        </div>

        <div className="search-filter">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-bar">
            <select
              className="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Tous">Tous les statuts</option>
              <option value="En production">En production</option>
              <option value="En attente">En attente</option>
              <option value="Terminée">Terminée</option>
            </select>
          </div>
        </div>

        <div className="orders-table">
          <div className="table-header">
            <div className="col-command">Commande</div>
            <div className="col-file">Fichier</div>
            <div className="col-details">Détails</div>
            <div className="col-status">Statut</div>
            <div className="col-amount">Montant</div>
            <div className="col-actions">Actions</div>
          </div>

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div className="table-row" key={index}>
                <div className="col-command">{order.id}</div>
                <div className="col-file">{order.file}</div>
                <div className="col-details">
                  <div>{order.pages} page{order.pages > 1 ? 's' : ''}</div>
                  <div>{order.copies} copie{order.copies > 1 ? 's' : ''}</div>
                </div>
                <div className="col-status">
                  {getStatusIcon(order.status)} {order.status}
                </div>
                <div className="col-amount">{order.amount}</div>
                <div className="col-actions">
                  <button onClick={() => navigate(`/suivi-commande/${order.id}`)}>Voir</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Aucune commande trouvée.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MesCommandes;
