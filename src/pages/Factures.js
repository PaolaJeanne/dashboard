import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Facture.css';

const Factures = () => {
  const { commandeId } = useParams();

  // Simule une récupération de données (tu peux remplacer plus tard avec un appel API)
  const facture = {
    id: commandeId,
    date: '12/04/2025',
    client: 'Jean Dupont',
    file: 'affiche_conférence.png',
    type: 'Image',
    pages: 1,
    copies: 50,
    montant: '7500 fcfa',
    status: 'En production'
  };

  const handleDownload = () => {
    // Simulation d’un téléchargement
    alert('Téléchargement de la facture...');
  };

  return (
    <div className="facture-container">
      <h1>Facture de la commande {facture.id}</h1>
      <div className="facture-details">
        <p><strong>Date :</strong> {facture.date}</p>
        <p><strong>Client :</strong> {facture.client}</p>
        <p><strong>Fichier :</strong> {facture.file}</p>
        <p><strong>Type :</strong> {facture.type}</p>
        <p><strong>Nombre de pages :</strong> {facture.pages}</p>
        <p><strong>Nombre de copies :</strong> {facture.copies}</p>
        <p><strong>Statut :</strong> {facture.status}</p>
        <p><strong>Montant total :</strong> {facture.montant}</p>
      </div>

      <div className="facture-actions">
        <button onClick={handleDownload} className="download-button">
          Télécharger la facture
        </button>
      </div>
    </div>
  );
};

export default Factures;
