import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import '../styles/MesCommandes.css';

const MesCommandes = () => {
  const commandes = [
    { id: 1, numero: 'CMD001', statut: 'En cours', date: '2025-04-22' },
    { id: 2, numero: 'CMD002', statut: 'Livrée', date: '2025-04-20' },
    { id: 3, numero: 'CMD003', statut: 'Annulée', date: '2025-04-18' },
    // Ajouter plus de commandes ici
  ];

  const handleAnnuler = (id) => {
    alert(`Commande ${id} annulée`);
    // Logique pour annuler la commande ici (requête API par exemple)
  };

  return (
    <div className="mes-commandes-container">
      <h1>Mes Commandes</h1>
      <table className="commandes-table">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.id}>
              <td>{commande.numero}</td>
              <td>{commande.statut}</td>
              <td>{commande.date}</td>
              <td>
                {/* Redirection vers la page de suivi avec l'ID de la commande */}
                <Link to={`/suivi-commande/${commande.id}`} className="btn-voir">
                  Voir
                </Link>

                {/* Affichage du bouton Annuler si la commande n'est pas livrée ou annulée */}
                {commande.statut !== 'Livrée' && commande.statut !== 'Annulée' && (
                  <button 
                    className="btn-annuler" 
                    onClick={() => handleAnnuler(commande.id)}
                  >
                    Annuler
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MesCommandes;
