import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaDownload, FaEye } from 'react-icons/fa';
import '../styles/MesFactures.css';

const MesFactures = () => {
  const navigate = useNavigate();

  const factures = [
    {
      id: 'FCT-2025-001',
      commandeId: '#CMD-2025-002',
      date: '12/04/2025',
      montant: '7 500 fcfa',
      statut: 'Payée',
    },
    {
      id: 'FCT-2025-002',
      commandeId: '#CMD-2025-003',
      date: '10/04/2025',
      montant: '1 200 fcfa',
      statut: 'En attente',
    }
  ];

  const handleDownload = (factureId) => {
    // Simulation de téléchargement
    alert(`Téléchargement de la facture ${factureId}...`);
  };

  return (
    <div className="factures-container">
      <header className="factures-header">
        <h1>Mes Factures</h1>
        <p>Voici toutes les factures générées pour vos commandes.</p>
      </header>

      <div className="factures-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher une facture..."
            className="search-input"
          />
        </div>
      </div>

      <div className="factures-list">
        <div className="factures-header">
          <span className="header-item">Facture</span>
          <span className="header-item">Commande</span>
          <span className="header-item">Date</span>
          <span className="header-item">Montant</span>
          <span className="header-item">Statut</span>
          <span className="header-item">Actions</span>
        </div>

        {factures.map((facture, index) => (
          <div className="facture-card" key={index}>
            <div className="facture-id">{facture.id}</div>
            <div className="commande-id">{facture.commandeId}</div>
            <div className="facture-date">{facture.date}</div>
            <div className="facture-montant">{facture.montant}</div>
            <div className="facture-statut">{facture.statut}</div>
            <div className="facture-actions">
              <button
                className="view-button"
                onClick={() => navigate(`/facture/${facture.id}`)}
              >
                <FaEye /> Voir
              </button>
              <button
                className="download-button"
                onClick={() => handleDownload(facture.id)}
              >
                <FaDownload /> Télécharger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesFactures;
