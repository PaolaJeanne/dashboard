import React from 'react';
import { FaSearch, FaSpinner, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/MesCommandes.css';

const MesCommandes = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 'CMD-2025-002',
      file: 'affiche_conférence.png',
      pages: 1,
      copies: 50,
      status: 'En production',
      amount: '7500 fcfa'
    },
    {
      id: 'CMD-2025-003',
      file: 'cv_template.docx',
      pages: 3,
      copies: 10,
      status: 'En attente',
      amount: '1200 fcfa'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'En production': return <FaSpinner className="spin" style={{color: '#e67e22', marginRight: '5px'}} />;
      case 'En attente': return <FaClock style={{color: '#7f8c8d', marginRight: '5px'}} />;
      default: return null;
    }
  };

  return (
    <div className="print-easy-container">
      <div className="orders-section">
        <h2>Mes Commandes en Cours</h2>
        <p>Voici les commandes que vous avez passées récemment.</p>
        
        <div className="search-filter">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Rechercher une commande..." />
          </div>
          <select>
            <option>Tous les statuts</option>
            <option>En production</option>
            <option>En attente</option>
          </select>
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

          {orders.map((order, index) => (
            <div className="table-row" key={index}>
              <div className="col-command">{order.id}</div>
              <div className="col-file">{order.file}</div>
              <div className="col-details">
                <div>{order.pages} page{order.pages > 1 ? 's' : ''}</div>
                <div>{order.copies} copie{order.copies > 1 ? 's' : ''}</div>
              </div>
              <div className="col-status">
                {getStatusIcon(order.status)}
                {order.status}
              </div>
              <div className="col-amount">{order.amount}</div>
              <div className="col-actions">
                <button onClick={() => navigate(`/facture/${order.id}`)}>Voir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesCommandes;