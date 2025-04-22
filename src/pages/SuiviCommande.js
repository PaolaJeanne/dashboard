import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SuiviCommande.css'; // Ajoute un fichier CSS pour le style

const SuiviCommande = () => {
  const { id } = useParams(); // Récupérer l'ID de la commande depuis l'URL

  // Exemple de données de commande, cela pourrait être récupéré via une API
  const commande = {
    id: id,
    numero: `CMD${id}`,
    statut: 'En cours de livraison',
    dateCommande: '2025-04-20',
    dateLivraisonEstimee: '2025-04-23',
    transporteur: 'Transporteur XYZ',
    suivi: '1234567890',
    produits: [
      { nom: 'Produit 1', quantite: 2, prix: 10.0 },
      { nom: 'Produit 2', quantite: 1, prix: 25.0 },
    ],
    historiqueLivraison: [
      { date: '2025-04-21', etape: 'Commande en préparation' },
      { date: '2025-04-22', etape: 'Expédiée' },
      { date: '2025-04-23', etape: 'En route' },
    ],
    adresseLivraison: '123 Rue Exemple, Ville, Pays',
    contactTransporteur: '123-456-7890', // Numéro de téléphone du transporteur
  };

  const handleRetour = () => {
    alert('Demande de retour envoyée.');
    // Logique pour demander un retour via une API, par exemple
  };

  return (
    <div className="suivi-commande-container">
      <h1>Suivi de la commande {commande.numero}</h1>

      <div className="commande-details">
        <h2>Détails de la commande</h2>
        <p><strong>Statut :</strong> {commande.statut}</p>
        <p><strong>Date de commande :</strong> {commande.dateCommande}</p>
        <p><strong>Date estimée de livraison :</strong> {commande.dateLivraisonEstimee}</p>
        <p><strong>Transporteur :</strong> {commande.transporteur}</p>
        <p><strong>Numéro de suivi :</strong> {commande.suivi}</p>
      </div>

      <div className="historique-livraison">
        <h2>Historique de la livraison</h2>
        <ul>
          {commande.historiqueLivraison.map((etape, index) => (
            <li key={index}>
              <strong>{etape.date} :</strong> {etape.etape}
            </li>
          ))}
        </ul>
      </div>

      <div className="produits-details">
        <h2>Produits</h2>
        <ul>
          {commande.produits.map((produit, index) => (
            <li key={index}>
              {produit.nom} (x{produit.quantite}) - ${produit.prix.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="adresse-livraison">
        <h2>Adresse de livraison</h2>
        <p>{commande.adresseLivraison}</p>
      </div>

      <div className="contact-transporteur">
        <h2>Contact Transporteur</h2>
        <p>Numéro de téléphone : {commande.contactTransporteur}</p>
      </div>

      {/* Bouton pour demander un retour si la commande est en statut "Livrée" ou "En cours" */}
      {commande.statut === 'Livrée' && (
        <button className="btn-retour" onClick={handleRetour}>
          Demander un retour
        </button>
      )}
    </div>
  );
};

export default SuiviCommande;
