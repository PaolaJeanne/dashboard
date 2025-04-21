import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importation de Link
import '../styles/MesCommandes.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS


const MesCommandes = () => {
  const [commandes, setCommandes] = useState([
    { id: 1, status: 'En attente', fileName: 'Document1.pdf', date: '2025-04-20' },
    { id: 2, status: 'Terminé', fileName: 'Document2.pdf', date: '2025-04-18' },
    { id: 3, status: 'Annulé', fileName: 'Document3.pdf', date: '2025-04-15' },
  ]);

  const renderStatus = (status) => {
    switch (status) {
      case 'En attente':
        return <span className="status pending">En attente</span>;
      case 'Terminé':
        return <span className="status completed">Terminé</span>;
      case 'Annulé':
        return <span className="status cancelled">Annulé</span>;
      default:
        return <span className="status">Statut inconnu</span>;
    }
  };

  const handleCancel = (id) => {
    setCommandes(commandes.map(commande => 
      commande.id === id ? { ...commande, status: 'Annulé' } : commande
    ));
  };

  const handleComplete = (id) => {
    setCommandes(commandes.map(commande => 
      commande.id === id ? { ...commande, status: 'Terminé' } : commande
    ));
  };

  return (
    <div className="dashboard">
      <h2 className="welcome">Mes commandes 📑</h2>

      <table className="commandes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fichier</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.id}>
              <td>
                <Link to={`/suivi-commande/${commande.id}`}>
                  {commande.id}
                </Link>
              </td>
              <td>{commande.fileName}</td>
              <td>{commande.date}</td>
              <td>{renderStatus(commande.status)}</td>
              <td>
                {commande.status !== 'Terminé' && (
                  <button onClick={() => handleComplete(commande.id)}>Terminer</button>
                )}
                {commande.status !== 'Annulé' && (
                  <button onClick={() => handleCancel(commande.id)}>Annuler</button>
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
