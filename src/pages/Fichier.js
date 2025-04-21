import React, { useState } from 'react';
import '../styles/Fichier.css'; // Assurez-vous d'avoir le bon chemin vers votre fichier CSS


const Fichiers = () => {
  const [fichiers, setFichiers] = useState([
    { id: 1, fileName: 'Document1.pdf', size: '500 KB' },
    { id: 2, fileName: 'Document2.pdf', size: '1.2 MB' },
    { id: 3, fileName: 'Document3.pdf', size: '3.4 MB' },
  ]);

  const handleDelete = (id) => {
    setFichiers(fichiers.filter(fichier => fichier.id !== id));
  };

  const handleDownload = (fileName) => {
    alert(`Téléchargement de ${fileName}...`);
  };

  return (
    <div className="dashboard">
      <h2 className="welcome">Mes fichiers 📂</h2>

      <table className="fichiers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du fichier</th>
            <th>Taille</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fichiers.map((fichier) => (
            <tr key={fichier.id}>
              <td>{fichier.id}</td>
              <td>{fichier.fileName}</td>
              <td>{fichier.size}</td>
              <td>
                <button onClick={() => handleDownload(fichier.fileName)}>Télécharger</button>
                <button onClick={() => handleDelete(fichier.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fichiers;
