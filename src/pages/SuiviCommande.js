import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/SuiviCommande.css';

const SuiviCommande = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const commande = {
    id: id,
    numero: `${id}`,
    statut: 'En cours de livraison',
    dateCommande: '2025-04-20',
    dateLivraisonEstimee: '2025-04-23',
    transporteur: 'Transporteur XYZ',
    suivi: '1234567890',
    produits: [
      { nom: 'Affiche A2', quantite: 2, prix: 10.0 },
      { nom: 'Flyers A5', quantite: 500, prix: 25.0 },
    ],
    historiqueLivraison: [
      { date: '2025-04-21', etape: 'Commande en préparation' },
      { date: '2025-04-22', etape: 'Expédiée' },
      { date: '2025-04-23', etape: 'En route' },
    ],
    adresseLivraison: '123 Rue Exemple, Dakar, Sénégal',
    contactTransporteur: '77 123 45 67',
  };

  return (
    <div className="suivi-commande-container">
      <h1>📦 Suivi de la commande <span className="commande-id">{commande.numero}</span></h1>

      <section className="commande-details">
        <h2>🗂️ Détails de la commande</h2>
        <p><strong>Statut :</strong> <span className="statut">{commande.statut}</span></p>
        <p><strong>Date de commande :</strong> {commande.dateCommande}</p>
        <p><strong>Livraison estimée :</strong> {commande.dateLivraisonEstimee}</p>
        <p><strong>Transporteur :</strong> {commande.transporteur}</p>
        <p><strong>Numéro de suivi :</strong> {commande.suivi}</p>
      </section>

      <section className="historique-livraison">
        <h2>📍 Historique de la livraison</h2>
        <ul>
          {commande.historiqueLivraison.map((etape, index) => (
            <li key={index}><strong>{etape.date} :</strong> {etape.etape}</li>
          ))}
        </ul>
      </section>

      <section className="produits-details">
        <h2>🧾 Produits commandés</h2>
        <ul>
          {commande.produits.map((produit, index) => (
            <li key={index}>
              {produit.nom} (x{produit.quantite}) – {produit.prix.toFixed(2)} FCFA
            </li>
          ))}
        </ul>
      </section>

      <section className="adresse-livraison">
        <h2>🏠 Adresse de livraison</h2>
        <p>{commande.adresseLivraison}</p>
      </section>

      <section className="contact-transporteur">
        <h2>☎️ Contact du transporteur</h2>
        <p>{commande.contactTransporteur}</p>
      </section>

      <div className="action-buttons">
        <button className="btn-facture" onClick={() => navigate(`/facture/${commande.id}`)}>
          Voir la facture
        </button>
      </div>
    </div>
  );
};

export default SuiviCommande;
