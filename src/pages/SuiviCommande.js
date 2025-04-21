import React, {useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Importation de useParams
import '../styles/SuiviCommande.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS

const SuiviCommande = () => {
  // Récupérer l'ID de la commande depuis l'URL
  const { id } = useParams();

  useEffect(() => {
    // Logique pour charger les données de la commande avec l'ID
    console.log(`Commande ID : ${id}`);
    // Par exemple, tu pourrais ici faire un appel API pour récupérer les détails de la commande avec cet ID
  }, [id]);

  return (
    <div>
      <h2>Détails de la commande #{id}</h2>
      {/* Affiche les détails de la commande ici */}
    </div>
  );
};

export default SuiviCommande;
