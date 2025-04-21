import React from 'react';
import '../styles/Facture.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS


const Factures = () => {
  const factures = [
    { id: 1, montant: '45,00 €', date: '2025-04-20', fichier: 'facture1.pdf' },
    { id: 2, montant: '120,50 €', date: '2025-04-18', fichier: 'facture2.pdf' },
    { id: 3, montant: '75,00 €', date: '2025-04-15', fichier: 'facture3.pdf' },
  ];

  const handleDownload = (fichier) => {
    // Simulation du téléchargement du fichier PDF
    alert(`Téléchargement de ${fichier}...`);
  };

  return (
    <div className="dashboard">
      <h2 className="welcome">Mes factures 📜</h2>

      <table className="factures-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Fichier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {factures.map((facture) => (
            <tr key={facture.id}>
              <td>{facture.id}</td>
              <td>{facture.montant}</td>
              <td>{facture.date}</td>
              <td>{facture.fichier}</td>
              <td>
                <button onClick={() => handleDownload(facture.fichier)}>Télécharger</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Factures;
