import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaDownload, FaEye, FaFilter, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import '../styles/MesFactures.css';

const MesFactures = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Données des factures
  const factures = useMemo(() => [
    {
      id: 'FCT-2025-001',
      commandeId: 'CMD-2025-002',
      date: '12/04/2025',
      montant: 7500,
      statut: 'Payée',
      statutColor: 'success',
    },
    {
      id: 'FCT-2025-002',
      commandeId: 'CMD-2025-003',
      date: '10/04/2025',
      montant: 1200,
      statut: 'En attente',
      statutColor: 'warning',
    },
    {
      id: 'FCT-2025-003',
      commandeId: 'CMD-2025-004',
      date: '15/04/2025',
      montant: 3800,
      statut: 'Annulée',
      statutColor: 'danger',
    },
    {
      id: 'FCT-2025-004',
      commandeId: 'CMD-2025-005',
      date: '18/04/2025',
      montant: 5200,
      statut: 'Payée',
      statutColor: 'success',
    },
  ], []);

  const statusOptions = ['Tous', 'Payée', 'En attente', 'Annulée'];

  // Formate la date pour le tri
  const formatDateForSort = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  // Formate le montant pour l'affichage
  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(montant).replace('CFA', 'fcfa');
  };

  // Gestion du téléchargement
  const handleDownload = (factureId) => {
    console.log(`Téléchargement de la facture ${factureId}...`);
    // Ici vous pourriez implémenter le vrai téléchargement
  };

  // Gestion du tri
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtrage et tri des factures
  const filteredAndSortedFactures = useMemo(() => {
    // Filtrage
    const filtered = factures.filter((facture) => {
      const matchesSearch = 
        facture.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.commandeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.date.includes(searchTerm) ||
        facture.montant.toString().includes(searchTerm);

      const matchesStatus = 
        filterStatus === 'Tous' || facture.statut === filterStatus;

      return matchesSearch && matchesStatus;
    });

    // Tri
    if (sortConfig.key) {
      return [...filtered].sort((a, b) => {
        if (sortConfig.key === 'date') {
          const dateA = formatDateForSort(a.date);
          const dateB = formatDateForSort(b.date);
          return sortConfig.direction === 'ascending' 
            ? dateA - dateB 
            : dateB - dateA;
        }
        if (sortConfig.key === 'montant') {
          return sortConfig.direction === 'ascending' 
            ? a.montant - b.montant 
            : b.montant - a.montant;
        }
        if (sortConfig.key === 'id') {
          return sortConfig.direction === 'ascending' 
            ? a.id.localeCompare(b.id)
            : b.id.localeCompare(a.id);
        }
        return 0;
      });
    }
    return filtered;
  }, [factures, searchTerm, filterStatus, sortConfig]);

  // Rendu des icônes de tri
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="factures-container">
      <header className="factures-header">
        <h1>Mes Factures</h1>
        <p>Consultez et gérez toutes vos factures en un seul endroit</p>
      </header>

      <div className="factures-controls">
        <div className="search-filter-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher une facture..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher des factures"
            />
          </div>

          <div className="filter-dropdown">
            <FaFilter className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="status-filter"
              aria-label="Filtrer par statut"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="factures-list">
        {filteredAndSortedFactures.length > 0 ? (
          <>
            <div className="factures-list-header">
              <span 
                className="header-item sortable" 
                onClick={() => requestSort('id')}
              >
                Facture {getSortIcon('id')}
              </span>
              <span 
                className="header-item sortable" 
                onClick={() => requestSort('commandeId')}
              >
                Commande {getSortIcon('commandeId')}
              </span>
              <span 
                className="header-item sortable" 
                onClick={() => requestSort('date')}
              >
                Date {getSortIcon('date')}
              </span>
              <span 
                className="header-item sortable" 
                onClick={() => requestSort('montant')}
              >
                Montant {getSortIcon('montant')}
              </span>
              <span className="header-item">Statut</span>
              <span className="header-item actions-header">Actions</span>
            </div>

            {filteredAndSortedFactures.map((facture) => (
              <div className="facture-card" key={facture.id}>
                <div className="facture-id" data-label="Facture">
                  {facture.id}
                </div>
                <div className="commande-id" data-label="Commande">
                  {facture.commandeId}
                </div>
                <div className="facture-date" data-label="Date">
                  {facture.date}
                </div>
                <div className="facture-montant" data-label="Montant">
                  {formatMontant(facture.montant)}
                </div>
                <div 
                  className={`facture-statut statut-${facture.statutColor}`} 
                  data-label="Statut"
                >
                  {facture.statut}
                </div>
                <div className="facture-actions" data-label="Actions">
                  <button
                    className="view-button"
                    onClick={() => navigate(`/facture/${facture.id}`)}
                    aria-label={`Voir la facture ${facture.id}`}
                  >
                    <FaEye /> <span className="action-text">Voir</span>
                  </button>
                  <button
                    className="download-button"
                    onClick={() => handleDownload(facture.id)}
                    aria-label={`Télécharger la facture ${facture.id}`}
                  >
                    <FaDownload /> <span className="action-text">Télécharger</span>
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="no-results">
            <p>Aucune facture ne correspond à votre recherche.</p>
            <button 
              className="reset-filters" 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('Tous');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <footer className="factures-footer">
        <p>Besoin d'aide ? Contactez notre service client.</p>
      </footer>
    </div>
  );
};

export default MesFactures;